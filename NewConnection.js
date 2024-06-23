// Function to validate form data
function ValidateFormData() {
    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var fileInput = document.getElementById('aadharFile').files[0];
    var address = document.getElementById('address').value.trim();
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value.trim();
    var zip = document.getElementById('zip').value.trim();
    var country = document.getElementById('country').value;
    var connectionType = document.getElementById('connectionType').value;
    var loadRequirement = document.getElementById('loadRequirement').value.trim();
    var preferredDate = document.getElementById('preferredDate').value;

    // Regular expression for ZIP code (exactly 6 digits)
    var zipRegex = /^\d{6}$/;

    // Name validation
    if (!/^[A-Za-z\s]{1,50}$/.test(fullName)) {
        alert("Please enter a valid full name (only letters and spaces, max 50 characters).");
        return false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return false;
    }

    // Address validation
    if (address.length === 0) {
        alert("Please enter your address.");
        return false;
    }

    // City validation
    if (city.length === 0) {
        alert("Please enter your city.");
        return false;
    }

    // State validation
    if (state.length === 0) {
        alert("Please enter your state.");
        return false;
    }

    // ZIP code validation
    if (!zipRegex.test(zip)) {
        alert('Please enter a valid ZIP code (exactly 6 digits).');
        return false;
    }

    // Country validation
    if (country === "") {
        alert("Please select your country.");
        return false;
    }

    // Connection type validation
    if (connectionType === "") {
        alert("Please select a connection type.");
        return false;
    }

    // Load requirement validation
    if (!/^\d+(\.\d+)?$/.test(loadRequirement)) {
        alert("Please enter a valid load requirement in kW.");
        return false;
    }

    // Preferred date validation
    var currentDate = new Date().toISOString().split('T')[0];
    if (preferredDate === "") {
        alert("Please select a preferred connection date.");
        return false;
    } else if (preferredDate < currentDate) {
        alert("Preferred connection date cannot be in the past.");
        return false;
    }

    // File input validation
    if (!fileInput) {
        alert("Please upload a file.");
        return false;
    }

    return true;
}

// Function to store form data in localStorage
function StoreFormData() {
    if (!ValidateFormData()) {
        return; // Validation failed, do not proceed
    }

    var formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        connectionType: document.getElementById('connectionType').value,
        loadRequirement: document.getElementById('loadRequirement').value,
        preferredDate: document.getElementById('preferredDate').value,
        uploadFile: document.getElementById('aadharFile').files[0].name
    };

    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing data from localStorage
        var existingData = localStorage.getItem('newConnectionData');

        // If existingData is null or undefined, initialize an empty object
        var dataObject = existingData ? JSON.parse(existingData) : { data: [] };

        // Ensure that dataObject.data is properly initialized as an array
        if (!Array.isArray(dataObject.data)) {
            dataObject.data = [];
        }

        // Add new form data to the array
        dataObject.data.push(formData);

        // Store updated data back in localStorage
        localStorage.setItem('newConnectionData', JSON.stringify(dataObject));

        // Reset the form
        document.getElementById('newConnectionForm').reset();

        // Alert the user that the form has been submitted
        alert("Form submitted successfully!");

    } else {
        console.log("Sorry, your browser does not support web storage...");
    }
}

// Function to handle logout
function Logout() {
    // Remove user session details from sessionStorage
    sessionStorage.removeItem('loggedInUser');

    // Redirect to login page
    window.location.href = 'index.html'; // Replace 'index.html' with the actual path to your login page
}

// Add an event listener to the form for submission
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (!sessionStorage.getItem('loggedInUser')) {
        // If not logged in, redirect to login page
        window.location.href = 'index.html'; // Replace 'index.html' with the actual path to your login page
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        StoreFormData(); // Call the function to store form data
    });

    // Add an event listener to the logout link/button
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            Logout(); // Call the logout function
        });
    }

    // Set the min attribute of preferredDate input to today's date
    var preferredDateInput = document.getElementById('preferredDate');
    preferredDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
});
