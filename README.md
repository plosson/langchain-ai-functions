### Langchain Typescript AI decorators

This is a quick experiment to write AI functions using decorators in Typescript.

The main idea is to be able write this directly in your code base

```typescript
    @AiFn({
    template: 'I really want to travel to {city} in {country}. What should I do there? Respond in one short sentence',
    inputVariables: ['city', 'country']
})
async
whatToVisit(city
:
string, country
:
string
):
AiFnOutput < string > {}
```

The implementation will be included through Typescript's decorator feature.

You can then call the code simply doing :

```typescript
const result = await t.whatToVisit('Rome', 'Italy')
console.log(result);
```

It should output

```text
Visit the Colosseum, Vatican City, and eat authentic Italian cuisine.
```

## Project Setup

```sh
npm install
```

Copy .env.example to .env and add your OPENAI_API_KEY

## Using the decorators in your project

```shell
npm install "@plosson/langchain-ai-functions"
```

```typescript
import {AiFn, AiFnOutput} from "@plosson/langchain-ai-functions";
```

## Examples

There is an example in the tests folder that can be executed using

```sh
npm run example 
```
