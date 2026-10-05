import { Prototir } from '@prototir/web-sdk';
// Import each class from its own file: importing from '@babylonjs/core' itself bundles the whole
// engine (about 6 MB), while these keep the build to what the scene uses.
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
// Side-effect import: lets the scene pick the mesh under the pointer.
import '@babylonjs/core/Culling/ray';

const canvas = document.getElementById('scene');
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true });
const scene = new Scene(engine);
scene.clearColor = new Color4(0.03, 0.035, 0.06, 1);

const camera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 3, 9, Vector3.Zero(), scene);
camera.attachControl(canvas, true);
new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);

const blue = new StandardMaterial('blue', scene);
blue.diffuseColor = Color3.FromHexString('#65a6ff');
const lit = new StandardMaterial('lit', scene);
lit.diffuseColor = Color3.FromHexString('#f5f7fb');

for (let i = 0; i < 9; i++) {
  const sphere = CreateSphere(`sphere-${i}`, { diameter: 0.9 }, scene);
  sphere.position.set((i % 3) * 1.6 - 1.6, 0, Math.floor(i / 3) * 1.6 - 1.6);
  sphere.material = blue;
}

// Tapping a sphere lights it up and reports an event, so the Prototir page shows what people do.
scene.onPointerDown = (_event, pick) => {
  const mesh = pick?.pickedMesh;
  if (!mesh) return;
  mesh.material = mesh.material === lit ? blue : lit;
  Prototir.event('sphere_tapped');
};

engine.runRenderLoop(() => scene.render());
window.addEventListener('resize', () => engine.resize());
// The first frame is on screen: from here on the prototype is genuinely interactive.
scene.onAfterRenderObservable.addOnce(() => Prototir.ready());
