import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/loaders/DRACOLoader.js';


let scene, camera, renderer, models = [], currentIndex = 0;
const modelPaths = [
    'model1.glb', 'model2.glb', 'model3.glb', 
    'model4.glb', 'model5.glb', 'model6.glb'
];
let modelsLoaded = 0;

init();
loadModels();
createNavigation();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

function loadModels() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    // Set DRACO decoder path to the Three.js CDN
    dracoLoader.setDecoderPath('https://unpkg.com/three@latest/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    modelPaths.forEach((path, index) => {
        console.log(`Loading: ${path}`);
        loader.load(path, (gltf) => {
            console.log(`Loaded: ${path}`);
            let model = gltf.scene;
            model.position.x = index * 5;
            scene.add(model);
            models.push(model);
            modelsLoaded++;
            if (modelsLoaded === modelPaths.length) {
                cycleModels(0); // Center the first model
            }
        }, undefined, (error) => {
            console.error(`Error loading ${path}:`, error);
        });
    });
}

function createNavigation() {
    document.getElementById('next').addEventListener('click', () => {
        if (models.length > 0) cycleModels(1);
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (models.length > 0) cycleModels(-1);
    });
}

function cycleModels(direction) {
    currentIndex = (currentIndex + direction + models.length) % models.length;
    let targetX = -currentIndex * 5;

    models.forEach((model, index) => {
        model.position.x = targetX + index * 5;
    });
}

function animate() {
    requestAnimationFrame(animate);

     // Rotate each model along the x, y, and z axes
     models.forEach((model) => {
        model.rotation.x += 0.005;  // Rotation on X-axis
        model.rotation.y += 0.005;  // Rotation on Y-axis
        model.rotation.z += 0.005;  // Rotation on Z-axis
    });


    renderer.render(scene, camera);
}

animate();

