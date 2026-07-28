"use strict";

/* ==================================================
   Select Page Elements
================================================== */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");
const navigationLinks = document.querySelectorAll(".nav-links a");


/* ==================================================
   Current Year
================================================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==================================================
   Mobile Navigation
================================================== */

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        menuButton.textContent = menuIsOpen ? "✕" : "☰";
        menuButton.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });
}


/* Close the mobile menu after a link is selected */

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (!navLinks || !menuButton) {
            return;
        }

        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
        menuButton.textContent = "☰";
    });
});


/* Close mobile menu when clicking outside of it */

document.addEventListener("click", (event) => {
    if (!menuButton || !navLinks) {
        return;
    }

    const clickedMenuButton = menuButton.contains(event.target);
    const clickedNavigation = navLinks.contains(event.target);

    if (!clickedMenuButton && !clickedNavigation) {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    }
});


/* ==================================================
   Scroll Reveal Animation
================================================== */

const revealElements = document.querySelectorAll(
    [
        ".section-heading",
        ".about-text",
        ".education-card",
        ".research-card",
        ".research-block",
        ".project-summary",
        ".skill-card",
        ".contact-content"
    ].join(",")
);

revealElements.forEach((element) => {
    element.classList.add("reveal-item");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ==================================================
   Highlight Current Navigation Link
================================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const currentSectionId = entry.target.id;

            navigationLinks.forEach((link) => {
                link.classList.remove("active-link");

                const destination =
                    link.getAttribute("href");

                if (destination === `#${currentSectionId}`) {
                    link.classList.add("active-link");
                }
            });
        });
    },
    {
        threshold: 0.35,
        rootMargin: "-15% 0px -55% 0px"
    }
);

pageSections.forEach((section) => {
    sectionObserver.observe(section);
});


/* ==================================================
   Add a Friendly PDF Icon to the Research Button
================================================== */

const researchPaperButton =
    document.querySelector(
        '.project-summary a[href$=".pdf"], ' +
        '.research-actions a[href$=".pdf"]'
    );

if (researchPaperButton) {
    const buttonText =
        researchPaperButton.textContent.trim();

    if (!buttonText.includes("📄")) {
        researchPaperButton.textContent =
            `📄 ${buttonText}`;
    }
}


/* ==================================================
   Prevent Empty Placeholder Links
================================================== */

const placeholderLinks =
    document.querySelectorAll('a[href="#"]');

placeholderLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        console.warn(
            "This button still needs a real link."
        );
    });
});