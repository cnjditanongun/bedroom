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
  meshBed.position.y =0.9;
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
   meshBedFrame.position.y =0.5;
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
   const widthFrontBedWall = 0;
   const heightFrontBedWall = 6;
   const depthFrontBedWall = 10;
   const frontBedWallGeometry = new THREE.BoxBufferGeometry(widthFrontBedWall, heightFrontBedWall, depthFrontBedWall);
   
   let forntBedWallTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   let frontBedWallMaterial = new THREE.MeshBasicMaterial( {map: forntBedWallTexture} );
   let frontBedWall = new THREE.Mesh( frontBedWallGeometry, frontBedWallMaterial );
   frontBedWall.position.set(5.5,3,0);
   frontBedWall.receiveShadow = true;
   frontBedWall.castShadow = true;
   scene.add( frontBedWall );


   //back Bed Wall
   const widthBackBedWall = 10;
   const heightBackBedWall = 6;
   const depthBackBedWall = 0;
   const backBedWallGeometry = new THREE.BoxBufferGeometry(widthBackBedWall, heightBackBedWall, depthBackBedWall);
   
   let backBedWallTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   let backBedWallMaterial = new THREE.MeshBasicMaterial( {map: backBedWallTexture} );
   let backBedWall = new THREE.Mesh( backBedWallGeometry, backBedWallMaterial );
   backBedWall.position.set(0,3,5.5);
   backBedWall.receiveShadow = true;
   backBedWall.castShadow = true;
   scene.add( backBedWall );


   //right wall left part
   const rightLeftPartWallwidth = 0;
   const rightLeftPartallheight = 6;
   const rightLeftPartWalldepthB = 4;
   const rightLeftPartWallGeometry = new THREE.BoxBufferGeometry(rightLeftPartWallwidth, rightLeftPartallheight, rightLeftPartWalldepthB);
   
   let rightLeftParTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   let rightLeftPartWallMaterial = new THREE.MeshBasicMaterial( {map: rightLeftParTexture} );
   let rightLeftPartWall = new THREE.Mesh( rightLeftPartWallGeometry, rightLeftPartWallMaterial );
   rightLeftPartWall.position.set(-5.5,3,3);
   scene.add( rightLeftPartWall );


   //right wall right part
   const rightRightPartWallwidth = 0;
   const rightRightPartWallheight = 6;
   const rightRightPartWalldepthB = 3;
   const rightRightPartWallGeometry = new THREE.BoxBufferGeometry(rightRightPartWallwidth, rightRightPartWallheight, rightRightPartWalldepthB);
   
   let rightRightParTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   let rightRighttPartWallMaterial = new THREE.MeshBasicMaterial( {map: rightRightParTexture} );
   let rightRightPartWall = new THREE.Mesh( rightRightPartWallGeometry, rightRighttPartWallMaterial );
   rightRightPartWall.position.set(-5.5,3,-3.5);
   rightRightPartWall.receiveShadow = true;
   rightRightPartWall.castShadow = true;
   scene.add( rightRightPartWall );


   //right wall upper part
   const rightUpperPartWallwidth = 0;
   const rightUpperPartWallheight = 2;
   const rightUpperPartWalldepthB = 3;
   const rightUpperPartWallGeometry = new THREE.BoxBufferGeometry(rightUpperPartWallwidth, rightUpperPartWallheight, rightUpperPartWalldepthB);

   let rightUpperPartTexture = new THREE.TextureLoader().load( 'assets/textures/wall.jpg' );
   let rightUpperPartWallMaterial = new THREE.MeshBasicMaterial( {map: rightUpperPartTexture} );
   let rightUpperPartWall = new THREE.Mesh( rightUpperPartWallGeometry, rightUpperPartWallMaterial );
   rightUpperPartWall.position.set(-5.5,5,-0.5);
   rightUpperPartWall.receiveShadow = true;
   rightUpperPartWall.castShadow = true;
   scene.add( rightUpperPartWall );


   //bedCabinet
   const bedCabinetWidth = 0;
   const bedCabinetHeight = 1.5;
   const bedCabinetDepthB = 1;
   const bedCabinetGeometry = new THREE.BoxBufferGeometry(bedCabinetWidth, bedCabinetHeight, bedCabinetDepthB);

   let bedCabinetTexture = new THREE.TextureLoader().load( 'assets/textures/bedcabinet.jpg' );
   let bedCabinetMaterial = new THREE.MeshBasicMaterial( {map: bedCabinetTexture} );
   let bedCabinet = new THREE.Mesh( bedCabinetGeometry, bedCabinetMaterial );
   bedCabinet.position.set(2,0.8,4.5);
   scene.add( bedCabinet );


   //Dresser
   const cabinetWidth = 4;
   const cabinetHeight = 4;
   const cabinetDepthB = 0;
   const cabinetGeometry = new THREE.BoxBufferGeometry(cabinetWidth, cabinetHeight, cabinetDepthB);

   let cabinetTexture = new THREE.TextureLoader().load( 'assets/textures/cabinet.png' );
   let cabinetMaterial = new THREE.MeshBasicMaterial( {map: cabinetTexture} );
   let cabinet = new THREE.Mesh( cabinetGeometry, cabinetMaterial );
   cabinet.receiveShadow = true;
   cabinet.castShadow = true;
   cabinet.position.set(-3,2,4.5);
   scene.add( cabinet );


   //door
   doorTexture = new THREE.TextureLoader().load( 'assets/textures/door.jpg' );
   door = new THREE.Mesh(
       new THREE.PlaneBufferGeometry(3,4,2,2),
       new THREE.MeshPhongMaterial({map:doorTexture})
   )
   door.position.x = -4.5;
   door.position.y = 2;
   door.position.z = -1 ;
   door.rotation.y = 90;
   door.receiveShadow = true;
   door.castShadow = true;
   scene.add(door);


   //Window Left
   const windowLeftRadius = 0;
   const windowLeftTubeRadius = 0.1;
   const windowrLeftRadialSegments = 0;
   const windowtLeftTubularSegments = 0;
   const windowLeftGeometry = new THREE.TorusBufferGeometry(windowLeftRadius, windowLeftTubeRadius, windowrLeftRadialSegments, windowtLeftTubularSegments);

   let windowlLeftMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let windowLeft = new THREE.Mesh( windowLeftGeometry, windowlLeftMaterial );
   windowLeft.receiveShadow = true;
   windowLeft.castShadow = true;
   windowLeft.position.set(2,3,-5);
   scene.add( windowLeft );


   //Window Right
   const windowRightRadius = 0;
   const windowRightTubeRadius = 0.1;
   const windowrRightRadialSegments = 0;
   const windowtRightTubularSegments = 0;
   const windowRightGeometry = new THREE.TorusBufferGeometry(windowRightRadius, windowRightTubeRadius, windowrRightRadialSegments, windowtRightTubularSegments);

   let windowlRightMaterial= new THREE.MeshPhongMaterial( {color: 0xff4444} );
   let windowRight = new THREE.Mesh( windowRightGeometry, windowlRightMaterial );
   windowRight.receiveShadow = true;
   windowRight.castShadow = true;
   windowRight.position.set(-2,3,-5);
   scene.add( windowRight );


   //roof
   const widthRoof = 10;
   const heightRoof = 0;
   const depthRoof = 11;
   const roofGeometry = new THREE.BoxBufferGeometry(widthRoof, heightRoof, depthRoof);
   
   let roofTexture = new THREE.TextureLoader().load( 'assets/textures/roof.jpg' );
   let roofMaterial = new THREE.MeshBasicMaterial( {map: roofTexture} );
   let roof = new THREE.Mesh( roofGeometry, roofMaterial );
   roof.position.set(0,6.5,0);
   scene.add( roof );


  // LIGHTS
  ambientLight = new THREE.AmbientLight(0xffffff, 0.);
  scene.add(ambientLight);
 
  light = new THREE.PointLight(0xffffff, 1, 25);
  light.position.set(0,5,-10);
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
