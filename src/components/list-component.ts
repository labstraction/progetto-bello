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
        this.todoService = TodoService.getInstance();
    }

    connectedCallback(){
        this.styling();
        this.parseNewTodo();
        this.render();
		this.eventListener(); // chiamo anche eventListener
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			text-decoration: none;
			font-family: 'DM Sans', sans-serif;
		}

		.list-container {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			padding: 1.5rem;
			background-color: #f9f9f9;
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

        todos.forEach((todo) => {
            const cardDiv = document.createElement('a');
            cardDiv.classList.add('card-container');
            cardDiv.href = `#/todo/${todo.id}`; //assegna link id di todo con interpolata

            const card = new CardComponent();
			//passa todo come attributo
			card.setAttribute('todos', JSON.stringify(todo));
            cardDiv.appendChild(card);
            mainDiv.appendChild(cardDiv);
        });

        this.shadowRoot!.appendChild(mainDiv);
    }

	eventListener(){ // gestisce changeOrder e makeTodosDone
		document.addEventListener('change-order', () => {
			this.todoService.changeOrder();
			this.render();
		});

		document.addEventListener('todos-done', (event: any) => {
			const todoId = event.detail;
			this.todoService.makeTodosDone(todoId);
			this.render();
		});
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