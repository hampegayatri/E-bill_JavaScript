document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const email = document.getElementById("email");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validation logic
        if (validateForm()) {
            // Retrieve user details from local storage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user exists
            const user = users.find(u => u.email === email.value);

            if (user) {
                // Generate and send OTP to user's email
                const otp = generateOTP();
                sendOTPByEmail(email.value, otp);

                // Store OTP in session storage
                sessionStorage.setItem("otp", otp);

                // Redirect to enter OTP page
                window.location.href = "enterOTP.html";
            } else {
                alert("Email not found. Please enter a valid email address.");
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

    const generateOTP = () => {
        // Generate a random 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendOTPByEmail = (email, otp) => {
        // Simulate sending OTP via email (You can implement your own logic here)
        console.log(`OTP sent to ${email}: ${otp}`);
    };
});
