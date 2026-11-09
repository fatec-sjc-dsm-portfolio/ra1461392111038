document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  if (slides.length < 2) return;

  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const count = gallery.querySelector('[data-gallery-count]');
  let current = -1;

  function show(index) {
    const previousSlide = slides[current];
    const previousVideo = previousSlide?.querySelector('iframe');
    if (previousVideo && current !== index) previousVideo.src = previousVideo.src;

    current = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== current;
    });
    count.textContent = `${gallery.dataset.galleryItemLabel || 'Imagem'} ${current + 1} de ${slides.length}`;
  }

  gallery.classList.add('is-enhanced');
  previous.hidden = false;
  next.hidden = false;
  count.hidden = false;
  show(0);

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));

  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + 1);
    }
  });
});
