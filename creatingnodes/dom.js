const items=document.querySelector("#items");
//parentNode
console.log(items.parentNode);
items.parentNode.style.backgroundColor="#ff0000";
console.log(items.parentNode.parentNode.parentNode);

//parentElement
console.log(items.parentElement);
items.parentElement.style.backgroundColor="grey";
console.log(items.parentElement.parentElement.parentElement);

//childNodes
console.log(items.childNodes);

//children
console.log(items.children);
console.log(items.children[1].style);
items.children[1].style.backgroundColor="#456789";

//firstChild
console.log(items.firstChild);

//firstElementChild
console.log(items.firstElementChild);
items.firstElementChild.style.color="red";

//lastChild
console.log(items.lastChild)

//lastElementChild
console.log(items.lastElementChild);
items.lastElementChild.textContent="Hello 4";

//nextSibling
console.log(items.nextSibling);

//nextElementSibling
console.log(items.nextElementSibling);

//previousSibling
console.log(items.previousSibling);

//previousElementSibling
console.log(items.previousElementSibling);
items.previousElementSibling.style.color="blue";

//createElement

//create a div
const newdiv=document.createElement("div")

//Add class
newdiv.className="container";

//Add id
newdiv.id="hello1";

//add attr
newdiv.setAttribute("title","Hello Div");

//create text node
const newdivtext=document.createTextNode("Hello World");

//Add text to div
newdiv.appendChild(newdivtext);

newdiv.style.fontSize="30px";
newdiv.style.color="red";

console.log(newdiv);

const container=document.querySelector("header .container")
const h1=document.querySelector("header h1")
container.insertBefore(newdiv,h1)

const p=document.createElement("p")
p.id="para";
const ptext=document.createTextNode("Hello World")
p.appendChild(ptext);
p.style.fontSize="20px";
p.style.color="#ff0000"

console.log(p);

const main=document.querySelector("#main");

main.insertBefore(p,items);






