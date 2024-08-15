document.addEventListener('DOMContentLoaded', () => {
    const bubbleContainer = document.querySelector('.bubble-container');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 50 + 20; // Bubble size between 20px and 70px
        const left = Math.random() * 100; // Position between 0% and 100%
        const animationDuration = Math.random() * 5 + 5; // Duration between 5s and 10s

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${animationDuration}s`;

        bubbleContainer.appendChild(bubble);

        // Remove the bubble after animation ends
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    // Create bubbles periodically
    setInterval(createBubble, 500); // Adjust the interval for bubble creation

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', searchRepos);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchRepos();
        }
    });

    function searchRepos() {
        const query = document.getElementById('searchInput').value;
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayResults(repos) {
        const results = document.getElementById('results');
        results.innerHTML = '';

        if (repos.length === 0) {
            results.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo');
            repoElement.innerHTML = `
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                <p>${repo.description || 'No description available'}</p>
                <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                <p><strong>Forks:</strong> ${repo.forks_count}</p>
            `;
            results.appendChild(repoElement);
        });
    }
});
