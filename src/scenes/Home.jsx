import * as THREE from 'three'
import { A11y } from '@react-three/a11y'
import { useRef, useState, Suspense } from 'react'
import useStore from '@/helpers/store'
import Road from '@/entities/Road'
import Camera from '@/entities/Camera'
import BaseLights from '@/entities/BaseLights'
import Background from '@/entities/Background'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, SMAA } from '@react-three/postprocessing'
import { Color } from 'three'


const Home = (props) => {
  const router = useStore((state) => state.router)
  const { route } = props

  return (
    <>
      {/* <Suspense fallback={null}> */}
        <fog attach='fog' color={'#ff0000'} near={1} far={2000} />
        <Camera />
        <ambientLight intensity={0.75} color={0x000000} />
        <pointLight intensity={1} position={[10, 25, -10]} /> */}

        <Background color={0x000000} />
        <Road />
        <BaseLights speed={[6, 10]} colors={[0x000000, 0x000000, 0x000000]} />
        {/* <BaseLights speed={[-120, -80]} colors={[0x03d3C1, 0x0b1b15, 0x725372]} /> */}
        <EffectComposer>
          <DepthOfField
            focusDistance={0.0}
            focalLength={0.2}
            bokehScale={4}
            height={480}
          />
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.0}
            resolutionScale={1}
          />
          {/* <SMAA /> */}
          {/* <Noise opacity={0.2} /> */}
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      {/* </Suspense> */}
    </>
  )
}

export default Home
