export default class ErrorPageComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.styling();
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Arial', sans-serif;
            }

            .main-container {
                background-color: #2c3e50;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: white;
                font-size: 16px;
                overflow: hidden;
            }

            .container {
                text-align: center;
                animation: fadeIn 1.5s ease-in-out;
            }

            .error-message h1 {
                font-size: 100px;
                animation: bounce 1s ease infinite alternate;
            }

            .error-message h2 {
                font-size: 150px;
                color: #e74c3c;
                font-weight: bold;
                animation: bounce 1s ease infinite alternate 0.5s;
            }

            .error-message p {
                font-size: 24px;
                margin: 20px 0;
                color: #ecf0f1;
            }

            .error-message a {
                font-size: 18px;
                color: #3498db;
                text-decoration: none;
                padding: 10px 20px;
                border: 2px solid #3498db;
                border-radius: 5px;
                transition: background-color 0.3s, color 0.3s;
            }

            .error-message a:hover {
                background-color: #3498db;
                color: #fff;
            }

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes bounce {
                0% {
                    transform: translateY(0);
                }
                100% {
                    transform: translateY(-20px);
                }
            }
        `;
        this.shadowRoot!.appendChild(style);
    }

    render() {
        let mainDiv = this.shadowRoot!.getElementById('app');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'app';
        }
        mainDiv.classList.add("main-container");
        mainDiv.innerHTML = `
            <div class="container">
                <div class="error-message">
                    <h1>Oops!</h1>
                    <h2>404</h2>
                    <p>Page Not Found</p>
                    <a href="/">Go Back Home</a>
                </div>
            </div>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }
}
customElements.define('lo-error-component', ErrorPageComponent);
