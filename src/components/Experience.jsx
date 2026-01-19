import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Float, ContactShadows, Html, Text } from '@react-three/drei';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const FLOOR_HEIGHT = -1;
const SECT_1_POS = [0, FLOOR_HEIGHT + 1.5, 0];
const SECT_2_POS = [15, FLOOR_HEIGHT + 1.5, 0];
const SECT_3_POS = [30, FLOOR_HEIGHT + 1.5, 0];

const Scene = () => {
  const scroll = useScroll();
  const camera = useThree((state) => state.camera);
  const tl = useRef();

  useFrame((state, delta) => {
    // Scroll offset is between 0 and 1
    const r1 = scroll.range(0 / 4, 1 / 4); // Page 1 range
    const r2 = scroll.range(1 / 4, 1 / 4); // Page 2 range
    const r3 = scroll.range(2 / 4, 1 / 4); // Page 3 range
    const r4 = scroll.range(3 / 4, 1 / 4); // Page 4 range
    
    // Smooth camera movement logic based on scroll offset
    // We can use simple Lerp for robustness
    
    // Base positions for camera
    // Page 1: Wide view of Gym
    const p1_pos = new THREE.Vector3(10, 5, 10);
    const p1_look = new THREE.Vector3(0, 0, 0);
    
    // Page 2: Zoomed in Gym (Equipment)
    const p2_pos = new THREE.Vector3(3, 2, 3);
    const p2_look = new THREE.Vector3(0, 0, 0);

    // Page 3: Reception (ERP)
    const p3_pos = new THREE.Vector3(15 + 2, 2, 2); // Offset from SECT_2_POS
    const p3_look = new THREE.Vector3(15, 0, 0);

    // Page 4: Mobile (AI)
    const p4_pos = new THREE.Vector3(30, 2, 4); // Close to mobile
    const p4_look = new THREE.Vector3(30, 1, 0);

    // Current interpolation target
    const currentPos = new THREE.Vector3();
    const currentLook = new THREE.Vector3();

    // Logic: Interpolate based on scroll.offset (0 to 1)
    if (scroll.offset < 0.33) {
        // Transition Page 1 -> Page 2
        const t = scroll.offset / 0.33;
        currentPos.lerpVectors(p1_pos, p2_pos, t);
        currentLook.lerpVectors(p1_look, p2_look, t);
    } else if (scroll.offset < 0.66) {
        // Transition Page 2 -> Page 3
        const t = (scroll.offset - 0.33) / 0.33;
        currentPos.lerpVectors(p2_pos, p3_pos, t);
        currentLook.lerpVectors(p2_look, p3_look, t);
    } else {
        // Transition Page 3 -> Page 4
        const t = (scroll.offset - 0.66) / 0.34;
        currentPos.lerpVectors(p3_pos, p4_pos, t);
        currentLook.lerpVectors(p3_look, p4_look, t);
    }

    camera.position.lerp(currentPos, 0.1);
    
    const targetLook = new THREE.Vector3().copy(currentLook);
    // Smooth lookAt requires a dummy object or manual matrix update, but orbit controls style lookAt is easier
    // We set lookAt every frame
    camera.lookAt(currentLook);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      
      {/* Group 1: Gym Floor (Weights/Treadmill) */}
      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[-1, 0.5, 0]} castShadow>
                <boxGeometry args={[1, 0.2, 2]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            <mesh position={[1, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI/2, 0, 0]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[0, 1.5, -1]} castShadow>
               <boxGeometry args={[3, 2, 0.2]} />
               <meshStandardMaterial color="#888" />
            </mesh>
             <Html position={[0, 3, 0]} center transform>
                <div className="bg-black/80 text-white p-2 rounded text-sm whitespace-nowrap">
                   Gym Floor
                </div>
            </Html>
        </Float>
      </group>

      {/* Group 2: Reception (Laptop ERP) */}
      <group position={[15, 0, 0]}>
         <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Desk */}
            <mesh position={[0, 0.5, 0]} castShadow>
               <boxGeometry args={[3, 1, 1.5]} />
               <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Laptop Base */}
            <mesh position={[0, 1.05, 0]} castShadow>
               <boxGeometry args={[0.8, 0.05, 0.6]} />
               <meshStandardMaterial color="#aaa" />
            </mesh>
            {/* Laptop Screen */}
            <mesh position={[0, 1.35, -0.28]} rotation={[-0.2, 0, 0]}>
               <boxGeometry args={[0.8, 0.6, 0.02]} />
               <meshStandardMaterial color="#111" />
            </mesh>
            {/* Laptop Display Content */}
            <Html position={[0, 1.35, -0.27]} transform rotation={[-0.2, 0, 0]} scale={0.1}>
                 <div className="w-[800px] h-[600px] bg-blue-900 flex items-center justify-center p-8 rounded-lg border-4 border-gray-800">
                    <div className="text-white text-center">
                        <h1 className="text-6xl font-bold mb-4">GymSaathi ERP</h1>
                        <p className="text-3xl">Billing & Management System</p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/20 h-24 rounded"></div>
                            <div className="bg-white/20 h-24 rounded"></div>
                        </div>
                    </div>
                </div>
            </Html>
         </Float>
      </group>

      {/* Group 3: Mobile Interaction (AI) */}
      <group position={[30, 1, 0]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            {/* Phone Body */}
            <mesh castShadow>
                <boxGeometry args={[1, 2, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Screen Content */}
             <Html position={[0, 0, 0.06]} transform scale={0.1}>
                <div className="w-[300px] h-[600px] bg-black rounded-3xl overflow-hidden border-8 border-gray-800 flex flex-col relative">
                     {/* Notch */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                     {/* UI */}
                     <div className="flex-1 bg-gradient-to-br from-purple-600 to-blue-600 p-4 text-white pt-10">
                        <h2 className="text-3xl font-bold mb-2">GymSaathi AI</h2>
                        <div className="bg-white/20 p-3 rounded-lg mb-2">
                             <p className="text-sm">Today's Workout</p>
                             <div className="h-2 bg-white/40 rounded mt-1 w-2/3"></div>
                        </div>
                         <div className="bg-white/20 p-3 rounded-lg">
                             <p className="text-sm">Diet Plan</p>
                             <div className="h-2 bg-white/40 rounded mt-1 w-full"></div>
                        </div>
                        <div className="mt-auto pt-4 text-center">
                            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold">Start</button>
                        </div>
                     </div>
                </div>
            </Html>
          </Float>
      </group>

      <ContactShadows opacity={0.5} scale={50} blur={1} far={10} resolution={256} color="#000000" />
    </>
  );
};

const Experience = () => {
    return (
        <div className="h-screen w-full bg-gray-100">
            <Canvas shadows camera={{ position: [10, 5, 10], fov: 50 }}>
                <ScrollControls pages={4} damping={0.25}>
                    <Scene />
                    <Scroll html style={{ width: '100%', height: '100%' }}>
                        <div className="absolute top-10 left-10 p-6 bg-white/90 backdrop-blur shadow-xl rounded-xl w-80">
                            <h1 className="text-3xl font-bold mb-2 text-indigo-700">GymSaathi Journey</h1>
                            <p className="text-gray-600 mb-4">Scroll to explore the ecosystem.</p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">1</div>
                                   <div>
                                       <h3 className="font-semibold">The Space</h3>
                                       <p className="text-xs text-gray-500">Premium gym equipment</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">2</div>
                                   <div>
                                       <h3 className="font-semibold">The ERP</h3>
                                       <p className="text-xs text-gray-500">Efficient Management</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">3</div>
                                   <div>
                                       <h3 className="font-semibold">The AI</h3>
                                       <p className="text-xs text-gray-500">Smart Personalization</p>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
};

export default Experience;
