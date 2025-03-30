//hugo/eusebio
//mostrerà il testo del todo,la priorità (la priorità indicata è quella del task a meno che il task non sia nel giorno di scadenza, in quel caso diventa rosso)
//e quanto manca alla scadenza (numero più grandezza secondi/minuti/ore/giorni - se il todo è scaduto viene scritto scaduto)
//conterrà un tasto che completa il todo e manda un evento chiamato 'todos-done' che invia l'id del todo
// avrà un attributo che si chiamerò todos
import Todos from "../model/todo";
import spoiledClock from "/00_SPOILED_clock-xmark-svgrepo-com.svg?url"
import veryUrgentClock from  "/0_VERY_URGENT_clock-exclamation-svgrepo-com.svg?url"
import urgentClock from "/1_URGENT_clock-lines-svgrepo-com.svg?url"
import notUrgentClock from  "/2_NOT_URGENT_clock-three-svgrepo-com.svg?url"
import easyCLock from "/3_EASY_clock-twelve-svgrepo-com.svg?url"

export default class CardComponent extends HTMLElement {

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
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
        margin-bottom: 3rem;
        display: grid;
        grid-template-columns: 3fr 3fr;
      }

      .task-title {
        text-transform: capitalize;
      }

      .task-summary {
        color: gray;
        font-weight: bold;
      }

      .task-icon-info {
        display: flex;
        flex-direction: column;
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

      .clock-icon-container {
        width: 2rem;
        height: 2rem;
        margin-bottom: 1rem;
      }

      .clock-img {
        width: 100%;
        height: 100%;
      }
    `;
    this.shadowRoot!.appendChild(style);
  }

  get TodoImage() {
    const priority = this.todos.priority 

    switch (priority) {
      case 0:
        return veryUrgentClock
      case 1:
        return urgentClock
      case 2:
        return notUrgentClock
      case 3:
        return easyCLock
      default:
        return spoiledClock
    }
  }

  get todos(): Todos {
    return JSON.parse(this.getAttribute("todos")!);
  }

  getRemainingTime() {
    if (!this.todos.terminationDate) return {label: '', value:0}
    // calculate remaining time in milliseconds 
    const timeDifference = this.todos.terminationDate - Date.now()
    if (timeDifference < 0) return {label: '', value: 0}

    const remainingTimeInSeconds = timeDifference / 1000
    const timeAvailableInDays = remainingTimeInSeconds / (60 * 60 * 24) 

    if (timeAvailableInDays >= 1) {
        return {label: 'day(s)', value: Math.round(timeAvailableInDays)}
    }
    const timeAvailableInHours = remainingTimeInSeconds / (60 * 60) 
    if (timeAvailableInHours >= 1) {
        return {label: 'hour(s)', value: Math.round(timeAvailableInHours)}
    }

    const timeAvailableInMinuets = remainingTimeInSeconds / 60  
    if (timeAvailableInMinuets >= 1) {
      return {label: 'minute(s)', value: Math.round(timeAvailableInMinuets)}
    }

    return {label: 'second(s)', value: Math.round(remainingTimeInSeconds)}
  }

  render() {
    let mainDiv = this.shadowRoot!.getElementById("card-container");
    if (mainDiv) {
      mainDiv.innerHTML = "";
    } else {
      mainDiv = document.createElement("div");
      mainDiv.id = "card-container";
    }

    // const {label, value} = this.getRemainingTime()

    mainDiv.innerHTML = `
      <div class="task-container">
        <div class="task-txt-info">
          <h3 class="task-title">task title mockup</h3>
          <p class="task-summary">task info</p>
        </div>
        <div class="task-icon-info">
          <div class="clock-icon-container">
            <img class="clock-img" src="" alt="">
          </div>
          <div class="task-time-container">
            <time class="time-span" datetime="">1 hour </time>
          </div>
        </div>
      </div>
    
    `

    this.shadowRoot!.appendChild(mainDiv);
  }

  dispatchCompleteTaskEvent() {
    const completeEvent = new CustomEvent('todos-done', {detail: this.todos.id})
    document.dispatchEvent(completeEvent)
  }
}

customElements.define("card-component", CardComponent);
