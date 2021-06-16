import { useMemo, useRef, useEffect } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import {
  InstancedBufferGeometry,
  TubeBufferGeometry,
  Color,
  LineCurve3,
  Vector2,
  Vector3,
  AdditiveBlending,
  NoBlending,
  NormalBlending,
  SubstractiveBlending,
  DoubleSide,
  UniformsLib
} from 'three'
import { random, randomFromArray } from '@/utils/Utils'
import glsl from 'glslify'
import turbulentDistortion from '@/distortion/Turbulent'

const vertex = glsl`
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  attribute vec2 aUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uTravelLength;
  uniform vec4 uFreq;
  uniform vec4 uAmp;
  uniform vec2 uFade;

  varying vec3 vColor;
  varying vec2 test;

  #include <fog_pars_vertex>

  #pragma glslify: getDistortion = require('../distortion/Turbulent.glsl')

  void main() {

    vec3 transformed = position.xyz;

    float radius = aMetrics.x;
    float len = aMetrics.y;
    float speed = aMetrics.z;

    transformed.xy *= radius;
    transformed.z *= len;

    transformed.z += len - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;

    float progress = abs(transformed.z / uTravelLength);
    vec3 distortion = getDistortion(progress, uTime, uFreq, uAmp);
    transformed.xyz += distortion;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;

    #include <fog_vertex>

    vColor = aColor;
    test = uv;
	}
`

const fragment = glsl`
  uniform vec2 uFade;

  varying vec3 vColor;
  varying vec2 test;

  struct PointLight {
    vec3 position;
    vec3 color;
  };
  uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

  #include <fog_pars_fragment>

  void main() {
    float fadeStart = 0.4;
    float maxFade = 0.;
    float alpha = 1.;
    alpha = smoothstep(uFade.x, uFade.y, test.x);
    gl_FragColor = vec4(vColor, alpha);

    #include <fog_fragment>

    if (gl_FragColor.a < 0.0001) discard;
  }
`

const LightMaterial = shaderMaterial(
  {
    uColor: new Color(0xff0000),
    uTravelLength: 400,
    uSpeed: 60,
    uTime: 0,
    uFade: new Vector2(0, 0.6),
    ...turbulentDistortion.uniforms,
    ...UniformsLib.lights,
    ...UniformsLib.fog,
  },
  vertex,
  fragment
)

extend({ LightMaterial })

const nPairs = 50
const roadWidth = 9
const roadSections = 3
const length = 400
const baseSpeed = [20, 80]
const baseRadius = [0.05, 0.14]
const lightWidthPercentage = [0.3, 0.5]
const carFloor = [0, 5]
const lightLengths = [400 * 0.15, 400 * 0.3]

const blendMode = NormalBlending

const BaseLights = ({ speed, colors }) => {
  const curve = new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, -1))
  const geometry = new TubeBufferGeometry(curve, 40, 1, 8, false)
  const instancedGeometry = new InstancedBufferGeometry().copy(geometry)
  instancedGeometry.maxInstancedCount = nPairs * 2

  Array.isArray(colors) &&
    colors.forEach((color, index) => {
      colors[index] = new Color(color)
    })

  let aOffset = []
  let aMetrics = []
  let aColor = []

  let sectionWidth = roadWidth / roadSections

  for (let i = 0; i < nPairs; i++) {
    let radius = random(baseRadius)
    let zLength = random(lightLengths)
    let section = i % 3
    let sectionX = section * sectionWidth - roadWidth / 2 + sectionWidth / 2
    let carWidth = random(lightWidthPercentage)

    let offsetX = 0.5 * Math.random()
    let offsetY = random(carFloor) + radius * 1.3
    let offsetZ = -random(length)

    let lightSpeed = random(speed)

    aOffset.push(sectionX - carWidth / 2 + offsetX)
    aOffset.push(offsetY)
    aOffset.push(-offsetZ)

    aOffset.push(sectionX + carWidth / 2 + offsetX)
    aOffset.push(offsetY)
    aOffset.push(-offsetZ)

    aMetrics.push(radius)
    aMetrics.push(zLength)
    aMetrics.push(lightSpeed)

    aMetrics.push(radius)
    aMetrics.push(zLength)
    aMetrics.push(lightSpeed)

    let color = randomFromArray(colors)
    aColor.push(color.r)
    aColor.push(color.g)
    aColor.push(color.b)

    aColor.push(color.r)
    aColor.push(color.g)
    aColor.push(color.b)
  }

  const mesh = useRef()

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh} frustumCulled={false} position={[-5, 0, 0]}>
      <instancedBufferGeometry
        isBufferGeometry={true}
        attach='geometry'
        index={instancedGeometry.index}
        attributes-position={instancedGeometry.attributes.position}
        attributes-uv={instancedGeometry.attributes.uv}
      >
        <instancedBufferAttribute
          attachObject={['attributes', 'aOffset']}
          args={[new Float32Array(aOffset), 3, false]}
        />
        <instancedBufferAttribute
          attachObject={['attributes', 'aMetrics']}
          args={[new Float32Array(aMetrics), 3, false]}
        />
        <instancedBufferAttribute
          attachObject={['attributes', 'aColor']}
          args={[new Float32Array(aColor), 3, false]}
        />
      </instancedBufferGeometry>
      <lightMaterial
        attach='material'
        blending={blendMode}
        color={0x000000}
        transparent={true}
        depthTest={true}
        //fog
        //lights
      />
    </mesh>
  )
}

export default BaseLights
