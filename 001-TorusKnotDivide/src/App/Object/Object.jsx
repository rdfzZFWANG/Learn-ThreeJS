import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react';
import { onBeforeCompile, RemoveIndex } from './Util.js';

function Object({ color,
    geometry = new THREE.BoxGeometry(), 
    position = [0,0,0],
    children}) {
    RemoveIndex(geometry)
    const uTime = {value : 0}
    const CustomMaterial = new THREE.MeshPhysicalMaterial({
        side: THREE.DoubleSide
    })
    CustomMaterial.onBeforeCompile = onBeforeCompile(uTime)
    
    const DepthMaterial = new THREE.MeshDepthMaterial({
      side: THREE.DoubleSide,
      depthPacking: THREE.RGBADepthPacking
    })
    DepthMaterial.onBeforeCompile = onBeforeCompile(uTime)
      //onBeforeCompile(uTime)

    const Geometry = geometry
    // console.log(Geometry.index)
    // console.log(Geometry.getAttribute("normal"))
  
    const positionAtr = Geometry.getAttribute("position")
    const normalAtr = Geometry.getAttribute("normal")
    const faceCount = positionAtr.count
    const itemSize = positionAtr.itemSize
    const offArray = new Float32Array(faceCount * 3 * itemSize)
    const offAtr = new THREE.BufferAttribute(offArray, 3)
  
    for (let face = 0; face < faceCount; ++face) {
      let idx = face * 3
      const x = normalAtr.getX(idx + 1)
      const y = normalAtr.getY(idx + 1)
      const z = normalAtr.getZ(idx + 1)
      offAtr.setXYZ(idx + 0, x, y, z)
      offAtr.setXYZ(idx + 1, x, y, z)
      offAtr.setXYZ(idx + 2, x, y, z)

      positionAtr.setXYZ(idx, positionAtr.getX(idx) + x, positionAtr.getY(idx) + y, positionAtr.getZ(idx) + z)
      idx += 1
      positionAtr.setXYZ(idx, positionAtr.getX(idx) + x, positionAtr.getY(idx) + y, positionAtr.getZ(idx) + z)
      idx += 1
      positionAtr.setXYZ(idx, positionAtr.getX(idx) + x, positionAtr.getY(idx) + y, positionAtr.getZ(idx) + z)
      
    }
  
    Geometry.setAttribute("off", offAtr)
  
    const ref = useRef()
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime()
      if (ref.current) {
        ref.current.rotation.y = elapsedTime * 0.1
        ref.current.rotation.x = elapsedTime * 0.1
      }
      uTime.value = elapsedTime * 1.5
    })

    // const mesh = new THREE.Mesh(Geometry, CustomMaterial)
    // mesh.customDepthMaterial = DepthMaterial
  
    return (
      <mesh ref={ref} castShadow receiveShadow position={position} 
        customDepthMaterial={DepthMaterial}
        material={CustomMaterial} geometry={Geometry}
        >
      </mesh>
    )
  }

  export {Object}