document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.getElementById('slidesContainer');
  const slideNavigation = document.getElementById('slideNavigation');

  function createDots() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    slideNavigation.innerHTML = '';

    slides.forEach((slide, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        setActiveSlide(index);
      });
      slideNavigation.appendChild(dot);
    });
  }

function setActiveSlide(index) {
  const slides = Array.from(document.querySelectorAll('.slide'));
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  const dots = Array.from(document.querySelectorAll('.dot'));
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  const counter = document.getElementById('slideCounter');
  counter.textContent = `${index + 1}/${slides.length}`;
  const activeSlide = slides[index];
  addDeleteButton(activeSlide);
}


function addDeleteButton(slide) {
  const deleteSpan = document.createElement('span');
  deleteSpan.className = 'fas fa-trash';
  deleteSpan.id = 'deleteSlideSpan';
  deleteSpan.addEventListener('click', () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const index = slides.indexOf(slide);
    slide.remove();
    saveSlides();
    createDots();
    if (index !== 0) {
      setActiveSlide(index - 1);
    } else {
      setActiveSlide(0);
    }
  });
  slide.appendChild(deleteSpan);
}


  function makeSlidesEditable() {
    document.querySelectorAll('.slide').forEach((slide) => {
      slide.querySelectorAll('h1, p').forEach((element) => {
        element.setAttribute('contenteditable', 'true');
        element.addEventListener('blur', saveSlides);
      });
    });
  }

  function saveSlides() {
    const slidesToSave = Array.from(document.querySelectorAll('.slide')).map(
      (slide) => {
        const slideCopy = slide.cloneNode(true);
        const deleteButton = slideCopy.querySelector('button');
        if (deleteButton) {
          deleteButton.remove();
        }
        return slideCopy;
      }
    );

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (xhr.status == 200) {
        console.log("Respuesta del servidor:", xhr.responseText);
      } else {
        console.log("Error del servidor:", xhr.status, xhr.statusText);
      }
    };

    xhr.open('POST', 'save_slides.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(
      'slides_data=' +
        encodeURIComponent(
          slidesToSave.map((slide) => slide.outerHTML).join('')
        )
    );
  }

  document.querySelectorAll('[contenteditable="true"]').forEach((editable) => {
    editable.addEventListener('input', function (e) {
      const html = this.innerHTML;
      const imgURLPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
      const match = html.match(imgURLPattern);
      if (match) {
        const nonURLContent = html.replace(match[0], '').trim();
        if (!nonURLContent) {
          this.innerHTML = html.replace(match[0], `<img src="${match[0]}" alt="Imagen" style="max-width: 800px; max-height: 500px;" />`);
          const range = document.createRange();
          range.selectNodeContents(this);
          range.collapse(false);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
    editable.addEventListener('blur', saveSlides);
  });
  
  // Obtiene el elemento span.
const fullscreenSpan = document.getElementById('fullscreenSpan');

// Evento click para el span.
fullscreenSpan.addEventListener('click', function() {
  // Comprueba si el documento se encuentra actualmente en pantalla completa.
  if (!document.fullscreenElement) {
    // Si no es así, solicita el modo de pantalla completa.
    document.documentElement.requestFullscreen();
    fullscreenSpan.classList.remove('fa-expand');
    fullscreenSpan.classList.add('fa-compress');
  } else {
    // Si está en pantalla completa, sale del modo de pantalla completa.
    document.exitFullscreen();
    fullscreenSpan.classList.remove('fa-compress');
    fullscreenSpan.classList.add('fa-expand');
  }
});

  document.addEventListener('keydown', function(e) {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const activeSlideIndex = slides.findIndex((slide) => slide.classList.contains('active'));

    if (e.keyCode === 37) {
      if (activeSlideIndex > 0) {
        setActiveSlide(activeSlideIndex - 1);
      }
    }
    else if (e.keyCode === 39) {
      if (activeSlideIndex < slides.length - 1) {
        setActiveSlide(activeSlideIndex + 1);
      }
    }
  });

  createDots();

  document.getElementById('addSlideBtn').addEventListener('click', function () {
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    newSlide.innerHTML = `
      <h1>Título del nuevo slide</h1>
      <p>Contenido del nuevo slide</p>
    `;
    addDeleteButton(newSlide);
    slidesContainer.insertBefore(newSlide, this);
    saveSlides();
    createDots();
    makeSlidesEditable();

    const slides = Array.from(document.querySelectorAll('.slide'));
    setActiveSlide(slides.length - 1);
  });

  document.querySelectorAll('.slide').forEach((slide) => {
    addDeleteButton(slide);
  });

  makeSlidesEditable();

  const slides = Array.from(document.querySelectorAll('.slide'));
  if (slides.length) {
    setActiveSlide(0);
  }
});

