import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Resolver(() => Todo)
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService
  ) {

  }
  
  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() args: StatusArgs): Todo[] {
    return this.todoService.findAll(args);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'create' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'update' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.updateTodo(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'delete' })
  deleteTodo(@Args('id', { type: () => Int }) id: number): boolean{
    return this.todoService.deleteTodo(id);
  }

  //Agregations
  @Query(() => Int, { name: 'total' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'completed' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'pending' })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }
}
