function handlesignup(event){
    event.preventDefault()
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    if (username && password){
        fetch("/api/register",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({username,password,email})
        })
.then(()=>{
    document.location.replace("/dashboard")
})
.catch(error =>{
    console.log(error)
})
    }
}
document.getElementById("signupform").addEventListener("submit", handlesignup)