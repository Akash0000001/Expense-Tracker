const items=document.getElementsByClassName("list-group-item");
console.log(items);
for(let i=0;i<items.length;i++)
{
    items[i].style.fontWeight="bold";
}
items[2].style.backgroundColor="green"


