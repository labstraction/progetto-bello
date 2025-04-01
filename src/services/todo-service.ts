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
		if (this.isPriorityOrder) {
            this.isPriorityOrder = false;
            this.todos = this.orderTodosByTermination(this.todos);
        } else {
            this.isPriorityOrder = true; //trovato il problema: siccome le card vengono sempre impostate in ordine di priorità, questo sarà sempre true e dunque sort non funzionerà
            this.todos = this.orderTodosByPriority(this.todos)
        }

        return [...this.todos]; //clono l'array così lo restituisce cambiato
    }

    orderTodosByPriority(todos: Todos[]): Todos[] {
        const newArray = [...todos];

        newArray.sort(this.compareTodosByPriority)

        return newArray;
    }

    compareTodosByPriority(todo1: Todos, todo2: Todos) {
        let priority1 = todo1.priority;
        if(todo1.isDone){
            priority1 = -1
        }
        let priority2 = todo2.priority;
        if(todo2.isDone){ //typo qui, ma non era quello il problems
            priority2= -1
        }
        return priority2 - priority1;
    }

    orderTodosByTermination(todos: Todos[]): Todos[] {
        const newArray = [...todos];

        newArray.sort((todo1: Todos, todo2: Todos) => {
            let term1 = todo1.terminationDate;
            if (!term1) {
                term1 = Infinity
            }
            let term2 = todo2.terminationDate;
            if (!term2) {
                term2 = Infinity
            }

            if (term1 === term2) {
                return this.compareTodosByPriority(todo1, todo2)
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

    makeTodosDone(event: Event, id: string) {
        event.preventDefault();
        const todo = this.findTodosRec(this.todos, id);
        if (todo) {
            todo.isDone = true;
        } 
        if (this.isPriorityOrder) {
            this.todos = this.orderTodosByPriority(this.todos);
        }
        console.log(todo);
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