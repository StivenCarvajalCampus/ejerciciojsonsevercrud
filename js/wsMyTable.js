let puerto = "4001"
const url = `http://localhost:${puerto}/usuarios`
let headers = new Headers({"Content-Type": "application/json"});
let ws = {
    printData(data){
        let template = ""
        data.forEach(element => {
            template +=  `
            <tr class="p-1">
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td style="width: 40px; height: 20px; background-color:red; color:white; text-align: center; border-radius: 100%">X</td>
            <td><button type="button" class="delete ${element.id} btn btn-light w-100">Delete</button></td>
            <td><button type="button" class="edit ${element.id} btn w-100">Edit</button></td>
          </tr>
          `
          return template
        });
        return template
    }
}
self.addEventListener("message", async (e)=>{
    let request = await (await fetch(url, {method: "GET", headers: headers})).json();
    console.log(request);
    postMessage(ws.printData(request))
})