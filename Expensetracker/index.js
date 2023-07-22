const form=document.getElementById("form");
const expense=document.getElementById("expense")
const desc=document.getElementById("description")
const cat=document.getElementById("category")
const expenses=document.getElementsByClassName("list-group")
const error=document.querySelector(".error")
const premiumcol=document.getElementById("premiumcol")
const pagination=document.getElementById("pagination")
console.log(expenses)

function showleaderboardonscreen(data)
{
    const li=document.createElement("li")
    li.className="list-group-item"
    li.appendChild(document.createTextNode(`Name-${data.Name} Total Expense-${data.totalexpenses}`))
    document.getElementById("leaderboard").appendChild(li)
}
function showdownloadedfilesurlonscreen(data)
{
    const li=document.createElement("li")
    li.id=data.id
    li.className="list-group-item"
    li.style.fontSize="13px"
    li.innerHTML=`${new Date(data.createdAt).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})
} IST(Indian Standard Time) - <a href=${data.url}>download file</a>`
    document.getElementById("files-list").appendChild(li)
}

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
    const token=localStorage.getItem("token")
    //const ispremium=localStorage.getItem("ispremium")    
    const page=1;
    const res=await axios.get(`http://localhost:4000/expense/list?page=${page}`,{headers:{"Authorization":token,rowsperpage:localStorage.getItem("rowsperpage")}})
    //console.log(res)
        if(res.data.ispremiumuser===true)
        {
        document.getElementById("premiumcol").innerHTML="<p style='color:blue;'>You are a premium user </p>";
        document.getElementById("leaderboardcol").innerHTML="<button id='lb-button'> Show Leaderboard</button>"
        document.getElementById("downloadfiles-header").textContent="Downloaded Files Urls"
         res.data.filesurl.forEach(url=>showdownloadedfilesurlonscreen(url))
        }
        
        res.data.expenseperpage.forEach(element => {
            showexpenseonscreen(element)
        });
    
        showpagination(res.data.pagedetails)
    }
    catch(err){
        error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
        setTimeout(()=>error.lastChild.remove(),5000)
        console.log(err)
    }
})
async function showpagination(pagedetails)

{
    pagination.innerHTML=""
    if(pagedetails.haspreviouspage)
    {
        const btn1=document.createElement("button")
        btn1.innerHTML=pagedetails.previouspage;
        btn1.className="btn btn-primary";
        btn1.onclick=async(e)=>{
            
            getexpenses(pagedetails.previouspage)

        }
        pagination.appendChild(btn1)
    }
    const btn2=document.createElement("button")
        btn2.innerHTML=pagedetails.currentpage;
        btn2.className="btn btn-primary";
        btn2.onclick=async(e)=>{
            
            getexpenses(pagedetails.currentpage)

        }
        pagination.appendChild(btn2)
    if(pagedetails.hasnextpage)
    {
        const btn3=document.createElement("button")
        btn3.innerHTML=pagedetails.nextpage;
        btn3.className="btn btn-primary";
        btn3.onclick=async(e)=>{
            getexpenses(pagedetails.nextpage)
        }
        pagination.appendChild(btn3)
    }
}
async function getexpenses(page)
{
    try{
        const token=localStorage.getItem("token")
        //const ispremium=localStorage.getItem("ispremium")
        const rowsperpage=localStorage.getItem("rowsperpage")    
        const res=await axios.get(`http://localhost:4000/expense/list?page=${page}`,{headers:{"Authorization":token,rowsperpage:rowsperpage}})
            if(res.data.ispremiumuser===true)
            {
            document.getElementById("premiumcol").innerHTML="<p style='color:blue;'>You are a premium user </p>";
            document.getElementById("leaderboardcol").innerHTML="<button id='lb-button'> Show Leaderboard</button>"
             document.getElementById("downloadfiles-header").textContent="Downloaded Files Urls"
             document.getElementById("files-list").innerHTML=""
            res.data.filesurl.forEach(url=>showdownloadedfilesurlonscreen(url))
            }
            expenses[0].innerHTML=""
            res.data.expenseperpage.forEach(element => {
                showexpenseonscreen(element)
            });
            showpagination(res.data.pagedetails)
        }
        catch(err){
            error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
            setTimeout(()=>error.lastChild.remove(),5000)
            console.log(err)
        }
}

