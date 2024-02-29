import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
	@Query(() => String, { name: 'hello' })
	helloWorld(): string {
		return 'Hola mundo en GraphQL'
	}

	@Query(() => Float, { name: 'randomNumber' })
	getRandomNumber(): number {
		return Math.random() * 100;
	}

	@Query(() => Int, { name: 'randomNumberFromZeroTo' })
	getRandomNumberFromZero(@Args('to', { type: () => Int, nullable: true }) to: number = 0): number {
		return Math.round(Math.random() * to);
	}
}
