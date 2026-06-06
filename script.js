const projectsData = [
    {
        number: "01",
        title: "Join",
        descKey: "project_01_desc",
        image: "./img/Join.webp",
        github: "https://github.com/MarcKonDev",
        live: "https://marckondev.github.io/Join-fertig/",
        langs: ['lang_css', 'lang_html', 'lang_firebase', 'lang_angular', 'lang_typescript']
    },
    {
        number: "02",
        title: "El Pollo Loco",
        descKey: "project_02_desc",
        image: "./img/el_pollo_loco.webp",
        github: "https://github.com/MarcKonDev",
        live: "https://marckondev.github.io/El_Pollo_Loco/",
        langs: ['lang_css', 'lang_html', 'lang_javascript']
    },
    {
        number: "03",
        title: "DA Bubble",
        descKey: "project_03_desc",
        image: "./img/DABubble.webp",
        github: "https://github.com/MarcKonDev",
        live: "#",
        langs: ['lang_css', 'lang_html', 'lang_javascript']
    }
]

const langToggle = document.getElementById('lang-toggle');
const projPrev = document.querySelectorAll('.prev_projects');
const overlay = document.getElementById('overlay_backdrop');
const overlayInner = document.getElementById('project_overlay');
const projectNumber = document.getElementById('overlay_number');
const projectName = document.getElementById('overlay_project');
const projectDescription = document.getElementById('overlay_description')
const projectImage = document.getElementById('overlay_img');
const projectGithub = document.getElementById('overlay_git');
const projectLive = document.getElementById('overlay_live');
const projectNextBtn = document.getElementById('next_project');
const closeOverlayBtn = document.getElementById('close_overlay_btn');
const allLangElements = document.querySelectorAll('.overlay_langs');
let currentTranslations = {};
let currentProjectIndex = 0;


async function loadTranslations(lang) {
    try {
        const response = await fetch(`./lang/${lang}.json`);
        currentTranslations = await response.json();
        updateStaticTexts();
        if (overlay && !overlay.classList.contains('d_none')) {
            changeText(currentProjectIndex);
        }
    } catch (error) {
        console.error("Fehler beim Laden der Übersetzung:", error);
    }
}

function updateStaticTexts() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = currentTranslations[key];

        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translation);
            } else {
                element.textContent = translation;
            }
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
    setupFormValidation();
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

function setupFormValidation() {
    const form = document.getElementById('contact_form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        input.addEventListener('input', () => {
            if (input.id === 'email') {
                input.parentElement.classList.remove('invalid', 'invalid_format');
            } else {
                input.parentElement.classList.remove('invalid');
            }
        });
    });

    form.addEventListener('submit', (event) => {
        let isFormValid = true;

        inputs.forEach(input => {
            const isValid = validateInput(input);
            if (!isValid) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            event.preventDefault();
        }
    });
}

function validateInput(input) {
    const parent = input.parentElement;

    if (input.type === 'checkbox') {
        if (!input.checked) {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    } else if (input.id === 'email') {
        const emailValue = input.value.trim();
        // Ein Standard-Regex für gültige E-Mail-Adressen
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            parent.classList.add('invalid');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            parent.classList.add('invalid_format');
            return false;
        } else {
            parent.classList.remove('invalid', 'invalid_format');
            return true;
        }
    } else {
        if (input.value.trim() === '') {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    }
}

projectNextBtn.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    changeText(currentProjectIndex);
});

projPrev.forEach((project, index) => {
    project.addEventListener('click', () => {
        overlay.classList.remove('d_none');
        document.body.classList.add('no-scroll');
        changeText(index);
    })
})

closeOverlayBtn.addEventListener('click', () => {
    overlay.classList.add('d_none');
    document.body.classList.remove('no-scroll');
});

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.add('d_none');
        document.body.classList.remove('no-scroll');
    }
});

function changeText(index) {
    currentProjectIndex = index;
    const project = projectsData[index];
    projectNumber.innerHTML = projectsData[index].number;
    projectName.innerHTML = projectsData[index].title;
   
    projectImage.src = projectsData[index].image;
    projectGithub.href = projectsData[index].github;
    projectLive.href = projectsData[index].live;
    projectDescription.innerHTML = currentTranslations[project.descKey] || "No Description";

    allLangElements.forEach(element => {
        element.classList.add('d_none');
    });

    projectsData[index].langs.forEach(langClass => {
        const element = document.querySelector(`.${langClass}`);
        if (element) {
            element.classList.remove('d_none');
        }
    });
}