import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { Easing, Tween, update as updateTween } from "tween";

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
const leftArrowTexture = textureLoader.load("assets/img/left.png");
const rightArrowTexture = textureLoader.load("assets/img/right.png");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const rootNode = new THREE.Object3D();
scene.add(rootNode);

const circleRadius = 5;
let count = 8;
for (let i = 0; i < count; i++) {
  const texture = textureLoader.load(`assets/mesh/${images[i]}`);
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((2 * Math.PI) / count);
  rootNode.add(baseNode);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 1 })
  );
  planet.name = `planet_${i}`;
  planet.position.z = -circleRadius;
  baseNode.add(planet);

  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({
      map: leftArrowTexture,
      transparent: true,
    })
  );
  leftArrow.name = `leftArrow_${i}`;
  leftArrow.position.set(-1.6, 0.2, -circleRadius);
  baseNode.add(leftArrow);

  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({
      map: rightArrowTexture,
      transparent: true,
    })
  );
  rightArrow.name = `rightArrow_${i}`;
  rightArrow.position.set(1.6, 0.2, -circleRadius);
  baseNode.add(rightArrow);
}

const spotlight = new THREE.SpotLight(0xffffff, 50.0, 10.0, 0.65, 1);
spotlight.position.set(0, 4, 0);
spotlight.target.position.set(0, 1, -2);
scene.add(spotlight);
scene.add(spotlight.target);

const mirror = new Reflector(new THREE.CircleGeometry(10), {
  color: 0x353535,
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
});
mirror.position.y = -1.05;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
camera.position.z = 2;
function rotateGallery(direction) {
  const deltaY = direction * ((2 * Math.PI) / count);
  new Tween(rootNode.rotation)
    .to({ y: rootNode.rotation.y + deltaY })
    .easing(Easing.Quadratic.InOut)
    .start();
}

function animate() {
  updateTween();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  mirror.getRenderTarget().setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("click", (event) => {
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouseNDC, camera);
  const intersections = raycaster.intersectObject(rootNode, true);

  if (intersections.length > 0) {
    const objectName = intersections[0].object.name;
    if (objectName.includes("leftArrow")) {
      rotateGallery(-1);
    }
    if (objectName.includes("rightArrow")) {
      rotateGallery(1);
    }
  }
});
