document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shorten-btn');
    shortenBtn.addEventListener('click', async () => {
      const longUrl = document.getElementById('long-url').value;
      const customName = document.getElementById('custom-name').value;
      
      if (!longUrl) {
        alert('Please enter a URL to shorten.');
        return;
      }
  
      try {
        const apiUrl = `http://localhost:3000/shorten?url=${encodeURIComponent(longUrl)}${customName ? '&custom=' + customName : ''}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.success) {
          document.getElementById('short-url').innerText = `Short URL: ${data.data.url}`;
          document.getElementById('full-url').innerText = `Original URL: ${data.data.full}`;
        } else {
          alert('Failed to shorten the URL. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: Could not connect to the server.');
      }
    });
  });
  