//hugo/eusebio
//mostrerà il testo del todo,la priorità (la priorità indicata è quella del task a meno che il task non sia nel giorno di scadenza, in quel caso diventa rosso)
//e quanto manca alla scadenza (numero più grandezza secondi/minuti/ore/giorni - se il todo è scaduto viene scritto scaduto)
//conterrà un tasto che completa il todo e manda un evento chiamato 'todos-done' che invia l'id del todo
// avrà un attributo che si chiamerò todos
import Todos from "../model/todo";
import TodoService from "../services/todo-service";

export default class CardComponent extends HTMLElement {
  private service = new TodoService();
  private timeLabel!: string

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.styling();
    this.render();
  }

  styling() {
    const style = document.createElement("style");
    style.innerText = `

        `;
    this.shadowRoot!.appendChild(style);
  }

  get todos(): Todos {
    return JSON.parse(this.getAttribute("todos")!);
  }

    getRemainingTime() {
    if (!this.todos.terminationDate) return // add later a message to return
    // calculate remaining time in milliseconds 
    const timeDifference = this.todos.terminationDate - Date.now()
    if (timeDifference < 0) return // add later a message to return because todo is expired

    const remainingTimeInSeconds = timeDifference / 1000
    const timeAvailableInDays = remainingTimeInSeconds / (60 * 60 * 24) 
    if (timeAvailableInDays >= 1) {
        this.timeLabel = 'day(s)'
        return Math.round(timeAvailableInDays)
    }
    const timeAvailableInHours = remainingTimeInSeconds / (60 * 60) 
    if (timeAvailableInHours >= 1) {
        this.timeLabel = 'hour(s)'
        return Math.round(timeAvailableInHours)
    }

    const timeAvailableInMinuets = remainingTimeInSeconds / 60  
    if (timeAvailableInMinuets >= 1) {
        this.timeLabel = 'minutes(s)'
        return Math.round(timeAvailableInMinuets)
    }
    this.timeLabel = 'seconds(s)'
    return Math.round(remainingTimeInSeconds)
  }

  render() {
    let mainDiv = this.shadowRoot!.getElementById("card-container");
    if (mainDiv) {
      mainDiv.innerHTML = "";
    } else {
      mainDiv = document.createElement("div");
      mainDiv.id = "card-container";
    }

    mainDiv.innerHTML = "sono la card";

    this.shadowRoot!.appendChild(mainDiv);
  }
}

customElements.define("card-component", CardComponent);
