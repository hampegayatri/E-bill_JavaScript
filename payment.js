// Store a fixed OTP in local storage for demo purposes
const fixedOtp = '1234';
localStorage.setItem('otp', fixedOtp);

// Check if the user is logged in when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve values from the form
    const billNumber = document.getElementById('billNumber').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validation flags
    let isValid = true;
    let errorMessage = "";

    // Validate Bill Number
    const billNumberPattern = /^[A-Za-z]{2}\d{6}$/;
    if (!billNumberPattern.test(billNumber)) {
        isValid = false;
        errorMessage += "Bill Number must start with 2 alphabets followed by 6 digits.\n";
    }

    // Validate Amount
    if (!/^\d+$/.test(amount) || parseFloat(amount) <= 0) {
        isValid = false;
        errorMessage += "Enter a valid amount (digits only).\n";
    }

    // Validate Payment Method
    if (paymentMethod === "") {
        isValid = false;
        errorMessage += "Select a payment method.\n";
    }

    // Validate Card Number
    if (paymentMethod === "creditCard" || paymentMethod === "debitCard") {
        if (!/^\d{16}$/.test(cardNumber)) {
            isValid = false;
            errorMessage += "Enter a valid card number (16 digits).\n";
        }
    }

    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
        isValid = false;
        errorMessage += "Enter a valid CVV (3 digits).\n";
    }

    if (isValid) {
        // Show OTP modal
        var otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
        otpModal.show();
    } else {
        alert(errorMessage);
    }
});

// Handle OTP verification
document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const otpCode = document.getElementById('otpCode').value.trim();
    const fixedOtp = localStorage.getItem('otp');

    if (otpCode === fixedOtp) {
        const billNumber = document.getElementById('billNumber').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const paymentMethod = document.getElementById('paymentMethod').value;

        const date = new Date().toLocaleDateString();

        const paymentData = {
            billNumber: billNumber,
            amount: amount,
            date: date,
            paymentMethod: paymentMethod
        };

        // Store the data in local storage
        let payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push(paymentData);
        localStorage.setItem('payments', JSON.stringify(payments));

        // Clear the form and show success message
        document.getElementById('payment-form').reset();
        alert('Payment done!');
        var otpModal = bootstrap.Modal.getInstance(document.getElementById('otpModal'));
        otpModal.hide();
    } else {
        alert('Invalid Two-Step Authentication code (digits only).');
    }
});

// Function to handle logout
function logout() {
    // Remove user session details from sessionStorage
    sessionStorage.removeItem('loggedInUser');

    // Redirect to login page
    window.location.href = 'index.html'; // Replace 'index.html' with the actual path to your login page
}

// Add an event listener to the logout link/button
document.addEventListener('DOMContentLoaded', function() {
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            logout(); // Call the logout function
        });
    }

    // Add an event listener to the cancel button to reset the form
    var cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            document.getElementById('payment-form').reset(); // Reset the form
        });
    }
});
