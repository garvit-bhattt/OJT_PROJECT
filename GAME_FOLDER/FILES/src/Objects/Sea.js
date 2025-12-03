import * as THREE from 'three';
import { Colors } from '../constants.js';

export class Sea {
    constructor() {
        this.mesh = null;
        this.waves = [];
        this.time = 0; 
        this.init();
    }

    init() {
        const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        geom.rotateX(-Math.PI / 2);

        const positionAttribute = geom.attributes.position;
        const vertex = new THREE.Vector3();

        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            this.waves.push({
                y: vertex.y, x: vertex.x, z: vertex.z,
                ang: Math.random() * Math.PI * 2,
                amp: 5 + Math.random() * 15,
                speed: 0.016 + Math.random() * 0.032
            });
        }

        const mat = new THREE.MeshPhysicalMaterial({
            color: Colors.seaBase,      
            emissive: Colors.seaEmissive, 
            // --- CHANGE 1: Much Lower Glow ---
            emissiveIntensity: 0.3,     
            // ---------------------------------
            metalness: 0.9,             
            roughness: 0.05,            
            transmission: 0.2,          
            thickness: 1.0,             
            flatShading: true,          
        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.receiveShadow = true;
        this.mesh.position.y = -600;
    }

    tick() {
        this.mesh.rotation.z += 0.002;

        // Slower, subtler pulse
        this.time += 0.03;
        const breathingGlow = 0.3 + Math.sin(this.time) * 0.1; 
        this.mesh.material.emissiveIntensity = breathingGlow;

        const positionAttribute = this.mesh.geometry.attributes.position;
        for (let i = 0; i < positionAttribute.count; i++) {
            const v = this.waves[i];
            const x = v.x + Math.cos(v.ang) * v.amp;
            const y = v.y + Math.sin(v.ang) * v.amp;
            positionAttribute.setXY(i, x, y);
            v.ang += v.speed;
        }
        positionAttribute.needsUpdate = true;
    }
}