// Function to hide all sections
function hideAllSections() {
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
}

// Add event listeners for each link
document.getElementById('about-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('about-section').style.display = 'block';
});

document.getElementById('projects-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('projects-section').style.display = 'block';
});

document.getElementById('contact-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('contact-section').style.display = 'block';
});
