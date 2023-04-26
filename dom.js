console.log(document)
console.log(document.URL)
console.log(document.domain);
document.title="list of item";
console.log(document.doctype);
console.log(document.body);
console.log(document.head);
console.log(document.all);
console.log(document.forms);
console.log(document.images);
const header=document.getElementById("main-header");
header.style.border="4px solid black";
const titles=document.getElementsByClassName("title");
titles[0].style.fontWeight="bold";
titles[0].style.color="green";



