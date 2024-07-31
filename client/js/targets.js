document.addEventListener("DOMContentLoaded", function() {

    const sections = document.querySelectorAll('.target, .intro');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById('intro').style.display = 'block';

    document.getElementById('userInfoForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        showTarget('target1');
    });

    document.getElementById('back1').addEventListener('click', function() {
        const sections = document.querySelectorAll('.target, .intro');
        sections.forEach(section => section.style.display = 'none');
        
        document.getElementById('intro').style.display = 'block';
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
    });
});

function updateValue(value, spanId) {
    document.getElementById(spanId).textContent = value;
}

function showTarget(targetId) {
    const sections = document.querySelectorAll('.target, .intro');
    sections.forEach(section => section.style.display = 'none');
    
    document.getElementById(targetId).style.display = 'flex';
}
