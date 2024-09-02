document.addEventListener('DOMContentLoaded', function () {
    const sliderInner = document.querySelector('.slider__container-inner');
    const slides = document.querySelectorAll('.slider__container-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const autoplayBtn = document.getElementById('autoplayBtn');
    const dots = document.querySelectorAll('.slider__dots-item');

    let currentIndex = 0;
    let autoplay = false;
    let autoplayInterval;

    const updateSlider = () => {
        sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    const goToSlide = index => {
        currentIndex = index;
        updateSlider();
    };

    const toggleAutoplay = () => {
        autoplay = !autoplay;
        if (autoplay) {
            autoplayBtn.classList.add('active');
            autoplayInterval = setInterval(nextSlide, 3000);
        } else {
            autoplayBtn.classList.remove('active');
            clearInterval(autoplayInterval);
        }
    };

    const handleKeyboard = e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    };

    let startX = 0;
    const handleTouchStart = e => startX = e.touches[0].clientX;
    const handleMouseStart = e => startX = e.clientX;

    const handleMove = e => {
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        let diffX = startX - currentX;

        if (diffX > 50) nextSlide();
        if (diffX < -50) prevSlide();
        startX = 0;
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    autoplayBtn.addEventListener('click', toggleAutoplay);
    dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));
    document.addEventListener('keydown', handleKeyboard);
    sliderInner.addEventListener('touchstart', handleTouchStart);
    sliderInner.addEventListener('touchmove', handleMove);
    sliderInner.addEventListener('mousedown', handleMouseStart);
    sliderInner.addEventListener('mouseup', handleMove);

    updateSlider();
});
