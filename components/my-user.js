import config from "../config/config.js";
export default class MyUser extends HTMLElement {
    static url = import.meta.url
    static async components() {
        return await (await fetch(config.uri(MyUser.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        Promise.resolve(MyUser.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.form = this.shadowRoot.querySelector("#myForm");
            this.form.addEventListener("submit", this.handleEvent.bind(this))
        })
    }
    handleEvent(e) {
        e.preventDefault();
        (e.type === "submit") ? this.myworker(e) 
        :undefined;
    }
    myworker(e) {
        let ws = new Worker("../config/ws.js", {type: "module"});   
        let data = Object.fromEntries(new FormData(e.target));
        switch (e.submitter.dataset.valor) {
            case "get":
                ws.postMessage({type: "getUserAll"});
                break;
            case "post":
                ws.postMessage({type: "postUser", arg: data});
                break;
            case "put":
                ws.postMessage({type: "updateUser", arg: data});
                break
            case "delete":
                ws.postMessage({type: "deleteUser", arg: data});
                break;
            default:
                break;
        }
        ws.addEventListener("message", (e)=>{
            console.log(e.data);
            ws.terminate();
        })
    }
    static get observedAttributes(){
        return ['data-accion'];
    }
    attributeChangedCallback(name,old,now){
        console.log(name,old,now);
        console.log(this.dataset.accion);
    }
    connectedCallback() {
        
    }
}
customElements.define(config.name(MyUser.url), MyUser);