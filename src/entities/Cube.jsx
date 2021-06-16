import * as THREE from 'three'
import { A11y } from '@react-three/a11y'
import { useFrame, extend } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useRef, useState } from 'react'
import useStore from '@/helpers/store'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'glslify'

import vertex from '@/examples/canvas/glsl/shader.vert'

const fragment = glsl`
  uniform vec3 color;
  varying vec2 vUv;
  void main(){
      gl_FragColor.rgba = vec4(color, 1.0);
  }
`

const CubeMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0xff0000),
  },
  vertex,
  fragment
)

extend({ CubeMaterial })

const roadWidth = 20
const roadLength = 400

const position = [0, -5, 20]
const rotation = [0, Math.PI / 4, 0]

const Road = (props) => {
  return (
    <mesh
      position={position}
      rotation={rotation}
      frustumCulled={false}
    >
      <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
      <cubeMaterial attach='material' />
    </mesh>
  )
}

export default Road
