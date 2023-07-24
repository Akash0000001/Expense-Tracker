const Email=document.getElementById("email")
const Password=document.getElementById("password")
const form=document.getElementById("form")
const signup=document.getElementById("signup")
const msg=document.getElementById("msg")
const forgotpassword=document.getElementById("fp")

form.addEventListener("submit",onsubmit)
async function onsubmit(e)
{
    e.preventDefault();
    const user={Email:Email.value,Password:Password.value}
    try{
    const res=await axios.post("http://43.205.111.226:4000/user/login",user)
    alert(res.data.message)
    localStorage.setItem("token",res.data.token)
    //localStorage.setItem("ispremium",res.data.ispremium)
    window.location.assign("/Expense/expense.html")
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

signup.onclick=async (e)=>{
    window.location.href="/Signup/signup.html"
}

forgotpassword.onclick=async (e)=>{
    window.location.href="/ForgotPassword/forgotpassword.html"
}