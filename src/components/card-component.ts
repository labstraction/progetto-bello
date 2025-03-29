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
          .task-container {
        padding: 1.25rem;
        border-radius: 1rem;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
        margin-bottom: 3rem;
        display: grid;
        grid-template-columns: 3fr 3fr;
      }

      .task-summary {
        color: gray;
        font-weight: bold;
      }

      .task-icon-info {
        display: flex;
        align-items: end;
        justify-content: end;
      }

      .time-span {
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        background-color: red;
        color: white;
        font-weight: bolder;
      }

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

    mainDiv.innerHTML = `
      <div class="task-container">
        <div class="task-txt-info">
          <h3 class="task-title">task title mockup</h3>
          <p class="task-summary">task info</p>
        </div>
        <div class="task-icon-info">
          <div class="clock-icon-container"></div>
          <div class="task-time-container">
            <time class="time-span" datetime=""> 1 hour </time>
          </div>
        </div>
      </div>
    
    `

    this.shadowRoot!.appendChild(mainDiv);
  }
}

customElements.define("card-component", CardComponent);
