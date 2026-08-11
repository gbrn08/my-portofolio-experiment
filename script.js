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
// PORTFOLIO + VIEW MORE
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioProjects = document.querySelectorAll(".project");

const portfolioMore = document.getElementById("portfolio-more");
const portfolioMoreText = portfolioMore
    ? portfolioMore.querySelector(".portfolio-more-text")
    : null;

const INITIAL_VISIBLE = 4;

let portfolioExpanded = false;
let portfolioAnimationTimers = [];


// =========================
// CLEAR TIMER
// =========================

function clearPortfolioTimers() {

    portfolioAnimationTimers.forEach(function (timer) {
        clearTimeout(timer);
    });

    portfolioAnimationTimers = [];
}


// =========================
// SHOW PROJECT
// =========================

function showProject(project, animate = true) {

    project.classList.remove("portfolio-hidden");

    project.style.display = "flex";

    project.classList.remove("filter-hide");
    project.classList.remove("filter-show");


    if (animate) {

        void project.offsetWidth;

        project.classList.add("filter-show");

    }

}


// =========================
// HIDE PROJECT
// =========================

function hideProject(project, animate = true) {

    project.classList.remove("filter-show");


    if (animate && project.style.display !== "none") {

        project.classList.add("filter-hide");


        const timer = setTimeout(function () {

            if (project.classList.contains("filter-hide")) {

                project.style.display = "none";

                project.classList.add("portfolio-hidden");

            }

        }, 450);


        portfolioAnimationTimers.push(timer);

    }

    else {

        project.style.display = "none";

        project.classList.add("portfolio-hidden");

        project.classList.remove("filter-hide");

    }

}


// =========================
// UPDATE VIEW MORE BUTTON
// =========================

function updateViewMoreButton(hiddenCount) {

    if (!portfolioMore) return;


    portfolioMore.classList.toggle(
        "visible",
        hiddenCount > 0
    );


    portfolioMore.classList.toggle(
        "expanded",
        portfolioExpanded
    );


    portfolioMore.setAttribute(
        "aria-expanded",
        portfolioExpanded ? "true" : "false"
    );


    if (portfolioMoreText) {

        portfolioMoreText.textContent =
            portfolioExpanded
                ? "VIEW LESS"
                : "VIEW MORE";

    }

}


// =========================
// UPDATE PORTFOLIO
// =========================

function updatePortfolio(animate = true) {

    clearPortfolioTimers();


    const activeButton =
        document.querySelector(".filter-btn.active");


    const filter =
        activeButton
            ? activeButton.getAttribute("data-filter")
            : "all";


    const matchingProjects =
        Array.from(portfolioProjects).filter(function (project) {

            const category =
                project.getAttribute("data-category");


            return (
                filter === "all" ||
                category === filter ||
                (
                    filter === "logo" &&
                    category === "branding"
                )
            );

        });


    const visibleProjects =
        portfolioExpanded
            ? matchingProjects
            : matchingProjects.slice(
                0,
                INITIAL_VISIBLE
            );


    portfolioProjects.forEach(function (project) {

        if (visibleProjects.includes(project)) {

            showProject(
                project,
                animate
            );

        }

        else {

            hideProject(
                project,
                animate
            );

        }

    });


    updateViewMoreButton(
        matchingProjects.length -
        visibleProjects.length
    );

}


// =========================
// FILTER BUTTON
// =========================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        // Kembali ke tampilan awal
        portfolioExpanded = false;


        updatePortfolio(true);

    });

});


// =========================
// VIEW MORE / VIEW LESS
// =========================

if (portfolioMore) {

    portfolioMore.addEventListener(
        "click",
        function () {


            portfolioExpanded =
                !portfolioExpanded;


            updatePortfolio(true);


            // Ketika VIEW MORE dibuka
            if (portfolioExpanded) {

                setTimeout(function () {

                    const portfolio =
                        document.getElementById(
                            "portfolio"
                        );


                    if (portfolio) {

                        const bottom =
                            portfolio.getBoundingClientRect()
                            .bottom;


                        if (
                            bottom >
                            window.innerHeight
                        ) {

                            window.scrollBy({

                                top: Math.min(
                                    180,
                                    bottom -
                                    window.innerHeight
                                ),

                                behavior: "smooth"

                            });

                        }

                    }

                }, 180);

            }

            // Ketika VIEW LESS
            else {

                document
                    .getElementById("portfolio")
                    .scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

            }

        }
    );

}


// =========================
// INITIAL PORTFOLIO
// =========================

// Hanya 4 portfolio pertama
// yang ditampilkan saat awal.

updatePortfolio(false);


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