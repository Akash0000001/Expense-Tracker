const Email=document.getElementById("email")
const Password=document.getElementById("password")
const form=document.getElementById("form")
const msg=document.getElementById("msg")

form.addEventListener("submit",onsubmit)
async function onsubmit(e)
{
    e.preventDefault();
    const user={Name:Email.value,Password:Password.value}
    try{
    const res=await axios.post("http://localhost:4000/user/login",user)
    alert("user logged in successfully")
    }
    catch(err){
        console.log(err)
        if(err.status===400)
        {
        msg.innerText="User donot exist"
    }
    else{
        msg.innerText="Something went wrong"
    }
}
}