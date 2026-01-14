// "use client"

// import React, { useState, useEffect, useRef, Suspense } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { 
//   OrbitControls, 
//   PerspectiveCamera, 
//   Float, 
//   Environment,
//   Text,
//   Edges
// } from "@react-three/drei"
// import { motion, AnimatePresence } from "framer-motion"
// import * as THREE from "three"

// // --- Explode Helper Function ---

// const explode = (
//   base: [number, number, number],
//   offset: [number, number, number],
//   t: number
// ): [number, number, number] => [
//   base[0] + offset[0] * (1 - t),
//   base[1] + offset[1] * (1 - t),
//   base[2] + offset[2] * (1 - t),
// ]

// // --- SketchUp-style Camera Controller ---

// const SketchUpCameraController = ({ progress }: { progress: number }) => {
//   const { camera } = useThree()
//   const targetPosition = useRef(new THREE.Vector3(12, 8, 18))
//   const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  
//   useFrame(() => {
//     // SketchUp-style camera transitions based on progress
//     if (progress < 25) {
//       // Blueprint view - top-down angled
//       targetPosition.current.lerp(new THREE.Vector3(8, 12, 8), 0.05)
//       targetLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.05)
//     } else if (progress < 55) {
//       // Exterior view - orbital (ellipse path for more natural feel)
//       const angle = (progress - 25) / 30 * Math.PI * 2
//       targetPosition.current.lerp(
//         new THREE.Vector3(
//           Math.cos(angle) * 18,
//           7 + Math.sin(angle * 0.5) * 2,
//           Math.sin(angle) * 14
//         ), 0.04
//       )
//       targetLookAt.current.lerp(new THREE.Vector3(0, 2, 0), 0.04)
//     } else if (progress < 85) {
//       // Interior view - closer
//       targetPosition.current.lerp(new THREE.Vector3(6, 4, 6), 0.04)
//       targetLookAt.current.lerp(new THREE.Vector3(0, 1, 0), 0.04)
//     } else {
//       // Final view - cinematic
//       const angle = Date.now() * 0.0005
//       targetPosition.current.lerp(
//         new THREE.Vector3(
//           Math.cos(angle) * 20,
//           10,
//           Math.sin(angle) * 20
//         ), 0.02
//       )
//       targetLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.02)
//     }
    
//     // Smooth camera movement
//     camera.position.lerp(targetPosition.current, 0.05)
//     camera.lookAt(targetLookAt.current)
//   })
  
//   return null
// }

// // --- Enhanced Blueprint for Realistic Wireframe ---

// const Blueprint2D = ({ progress }: { progress: number }) => {
//   const blueprintOpacity = Math.max(0, Math.min(1, (25 - progress) / 25))
//   const blueprintScale = 1 + (progress / 25) * 0.1
  
//   return (
//     <group position={[0, 0.5, 0]} scale={[blueprintScale, blueprintScale, 1]}>
//       {/* Main Blueprint Paper */}
//       <mesh position={[0, 0, -0.01]} receiveShadow>
//         <planeGeometry args={[12, 8]} />
//         <meshStandardMaterial 
//           color="#f8f8f8" 
//           roughness={0.8}
//           transparent
//           opacity={blueprintOpacity}
//         />
//       </mesh>
      
//       {/* Grid Lines */}
//       {[...Array(13)].map((_, i) => (
//         <mesh key={`h-${i}`} position={[0, (i - 6) * 0.6, 0]}>
//           <planeGeometry args={[12, 0.02]} />
//           <meshStandardMaterial 
//             color="#e0e0e0" 
//             transparent
//             opacity={blueprintOpacity * 0.5}
//           />
//         </mesh>
//       ))}
//       {[...Array(9)].map((_, i) => (
//         <mesh key={`v-${i}`} position={[(i - 4) * 0.6, 0, 0]}>
//           <planeGeometry args={[0.02, 8]} />
//           <meshStandardMaterial 
//             color="#e0e0e0" 
//             transparent
//             opacity={blueprintOpacity * 0.5}
//           />
//         </mesh>
//       ))}
      
