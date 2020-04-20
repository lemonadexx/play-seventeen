// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, 2048, 1, KeyboardInputManager, HTMLActuator, LocalStorageManager, "albums");
});
