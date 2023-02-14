import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Object } from './Object/Object.jsx'

function App() {

  const canvas = useThree().gl.domElement

  window.addEventListener('dblclick', () => {
      canvas.requestFullscreen()
  })

  const spotLight = new THREE.SpotLight(0x0000ff, 30)
  spotLight.position.x = 0
  spotLight.position.y = 0
  spotLight.position.z = 0
  spotLight.shadow.mapSize.width = 4096
  spotLight.shadow.mapSize.height = 4096
  spotLight.castShadow = true

  return (
    <>
      <OrbitControls />
      <color args={["black"]} attach={"background"}></color>

      {/* <primitive position={[0,3,0]} object={spotLight} /> */}
      <primitive position={[0,3.9,0]} object={spotLight} />

      <Object geometry={new THREE.TorusKnotGeometry(1, 0.3)} position={[0,0.1,0]}></Object>
      
      <mesh receiveShadow scale={[10,1,10]} position={[0,-4,0]}>
        <boxGeometry></boxGeometry>
        <meshPhysicalMaterial />
      </mesh>
    </>
  )
}

export default App
