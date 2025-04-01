export default class ErrorPageComponentLa extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.styling();
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
            body {
                margin: 0;
                padding: 0;
                font-family: "Signika Negative", sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
            }

            h1 {
                font-size: 5rem;
                margin: 0;
            }

            p {
                font-size: 1.5rem;
                margin: 10px 0 30px;
            }

            img {
                max-width: 300px;
                height: auto;
                border-radius: 8px;
            }

            a {
                margin-top: 20px;
                display: inline-block;
                padding: 10px 20px;
                background-color: #00d6c6;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.2s;
            }

            a:hover {
                background-color: #00b3a6;
            }
        `;
        this.shadowRoot!.appendChild(style);
    }

    render() {
        const mainDiv = this.shadowRoot!.getElementById('app') || document.createElement('div');
        mainDiv.id = 'app';
        mainDiv.innerHTML = `
            <div>
                <h1>404</h1>
                <p>Oops! Pagina non trovata.</p>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNjaGpueG5qaW1paDVvZDNoMG9zcW9mN2xhdGNmZzgwamU1aWwyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jcxtvm2bsZDH2/giphy.gif"
                    alt="Funny 404 GIF">
                <a href="/">Torna alla home</a>
            </div>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }
}

customElements.define('error-page-component-la', ErrorPageComponentLa);