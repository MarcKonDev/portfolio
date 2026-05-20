const langToggle = document.getElementById('lang-toggle');

const translations = {
    'en': {
        'nav_about': 'About me',
        'nav_skills': 'Skills',
        'nav_projects': 'Projects',
        'hero_subtitle': 'Frontend Developer',
        'btn_work': 'Check my work',
        'btn_contact': 'Contact me',
        'ticker_text': 'Frontend Developer • Based in Munich • Open to work • Available for remote work •'
    },
    'de': {
        'nav_about': 'Über mich',
        'nav_skills': 'Fähigkeiten',
        'nav_projects': 'Projekte',
        'hero_subtitle': 'Frontend Entwickler',
        'btn_work': 'Meine Projekte',
        'btn_contact': 'Kontakt',
        'ticker_text': 'Frontend Entwickler • München • Offen für Jobs • Remote verfügbar •'
    }
};

langToggle.addEventListener('change', () => {
    const language = langToggle.checked ? 'de' : 'en';
    
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
});

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