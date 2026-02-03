document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let userError = document.getElementById("userError");
    let passError = document.getElementById("passError");
    let successMsg = document.getElementById("successMsg");

    userError.textContent = "";
    passError.textContent = "";
    successMsg.textContent = "";

    let isValid = true;

    if (username === "") {
        userError.textContent = "Username is required";
        isValid = false;
    }

    if (password === "") {
        passError.textContent = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        passError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }
    if (isValid) {
        if (username === "admin" && password === "admin123") {
            successMsg.textContent = "Login successful!";
        } else {
            passError.textContent = "Invalid username or password. Please enter valid username and password.";
        }
    }
});
