//Getting items by class Name "list-group-item".
const items=document.getElementsByClassName("list-group-item");
//All the items except Item 5 text-color will be changed to "red" because Item 5 is not of above class "list-group-item".
for(let i=0;i<items.length;i++)
{
    items[i].style.color="red";
}

//Getting items by tag name "li".
const li=document.getElementsByTagName("li");
//All the items background color changed to grey as all the items have tag name "li".
for(let i=0;i<li.length;i++)
{
    li[i].style.backgroundColor="grey";
}


