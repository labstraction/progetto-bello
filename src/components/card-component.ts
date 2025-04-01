//hugo/eusebio
//mostrerà il testo del todo,la priorità (la priorità indicata è quella del task a meno che il task non sia nel giorno di scadenza, in quel caso diventa rosso)
//e quanto manca alla scadenza (numero più grandezza secondi/minuti/ore/giorni - se il todo è scaduto viene scritto scaduto)
//conterrà un tasto che completa il todo e manda un evento chiamato 'todos-done' che invia l'id del todo
// avrà un attributo che si chiamerò todos
import Todos from "../model/todo";
import TodoService from "../services/todo-service";
import spoiledClock from "/00_SPOILED_clock-xmark-svgrepo-com.svg?url"
import veryUrgentClock from "/0_VERY_URGENT_clock-exclamation-svgrepo-com.svg?url"
import urgentClock from "/1_URGENT_clock-lines-svgrepo-com.svg?url"
import notUrgentClock from "/2_NOT_URGENT_clock-three-svgrepo-com.svg?url"
import easyCLock from "/3_EASY_clock-twelve-svgrepo-com.svg?url"

export default class CardComponent extends HTMLElement {
  todoService: TodoService;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.todoService = TodoService.getInstance();
  }

  connectedCallback() {
    this.styling();
    this.render();
  }


  get priorityColor() {
    const priority = this.todos.priority
    switch (priority) {
      case 3:
        return '#ff6666'
      case 2:
        return '#f4c06f'
      case 1:
        return '#8ddf46'
      case 0:
        return '#00d6c6'
      default:
        return '#ff6666'
    }


    return
  }

  styling() {
    const style = document.createElement("style");
    style.innerText = `
      .task-container {
        padding: 1.25rem;
        border-radius: 1rem;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
        margin-bottom: 0.5rem;
        display: grid;
        grid-template-columns: 3fr 2fr;
      }

      .task-txt-info{
        display: flex;
      }

      .task-summary {
        color: gray;
        font-weight: bold;
        display: block;
        max-width:100%;
      }

      .task-icon-info {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: end;
        gap: 0.6rem;
      }

      .time-span {
        color: white;
        font-weight: bolder;
      }

      .clock-img {
        height: 100%;
        fill: white;
      }

      .task-time-container{
        padding: 0.4rem;
        height: 2rem;
        margin-bottom: 1rem;
	      background-color: ${this.priorityColor};
	      border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .done-icon-container {
        width: 2rem;
        height: 2rem;
        background-color: transparent;
        border: none;
      }

      .done-icon-container.done {
        background-color: green;
        border-radius: 50%;
      }

      .done-icon{
        width: 100%;
        height: 100%;
      }
    `;
    this.shadowRoot!.appendChild(style);
  }

  get todoImage() {
    const priority = this.todos.priority

    switch (priority) {
      case 3:
        return veryUrgentClock
      case 2:
        return urgentClock
      case 1:
        return notUrgentClock
      case 0:
        return easyCLock
      default:
        return spoiledClock
    }
  }

  get todos(): Todos {
    return JSON.parse(this.getAttribute("todos")!);
  }

  getRemainingTime() {
    if (!this.todos.terminationDate) return { label: '', value: 0 }
    // calculate remaining time in milliseconds 
    const timeDifference = this.todos.terminationDate - Date.now()
    if (timeDifference < 0) return { label: '', value: 0 }

    const remainingTimeInSeconds = timeDifference / 1000
    const timeAvailableInDays = remainingTimeInSeconds / (60 * 60 * 24)

    if (timeAvailableInDays >= 1) {
      return { label: 'day(s)', value: Math.round(timeAvailableInDays) }
    }
    const timeAvailableInHours = remainingTimeInSeconds / (60 * 60)
    if (timeAvailableInHours >= 1) {
      return { label: 'hour(s)', value: Math.round(timeAvailableInHours) }
    }

    const timeAvailableInMinuets = remainingTimeInSeconds / 60
    if (timeAvailableInMinuets >= 1) {
      return { label: 'minute(s)', value: Math.round(timeAvailableInMinuets) }
    }

    return { label: 'second(s)', value: Math.round(remainingTimeInSeconds) }
  }

  render() {
    let mainDiv = this.shadowRoot!.getElementById("card-container");
    if (mainDiv) {
      mainDiv.innerHTML = "";
    } else {
      mainDiv = document.createElement("div");
      mainDiv.id = "card-container";
    }

    const { label, value } = this.getRemainingTime()

    // const todosTitle = this.todos.description.split(" ", 2);
    // let todosTitle2 = todosTitle.join(",")
    // todosTitle2 = todosTitle2.replace(",", " ")
    // console.log(todosTitle2);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.innerHTML = `
        <div class="task-txt-info">
          <span class="task-summary">${this.todos.description}</span>
        </div>
      `

    const taskIconInfo = document.createElement("div");
    taskIconInfo.classList.add("task-icon-info");
    taskIconInfo.innerHTML = `
          <div class="task-time-container">
	          <img class="clock-img" src=${this.todoImage} alt="">
            <time class="time-span" datetime="">${value !== 0 ? value : ""} ${label}</time>
          </div>
      `

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-icon-container");
    if (this.todos.isDone) {
      doneBtn.classList.add("done");
    }
    doneBtn.addEventListener("click", (event) => this.todoService.makeTodosDone(event, this.todos.id));
    const doneIcon = document.createElement("img");
    doneIcon.src = "../public/check-double-svgrepo-com.svg";
    doneIcon.alt = "done";
    doneIcon.classList.add("done-icon");

    doneBtn.appendChild(doneIcon);
    taskIconInfo.appendChild(doneBtn);
    taskContainer.appendChild(taskIconInfo);
    mainDiv.appendChild(taskContainer);

    this.shadowRoot!.appendChild(mainDiv);
  }

  dispatchCompleteTaskEvent() {
    const completeEvent = new CustomEvent('todos-done', { detail: this.todos.id })
    document.dispatchEvent(completeEvent)
  }
}

customElements.define("card-component", CardComponent);
