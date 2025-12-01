// Main JavaScript for Speed File Motors

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current answer
            answer.classList.toggle('hidden');
            
            // Change icon
            if (answer.classList.contains('hidden')) {
                icon.setAttribute('data-feather', 'plus');
            } else {
                icon.setIntersectionObserver('data-feather', 'minus');
            }
            feather.replace();
            
            // Close other answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.classList.add('hidden');
                    otherIcon.setAttribute('data-feather', 'plus');
                }
            });
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('custom-navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (navbar && navbar.shadowRoot) {
            const nav = navbar.shadowRoot.querySelector('nav');
            if (nav) {
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        }
    });

    // Smooth scrolling for anchor links
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

    // Add loading state to buttons
    document.querySelectorAll('a[href="#commander"]').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.innerHTML = '<span class="loading-dots"><div></div><div></div><div></div><div></div></span>';
                
                // Simulate loading
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = 'Commander un fichier <i data-feather="arrow-right"></i>';
                    feather.replace();
                }, 1500);
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate API call
            this.querySelector('button').innerHTML = 'Inscription...';
            
            setTimeout(() => {
                this.innerHTML = '<p class="text-green-400">Merci ! Vous êtes inscrit à notre newsletter.</p>';
            }, 1000);
        });
    }

    // Tool compatibility modal
    const toolModal = {
        init: function() {
            const toolLinks = document.querySelectorAll('[data-tools]');
            toolLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.showTools();
                }.bind(this));
            });
        },

        showTools: function() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4');
            modal.innerHTML = `
                <div class="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-white">Outils Compatibles</h3>
                        <button class="text-gray-400 hover:text-white">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">KESS3</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">Autotuner</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">CMD</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">FoxFlash</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">MPPS</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">Galletto</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">PCMFlash</span>
                        <span class="text-gray-300 bg-gray-700 py-2 px-3 rounded text-sm">BDM100</span>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            feather.replace();
            
            // Close modal
            modal.querySelector('button').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        }
    };

    // Initialize tool modal
    toolModal.init();

    // Performance metrics counter
    const performanceCounters = document.querySelectorAll('.counter');
    if (performanceCounters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        performanceCounters.forEach(counter => observer.observe(counter));
    }

    // Counter