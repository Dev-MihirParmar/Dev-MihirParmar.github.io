document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/StaticTesseract07/repos')
        .then(response => response.json())
        .then(data => {
            const projectsList = document.getElementById('projects-list');
            data.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || 'No description available.'}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                projectsList.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});
