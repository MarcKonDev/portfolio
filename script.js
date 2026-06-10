const projectsData = [
    {
        number: "01",
        title: "Join",
        descKey: "project_01_desc",
        image: "./img/Join.webp",
        github: "https://github.com/MarcKonDev/Join-fertig",
        live: "https://marckondev.github.io/Join-fertig/",
        langs: ['lang_css', 'lang_html', 'lang_javascript']
    },
    {
        number: "02",
        title: "El Pollo Loco",
        descKey: "project_02_desc",
        image: "./img/el_pollo_loco.webp",
        github: "https://github.com/MarcKonDev/El_Pollo_Loco",
        live: "https://marckondev.github.io/El_Pollo_Loco/",
        langs: ['lang_css', 'lang_html', 'lang_javascript']
    }
]

const langToggleDesktop = document.getElementById('lang-toggle-desktop');
const langToggleMobile = document.getElementById('lang-toggle-mobile');
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

function handleLanguageChange(event) {
    const isChecked = event.target.checked;
    const language = isChecked ? 'de' : 'en';
    localStorage.setItem('preferredLanguage', language);
    loadTranslations(language);

    if (event.target === langToggleDesktop && langToggleMobile) {
        langToggleMobile.checked = isChecked;
    } else if (event.target === langToggleMobile && langToggleDesktop) {
        langToggleDesktop.checked = isChecked;
    }
}

langToggleDesktop?.addEventListener('change', handleLanguageChange);
langToggleMobile?.addEventListener('change', handleLanguageChange);

document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    loadTranslations(savedLanguage);
    const isGerman = savedLanguage === 'de';
    if (langToggleDesktop) langToggleDesktop.checked = isGerman;
    if (langToggleMobile) langToggleMobile.checked = isGerman;
    setupScrollButtons();
    setupFormValidation();
});

function setupScrollButtons() {
    const toPortfolioBtn = document.querySelector('#check_work_btn');
    const toContactBtn = document.querySelector('#contact_btn');
    const skillsetBtn = document.querySelector('#skillset_btn');
    if (!toPortfolioBtn || !toContactBtn || !skillsetBtn) return;
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
    if (!container || !nextBtn || !prevBtn) return;
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
    const submitBtn = document.getElementById('form_btn');
    if (!form || !submitBtn) return;

    const inputs = form.querySelectorAll('input[required]');

    // Funktion zur Überprüfung des gesamten Formulars (ohne direkt Fehler anzuzeigen)
    function checkFormValidity() {
        let isFormValid = true;
        inputs.forEach(input => {
            // Wir prüfen nur den Zustand, übergeben aber 'false', damit nicht beim Tippen alles rot wird
            if (!validateInput(input, false)) {
                isFormValid = false;
            }
        });
        submitBtn.disabled = !isFormValid;
    }

    inputs.forEach(input => {
        // Beim Verlassen des Feldes (blur) validieren UND Fehler anzeigen (true)
        input.addEventListener('blur', () => {
            validateInput(input, true);
        });

        // Beim Tippen/Ändern Fehler live entfernen und Button-Status prüfen
        input.addEventListener('input', () => {
            if (input.id === 'email') {
                input.parentElement.classList.remove('invalid', 'invalid_format');
            } else {
                input.parentElement.classList.remove('invalid');
            }
            checkFormValidity();
        });

        // Wichtig für die Checkbox (reagiert besser auf 'change')
        input.addEventListener('change', () => {
            if (input.type === 'checkbox' && input.checked) {
                input.parentElement.classList.remove('invalid');
            }
            checkFormValidity();
        });
    });

    // Sicherheitshalber beim Absenden nochmals alles checken
    form.addEventListener('submit', (event) => {
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input, true)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            event.preventDefault();
        }
    });

    // Direkt beim Laden der Seite die erste Prüfung ausführen (sperrt den Button)
    checkFormValidity();
}


function validateInput(input, showErrors = true) {
    const parent = input.parentElement;
    let isValid = false;

    if (input.type === 'checkbox') {
        isValid = input.checked;
        if (showErrors) {
            if (!isValid) parent.classList.add('invalid');
            else parent.classList.remove('invalid');
        }
    } else if (input.id === 'email') {
        const emailValue = input.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;

        if (emailValue === '') {
            if (showErrors) parent.classList.add('invalid');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            if (showErrors) parent.classList.add('invalid_format');
            isValid = false;
        } else {
            if (showErrors) parent.classList.remove('invalid', 'invalid_format');
            isValid = true;
        }
    } else {
        isValid = input.value.trim() !== '';
        if (showErrors) {
            if (!isValid) parent.classList.add('invalid');
            else parent.classList.remove('invalid');
        }
    }

    return isValid;
}

projectNextBtn?.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    changeText(currentProjectIndex);
});

if (projPrev && projPrev.length > 0) {
    projPrev.forEach((project, index) => {
        project.addEventListener('click', () => {
            overlay?.classList.remove('d_none');
            document.body.classList.add('no-scroll');
            changeText(index);
        });
    });
}

closeOverlayBtn?.addEventListener('click', () => {
    overlay?.classList.add('d_none');
    document.body.classList.remove('no-scroll');
});

if (overlay) {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.classList.add('d_none');
            document.body.classList.remove('no-scroll');
        }
    });
}

function changeText(index) {

    if (!projectNumber || !projectName || !projectImage || !projectDescription) {
        return;
    }

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


const mobileMenuBtnToggle = document.getElementById('mobile_nav');
const mobileMenu = document.getElementById('overlay_mobile_nav');
const navLinks = document.querySelectorAll('.nav-link')

mobileMenuBtnToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('d_none');
})

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.add('d_none');
    });
});