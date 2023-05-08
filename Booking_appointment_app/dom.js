
const Name=document.querySelector("#name");
const email=document.querySelector("#email");
const phone=document.querySelector("#phone");
const date =document.querySelector("#date");
const time=document.querySelector("#time");
const msg=document.querySelector("#msg");
const users=document.querySelector("#users");

function showuseronscreen(data){
    const li=document.createElement("li")
    li.className="list-group-item";
    li.id=data._id
    const tname=document.createTextNode(`Name:${data.Name}, `)
    li.appendChild(tname)
    const temail=document.createTextNode(`Email:${data.Email}, `)
    li.appendChild(temail)
    const tphone=document.createTextNode(`Phone:${data.Phone}, `)
    li.appendChild(tphone)
    const tdate=document.createTextNode(`Date:${data.Date}, `)
    li.appendChild(tdate)
    const ttime=document.createTextNode(`Time:${data.Time} `)
    li.appendChild(ttime)
    li.style.color="red"

    const input=document.createElement("input")
    input.setAttribute("type","submit")
    input.setAttribute("value","Delete")
    li.append(input)

    const edit=document.createElement("button")
    edit.appendChild(document.createTextNode("Edit"))
    edit.setAttribute("value","Edit")
    li.append(edit);
    users.appendChild(li)
}

function register(event)
{
    event.preventDefault();
    if(Name.value=="" || email.value=="" || phone.value=="" || date.value=="" || time.value=="")
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
            
            //To store data in local storage as objects
             const user ={Name:Name.value,Email:email.value,Phone:phone.value,Date:date.value,Time:time.value}
            //const user_string=JSON.stringify(user)
            // localStorage.setItem(email.value,user_string)

            //To store data in cloud
            axios.post("https://crudcrud.com/api/b182041f3c9b4fdba556bf039adfb507/appointment_data",user)
            .then(res=>showuseronscreen(res.data))
            .catch(err=>{
                document.body.innerHTML=document.body.innerHTML+"<h4 style='color:red;'>Something went wrong! </h4>"
                setTimeout(()=>document.body.lastElementChild.remove(),5000)
                console.log(err)
            })
            
            Name.value="";
            email.value="";
            phone.value="";
            date.value="";
            time.value="";
        }
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/b182041f3c9b4fdba556bf039adfb507/appointment_data")
    .then(res=>{
        res.data.forEach(d=>showuseronscreen(d))
        console.log(res)
    })
    .catch(err=>{
        document.body.innerHTML=document.body.innerHTML+"<h4 style='color:red;'>Something went wrong! </h4>"
        setTimeout(()=>document.body.lastElementChild.remove(),5000)
        console.log(err)
    })
})
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

    if(e.target.value=="Delete")
    {
        users.removeChild(e.target.parentElement)
        
        axios.delete(`https://crudcrud.com/api/b182041f3c9b4fdba556bf039adfb507/appointment_data/${e.target.parentElement.id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        //localStorage.removeItem(email);
    }
    else
    {
        users.removeChild(e.target.parentElement)
        axios.delete(`https://crudcrud.com/api/b182041f3c9b4fdba556bf039adfb507/appointment_data/${e.target.parentElement.id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        let em = e.target.parentElement.childNodes[1].textContent
        em=em.substring(em.indexOf(":")+1,em.indexOf(","));

        //localStorage.removeItem(em);
        email.value=em

        let nm = e.target.parentElement.childNodes[0].textContent
        nm=nm.substring(nm.indexOf(":")+1,nm.indexOf(","));
        Name.value=nm;

        let ph = e.target.parentElement.childNodes[2].textContent
        ph=ph.substring(ph.indexOf(":")+1,ph.indexOf(","));
        phone.value=ph;

        let Dt = e.target.parentElement.childNodes[3].textContent
        Dt=Dt.substring(Dt.indexOf(":")+1,Dt.indexOf(","));
        date.value=Dt

        let tm = e.target.parentElement.childNodes[4].textContent
        tm=tm.substring(tm.indexOf(":")+1,tm.indexOf(" "));
        time.value=tm

    }
})