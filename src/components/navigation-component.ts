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
        this.styling();
        this.render(window.location.hash);
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
        
        .dm-sans-title {
            font-family: "DM Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 900;
            font-style: normal;
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
            justify-content: space-between;
            width: 410px;
            height: 100%;
            padding: 16px 32px;
            box-sizing: border-box;
        }

        h1{
            font-family: "DM Sans", sans-serif;
            font-size: 2rem;
            display: inline;
            padding: 0px;
            margin: 0px;
        }

        .home-link{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .order-button {
            background-color: transparent;
            border: none;
            box-sizing: border-box;
            width:24px;
            padding:0px
        }

        img{
            height: 24px;
        }

        img:hover{
            height: 28px;
        }

        .add-button-newTask{
            border-radius: 16px;
            font-size:1.1rem;
            font-family: "DM Sans", sans-serif;
            font-weight:500;
            background-color: black;
            width: 130px;
            height: 50px;
            color: white;
            padding: 2px;
            position:fixed;
            top:80%;
            left:50%;
            margin-left: -65px;
        }

        .add-button-newTask:hover{
            background-color: rgba(0, 0, 0, 0.84);
        }

        .add-button-subtask{
            background-color: transparent;
            border:none;
            position: fixed;
            top: 60%;
            left: 80%;
        }

        .add-button-subtask img{
            width: 55px;
            height: 55px;
        }

        // @media (max-width: 768px) {
        //     .add-button-newTask {
        //     left: 32%;
        // }
}

        
        `
        this.shadowRoot!.appendChild(style);
    }

    render(hash?: string){

        let mainDiv = this.shadowRoot!.getElementById('navigation-container');
        if (mainDiv) {
            mainDiv.innerHTML = '';
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'navigation-container';
            mainDiv.classList.add("nav-container");
        }

        const externalDiv = document.createElement("div");
        externalDiv.classList.add("external-nav");

        externalDiv.innerHTML = `
            <a class="home-link" href="./#home">
                <img class="home-logo" src="../public/home-button.svg" alt="icon-home">
            </a>
            <h1>Tasky Task</h1>
        `;

        const orderBtn = document.createElement("button");
        const orderIcon = document.createElement("img");
        orderBtn.classList.add("order-button");
        orderIcon.classList.add("order-img");
        orderIcon.src = "../public/sorting-button.png";
        orderBtn.appendChild(orderIcon);
        orderBtn.addEventListener("click", () => this.dispatchChangeOrder());
        externalDiv.appendChild(orderBtn);
        mainDiv.appendChild(externalDiv);

        const link = document.createElement("a");
        link.href = "./#/new";
        const addBtn = document.createElement("button");

        if(hash === '#/new' || hash === '#/detail') {
            const addIcon = document.createElement("img");
            addIcon.src = `../public/plus-button.png`;
            addBtn.classList.add("add-button-subtask");
            addBtn.appendChild(addIcon);
        } else {
            const AddNode = document.createTextNode("NUOVO TASK");
            addBtn.appendChild(AddNode);
            addBtn.classList.add("add-button-newTask");
        }
        
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