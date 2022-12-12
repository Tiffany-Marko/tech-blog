const deleteButtons = document.querySelectorAll(".comment-delete-button")
const updateButtons = document.querySelectorAll(".comment-update-button")
const commentContentItems = document.querySelectorAll(".post-comments")
console.log(commentContentItems)
commentContentItems.forEach(function(item){
    item.onclick = function(event){
        event.preventDefault()
        event.stopPropagation()
    }
})
deleteButtons.forEach(function (button){
    button.onclick = async function(event){
        console.log("clicked")
        event.stopPropagation()
        const response = await fetch(`/comment/${button.dataset.comment}`, {
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
updateButtons.forEach(function (button){
    button.onclick = async function(event){
        console.log("clicked")
        event.preventDefault()
        event.stopPropagation()
        const updateCommentContent = document.getElementById(`comment-${button.dataset.comment}`)
        const response = await fetch(`/comment/${button.dataset.comment}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({comment_body:updateCommentContent.textContent})            
            })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
})