//jermias/laura
//conterrà form che deve poter permettere all'utente di aggiungere:
// testo del todo: string
// la priorità: number
// e, se necessaria, la data di scadenza: number
// se premo il tasto cancella-> rimando l'applicazione alla home
// se premo il tasto ok -> ritorno alla home con un query param chiamato newTodo

export default class FormComponent extends HTMLElement{



    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.styling()
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `

        `
        this.shadowRoot!.appendChild(style);
    }

    render(){

        let mainDiv = this.shadowRoot!.getElementById('form-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'form-container';
        }

        mainDiv.innerHTML = 'sono la form'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('form-component', FormComponent)