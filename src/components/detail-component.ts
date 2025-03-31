import TodoService from "../services/todo-service";
import Todos from "../model/todo";
import spoiledClock from "/00_SPOILED_clock-xmark-svgrepo-com.svg?url"
import veryUrgentClock from  "/0_VERY_URGENT_clock-exclamation-svgrepo-com.svg?url"
import urgentClock from "/1_URGENT_clock-lines-svgrepo-com.svg?url"
import notUrgentClock from  "/2_NOT_URGENT_clock-three-svgrepo-com.svg?url"
import easyCLock from "/3_EASY_clock-twelve-svgrepo-com.svg?url"

export default class DetailComponent extends HTMLElement{

    selectedTodo: Todos;

    constructor(){
        super();

        // const urlParams = new URLSearchParams(window.location.toString().split("?")[1]);
        // console.log(urlParams);
        //ricaviamo id da hash params
        const hashLink = window.location.hash;
        const todoId = hashLink.replace("#/detail?id=", "");

        const service = TodoService.getInstance();
        this.selectedTodo = service.findTodosRec(service.todos, todoId) as Todos;

        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.styling()
        this.render()
    }

    get todoImage() {
        const priority = this.selectedTodo.priority
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

    get priorityColor() {
        const priority = this.selectedTodo.priority
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
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Signika+Negative:wght@300..700&display=swap');

            #detail-container{
                font-family:"Signika Negative", sans-serif;
                text-transform: capitalize;
            }

            .add-subtask{
                width: 100%;
                position: absolute;
                bottom: 0;
                text-align: center;
            }

            .task-detail {
                height: auto;
                min-height: 100px;
                border-radius: 1rem;
                margin: 10px;
                padding: 1rem;
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
                display:grid;
                grid-template-rows: 3fr 2fr;
            }

            .task-description {
                font-size: large;
            }

            .task-priority-date{
                min-height: 50px;
                max-height: 50px;
                display: flex;
                justify-content: space-between;
            }

            .task-priority{
                padding: 0.4rem;
                background-color: ${this.priorityColor};
                border-radius: 2rem;
                box-sizing: border-box;
                height: 100%;
            }

            .clock-img {
                height: 100%;
                fill: white;
            }

            .task-date{
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: smaller;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){

        let mainDiv = this.shadowRoot!.getElementById('detail-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'detail-container';
        }

        const creationDateString = new Date(this.selectedTodo.creationDate).toLocaleString();
        let terminationDateString = "";
        if(this.selectedTodo.terminationDate){
            terminationDateString = new Date(this.selectedTodo.terminationDate).toLocaleString();
        }

        mainDiv.innerHTML = `
            <div class="task-detail">
                <div class="task-description">
                     <span class="task-description">
                    ${this.selectedTodo.description}
                    </span>
                </div>

                <div class="task-priority-date">
                    <div class="task-priority">
                        <img class="clock-img" src="${this.todoImage}" alt="">
                    </div>
                    <div class="task-date">
                        <span>creation date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${creationDateString.slice(0,17)}</span>
                        <span>expiration date:&nbsp;&nbsp;${terminationDateString.slice(0,17)}</span>
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