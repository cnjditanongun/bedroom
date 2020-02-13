var scene, camera, renderer, meshBed;
var meshFloor, ambientLight, light, controls, meshWall1, floorTexture;
 
var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;
 
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
 
  //bed
  bedTexture = new THREE.TextureLoader().load( 'assets/textures/sheet.png' );
  meshBed = new THREE.Mesh(
     new THREE.BoxGeometry(2,0,3),
     new THREE.MeshPhongMaterial({map: bedTexture, wireframe:USE_WIREFRAME})
  );
  meshBed.position.y =0.5;
  meshBed.position.x =3.7;
  meshBed.position.z =3.5;
  // The cube can have shadows cast onto it, and it can cast shadows
  meshBed.receiveShadow = true;
  meshBed.castShadow = true;
  scene.add(meshBed);


  //bedframe
  bedFrameTexture = new THREE.TextureLoader().load( 'assets/textures/frame.jpg' );
  meshBedFrame = new THREE.Mesh(
   new THREE.BoxGeometry(2,0,3),
   new THREE.MeshPhongMaterial({map: bedFrameTexture, wireframe:USE_WIREFRAME})
   );
   meshBedFrame.position.y =0;
   meshBedFrame.position.x =3.7;
   meshBedFrame.position.z =3.5;
   // The cube can have shadows cast onto it, and it can cast shadows
   meshBedFrame.receiveShadow = true;
   meshBedFrame.castShadow = true;
   scene.add(meshBedFrame);
 

   //floor
   floorTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpeg' );
   meshFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(10,10, 10,10),
      new THREE.MeshPhongMaterial({map: floorTexture, wireframe:USE_WIREFRAME})
   );
   meshFloor.rotation.x -= Math.PI / 2;
   meshFloor.receiveShadow = true;
   scene.add(meshFloor);

   //Front bed wall
   const widthFrontBedWall = 10;
   const heightFrontBedWall = 8;
   const depthFrontBedWall = 1;
   const frontBedWallGeometry = new THREE.BoxBufferGeometry(widthFrontBedWall, heightFrontBedWall, depthFrontBedWall);

   let frontBedWallMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let frontBedWall = new THREE.Mesh( frontBedWallGeometry, frontBedWallMaterial );
   frontBedWall.position.set(0,3,-5);
   scene.add( frontBedWall );

   //back Bed Wall
   const widthBackBedWall = 10;
   const heightBackBedWall = 8;
   const depthBackBedWall = 1;
   const backBedWallGeometry = new THREE.BoxBufferGeometry(widthBackBedWall, heightBackBedWall, depthBackBedWall);

   let backBedWallMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let backBedWall = new THREE.Mesh( backBedWallGeometry, backBedWallMaterial );
   backBedWall.position.set(0,3,5.5);
   scene.add( backBedWall );


   //Wallbot
   const widthBotWall = 1;
   const heighBotWall = 3;
   const depthBotWall = 22;
   const botWallGeometry = new THREE.BoxBufferGeometry(widthBotWall, heighBotWall, depthBotWall);

   let botWallMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let botWall = new THREE.Mesh( botWallGeometry, botWallMaterial );
   botWall.position.set(-5,1,5.5);
   scene.add( botWall );


   //Wallmid
   const widthMidWall = 1;
   const heighMidWall = 8;
   const depthMidWall = 2;
   const midWallGeometry = new THREE.BoxBufferGeometry(widthMidWall, heighMidWall, depthMidWall);

   let midWallMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let midWall = new THREE.Mesh( midWallGeometry, midWallMaterial );
   midWall.position.set(-5,3.3,0);
   scene.add( midWall );


   //WallUp
   const widthtUpWall = 1;
   const heighUpWall = 1;
   const depthUpWall = 22;
   const botUpGeometry = new THREE.BoxBufferGeometry(widthtUpWall, heighUpWall, depthUpWall);

   let upWallMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let upWall = new THREE.Mesh( botUpGeometry, upWallMaterial );
   upWall.position.set(-5,6,5.5);
   scene.add( upWall );


   //Roof
   const widthtRoof = 15;
   const heighUpoof = 3;
   const depthUpWoof = 20;
   const rootpGeometry = new THREE.BoxBufferGeometry(widthtRoof, heighUpoof, depthUpWoof);

   let roofMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let roof = new THREE.Mesh( rootpGeometry, roofMaterial );
   roof.position.set(-1,8,4);
   scene.add( roof );
 
 
  // LIGHTS
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
 
  light = new THREE.PointLight(0xffffff, 5, 30);
  light.position.set(-15,10,5.5);
  light.castShadow = true;
  // Will not light anything closer than 0.1 units or further than 25 units
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);
 
 
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);
 
 
  // Enable Shadows in the Renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PhongShadowMap;
 
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  animate();
}
 
function animate(){
  controls.update();
  requestAnimationFrame(animate);
 
//   mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.02;
 
  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ // left arrow key
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;
