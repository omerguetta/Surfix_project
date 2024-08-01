import userService from './services/userService.js';

document.addEventListener("DOMContentLoaded", function () {
    const user = {
        age: 0,
        surfingLevel: "",
        weight: 0,
        height: 0,
        stars: 0,
        waveLeft: 0,
        waveRight: 0,
        rowing: 0,
        speed: 0,
    }

    const sections = document.querySelectorAll('.target, .intro');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById('intro').style.display = 'block';

    document.getElementById('userInfoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        user.age = parseInt(formData.get('age'));
        user.surfingLevel = formData.get('level');
        user.weight = parseInt(formData.get('weight'));
        user.height = parseInt(formData.get('height'));
        showTarget('target1');
    });

    document.getElementById('back1').addEventListener('click', function () {
        showTarget('intro');
    });

    document.getElementById('next1').addEventListener('click', function () {
        showTarget('target2');
    });

    document.getElementById('back2').addEventListener('click', function () {
        showTarget('target1');
    });

    document.getElementById('next2').addEventListener('click', function () {
        showTarget('target3');
    });

    document.getElementById('back3').addEventListener('click', function () {
        showTarget('target2');
    });

    document.getElementById('next3').addEventListener('click', function () {
        showTarget('target4');
    });

    document.getElementById('back4').addEventListener('click', function () {
        showTarget('target3');
    });

    document.getElementById('maxDistance').addEventListener('input', function () {
        updateValue(this.value, 'chosenValue1');
    });

    document.getElementById('maxSpeed1').addEventListener('input', function () {
        updateValue(this.value, 'chosenValue2');
    });

    document.getElementById('maxSpeed2').addEventListener('input', function () {
        updateValue(this.value, 'chosenValue3');
    });

    document.getElementById('maxSpeed3').addEventListener('input', function () {
        updateValue(this.value, 'chosenValue4');
    });

    document.getElementById('next1').addEventListener('click', function () {
        user.waveLeft = parseInt(document.getElementById('maxDistance').value);
    });

    document.getElementById('next2').addEventListener('click', function () {
        user.waveRight = parseInt(document.getElementById('maxSpeed1').value);
    });

    document.getElementById('next3').addEventListener('click', function () {
        user.rowing = parseInt(document.getElementById('maxSpeed2').value);
    });

    document.getElementById('done').addEventListener('click', async function () {
        user.speed = parseInt(document.getElementById('maxSpeed3').value);
        user.stars += 50;
        const userId = localStorage.getItem('userId');
        await userService.update(user, userId);
        window.location.href = './index.html';
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
