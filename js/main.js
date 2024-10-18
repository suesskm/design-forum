import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getFirstObjectWithName } from './RayCastHelper.js';




var width = window.innerWidth*1;
var height = window.innerHeight*1;





// 1: Set up the scene

var scene = new THREE.Scene();

// 2: Add a camera
var camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
camera.position.x =25;
camera.position.y =32;
camera.position.z = 5;



// 3: create a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setClearColor( 0x000000, 0 ); // the default
renderer.setSize(width, height);
// document.body.appendChild(renderer.domElement);
document.getElementById("three-body").appendChild(renderer.domElement);



//----------------------texture loader---------------------
//create a texture loader
const textureLoader = new THREE.TextureLoader();
//load the image as a textureWEBP
const greenTexture = textureLoader.load('media/images/nature1.png');

//create a material using the texture
const greenMaterial = new THREE.MeshBasicMaterial({map: greenTexture});

const greenGeometry = new THREE.SphereGeometry(1,32,32);
const green = new THREE.Mesh(greenGeometry, greenMaterial);
scene.add(green);

green.position.set(10,-4,-2);
green.scale.set(1,1,1);

//create a texture loader
const textureLoader2 = new THREE.TextureLoader();
//load the image as a textureWEBP
const purpleTexture = textureLoader2.load('media/images/nature1.png');

//create a material using the texture
const purpleMaterial = new THREE.MeshBasicMaterial({map: purpleTexture});

const purpleGeometry = new THREE.SphereGeometry(1,32,32);
const purple = new THREE.Mesh(purpleGeometry, purpleMaterial);
scene.add(purple);


purple.name="purple";
purple.position.set(-10,4,-10);
purple.scale.set(1,1,1);



//create a texture loader
const textureLoader3 = new THREE.TextureLoader();
//load the image as a textureWEBP
const yellowTexture = textureLoader3.load('media/images/nature1.png');

//create a material using the texture
const yellowMaterial = new THREE.MeshBasicMaterial({map: yellowTexture});

const yellowGeometry = new THREE.SphereGeometry(1,32,32);
const yellow = new THREE.Mesh(yellowGeometry, yellowMaterial);
scene.add(yellow);

yellow.position.set(-5,6,5);
yellow.scale.set(1,1,1);

//create a texture loader
const textureLoader4 = new THREE.TextureLoader();
//load the image as a textureWEBP
const pinkTexture = textureLoader4.load('media/images/nature1.png');

//create a material using the texture
const pinkMaterial = new THREE.MeshBasicMaterial({map: pinkTexture});

const pinkGeometry = new THREE.SphereGeometry(1,32,32);
const pink = new THREE.Mesh(pinkGeometry, pinkMaterial);
scene.add(pink);
pink.name = "pink";
pink.position.set(1,4,1);
pink.scale.set(1,1,1);



//add orb model
var orb;
//declare variables for animation
var mixerOrb;          // Three.JS AnimationMixer
var orb_anim;  //animation FLY
//adding the 3D model
const gltfLoader = new GLTFLoader();
gltfLoader.load('models/map_butterfly.glb', function(gltf){
    orb = gltf.scene;
    orb.scale.set(15,15,10);
    orb.position.set(-3,14,2);
    //  scene.add(orb);



    // ANIMATION MIXER
    // mixerOrb = new THREE.AnimationMixer(orb);
    // //apply the animation
    // orb_anim = gltf.animations[0]; //first animation
    // mixerOrb.clipAction( orb_anim ).play();
});

// Add new model
var newModel;
var mixerNewModel;
var newModel_anim;
gltfLoader.load('models/clearwing_swallowtail.glb', function (gltf) {
    newModel = gltf.scene;
    newModel.scale.set(15, 15,10);
    newModel.position.set(4, 4, -10);
    scene.add(newModel);

    mixerNewModel = new THREE.AnimationMixer(newModel);
    newModel_anim = gltf.animations[0];
    mixerNewModel.clipAction(newModel_anim).play();


  


});





