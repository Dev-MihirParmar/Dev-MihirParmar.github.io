document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/StaticTesseract07/repos')
        .then(response => response.json())
        .then(data => {
            const projectsList = document.getElementById('projects-list');
            data.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card', 'col-md-4');
                projectCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'No description available.'}</p>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Repository</a>
                        </div>
                    </div>
                `;
                projectsList.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});
