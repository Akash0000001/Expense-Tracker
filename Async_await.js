console.log("person1:shows ticket")
console.log("person2:shows ticket")
async function premovie(){
    const wifebringingtick=new Promise((resolve,reject)=>{
        resolve("ticket")
    })
    const getpopcorn= new Promise((resolve,reject)=>{
        resolve(`popcorn`)
    })
    const getbutter= new Promise((resolve,reject)=>{
        resolve(`butter`)
    })
    const getcolddrink= new Promise((resolve,reject)=>{
        resolve("cold drink")
    })

    const ticket=await wifebringingtick
    
    console.log(`wife:I got the ${ticket}.`)
    console.log("husband:we should go in")
    console.log("wife:no I am hungry.")

    const popcorn= await getpopcorn
    console.log(`husband:I got some ${popcorn}.`)
    console.log("husband:we should go in")
    console.log("wife:I need some butter on my popcorn.")

    const butter=await getbutter
    console.log(`husband:I got ${butter}.`)
    console.log(`husband:Anything else darling?`)
    console.log("wife:I want cold drink.")

    const colddrink= await getcolddrink
    console.log(`husband:I got ${colddrink}`)
    console.log("wife:Thank you! now we should go, we are getting late.")
    console.log("husband:Thank you for your reminder.")

    return ticket
}
premovie().then((msg)=>console.log(`person3:shows ${msg}`))
console.log("person4:shows ticket")
console.log("person5:shows ticket")