//       {/* House Outline */}
//       <group position={[0, 0, 0]}>
//         {/* Foundation */}
//         <mesh position={[0, -2, 0]}>
//           <planeGeometry args={[6, 0.1]} />
//           <meshStandardMaterial 
//             color="#2c3e50" 
//             emissive="#2c3e50" 
//             emissiveIntensity={0.2}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Walls */}
//         <mesh position={[0, 0, 0]}>
//           <planeGeometry args={[6, 4]} />
//           <meshStandardMaterial 
//             color="#2c3e50" 
//             emissive="#2c3e50" 
//             emissiveIntensity={0.2}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Roof Lines */}
//         <mesh position={[0, 2, 0]}>
//           <planeGeometry args={[8, 0.1]} />
//           <meshStandardMaterial 
//             color="#2c3e50" 
//             emissive="#2c3e50" 
//             emissiveIntensity={0.2}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Door */}
//         <mesh position={[0, -1, 0]}>
//           <planeGeometry args={[1.5, 3]} />
//           <meshStandardMaterial 
//             color="#3498db" 
//             emissive="#3498db" 
//             emissiveIntensity={0.3}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Windows */}
//         {[-2, 2].map((x, i) => (
//           <mesh key={i} position={[x, 0.5, 0]}>
//             <planeGeometry args={[1.2, 1.5]} />
//             <meshStandardMaterial 
//               color="#3498db" 
//               emissive="#3498db" 
//               emissiveIntensity={0.3}
//               transparent
//               opacity={blueprintOpacity}
//             />
//           </mesh>
//         ))}
        
//         {/* Garage */}
//         <mesh position={[3.5, -0.5, 0]}>
//           <planeGeometry args={[2.5, 2]} />
//           <meshStandardMaterial 
//             color="#e74c3c" 
//             emissive="#e74c3c" 
//             emissiveIntensity={0.3}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Measurements */}
//         <mesh position={[0, -3.5, 0]}>
//           <planeGeometry args={[8, 0.3]} />
//           <meshStandardMaterial 
//             color="#7f8c8d" 
//             transparent
//             opacity={blueprintOpacity * 0.8}
//           />
//         </mesh>
        
//         {/* Dimension Lines */}
//         <mesh position={[-4, -3.2, 0]}>
//           <planeGeometry args={[0.1, 0.6]} />
//           <meshStandardMaterial 
//             color="#7f8c8d" 
//             transparent
//             opacity={blueprintOpacity * 0.8}
//           />
//         </mesh>
//         <mesh position={[4, -3.2, 0]}>
//           <planeGeometry args={[0.1, 0.6]} />
//           <meshStandardMaterial 
//             color="#7f8c8d" 
//             transparent
//             opacity={blueprintOpacity * 0.8}
//           />
//         </mesh>
        
//         {/* Center Lines */}
//         <mesh position={[0, 0, 0]}>
//           <planeGeometry args={[0.05, 4]} />
//           <meshStandardMaterial 
//             color="#e74c3c" 
//             emissive="#e74c3c" 
//             emissiveIntensity={0.4}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
//         <mesh position={[5, 0, 0]}>
//           <planeGeometry args={[0.05, 3]} />
//           <meshStandardMaterial 
//             color="#e74c3c" 
//             emissive="#e74c3c" 
//             emissiveIntensity={0.4}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
//         <mesh position={[3.5, 1, 0]}>
//           <planeGeometry args={[3, 0.05]} />
//           <meshStandardMaterial 
//             color="#e74c3c" 
//             emissive="#e74c3c" 
//             emissiveIntensity={0.4}
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
        
//         {/* Rolled Blueprints */}
//         <mesh position={[-5, 1, 0]}>
//           <cylinderGeometry args={[0.15, 0.15, 4]} />
//           <meshStandardMaterial 
//             color="#e0e0e0" 
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
//         <mesh position={[-5, -2, 0]}>
//           <cylinderGeometry args={[0.15, 0.15, 3]} />
//           <meshStandardMaterial 
//             color="#e0e0e0" 
//             transparent
//             opacity={blueprintOpacity}
//           />
//         </mesh>
//       </group>
      
//       {/* Blueprint Labels */}
//       <Text
//         position={[0, 3.5, 0.01]}
//         fontSize={0.3}
//         color="#2c3e50"
//         anchorX="center"
//         anchorY="middle"
//         opacity={blueprintOpacity}
//       >
//         RESIDENTIAL HOUSE - TYPE A
//       </Text>
      
