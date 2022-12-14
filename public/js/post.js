const addCommentButton = document.getElementById("post-comment-button")
const commentForm = document.getElementById("comment-form")
const commentText = document.getElementById("comment-text").value


commentForm.onsubmit = async(event)=>{
    event.preventDefault()
    const postId = commentForm.dataset.post
    console.log("comment text: ", document.getElementById("comment-text").value)
    const response = await fetch(`/post/${postId}/comment/new`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            post_id: postId,
            comment_body: document.getElementById("comment-text").value
        })
    })
    const data = await response.json()
    console.log(data)
}

