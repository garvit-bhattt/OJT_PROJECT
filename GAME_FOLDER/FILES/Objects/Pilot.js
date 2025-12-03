import * as THREE from 'three';
import { Colors } from '../constants.js';

export class Pilot {
    constructor() {
        this.mesh = new THREE.Group();
        this.mesh.name = "pilot";
        this.init();
    }

    init() {
        // 1. FLIGHT SUIT (Body)
        // Bulkier chest armor
        const geomBody = new THREE.BoxGeometry(15, 15, 15);
        const matBody = new THREE.MeshStandardMaterial({ 
            color: 0xffae00, // Bright Orange Suit
            roughness: 0.6,
            flatShading: true
        });
        const body = new THREE.Mesh(geomBody, matBody);
        body.position.set(0, -10, 0);
        this.mesh.add(body);

        // 2. HELMET (Head)
        // White helmet
        const geomHead = new THREE.BoxGeometry(12, 12, 12);
        const matHead = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, // White
            roughness: 0.2
        });
        const head = new THREE.Mesh(geomHead, matHead);
        this.mesh.add(head);

        // 3. VISOR (Glowing Eyes)
        const geomVisor = new THREE.BoxGeometry(8, 4, 10); // Wide visor
        const matVisor = new THREE.MeshStandardMaterial({ 
            color: 0x00ffff, 
            emissive: 0x00ffff,
            emissiveIntensity: 1.5, // Glows inside the cockpit
            metalness: 0.9,
            roughness: 0.1
        });
        const visor = new THREE.Mesh(geomVisor, matVisor);
        visor.position.set(3, 0, 0); // Push forward on face (assuming X is forward)
        this.mesh.add(visor);

        // 4. HEADPHONES / EAR PIECES
        const geomEar = new THREE.BoxGeometry(2, 6, 2);
        const matEar = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const earL = new THREE.Mesh(geomEar, matEar);
        earL.position.set(0, 0, 7); // Left
        this.mesh.add(earL);

        const earR = new THREE.Mesh(geomEar, matEar);
        earR.position.set(0, 0, -7); // Right
        this.mesh.add(earR);
    }

    updateHairs() {
        // No hair to animate (wearing helmet), but function kept to prevent crash
        // We could bob the head slightly if we wanted
    }
}