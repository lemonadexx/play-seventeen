// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  //new GameManager(5, 8192, 2, KeyboardInputManager, HTMLActuator, LocalScoreManager);
  new GameManager(5, 32768, 2, KeyboardInputManager, HTMLActuator, LocalStorageManager, "members");
});
