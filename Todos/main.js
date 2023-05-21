const form=document.getElementById("form")
const name=document.getElementById("name")
const desc=document.getElementById("desc")
const tr=document.getElementById("tr")
const td=document.getElementById("td")
const msg=document.getElementById("msg")
form.addEventListener("submit",onsubmit)
tr.addEventListener("click",todo)
function taskonscreen(data)
{
    const li=document.createElement("li")
    li.id=data._id
    li.className="list-group-item"
    li.appendChild(document.createTextNode(data.TodoName))
    li.appendChild(document.createTextNode("=>"))
    li.appendChild(document.createTextNode(data.Description))

    if(data.isDone==false)
    {
        const tick=document.createElement("button")
        tick.className="btn btn-danger btn-sm float-end Done"
        tick.appendChild(document.createTextNode("✓"))

        const del=document.createElement("button")
        del.className="btn btn-danger btn-sm float-end Delete"
        del.appendChild(document.createTextNode("X"))
        li.appendChild(del)
        li.appendChild(tick)
        tr.appendChild(li)
    }
    else
    {
        
        td.append(li)
    }
}
function onsubmit(e)
{
    e.preventDefault();
    if(name.value=="" || desc.value=="")
    {
        msg.appendChild(document.createTextNode("Please enter all fields!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
    }
    else{
        axios.post("https://crudcrud.com/api/6ca6014f72084ca6976de347d41b5d48/Todoslist",{TodoName:name.value,Description:desc.value,isDone:false})
        .then(res=>{
            taskonscreen(res.data);
            name.value="";
            desc.value="";
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        })
    }
}

function todo(e)
{
    if(e.target.classList.contains("Done"))
    {
        axios.put(`https://crudcrud.com/api/6ca6014f72084ca6976de347d41b5d48/Todoslist/${e.target.parentElement.id}`,{TodoName:e.target.parentElement.childNodes[0].textContent,Description:e.target.parentElement.childNodes[2].textContent,isDone:true})
        .then(res=>{
            const li=document.createElement("li")
            li.id=e.target.parentElement.id
            li.className="list-group-item"
            li.appendChild(document.createTextNode(e.target.parentElement.childNodes[0].textContent))
            li.appendChild(document.createTextNode("=>"))
            li.appendChild(document.createTextNode(e.target.parentElement.childNodes[2].textContent))
            td.appendChild(li)
            tr.removeChild(e.target.parentElement)
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        })
    }

    else if(e.target.classList.contains("Delete"))
    {   
        axios.delete(`https://crudcrud.com/api/6ca6014f72084ca6976de347d41b5d48/Todoslist/${e.target.parentElement.id}`)
        .then(res=>{
            tr.removeChild(e.target.parentElement);
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err);
        })
        
    } 
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/6ca6014f72084ca6976de347d41b5d48/Todoslist")
    .then(res=>{
        res.data.forEach(d=>taskonscreen(d));
    })
    .catch(err=>{
        msg.appendChild(document.createTextNode("Something went wrong!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err);
    })
})
