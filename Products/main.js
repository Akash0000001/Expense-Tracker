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
    btn.className="btn btn-dark";
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

function onsubmit(e)
{
    e.preventDefault();
    if (category.value=="" || sp.value=="" || pn.value=="")
    {
        msg.appendChild(document.createTextNode("Please enter all fields!"))

    }
    else
    {
        axios.post("https://crudcrud.com/api/ea913046145d416fa74cf1a22571b220/Products",{price:sp.value,product_name:pn.value,category:category.value})
        .then(res=>showproducts(res.data))
        .catch(err=>{
            document.body.innerHTML=document.body.innerHTML+'<h3 style="color:red;">Something went wrong!</h3>'
            setTimeout(()=>document.body.lastElementChild.remove(),5000)
            console.log(err)
        })
        category.value="" 
        sp.value="" 
        pn.value=""
}}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/ea913046145d416fa74cf1a22571b220/Products")
    .then(res=>{
        res.data.forEach((d)=>showproducts(d))
    })
    .catch(err=>{
        document.body.innerHTML=document.body.innerHTML+'<h3 style="color:red;">Something went wrong!</h3>'
        setTimeout(()=>document.body.lastElementChild.remove(),5000)
        console.log(err)
    })
})
allList.addEventListener("click",delet)
function delet(e)
{
    const order=e.target.parentElement.parentElement
    axios.delete(`https://crudcrud.com/api/ea913046145d416fa74cf1a22571b220/Products/${e.target.parentElement.id}`)
    .then(res=>{
        console.log(res)
        order.removeChild(e.target.parentElement)
})
    .catch(err=>{
        document.body.innerHTML=document.body.innerHTML+'<h3 style="color:red;">Something went wrong!</h3>'
        setTimeout(()=>document.body.lastElementChild.remove(),5000)
        console.log(err)
    })
}
    
