function updateCamera() {
    if (!character) return;

    // Position camera at character's head
    const headHeight = 1.6; // adjust based on model
    camera.position.set(
        character.position.x,
        character.position.y + headHeight,
        character.position.z
    );
}
