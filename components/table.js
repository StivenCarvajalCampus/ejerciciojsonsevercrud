export default{
    async setData(){
        const ws = new Worker('js/wsMyTable.js', {type:'module'})
        ws.postMessage({data:true})
        ws.addEventListener('message', m => {
            document.querySelector("#table").insertAdjacentHTML("beforeend",m.data)
        })
    }
}