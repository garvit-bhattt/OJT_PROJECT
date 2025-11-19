const controls = new THREE.PointerLockControls(camera, document.body);

// Lock mouse on click
document.addEventListener("click", () => {
  controls.lock();
});

function updateMouseLook() {
  if (!character) return;

  // Make a temporary container to store camera rotation safely
  const camEuler = new THREE.Euler(0, 0, 0, "YXZ");
  //  Copies full camera rotation (X, Y, Z).
  // Copy camera rotation to this Euler But we will only use Y.
  camEuler.copy(camera.rotation);

  // Update character rotation only on Y axis (left-right)
  character.rotation.y = camEuler.y;
}