//       <Text
//         position={[-5.5, 0, 0.01]}
//         fontSize={0.15}
//         color="#7f8c8d"
//         anchorX="center"
//         anchorY="middle"
//         opacity={blueprintOpacity}
//       >
//         SCALE 1:100
//       </Text>
//     </group>
//   )
// }

// // --- Animation Helper Functions ---

// const flyInPos = (start: [number, number, number], end: [number, number, number], progress: number): [number, number, number] => {
//   const t = Math.max(0, Math.min(1, progress))
//   return [
//     start[0] + (end[0] - start[0]) * t,
//     start[1] + (end[1] - start[1]) * t,
//     start[2] + (end[2] - start[2]) * t
//   ]
// }

// // --- Enhanced 3D House Model ---

// const AI3DModel = ({ progress }: { progress: number }) => {
//   const stage1Prog = Math.max(0, Math.min(1, (progress - 25) / 30))
//   const stage2Prog = Math.max(0, Math.min(1, (progress - 55) / 30))
//   const stage3Prog = Math.max(0, Math.min(1, (progress - 85) / 15))
//   const showInterior = progress >= 55

//   return (
//     <group position={[0, 0, 0]}>
//       {/* Foundation */}
//       <mesh 
//         position={flyInPos([0, -8, 0], [0, -0.5, 0], stage1Prog)} 
//         receiveShadow 
//         castShadow
//       >
//         <boxGeometry args={[7, 0.3, 5]} />
//         <meshStandardMaterial color="#8b7355" roughness={0.8} />
//         <Edges scale={1.01} color="#000000" />
//       </mesh>

//       {/* Main Structure - Walls */}
//       <group>
//         {/* Front Wall - Hidden for Section Cut */}
//         {!showInterior && (
//           <mesh 
//             position={explode([0, 2, 2.5], [0, 4, 0], stage1Prog)} 
//             castShadow 
//             receiveShadow
//           >
//             <boxGeometry args={[7, 4.5, 0.3]} />
//             <meshStandardMaterial color="#f4e4c1" roughness={0.6} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
//         )}
        
//         {/* Back Wall */}
//         <mesh 
//           position={explode([0, 2, -2.5], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[7, 4.5, 0.3]} />
//           <meshStandardMaterial color="#f4e4c1" roughness={0.6} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
        
//         {/* Side Walls */}
//         <mesh 
//           position={explode([3.5, 2, 0], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[0.3, 4.5, 5]} />
//           <meshStandardMaterial color="#f4e4c1" roughness={0.6} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
//         <mesh 
//           position={explode([-3.5, 2, 0], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[0.3, 4.5, 5]} />
//           <meshStandardMaterial color="#f4e4c1" roughness={0.6} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
//       </group>

//       {/* Roof - Triangular */}
//       <group>
//         {/* Main Roof Structure */}
//         <mesh 
//           position={explode([0, 4.5, 0], [0, 6, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <coneGeometry args={[5, 3, 4]} />
//           <meshStandardMaterial color="#8b4513" roughness={0.7} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
        
//         {/* Roof Details - Tiles */}
//         {[...Array(8)].map((_, i) => (
//           <mesh 
//             key={i}
//             position={explode([(i - 3.5) * 0.6, 4.8, 0], [0, 6, 0], stage1Prog)} 
//             castShadow 
//             receiveShadow
//           >
//             <boxGeometry args={[0.5, 0.1, 0.3]} />
//             <meshStandardMaterial color="#a0522d" roughness={0.8} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
//         ))}
//       </group>

//       {/* Garage */}
//       <group position={[3.5, 0, 0]}>
//         <mesh 
//           position={explode([0, 1.5, 0], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[2.5, 3, 0.2]} />
//           <meshStandardMaterial color="#d3d3d3" roughness={0.4} metalness={0.1} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
//         {/* Garage Door */}
//         <mesh 
//           position={explode([0, 0.5, 0.11], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[2.2, 2.5, 0.05]} />
//           <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.2} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
//       </group>

