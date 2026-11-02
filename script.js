document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const portada = document.getElementById('portada');
  const instrucciones = document.getElementById('instrucciones');
  const menu = document.getElementById('menu');
  const nucleo1 = document.getElementById('nucleo-1');
  const nucleo2 = document.getElementById('nucleo-2');
  const nucleo3 = document.getElementById('nucleo-3');
  
  const modalDetalleLibreta = document.getElementById('modal-detalle-libreta');
  const modalEstafaTelefonica = document.getElementById('modal-estafa-telefonica');
  const modalDenuncias = document.getElementById('modal-denuncias');
  const modalClonacion = document.getElementById('modal-clonacion');
  const modalInvestigacion = document.getElementById('modal-investigacion');
  const modalInfoDelito = document.getElementById('modal-infodedelito');
  const modalLey = document.getElementById('modal-ley');
  const modalRobo = document.getElementById('modal-robo');
  const modalRedes = document.getElementById('modal-redes');
  
  const modalLlamadaActiva4 = document.getElementById('modal-llamada-activa-4');
  const modalLlamadaActivaInfo = document.getElementById('modal-llamada-activa-info');
  const experienciaFinal = document.getElementById('experiencia-final');

  const btnRojo = document.getElementById('btn-rojo');
  const btnRojo2 = document.getElementById('btn-rojo-2');
  const btnVolverMenu = document.getElementById('btn-volver-menu');
  const btnVolverMenu2 = document.getElementById('btn-volver-menu-2');
  const btnVolverMenu3 = document.getElementById('btn-volver-menu-3');
  
  const btnCerrarLibreta = document.getElementById('btn-cerrar-libreta');
  const btnCerrarEstafa = document.getElementById('btn-cerrar-estafa');
  const btnCerrarDenuncias = document.getElementById('btn-cerrar-denuncias');
  const btnCerrarClonacion = document.getElementById('btn-cerrar-clonacion');
  const btnCerrarInvestigacion = document.getElementById('btn-cerrar-investigacion');
  const btnCerrarInfoDelito = document.getElementById('btn-cerrar-infodedelito');
  const btnCerrarLey = document.getElementById('btn-cerrar-ley');
  const btnCerrarRobo = document.getElementById('btn-cerrar-robo');
  const btnCerrarRedes = document.getElementById('btn-cerrar-redes');
  const btnCerrarLlamadaActiva = document.getElementById('btn-cerrar-llamada-activa');
  const btnCerrarLlamadaActivaInfo = document.getElementById('btn-cerrar-llamada-activa-info');
  const btnCerrarExp = document.getElementById('btn-cerrar-exp');

  const tarjetaOpcion4_N1 = document.querySelector('#nucleo-1 [data-opcion="4"]');
  const tarjetaOpcion5_N1 = document.querySelector('#nucleo-1 [data-opcion="5"]');
  const tarjetaOpcion6_N1 = document.querySelector('#nucleo-1 [data-opcion="6"]');

  const tarjetaOpcion4_N2 = document.querySelector('#nucleo-2 [data-opcion="4"]');
  const tarjetaOpcion5_N2 = document.querySelector('#nucleo-2 [data-opcion="5"]');
  const tarjetaOpcion6_N2 = document.querySelector('#nucleo-2 [data-opcion="6"]');

  const tarjetaOpcion4_N3 = document.querySelector('#nucleo-3 [data-opcion="4"]');
  const tarjetaOpcion5_N3 = document.querySelector('#nucleo-3 [data-opcion="5"]');
  const tarjetaOpcion6_N3 = document.querySelector('#nucleo-3 [data-opcion="6"]');
  
  const opcion1 = document.querySelector('.opcion-1');
  const opcion2 = document.querySelector('.opcion-2');
  const opcion3 = document.querySelector('.opcion-3');
  const btnExperienciaFinal = document.querySelector('.opcion-experiencia-final');
  const btnAvanzarExp = document.getElementById('btn-avanzar-exp');

  // Elementos interactivos para las llamadas entrantes
  const badgeCeroOp4 = document.querySelector('#modal-detalle-libreta .estado-2');
  const badgeCeroInfoDelito = document.querySelector('#modal-infodedelito .estado-2');

  const audioLlamada1 = document.getElementById('audio-llamada1') || new Audio('llamada1.mpeg');
  const audioLlamada2 = document.getElementById('audio-llamada2') || new Audio('llamada2.mpeg');
  
  audioLlamada1.preload = 'auto';
  audioLlamada2.preload = 'auto';

  let pantalla = 'intro';
  let timerLlamada = null;

  // Configuración de audio y timbre
  const timbre = document.getElementById('audio-timbre') || new Audio('Sonido-timbre-Telefono-SnapYT.App.mp3');
  timbre.loop = true;
  timbre.volume = 0.8;
  try { timbre.load(); } catch (e) { }

  let intentoTimbreInterval = null;

  function sonarTimbre() {
    if (pantalla !== 'portada') return;
    function intentar() {
      if (pantalla !== 'portada') {
        if (intentoTimbreInterval) { clearInterval(intentoTimbreInterval); intentoTimbreInterval = null; }
        return;
      }
      if (!timbre.paused) {
        if (intentoTimbreInterval) { clearInterval(intentoTimbreInterval); intentoTimbreInterval = null; }
        return;
      }
      const p = timbre.play();
      if (p !== undefined) {
        p.then(() => {
          if (intentoTimbreInterval) { clearInterval(intentoTimbreInterval); intentoTimbreInterval = null; }
        }).catch(() => { });
      }
    }
    intentar();
    if (timbre.paused && !intentoTimbreInterval) {
      intentoTimbreInterval = setInterval(intentar, 300);
    }
  }

  timbre.addEventListener('canplaythrough', () => { if (pantalla === 'portada' && timbre.paused) sonarTimbre(); });

  function mostrar(el) {
    if (!el) return;
    el.classList.remove('oculta');
    el.classList.add('visible');
    el.setAttribute('aria-hidden', 'false');
  }

  function ocultar(el) {
    if (!el) return;
    el.classList.remove('visible');
    el.classList.add('oculta');
    el.setAttribute('aria-hidden', 'true');
  }

  function entrarPortada() {
    if (pantalla !== 'intro') return;
    pantalla = 'portada';
    if (intro) intro.classList.add('oculta');
    mostrar(portada);
    sonarTimbre();
  }

  function atender() {
    if (pantalla !== 'portada') return;
    pantalla = 'instrucciones';
    if (intentoTimbreInterval) { clearInterval(intentoTimbreInterval); intentoTimbreInterval = null; }
    timbre.pause();
    timbre.currentTime = 0;
    ocultar(portada);
    mostrar(instrucciones);
  }

  function irAlMenu() {
    if (pantalla !== 'instrucciones') return;
    pantalla = 'menu';
    ocultar(instrucciones);
    mostrar(menu);
  }

  if (intro) {
    intro.addEventListener('click', () => {
      entrarPortada();
    });
  }

  setTimeout(entrarPortada, 2000);

  if (btnRojo) {
    btnRojo.addEventListener('click', (e) => {
      e.preventDefault();
      atender();
    });
  }

  if (btnRojo2) {
    btnRojo2.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      irAlMenu();
    });
  }

  if (opcion1) {
    opcion1.addEventListener('click', () => {
      pantalla = 'nucleo-1';
      ocultar(menu);
      mostrar(nucleo1);
    });
  }

  if (opcion2) {
    opcion2.addEventListener('click', () => {
      pantalla = 'nucleo-2';
      ocultar(menu);
      mostrar(nucleo2);
    });
  }

  if (opcion3) {
    opcion3.addEventListener('click', () => {
      pantalla = 'nucleo-3';
      ocultar(menu);
      mostrar(nucleo3);
    });
  }

  // --- EXPERIENCIA FINAL (Secuencia de 4 Audios) ---
  const experienciaAudio = document.getElementById('experiencia-audio');
  const audioNumTitulo = document.getElementById('audio-num-titulo');
  const btnExpReal = document.getElementById('btn-exp-real');
  const btnExpIa = document.getElementById('btn-exp-ia');
  const btnCerrarAudioExp = document.getElementById('btn-cerrar-audio-exp');

  const experienciaErrorReal = document.getElementById('experiencia-error-real');
  const experienciaAciertoReal = document.getElementById('experiencia-acierto-real');
  const experienciaAciertoIa = document.getElementById('experiencia-acierto-ia');
  const experienciaErrorIa = document.getElementById('experiencia-error-ia');

  const btnAvanzarErrorReal = document.getElementById('btn-avanzar-error-real');
  const btnAvanzarAciertoReal = document.getElementById('btn-avanzar-acierto-real');
  const btnAvanzarAciertoIa = document.getElementById('btn-avanzar-acierto-ia');
  const btnAvanzarErrorIa = document.getElementById('btn-avanzar-error-ia');

  const audiosExperiencia = [
    { id: 1, elemento: document.getElementById('audio-exp-1') || new Audio('llamada1.mpeg'), tipo: 'real' },
    { id: 2, elemento: document.getElementById('audio-exp-2') || new Audio('llamada2.mpeg'), tipo: 'real' },
    { id: 3, elemento: document.getElementById('audio-exp-3') || new Audio('llamada3.mpeg'), tipo: 'ia' },
    { id: 4, elemento: document.getElementById('audio-exp-4') || new Audio('llamada4.mpeg'), tipo: 'ia' }
  ];

  let audioActualIndex = 0;

  function detenerAudiosExperiencia() {
    audiosExperiencia.forEach(item => {
      if (item.elemento) {
        item.elemento.pause();
        item.elemento.currentTime = 0;
      }
    });
  }

  function reproducirAudioActual() {
    detenerAudiosExperiencia();
    const config = audiosExperiencia[audioActualIndex];
    if (audioNumTitulo) {
      audioNumTitulo.textContent = `Audio número ${config.id}`;
    }
    if (config.elemento) {
      config.elemento.currentTime = 0;
      config.elemento.play().catch(() => {});
    }
  }

  if (btnExperienciaFinal && experienciaFinal) {
    btnExperienciaFinal.addEventListener('click', () => {
      pantalla = 'experiencia-final';
      ocultar(menu);
      mostrar(experienciaFinal);
    });
  }

  if (btnAvanzarExp && experienciaFinal && experienciaAudio) {
    btnAvanzarExp.addEventListener('click', () => {
      audioActualIndex = 0;
      pantalla = 'experiencia-audio';
      ocultar(experienciaFinal);
      mostrar(experienciaAudio);
      reproducirAudioActual();
    });
  }

  if (btnCerrarExp && experienciaFinal) {
    btnCerrarExp.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(experienciaFinal);
      mostrar(menu);
    });
  }

  if (btnCerrarAudioExp && experienciaAudio) {
    btnCerrarAudioExp.addEventListener('click', () => {
      detenerAudiosExperiencia();
      pantalla = 'experiencia-final';
      ocultar(experienciaAudio);
      mostrar(experienciaFinal);
    });
  }

  if (btnExpReal) {
    btnExpReal.addEventListener('click', () => {
      detenerAudiosExperiencia();
      const actual = audiosExperiencia[audioActualIndex];
      ocultar(experienciaAudio);

      if (actual.tipo === 'real') {
        pantalla = 'experiencia-acierto-real';
        mostrar(experienciaAciertoReal);
      } else {
        pantalla = 'experiencia-error-ia';
        mostrar(experienciaErrorIa);
      }
    });
  }

  if (btnExpIa) {
    btnExpIa.addEventListener('click', () => {
      detenerAudiosExperiencia();
      const actual = audiosExperiencia[audioActualIndex];
      ocultar(experienciaAudio);

      if (actual.tipo === 'ia') {
        pantalla = 'experiencia-acierto-ia';
        mostrar(experienciaAciertoIa);
      } else {
        pantalla = 'experiencia-error-real';
        mostrar(experienciaErrorReal);
      }
    });
  }

  function avanzarSiguienteAudio() {
    audioActualIndex++;
    if (audioActualIndex < audiosExperiencia.length) {
      pantalla = 'experiencia-audio';
      mostrar(experienciaAudio);
      reproducirAudioActual();
    } else {
      audioActualIndex = 0;
      pantalla = 'menu';
      mostrar(menu);
    }
  }

  if (btnAvanzarErrorReal) {
    btnAvanzarErrorReal.addEventListener('click', () => {
      ocultar(experienciaErrorReal);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarAciertoReal) {
    btnAvanzarAciertoReal.addEventListener('click', () => {
      ocultar(experienciaAciertoReal);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarAciertoIa) {
    btnAvanzarAciertoIa.addEventListener('click', () => {
      ocultar(experienciaAciertoIa);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarErrorIa) {
    btnAvanzarErrorIa.addEventListener('click', () => {
      ocultar(experienciaErrorIa);
      avanzarSiguienteAudio();
    });
  }

  if (btnVolverMenu) {
    btnVolverMenu.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo1);
      mostrar(menu);
    });
  }

  if (btnVolverMenu2) {
    btnVolverMenu2.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo2);
      mostrar(menu);
    });
  }

  if (btnVolverMenu3) {
    btnVolverMenu3.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo3);
      mostrar(menu);
    });
  }

  function activarLlamada1() {
    if (timerLlamada) clearTimeout(timerLlamada);
    ocultar(modalDetalleLibreta);
    mostrar(modalLlamadaActiva4);
    pantalla = 'llamada-activa-4';

    if (audioLlamada1) {
      audioLlamada1.currentTime = 0;
      audioLlamada1.play().catch(() => {});
    }
  }

  if (tarjetaOpcion4_N1 && modalDetalleLibreta) {
    tarjetaOpcion4_N1.addEventListener('click', () => {
      pantalla = 'modal-4';
      modalDetalleLibreta.classList.remove('cambiado');
      ocultar(nucleo1);
      mostrar(modalDetalleLibreta);

      if (timerLlamada) clearTimeout(timerLlamada);
      timerLlamada = setTimeout(() => {
        if (modalDetalleLibreta.classList.contains('visible')) {
          modalDetalleLibreta.classList.add('cambiado');
        }
      }, 5000);
    });
  }

  if (badgeCeroOp4) {
    badgeCeroOp4.addEventListener('click', () => {
      if (modalDetalleLibreta.classList.contains('cambiado')) {
        activarLlamada1();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (modalDetalleLibreta && modalDetalleLibreta.classList.contains('visible') && modalDetalleLibreta.classList.contains('cambiado')) {
      if (e.key === '0') {
        activarLlamada1();
      }
    }
  });

  if (btnCerrarLibreta && modalDetalleLibreta) {
    btnCerrarLibreta.addEventListener('click', () => {
      if (timerLlamada) clearTimeout(timerLlamada);
      modalDetalleLibreta.classList.remove('cambiado');
      ocultar(modalDetalleLibreta);
      mostrar(nucleo1);
    });
  }

  if (btnCerrarLlamadaActiva && modalLlamadaActiva4) {
    btnCerrarLlamadaActiva.addEventListener('click', () => {
      if (audioLlamada1) {
        audioLlamada1.pause();
        audioLlamada1.currentTime = 0;
      }
      ocultar(modalLlamadaActiva4);
      mostrar(modalDetalleLibreta);
      pantalla = 'modal-4';
    });
  }

  if (tarjetaOpcion5_N1 && modalEstafaTelefonica) {
    tarjetaOpcion5_N1.addEventListener('click', () => {
      pantalla = 'modal-5';
      ocultar(nucleo1);
      mostrar(modalEstafaTelefonica);
    });
  }

  if (btnCerrarEstafa && modalEstafaTelefonica) {
    btnCerrarEstafa.addEventListener('click', () => {
      ocultar(modalEstafaTelefonica);
      mostrar(nucleo1);
    });
  }

  if (tarjetaOpcion6_N1 && modalDenuncias) {
    tarjetaOpcion6_N1.addEventListener('click', () => {
      pantalla = 'modal-6';
      ocultar(nucleo1);
      mostrar(modalDenuncias);
    });
  }

  if (btnCerrarDenuncias && modalDenuncias) {
    btnCerrarDenuncias.addEventListener('click', () => {
      ocultar(modalDenuncias);
      mostrar(nucleo1);
    });
  }

  if (tarjetaOpcion4_N2 && modalClonacion) {
    tarjetaOpcion4_N2.addEventListener('click', () => {
      pantalla = 'modal-clonacion';
      ocultar(nucleo2);
      mostrar(modalClonacion);
    });
  }

  if (btnCerrarClonacion && modalClonacion) {
    btnCerrarClonacion.addEventListener('click', () => {
      ocultar(modalClonacion);
      mostrar(nucleo2);
    });
  }

  if (tarjetaOpcion5_N2 && modalInvestigacion) {
    tarjetaOpcion5_N2.addEventListener('click', () => {
      pantalla = 'modal-investigacion';
      ocultar(nucleo2);
      mostrar(modalInvestigacion);
    });
  }

  if (btnCerrarInvestigacion && modalInvestigacion) {
    btnCerrarInvestigacion.addEventListener('click', () => {
      ocultar(modalInvestigacion);
      mostrar(nucleo2);
    });
  }

  function activarLlamada2() {
    if (timerLlamada) clearTimeout(timerLlamada);
    ocultar(modalInfoDelito);
    mostrar(modalLlamadaActivaInfo);
    pantalla = 'llamada-activa-info';

    if (audioLlamada2) {
      audioLlamada2.currentTime = 0;
      audioLlamada2.play().catch(() => {});
    }
  }

  if (tarjetaOpcion6_N2 && modalInfoDelito) {
    tarjetaOpcion6_N2.addEventListener('click', () => {
      pantalla = 'modal-infodedelito';
      modalInfoDelito.classList.remove('cambiado');
      ocultar(nucleo2);
      mostrar(modalInfoDelito);

      if (timerLlamada) clearTimeout(timerLlamada);
      timerLlamada = setTimeout(() => {
        if (modalInfoDelito.classList.contains('visible')) {
          modalInfoDelito.classList.add('cambiado');
        }
      }, 5000);
    });
  }

  if (badgeCeroInfoDelito) {
    badgeCeroInfoDelito.addEventListener('click', () => {
      if (modalInfoDelito.classList.contains('cambiado')) {
        activarLlamada2();
      }
    });
  }

  if (btnCerrarInfoDelito && modalInfoDelito) {
    btnCerrarInfoDelito.addEventListener('click', () => {
      if (timerLlamada) clearTimeout(timerLlamada);
      modalInfoDelito.classList.remove('cambiado');
      ocultar(modalInfoDelito);
      mostrar(nucleo2);
    });
  }

  if (btnCerrarLlamadaActivaInfo && modalLlamadaActivaInfo) {
    btnCerrarLlamadaActivaInfo.addEventListener('click', () => {
      if (audioLlamada2) {
        audioLlamada2.pause();
        audioLlamada2.currentTime = 0;
      }
      ocultar(modalLlamadaActivaInfo);
      mostrar(modalInfoDelito);
      pantalla = 'modal-infodedelito';
    });
  }

  if (tarjetaOpcion4_N3 && modalLey) {
    tarjetaOpcion4_N3.addEventListener('click', () => {
      pantalla = 'modal-ley';
      ocultar(nucleo3);
      mostrar(modalLey);
    });
  }

  if (btnCerrarLey && modalLey) {
    btnCerrarLey.addEventListener('click', () => {
      ocultar(modalLey);
      mostrar(nucleo3);
    });
  }

  if (tarjetaOpcion5_N3 && modalRobo) {
    tarjetaOpcion5_N3.addEventListener('click', () => {
      pantalla = 'modal-robo';
      ocultar(nucleo3);
      mostrar(modalRobo);
    });
  }

  if (btnCerrarRobo && modalRobo) {
    btnCerrarRobo.addEventListener('click', () => {
      ocultar(modalRobo);
      mostrar(nucleo3);
    });
  }

  if (tarjetaOpcion6_N3 && modalRedes) {
    tarjetaOpcion6_N3.addEventListener('click', () => {
      pantalla = 'modal-redes';
      modalRedes.classList.remove('cambiado');
      ocultar(nucleo3);
      mostrar(modalRedes);

      if (timerLlamada) clearTimeout(timerLlamada);
      timerLlamada = setTimeout(() => {
        if (modalRedes.classList.contains('visible')) {
          modalRedes.classList.add('cambiado');
        }
      }, 5000);
    });
  }

  if (btnCerrarRedes && modalRedes) {
    btnCerrarRedes.addEventListener('click', () => {
      if (timerLlamada) clearTimeout(timerLlamada);
      modalRedes.classList.remove('cambiado');
      ocultar(modalRedes);
      mostrar(nucleo3);
    });
  }
});