import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Cocinar',
      done: false
    },
    {
      id: 2,
      description: 'Lavar',
      done: false
    },
    {
      id: 3,
      description: 'Comer pizza',
      done: false
    }
  ]

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter(todo => todo.done).length;
  }

  get pendingTodos(): number {
    return this.todos.filter(todo => todo.done === false).length;
  }

  findAll(args: StatusArgs): Todo[] {
    const { status } = args;

    if(status !== undefined) return this.todos.filter(todo => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todo {
    let todo: Todo = this.todos.find(todo => todo.id === id);

    if(!todo) throw new NotFoundException('No se encontro un todo con ese id');

    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = this.totalTodos + 1;
    todo.done = false;

    this.todos.push(todo);

    return todo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;

    const todoToUpdate = this.findOne(id);
    
    if(description) todoToUpdate.description = description;
    if(done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map(todo => todo.id === todoToUpdate.id ? todoToUpdate : todo)

    return todoToUpdate;
  }

  deleteTodo(id: number): boolean {
    const todoToDelete = this.findOne(id);
    
    this.todos = this.todos.filter(todo => todo.id !== id);

    return true;
  }
}
