import TodoService from "../services/todo-service";
import Todos from "../model/todo";
import spoiledClock from "/00_SPOILED_clock-xmark-svgrepo-com.svg?url"
import veryUrgentClock from  "/0_VERY_URGENT_clock-exclamation-svgrepo-com.svg?url"
import urgentClock from "/1_URGENT_clock-lines-svgrepo-com.svg?url"
import notUrgentClock from  "/2_NOT_URGENT_clock-three-svgrepo-com.svg?url"
import easyCLock from "/3_EASY_clock-twelve-svgrepo-com.svg?url"

export default class DetailComponent extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.styling()
        this.render()
    }

    getTodoImage(priority: number) {
    
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

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .add-subtask{
                width: 100%;
                position: absolute;
                bottom: 0;
                text-align: center;
            }

            .task-detail {
                padding: 1.25rem;
                border-radius: 1rem;
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
                margin-bottom: 0.5rem;
                display: flex;
                flex-direction: column;
            }

            .task-description {
                text-transform: capitalize;
            }

            .clock-img {
                height: 100%;
                fill: white;
            }

            .task-priority{
                padding: 0.4rem;
                height: 2rem;
                margin-bottom: 1rem;
               
                border-radius: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
            }
        `
        this.shadowRoot!.appendChild(style);
        // background-color: ${this.getPriorityColor(selectedTodo.priority)};
    }

    render(){

        let mainDiv = this.shadowRoot!.getElementById('detail-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'detail-container';
        }
        
        // const urlParams = new URLSearchParams(window.location.toString().split("?")[1]);
        // console.log(urlParams);

        //ricaviamo id da hash params
        const hashLink = window.location.hash;
        const todoId = hashLink.replace("#/detail?id=", "");

        const service = TodoService.getInstance();
        const selectedTodo: Todos = service.findTodosRec(service.todos, todoId) as Todos;

        const creationDateString = new Date(selectedTodo.creationDate).toLocaleString();
        let terminationDateString = "";
        if(selectedTodo.terminationDate){
            terminationDateString = new Date(selectedTodo.terminationDate).toLocaleString();
        }

        mainDiv.innerHTML = `
            <div class="task-detail">
                <div style="width:100%">
                     <span class="task-description">
                    ${selectedTodo.description}
                    </span>
                </div>

                <div style="width:100%; display: flex; flex-direction: row; align-items: flex-end;">
                    <div class="task-priority">
                        <img class="clock-img" src="${this.getTodoImage(selectedTodo.priority)}" alt="">
                    </div>
                    <div style="width: 100%; display: flex; flex-direction: column;">
                        <span>${creationDateString}</span>
                        <span>${terminationDateString}</span>
                    </div>
                </div>
            </div>
            
            
        `;
        // <div class="add-subtask">
        //         <button class="add-btn" id="add-btn">+</button>
        //  </div>
        //
        //button per nuovo subTask, modificare form-component, passara id di task

        this.shadowRoot!.appendChild(mainDiv);
    }


}

customElements.define('detail-component', DetailComponent)