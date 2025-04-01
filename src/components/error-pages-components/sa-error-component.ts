class ErrorPageComponentSa extends HTMLElement {
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
        style.textContent = `
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
        `;
        this.shadowRoot!.appendChild(style);
    }

    render() {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add("main-container");

        mainDiv.innerHTML = `
            <div class="container">
                <h1>404</h1>
                <p>Oops! La pagina che cerchi non esiste.</p>
                <a href="#/home">Torna alla Home</a>
            </div>
        `;

        this.shadowRoot!.appendChild(mainDiv);
    }
}

customElements.define('error-page-component-sa', ErrorPageComponentSa);
