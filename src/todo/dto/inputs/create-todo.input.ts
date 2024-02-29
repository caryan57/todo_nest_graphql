import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType() //Definimos de tipo entrada de datos para graphql
export class CreateTodoInput {
  @Field(() => String) //Definimos el tipo de dato que se ingresara en graphql
  //Validaciones de nest class validator
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}