import * as THREE from "three";

const images = [
  "mercuryMap.jpg",
  "venusMap.jpg",
  "earthMap.jpg",
  "marsMap.jpg",
  "jupiterMap.jpg",
  "saturnMap.jpg",
  "uranusMap.jpg",
  "neptuneMap.jpg",
];

const titles = [
  "Merkury",
  "Wenus",
  "Ziemia",
  "Mars",
  "Jowisz",
  "Saturn",
  "Uran",
  "Neptun",
];
const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const rootNode = new THREE.Object3D();
scene.add(rootNode);

let count = 8;
for (let i = 0; i < count; i++) {
  const texture = textureLoader.load(`assets/mesh/${images[i]}`);
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((2 * Math.PI) / count);
  rootNode.add(baseNode);
  const border = new THREE.Mesh(
    new THREE.RingGeometry(3.6, 2.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x676767, side: THREE.DoubleSide })
  );
  border.position.z = -4;
  baseNode.add(border);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 32, 32),
    new THREE.MeshStandardMaterial({ map: texture })
  );

  planet.position.z = -4;
  baseNode.add(planet);
}

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 0);
spotlight.position.set(1, 5, 1);
spotlight.target.position.set(0, 1, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 1;

function animate() {
  rootNode.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