//----------------- OBJECT ROTATION WITH MOUSE MOVE -----------------
// Define variables to store the previous mouse position
let previousMousePosition = {
    x: 0,
    y: 0
};

// Function to handle mouse movement
function onMouseMove(event) {
    // Calculate the change in mouse position
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    // Update the previous mouse position
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };

    // Adjust rotation based on mouse movement
    // const rotationSpeed = 0.001;
    // //substitute 'selfieCube' with the variable name for any object you want
    // grass.rotation.y += deltaMove.x * rotationSpeed;
    // grass.rotation.x += deltaMove.y * rotationSpeed;
   
    // const sphereRotationSpeed = 0.005;
    // waterVideo.rotation.y += deltaMove.x * sphereRotationSpeed;
    // waterVideo.rotation.x += deltaMove.y * sphereRotationSpeed;
  
    
}

//----------------- OBJECT FOLLOWS MOUSE MOVEMENT -----------------
// Function to handle mouse movement
function moveObj(event) {
    // Calculate the normalized device coordinates (NDC) of the mouse position
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster to determine the intersection point with the scene
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);

    // Calculate the intersection point with a plane at z = 0 (the plane parallel to the camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    intersectionPoint.z = -2;
    // Update the cube's position to match the intersection point
    orb.position.copy(intersectionPoint);
}

// Add event listener for mouse movement
document.addEventListener('mousemove', moveObj, false);

// // Add event listener for mouse movement
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('click', onObjectClick);

function onObjectClick(event){
    const object = getFirstObjectWithName(event, window, camera, scene, "orb");
    if(object !== null){
        //add any action you want to perform when the object is clicked
         pink.material.color.set("#30ff49");
    }
}


// // Function to handle icon click event
// function openPopup(imageUrl) {
//     // Open a new window with the specified image URL
//     window.open(imageUrl, '_blank', 'width=600,height=400');
// }

// // Add click event listener to icon
// document.getElementById("icon1").addEventListener('click', function() {
//     // Call the openPopup function with the URL of the image you want to display
//     openPopup('media/images/popup1.png');
// });








//------------------------lighting-------------------------

var lightSize = 20;
// 5: Add lighting to the scene


var light = new THREE.AmbientLight(0x99ffff,lightSize,1)
light.position.set(-10,-5,-5);
// scene.add(light);

var light2 = new THREE.HemisphereLight(0x99ffff,lightSize,20)
light2.position.set(10,5,-5);
scene.add(light2);

var light4 = new THREE.HemisphereLight(0x99ffff,lightSize,20)
light4.position.set(5,3,5);
scene.add(light4);

var light3 = new THREE.RectAreaLight(0x99ffff,lightSize,20)
light3.position.set(10,5,-5);
// scene.add(light3);





//***************************CONTROLS******************** */
//Adding Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
// controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

//Responsive window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});





//***************************ANIMATIONS****************** */

const clock = new THREE.Clock();

// FINAL: Render the scene
function animate(){
    requestAnimationFrame(animate);
    //update controls
    controls.update();

    //update mixer
    if(mixerOrb){
        mixerOrb.update(clock.getDelta());
    }

    green.rotation.y += 0.08;
    green.rotation.x += 0.08;
    purple.rotation.y += 0.08;
    purple.rotation.x += 0.08;
    yellow.rotation.y += 0.08;
    yellow.rotation.x += 0.08;
    pink.rotation.y += 0.08;
    // pink.rotation.x += 0.08;

    
    if(mixerNewModel){
        mixerNewModel.update(clock.getDelta());
    }
    
    
 
       
    // if(mixerOrb){
    //     mixerOrb.update(clock.getDelta());
    // }
    

    // if(orb.position.x < -2){
    //     orb.rotation.y = THREE.MathUtils.degToRad(180);
    //     orb.position.x += 0.100;
    // }

    // if(orb.position.x > -12){
    //     orb.rotation.y = THREE.MathUtils.degToRad(180);
    //     orb.position.x -= 0.100;
    // }

    renderer.render(scene,camera);
}

animate();