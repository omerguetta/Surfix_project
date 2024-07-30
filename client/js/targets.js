document.addEventListener("DOMContentLoaded", function() {

    const sections = document.querySelectorAll('.target, .intro');
    sections.forEach(section => section.style.display = 'none');

    // Show the introductory form
    document.getElementById('intro').style.display = 'block';

    // Handle form submission and transition to the first target section
    document.getElementById('userInfoForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        showTarget('target1');
    });


    // Set up event listeners for navigation buttons
    document.getElementById('skip1').addEventListener('click', function() {
        showTarget('target2');
    });

    document.getElementById('next1').addEventListener('click', function() {
        showTarget('target2');
    });

    document.getElementById('back2').addEventListener('click', function() {
        showTarget('target1');
    });

    document.getElementById('next2').addEventListener('click', function() {
        showTarget('target3');
    });

    document.getElementById('back3').addEventListener('click', function() {
        showTarget('target2');
    });

    document.getElementById('next3').addEventListener('click', function() {
        showTarget('target4');
    });

    document.getElementById('back4').addEventListener('click', function() {
        showTarget('target3');
    });

    document.getElementById('done').addEventListener('click', function() {
        // Add any finish logic here
        alert('Finished!');
    });
});

function updateValue(value, spanId) {
    document.getElementById(spanId).textContent = value;
}

function showTarget(targetId) {
    // Hide all sections
    const sections = document.querySelectorAll('.target, .intro');
    sections.forEach(section => section.style.display = 'none');
    
    // Show the selected section
    document.getElementById(targetId).style.display = 'flex';
}
