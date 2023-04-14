### Langchain Typescript AI decorators

This is a quick experiment to write AI functions using decorators in Typescript. 

The main idea is to be able write this directly in your code base 

```typescript
    @AiFn({
        template: 'I really want to travel to {city} in {country}. What should I do there? Respond in one short sentence',
        inputVariables: ['city', 'country']
    })
    async whatToVisit(city: string, country: string): AiFnOutput<string> {
    }
```

## Project Setup

```sh
npm install
```

Copy .env.example to .env and add your OPENAI_API_KEY 


## Examples 

There is an example in the tests folder that can be executed using 

```sh
npm run example 
```
