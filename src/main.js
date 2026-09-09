import './style.css';
import { enableVisitAnalytics } from './analytics.js';
enableVisitAnalytics();
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const $ = (id) => document.getElementById(id);
document.documentElement.classList.toggle('touch-device', navigator.maxTouchPoints > 0);
let generation = 1;
const openings = ['A porcelain vessel becomes a monument to', 'The absence of function reveals', 'Through the radical act of doing absolutely nothing, this object embodies', 'An algorithmic intervention in the fragile architecture of', 'A speculative container for'];
const subjects = ['our collective need to call something a practice', 'the residual anxiety of infinite productivity', 'a post-authentic economy of manufactured significance', 'the deeply human fear of an empty content calendar', 'the invisible labour of pressing a button', 'the liminal space between a breakthrough and a bathroom'];
const endings = ['The viewer is invited to add this to their portfolio.', 'Its silence is, of course, scalable.', 'Meaning is available upon regeneration.', 'The disruption has been professionally glazed.', 'No further context was harmed in the making of this context.', 'Somewhere, a keynote writes itself.'];
const pick = (items) => items[Math.floor(Math.random() * items.length)];
$('generate').addEventListener('click', () => { generation++; const n=String(generation).padStart(3,'0'); $('edition').textContent=n; $('iteration').textContent=n; $('meaning').textContent = `${openings[(generation-2)%openings.length]} ${pick(subjects)}. ${pick(endings)}`; $('medium').textContent=`Words generated. Object unchanged.`; });
let flushTimer;
$('flush').addEventListener('click', () => { clearTimeout(flushTimer); $('meaning').textContent='It’s a urinal.'; $('medium').textContent='Enough can be a creative decision.'; document.body.classList.add('flushing'); flushTimer=setTimeout(()=>document.body.classList.remove('flushing'),650); });
$('about').onclick=()=>$('note').showModal(); $('close').onclick=()=>$('note').close();
$('note').addEventListener('click', e=>{if(e.target===$('note')){const r=$('note').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('note').close();}});
$('share').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('share').textContent='Link copied ✓';}catch{$('share').textContent='Copy the URL from your browser';}setTimeout(()=>$('share').textContent='Copy link ↗',3000);};
try { setupScene(); } catch(error) { console.error('3D unavailable',error); $('fallback').hidden=false; $('reset').disabled=true; }
function setupScene(){
 const host=$('scene');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setClearColor(0,0); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.15; host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(33,1,.1,80); camera.position.set(2.7,2.25,8);
 const pmrem=new THREE.PMREMGenerator(renderer); const room=new RoomEnvironment(); const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
 const controls=new OrbitControls(camera,renderer.domElement); controls.target.set(0,.75,0);controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.45;controls.maxPolarAngle=1.7;controls.enableDamping=true;controls.autoRotate=false;controls.saveState();$('reset').onclick=()=>controls.reset();
 // Leave one-finger gestures to the browser; only a two-finger drag rotates.
 controls.touches.ONE = -1;
 controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
 const reserveTwoFingerGesture = (event) => {
   if (event.touches.length === 2 && [...event.touches].every(touch => touch.target === renderer.domElement)) {
     if (event.cancelable) event.preventDefault();
   }
 };
 renderer.domElement.addEventListener('touchstart', reserveTwoFingerGesture, { passive: false });
 renderer.domElement.addEventListener('touchmove', reserveTwoFingerGesture, { passive: false });

 const ceramic=new THREE.MeshPhysicalMaterial({color:0xf6f4e9,roughness:.22,metalness:0,clearcoat:1,clearcoatRoughness:.13,side:THREE.DoubleSide});
 const sculpture=new THREE.Group();scene.add(sculpture);sculpture.position.y=1.05;sculpture.rotation.x=-.23;
 const add=(geo,mat=ceramic,parent=sculpture)=>{const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;};
 // Pear-shaped basin: a continuous inner surface with a separate convex porcelain back.
 const outline=(angle)=>{const y=Math.cos(angle);return new THREE.Vector3(Math.sin(angle)*(.91-.24*y),y*1.18, .35+.12*y);};
 const surface=(outer)=>{const vertices=[],indices=[];const rings=44,segments=100;for(let r=0;r<=rings;r++){const t=r/rings;for(let i=0;i<=segments;i++){const p=outline(i/segments*Math.PI*2);const z=outer?-.39+(.35+.12*(p.y/1.18)+.39)*t*t:-.27+(.35+.12*(p.y/1.18)+.27)*Math.pow(t,2.8);vertices.push(p.x*t,p.y*t,z);}}for(let r=0;r<rings;r++)for(let i=0;i<segments;i++){const a=r*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();return geo;};
 add(surface(false));add(surface(true));
 const rimPoints=Array.from({length:101},(_,i)=>outline(i/100*Math.PI*2));add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rimPoints,true),160,.082,12,true));
 // Upper inlet, broad mounting shoulders and lower outlet distinguish the urinal silhouette.
 const inlet=add(new THREE.CylinderGeometry(.21,.29,.56,48));inlet.position.set(0,1.31,-.04);inlet.rotation.x=-.23;
 const lip=add(new THREE.TorusGeometry(.204,.044,12,48));lip.rotation.x=Math.PI/2-.23;lip.position.set(0,1.585,-.103);
 const dark=new THREE.MeshStandardMaterial({color:0x54564b,roughness:.72});const inletHole=add(new THREE.CircleGeometry(.16,40),dark);inletHole.rotation.x=-Math.PI/2-.23;inletHole.position.set(0,1.58,-.1);
 for(const sign of [-1,1]){const ear=add(new THREE.SphereGeometry(.22,32,20));ear.scale.set(1,.8,.56);ear.position.set(sign*.55,.96,.12);const screw=add(new THREE.CircleGeometry(.042,20),dark);screw.position.set(sign*.56,.99,.242);}
 const outlet=add(new THREE.CylinderGeometry(.23,.3,.45,40));outlet.position.set(0,-1.14,-.02);outlet.rotation.x=.28;
 for(let i=0;i<7;i++){const angle=i*Math.PI/3;const x=i===6?0:Math.sin(angle)*.13;const y=i===6?-.39:-.39+Math.cos(angle)*.13;const hole=add(new THREE.CircleGeometry(.036,20),dark);hole.position.set(x,y,-.252+Math.pow(Math.abs(y)/1.18,2.8)*.65);}
 const pedestal=add(new THREE.BoxGeometry(2.4,.25,1.8),new THREE.MeshStandardMaterial({color:0xcdcebf,roughness:.87}),scene);pedestal.position.set(0,-.44,0);
 const signatureCanvas=document.createElement('canvas');
 signatureCanvas.width=1024; signatureCanvas.height=128;
 const ctx=signatureCanvas.getContext('2d');
 const texture=new THREE.CanvasTexture(signatureCanvas); texture.colorSpace=THREE.SRGBColorSpace;
 const drawSignature=()=>{
   ctx.clearRect(0,0,signatureCanvas.width,signatureCanvas.height);
   ctx.fillStyle='#31352c'; ctx.font='500 96px "Caveat", cursive';
   ctx.textAlign='center'; ctx.textBaseline='middle';
   ctx.fillText('M.Akhbeth 2026',512,64);
   texture.needsUpdate=true;
 };
 drawSignature();
 // Canvas text must be redrawn once the locally hosted handwriting font is ready.
 document.fonts.load('500 96px "Caveat"','M.Akhbeth 2026').then(drawSignature).catch(()=>{});
 const signature=new THREE.Mesh(new THREE.PlaneGeometry(1.65,.206),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
 // Attach the signature to the plinth's front face, below the porcelain vessel.
 pedestal.add(signature); signature.position.set(0,0,.901);
 const floor=add(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.16}),scene);floor.rotation.x=-Math.PI/2;floor.position.y=-.57;floor.castShadow=false;
 scene.add(new THREE.HemisphereLight(0xffffff,0x898d72,2));const key=new THREE.DirectionalLight(0xfff9e9,4);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=5;key.shadow.camera.bottom=-4;key.shadow.normalBias=.025;key.shadow.bias=-.0001;scene.add(key);
 // Fit the actual sculpture to the viewport, including narrow phone screens.
 scene.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(sculpture).union(new THREE.Box3().setFromObject(pedestal));
 const center=bounds.getCenter(new THREE.Vector3());
 controls.target.copy(center);
 const viewDirection=new THREE.Vector3(2.7,1.5,8).normalize();
 const resize=()=>{
   const {width,height}=host.getBoundingClientRect();
   if(!width || !height) return;
   renderer.setSize(width,height); camera.aspect=width/height;
   camera.position.copy(center).add(viewDirection); camera.lookAt(center); camera.updateMatrixWorld();
   const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);
   const up=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,1);
   const tanV=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
   const tanH=tanV*camera.aspect;
   // On phones the plinth may bleed off-screen so the vessel remains the focus.
   const horizontalFill=width<=580 ? 1.32 : .94;
   let distance=0;
   for(const x of [bounds.min.x,bounds.max.x]) for(const y of [bounds.min.y,bounds.max.y]) for(const z of [bounds.min.z,bounds.max.z]) {
     const point=new THREE.Vector3(x,y,z).sub(center);
     const depth=point.dot(viewDirection);
     distance=Math.max(distance,depth+Math.abs(point.dot(right))/(tanH*horizontalFill),depth+Math.abs(point.dot(up))/(tanV*.94));
   }
   const direction=camera.position.clone().sub(controls.target).normalize();
   camera.position.copy(center).addScaledVector(direction,distance);
   camera.updateProjectionMatrix(); controls.update(); controls.saveState();
 };
 new ResizeObserver(resize).observe(host); resize();
 let visible=true;new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(host);renderer.setAnimationLoop(()=>{if(document.hidden||!visible)return;controls.update();renderer.render(scene,camera);});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('fallback').hidden=false;});
}
