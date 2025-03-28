// giovanni/jan
// conterrà:
// icona->link che riporta alla home
// nome app
// tasto per ordinare i todo -> priorità / scadenza (appare solo in home e manda al componente lista un evento chiamato change-order)
// tasto aggiungi che manda alla pagina new 

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

        img{
            height: 24px;
        }

        .nav-container{
            display: flex;
            min-height: 80px;
            width: 100%;
            justify-content: space-between;
        }

        .home-link{
            width: 88px;
        }

        .home-logo{
            width:88px;
            height: 88px;
            border-radius: 24px;
        }

        .order-button{
            background-color: transparent;
            border: none;
        }

        .add-button{
            border-radius: 50%;
            font-size:1.4rem;
            font-weight:900;
            background-color: transparent;
        }

        .add-button:hover{
            font-size:1.7rem;
        }

        
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
            mainDiv.classList.add("nav-container")
        }

        mainDiv.innerHTML = `
        <a class="home-link" href="./index.html">
            <img class="home-logo" src="../public/logo-placeholder.jpg" alt="">
        </a>
        <h1>Too Good Not To Do</h1>
        `;

        const orderBtn = document.createElement("button");
        const orderIcon = document.createElement("img");
        orderBtn.classList.add("order-button");
        orderIcon.classList.add("order-img");
        orderIcon.src = "https://cdn-icons-png.freepik.com/256/13086/13086816.png?semt=ais_hybrid";
        orderBtn.appendChild(orderIcon);
        orderBtn.addEventListener("click", () => this.dispatchChangeOrder());
        mainDiv.appendChild(orderBtn);

        const link = document.createElement("a");
        link.href="./index/#/new"
        const addBtn = document.createElement("button");
        addBtn.classList.add("add-button")
        const addNode = document.createTextNode("+");
        addBtn.appendChild(addNode);
        link.appendChild(addBtn);
        mainDiv.appendChild(link);

        this.shadowRoot!.appendChild(mainDiv);
    }

    dispatchChangeOrder(): any {
        const event = new CustomEvent(`change-order`);
        console.log(event);
        document.dispatchEvent(event);
    }


}


customElements.define('navigation-component', NavigationComponent)