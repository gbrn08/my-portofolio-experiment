/* =========================
alert("Halo! Selamat datang di website saya.");

function sayHello() {
    alert("Halo! Terima kasih sudah mengunjungi website saya.");
}
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const icon = menuToggle.querySelector("span");

    menuToggle.addEventListener("click", function () {

        menu.classList.toggle("active");

        if (menu.classList.contains("active")) {
            icon.textContent = "✕";
        } else {
            icon.textContent = "☰";
        }

    });

});


const viewWork = document.getElementById("view-work");

viewWork.addEventListener("click", function () {

    document.getElementById("portfolio").scrollIntoView({
        behavior: "smooth"
    });

});


const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");

const portfolioProjects = document.querySelectorAll(".project");


portfolioProjects.forEach(function (project) {

    project.addEventListener("click", function () {

        const image = project.querySelector("img");

        if (image) {
            modalImage.src = image.src;
        }

        modal.classList.add("active");

    });

});


modalClose.addEventListener("click", function () {

    modal.classList.remove("active");

});


modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        modal.classList.remove("active");

    }

});