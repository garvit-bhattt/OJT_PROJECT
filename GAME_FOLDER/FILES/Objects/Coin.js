import * as THREE from 'three';
import { Colors } from '../constants.js';

export class Coin {
    constructor() {
        // RadiusTop, RadiusBottom, Height, RadialSegments
        // Size reduced (Radius 3, Thickness 0.5)
        const geom = new THREE.CylinderGeometry(3, 3, 0.5, 16);
        
        // Rotate geometry so the flat face points forward by default
        geom.rotateX(Math.PI / 2);

        const mat = new THREE.MeshStandardMaterial({
            color: Colors.coin,
            emissive: Colors.coin,
            emissiveIntensity: 1.5, // Strong Orange Glow
            flatShading: false,     // Smooth shading for a coin
            roughness: 0.2,
            metalness: 1.0          // Shiny Gold/Orange look
        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.castShadow = true;
        
        // Randomize starting rotation so they don't all look identical
        this.mesh.rotation.y = Math.random() * Math.PI;

        // Randomize spin speed
        this.rotSpeed = 0.05 + Math.random() * 0.05;
    }

    tick() {
        // Spin around the Y axis (Coin Flip)
        this.mesh.rotation.y += this.rotSpeed;
    }
}