//       {/* Windows and Door Details */}
//       <group>
//         {/* Front Door */}
//         <mesh 
//           position={explode([0, 0, 2.51], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <boxGeometry args={[1.2, 2.5, 0.1]} />
//           <meshStandardMaterial color="#8b4513" roughness={0.4} />
//           <Edges scale={1.01} color="#000000" />
//         </mesh>
        
//         {/* Door Handle */}
//         <mesh 
//           position={explode([0.5, 0.5, 2.56], [0, 4, 0], stage1Prog)} 
//           castShadow 
//           receiveShadow
//         >
//           <cylinderGeometry args={[0.03, 0.03, 0.1]} />
//           <meshStandardMaterial color="#c0c0c0" metalness={0.9} />
//         </mesh>
        
//         {/* Windows */}
//         {[-2, 0, 2].map((x, i) => (
//           <group key={i} position={[x, 0, 2.51]}>
//             <mesh 
//               position={explode([0, 1.5, 0], [0, 4, 0], stage1Prog)} 
//               castShadow 
//               receiveShadow
//             >
//               <boxGeometry args={[1, 1.2, 0.05]} />
//               <meshStandardMaterial color="#87ceeb" roughness={0.1} metalness={0.3} transparent opacity={0.8} />
//             </mesh>
//             {/* Window Frame */}
//             <mesh 
//               position={explode([0, 1.5, 0.03], [0, 4, 0], stage1Prog)} 
//               castShadow 
//               receiveShadow
//             >
//               <boxGeometry args={[1.1, 1.3, 0.02]} />
//               <meshStandardMaterial color="#696969" roughness={0.5} />
//               <Edges scale={1.01} color="#000000" />
//             </mesh>
//           </group>
//         ))}
//       </group>

//       {/* Interior Furniture - Exploded */}
//       {stage2Prog > 0 && (
//         <group position={[0, 0, 0]}>
//           {/* Sofa */}
//           <mesh 
//             position={explode([-1.5, 0, 1], [0, 3, 0], stage2Prog)} 
//             castShadow 
//             receiveShadow
//           >
//             <boxGeometry args={[2, 0.8, 1]} />
//             <meshStandardMaterial color="#8b4513" roughness={0.4} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
          
//           {/* Table */}
//           <mesh 
//             position={explode([1.5, 0, 0], [0, 3, 0], stage2Prog)} 
//             castShadow 
//             receiveShadow
//           >
//             <boxGeometry args={[1.2, 0.05, 0.8]} />
//             <meshStandardMaterial color="#deb887" roughness={0.5} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
          
//           {/* Bed */}
//           <mesh 
//             position={explode([0, 0, -1.5], [0, 3, 0], stage2Prog)} 
//             castShadow 
//             receiveShadow
//           >
//             <boxGeometry args={[1.5, 0.3, 2]} />
//             <meshStandardMaterial color="#f5f5dc" roughness={0.4} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
//         </group>
//       )}

//       {/* Landscaping and Environment */}
//       {stage3Prog > 0 && (
//         <group>
//           {/* Trees */}
//           {[-4, 4].map((x, i) => (
//             <group key={i} position={[x, 0, -3]}>
//               {/* Tree Trunk */}
//               <mesh 
//                 position={flyInPos([0, -8, 0], [0, 1, 0], stage3Prog)} 
//                 castShadow 
//                 receiveShadow
//               >
//                 <cylinderGeometry args={[0.2, 0.2, 2]} />
//                 <meshStandardMaterial color="#8b4513" roughness={0.6} />
//                 <Edges scale={1.01} color="#000000" />
//               </mesh>
//               {/* Tree Leaves */}
//               <mesh 
//                 position={flyInPos([0, -8, 0], [0, 2.5, 0], stage3Prog)} 
//                 castShadow 
//                 receiveShadow
//               >
//                 <coneGeometry args={[1, 2, 8]} />
//                 <meshStandardMaterial color="#228b22" roughness={0.8} />
//                 <Edges scale={1.01} color="#000000" />
//               </mesh>
//             </group>
//           ))}
          
//           {/* Grass Ground */}
//           <mesh 
//             position={flyInPos([0, -8, 0], [0, -0.7, 0], stage3Prog)} 
//             rotation={[-Math.PI / 2, 0, 0]} 
//             receiveShadow
//           >
//             <planeGeometry args={[15, 10]} />
//             <meshStandardMaterial color="#7cfc00" roughness={0.9} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
          
