const newPostForm = document.getElementById("dashboard-create-form")
const newPostTitle = document.getElementById("new-post-title")
const newPostContent = document.getElementById("new-post-content")

newPostForm.onsubmit = async function (event){
    event.preventDefault()
    const response = await fetch("/dashboard/create", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({post_title: newPostTitle.value, post_body:newPostContent.value})
        
    })
    location.reload()
}