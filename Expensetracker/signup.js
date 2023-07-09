const Name=document.getElementById("name")
const Email=document.getElementById("email")
const Password=document.getElementById("password")
const form=document.getElementById("form")
const message=document.getElementById("msg")

form.addEventListener("submit",onsubmit)

function onsubmit(e)
{
    e.preventDefault();
    const user ={Name:Name.value,Email:Email.value,Password:Password.value}
    axios.post("http://localhost:4000/user/signup",user)
    .then(res=>console.log(res))
    .catch(err=>{
        if(err.response && err.response.data.name==="SequelizeUniqueConstraintError")
        {
        message.innerText="Error:User already exists"
        }
        else
        {
            message.innerText="Error:Something went wrong"
        }
        console.log(err)
    })
}