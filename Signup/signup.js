const Name=document.getElementById("name")
const Email=document.getElementById("email")
const Password=document.getElementById("password")
const form=document.getElementById("form")
const message=document.getElementById("msg")

form.addEventListener("submit",onsubmit)

async function onsubmit(e)
{
    e.preventDefault();
    const user ={Name:Name.value,Email:Email.value,Password:Password.value}
    try{
    const res=await axios.post("http://43.205.111.226:4000/user/signup",user)
        
        window.location.href="../login/login.html"
    }
    catch(err){
        if(err.response && err.response.data.name==="SequelizeUniqueConstraintError")
        {
        message.innerText="Error:User already exists"
        }
        else
        {
            message.innerText="Error:Something went wrong"
        }
        setTimeout(()=>message.firstChild.remove(),5000)
        console.log(err)
    }
}