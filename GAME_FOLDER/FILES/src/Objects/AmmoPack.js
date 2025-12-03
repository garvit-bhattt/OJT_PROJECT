import * as THREE from 'three';

export class AmmoPack {
    constructor() {
        // A Cube with a wireframe look or just a box
        const geom = new THREE.BoxGeometry(4, 4, 4);
        
        const mat = new THREE.MeshStandardMaterial({
            color: 0xffff00, // Yellow
            emissive: 0xffff00,
            emissiveIntensity: 0.5,
            roughness: 0.2,
            metalness: 0.8,
            flatShading: true
        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.castShadow = true;
    }

    tick() {
        this.mesh.rotation.x += 0.02;
        this.mesh.rotation.y += 0.05;
    }
}