import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { ACESFilmicToneMapping, LinearEncoding } from 'three'

import styles from './Canvas.module.scss'

const CustomCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  return (
    <div className={styles.Canvas}>
      <Canvas
        mode='concurrent'
        gl2
        background
        gl={{ antialias: true }}
        onCreated={({ gl, events }) => {
          gl.toneMapping = ACESFilmicToneMapping
          gl.outputEncoding = LinearEncoding
          events.connect(dom.current)
        }}
        onContextMenu={(e) => e.preventDefault()}
        updateDefaultCamera={false}
      >
        <A11yUserPreferences>
          <Preload all />
          {children}
        </A11yUserPreferences>
      </Canvas>
    </div>
  )
}

export default CustomCanvas
