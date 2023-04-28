const form=document.getElementById("addForm");
const items=document.getElementById("items");
const filter=document.getElementById("filter");

form.addEventListener("submit",additem);
items.addEventListener("click",removeitem)
filter.addEventListener("keyup",filteritem)

//Add editbutton next to deletebutton
const itemlist=document.getElementsByTagName("li");
for(let i=0;i<itemlist.length;i++)
{   
    const editbtn=document.createElement("button");
    editbtn.className="btn btn-danger btn-sm float-right edit";
    editbtn.appendChild(document.createTextNode("Edit"));
    itemlist[i].appendChild(editbtn);
}


//Add item
function additem(e)
{
    e.preventDefault();
    const newitem=document.getElementById("item").value;
    const newdesc=document.getElementById("desc").value;
    
    const li=document.createElement("li");
    li.className="list-group-item";
    li.appendChild(document.createTextNode(`${newitem} ${newdesc}`))

    const deletebtn=document.createElement("button");
    deletebtn.className="btn btn-danger btn-sm float-right delete";
    deletebtn.appendChild(document.createTextNode("X"));
    li.append(deletebtn);

    const editbtn=document.createElement("button");
    editbtn.className="btn btn-danger btn-sm float-right edit";
    editbtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editbtn);
    
    
    items.appendChild(li)
}


//Remove item
function removeitem(e)
{
    if(e.target.classList.contains("delete"))
    {
        if(confirm("Are you sure to delete the item from list?"))
        {
            const li=e.target.parentElement
            items.removeChild(li)
        }
    }
}

//Filter item
function filteritem(e)
{
    const text=e.target.value.toLowerCase();
    const itemlist=items.getElementsByTagName("li");
    Array.from(itemlist).forEach((item)=>{
        const itemname=item.firstChild.textContent;
        if(itemname.toLowerCase().indexOf(text)!=-1)
            item.style.display="block";
        else
            item.style.display="none";
    });
}
