

export default class CardComponent extends HTMLElement{



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

        let mainDiv = this.shadowRoot!.getElementById('card-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'card-container';
        }

        mainDiv.innerHTML = 'sono la card'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('card-component', CardComponent)