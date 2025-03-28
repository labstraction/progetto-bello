

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

        mainDiv.innerHTML = 'sono il dettaglio'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('detail-component', DetailComponent)