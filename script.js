// Função para rolar até a seção especificada
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Track do evento
        console.log('Event tracked: scroll_to_section', { section: sectionId });
    }
}

// Função para redirecionar para checkout
function redirectToCheckout() {
    // Aqui você colocaria o link real do checkout
    console.log('Redirecionando para checkout do Treinamento Instagram...');
    
    // Track do evento de clique no CTA
    const buttonText = event.target.textContent;
    const buttonPosition = Array.from(document.querySelectorAll('.cta-button')).indexOf(event.target) + 1;
    
    console.log('Event tracked: cta_click', { 
        button_text: buttonText,
        button_position: buttonPosition 
    });
    
    // Simular redirecionamento (substitua pela URL real)
    // window.open('https://checkout.exemplo.com/instagram-training', '_blank');
    alert('Redirecionamento para checkout seria feito aqui!');
}

// Função para toggle do FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle do FAQ atual
    if (!isActive) {
        faqItem.classList.add('active');
        
        // Track do evento
        const questionText = element.querySelector('span').textContent;
        console.log('Event tracked: faq_opened', { question: questionText });
    }
}

// Função para animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        
        if (target === '∞') return; // Pular o símbolo infinito
        
        const targetNumber = parseInt(target.replace(/\D/g, ''));
        let current = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                if (target.includes('+')) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = Math.floor(current) + 'h';
                }
            }
        }, 40);
    });
}

// Função para detectar scroll e animar elementos
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.benefit-item, .trigger-card, .testimonial');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Função para tracking de scroll depth
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    90: false
};

function trackScrollDepth() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    Object.keys(scrollDepthTracked).forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            console.log('Event tracked: scroll_depth', { depth: depth + '%' });
        }
    });
}

// Debounce function para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Animar contadores quando a página carrega
    setTimeout(animateCounters, 1000);
    
    // Adicionar event listeners para scroll
    const debouncedScrollHandler = debounce(() => {
        handleScrollAnimations();
        trackScrollDepth();
    }, 100);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Trigger inicial para elementos já visíveis
    handleScrollAnimations();
    
    console.log('Instagram Training Landing Page loaded successfully!');
});

// Função para adicionar efeitos hover nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
});

// Função para adicionar efeito parallax sutil no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Função para smooth scroll em todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar classe para elementos que entraram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.benefit-item, .trigger-card, .testimonial, .pricing-card, .guarantee-card');
    elementsToObserve.forEach(el => observer.observe(el));
});

