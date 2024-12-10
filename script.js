// Add an event listener to handle form submission
document.getElementById('premiumForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the values entered in the form
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  // Display a loading message (optional)
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.innerText = 'Sending request...';

  try {
    // Send a POST request to the backend server
    const response = await fetch('http://localhost:3000/send-permission-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }), // Send the username and email as JSON
    });

    // Handle the response
    if (response.ok) {
      statusMessage.innerText = 'Account creation request sent successfully!';
    } else {
      const errorData = await response.json();
      statusMessage.innerText = `Error: ${errorData.message || 'Request failed'}`;
    }
  } catch (error) {
    // Handle any errors that occur during the fetch process
    statusMessage.innerText = 'An error occurred while sending the request.';
    console.error('Fetch error:', error);
  }
});