//           {/* Pathway */}
//           <mesh 
//             position={flyInPos([0, -8, 0], [0, -0.65, 3], stage3Prog)} 
//             rotation={[-Math.PI / 2, 0, 0]} 
//             receiveShadow
//           >
//             <planeGeometry args={[3, 8]} />
//             <meshStandardMaterial color="#d3d3d3" roughness={0.8} />
//             <Edges scale={1.01} color="#000000" />
//           </mesh>
//         </group>
//       )}
//     </group>
//   )
// }

// // --- Enhanced Scene for Better Visibility ---

// const BuildingScene = ({ progress }: { progress: number }) => {
//   const completionProg = Math.max(0, Math.min(1, (progress - 85) / 15))
//   const spotTarget = useRef(new THREE.Object3D())

//   return (
//     <>
//       <SketchUpCameraController progress={progress} />
      
//       <Environment preset="sunset" background />
      
//       <ambientLight intensity={0.45 + completionProg * 0.35} color="#f0f8ff" />
      
//       <directionalLight 
//         position={[12, 18, 8]} 
//         intensity={1.3 + completionProg * 0.7} 
//         castShadow 
//         shadow-mapSize-width={4096}
//         shadow-mapSize-height={4096}
//         shadow-camera-far={70}
//         shadow-camera-left={-12}
//         shadow-camera-right={12}
//         shadow-camera-top={12}
//         shadow-camera-bottom={-12}
//         color="#ffdbac"
//       />
      
//       {progress > 15 && progress < 35 && (
//         <>
//           <pointLight position={[0, 6, 0]} intensity={1.8} color="#00ffff" />
//           <pointLight position={[6, 4, 6]} intensity={0.8} color="#00ff88" />
//           <pointLight position={[-6, 4, -6]} intensity={0.8} color="#00ff88" />
//         </>
//       )}
      
//       {progress > 85 && (
//         <>
//           <pointLight position={[0, 5, -4]} intensity={completionProg * 1.8} color="#ffcc99" />
//           <spotLight 
//             ref={(ref) => {
//               if (ref) {
//                 ref.target = spotTarget.current
//                 spotTarget.current.position.set(3.5, 1.8, 0)
//               }
//             }}
//             position={[4, 4, 0]} 
//             angle={0.4} 
//             penumbra={0.5} 
//             intensity={completionProg * 1.2} 
//             color="#ffd700"
//           />
//           <primitive object={spotTarget.current} />
//         </>
//       )}
      
//       <pointLight position={[6, 10, 6]} intensity={0.5} color="#ffd4a3" />
//       <hemisphereLight intensity={0.25 + completionProg * 0.25} skyColor="#87ceeb" groundColor="#e6e6fa" />

//       <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.05}>
//         <group position={[0, -1, 0]}>
//           <mesh position={[0, -0.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//             <planeGeometry args={[30, 30]} />
//             <meshStandardMaterial 
//               color="#f5f5f5" 
//               roughness={0.6}
//             />
//           </mesh>
          
//           <gridHelper 
//             args={[25, 25, "#bdc3c7", "#34495e"]} 
//             position={[0, -0.49, 0]} 
//           />
          
//           <Blueprint2D progress={progress} />
//           <AI3DModel progress={progress} />
//         </group>
//       </Float>

//       <OrbitControls 
//         enableZoom={progress >= 100}
//         enablePan={progress >= 100}
//         enableRotate={progress >= 100}
//         autoRotate={progress >= 100} 
//         autoRotateSpeed={0.15}
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2.3}
//         minDistance={7}
//         maxDistance={30}
//       />
//     </>
//   )
// }

// // --- UI Component ---

// export default function AboutConstructionBenefitsSection() {
//   const [progress, setProgress] = useState(0)
//   const [isAuto, setIsAuto] = useState(true)

//   useEffect(() => {
//     let interval: NodeJS.Timeout
//     if (isAuto) {
//       interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             setIsAuto(false)
//             return 100
//           }
//           return prev + 0.2
//         })
//       }, 70)
//     }
//     return () => clearInterval(interval)
//   }, [isAuto])

