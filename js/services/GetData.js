export default {
    printData(){
        window.addEventListener("DOMContentLoaded", (e)=>{
            let ws = new Worker("js/wsMyTable.js", {type:"module"})
            ws.postMessage("hola")
            ws.addEventListener("message", (e)=>{
                let data = e.data;
                document.querySelector("tbody").insertAdjacentHTML("afterbegin", e.data ) 
            })
        })
    },
    changeView(){
        document.querySelector("#register").addEventListener("click", (e)=>{
            window.location.href = "index.html"
        })
    }
}