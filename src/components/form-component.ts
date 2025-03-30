//jermias/laura
//conterrà form che deve poter permettere all'utente di aggiungere:
// testo del todo: string
// la priorità: number
// e, se necessaria, la data di scadenza: number
// se premo il tasto cancella-> rimando l'applicazione alla home
// se premo il tasto ok -> ritorno alla home con un query param chiamato newTodo

import Todos from "../model/todo";
import TodoService from "../services/todo-service";

export default class FormComponent extends HTMLElement {

    service: TodoService;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.service = new TodoService();
    }

    connectedCallback() {
        this.styling()
        this.render()
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
        :host {
            --priority-3: #ff6666; /* Rosso acceso */
            --priority-2: #f4c06f; /* Arancio chiaro */
            --priority-1: #8ddf46; /* Verde lime */
            --priority-0: #00d6c6; /* Turchese brillante */
        }

        #form-container {
            font-family: Arial, sans-serif;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
            max-width: 400px;
            margin: auto;
        }
        label {
           display: flex;
            align-items: center;
            margin-top: 8px;
        }
        label img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }

        textarea, input, button {
            margin-top: 4px;
            display: block;
            width: 100%;
        }
        button {
            margin-top: 12px;
            padding: 8px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
            #cancel {
            background-color: #f44336;
            color: white;
        }
        #confirm {
            background-color: #4CAF50;
            color: white;
            
        /* Colori delle priorità */
        input[type="radio"]#green + label {
            color: var(--priority-0);
        }

        input[type="radio"]#yellow + label {
            color: var(--priority-1);
        }

        input[type="radio"]#orange + label {
            color: var(--priority-2);
        }

        input[type="radio"]#red + label {
            color: var(--priority-3);
        }
        `
        this.shadowRoot!.appendChild(style);
    }

    render() {

        let mainDiv = this.shadowRoot!.getElementById('form-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'form-container';
        }

        mainDiv.innerHTML = `
        <form id="form">
            <label for="description">insert task</label>
            <textarea name="description" id="description" required>what's your task?</textarea>

            <div class="priority-group">
                <input type="radio" name="priorityValue" id="green" value="0" required>
                <label for="green">
                    <img src="/3%20EASY%20-%20clock-twelve-svgrepo-com.svg" alt="Low Priority">
                    0
                </label>
                
                <input type="radio" name="priorityValue" id="yellow" value="1" required>
                <label for="yellow">
                <img src="/2%20NOT%20URGENT%20-%20clock-three-svgrepo-com.svg" alt="Medium Priority">
                1
                </label>
                
                <input type="radio" name="priorityValue" id="orange" value="2" required>
                <label for="orange">
                <img src="/1%20URGENT%20-%20clock-lines-svgrepo-com.svg" alt="High Priority">
                2
                </label>
                
                <input type="radio" name="priorityValue" id="red" value="3" required>
                <label for="red">
                <img src="/0%20VERY%20URGENT%20-%20clock-exclamation-svgrepo-com.svg" alt="Critical Priority">
                3
                </label>
            </div>    

                <input type="datetime-local" name="terminationDate" id="terminationDate">

                <button id="cancel">cancel</button>
                <button id="confirm">confirm</button>
            
        </form>
        `;

        this.shadowRoot!.appendChild(mainDiv);

        const cancelBtn = this.shadowRoot!.getElementById("cancel") as HTMLButtonElement
        cancelBtn.addEventListener("click", (e) => this.cancelForm(e))

        const confirmBtn = this.shadowRoot!.getElementById("confirm") as HTMLButtonElement
        confirmBtn.addEventListener("click", (e) => this.confirmForm(e))



    }

    cancelForm(e: Event) {
        e.preventDefault();
        window.location.href = "/#/home/";
    }

    confirmForm(e: Event) {
        e.preventDefault();
        const form: HTMLFormElement = this.shadowRoot!.getElementById("form") as HTMLFormElement;
        const data = new FormData(form);
        const creationDate = new Date().getTime();
        const description: string = data.get("description") as string;
        const firstWord = description.trim().split(/\s+/)[0];

        const todo: Todos = {

            id: `${firstWord}-${creationDate}`,
            description: description,
            priority: parseInt(data.get("priorityValue") as string),
            creationDate: creationDate,
            terminationDate: data.get("terminationDate") ? new Date(data.get("terminationDate") as string).getTime() : undefined,
            isDone: false
        }

        this.service.addTodos(todo);
        const url = "/#/home/";
        window.location.href = url;
    }

}


customElements.define('form-component', FormComponent)