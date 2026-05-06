const elementos = document.querySelectorAll('.reveal');

const mostrarElemento = () => {
  elementos.forEach(elemento => {
    const posicion = elemento.getBoundingClientRect().top;
    const alturaPantalla = window.innerHeight;

    if (posicion < alturaPantalla - 80) {
      elemento.classList.add('activo');
    }
  });
};

window.addEventListener('scroll', mostrarElemento);
window.addEventListener('load', mostrarElemento);

const luz = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e) => {
  if (luz) {
    luz.style.left = e.clientX + 'px';
    luz.style.top = e.clientY + 'px';
  }
});

/* CAMBIO DE IDIOMA */

const btnIdioma = document.getElementById('btnIdioma');
let idiomaActual = localStorage.getItem('idioma') || 'es';

const aplicarIdioma = () => {
  document.documentElement.lang = idiomaActual;

  const elementosTraducibles = document.querySelectorAll('[data-es][data-en]');

  elementosTraducibles.forEach(elemento => {
    elemento.textContent = elemento.getAttribute(`data-${idiomaActual}`);
  });

  if (btnIdioma) {
    btnIdioma.textContent = idiomaActual === 'es' ? 'EN' : 'ES';
  }

  localStorage.setItem('idioma', idiomaActual);
};

if (btnIdioma) {
  btnIdioma.addEventListener('click', () => {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    aplicarIdioma();
  });
}

aplicarIdioma();

/* MODO DÍA / NOCHE */

const modoBtn = document.getElementById('modoBtn');

const aplicarModo = () => {
  const modoGuardado = localStorage.getItem('modo');

  if (modoGuardado === 'light') {
    document.body.classList.add('light-mode');

    if (modoBtn) {
      modoBtn.textContent = '☀️';
      modoBtn.title = 'Modo día';
    }
  } else {
    document.body.classList.remove('light-mode');

    if (modoBtn) {
      modoBtn.textContent = '🌙';
      modoBtn.title = 'Modo noche';
    }
  }
};

if (modoBtn) {
  modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('modo', 'light');
      modoBtn.textContent = '☀️';
      modoBtn.title = 'Modo día';
    } else {
      localStorage.setItem('modo', 'dark');
      modoBtn.textContent = '🌙';
      modoBtn.title = 'Modo noche';
    }
  });
}

aplicarModo();