import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

import snowVertexShader from './snowVertexShader.glsl'
import snowFragmentShader from './snowFragmentShader.glsl'

export default function Snow({ call }) {
    const snowCount = 3000
    const positionArray = new Float32Array(snowCount * 3)
    const surfaceArray = new Float32Array(snowCount)
    const speedArray = new Float32Array(snowCount)

    const snowGeometry = new THREE.BufferGeometry()
    const snowMaterial = new THREE.ShaderMaterial({
        blending: THREE.AdditiveBlending,
        //depthWrite: false,
        transparent: true,
        vertexShader: snowVertexShader,
        fragmentShader: snowFragmentShader,
        uniforms: {
            uTime: {value: 0},
            uPixelRatio: {value: 1}
        }
    })

    const cord = new THREE.Vector3(0, 0, 0)
    const down = new THREE.Vector3(0, -1, 0)
    const raycaster = useMemo(() => new THREE.Raycaster(cord, down), [])
    const { scene, invalidate } = useThree()

    for(let i = 0; i < snowCount; i++) {
        positionArray[i * 3 + 0] = -2 + Math.random() * 4
        positionArray[i * 3 + 1] =  Math.random() * 4
        positionArray[i * 3 + 2] = - 2 + Math.random() * 4

        speedArray[i] = 0.1 + Math.random() * 0.3
    }

    const surfaceAttribute = new THREE.BufferAttribute(surfaceArray, 1)

    const toCall = () => {
        const surface = scene.children[0]
        for(let i = 0; i < snowCount; i++) {
            cord.fromArray(positionArray, i * 3)
            raycaster.set(cord, down)

            let distance = 0
            const inter = raycaster.intersectObject(surface)[0]
            
            if (inter) {
                distance = cord.y - inter.distance
            }
            
            surfaceArray[i] = distance
            //console.log(surfaceArray[i])
            // console.log(surfaceArray[i])
        }
        surfaceAttribute.needsUpdate = true
        snowGeometry.needsUpdate = true
        invalidate()
    }
    
    useEffect(() => {
        toCall()
    }, [call])

    useFrame((state, delta) => {
        snowMaterial.uniforms.uTime.value += delta
    })

    

    snowGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    snowGeometry.setAttribute('aSurface', surfaceAttribute)
    snowGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(speedArray, 1))

    return (
    <points geometry={snowGeometry}
        material={snowMaterial}>
    </points>
    )
}