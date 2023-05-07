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

function deletePost(){
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
async function post()
{
    const [createpost,crelat]=await Promise.all([createPost({title:"Post 4"}),updateLastUserActivityTime()])
    posts.forEach((post)=>console.log(post.title))
    console.log(`last user activity:${crelat}`)   

    const [deletepost,lat]=await Promise.all([deletePost(),updateLastUserActivityTime()])
    posts.forEach((post)=>console.log(post.title))
    console.log(`last user activity:${lat}`)
}
post()



