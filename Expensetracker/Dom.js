const form=document.getElementById("form");
const expense=document.getElementById("expense")
const desc=document.getElementById("description")
const cat=document.getElementById("category")
const expenses=document.getElementsByClassName("list-group")
const error=document.querySelector(".error")
const premiumcol=document.getElementById("premiumcol")

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
    const token=localStorage.getItem("token")    
    const res=await axios.get("http://localhost:4000/expense/list",{headers:{"Authorization":token}})
        console.log(res.data)
        if(res.data.ispremiumuser===null)
        {
            const premiumbutton=document.createElement("button")
            premiumbutton.id="rzp-button1"
            premiumbutton.classList="btn btn-dark mt-3"
            premiumbutton.appendChild(document.createTextNode("Buy Premium"))

            premiumcol.appendChild(premiumbutton)
        }
        res.data.result.forEach(element => {
            showexpenseonscreen(element)
        });
    }
    catch(err){
        error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
        setTimeout(()=>error.lastChild.remove(),5000)
        console.log(err)
    }
})

document.getElementById('premiumcol').onclick = async function(e){
if(e.target.id==="rzp-button1"){
try{
const token =localStorage.getItem("token")
const response = await axios.get("http://localhost:4000/purchase/primemembership",{headers:{"Authorization":token}})

var options = {
    "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
    "order_id":response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "theme": {
        "color": "#3399cc"
    },
    "handler": async function (response){
        
        try{
        await axios.post("http://localhost:4000/purchase/updatetransactionstatus",{order_id:options.order_id,payment_id:response.razorpay_payment_id,status:"SUCCESSFUL"},
        {headers:{"Authorization":token}})
        // console.log(response.razorpay_payment_id);
        // console.log(response.razorpay_order_id);
        // console.log(response.razorpay_signature)
        alert("Transaction Successful")
        alert("you are a premium member now!")
        }
        catch(err){
            console.log(err)
        }
    },
};
var rzp1 = new Razorpay(options);

    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed",async function(response){
        try{
        await axios.post("http://localhost:4000/purchase/updatetransactionstatus",{order_id:options.order_id,status:"FAILED"},
        {headers:{"Authorization":token}})
        alert("Transaction Failed")
        }
        catch(err){
            console.log(err)
        }
    })
}
catch(err){
    console.log(err)
    error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
    setTimeout(()=>error.lastChild.remove(),5000)
}
}
}


form.addEventListener("submit",onsubmit);
function showexpenseonscreen(data)
{
        const li=document.createElement("li")
        li.id=data.id;
        li.className="list-group-item";
        const exp=document.createTextNode(data.expense);
        li.appendChild(exp)
        li.appendChild(document.createTextNode("-"))
        const des=document.createTextNode(data.description)
        li.appendChild(des)
        li.appendChild(document.createTextNode("-"))
        const category=document.createTextNode(data.category)
        li.appendChild(category)
        li.style.color="red"
        li.style.fontSize="20px";
        li.style.margin="10px";
        

        const input=document.createElement("input")
        input.setAttribute("type","submit")
        input.setAttribute("value","Delete")
        li.appendChild(input)

        const edit=document.createElement("button")
        edit.appendChild(document.createTextNode("Edit"))
        edit.setAttribute("value","Edit")
        li.appendChild(edit);
        expenses[0].appendChild(li);
}
async function onsubmit(e)
{
    e.preventDefault()
    if(expense.value=="" || desc.value=="" || cat.value=="" )
    {
        const b=document.querySelector("body")
        const h3=document.createElement("h3")
        h3.appendChild(document.createTextNode("Please Enter All fields!"))
        h3.style.textAlign="center"
        h3.style.color="red";
        b.appendChild(h3)
        setTimeout(()=>b.lastChild.remove(),5000);

    }
    else
    {
        

        //To store data in local storage as objects
        const exp={Expense:expense.value,Description:desc.value,Category:cat.value}
        //const user_string=JSON.stringify(user)
        //localStorage.setItem(desc.value,user_string)
        try{
        const token=localStorage.getItem("token")
        const res=await axios.post("http://localhost:4000/expense/add",exp,{headers:{"Authorization":token}})
            showexpenseonscreen(res.data)
            expense.value=""
            desc.value=""
            cat.value=""
        }
        catch(err){
        error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
        setTimeout(()=>error.lastChild.remove(),5000)
        console.log(err)
        }
        
    }
}



    expenses[0].addEventListener("click",async (e)=>{

        if(e.target.value==="Delete")
        {
            
            //let desc = e.target.parentElement.childNodes[2].textContent
            //localStorage.removeItem(desc);
            const token =localStorage.getItem("token")
            try{
            const res=await axios.delete(`http://localhost:4000/expense/delete/${e.target.parentElement.id}`,{headers:{"Authorization":token}})
                expenses[0].removeChild(e.target.parentElement)
                console.log(res)}
            catch(err){
            error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
            setTimeout(()=>error.lastChild.remove(),5000)
            console.log(err)
            }
        }
        else if(e.target.value==="Edit")
        {   try{
            const token =localStorage.getItem("token")
            const res=await axios.delete(`http://localhost:4000/expense/delete/${e.target.parentElement.id}`,{headers:{"Authorization":token}})
                expenses[0].removeChild(e.target.parentElement)
                console.log(res)}
            catch(err){
            error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
            setTimeout(()=>error.lastChild.remove(),5000)
            console.log(err)
            }
            let de = e.target.parentElement.childNodes[2].textContent
            //localStorage.removeItem(de);
            desc.value=de
    
            let ex = e.target.parentElement.childNodes[0].textContent
            expense.value=ex
    
            let c= e.target.parentElement.childNodes[4].textContent
            cat.value=c;
    
        }
    })
    
