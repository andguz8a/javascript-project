const user = JSON.parse(localStorage.getItem("user"));

// Si no hay usuario → login
if (!user) {
    window.location.href = "index.html";
}
