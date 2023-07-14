const Email=document.getElementById("email")
const Password=document.getElementById("password")
const form=document.getElementById("form")
const msg=document.getElementById("msg")

form.addEventListener("submit",onsubmit)
async function onsubmit(e)
{
    e.preventDefault();
    const user={Email:Email.value,Password:Password.value}
    try{
    const res=await axios.post("http://localhost:4000/user/login",user)
    alert(res.data.message)
    window.location.assign("index.html")
    }
    catch(err){
        if(err.response)
        {
            msg.innerText=err.response.data.message
            
        }
        else{
            msg.innerText="Something Went wrong"
        }
        setTimeout(()=>msg.firstChild.remove(),5000)
        console.log(err)
    }
}
