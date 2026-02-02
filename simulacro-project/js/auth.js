const API_URL = "http://localhost:3000";

// Formularios
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/* =========================
   LOGIN
========================= */
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const loginError = document.getElementById("loginError");

        fetch(`${API_URL}/users?email=${email}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    loginError.textContent = "Invalid email or password";
                    loginError.classList.remove("hidden");
                    return;
                }

                const user = data[0];
                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "menu.html";
                }
            })
            .catch(err => console.error(err));
    });
}

/* =========================
   REGISTER
========================= */
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const registerError = document.getElementById("registerError");

        // Limpiar error
        registerError.classList.add("hidden");

        // Validar passwords
        if (password !== confirmPassword) {
            registerError.textContent = "Passwords do not match";
            registerError.classList.remove("hidden");
            return;
        }

        const newUser = {
            name,
            email,
            password,
            role: "user"
        };

        // Verificar si el email ya existe
        fetch(`${API_URL}/users?email=${email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    registerError.textContent = "Email already registered";
                    registerError.classList.remove("hidden");
                    return;
                }

                // Crear usuario
                return fetch(`${API_URL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });
            })
            .then(res => {
                if (res && res.ok) {
                    window.location.href = "index.html";
                }
            })
            .catch(err => console.error(err));
    });
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

