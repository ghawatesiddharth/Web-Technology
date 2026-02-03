document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let userError = document.getElementById("userError");
    let passError = document.getElementById("passError");
    let successMsg = document.getElementById("successMsg");

    userError.textContent = "";
    passError.textContent = "";
    successMsg.textContent = "";

    let isValid = true;

    if (email === "") {
        userError.textContent = "Email is required";
        isValid = false;
    } 
    else if (!emailPattern.test(email)) {
        userError.textContent = "Enter a valid email address";
        isValid = false;
    }

    if (password === "") {
        passError.textContent = "Password is required";
        isValid = false;
    } 
    else if (password.length < 6) {
        passError.textContent = "Password must be at least 6 characters long";
        isValid = false;
    }
    if (isValid) {
        successMsg.textContent = "Email and password are valid!";
    }
});
