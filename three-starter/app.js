import * as THREE from 'three';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070910);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.z = 4;

const geometry = new THREE.IcosahedronGeometry(1.25, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x65a6ff, roughness: 0.24, metalness: 0.2, flatShading: true });
const object = new THREE.Mesh(geometry, material);
scene.add(object);
scene.add(new THREE.HemisphereLight(0xb9d5ff, 0x121828, 2.3));
const key = new THREE.DirectionalLight(0xffffff, 3);
key.position.set(3, 4, 5);
scene.add(key);

let dragging = false;
let previousX = 0;
canvas.addEventListener('pointerdown', (event) => {
  dragging = true;
  previousX = event.clientX;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  object.rotation.y += (event.clientX - previousX) * 0.01;
  previousX = event.clientX;
});
canvas.addEventListener('pointerup', (event) => {
  dragging = false;
  canvas.releasePointerCapture(event.pointerId);
  Prototir.event('shape_rotated');
});

function resize() {
  const width = innerWidth;
  const height = innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
}

function frame(time) {
  resize();
  if (!dragging) object.rotation.y = time * 0.00025;
  object.rotation.x = Math.sin(time * 0.0004) * 0.16;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

Prototir.ready();
requestAnimationFrame(frame);
