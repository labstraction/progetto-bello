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
			gap: 0.4rem;
			padding: 0.4rem;
			background-color: #f9f9f9;
            min-height: calc(100vh - 60px); /* Spazio per il footer */
            box-sizing: border-box;
		}

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color:rgb(0, 0, 0);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem 0;
            z-index: 1000;
        }
        
		.add-button-newTask {
			border-radius: 12px;
			font-size: 1rem;
			font-weight: 600;
			background-color: #222;
			color: white;
			padding: 12px 24px;
			border: none;
			cursor: pointer;
			transition: all 0.2s ease-in-out;
		}

		.add-button-newTask:hover {
			background-color: #000;
			transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
            .add-button-newTask {
            left: 32%;
        }
		`
        this.shadowRoot!.appendChild(style);
    }

    render(hash?: string){
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
            cardDiv.href = `#/detail?id=${todo.id}`; //assegna link id di todo con interpolata

            const card = new CardComponent();
			//passa todo come attributo
			card.setAttribute('todos', JSON.stringify(todo));
            cardDiv.appendChild(card);
            mainDiv.appendChild(cardDiv);
        });

        this.shadowRoot!.appendChild(mainDiv);

        //crea il footer
        let footer = this.shadowRoot!.getElementById('footer');
        if (!footer) {
            footer = document.createElement('div');
            footer.id = 'footer';
            footer.classList.add('footer');
    
            const link = document.createElement('a');
            link.href = './#/new';
            const addBtn = document.createElement('button');
            addBtn.classList.add('add-button-newTask');
    
            if (hash === '#/detail') {
                const AddNode = document.createTextNode('NUOVO SUBTASK');
                addBtn.appendChild(AddNode);
            } else {
                const AddNode = document.createTextNode('NUOVO TASK');
                addBtn.appendChild(AddNode);
            }
    
            link.appendChild(addBtn);
            footer.appendChild(link);
    
            this.shadowRoot!.appendChild(footer);
        }
    }

	eventListener(){ // gestisce changeOrder e makeTodosDone
		document.addEventListener('change-order', () => {
            console.log('change-order event received');
			this.todoService.changeOrder();
			this.render();
		});

		document.addEventListener('todos-done', (event: any) => {
			const todoId = event.detail;
			this.todoService.makeTodosDone(event, todoId);
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