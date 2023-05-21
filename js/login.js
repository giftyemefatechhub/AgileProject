// Function to authenticate user using server-side API
function authenticateUser(username, password) {
    return fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response from server');
            }
        })
        .then(data => {
            // Assuming the server response contains the user data if authentication is successful
            return data.user;
        })
        .catch(error => {
            console.error(error);
            throw new Error('An error occurred while authenticating');
        });
}

// Get the login form element
const loginForm = document.querySelector('#login-form');

// Add event listener for form submission
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the entered username and password
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        // Authenticate the user using the server-side API
        const user = await authenticateUser(username, password);

        // Redirect the user to the tasks page or perform any other desired action
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error.message);
        document.querySelector('#error-message').textContent = 'Invalid username or password.';
    }
});
