//hugo/eusebio
//mostrerà il testo del todo,la priorità (la priorità indicata è quella del task a meno che il task non sia nel giorno di scadenza, in quel caso diventa rosso) 
//e quanto manca alla scadenza (numero più grandezza secondi/minuti/ore/giorni - se il todo è scaduto viene scritto scaduto)
//conterrà un tasto che completa il todo e manda un evento chiamato 'todos-done' che invia l'id del todo
// avrà un attributo che si chiamerò todos
import TodoService from "../services/todo-service"; 

export default class CardComponent extends HTMLElement{

    private service = new TodoService()
    

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

    get todos() {
        return JSON.parse(this.getAttribute('todos')!)
      }


    render(){

        let mainDiv = this.shadowRoot!.getElementById('card-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'card-container';
        }

        mainDiv.innerHTML = 'sono la card'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('card-component', CardComponent)