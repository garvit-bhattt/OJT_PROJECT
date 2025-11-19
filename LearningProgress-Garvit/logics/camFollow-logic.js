function updateCamera() {
    if (!character) return;

    // Position camera at character's head
    const headHeight = 1.6; // adjust based on model
    camera.position.set(
        character.position.x,
        character.position.y + headHeight,
        character.position.z
    );

    // Make camera look forward in same direction as character
    let forward = new THREE.Vector3();
    character.getWorldDirection(forward);

    camera.lookAt(
        character.position.x + forward.x,
        character.position.y + headHeight,
        character.position.z + forward.z
    );
}
