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

    async getRandomComponent() {
        const componentFiles = [
            'error-page-component-lo',
            'error-page-component-ja'
        ];
        const randomIndex = Math.floor(Math.random() * componentFiles.length);
        const randomFile = componentFiles[randomIndex];
        return randomFile;
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

    async render(hash?: string){

        let mainDiv = this.shadowRoot!.getElementById('app');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'app';
        }

        if (!hash || hash.includes('#/home')) {
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <list-component></list-component>
            `;
            window.location.hash = '#/home';
        } else if (hash.includes('#/detail')) {
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <detail-component></detail-component>
                <list-component></list-component>
            `;
        } else if (hash.includes('#/new')) {
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <form-component></form-component>
            `;
        } else {
            const randomErrorComponent = await this.getRandomComponent();
            mainDiv.innerHTML = `
                <navigation-component></navigation-component>
                <${randomErrorComponent}></${randomErrorComponent}>
            `;
            window.location.hash = '#/404';
        }
        this.shadowRoot!.appendChild(mainDiv);
    }
}


customElements.define('router-component', RouterComponent)