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
    li.id=data.id;
    li.className="list-group-item";
    li.appendChild(document.createTextNode(`${data.price}-${data.category}-${data.product_name} `))
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

async function onsubmit(event)
{
    event.preventDefault();
    if (category.value=="" || sp.value=="" || pn.value=="")
    {
        msg.appendChild(document.createTextNode("Please enter all fields!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
    }
    else
    {
        
        try{
            const res= await axios.post("http://localhost:5000/admin/add-product",{price:sp.value,product_name:pn.value,category:category.value})
            showproducts(res.data)
            category.value="" 
            sp.value="" 
            pn.value=""
        }
        catch(err){
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
           console.log(err)
        }
    }
        
}
window.addEventListener("DOMContentLoaded",async function(){
    try{
        const res=await axios.get("http://localhost:5000/admin/get-products")
        res.data.forEach(d=>showproducts(d))
    }
    catch(err){
        msg.appendChild(document.createTextNode("Something went wrong!"))
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err)
    }
})
allList.addEventListener("click",delet)
async function  delet(e)
{   if(e.target.classList.contains("btn-dark"))
    {   const order=e.target.parentElement.parentElement
        
        try{
            const res=await axios.delete(`http://localhost:5000/admin/delete-product/${e.target.parentElement.id}`)
            order.removeChild(e.target.parentElement)
        }
        catch(err){
            msg.appendChild(document.createTextNode("Something went wrong!"))
            setTimeout(()=>msg.firstChild.remove(),5000)
            console.log(err)
        }
    }
}


    
