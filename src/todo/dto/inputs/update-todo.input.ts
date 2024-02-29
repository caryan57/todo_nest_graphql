import { CreateTodoInput } from "./create-todo.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator";

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  //Traer el id
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => Boolean, { nullable: true }) //Definimos el tipo de valor que se ingresa en grahpql y que es opcional con nullable: true
  //Validacioens nest
  @IsBoolean()
  @IsOptional() //Si no se envia no manda error, por lo que se indica en al validacion como opcional.
  done?: boolean;
}