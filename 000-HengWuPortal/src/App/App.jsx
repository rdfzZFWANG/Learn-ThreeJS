import { shaderMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'


import Snow from './Snow/Snow'
import portalVertexShader from './portalVertexShader.glsl.js'
import portalFragmentShader from './portalFragmentShader.glsl.js'

function App() {
  const bakedTexture = useTexture('./Baked.jpg')
  const gltf = useGLTF('./Portal.glb')
  
  const canvas = useThree().gl.domElement

  window.addEventListener('dblclick', () => {
      canvas.requestFullscreen()
  })

  bakedTexture.encoding = THREE.sRGBEncoding

  const LightMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
  const BottomMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 })

  const BakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
  bakedTexture.flipY = false

  const PortalMaterial = new THREE.ShaderMaterial({
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
      uniforms: {
          uTime: {value: 0}
      }
  })

  const controller = {}

  useFrame((state, delta) => {
      PortalMaterial.uniforms.uTime.value += delta
  })

  // const red = new THREE.MeshBasicMaterial({ color: "red" })
  // const geometry = new THREE.BoxGeometry(1,1,1)
  // const cube = new THREE.Mesh(geometry, red)
  return (
    <>
      <color args={ [ '#201919' ] } attach="background" />
      <OrbitControls makeDefault enableDamping={ true }
          dampingFactor= { 0.02 } />
      <mesh geometry={gltf.nodes.Base.geometry}
          material = {BakedMaterial}
          position = {gltf.nodes.Base.position}>
      </mesh>
      <mesh geometry={gltf.nodes.Lights.geometry}
          material = {LightMaterial} 
          position = {gltf.nodes.Lights.position}>
      </mesh>
      <mesh geometry={gltf.nodes.Bottom.geometry}
          material = {BottomMaterial} 
          position = {gltf.nodes.Bottom.position}>
      </mesh>
      <mesh geometry={gltf.nodes.PortalLight.geometry}
          material={PortalMaterial}
          position = {gltf.nodes.PortalLight.position}
          rotation = {gltf.nodes.PortalLight.rotation}>
      </mesh>
      <Snow call={controller} />
    </>
  )
}

export default App
