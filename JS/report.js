document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const issueType = document.getElementById('issue-type').value;
    const description = document.getElementById('description').value.trim();

    if (name === '' || email === '' || issueType === '' || description === '') {
        alert('Please fill in all required fields.');
        return;
    }

    if (!/^[A-Za-z\s'-]+$/.test(name)) {
        alert('Please enter a valid name.');
        return;
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Form submitted successfully!');
    document.getElementById('reportForm').reset();
});
