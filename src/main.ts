import { AnimationMixer } from "three/src/animation/AnimationMixer";
import { CanvasTexture } from "three/src/textures/CanvasTexture"
import { Clock } from "three/src/core/Clock"
import { DirectionalLight } from "three/src/lights/DirectionalLight"
import { HemisphereLight } from "three/src/lights/HemisphereLight"
import { Mesh } from "three/src/objects/Mesh"
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial"
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera"
import { PCFSoftShadowMap, RepeatWrapping } from "three/src/constants"
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry"
import { Scene } from "three/src/scenes/Scene"
import { ShadowMaterial } from "three/src/materials/ShadowMaterial"
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import laptopPath from "./laptop.glb?url";
import { ScreenCanvas } from "./ScreenCanvas";
import { MathUtils, Object3D } from "three/src/Three";

const canvas = document.getElementById("c") as HTMLCanvasElement;

const scene = new Scene();

// Camera
const camera = new OrthographicCamera((-canvas.clientWidth / 2), (canvas.clientWidth / 2), (canvas.clientHeight / 2), (-canvas.clientHeight / 2), 0, 2000);
camera.position.set(-0.1, 3, -3.5)
camera.lookAt(0, 0, 0.15);
camera.zoom = 1000;
camera.updateProjectionMatrix()

// Renderer
const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

// Directional Light
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -0.3;
directionalLight.shadow.camera.right = 0.4;
directionalLight.shadow.camera.top = -0.2;
directionalLight.shadow.camera.bottom = 0.2;
directionalLight.position.z = 0.2;
directionalLight.position.set(0, 1, .2)
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Hemi light
const hemisphereLight = new HemisphereLight(0xEEEEEE, 0x000000, .1);
scene.add(hemisphereLight);

// Shadow Plane
const planeGeo = new PlaneGeometry(10, 10);
const planeMat = new ShadowMaterial();
const plane = new Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
plane.rotateX(MathUtils.degToRad(-90));
scene.add(plane);

// Screen texture
const canvas2d = document.createElement('canvas');
canvas2d.width = 1920 / 4;
canvas2d.height = 1080 / 4;
const screenCanvas = new ScreenCanvas(canvas2d);
const texture = new CanvasTexture(canvas2d);
texture.flipY = false;
texture.wrapS = RepeatWrapping;
texture.repeat.x = - 1;

// Event listenr of mouse postion relative to the center of the canvas multiped by 0.0001
let mouseAngle: number = 0;
window.addEventListener("mousemove", (ev) => {
    const box = canvas.getBoundingClientRect();
    mouseAngle = (ev.x - box.right + box.width / 2) * 0.0001;
}, { passive: true });
window.addEventListener("touchmove", (ev) => {
    const box = canvas.getBoundingClientRect();
    mouseAngle = (ev.touches[0].pageX - box.right + box.width / 2) / canvas.clientWidth * 2 * Math.PI / 16;
}, { passive: true });


const loader = new GLTFLoader();
let laptop: Object3D;
let mixer: AnimationMixer;
loader.load(
    laptopPath,
    function (gltf) {
        gltf.scene.traverse(obj => {
            if (obj.isObject3D) {
                // if (obj.name === "Bottom") laptop = obj;
                obj.castShadow = true;

                if (obj.name === "Bottom") laptop = obj;
                if (obj.name === "Screen") {
                    const screenMat = new MeshBasicMaterial({ map: texture });
                    (obj as any).material.dispose();
                    (obj as any).material = screenMat;
                }

            }

        })
        scene.add(gltf.scene);
        mixer = new AnimationMixer(gltf.scene);
        gltf.animations.map(animation => mixer.clipAction(animation).play());
    },
    undefined,
    function (error) {
        console.error(error);
    }
);


// Resize
function onWindowResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.left = (-width / 2);
    camera.right = (width / 2);
    camera.top = (height / 2);
    camera.bottom = (-height / 2);
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
}

const resizeObserver = new ResizeObserver(onWindowResize);
try {
    resizeObserver.observe(canvas, { box: 'device-pixel-content-box' });
} catch (ex) {
    // fallback
    resizeObserver.observe(canvas, { box: 'content-box' });
}

// Render Loop
let start = Date.now();
const clock = new Clock();
function animate() {
    if (laptop) laptop.rotation.y = mouseAngle;

    const delay = 500;
    const current = Date.now();
    if (start + delay <= Date.now()) {
        screenCanvas.play();
        texture.needsUpdate = true
        start = current;
    }

    requestAnimationFrame(animate);

    if (mixer) {
        mixer.update(clock.getDelta());
    };
    renderer.render(scene, camera);
};

animate();