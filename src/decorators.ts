import {OpenAI} from "langchain/llms/openai";
import {PromptTemplate} from "langchain/prompts";
import {StructuredOutputParser} from "langchain/output_parsers";
import * as dotenv from 'dotenv'

dotenv.config()

/**
 * Input & Output types
 */
export type AiFnInput = string | string[] | undefined | null;
export type AiFnOutput<T> = Promise<string | void | T>;

/**
 * The definition of an AI function
 */
export type AiFnDef = {
    template: string,
    inputVariables?: string[],
    format?: Record<string, string>
}

/**
 * The @AiFn decorator
 * @param def
 * @constructor
 */
export function AiFn<T>(def: AiFnDef) {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ): void {
        descriptor.value = (...args: string[]) => {
            return AiFnExecutor.instance.execute<T>(def, args);
        };
    };
}

/**
 * The executor implements the AI functions
 */
class AiFnExecutor {

    private static _instance: AiFnExecutor;
    private _llm: OpenAI;

    private constructor() {
        this._llm = new OpenAI({
            modelName: process.env.OPENAI_MODEL,
            temperature: 0,
        });
    }

    public static get instance(): AiFnExecutor {
        if (!this._instance) {
            this._instance = new AiFnExecutor();
        }
        return this._instance;
    }

    private toInputs(inputVariableNames: string[], input: AiFnInput): Record<string, any> {
        let result: Record<string, any> = {};
        if (input && Array.isArray(input)) {
            inputVariableNames.forEach((val, idx) => {
                result[val] = input[idx];
            });
        } else if (input) {
            result[inputVariableNames[0]] = input;
        }
        return result;
    }

    async execute<T>(def: AiFnDef, input: AiFnInput): AiFnOutput<T> {
        let parser = def.format ? StructuredOutputParser.fromNamesAndDescriptions(def.format) : undefined;
        const template = new PromptTemplate({
            template: def.template,
            inputVariables: def.inputVariables || [],
            partialVariables: parser ? {format_instructions: parser.getFormatInstructions()} : undefined
        });

        let values = this.toInputs(template.inputVariables, input);
        const finalPrompt = await template.format(values);
        const result = await this._llm.call(finalPrompt);
        if (parser) {
            return <T>parser.parse(result);
        } else {
            return result;
        }
    }
}

