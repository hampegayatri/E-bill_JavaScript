document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-complaint-form");

    // Function to handle logout
    function logout() {
        // Remove user session details from sessionStorage
        sessionStorage.removeItem('loggedInUser');
        // Redirect to login page
        window.location.href = 'index.html'; // Replace 'index.html' with the actual path to your login page
    }

    // Function to validate file upload
    function validateFile(input) {
        const file = input.files[0];
        if (file) {
            const fileSize = file.size / 1024; // in KB
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                alert("Please select a valid image file (JPEG or PNG).");
                return false;
            }
            if (fileSize > 2048) {
                alert("File size should not exceed 2MB.");
                return false;
            }
        }
        return true;
    }

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const type = document.getElementById("type").value;
        if (type === "complaint") {
            const meterReadingInput = document.getElementById("meterReading");
            if (!meterReadingInput.files || meterReadingInput.files.length === 0) {
                alert("Please upload a meter reading file.");
                return;
            }
        }
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        localStorage.setItem("feedbackComplaintForm", JSON.stringify(formObject));
        form.reset();
        alert("Form submitted successfully!");
    });

    // Event listener to disable complaint type dropdown if feedback is selected
    const typeDropdown = document.getElementById("type");
    const complaintTypeDropdown = document.getElementById("complaintType");
    typeDropdown.addEventListener("change", function () {
        if (typeDropdown.value === "feedback") {
            complaintTypeDropdown.disabled = true;
            document.getElementById("meterReading").value = ""; // Reset meter reading input if feedback is selected
        } else {
            complaintTypeDropdown.disabled = false;
        }
    });

    // Event listener for form input validation
    form.addEventListener("input", function (event) {
        const { target } = event;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
            if (!target.checkValidity()) {
                target.classList.add("is-invalid");
            } else {
                target.classList.remove("is-invalid");
            }
        }
    });

    // Event listener for form reset
    form.addEventListener("reset", function () {
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.classList.remove("is-invalid");
        });
    });

    // Event listener for file upload validation
    const meterReadingInput = document.getElementById("meterReading");
    meterReadingInput.addEventListener("change", function () {
        if (!validateFile(meterReadingInput)) {
            meterReadingInput.value = ""; // Clear invalid file selection
        }
    });

    // Check if the user is logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }

    // Add event listener to the logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            logout(); // Call the logout function
        });
    }
});
