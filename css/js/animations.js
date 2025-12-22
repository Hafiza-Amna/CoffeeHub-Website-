// Simple scroll reveal (used later on other pages)
document.body.classList.add('loading');

const revealElements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }
    });
});

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('.menu-card, .process-step, .cart-item');
    elementsToReveal.forEach(el => {
        el.classList.add('fade-in');
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
    });

    // Process page interactive functionality
    const processCards = document.querySelectorAll('.process-card');
    if (processCards.length > 0) {
        // Function to activate a specific step
        const activateStep = (stepNumber) => {
            processCards.forEach(card => {
                card.classList.remove('active');
            });
            const targetCard = document.querySelector(`.process-card[data-step="${stepNumber}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        };

        // Scroll-based activation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepNumber = entry.target.getAttribute('data-step');
                    activateStep(stepNumber);
                }
            });
        }, observerOptions);

        processCards.forEach(card => {
            observer.observe(card);
        });

        // Click activation
        processCards.forEach(card => {
            card.addEventListener('click', () => {
                const stepNumber = card.getAttribute('data-step');
                activateStep(stepNumber);
            });
        });

        // Auto-progress through steps
        let currentStep = 1;
        const autoProgress = setInterval(() => {
            currentStep = currentStep >= processCards.length ? 1 : currentStep + 1;
            activateStep(currentStep);
        }, 4000);

        // Pause auto-progress on hover
        processCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clearInterval(autoProgress);
            });
        });

        // Resume auto-progress on mouse leave
        document.addEventListener('mouseleave', () => {
            setTimeout(() => {
                currentStep = 1;
                activateStep(currentStep);
            }, 2000);
        });
    }

    // Remove loading
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});

const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (toggle) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
