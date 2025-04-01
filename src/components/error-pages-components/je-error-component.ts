export default class ErrorPageComponentJa extends HTMLElement {
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
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

                html, body{
                    width:  100%;
                    height: 100%;
                    margin: 0%;
                    padding: 0%;
                }

                .canvas{
                    background-color: rgb(2, 34, 53);
                    position: absolute;
                }

                .container{
                    font-family: "Noto Sans SC", sans-serif;
                    position: absolute;
                    width: 250px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                }

                .container .text{
                    color: white;;
                    font-size: 50px;
                    font-weight: bold;
                    text-align: center;
                }

                .container .numb {
                    color: rgb(25, 155, 122);
                    font-size: 150px;
                    animation: numb-404 1s step-start infinite;
                }

                @keyframes numb-404 {
                    50% {
                        color: rgb(217, 255, 0);
                    }
                }

                .container .btn{
                    background-color: rgb(0, 0, 0, 0);
                    color: white;
                    width: 175px;
                    border: 1px solid white;
                    border-radius: 100px;
                    padding: 25px;
                    font-size: 30px;
                    text-align: center;
                    margin: 50px 0px 0px 0px;

                    position: relative;
                    left: 50%;
                    transform: translate(-50%, 0%);
                }

                .btn:active {
                    background-color: rgb(217, 255, 0);
                    color: rgb(2, 34, 53);
                    border: none;
                }

        `;
        this.shadowRoot!.appendChild(style);
    }

    render() {
        let mainDiv = this.shadowRoot!.getElementById('app') || document.createElement('div');
        mainDiv.id = 'app';
        mainDiv.classList.add("main-container");
        mainDiv.innerHTML = `
                <canvas class="canvas" id="my-canvas">
                </canvas>
                <div class="container">
                    <span class="text">PAGE NOT FOUND</span>
                    <span class="numb">404</span>
                    <button class="btn" onclick="backHome()">Back Home</button>
                </div>
        `;

        this.shadowRoot!.appendChild(mainDiv);
    }
}

customElements.define('error-page-component-ja', ErrorPageComponentJa);