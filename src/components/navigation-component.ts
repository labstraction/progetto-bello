

export default class NavigationComponent extends HTMLElement{



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

        let mainDiv = this.shadowRoot!.getElementById('navigation-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'navigation-container';
        }

        mainDiv.innerHTML = 'sono la barra di navigazione'

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('navigation-component', NavigationComponent)