//   const stages = [
//     { id: 1, label: "Wireframe 2D", icon: "📐", threshold: 0 },
//     { id: 2, label: "Ngoại Thất", icon: "🏠", threshold: 25 },
//     { id: 3, label: "Nội Thất", icon: "🛋️", threshold: 55 },
//     { id: 4, label: "Hoàn Thiện", icon: "✨", threshold: 85 },
//   ]

//   return (
//     <section className="py-20 bg-[#f8fafc] min-h-screen font-sans">
//       <div className="max-w-7xl mx-auto px-6">
        
//         <div className="text-center mb-12">
//           <motion.span 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-blue-600 font-bold tracking-widest uppercase text-sm"
//           >
//             Mô Phỏng 3D Thực Tế
//           </motion.span>
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4"
//           >
//             Xây Dựng <span className="text-[#b30000]">Nhà Thực Tế</span> Từ Bản Vẽ
//           </motion.h2>
//           <p className="text-slate-500 max-w-2xl mx-auto text-lg">
//             Mô hình 3D chi tiết với tường gạch, mái dốc, nội thất đầy đủ và cảnh quan xanh, dễ nhìn và chân thực hơn.
//           </p>
//         </div>

//         <div className="relative w-full h-[650px] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
//           <div className="absolute top-8 left-8 z-10">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={Math.floor(progress / 25)}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
//               >
//                 <span className="text-white font-medium">
//                   {progress < 25 && "📐 Giai đoạn: Bản vẽ wireframe 2D"}
//                   {progress >= 25 && progress < 55 && "🏠 Giai đoạn: Xây dựng ngoại thất thực tế"}
//                   {progress >= 55 && progress < 85 && "🛋️ Giai đoạn: Thiết kế nội thất chi tiết"}
//                   {progress >= 85 && "✨ Giai đoạn: Hoàn thiện cảnh quan & ánh sáng"}
//                 </span>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [12, 8, 18] }}>
//             <Suspense fallback={null}>
//               <BuildingScene progress={progress} />
//             </Suspense>
//           </Canvas>

//           <div className="absolute bottom-10 left-0 right-0 px-6 md:px-20 z-10">
//             <div className="bg-slate-950/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
//               <div className="flex justify-between items-center mb-6">
//                 {stages.map((stage) => (
//                   <div key={stage.id} className="flex flex-col items-center gap-2">
//                     <motion.div
//                       className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
//                         progress >= stage.threshold 
//                         ? "bg-[#b30000] text-white shadow-[0_0_20px_rgba(179,0,0,0.4)]" 
//                         : "bg-slate-800 text-slate-500"
//                       }`}
//                       animate={progress >= stage.threshold ? { scale: [1, 1.15, 1] } : {}}
//                     >
//                       {stage.icon}
//                     </motion.div>
//                     <span className={`text-[11px] font-bold uppercase tracking-tighter ${
//                       progress >= stage.threshold ? "text-white" : "text-slate-600"
//                     }`}>
//                       {stage.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
//                 <motion.div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>
//           </div>

//           <AnimatePresence>
//             {progress >= 100 && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 onClick={() => { setProgress(0); setIsAuto(true); }}
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-[#b30000] hover:text-white transition-all group"
//               >
//                 CHẠY LẠI MÔ PHỎNG
//                 <span className="block text-[10px] font-normal opacity-60 group-hover:opacity-100">Click để xem lại quá trình xây dựng 3D</span>
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//           {[
//             { title: "Wireframe Chi Tiết", desc: "Bản vẽ 2D với đường nét rõ ràng, bao gồm mái dốc, gara và cửa sổ dễ nhận diện." },
//             { title: "Ngoại Thất Chân Thực", desc: "Tường gạch, mái ngói đỏ, cửa kính trong suốt và gara mở, không còn hình khối trừu tượng." },
//             { title: "Nội Thất & Cảnh Quan", desc: "Đồ đạc như sofa, bàn ăn, giường ngủ; cây cối, lối đi và núi nền để phối cảnh sống động." }
//           ].map((item, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
//             >
//               <div className="w-12 h-1 bg-[#b30000] mb-4" />
//               <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
//               <p className="text-slate-500">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }