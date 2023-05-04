const form=document.getElementById("form");
const expense=document.getElementById("expense")
const desc=document.getElementById("description")
const cat=document.getElementById("category")
const users=document.getElementsByClassName("list-group")
form.addEventListener("submit",onsubmit);
function onsubmit(e)
{
    e.preventDefault()
    if(expense.value=="" || desc.value=="" || cat.value=="" )
    {
        const b=document.querySelector("body")
        const h3=document.createElement("h3")
        h3.appendChild(document.createTextNode("Please Enter All fields!"))
        h3.style.textAlign="center"
        h3.style.color="red";
        b.appendChild(h3)
        setTimeout(()=>b.lastChild.remove(),5000);

    }
    else
    {
        const li=document.createElement("li")
        li.className="list-group-item";
        const exp=document.createTextNode(expense.value);
        li.appendChild(exp)
        li.appendChild(document.createTextNode("-"))
        const des=document.createTextNode(desc.value)
        li.appendChild(des)
        li.appendChild(document.createTextNode("-"))
        const category=document.createTextNode(cat.value)
        li.appendChild(category)
        li.style.color="red"
        li.style.fontSize="20px";
        li.style.margi="10px";
        

        const input=document.createElement("input")
        input.setAttribute("type","submit")
        input.setAttribute("value","Delete")
        li.appendChild(input)

        const edit=document.createElement("button")
        edit.appendChild(document.createTextNode("Edit"))
        edit.setAttribute("value","Edit")
        li.appendChild(edit);
        users[0].appendChild(li);

        //To store data in local storage as objects
        const user ={Expense:expense.value,Description:desc.value,Category:cat.value}
        const user_string=JSON.stringify(user)
        localStorage.setItem(desc.value,user_string)
        
        expense.value=""
        desc.value=""
        cat.value=""
    }
}
    users[0].addEventListener("click",(e)=>{

        if(e.target.value=="Delete")
        {
            users[0].removeChild(e.target.parentElement)
            let desc = e.target.parentElement.childNodes[2].textContent
            localStorage.removeItem(desc);
        }
        else
        {
            users[0].removeChild(e.target.parentElement)
            let de = e.target.parentElement.childNodes[2].textContent
            localStorage.removeItem(de);
            desc.value=de
    
            let ex = e.target.parentElement.childNodes[0].textContent
            expense.value=ex
    
            let c= e.target.parentElement.childNodes[4].textContent
            cat.value=c;
    
        }
    })
    
