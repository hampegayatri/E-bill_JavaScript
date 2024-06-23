document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validation logic
        if (validateForm()) {
            // Retrieve user details from local storage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user exists and credentials match
            const user = users.find(u => u.email === email.value && u.password === password.value);

            if (user) {
                // Store user details in session storage
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                
                // Redirect to home page if login successful
                alert("Login successful!");
                form.reset();
                // Redirect to home page after alert
                window.location.href = "Home.html";
            } else {
                // Display error message if credentials are incorrect
                alert("Invalid email or password. Please try again.");
            }
        }
    });

    const validateForm = () => {
        // Reset previous validation messages
        resetValidationMessages();

        let isValid = true;

        // Validate email
        if (!/\S+@\S+\.\S+/.test(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Validate password
        if (password.value.length < 6) {
            showError(password, "Password should be at least 6 characters long.");
            isValid = false;
        }

        return isValid;
    };

    const showError = (element, message) => {
        const errorDiv = document.createElement("div");
        errorDiv.className = "invalid-feedback";
        errorDiv.innerText = message;
        element.classList.add("is-invalid");
        element.parentNode.appendChild(errorDiv);
    };

    const resetValidationMessages = () => {
        document.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
        document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    };
});
