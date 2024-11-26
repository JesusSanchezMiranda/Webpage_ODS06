document.getElementById('suggestionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
});