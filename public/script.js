document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from refreshing page

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        education: document.getElementById('education').value,
        qualifications: document.getElementById('qualifications').value,
        experience: document.getElementById('experience').value,
        role: document.getElementById('role').value,
        github: document.getElementById('github').value
    };

    // Temporary display (for testing)
    document.getElementById('preview').innerHTML = `
        <h2>${formData.name}</h2>
        <p><strong>Education:</strong> ${formData.education}</p>
        <p><strong>Qualifications:</strong> ${formData.qualifications}</p>
        <p><strong>Experience:</strong> ${formData.experience}</p>
        <p><strong>Role:</strong> ${formData.role}</p>
        <p><strong>GitHub:</strong> ${formData.github}</p>
    `;

    // Later: Send formData to backend and display AI projects
});