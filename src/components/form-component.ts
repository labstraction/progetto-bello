//jermias/laura
//conterrà form che deve poter permettere all'utente di aggiungere:
// testo del todo: string
// la priorità: number
// e, se necessaria, la data di scadenza: number
// se premo il tasto cancella-> rimando l'applicazione alla home
// se premo il tasto ok -> ritorno alla home con un query param chiamato newTodo

export default class FormComponent extends HTMLElement {



    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.styling()
        this.render()
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `

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
    <textarea name="description" id="description">what's your task?</textarea>

    <label for="green">0</label>
    <input type="radio" name="priorityValue" id="green" value="0" required>

    <label for="yellow">1</label>
    <input type="radio" name="priorityValue" id="yellow" value="1" required>

    <label for="orange">2</label>
    <input type="radio" name="priorityValue" id="orange" value="2" required>

    <label for="red">3</label>
    <input type="radio" name="priorityValue" id="red" value="3" required>

    <input type="checkbox" name="" id="">

    <button id="cancel">cancel</button>
    <button id="confirm">confirm</button>
  </form>
        `

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('form-component', FormComponent)