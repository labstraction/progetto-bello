import Todos from "../model/todo";


export default class TodoService {

    static instance: TodoService;

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

    static getInstance(){

        if(TodoService.instance){
            return TodoService.instance;
        } else {
            const newInstance = new TodoService();
            TodoService.instance = newInstance;
            return TodoService.instance;
        }

    }

    changeOrder() {
        console.log('Before changeOrder:', this.todos);
        if (this.isPriorityOrder) {
            this.isPriorityOrder = false;
            this.todos = this.orderTodosByTermination(this.todos);
        } else {
            this.isPriorityOrder = true;
            this.todos = this.orderTodosByPriority(this.todos)
        }
        console.log('After changeOrder:', this.todos);
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
            if(todo2.isDone){ // corretto un typo qui ma non funziona ancora
                priority2= -1
            }
            return priority2 - priority1;
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
        const todo = this.findTodosRec(this.todos, id);
        if (todo) {
            todo.isDone = true;
        } 
        if (this.isPriorityOrder) {
            this.todos = this.orderTodosByPriority(this.todos);
        }
        this.saveTodos();
    }

    addSubTodos(todosId: string, newTodo:Todos){
        const selectedTodos = this.findTodosRec(this.todos, todosId);
        if (selectedTodos) {
            if (!selectedTodos.subTodosArray) {
                selectedTodos.subTodosArray = []
            }
            selectedTodos.subTodosArray.push(newTodo);
            this.orderTodosByPriority(selectedTodos.subTodosArray)
            this.saveTodos()
        }
    }

    findTodosRec(todosArray: Todos[], todosId: string): Todos | null{

        for (let i = 0; i < todosArray.length; i++) {
            const todos = todosArray[i];

            if(todosId === todos.id){
                return todos;
            } else {

                if(todos.subTodosArray && todos.subTodosArray.length > 0){
                    const sub =  this.findTodosRec(todos.subTodosArray, todosId)
                    if (sub) {
                        return sub;
                    }
                }
                
            }
        }

        return null;
    }

}