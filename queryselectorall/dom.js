const items=document.querySelectorAll(".list-group-item");
items[1].style.color="green";
const odd=document.querySelectorAll(".list-group-item:nth-child(odd)");
for(i=0;i<odd.length;i++)
{
    odd[i].style.backgroundColor="green"
}




