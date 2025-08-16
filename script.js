// Função para ativar slide com animação
function activateSlide(slide) {
    // Remove data-active de todos os slides
    document.querySelectorAll('.slide').forEach(s => s.removeAttribute('data-active'));

    // Ativa o slide selecionado
    slide.dataset.active = true;

    // Seleciona o conteúdo do slide
    const h1 = slide.querySelector('h1');
    const p = slide.querySelector('p');

    // Remove animação antiga
    h1.classList.remove('animate-slide');
    p.classList.remove('animate-slide');

    // Força reflow para reiniciar animação
    void h1.offsetWidth;
    void p.offsetWidth;

    // Adiciona animação
    h1.classList.add('animate-slide');
    p.classList.add('animate-slide');
}

// Botões avançar/voltar
let changeSlideButton = document.querySelectorAll('[data-change-slide-button]');
changeSlideButton.forEach(button => {
    button.addEventListener('click', () => {
        const slides = document.querySelector(".slides");
        const activeSlide = slides.querySelector("[data-active]");
        let indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

        indexActiveSlide = button.dataset.changeSlideButton === "avancar" ? (
            indexActiveSlide + 1
        ) : (
            indexActiveSlide - 1
        );

        if(indexActiveSlide >= slides.children.length) indexActiveSlide = 0;
        if(indexActiveSlide < 0) indexActiveSlide = slides.children.length - 1;

        activateSlide(slides.children[indexActiveSlide]);
    });
});

// Menu clicável para trocar slide
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // previne scroll padrão
        const targetId = link.getAttribute('href').replace('#',''); // pega id do slide
        const targetSlide = document.getElementById(targetId);
        if(targetSlide) activateSlide(targetSlide);
    });
});
window.addEventListener('load', () => {
    const overlay = document.getElementById('welcome-overlay');
    const progressBar = document.getElementById('loading-progress');
    const loadingText = document.getElementById('loading-text');

    let percent = 0;
    const interval = setInterval(() => {
        percent++;
        loadingText.textContent = percent + '%';
        progressBar.style.width = percent + '%';

        if(percent >= 100) {
            clearInterval(interval);

            // Aguarda 0.5s antes de desaparecer
            setTimeout(() => {
                overlay.style.opacity = '0';

                // Depois da transição, remove o overlay
                setTimeout(() => {
                    overlay.style.display = 'none';
                    document.body.classList.add('loaded'); // ativa interação
                }, 1000); 
            }, 500);
        }
    }, 20); 
});
