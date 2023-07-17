const email=document.getElementById("email")
const form=document.getElementById("form")

form.onsubmit=async (e)=>{
    e.preventDefault();
    try{
    const res=await axios.post("http://localhost:4000/password/forgetpassword",{Email:email.value})
}
catch(err)
{
    console.log(err)
}
}