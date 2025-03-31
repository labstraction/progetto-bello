import TodoService from "../services/todo-service";
import Todos from "../model/todo";

export default class DetailComponent extends HTMLElement{

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
            .add-subtask{
                width: 100%;
                position: absolute;
                bottom: 0;
                text-align: center;
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
        
        //ricaviamo id da hash params
        const haskLink = window.location.hash;
        const todoId = haskLink.replace("#/detail?id=", "");

        const service = TodoService.getInstance();
        const selectedTodo: Todos = service.findTodosRec(service.todos, todoId) as Todos;

        const creationDateString = new Date(selectedTodo.creationDate).toLocaleString();
        let terminationDateString = "";
        if(selectedTodo.terminationDate){
            terminationDateString = new Date(selectedTodo.terminationDate).toLocaleString();
        }

        mainDiv.innerHTML = `
            <div class="task-detail">
                <span class="task-description">
                    ${selectedTodo.description}
                </span>
                <div class="task-priority">
                    ${selectedTodo.priority}
                </div>
                <div class="task-dates">
                    <span>${creationDateString}</span>
                    <span>${terminationDateString}</span>
                </div>
            </div>
            <div>
                <!-- list component -->
            </div>
            <div class="add-subtask">
                <button class="add-btn" id="add-btn">+</button>
            </div>
        `;

        this.shadowRoot!.appendChild(mainDiv);
    }


}

customElements.define('detail-component', DetailComponent)