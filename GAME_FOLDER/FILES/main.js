import * as THREE from "three";
import { SpaceShip } from "./Objects/SpaceShip.js";


let mousePos = { x: 0, y: 0 };


// 1. Create the Scene, Camera, and Renderer
const scene = new THREE.Scene();
// Add some fog for depth (matches the background color you might add later)
scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
// FOV: 75, Aspect: Window Width/Height, Near: 0.1, Far: 1000
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// IMPORTANT: We must move the camera back! 
// By default, the camera and objects spawn at (0,0,0). 
// If the camera is inside the object, we won't see it.
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);// Make it full screen
const world = document.getElementById("world");
world.appendChild(renderer.domElement);

// Create the SpaceShip and add it to the scene
const myShip = new SpaceShip();
scene.add(myShip);
myShip.rotation.y = -90 * (Math.PI / 180) + mousePos.x * 0.5;
// // 2. Create the Geometry (Cube)
// const test = new THREE.Group(); // Default is 1x1x1 cube
// const geometry = new THREE.BoxGeometry(1, 3, 1);
// // 3. Create the Material (Basic color)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Green color
// // 4. Create the Mesh (Geometry + Material)
// const cube = new THREE.Mesh(geometry, material);
// // Add the cube to the scene
// test.add(cube);

// const wingGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.1);
// const wingMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
// leftWing.position.set(-1, 0, 0);
// test.add(leftWing);
// const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
// rightWing.position.set(1, 0, 0);
// test.add(rightWing);
// scene.add(test);

// use mouse move to rotate the ship
document.addEventListener('mousemove', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
//how i set mouse position to rotate the ship
// BY using :-The Formula:
// Divide by Width: clientX / window.innerWidth -> gives you 0.0 to 1.0.
// Multiply by 2: -> gives you 0.0 to 2.0.
// Subtract 1: -> gives you -1.0 (Left) to +1.0 (Right).
// This is called Normalized Device Coordinates (NDC).






// 3. Add Lighting to the Scene
// Lighting (so we can see the 3D shapes properly)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);



// --- 5. HELPER FUNCTION (The Math) ---
// This maps a value from one range (like -1 to 1) to another (like -75 to 75)
// Helper Function: Normalization (The Translator)
// v: The value we have (e.g., Mouse X)
// vmin, vmax: The range it comes FROM (e.g., -1 to 1)
// tmin, tmax: The range we want it to go TO (e.g., -75 to 75)

function normalize(v, vmin, vmax, tmin, tmax) {
    // 1. Clamp: Ensure 'v' doesn't go outside the min/max limits
    const clampedValue = Math.max(Math.min(v, vmax), vmin);
    
    // 2. Percentage: Calculate how far 'v' is between vmin and vmax (0.0 to 1.0)
    // Example: If range is 0 to 100, and v is 50, percentage is 0.5
    const rangeOriginal = vmax - vmin;
    const percentage = (clampedValue - vmin) / rangeOriginal;
    
    // 3. Map: Apply that percentage to the new range
    const rangeTarget = tmax - tmin;
    const finalValue = tmin + (percentage * rangeTarget);
    
    return finalValue;
}



// 5. The Initial Render (Taking the photo)
function animate() {
    // 1. Schedule the NEXT frame immediately
    requestAnimationFrame(animate);
    // Define a target X based on mouse position (e.g., range of -75 to 75)
    // You might need to tune the '75' depending on how wide your screen is
    let targetX = normalize(mousePos.x, -0.75, 0.75, -75, 75);
    let targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175); // Y goes from 25 (low) to 175 (high)

    // 2. Update Logic (Move things)
    // Update position with Lerp (0.1 is the speed factor)
    myShip.position.y += (targetY - myShip.position.y) * 0.1;
    myShip.position.x += (targetX - myShip.position.x) * 0.1;
    myShip.rotation.z = (targetY - myShip.position.y) * 0.0128;
    myShip.rotation.x = (myShip.position.y - targetY) * 0.0064;
    myShip.rotation.z = (targetY - myShip.position.y) * 0.0128;
    myShip.rotation.x = (myShip.position.y - targetY) * 0.0064;
    // myShip.rotation.x += mousePos.x * 0.05;
    

    // 3. Render (Take the picture)
    renderer.render(scene, camera);
}

// 4. Kickstart the loop
animate();