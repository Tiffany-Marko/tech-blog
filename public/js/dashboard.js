const newPostForm = document.getElementById("dashboard-create-form")
const newPostTitle = document.getElementById("new-post-title")
const newPostContent = document.getElementById("new-post-content")
const deleteButtons = document.querySelectorAll(".delete-button")
const updateButtons = document.querySelectorAll(".update-button")

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
console.log(deleteButtons)
deleteButtons.forEach(function (button){
    button.onclick = async function(){
        console.log("clicked")
        const response = await fetch(`/post/${button.dataset.post}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
                        
            })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
})
console.log(updateButtons)
updateButtons.forEach(function (button){
    button.onclick = async function(){
        console.log("clicked")
        const updatePostTitle = document.getElementById(`post-title-${button.dataset.post}`)
        const updatePostContent = document.getElementById(`post-content-${button.dataset.post}`)
        const response = await fetch(`/post/${button.dataset.post}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({post_title: updatePostTitle.textContent, post_body:updatePostContent.textContent})            
            })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
})
