const langToggle = document.getElementById('lang-toggle');
let currentTranslations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`./lang/${lang}.json`);
        currentTranslations = await response.json();
        updateStaticTexts();
    } catch (error) {
        console.error("Fehler beim Laden der Übersetzung:", error);
    }
}

function updateStaticTexts() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });
}

langToggle.addEventListener('change', () => {
    const language = langToggle.checked ? 'de' : 'en';
    loadTranslations(language);
});

document.addEventListener("DOMContentLoaded", () => {
    loadTranslations('en');
    
    setupScrollButtons(); 
});

function setupScrollButtons() {
    const toPortfolioBtn = document.querySelector('#check_work_btn');
    const toContactBtn = document.querySelector('#contact_btn');
    const skillsetBtn = document.querySelector('#skillset_btn');

    toPortfolioBtn?.addEventListener('click', () => {
        document.querySelector('#portfolio')?.scrollIntoView({ behavior: "smooth" });
    });

    toContactBtn?.addEventListener('click', () => {
        document.querySelector('#contact_me')?.scrollIntoView({ behavior: "smooth" });
    });

    skillsetBtn?.addEventListener('click', () => {
        document.querySelector('#contact_me')?.scrollIntoView({ behavior: "smooth" });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".testimonial_container");
    const nextBtn = document.querySelector(".next_btn");
    const prevBtn = document.querySelector(".prev_btn");
    const dots = document.querySelectorAll(".dot");

    let currentDotIndex = 1;

    function updateDots() {
        dots.forEach((dot, i) => {
            if (i === currentDotIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    nextBtn.addEventListener("click", () => {
        const firstCard = container.querySelector(".testimonials");

        container.appendChild(firstCard);

        currentDotIndex = (currentDotIndex + 1) % dots.length;
        updateDots();
    });

    prevBtn.addEventListener("click", () => {
        const allCards = container.querySelectorAll(".testimonials");
        const lastCard = allCards[allCards.length - 1];

        container.insertBefore(lastCard, allCards[0]);

        currentDotIndex = (currentDotIndex - 1 + dots.length) % dots.length;
        updateDots();
    });

    updateDots();
});

document.addEventListener("DOMContentLoaded", () => {
    const projectRows = document.querySelectorAll('.prev_projects');

    projectRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const projectName = row.getAttribute('data-project');
            const targetImg = document.getElementById(`img-${projectName}`);

            if (targetImg) {
                targetImg.classList.add('active');
            }
        });

        row.addEventListener('mouseleave', () => {
            const projectName = row.getAttribute('data-project');
            const targetImg = document.getElementById(`img-${projectName}`);

            if (targetImg) {
                targetImg.classList.remove('active');
            }
        });
    });
});