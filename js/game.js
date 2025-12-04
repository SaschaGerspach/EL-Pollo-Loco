let canvas;
let world;
let keyboard = new Keyboard();


// function fullscreen(){
//     let fullscreen = document.getElementById('canvasOverlay');
//     enterFullscreen(fullscreen);
// }



function enterFullscreen(element) {
    document.getElementById("canvas").classList.add("canvasFullscreen");
    document.getElementById("footerControl").classList.add("d-none")
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }


  // Funktion, um den Vollbildmodus zu beenden
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      document.getElementById("canvas").classList.remove("canvasFullscreen");
      document.getElementById("footerControl").classList.remove("d-none")
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      document.getElementById("canvas").classList.remove("canvasFullscreen");
      document.getElementById("footerControl").classList.remove("d-none")
    }
  }

  // Funktion zum Wechseln zwischen Vollbild und Normalmodus
  function toggleFullscreen() {
    let fullscreenElement = document.getElementById('canvasOverlay');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      enterFullscreen(fullscreenElement);
    } else {
      exitFullscreen();
    }
  }

  // Event-Listener für die Escape-Taste
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27 && (document.fullscreenElement || document.webkitFullscreenElement)) {
      exitFullscreen();
    }
  });












  


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);

}

function init(){
    initLevel();
    document.getElementById('playButton').classList.add('d-none');
    canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = 'url("")';
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 87) {
        keyboard.UP = true;
    }
    if(e.keyCode == 33) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 69) {
        keyboard.E = true;
   
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 82) {
        keyboard.R = true;
    }

});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 87) {
        keyboard.UP = false;
    }
    if(e.keyCode == 33) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 69) {
        keyboard.ePressed = false;
        keyboard.E = false;
 
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 82) {
        keyboard.R = false;
    }

});
