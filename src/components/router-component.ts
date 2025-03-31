

export default class RouterComponent extends HTMLElement{



    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        window.addEventListener("hashchange", () => {
            console.log('hash changed', window.location.hash)
            this.render(window.location.hash)
        });
        this.render(window.location.hash)
        this.styling()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            :host{
                display:block;
                height:100vh;
            }
            .app{
                height:100%;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(hash?: string){

        let mainDiv = this.shadowRoot!.getElementById('app');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'app';
        }



        if(hash?.includes('#/detail')){
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <detail-component></detail-component>
                <list-component></list-component>
            `
        } else if(hash?.includes('#/new')){
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <form-component></form-component>
            `
        } else {
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <list-component></list-component>
            `
            window.location.hash = '#/home'
        }

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('router-component', RouterComponent)