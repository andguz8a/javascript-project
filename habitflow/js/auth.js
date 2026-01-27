const users = [
    {
        email: "and.guz8a@gmail.com",
        password: "1234",
        name: "Admin"
    },
    {
        email: "ana.mil8a@gmail.com",
        password: "abcd",
        name: "User"
    }
]


const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", function (event) {
    event.preventDefault()

    
    
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const decisionCard = document.getElementById("decisionCard")
    const resultText = document.getElementById("result")

    function showMessage(message) {
    resultText.textContent = message  
    decisionCard.classList.remove("hidden")
    }

    const userFound = users.find(user => 
        user.email === email && user.password === password
    )

    if (userFound) {

    localStorage.setItem("user", JSON.stringify(userFound))


    window.location.href = "habits.html"
    } else {
        showMessage("Incorrect email or password")
    }
})

