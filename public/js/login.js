function handlelogin(event){
    event.preventDefault()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    if (username && password){
        fetch("/api/login",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({username,password})
        })
.then(()=>{
    document.location.replace("/dashboard")
})
.catch(error =>{
    console.log(error)
})
    }
}
document.getElementById("loginform").addEventListener("submit", handlelogin)