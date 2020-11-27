// this is imperative PoC,
// that is currently beign rewritten to declarative approach
// using react-three-fiber.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// file is being resolved by loader and a new url is returned.
import rosbotModel from './assets/ROSBOT2.gltf';

// this is three.js basic setup...
const scene = new THREE.Scene();

// we will use perspective camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls(camera, renderer.domElement);


// our 2d map... later will be populated with
// real map from the ROSBOT
let plane;
let debugMode = true;

// some uncategorized variables...

const container = document.getElementById("3js-canvas-container");
const debugDiv = document.getElementById("debug-div");

const objects = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const onUpPosition = new THREE.Vector2();
const onDownPosition = new THREE.Vector2();

const models = [];

const run = function () {
  init();
  animate();
};

const init = function () {
  initScene();
  initCamera();
  initMapPlane();
  initControls();
  initRenderer();

  loadRobotModel();

  initLight();
};

const setModelColor = function(modelObject, color) {
  modelObject.children[0].children.forEach(function (mesh) {
    mesh.material = new THREE.MeshBasicMaterial({ color: color });
  });
}

const initScene = function () {
  scene.background = new THREE.Color(0xffffff);
};

const initCamera = function () {

  camera.position.set(0, 1300, 0);
  scene.add(camera);
};

const initRenderer = function () {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
};

const initLight = function () {
  var ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);
};

const initMapPlane = function () {
  const planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
  planeGeometry.rotateX(-Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.y = -200;
  plane.receiveShadow = true;
  scene.add(plane);
  objects.push(plane);
};

const initControls = function () {
  controls.damping = 0.2;
  controls.addEventListener("change", render);
  controls.maxPolarAngle = Math.PI / 2;

  document.addEventListener("pointerdown", onPointerDown, false);
  document.addEventListener("pointerup", onPointerUp, false);
  document.addEventListener("pointermove", onPointerMove, false);
  document.addEventListener("click", onClick, false);

  document.addEventListener("keydown", function (e) {
    if (e.key == "Shift") {
      shiftKeyOn = true;
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key == "Shift") {
      shiftKeyOn = false;
      // clean up...
      scene.remove(duplicatedModel);
    }
  });
};

const animate = function () {
  requestAnimationFrame(animate);
  render();
};

const render = function () {
  renderer.render(scene, camera);
  if (debugMode) {
    debugDiv.innerHTML = "Cam pos: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z;
  }
};

const setTopView = function () {
  camera.position.x = model.position.x;
  camera.position.y = 1300;
  camera.position.z = model.position.z;
  controls.update();
  render();
}

const onPointerDown = function (e) {
  onDownPosition.x = e.clientX;
  onDownPosition.y = e.clientY;
};

const onPointerUp = function (e) {
  onUpPosition.x = e.clientX;
  onUpPosition.y = e.clientY;
};

const onPointerMove = function (e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  if (shiftKeyOn) {
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      duplicatedModel.position.set(
        intersects[0].point.x,
        -200,
        intersects[0].point.z
      );
    }

    scene.add(duplicatedModel);
  }
};

const onClick = function(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0 && shiftKeyOn) {
    // somebody clicked.. let's clone obj. make it a dest.
    const clonedModel = model.clone(true);
    setModelColor(clonedModel, 0xff0000);

    clonedModel.position.set(
      intersects[0].point.x,
      -200,
      intersects[0].point.z
    );

    scene.add(clonedModel);
  }

  console.log(intersects);
}

let shiftKeyOn = false;

init();
animate();

var model;
var duplicatedModel;

function loadRobotModel() {
  const loader = new GLTFLoader();
  loader.load(
    rosbotModel,
    function (gltf) {
      model = gltf.scene;
      model.position.x = 510;
      model.position.z = -500;
      model.position.y = -200;
      model.scale.set(250, 250, 250);

      // upon loading we clone model one time,
      // this cloned model we will have for shiftkey


      scene.add(model);

      duplicatedModel = model.clone();

      setModelColor(duplicatedModel, 0x00ff00);

    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

const setRobotPosition = function() {
}

const setMap = function(dataCanvas) {
  var texture = new THREE.CanvasTexture(dataCanvas);
  plane.material = new THREE.MeshBasicMaterial({ map: texture });
  texture.encoding = THREE.sRGBEncoding;
  controls.update();
  render();
}

export default {
  run: run,
  setMap: setMap,
  setTopView: setTopView,
  setRobotPosition: setRobotPosition
};