document.getElementById("rows-form").onsubmit=async(e)=>{
    e.preventDefault()
    const rowsperpage=document.getElementById("rows").value
    localStorage.setItem("rowsperpage",rowsperpage)
}

document.getElementById("leaderboardcol").onclick=async function(e)
{
    if(e.target.id==="lb-button")
    {
        try{
        const res=await axios.get("http://localhost:4000/premium/leaderboard")
        document.getElementById("lb-header").textContent="Leader Board"
        document.getElementById("leaderboard").innerHTML="";
        res.data.forEach(data=>showleaderboardonscreen(data))
        }
        catch(err)
        {
                error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
                setTimeout(()=>error.lastChild.remove(),5000)
                console.log(err)   
        }
    }
}

document.getElementById("rzp-button1").onclick = async function(e){
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
        document.getElementById("premiumcol").innerHTML="<p style='color:blue;'>You are a premium user </p>";
        document.getElementById("leaderboardcol").innerHTML="<p><button id='lb-button'> Show Leaderboard</button></p>"
        document.getElementById("downloadedfiles-header").textContent="Downloaded Files Urls"
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
    error.innerHTML=`<h4 style='color:red;'> ${err} </h4>`
    setTimeout(()=>error.lastChild.remove(),5000)
}
}

document.getElementById("download").onclick=async (e)=>{
try{
    const token=localStorage.getItem("token")
    const res=await axios.get("http://localhost:4000/expense/Download",{headers:{"Authorization":token}})
    console.log(res)

    showdownloadedfilesurlonscreen(res.data.result)
    const a=document.createElement("a")
    a.href=res.data.result.url;
    a.download="myexpense.txt";
    a.click();
}
catch(err)
{
   console.log(err)
   if(err.response)
   {
   error.innerHTML=`<h3>Error: ${err.message}-${err.response.statusText}</h3>`
   }
   else{
    error.innerHTML=`<h3>Error: ${err.message}</h3>`
   }
   error.style.color="red";
   setTimeout(()=>error.firstChild.remove(),5000)
}
}

form.addEventListener("submit",onsubmit);
function showexpenseonscreen(data)
{       
        const li=document.createElement("li")
        li.id=data.id;
        li.className="list-group-item";
        //li.style.fontSize="12px"
        const exp=document.createTextNode(data.expense);
        li.appendChild(exp)

        li.appendChild(document.createTextNode("-"))
        const category=document.createTextNode(data.category)
        li.appendChild(category)

        li.appendChild(document.createTextNode("-"))
        const des=document.createTextNode(data.description)
        li.appendChild(des)
        
        // li.style.color="red"
        // li.style.fontSize="15px";
        // li.style.margin="10px";
        
        const input=document.createElement("input")
        input.setAttribute("type","submit")
        input.setAttribute("value","Delete")
        input.style.marginLeft="5px"
        li.appendChild(input)

        const edit=document.createElement("button")
        edit.appendChild(document.createTextNode("Edit"))
        edit.style.borderWidth="1px";
        edit.style.marginLeft="5px";
        edit.setAttribute("value","Edit")
        li.appendChild(edit);
        expenses[0].appendChild(li);
}
async function onsubmit(e)
{
    e.preventDefault()
    if(expense.value=="" || desc.value=="" || cat.value=="" )
    {
        const h3=document.createElement("h3")
        h3.appendChild(document.createTextNode("Please Enter All fields!"))
        h3.style.textAlign="center"
        h3.style.color="red";
        error.appendChild(h3)
        setTimeout(()=>error.lastChild.remove(),5000);

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
        error.innerHTML=`<h4 style='color:red;'>Error:${err.message}</h4>`
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
            let de = e.target.parentElement.childNodes[2].textContent
            desc.value=de
    
            let ex = e.target.parentElement.childNodes[0].textContent
            expense.value=ex
    
            let c= e.target.parentElement.childNodes[4].textContent
            cat.value=c;
                console.log(res)
            }
            catch(err){
            error.innerHTML="<h4 style='color:red;'>Something went wrong! </h4>"
            setTimeout(()=>error.lastChild.remove(),5000)
            console.log(err)
            }
        }
    })
    
