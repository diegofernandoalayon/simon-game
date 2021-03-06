var colores = ["red", "blue", "green", "yellow"];
var patronJuego = [];
var patronClick = [];
var inicio = false;
var nivel = 0;
$(document).keypress(function () {
  if (!inicio) {
    $("#level-title").text("Level " + nivel);
    nextSequence();
    inicio = true;
  }
});
//funcion de click
$(".btn").click(function () {
  var colorElegidoUsuario = $(this).attr("id");
  patronClick.push(colorElegidoUsuario);
  reproducirSonido(colorElegidoUsuario);
  animar(colorElegidoUsuario);
  evaluarRespuesta(patronClick.length - 1);
});

function evaluarRespuesta(nivelActual) {
  if (patronJuego[nivelActual] === patronClick[nivelActual]) {
    if (patronClick.length === patronJuego.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    reproducirSonido("wrong");
    $("body").addClass("game-over");
    $("#level-title").text(
      "Game Over, Presione cualquier tecla para reiniciar"
    );
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    reiniciar();
  }
}

//funcion para la secuencia aleatoria
function nextSequence() {
  patronClick = [];
  nivel++;
  $("#level-title").text("Level " + nivel);
  var numeroAleatorio = Math.floor(Math.random() * 4);
  var colorElegido = colores[numeroAleatorio];
  patronJuego.push(colorElegido);
  $("#" + colorElegido)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  reproducirSonido(colorElegido);
}
//funcion del sonido
function reproducirSonido(nombre) {
  var audio = new Audio("sounds/" + nombre + ".mp3");
  audio.play();
}
//funcion para animar
function animar(colorActual) {
  $("#" + colorActual).addClass("pressed");
  setTimeout(function () {
    $("#" + colorActual).removeClass("pressed");
  }, 100);
}
function reiniciar() {
  nivel = 0;
  patronJuego = [];
  inicio = false;
}
