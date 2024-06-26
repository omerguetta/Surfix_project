const beaches_container = document.querySelector('.beaches_container');
const view_all = document.querySelector('.view_all_btn');

function getBeaches(){
    
}
document.addEventListener('DOMContentLoaded', function () {
    let backButton = document.getElementById('backButton');
    let plusButton = document.getElementById('plusButton');

    backButton.addEventListener('click', function () {
        this.classList.add('btn-disabled');
    });

    plusButton.addEventListener('click', function () {
        this.classList.add('btn-disabled');
    });
});