const form=document.getElementById("form");
const category=document.getElementById("category");
const sp=document.getElementById("selling price");
const pn=document.getElementById("product name");

const electronics=document.getElementById("l1");
const skin=document.getElementById("l2");
const food=document.getElementById("l3");
const msg=document.getElementById("msg")
const allList=document.getElementById("del")

form.addEventListener("submit",onsubmit);

function showproducts(data)
{
    const li=document.createElement("li")
    li.id=data._id;
    li.className="list-group-item";
    li.appendChild(document.createTextNode(`${data.price}-${data.category}-${data.product_name}`))
    const btn=document.createElement("button");
    btn.className="btn btn-sm btn-dark";
    btn.appendChild(document.createTextNode("Delete Order"))
    li.appendChild(btn)
    if(data.category=="Electronics")
    {
        electronics.appendChild(li)
    }
    else if(data.category=="Skincare")
    {
        skin.appendChild(li)
    }
    else
    {
        food.appendChild(li)
    }
}

function onsubmit(event)
{
    event.preventDefault();
    if (category.value=="" || sp.value=="" || pn.value=="")
    {
        msg.appendChild(document.createTextNode("Please enter all fields!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
    }
    else
    {
        axios.post("https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist",{price:sp.value,product_name:pn.value,category:category.value})
        .then(res=>showproducts(res.data))
        .catch(err=>{
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        })
        category.value="" 
        sp.value="" 
        pn.value=""
}}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist")
    .then(res=>{
        res.data.forEach((d)=>showproducts(d))
    })
    .catch(err=>{
        msg.appendChild(document.createTextNode("Something went wrong!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err)
    })
})
allList.addEventListener("click",delet)
function delet(e)
{   if(e.target.classList.contains("btn-dark"))
    {   const order=e.target.parentElement.parentElement
        axios.delete(`https://crudcrud.com/api/ddcea8e95483456498f3fb5cd5c18b05/Todoslist/${e.target.parentElement.id}`)
        .then(res=>{
        console.log(res)
        order.removeChild(e.target.parentElement)
    })
        .catch(err=>{
        msg.appendChild(document.createTextNode("Something went wrong!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err)
    })
    }
}

    
