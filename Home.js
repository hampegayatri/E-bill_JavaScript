document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the session data to check if the user is logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Redirect to the login page if not logged in
        window.location.href = "/index.html";
    } else {
        const user = JSON.parse(loggedInUser);
        // Populate user profile information
        document.getElementById('user-name').textContent = user.firstName + " " + user.lastName;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-phone').textContent = user.phone;
        document.getElementById('user-address').textContent = `${user.address}, ${user.city}, ${user.state}, ${user.zip}, ${user.country}`;
    }

    // Logout function
    document.getElementById('logoutBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        logout(); // Call the logout function
    });
});

// Function to handle user logout
function logout() {
    // Remove user session data from session storage
    sessionStorage.removeItem('loggedInUser');
    // Redirect to the login page on logout
    window.location.href = "/index.html";
}
