var E=Object.defineProperty;var L=(h,t,e)=>t in h?E(h,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[t]=e;var p=(h,t,e)=>L(h,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class C extends HTMLElement{constructor(){super();p(this,"canvas",null);const e=this.attachShadow({mode:"open"}),o=document.createElement("template");o.innerHTML=`
        <style>
          :host {
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(109, 141, 88); /* Green background */
            font-family: Arial, sans-serif;
            overflow: hidden; /* Prevent scrolling */
            position: relative;
          }
  
          canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0; /* Snow layer is the background */
          }
  
          .container {
            position: relative;
            width: 200px;
            height: 680px; /* Prevent container from exceeding 90% of viewport height */
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: black; /* Vertical black stripe */
            border-radius: 99%;
            z-index: 1; /* Container is in the foreground */
            overflow: hidden; /* Hide overflowing content */
          }
  
          .content {
            text-align: center;
            color: rgb(65, 62, 62);
          }
  
          .content h1 {
            font-size: 3em;
          }
  
          .content p {
         margin: 10px 0;
         font-size: 0.9em;
         padding-bottom: 5px;
         }
  
          .content a {
            text-decoration: none;
            color: rgb(7, 7, 7);
            background-color: #222323;
            padding: 10px 20px;
            border-radius: 5px;
          }
  
          .content a:hover {
            background-color: #0f0f0f;
          }
        </style>
        <canvas id="snow"></canvas>
        <div class="container">
          <div class="content">
            <h1>404</h1>
            <p>Opss... Pagina non trovata!</p>
            <a href="/">Home</a>
          </div>
        </div>
      `,e.appendChild(o.content.cloneNode(!0)),this.canvas=e.querySelector("#snow")||null}connectedCallback(){this.canvas&&this.initializeSnow(this.canvas),window.addEventListener("resize",this.handleResize.bind(this))}disconnectedCallback(){window.removeEventListener("resize",this.handleResize.bind(this))}initializeSnow(e){const o=e.getContext("2d");if(!o)return;let n=window.innerWidth,r=window.innerHeight,a=[];class s{constructor(){p(this,"x",0);p(this,"y",0);p(this,"dx",0);p(this,"dy",0);p(this,"width",0);p(this,"height",0);p(this,"rotation",0);this.reset()}reset(){this.x=n/2,this.y=r/2;const m=Math.random()*Math.PI*2,y=Math.random()*2+1;this.dx=Math.cos(m)*y*4,this.dy=Math.sin(m)*y*4,this.width=Math.random()*15+5,this.height=Math.random()*5+2,this.rotation=m}}const c=i=>{a=[];for(let m=0;m<i;m++)a.push(new s)},l=()=>{o.clearRect(0,0,n,r),o.fillStyle="rgba(33, 31, 31, 0.7)",a.forEach(i=>{i.x+=i.dx,i.y+=i.dy,(i.x<0||i.x>n||i.y<0||i.y>r)&&i.reset(),o.save(),o.translate(i.x,i.y),o.rotate(i.rotation),o.beginPath(),o.moveTo(-i.width,0),o.lineTo(0,-i.height),o.lineTo(i.width,0),o.lineTo(0,i.height),o.closePath(),o.fill(),o.restore()}),window.requestAnimationFrame(l)};(()=>{n=window.innerWidth,r=window.innerHeight,e.width=n,e.height=r,c(n*r/5e3)})(),l()}handleResize(){this.canvas&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight)}}customElements.define("error-page-component-eu",C);class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.styling()}styling(){const t=document.createElement("style");t.innerText=`
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
        `,this.shadowRoot.appendChild(t)}render(){let t=this.shadowRoot.getElementById("app");t?t.innerHTML="":(t=document.createElement("div"),t.id="app"),t.classList.add("main-container"),t.innerHTML=`
            <div class="container">
                <div class="error-message">
                    <h1>Oops!</h1>
                    <h2>404</h2>
                    <p>Page Not Found</p>
                    <a href="/">Go Back Home</a>
                </div>
            </div>
        `,this.shadowRoot.appendChild(t)}}customElements.define("error-page-component-lo",M);class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.styling(),this.eyemovement()}styling(){const t=document.createElement("style");t.innerText=`
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
        `,this.shadowRoot.appendChild(t)}render(){let t=this.shadowRoot.getElementById("app")||document.createElement("div");t.id="app",t.classList.add("main-container"),t.innerHTML=`
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
            <a href="#/home">Reload</a>
            <div class="ecg-container">
                <svg width="100%" height="100" viewBox="0 0 300 100">
                    <path class="ecg-line" d="M0,50 L30,50 L40,20 L50,80 L60,50 L90,50 L100,30 L110,50 L120,70 L130,50 L160,50 L170,20 L180,50 L190,80 L200,50 L230,50 L240,30 L250,50 L260,70 L270,50 L300,50"/>
                </svg>
            </div>
        `,this.shadowRoot.appendChild(t)}eyemovement(){this.shadowRoot.addEventListener("mousemove",t=>{const e=this.shadowRoot.querySelectorAll(".eye"),o=t;e.forEach(n=>{const r=n.querySelector(".pupil"),a=n.getBoundingClientRect(),s=a.left+a.width/2,c=a.top+a.height/2,l=o.clientX-s,d=o.clientY-c,i=Math.atan2(d,l),m=10,y=Math.cos(i)*m,g=Math.sin(i)*m;r.style.transform=`translate(${y}px, ${g}px)`})})}}customElements.define("error-page-component-ja",D);class S extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.styling()}styling(){const t=document.createElement("style");t.innerText=`
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
                font-family: "Signika Negative", sans-serif;
                background-color: #f9f9f9;
                color: #333;
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
                display: block;
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
        `,this.shadowRoot.appendChild(t)}render(){const t=this.shadowRoot.getElementById("app")||document.createElement("div");t.id="app",t.innerHTML=`
            <div>
                <h1>404</h1>
                <p>Oops! Pagina non trovata.</p>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNjaGpueG5qaW1paDVvZDNoMG9zcW9mN2xhdGNmZzgwamU1aWwyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jcxtvm2bsZDH2/giphy.gif"
                    alt="Funny 404 GIF">
                <a href="/">Torna alla home</a>
            </div>
        `,this.shadowRoot.appendChild(t)}}customElements.define("error-page-component-la",S);class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.styling()}styling(){const t=document.createElement("style");t.textContent=`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=MedievalSharp&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .main-container {
            height: 100vh;
            width: 100vw;
            background-color:rgb(122, 94, 120); /* lavanda */
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000; /* testo nero */
            font-family: 'DM Sans', sans-serif;
        }

        .container {
            text-align: center;
            animation: fadeIn 1s ease-out;
        }

        .container h1 {
            font-size: 200px;
            font-family: "Major Mono Display", monospace;
            color: #000;
            margin-bottom: 0.5rem;
        }

        .container p {
            font-size: 100px;
            color: #000;
            margin-bottom: 2rem;
        }

        .container a {
            display: inline-block;
            padding: 0.8rem 1.6rem;
            font-size: 1rem;
            color: #fff;
            background-color: #000;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .container a:hover {
            background-color: #333;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        `,this.shadowRoot.appendChild(t)}render(){const t=document.createElement("div");t.classList.add("main-container"),t.innerHTML=`
            <div class="container">
                <h1>404</h1>
                <p>Oops! La pagina che cerchi non esiste.</p>
                <a href="#/home">Torna alla Home</a>
            </div>
        `,this.shadowRoot.appendChild(t)}}customElements.define("error-page-component-sa",R);class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.styling(),this.canvasScript()}styling(){const t=document.createElement("style");t.innerText=`
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
        `,this.shadowRoot.appendChild(t)}render(){let t=this.shadowRoot.getElementById("app")||document.createElement("div");t.id="app",t.classList.add("main-container"),t.innerHTML=`
                <canvas class="canvas" id="my-canvas">
                </canvas>
                <div class="container">
                    <span class="text">PAGE NOT FOUND</span>
                    <span class="numb">404</span>
                    <a href="/">
                        <button class="btn">Back Home</button>
                    </a>
                </div>
        `,this.shadowRoot.appendChild(t)}canvasScript(){let t=[],e,o;e=this.shadowRoot.getElementById("my-canvas"),o=e.getContext("2d"),o.canvas.width=window.innerWidth,o.canvas.height=window.innerHeight,document.addEventListener("touchend",d=>l(d));function n(){for(let d=0;d<100;d++){const i={};i.respawn=!0,i.height=Math.random()*10+20,i.width=2,i.originX=Math.random()*e.width,i.originY=Math.random()*-e.height,i.color="rgb(38, 191, 211)",i.speedX=0,i.speedY=8,t.push(i)}}function r(){for(let d=0;d<t.length;d++){const i=t[d];i.originY+=i.speedY,i.originX+=i.speedX,i.originY>e.height&&i.respawn&&(i.originX=Math.random()*e.width,i.originY=Math.random()*-e.height,i.speedX=0)}}function a(){o.clearRect(0,0,e.width,e.height);for(let d=0;d<t.length;d++){const i=t[d];o.fillStyle=i.color,o.fillRect(i.originX,i.originY,i.width,i.height)}}function s(){r(),a(),requestAnimationFrame(s)}function c(){n(),requestAnimationFrame(s)}c();function l(d){let i=d.changedTouches[0],m=i.clientX,y=i.clientY;const g={};g.respawn=!1,g.height=75,g.width=20,g.originX=m,g.originY=y,g.color="rgb(38, 191, 211)",g.speedX=0,g.speedY=8,t.push(g)}}}customElements.define("error-page-component-je",z);const f=class f{constructor(){p(this,"todos");p(this,"isPriorityOrder");this.todos=[],this.isPriorityOrder=!0;const t=localStorage.getItem("todos");if(t){const e=JSON.parse(t);this.todos=this.orderTodosByPriority(e)}}static getInstance(){if(f.instance)return f.instance;{const t=new f;return f.instance=t,f.instance}}changeOrder(){return this.isPriorityOrder?(this.isPriorityOrder=!1,this.todos=this.orderTodosByTermination(this.todos)):(this.isPriorityOrder=!0,this.todos=this.orderTodosByPriority(this.todos)),[...this.todos]}orderTodosByPriority(t){const e=[...t];return e.sort(this.compareTodosByPriority),e}compareTodosByPriority(t,e){let o=t.priority;t.isDone&&(o=-1);let n=e.priority;return e.isDone&&(n=-1),n-o}orderTodosByTermination(t){const e=[...t];return e.sort((o,n)=>{let r=o.terminationDate;r||(r=1/0);let a=n.terminationDate;return a||(a=1/0),r===a?this.compareTodosByPriority(o,n):r-a}),e}saveTodos(){return localStorage.setItem("todos",JSON.stringify(this.todos)),this.todos}addTodos(t){return this.todos.push(t),this.todos=this.orderTodosByPriority(this.todos),this.saveTodos(),this.todos}makeTodosDone(t){const e=this.findTodosRec(this.todos,t);e&&(e.isDone=!0),this.isPriorityOrder&&(this.todos=this.orderTodosByPriority(this.todos)),console.log(e),this.saveTodos()}addSubTodos(t,e){const o=this.findTodosRec(this.todos,t);o&&(o.subTodosArray||(o.subTodosArray=[]),o.subTodosArray.push(e),this.orderTodosByPriority(o.subTodosArray),this.saveTodos())}findTodosRec(t,e){for(let o=0;o<t.length;o++){const n=t[o];if(e===n.id)return n;if(n.subTodosArray&&n.subTodosArray.length>0){const r=this.findTodosRec(n.subTodosArray,e);if(r)return r}}return null}};p(f,"instance");let u=f;const b="/00_SPOILED_clock-xmark-svgrepo-com.svg",x="/0_VERY_URGENT_clock-exclamation-svgrepo-com.svg",w="/1_URGENT_clock-lines-svgrepo-com.svg",v="/2_NOT_URGENT_clock-three-svgrepo-com.svg",k="/3_EASY_clock-twelve-svgrepo-com.svg";class T extends HTMLElement{constructor(){super();p(this,"todoService");this.attachShadow({mode:"open"}),this.todoService=u.getInstance()}connectedCallback(){this.styling(),this.render()}get priorityColor(){switch(this.todos.priority){case 3:return"#ff6666";case 2:return"#f4c06f";case 1:return"#8ddf46";case 0:return"#00d6c6";default:return"#ff6666"}}styling(){const e=document.createElement("style");e.innerText=`
      .card-container {
        background-color: ${this.todos.isDone?"#EFEFEF":"white"}
      }

      .task-container {
        padding: 1.25rem;
        border-radius: 1rem;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
        margin-bottom: 0.5rem;
        display: grid;
        overflow: hidden;
        height: 90px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        grid-template-columns: 3fr 2fr;
      }

      .task-txt-info{
        display: flex;
        margin-left: 5px;
        margin-right: 40px;
      }

      .task-summary {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: normal; 
        max-width: 100%;
        text-decoration: ${this.todos.isDone?"line-through":"none"}
      }

      .task-icon-info {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: end;
        gap: 0.6rem;
      }

      .time-span {
        color: white;
        font-weight: bolder;
      }

      .clock-img {
        height: 100%;
        fill: white;
      }

      .task-time-container{
        padding: 0.4rem;
        height: 2rem;
        margin-bottom: 1rem;
	      background-color: ${this.todos.isDone?"rgb(139, 139, 139)":this.priorityColor};
	      border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .done-icon-container {
        width: 2rem;
        height: 2rem;
        background-color: transparent;
        border: none;
      }

      .done-icon-container {
        
        border-radius: 50%;
      }

      .done-icon{
        width: 100%;
        height: 100%;
      }
    `,this.shadowRoot.appendChild(e)}get todoImage(){switch(this.todos.priority){case 3:return x;case 2:return w;case 1:return v;case 0:return k;default:return b}}get todos(){return JSON.parse(this.getAttribute("todos"))}getRemainingTime(){if(!this.todos.terminationDate)return{label:"",value:0};const e=this.todos.terminationDate-Date.now();if(e<0)return{label:"",value:0};const o=e/1e3,n=o/(60*60*24);if(n>=1)return{label:"day(s)",value:Math.round(n)};const r=o/(60*60);if(r>=1)return{label:"hour(s)",value:Math.round(r)};const a=o/60;return a>=1?{label:"minute(s)",value:Math.round(a)}:{label:"second(s)",value:Math.round(o)}}render(){let e=this.shadowRoot.getElementById("card-container");e?e.innerHTML="":(e=document.createElement("div"),e.id="card-container"),e.classList.add("card-container");const{label:o,value:n}=this.getRemainingTime(),r=document.createElement("div");r.classList.add("task-container"),r.innerHTML=`
        <div class="task-txt-info">
          <span class="task-summary">${this.todos.description}</span>
        </div>
      `;const a=document.createElement("div");a.classList.add("task-icon-info"),a.innerHTML=`
          <div class="task-time-container">
	          <img class="clock-img" src=${this.todoImage} alt="">
            <time class="time-span" datetime="">${n!==0?n:""} ${o}</time>
          </div>
      `;const s=document.createElement("button");s.classList.add("done-icon-container"),this.todos.isDone&&s.classList.add("done"),s.addEventListener("click",l=>this.dispatchCompleteTaskEvent(l));const c=document.createElement("img");c.src="../check-double-svgrepo-com.svg",c.alt="done",c.classList.add("done-icon"),s.appendChild(c),a.appendChild(s),r.appendChild(a),e.appendChild(r),this.shadowRoot.appendChild(e)}dispatchCompleteTaskEvent(e){e.preventDefault();const o=new CustomEvent("todos-done",{detail:this.todos.id});document.dispatchEvent(o)}}customElements.define("card-component",T);class I extends HTMLElement{constructor(){super();p(this,"selectedTodo");const o=window.location.hash.replace("#/detail?id=",""),n=u.getInstance();this.selectedTodo=n.findTodosRec(n.todos,o),this.attachShadow({mode:"open"})}connectedCallback(){this.styling(),this.render()}get todoImage(){switch(this.selectedTodo.priority){case 3:return x;case 2:return w;case 1:return v;case 0:return k;default:return b}}get priorityColor(){switch(this.selectedTodo.priority){case 3:return"#ff6666";case 2:return"#f4c06f";case 1:return"#8ddf46";case 0:return"#00d6c6";default:return"#ff6666"}}styling(){const e=document.createElement("style");e.innerText=`
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Signika+Negative:wght@300..700&display=swap');

            #detail-container {
                font-family: "Signika Negative", sans-serif;
                text-transform: capitalize;
                padding: 1rem;
                box-sizing: border-box;
                color: grey;
            }

            .task-detail {
                height: auto;
                min-height: 100px;
                border-radius: 1rem;
                margin: 10px;
                padding: 1rem;
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
                display:grid;
                grid-template-rows: 3fr 2fr;
            }

            .task-description {
                font-size: large;
                font-weight: bold;
            }

            .task-priority-date{
                min-height: 50px;
                max-height: 50px;
                display: flex;
                justify-content: center;
                align-content: space-between;
                flex-wrap: wrap;
            }

            .task-priority{
                padding: 0.4rem;
                background-color: ${this.priorityColor};
                border-radius: 2rem;
                box-sizing: border-box;
                height: 100%;
                flex: 1;
                max-width: 50px;
            }

            .clock-img {
                height: 100%;
                max-width: 100%;
                object-fit: contain;
            }

            .task-date {
                font-weight: bold;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: smaller;
                flex: 2;
                min-width: 150px;
                align-items: self-end;
            }

            /* Media query for smaller screens */
            @media (max-width: 600px) {
                .task-detail {
                    grid-template-rows: auto auto;
                    padding: 0.5rem;
                }

                .task-priority-date {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .task-priority {
                    margin-bottom: 0.5rem;
                    max-width: 100%;
                }

                .task-date {
                    font-size: smaller;
                    min-width: auto;
                }
            }
        `,this.shadowRoot.appendChild(e)}render(){let e=this.shadowRoot.getElementById("detail-container");e?e.innerHTML="":(e=document.createElement("div"),e.id="detail-container");const o=new Date(this.selectedTodo.creationDate).toLocaleString();let n="";this.selectedTodo.terminationDate?n=new Date(this.selectedTodo.terminationDate).toLocaleString():n="N/A",e.innerHTML=`
            <div class="task-detail">
                     <span class="task-description">
                    ${this.selectedTodo.description}
                    </span>

                <div class="task-priority-date">
                    <div class="task-priority">
                        <img class="clock-img" src="${this.todoImage}" alt="">
                    </div>
                    <div class="task-date">
                        <span>creation date: ${o.slice(0,17)}</span>
                        <span>expiration date: ${n.slice(0,17)}</span>
                    </div>
                </div>
            </div>
            
            
        `,this.shadowRoot.appendChild(e)}}customElements.define("detail-component",I);class H extends HTMLElement{constructor(){super();p(this,"service");this.attachShadow({mode:"open"}),this.service=u.getInstance()}connectedCallback(){this.styling(),this.render()}styling(){const e=document.createElement("style");e.innerText=`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Signika+Negative:wght@300..700&display=swap');
        :host {
            --priority-3: #ff6666; /* Rosso acceso */
            --priority-2: #f4c06f; /* Arancio chiaro */
            --priority-1: #8ddf46; /* Verde lime */
            --priority-0: #00d6c6; /* Turchese brillante */
        }
        body{
            background-color: #f4f4f4;
        }

        #form-container {
            font-family:"Signika Negative", sans-serif;
            padding: 16px;
            background-color: #EFEFEF;
            max-width: 400px; 
            margin: auto;
            margin-top: 5%;

        }

        // #form{
        //     height: 80vh;
        // }

        h3 {
            font-family: "Signika Negative", sans-serif;
            font-weight: 300;
            text-align: center;
            color: #222;
            font-size: 1rem;
            margin-bottom: 16px;
        }

        .priority-group {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 48px;
            font-size: 0.8rem;
        }

        input[type="radio"] {
            display: none;
        }

        .color-label {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            transition: transform 0.2s;
        }

        input[type="radio"]:checked + .color-label {
            transform: scale(1.5);
        }

        textarea {
            height: 150px;
            width: 100%;
            resize: none;
            padding: 8px 12px;
            font-size: 0.9rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            cursor: text;
            box-sizing: border-box;
            margin-bottom: 16px;
        }

        #terminationDate {
            width: 100%;
            height: 40px;
            padding: 8px 12px;
            font-size: 0.9rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-sizing: border-box;
            cursor: text;
            background-color: #fff;
        }

        .button-container {
            position: absolute;
            bottom: 5%;
            left:0;
            display: flex;
            justify-content: center;
            gap: 50px;
            // margin-top: 24px;
            align-items: center;
            width: 100%;
        }

        button {
            display: block;

            min-width: 8rem;
            margin-top: 12px;
            padding: 8px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-sizing: border-box;
        }

        #cancel {
            background-color:#999;
            color: white;
        }

        #confirm {
            background-color:rgb(10, 21, 10);
            color: white;
        }
        `,this.shadowRoot.appendChild(e)}render(){let e=this.shadowRoot.getElementById("form-container");e?e.innerHTML="":(e=document.createElement("div"),e.id="form-container");const o=new Date,n=o.getTimezoneOffset(),a=new Date(o.getTime()-n*60*1e3).toISOString().slice(0,16),s=document.createElement("form");s.id="form",s.addEventListener("submit",l=>{l.preventDefault(),this.confirmForm()}),s.innerHTML=`

        <h3>seleziona il grado di priorità</h3>
            <div class="priority-group">
                <input type="radio" id="priority-0" name="priorityValue" value="0" checked >
                <label for="priority-0" class="color-label" style="background-color: var(--priority-0);"></label>

                <input type="radio" id="priority-1" name="priorityValue" value="1" > 
                <label for="priority-1" class="color-label" style="background-color: var(--priority-1);"></label>

                <input type="radio" id="priority-2" name="priorityValue" value="2" >
                <label for="priority-2" class="color-label" style="background-color: var(--priority-2);"></label>

                <input type="radio" id="priority-3" name="priorityValue" value="3" >
                <label for="priority-3" class="color-label" style="background-color: var(--priority-3);"></label>
            </div>
            <div class="description-area">
            <label for="description"><h3>descrivi qui il tuo task</h3></label>
            <textarea name="description" id="description" required minlength="1"></textarea>
            </div>

            <label for="terminationDate"><h3>entro quando? (facoltativo)</h3></label>
            <input type="datetime-local" name="terminationDate" id="terminationDate" min="${a}" placeholder="termination date">

            <div class="button-container">
            <button id="cancel">annula</button>
            <button id="confirm">salva</button>
            </div>

        `,e.appendChild(s),this.shadowRoot.appendChild(e),this.shadowRoot.getElementById("cancel").addEventListener("click",()=>this.cancelForm())}cancelForm(){window.location.href="/#/home/"}confirmForm(){const e=this.shadowRoot.getElementById("form"),o=new FormData(e),n=new Date().getTime(),r=o.get("description"),s={id:`${r.trim().split(/\s+/)[0]}-${n}`,description:r,priority:parseInt(o.get("priorityValue")),creationDate:n,terminationDate:o.get("terminationDate")?new Date(o.get("terminationDate")).getTime():void 0,isDone:!1};this.service.addTodos(s);const c="/#/home/";window.location.href=c}}customElements.define("form-component",H);class P extends HTMLElement{constructor(){super();p(this,"queryParams",new URLSearchParams(window.location.search));p(this,"todoService");this.attachShadow({mode:"open"}),this.todoService=u.getInstance()}connectedCallback(){this.styling(),this.parseNewTodo(),this.render(window.location.hash),this.eventListener(),document.addEventListener("todos-done",e=>{const o=e;o.preventDefault(),console.log("ascoltando dall connected");const n=o.detail;this.todoService.makeTodosDone(n),this.render(window.location.hash)})}styling(){const e=document.createElement("style");e.innerText=`
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			text-decoration: none;
			font-family: 'DM Sans', sans-serif;
		}
        

		.list-container {
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
			padding: 0.4rem;
			background-color: #f9f9f9;
            box-sizing: border-box;
            padding-bottom: 90px;
		}

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 80px;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            z-index: 1000;
        }

        .footer a {
            display: block;
            width: 99%;
            height: 100%;
        }

        .add-button-newTask {
            width: 100%;
            height: 100%;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            background-color: #222;
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }


		.add-button-newTask:hover {
			background-color: #000;
			transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
            .add-button-newTask {
            left: 32%;}
        }
		`,this.shadowRoot.appendChild(e)}render(e){let o=this.shadowRoot.getElementById("list-container");o?o.innerHTML="":(o=document.createElement("div"),o.id="list-container"),o.classList.add("list-container");let n;if(e.includes("#/detail")){const l=window.location.hash.replace("#/detail?id=",""),d=u.getInstance(),i=d.findTodosRec(d.todos,l);i.subTodosArray?n=i.subTodosArray:n=[]}else n=this.todoService.todos;n.forEach(c=>{const l=document.createElement("a");l.classList.add("card-container"),l.href=`#/detail?id=${c.id}`;const d=new T;d.setAttribute("todos",JSON.stringify(c)),l.appendChild(d),o.appendChild(l)}),this.shadowRoot.appendChild(o);let r=this.shadowRoot.getElementById("footer");r=document.createElement("div"),r.id="footer",r.classList.add("footer");const a=document.createElement("a");if(e.includes("#/detail")){const l=window.location.hash.replace("#/detail?id=","");a.href=`./#/new?id=${l}`}else a.href="./#/new";const s=document.createElement("button");if(s.classList.add("add-button-newTask"),e.includes("#/detail")){const c=document.createTextNode("NUOVO SUBTASK");s.appendChild(c)}else{const c=document.createTextNode("NUOVO TASK");s.appendChild(c)}a.appendChild(s),r.appendChild(a),this.shadowRoot.appendChild(r)}eventListener(){document.addEventListener("change-order",()=>{this.todoService.changeOrder(),this.render()})}parseNewTodo(){if(this.queryParams.get("newTodo")){const e=this.queryParams.get("newTodo"),o=JSON.parse(e);this.todoService.addTodos(o)}}}customElements.define("list-component",P);class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.styling(),this.render()}styling(){const t=document.createElement("style");t.innerText=`
        
        .dm-sans-title {
            font-family: "DM Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 900;
            font-style: normal;
            text-align: left;
        }
        
        *{
            margin:0px;
            padding: 0px;
            box-sizing: border-box;
        }

        .nav-container{
            height: 80px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items:center;
            background-color: #EFEFEF;
        }

        .external-nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            padding: 16px;
            box-sizing: border-box;
            gap: 8px;
        }

		.home-title-group {
			display: flex;
			align-items: center;
		}

        h1{
            font-family: "DM Sans", sans-serif;
            font-size: 1.5rem;
            display: inline;
            padding: 0px;
            margin: 0px;
        }

        .home-link{
            display: flex;
            justify-content: left;
            align-items: left;
            margin-left: -10px;
            margin-right: 20px;
        }

        .order-button{
            margin-left: auto;
            background-color: transparent;
            border: none;
            box-sizing: border-box;
            width:24px;
            padding-right: 30px;
        }

        img{
            height: 40px;
        }

        img:hover{
            height: 44px;
        }
    }
    `,this.shadowRoot.appendChild(t)}render(){let t=this.shadowRoot.getElementById("navigation-container");t?t.innerHTML="":(t=document.createElement("div"),t.id="navigation-container",t.classList.add("nav-container"));const e=document.createElement("div");e.classList.add("external-nav"),e.innerHTML=`
		<div class="home-title-group">
            <a class="home-link" href="./#/home">
                <img class="home-logo" src="../LOGO_home_button.png" alt="icon-home">
            </a>
            <h1>Tasky Task</h1>
		</div>
        `;const o=document.createElement("button"),n=document.createElement("img");o.classList.add("order-button"),n.classList.add("order-img"),n.src="../sorting-button.svg",o.appendChild(n),o.addEventListener("click",()=>this.dispatchChangeOrder()),e.appendChild(o),t.appendChild(e),this.shadowRoot.appendChild(t)}dispatchChangeOrder(){const t=new CustomEvent("change-order");document.dispatchEvent(t)}}customElements.define("navigation-component",N);class O extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){window.addEventListener("hashchange",()=>{console.log("hash changed",window.location.hash),this.render(window.location.hash)}),this.render(window.location.hash),this.styling()}async getRandomComponent(){const t=["error-page-component-lo","error-page-component-ja","error-page-component-eu","error-page-component-la","error-page-component-sa","error-page-component-je"],e=Math.floor(Math.random()*t.length);return t[e]}styling(){const t=document.createElement("style");t.innerText=`
            :host{
                display:block;
                height:100vh;
            }
            .app{
                height:100%;
            }
        `,this.shadowRoot.appendChild(t)}async render(t){let e=this.shadowRoot.getElementById("app");if(e?e.innerHTML="":(e=document.createElement("div"),e.id="app"),!t||t.includes("#/home"))e.innerHTML=`
                <navigation-component></navigation-component>
                <list-component></list-component>
            `,window.location.hash="#/home";else if(t.includes("#/detail"))e.innerHTML=`
                <navigation-component></navigation-component>
                <detail-component></detail-component>
                <list-component></list-component>
            `;else if(t.includes("#/new"))e.innerHTML=`
                <navigation-component></navigation-component>
                <form-component></form-component>
            `;else{const o=await this.getRandomComponent();e.innerHTML=`
                <navigation-component></navigation-component>
                <${o}></${o}>
            `,window.location.hash="#/404"}this.shadowRoot.appendChild(e)}}customElements.define("router-component",O);
