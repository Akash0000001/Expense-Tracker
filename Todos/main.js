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
        tick.id="btndn"
        tick.className="btn btn-danger btn-sm float-end"
        tick.appendChild(document.createTextNode("Done"))

        const del=document.createElement("button")
        del.id="btndel"
        del.className="btn btn-danger btn-sm float-end"
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
        axios.post("https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist",{TodoName:name.value,Description:desc.value,isDone:false})
        .then(res=>{
            taskonscreen(res.data)
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        })

        name.value=""
        desc.value=""
    }
}
function todo(e)
{
    if(e.target.id=="btndn")
    {
        axios.put(`https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist/${e.target.parentElement.id}`,{TodoName:e.target.parentElement.childNodes[0].textContent,Description:e.target.parentElement.childNodes[2].textContent,isDone:true})
        .then(res=>{
            console.log(res)
            const li=document.createElement("li")
            li.id=e.target.parentElement.id
            li.className="list-group-item"
            li.appendChild(document.createTextNode(e.target.parentElement.childNodes[0].textContent))
            li.appendChild(document.createTextNode("=>"))
            li.appendChild(document.createTextNode(e.target.parentElement.childNodes[2].textContent))
            td.appendChild(li)
            tr.removeChild(e.target.parentElement)
            console.log(e.target)
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        })
    }

    else if(e.target.id=="btndel")
    {   
        axios.delete(`https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist/${e.target.parentElement.id}`)
        .then(res=>{
            console.log(res)
            tr.removeChild(e.target.parentElement)
            console.log(e.target.parentElement)
        })
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err);
        })
        
    } 
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist")
    .then(res=>{
        res.data.forEach(d=>taskonscreen(d));
    })
    .catch(err=>{
        msg.appendChild(document.createTextNode("Something went wrong!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err);
    })
})
