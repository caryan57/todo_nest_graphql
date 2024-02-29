import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService
  ) {

  }
  
  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
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

  @Query(() => Int, { name: 'count' })
  countAll(): number {
    return this.todoService.countAll();
  }
}
