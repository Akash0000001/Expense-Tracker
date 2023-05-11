const form=document.getElementById("form")
const name=document.getElementById("name")
const desc=document.getElementById("desc")
const tr=document.getElementById("tr")
const td=document.getElementById("td")
form.addEventListener("submit",onsubmit)
tr.addEventListener("click",todo)
function onsubmit(e)
{
    e.preventDefault();
    axios.post("https://crudcrud.com/api/be1a2f154dd24288ac02ab0654a7e383/Todoslist",{TodoName:name.value,Description:desc.value,isDone:false})
    const li=document.createElement("li")
    li.className="list-group-item"
    li.appendChild(document.createTextNode(name.value))
    li.appendChild(document.createTextNode("=>"))
    li.appendChild(document.createTextNode(desc.value))
    const tick=document.createElement("button")
    tick.className="btn btn-danger btn-sm float-end"
    tick.appendChild(document.createTextNode("Done"))

    const del=document.createElement("button")
    del.className="btn btn-danger btn-sm float-end"
    del.appendChild(document.createTextNode("X"))
    li.appendChild(del)
    li.appendChild(tick)

   
    tr.appendChild(li)

    name.value=""
    desc.value=""
}
function todo(e)
{
    if(e.target.firstChild.textContent=="Done")
    {
        const li=document.createElement("li")
        li.className="list-group-item"
        li.appendChild(e.target.parentElement.firstChild)
        td.appendChild(li)
        tr.remove(e.target.parentElement)
    }
    else
    tr.remove(e.target.parentElement) 
}

