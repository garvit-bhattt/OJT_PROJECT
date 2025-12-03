import * as THREE from "three";
import { Colors } from "../constants.js";

export class Enemy {
    constructor() {
        const geom = new THREE.TetrahedronGeometry(8, 2);
        
        const mat = new THREE.MeshStandardMaterial({
            color: Colors.enemy,
            emissive: Colors.enemy,
            // --- CHANGE 2: Almost No Glow ---
            emissiveIntensity: 0.1, 
            // --------------------------------
            flatShading: true,
            roughness: 0.8, // Make it look rough/rocky
            metalness: 0.2
        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.castShadow = true;
    }

    tick() {
        this.mesh.rotation.x += 0.02;
        this.mesh.rotation.y += 0.02;
    }
}