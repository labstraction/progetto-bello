import Todos from "../model/todo";


export default class TodoService {

    todos: Todos[];
    isPriorityOrder: Boolean;

    constructor() {
        this.todos = []

        this.isPriorityOrder = true;

        const todosString = localStorage.getItem('todos');
        if (todosString) {
            const loadedTodos = JSON.parse(todosString);
            this.todos = this.orderTodosByPriority(loadedTodos);
        }

    }

    changeOrder() {
        if (this.isPriorityOrder) {
            this.isPriorityOrder = false;
            this.todos = this.orderTodosByTermination(this.todos);
        } else {
            this.isPriorityOrder = true;
            this.todos = this.orderTodosByPriority(this.todos)
        }
        return this.todos;
    }

    orderTodosByPriority(todos: Todos[]): Todos[] {
        const newArray = [...todos];

        newArray.sort((todo1: Todos, todo2: Todos) => {
            let priority1 = todo1.priority;
            if(todo1.isDone){
                priority1 = -1
            }
            let priority2 = todo2.priority;
            if(todo1.isDone){
                priority2= -1
            }
            return priority1 - priority2;
        })

        return newArray;
    }

    orderTodosByTermination(todos: Todos[]): Todos[] {
        const newArray = [...todos];

        newArray.sort((todo1: Todos, todo2: Todos) => {
            let term1 = todo1.terminationDate;
            if (!term1) {
                term1 = 0
            }
            let term2 = todo2.terminationDate;
            if (!term2) {
                term2 = 0
            }

            return term1 - term2;
        })

        return newArray;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        return this.todos;
    }

    addTodos(todo: Todos) {
        this.todos.push(todo);
        this.todos = this.orderTodosByPriority(this.todos)
        this.saveTodos();
        return this.todos;
    }

    makeTodosDone(id: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.isDone = true;
        } {
            if (this.isPriorityOrder) {
                this.todos = this.orderTodosByPriority(this.todos)
            }
            this.saveTodos()
        }
    }

}