const posts=[{title:"Post 1"},{title:"Post 2"},{title:"Post 3"}]
function createPost(post)
{
    return new Promise((res,rej)=>{
       setTimeout(()=>{ posts.push(post)
        res()
       },1000)
    })
}
function updateLastUserActivityTime()
{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(new Date())
        },2000)
    })
}
function deletepost(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            if(posts.length>0)
            {
                posts.pop()
                res()
            }
            else
                rej("ARRAY IS EMPTY")   
    },5000)
})
}

Promise.all([createPost({title:"Post 4"}),updateLastUserActivityTime()]).then(([res1,res2])=>{
    posts.forEach((post)=>console.log(post.title))
    console.log(`last activity time:${res2}`)
})
Promise.all([deletepost(),updateLastUserActivityTime()]).then(([res1,res2])=>{
    posts.forEach((post)=>console.log(post.title))
    console.log(`last activity time:${res2}`)
})

