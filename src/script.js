import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.3;
material.normalMap = normalTexture;

material.color = new THREE.Color("rgb(0,37,61)");

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

/* ************************ Lights ************************ */
// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.4);
pointLight.position.x = -2.91;
pointLight.position.y = 3;
pointLight.position.z = 1.38;
pointLight.intensity = 2.4;
scene.add(pointLight);

// GUI debugger
/* const light1 = gui.addFolder("Light 1");
light1.add(pointLight.position, "x").min(-3).max(3).step(0.01);
light1.add(pointLight.position, "y").min(-6).max(6).step(0.01);
light1.add(pointLight.position, "z").min(-6).max(3).step(0.01);
light1.add(pointLight, "intensity").min(0).max(10).step(0.01);

const pointLight1Helper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLight1Helper); */

// Light 2
const pointLight2 = new THREE.PointLight(0xb8dc98, 2);
pointLight2.position.set(1, -1.86, 0.69);
pointLight2.intensity = 5.5;
scene.add(pointLight2);

// GUI debugger
/* const light2 = gui.addFolder("Light 2");
light2.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
light2.add(pointLight2.position, "y").min(-6).max(6).step(0.01);
light2.add(pointLight2.position, "z").min(-6).max(3).step(0.01);
light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLight2Helper); */

// Light 3
/* const pointLight3 = new THREE.PointLight(0xb8dc98, 2);
pointLight3.position.set(1, -1.86, -1.52);
pointLight3.intensity = 7;
scene.add(pointLight3);

// GUI debugger
const light3 = gui.addFolder("Light 3");
light3.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
light3.add(pointLight3.position, "y").min(-6).max(6).step(0.01);
light3.add(pointLight3.position, "z").min(-6).max(3).step(0.01);
light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

const light3Color = {
  color: 0xff0000,
};

light3.addColor(light3Color, "color").onChange(() => {
  pointLight3.color.set(light3Color.color);
});

const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1);
scene.add(pointLight3Helper); */

/* ************************ Sizes ************************ */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* ************************ Camera ************************ */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/* ************************ Renderer ************************ */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ************************ Animation ************************ */

document.addEventListener("mousemove", onMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.3 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.rotation.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
