export default class ErrorPageComponentJa extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.styling();
        this.eyemovement();
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .main-container {
                width: 100%;
                height:100vh;
                background-color: #121212;
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap:10px;
            }
            .eyes {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
            }
            .eye {
                width: 50px;
                height: 50px;
                background: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            .pupil {
                width: 20px;
                height: 20px;
                background: black;
                border-radius: 50%;
                position: absolute;
                transition: transform 0.05s linear;
            }
            h1 { font-size: 2.5rem; }
            h3 { font-size: 2rem; }
            .ecg-container {
                position: absolute;
                bottom: 10%;
                left: 0;
                width: 100%;
                height: 100px;
                overflow: hidden;
            }
            .ecg-line {
                stroke: cyan;
                stroke-width: 2;
                fill: none;
                stroke-dasharray: 300;
                stroke-dashoffset: 300;
                animation: drawECG 1.4s infinite linear;
            }
            @keyframes drawECG {
                from { stroke-dashoffset: 300; }
                to { stroke-dashoffset: 0; }
            }    
        `;
        this.shadowRoot!.appendChild(style);
    }

    render() {
        let mainDiv = this.shadowRoot!.getElementById('app') || document.createElement('div');
        mainDiv.id = 'app';
        mainDiv.classList.add("main-container");
        mainDiv.innerHTML = `
            <div class="eyes">
                <div class="eye">
                    <div class="pupil"></div>
                </div>
                <div class="eye">
                    <div class="pupil"></div>
                </div>
            </div>
            <h1>Error 404</h1>
            <h3>Page not found.</h3>
            <p>Please, check your connection and try again.</p>
            <a href="/">Reload</a>
            <div class="ecg-container">
                <svg width="100%" height="100" viewBox="0 0 300 100">
                    <path class="ecg-line" d="M0,50 L30,50 L40,20 L50,80 L60,50 L90,50 L100,30 L110,50 L120,70 L130,50 L160,50 L170,20 L180,50 L190,80 L200,50 L230,50 L240,30 L250,50 L260,70 L270,50 L300,50"/>
                </svg>
            </div>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }

    eyemovement() {
        this.shadowRoot!.addEventListener("mousemove", (event) => {
            const eyes = this.shadowRoot!.querySelectorAll(".eye");
            eyes.forEach(eye => {
                const pupil = eye.querySelector(".pupil") as HTMLDivElement;
                const rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;
                const deltaX = event.clientX - eyeCenterX;
                const deltaY = event.clientY - eyeCenterY;
                const angle = Math.atan2(deltaY, deltaX);
                const maxMove = 10;
                const moveX = Math.cos(angle) * maxMove;
                const moveY = Math.sin(angle) * maxMove;
                pupil!.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

customElements.define('error-page-component-ja', ErrorPageComponentJa);