const addCommentButton = document.getElementById("post-comment-button")
const commentForm = document.getElementById("comment-form")
const commentText = document.getElementById("comment-text").value.trim()

commentForm.onsubmit = async(event)=>{
    event.preventDefault()
    const postId = commentForm.dataset.post
    console.log(postId)
    const response = await fetch(`/post/${postId}/comment/new`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            post_id: postId,
            comment_body:commentText
        })
    })
    const data = await response.json()
    console.log(data)
}

