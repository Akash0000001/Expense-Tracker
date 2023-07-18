const email=document.getElementById("email")
const form=document.getElementById("form")
const msg=document.getElementById("msg")

form.onsubmit=async (e)=>{
    e.preventDefault();
    try{
    const res=await axios.post("http://localhost:4000/password/forgotpassword",{Email:email.value})
    msg.textContent=res.data;
    msg.style.color="blue";
    setTimeout(()=>msg.firstChild.remove(),5000)
}
catch(err)
{
    msg.textContent=`Error:request failed with status code ${err.response.status}`
    msg.style.color="red";
    setTimeout(()=>msg.firstChild.remove(),5000)
    console.log(err)
}
}