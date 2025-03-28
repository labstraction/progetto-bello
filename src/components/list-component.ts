//sara/lorenzo
// conterrà una lista di card component
// arriverà da un servizio chiamato TodoService
// ascolterà l'evento change order chiamerà una funzione del servizio che cambia l'ordine dei todo e refresherà la lista
// controllerà i query params dell'url, se tra i query params c'è la key 'newTodo' parserà il json ad essa associato e chiamerà il servizio aggiungendo il nuovo todo

export default class ListComponent extends HTMLElement{



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

        let mainDiv = this.shadowRoot!.getElementById('list-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'list-container';
        }

        mainDiv.innerHTML = 'sono la lista'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('list-component', ListComponent)