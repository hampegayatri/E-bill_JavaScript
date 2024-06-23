// Pagination variables
let currentPage = 1;
const rowsPerPage = 5;

// Function to render table with payment details
function RenderTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    // Fetch payment details from local storage
    let payments = JSON.parse(localStorage.getItem('payments')) || [];

    // Paginate payments
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedPayments = payments.slice(start, end);

    // Render table rows
    paginatedPayments.forEach(payment => {
        const status = 'Paid'; // Assuming the status is always 'Paid' after successful payment
        const meterReading = CalculateMeterReading(payment.amount); // Assuming a function to calculate meter reading
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.billNumber}</td>
            <td>${payment.amount}</td>
            <td>${payment.date}</td>
            <td>${status}</td>
            <td>${payment.paymentMethod}</td>
            <td>${meterReading} kWh</td>
        `;
        tableBody.appendChild(row);
    });

    // Render pagination controls
    RenderPaginationControls(payments.length);
}

// Function to calculate meter reading based on payment amount (just a placeholder)
function CalculateMeterReading(amount) {
    return Math.floor(amount / 10);
}

// Function to handle search by bill number
function SearchByBillNumber() {
    const searchInput = document.getElementById('search').value.trim().toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const billNumber = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        if (billNumber.includes(searchInput)) {
            row.style.display = ''; // Show row if bill number matches search input
        } else {
            row.style.display = 'none'; // Hide row if bill number does not match search input
        }
    });
}

// Function to handle filtering by date, status, payment method, and meter reading
function FilterBy(value) {
    const filterIndex = {
        'date': 2,
        'status': 3,
        'paymentMethod': 4,
        'meterReading': 5
    };

    const tableBody = document.querySelector('tbody');
    const tableRows = Array.from(document.querySelectorAll('tbody tr'));

    // Rearrange rows based on the selected filter
    if (value === 'paymentMethod') {
        const sortedRows = tableRows.sort((a, b) => {
            const paymentMethodA = a.cells[filterIndex['paymentMethod']].textContent.toLowerCase();
            const paymentMethodB = b.cells[filterIndex['paymentMethod']].textContent.toLowerCase();
            if (paymentMethodA === 'credit card' && paymentMethodB !== 'credit card') return -1;
            if (paymentMethodA !== 'credit card' && paymentMethodB === 'credit card') return 1;
            if (paymentMethodA === 'debit card' && paymentMethodB !== 'debit card') return -1;
            if (paymentMethodA !== 'debit card' && paymentMethodB === 'debit card') return 1;
            return paymentMethodA.localeCompare(paymentMethodB);
        });
        tableBody.innerHTML = '';
        sortedRows.forEach(row => tableBody.appendChild(row));
    } else if (value === 'date') {
        const sortedRows = tableRows.sort((a, b) => {
            const dateA = new Date(a.cells[filterIndex['date']].textContent);
            const dateB = new Date(b.cells[filterIndex['date']].textContent);
            return dateB - dateA;
        });
        tableBody.innerHTML = '';
        sortedRows.forEach(row => tableBody.appendChild(row));
    } else if (value === 'meterReading') {
        const sortedRows = tableRows.sort((a, b) => {
            const meterReadingA = parseInt(a.cells[filterIndex['meterReading']].textContent);
            const meterReadingB = parseInt(b.cells[filterIndex['meterReading']].textContent);
            return meterReadingA - meterReadingB;
        });
        tableBody.innerHTML = '';
        sortedRows.forEach(row => tableBody.appendChild(row));
    } else {
        tableRows.forEach(row => row.style.display = ''); // Show all rows if no specific filter is selected
    }
}

// Function to check if the user is logged in
function CheckLoginStatus() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Redirect to login page if user is not logged in
        window.location.href = "/index.html";
    }
}

// Function to render pagination controls
function RenderPaginationControls(totalItems) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(totalItems / rowsPerPage);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('btn', 'btn-secondary', 'me-2');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        currentPage--;
        RenderTable();
    });
    paginationControls.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('btn', 'btn-light', 'me-2');
        pageButton.innerText = i;
        pageButton.disabled = currentPage === i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            RenderTable();
        });
        paginationControls.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('btn', 'btn-secondary');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentPage++;
        RenderTable();
    });
    paginationControls.appendChild(nextButton);
}

// Call the CheckLoginStatus function when the page loads
window.onload = () => {
    CheckLoginStatus();
    RenderTable();
};

// Event listener for search input
document.getElementById('search').addEventListener('input', SearchByBillNumber);

// Event listener for filter select
document.getElementById('filter').addEventListener('change', function () {
    FilterBy(this.value);
});

// Event listener for logout button
document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    Logout(); // Call the logout function
});

// Function to handle user logout
function Logout() {
    // Remove user session data from session storage
    sessionStorage.removeItem('loggedInUser');
    // Redirect to the login page on logout
    window.location.href = "/index.html";
}
