import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 7;

const scene = new THREE.Scene();
let bee;
let mixer;

const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.position.y = -0.26;
        bee.rotation.y = 1.2;

        scene.add(bee);
mixer = new THREE.AnimationMixer(bee);
mixer.clipAction(gltf.animations[0]).play();
mixer.update(0.02);


    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const reRenderer3D = () => {
    requestAnimationFrame(reRenderer3D);
    renderer.render(scene, camera);
};
reRenderer3D();
// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
  if(mixer) mixer.update(0.02);
   
};
reRender3D();
