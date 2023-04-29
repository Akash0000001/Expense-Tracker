function register(event)
{
    event.preventDefault();
    const name=document.querySelector("#name");
    const email=document.querySelector("#email");
    const phone=document.querySelector("#phone");
    const date =document.querySelector("#date");
    const time=document.querySelector("#time");
    const msg=document.querySelector("#msg");
    const users=document.querySelector("#users");
    if(name.value=="" || email.value=="" || phone.value=="" || date.value=="" || time.value=="")
    {   
        msg.classList.add("error")
        msg.textContent="please enter all the fields!"
        console.log(msg.childNodes)
        setTimeout(() => {
            msg.firstChild.remove()
            msg.classList.remove("error")
        },3000);
    }
    else
        {   
            //to show the user data on screen
            const li=document.createElement("li")
            li.className="list-group-item";
            const tname=document.createTextNode(`Name:${name.value}, `)
            li.appendChild(tname)
            const temail=document.createTextNode(`Email:${email.value}, `)
            li.appendChild(temail)
            const tphone=document.createTextNode(`Phone:${phone.value}, `)
            li.appendChild(tphone)
            const tdate=document.createTextNode(`Date:${date.value}, `)
            li.appendChild(tdate)
            const ttime=document.createTextNode(`Time:${time.value} `)
            li.appendChild(ttime)
            li.style.color="red";
            
            const users=document.getElementById("users")
            const input=document.createElement("input")
            input.setAttribute("type","submit")
            input.setAttribute("value","Delete")
            li.append(input)
            users.appendChild(li)

            //To store data in local storage as objects
            const user ={Name:name.value,Email:email.value,Phone:phone.value,Date:date.value,Time:time.value}
            const user_string=JSON.stringify(user)
            localStorage.setItem(email.value,user_string)
            
            name.value="";
            email.value="";
            phone.value="";
            date.value="";
            time.value="";
        }
}
const form=document.querySelector("#form")
form.addEventListener("submit",register)
const submit=document.querySelector(".btn")
submit.addEventListener("click",(e)=>{
    document.querySelector(".btn").style.background="#4055CC";
})
submit.addEventListener("mouseout",(e)=>{
    document.querySelector("#form").style.background="white";
})
submit.addEventListener("mouseover",(e)=>{
    document.querySelector("#form").style.background="#DDDDDD";
})

users.addEventListener("click",(e)=>{
    users.removeChild(e.target.parentElement)
    let email = e.target.parentElement.childNodes[1].textContent
    email=email.substring(email.indexOf(":")+1,email.indexOf(","));
    localStorage.removeItem(email);
})