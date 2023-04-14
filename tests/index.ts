import {AiFn, AiFnOutput} from "../src/decorators";

export type CorrectOutput = {
    bad_string: string,
    good_string: string
}

export type CityCountry = {
    city: string,
    country: string
}

export class AiService {

    @AiFn<CityCountry>({
        template: 'Extract the city and country from the user input. Make sure you correct the spelling of the city and country if you find any.\n\n{format_instructions}\n\n% USER INPUT:\n{user_input}\n\nYOUR RESPONSE:',
        inputVariables: ["user_input"],
        format: {
            city: "The city name",
            country: "The country name"
        }
    })
    async extractCityAndCountry(user_input: string): AiFnOutput<CityCountry> {
    }

    @AiFn({
        template: 'I really want to travel to {city} in {country}. What should I do there? Respond in one short sentence',
        inputVariables: ['city', 'country']
    })
    async whatToVisit(city: string, country: string): AiFnOutput<string> {
    }

    @AiFn<CorrectOutput>({
        template: 'You will be given a poorly formatted string from a user.\nReformat it and make sure all the words are spelled correctly\n\n{format_instructions}\n\n% USER INPUT:\n{user_input}\n\nYOUR RESPONSE:',
        inputVariables: ['user_input'],
        format: {
            bad_string: "This a poorly formatted user input string",
            good_string: "This is your response, a reformatted response"
        }
    })
    async correctInput(user_input: string): AiFnOutput<CorrectOutput> {
    }

}

const run = async () => {
    const t = new AiService();
    const cc: CityCountry = <CityCountry>await t.extractCityAndCountry("My favorite city in Italie is Rome");
    console.log(cc);
    console.log(await t.whatToVisit(cc.city, cc.country));
    console.log(await t.correctInput("welcom to califonya"));
}

run();
