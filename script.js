/* =========================
alert("Halo! Selamat datang di website saya.");

function sayHello() {
    alert("Halo! Terima kasih sudah mengunjungi website saya.");
}
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const menuLinks = menu.querySelectorAll("a");


    // OPEN MENU
    function openMenu() {

        menu.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");

        document.body.style.overflow = "hidden";
    }


    // CLOSE MENU
    function closeMenu() {

        menu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

        document.body.style.overflow = "";
    }


    // HAMBURGER CLICK
    menuToggle.addEventListener("click", function () {

        if (menu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    // MENU LINK CLICK
    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    // Tutup menu
                    closeMenu();

                    // Pindah ke section
                    requestAnimationFrame(function () {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    });

                }

            }

        });

    });


    // ESC = CLOSE
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            menu.classList.contains("active")
        ) {

            closeMenu();

        }

    });


    // RESET SAAT KEMBALI KE DESKTOP
    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 768 &&
            menu.classList.contains("active")
        ) {

            closeMenu();

        }

    });

});

// =========================
// PORTFOLIO FILTER
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioProjects = document.querySelectorAll(".project");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const filter = button.getAttribute("data-filter");


        // =========================
        // ACTIVE BUTTON
        // =========================

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // =========================
        // FILTER PROJECT
        // =========================

        portfolioProjects.forEach(function (project) {

            const category = project.getAttribute("data-category");

            const shouldShow =
                filter === "all" ||
                category === filter;


            if (shouldShow) {

                // Pastikan card bisa terlihat
                project.style.display = "flex";

                // Reset animation
                project.classList.remove("filter-hide");
                project.classList.remove("filter-show");

                // Trigger browser reflow
                void project.offsetWidth;

                // Jalankan animation
                project.classList.add("filter-show");

            } else {

                // Animasi keluar
                project.classList.remove("filter-show");
                project.classList.add("filter-hide");


                // Setelah animasi selesai,
                // benar-benar hilangkan dari layout
                setTimeout(function () {

                    if (
                        project.classList.contains("filter-hide")
                    ) {
                        project.style.display = "none";
                    }

                }, 400);

            }

        });

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