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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Signika+Negative:wght@300..700&display=swap');
        :host {
            --priority-3: #ff6666; /* Rosso acceso */
            --priority-2: #f4c06f; /* Arancio chiaro */
            --priority-1: #8ddf46; /* Verde lime */
            --priority-0: #00d6c6; /* Turchese brillante */
        }

        #form-container {
            font-family:"Signika Negative", sans-serif;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f4f4f4;
            max-width: 400px;
            margin: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
        }
        
        h3 {
            font-family: "Signika Negative", sans-serif; 
            font-weight: 300; 
            text-align: center;
            color: #222; 
            font-size: 1rem;
            margin-bottom: 16px;
        }

        .priority-group {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 48px;
            font-size: 0.8rem; 
        }

        input[type="radio"] {
            display: none;
        }

        .color-label {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            transition: transform 0.2s;
        }

        input[type="radio"]:checked + .color-label {
            transform: scale(1.2);
        }

        textarea {
            height: 100px; 
            width: 100%;
            resize: vertical; 
            padding: 8px, 12px; 
            font-size: 0.9rem; 
            border: 1px solid #ccc; 
            border-radius: 8px; 
            cursor: text;
            box-sizing: border-box; 
            margin-bottom: 16px;
        }

        #terminationDate {
            width: 100%; 
            height: 40px; 
            padding: 8px 12px; 
            font-size: 0.9rem; 
            border: 1px solid #ccc; 
            border-radius: 8px; 
            box-sizing: border-box; 
            cursor: text; 
            background-color: #fff;
        }

        .button-container {
            display: flex;
            justify-content: space-between; 
            gap: 50px; 
            margin-top: 24px;
        }

        button {
            display: block;
            width: 100%;
            margin-top: 12px;
            padding: 8px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        #cancel {
            background-color:#999;
            color: white;
        }
            
        #confirm {
            background-color:rgb(10, 21, 10);
            color: white;
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

        const now = new Date();
        // Converti in fuso orario locale
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60 * 1000);
        const minDate = localDate.toISOString().slice(0, 16);
        mainDiv.innerHTML = `
        <form id="form">
        <h3>seleziona il grado di priorità</h3>
            <div class="priority-group">
                            <input type="radio" id="priority-0" name="priorityValue" value="0" required>
                <label for="priority-0" class="color-label" style="background-color: var(--priority-0);"></label>

                <input type="radio" id="priority-1" name="priorityValue" value="1" required>
                <label for="priority-1" class="color-label" style="background-color: var(--priority-1);"></label>

                <input type="radio" id="priority-2" name="priorityValue" value="2" required>
                <label for="priority-2" class="color-label" style="background-color: var(--priority-2);"></label>

                <input type="radio" id="priority-3" name="priorityValue" value="3" required>
                <label for="priority-3" class="color-label" style="background-color: var(--priority-3);"></label>
            </div>
            <div class="description-area">
            <label for="description"><h3>descrivi qui il tuo task</h3></label>
            <textarea name="description" id="description" required></textarea>
            </div>
            
            <label for="terminationDate"><h3>entro quando? (facoltativo)</h3></label>
            <input type="datetime-local" name="terminationDate" id="terminationDate" min="${minDate}" placeholder="termination date">

            <div class="button-container">
            <button id="cancel">annula</button>
            <button id="confirm">salva</button>
            </div>
            
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