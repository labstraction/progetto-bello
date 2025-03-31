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
                        ${selectedTodo.priority}
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