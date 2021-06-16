import * as THREE from 'three'
import { A11y } from '@react-three/a11y'
import { useFrame, extend } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useRef, useState } from 'react'
import useStore from '@/helpers/store'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'glslify'

import turbulentDistortion from '@/distortion/Turbulent'

const vertex = glsl`
  uniform float uTime;
  uniform float uTravelLength;
  uniform vec4 uFreq;
  uniform vec4 uAmp;

  #pragma glslify: getDistortion = require('../distortion/Turbulent.glsl')

  void main() {
    vec3 transformed = position.xyz;
    float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;
    vec3 distortion = getDistortion(progress, uTime, uFreq, uAmp);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1. * distortion.z;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragment = glsl`
  uniform vec3 color;
  varying vec2 vUv;
  void main(){
      gl_FragColor.rgba = vec4(color, 1.0);
  }
`

const RoadMaterial = shaderMaterial(
  {
    side: THREE.DoubleSide,
    uTime: 0,
    color: new THREE.Color(0x101012),
    uTravelLength: 400,
    ...turbulentDistortion.uniforms,
  },
  vertex,
  fragment
)

extend({ RoadMaterial })

const roadWidth = 20
const roadLength = 400

const position = [0, 0, -roadLength / 2]
const rotation = [-Math.PI / 2, 0, 0]

const Road = (props) => {
  const mesh = useRef(false)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      frustumCulled={false}
    >
      <planeBufferGeometry
        attach='geometry'
        args={[roadWidth, roadLength, 20, 100]}
      />
      <roadMaterial attach='material' />
    </mesh>
  )
}

export default Road
