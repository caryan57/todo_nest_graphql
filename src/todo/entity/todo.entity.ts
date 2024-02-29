import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType() //Crear un tipo de dato para GraphQL a partir de una entidad
export class Todo {
  
  @Field(() => Int) //Definir el tipo de dato de cada propiedad
  id: number;
  @Field(() => String)
  description: string;
  @Field(() => Boolean)
  done: boolean = false;
}