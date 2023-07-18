const password=document.getElementById("password")

document.getElementById("form").onsubmit=async (e)=>{
    try{
    e.preventDefault()
    const res=await axios.post(window.location,{Password:password.value})
    
    alert("Password reset successfully")
    password.value=""
}
catch(err)
{
    console.log(err)
    document.getElementById("msg").textContent=`Error:Request failed with sttus code ${err.response.status}`
}
}