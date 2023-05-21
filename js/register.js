// Function to register a new user using server-side API
function registerUser(username, password) {
    return fetch('http://localhost:5000/api/register', {
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
            // Assuming the server response contains the registered user data
            return data.user;
        })
        .catch(error => {
            console.error(error);
            throw new Error('An error occurred while registering');
        });
}

// Get the register form element
const registerForm = document.querySelector('#register-form');

// Add event listener for form submission
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the entered username and password
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        // Register the user using the server-side API
        const user = await registerUser(username, password);

        // Redirect the user to the index page or perform any other desired action
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error.message);
        document.querySelector('#error-message').textContent = 'An error occurred while registering.';
    }
});
