document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const zip = document.getElementById("zip");
    const country = document.getElementById("country");
    const terms = document.getElementById("terms");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validation logic
        if (validateForm()) {
            // Retrieve existing user details from local storage or initialize an empty array
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Add new user details to the array
            const userDetails = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
                address: address.value,
                city: city.value,
                state: state.value,
                zip: zip.value,
                country: country.value,
            };
            users.push(userDetails);

            // Store the updated array back to local storage
            localStorage.setItem("users", JSON.stringify(users));

            alert("User details saved successfully!");
            form.reset(); // Reset the form

            // Redirect to login page after alert
            window.location.href = "index.html";
        }
    });

    const validateForm = () => {
        // Reset previous validation messages
        resetValidationMessages();

        let isValid = true;

        // Validate first name
        if (!/^[A-Za-z\s]{1,50}$/.test(firstName.value)) {
            showError(firstName, "First name should contain only letters and spaces, and be up to 50 characters.");
            isValid = false;
        }

        // Validate last name
        if (!/^[A-Za-z\s]{1,50}$/.test(lastName.value)) {
            showError(lastName, "Last name should contain only letters and spaces, and be up to 50 characters.");
            isValid = false;
        }

        // Validate email
        if (!/\S+@\S+\.\S+/.test(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Validate phone number
        if (!/^[0-9]{10}$/.test(phone.value)) {
            showError(phone, "Phone number should be exactly 10 digits.");
            isValid = false;
        }

        // Validate password
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/.test(password.value)) {
            showError(password, "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long.");
            isValid = false;
        }

        // Validate confirm password
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match.");
            isValid = false;
        }

        // Validate address
        if (address.value.trim() === "") {
            showError(address, "Address cannot be empty.");
            isValid = false;
        }

        // Validate city
        if (city.value.trim() === "") {
            showError(city, "City cannot be empty.");
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(city.value)) {
            showError(city, "City should contain only letters and spaces.");
            isValid = false;
        }

        // Validate state
        if (state.value.trim() === "") {
            showError(state, "State cannot be empty.");
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(state.value)) {
            showError(state, "State should contain only letters and spaces.");
            isValid = false;
        }

        // Validate ZIP code
        if (zip.value.trim() === "") {
            showError(zip, "ZIP code cannot be empty.");
            isValid = false;
        } else if (!/^\d{6}$/.test(zip.value.trim())) {
            showError(zip, "ZIP code should contain exactly 6 digits.");
            isValid = false;
        }

        // Validate country
        if (country.value === "") {
            showError(country, "Please select a country.");
            isValid = false;
        }

        // Validate terms and conditions
        if (!terms.checked) {
            showError(terms, "You must agree to the terms and conditions.");
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
