// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ff4757'
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: 6,
            random: true
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    }
});

// Button interactions
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const content = document.querySelector('.content');
const celebration = document.querySelector('.celebration');
const container = document.querySelector('.container');

let noBtnClickCount = 0;

// Make the "No" button run away
noBtn.addEventListener('mouseover', () => {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    gsap.to(noBtn, {
        x: randomX,
        y: randomY,
        duration: 0.3,
        ease: 'power1.out'
    });
    
    // Make the button smaller each time
    noBtnClickCount++;
    if (noBtnClickCount > 2) {
        gsap.to(noBtn, {
            scale: Math.max(0.5, 1 - (noBtnClickCount * 0.1)),
            duration: 0.3
        });
    }
});

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Create celebration effect
    createConfetti();
    
    // Show brief celebration animation before redirecting
    gsap.to(content, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: 'back.in',
        onComplete: () => {
            // Redirect to poem page after brief celebration
            setTimeout(() => {
                window.location.href = 'poem.html';
            }, 500);
        }
    });
});

// Function to create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    celebration.appendChild(heartsContainer);
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heartsContainer.appendChild(heart);

        gsap.to(heart, {
            y: '-100vh',
            rotation: Math.random() * 360,
            duration: Math.random() * 2 + 2,
            ease: 'power1.out',
            repeat: -1
        });
    }
}

// Function to create confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff4757', '#ff6b6b', '#ff8f8f'][Math.floor(Math.random() * 3)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        celebration.appendChild(confetti);

        gsap.to(confetti, {
            y: '100vh',
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 520,
            duration: Math.random() * 1 + 1,
            ease: 'power1.out',
            onComplete: () => confetti.remove()
        });
    }
}
