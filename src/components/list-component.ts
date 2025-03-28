//sara/lorenzo
// conterrà una lista di card component
// arriverà da un servizio chiamato TodoService
// ascolterà l'evento change order chiamerà una funzione del servizio che cambia l'ordine dei todo e refresherà la lista
// controllerà i query params dell'url, se tra i query params c'è la key 'newTodo' parserà il json ad essa associato e chiamerà il servizio aggiungendo il nuovo todo
// ascolterà l'evento todos-done e chiama una funzione del service che mette a done il todo.

import TodoService from '../services/todo-service';
import CardComponent from './card-component';

export default class ListComponent extends HTMLElement{
    queryParams: URLSearchParams = new URLSearchParams(window.location.search);
    todoService: TodoService;
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.todoService = new TodoService();
    }

    connectedCallback(){
        this.styling()
        this.parseNewTodo()
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .list-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        let mainDiv = this.shadowRoot!.getElementById('list-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'list-container';
        }
        mainDiv.classList.add('list-container');

        const todos = this.todoService.todos;
        todos.forEach(() => {
            const cardDiv = document.createElement('a');
            cardDiv.classList.add('card-container');
            cardDiv.href = '#/todoID';
            const card = new CardComponent();
            cardDiv.appendChild(card);

            mainDiv.appendChild(cardDiv);
        });

        this.shadowRoot!.appendChild(mainDiv);
    }

    parseNewTodo(){
        if(this.queryParams.get('newTodo')){
            const newTodo: string = this.queryParams.get('newTodo')!;
            const todo = JSON.parse(newTodo);
            this.todoService.addTodos(todo);
        }
    }
}

customElements.define('list-component', ListComponent);