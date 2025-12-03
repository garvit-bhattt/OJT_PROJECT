import * as THREE from 'three';
// import { Colors } from '../constants.js'; // Uncomment if you have constants

export class SpaceShip {
    constructor() {
        const ship = new THREE.Group(); // The invisible parent object

        // Main Body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf25346, // Red
            roughness: 0.4,
            metalness: 0.8,
            flatShading: true
         });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.x = Math.PI / 2;
        body.castShadow = true; // Enable shadow
        ship.add(body);

        // Cockpit
        const cockpitGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const cockpitMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd8d0d1, // White/Grey
            roughness: 0.2,
            metalness: 0.9,
            flatShading: true
         });
        const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
        cockpit.position.set(0, 0.5, 0);
        ship.add(cockpit);

        // Wings
        const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
        const wingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf25346, 
            roughness: 0.4,
            metalness: 0.8,
            flatShading: true
         });
        
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-1, 0, 0);
        leftWing.castShadow = true;
        ship.add(leftWing);

        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(1, 0, 0);
        rightWing.castShadow = true;
        ship.add(rightWing);

        // --- FIXED: REMOVED HARDCODED POSITIONS ---
        // ship.position.y = 100;  <-- DELETED
        // ship.position.z = 190;  <-- DELETED
        
        // Important: If using the Class pattern, usually we assign to 'this.mesh'
        // But your main.js expects the class to RETURN the mesh directly.
        // So we keep it as is.
        return ship;
    }
}