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

const container = document.querySelector(".testimonial_container");
const nextBtn = document.querySelector(".next_btn");
const prevBtn = document.querySelector(".prev_btn");
const dots = document.querySelectorAll(".dot");
let currentDotIndex = 1;


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

function scrollToSection(selector) {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

function setupScrollButtons() {
    const toPortfolioBtn = document.querySelector('#check_work_btn');
    const toContactBtn = document.querySelector('#contact_btn');
    const skillsetBtn = document.querySelector('#skillset_btn');
    if (!toPortfolioBtn || !toContactBtn || !skillsetBtn) return;
    toPortfolioBtn.addEventListener('click', () => scrollToSection('#portfolio'));
    toContactBtn.addEventListener('click', () => scrollToSection('#contact_me'));
    skillsetBtn.addEventListener('click', () => scrollToSection('#contact_me'));
}

function updateDots() {
    dots.forEach((dot, i) => {
        if (i === currentDotIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function showNextTestimonial() {
    const firstCard = container.querySelector(".testimonials");
    container.appendChild(firstCard);
    currentDotIndex = (currentDotIndex + 1) % dots.length;
    updateDots();
}

function showPrevTestimonial() {
    const allCards = container.querySelectorAll(".testimonials");
    const lastCard = allCards[allCards.length - 1];
    container.insertBefore(lastCard, allCards[0]);
    currentDotIndex = (currentDotIndex - 1 + dots.length) % dots.length;
    updateDots();
}

function setupTestimonials() {
    if (!container || !nextBtn || !prevBtn) return;
    nextBtn.addEventListener("click", showNextTestimonial);
    prevBtn.addEventListener("click", showPrevTestimonial);
    updateDots();
}

document.addEventListener("DOMContentLoaded", setupTestimonials);

function toggleProjectImage(row, show) {
    const projectName = row.getAttribute('data-project');
    const targetImg = document.getElementById(`img-${projectName}`);
    if (!targetImg) return;
    if (show) targetImg.classList.add('active');
    else targetImg.classList.remove('active');
}

function setupProjectHover() {
    const projectRows = document.querySelectorAll('.prev_projects');
    projectRows.forEach(row => {
        row.addEventListener('mouseenter', () => toggleProjectImage(row, true));
        row.addEventListener('mouseleave', () => toggleProjectImage(row, false));
    });
}

document.addEventListener("DOMContentLoaded", setupProjectHover);

function setupFormValidation() {
    const form = document.getElementById('contact_form');
    const submitBtn = document.getElementById('form_btn');
    if (!form || !submitBtn) return;
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => addInputListeners(input, inputs, submitBtn));
    form.addEventListener('submit', (event) => handleFormSubmit(event, inputs));
    checkFormValidity(inputs, submitBtn);
}

function checkFormValidity(inputs, submitBtn) {
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateInput(input, false)) {
            isFormValid = false;
        }
    });
    submitBtn.disabled = !isFormValid;
}

function addInputListeners(input, inputs, submitBtn) {
    input.addEventListener('blur', () => validateInput(input, true));
    input.addEventListener('input', () => handleInputTyping(input, inputs, submitBtn));
    input.addEventListener('change', () => handleCheckboxChange(input, inputs, submitBtn));
}

function handleInputTyping(input, inputs, submitBtn) {
    if (input.id === 'email') {
        input.parentElement.classList.remove('invalid', 'invalid_format');
    } else {
        input.parentElement.classList.remove('invalid');
    }
    checkFormValidity(inputs, submitBtn);
}

function handleCheckboxChange(input, inputs, submitBtn) {
    if (input.type === 'checkbox' && input.checked) {
        input.parentElement.classList.remove('invalid');
    }
    checkFormValidity(inputs, submitBtn);
}

function handleFormSubmit(event, inputs) {
    event.preventDefault();
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateInput(input, true)) {
            isFormValid = false;
        }
    });
    if (isFormValid) sendForm(event.target);
}

async function sendForm(form) {
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) showFormSuccess(form);
        else alert('Senden fehlgeschlagen. Bitte versuche es erneut.');
    } catch (error) {
        alert('Verbindung fehlgeschlagen. Bitte versuche es erneut.');
    }
}

function showFormSuccess(form) {
    form.reset();
    const btn = document.getElementById('form_btn');
    if (btn) btn.disabled = true;
    const message = document.getElementById('form_message');
    if (message) {
        message.classList.remove('d_none');
        setTimeout(() => message.classList.add('d_none'), 5000);
    }
}

function validateInput(input, showErrors = true) {
    if (input.type === 'checkbox') {
        return validateCheckbox(input, showErrors);
    } else if (input.id === 'email') {
        return validateEmail(input, showErrors);
    } else {
        return validateText(input, showErrors);
    }
}

function validateCheckbox(input, showErrors) {
    const parent = input.parentElement;
    const isValid = input.checked;
    if (showErrors) {
        if (!isValid) parent.classList.add('invalid');
        else parent.classList.remove('invalid');
    }
    return isValid;
}

function validateText(input, showErrors) {
    const parent = input.parentElement;
    const isValid = input.value.trim() !== '';
    if (showErrors) {
        if (!isValid) parent.classList.add('invalid');
        else parent.classList.remove('invalid');
    }
    return isValid;
}

function validateEmail(input, showErrors) {
    const parent = input.parentElement;
    const value = input.value.trim();
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
    const isValid = value !== '' && pattern.test(value);
    if (!showErrors) return isValid;
    if (isValid) parent.classList.remove('invalid', 'invalid_format');
    else if (value === '') parent.classList.add('invalid');
    else parent.classList.add('invalid_format');
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
    if (!projectNumber || !projectName || !projectImage || !projectDescription) return;
    currentProjectIndex = index;
    const project = projectsData[index];
    projectNumber.innerHTML = project.number;
    projectName.innerHTML = project.title;
    projectImage.src = project.image;
    projectGithub.href = project.github;
    projectLive.href = project.live;
    projectDescription.innerHTML = currentTranslations[project.descKey] || "No Description";
    updateProjectLangs(project);
}

function updateProjectLangs(project) {
    allLangElements.forEach(element => element.classList.add('d_none'));
    project.langs.forEach(langClass => {
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