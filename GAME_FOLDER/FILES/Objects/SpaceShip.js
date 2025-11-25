import * as THREE from 'three';
import { Colors } from '../constants.js';
export class SpaceShip {
    constructor() {
        const ship = new THREE.Group(); // The invisible parent object

        // Create the main body of the spaceship
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: Colors.ship, 
            roughness: 0.4,
            metalness: 0.8,
            flatShading: true
         });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.x = Math.PI / 2;
        ship.add(body);
        // Create the cockpit
        const cockpitGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const cockpitMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xaaaaaa, 
            roughness: 0.2,
            metalness: 0.9,
            flatShading: true
         });
        const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
        cockpit.position.set(0, 0.5, 0);
        ship.add(cockpit);
        // Create the wings
        const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
        const wingMaterial = new THREE.MeshStandardMaterial({ 
            color: Colors.ship, 
            roughness: 0.4,
            metalness: 0.8,
            flatShading: true
         });
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-1, 0, 0);
        ship.add(leftWing);
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(1, 0, 0);
        ship.add(rightWing);
        return ship;
    }
}