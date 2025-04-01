interface Tear {
    respawn?: boolean,
    height?: number,
    width?: number,
    originX?: number,
    originY?: number,
    color?: string,
    speedX?: number,
    speedY?: number
}

export default class ErrorPageComponentJe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.styling();
        this.canvasScript();
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
                    <a href="/">
                        <button class="btn">Back Home</button>
                    </a>
                </div>
        `;

        this.shadowRoot!.appendChild(mainDiv);
    }

    canvasScript(){
    
        let entities: Tear[] = [];
        let canvas: HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D;
        canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    
        document.addEventListener("touchend", (event) => createBigTear(event));
    
        function setUp() {
            for (let i = 0; i < 100; i++) {
                const tear: Tear = {};
    
                //lacrima se deve respawnare
                tear.respawn = true;
    
                //dimensioni lacrima
                tear.height = (Math.random() * 10) + 20;
                tear.width = 2;
    
                //partenza lacrima
                tear.originX = Math.random() * canvas.width;
                tear.originY = Math.random() * -canvas.height;
    
                //colori lacrima iniziale
                tear.color = 'rgb(38, 191, 211)';
    
                //velocità lacrima
                tear.speedX = 0;
                tear.speedY = 8;
    
                entities.push(tear);
            }
        }
    
        function update() {
            for (let i = 0; i < entities.length; i++) {
                const tear: Tear = entities[i];
    
                tear.originY! += tear.speedY!;
                tear.originX! += tear.speedX!;
    
                //RESPAWN
    
                //resetto la lacrima
                if (tear.originY! > canvas.height && tear.respawn) {
                    tear.originX = Math.random() * canvas.width;
                    tear.originY = Math.random() * -canvas.height;
                    tear.speedX = 0;
                }
            }
        }
    
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            for (let i = 0; i < entities.length; i++) {
                const tear: Tear = entities[i];
                ctx.fillStyle = tear.color!;
                ctx.fillRect(tear.originX!, tear.originY!, tear.width!, tear.height!);
            }
        }
    
        function gameLoop() {
    
            update();
    
            draw();
    
            requestAnimationFrame(gameLoop);
        }
    
        function start() {
            setUp();
    
            requestAnimationFrame(gameLoop);
        }
    
        start();
    
        function createBigTear(event: TouchEvent) {
            // Ottieni l'ultimo tocco dalla lista changedTouches
            let touch = event.changedTouches[0];
    
            // Coordinate X e Y del tocco
            let x = touch.clientX;
            let y = touch.clientY;
    
            const tear: Tear = {};
            //non respawna
            tear.respawn = false;
    
            //dimensioni lacrima
            tear.height = 75;
            tear.width = 20;
    
            //partenza lacrima
            tear.originX = x;
            tear.originY = y;
    
            //colori lacrima iniziale
            tear.color = 'rgb(38, 191, 211)';
    
            //velocità lacrima
            tear.speedX = 0;
            tear.speedY = 8;
    
            entities.push(tear);
        }
    }
}

customElements.define('error-page-component-je', ErrorPageComponentJe);