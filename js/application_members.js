// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
	//console.log("application : 5");
  new GameManager(5, KeyboardInputManager, HTMLActuator, LocalStorageManager, "ot13");
});
