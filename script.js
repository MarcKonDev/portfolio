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
    let cards = document.querySelectorAll(".testimonials");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next_btn");
    const prevBtn = document.querySelector(".prev_btn");

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    container.appendChild(firstClone);
    container.insertBefore(lastClone, cards[0]);

    cards = document.querySelectorAll(".testimonials");

   
    let currentIndex = 2; 
    let isTransitioning = false;

    function updateSlider(index, hasTransition = true) {
        currentIndex = index;

        if (hasTransition) {
            container.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        } else {
            container.style.transition = "none";
        }

        const cardWidth = cards[0].offsetWidth;
        const gap = 64;
        const viewportWidth = container.offsetWidth; 
        const centerOffset = (viewportWidth / 2) - (cardWidth / 2);
        const positionX = centerOffset - (currentIndex * (cardWidth + gap));

        container.style.transform = `translateX(${positionX}px)`;

        let dotIndex = currentIndex - 1;
        if (currentIndex === 0) dotIndex = dots.length - 1;
        if (currentIndex === cards.length - 1) dotIndex = 0;

        dots.forEach((dot, i) => {
            if (i === dotIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        cards.forEach((card, i) => {
            if (i === currentIndex) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });
    }

    container.addEventListener("transitionend", () => {
        isTransitioning = false;

        if (currentIndex === cards.length - 1) {
            updateSlider(1, false); 
        }
        
        if (currentIndex === 0) {
            updateSlider(cards.length - 2, false);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (isTransitioning) return; 
        isTransitioning = true;
        updateSlider(currentIndex + 1);
    });

    prevBtn.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;
        updateSlider(currentIndex - 1);
    });

    updateSlider(currentIndex, false);

    window.addEventListener("resize", () => {
        updateSlider(currentIndex, false);
    });
});