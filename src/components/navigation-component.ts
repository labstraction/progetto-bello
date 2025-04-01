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
		<div class="home-title-group">
            <a class="home-link" href="./#/home">
                <img class="home-logo" src="../LOGO_home_button.png" alt="icon-home">
            </a>
            <h1>Tasky Task</h1>
		</div>
        `;

        const orderBtn = document.createElement("button");
        const orderIcon = document.createElement("img");
        orderBtn.classList.add("order-button");
        orderIcon.classList.add("order-img");
        orderIcon.src = "../public/sorting-button.svg";
        orderBtn.appendChild(orderIcon);
        orderBtn.addEventListener("click", () => this.dispatchChangeOrder());
        externalDiv.appendChild(orderBtn);
        mainDiv.appendChild(externalDiv);

        this.shadowRoot!.appendChild(mainDiv);
    }

    dispatchChangeOrder(): any {
        const event = new CustomEvent(`change-order`);
        document.dispatchEvent(event);
    }

}
customElements.define('navigation-component', NavigationComponent)