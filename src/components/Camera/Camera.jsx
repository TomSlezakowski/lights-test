import { useEffect, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three'
import turbulentDistortion from '@/distortion/Turbulent';

const fov = 45

const Camera = ({ children }) => {
  const [camera, setCamera] = useState()

  useFrame(({ clock }, delta) => {
    const distortion = turbulentDistortion.getJS(0.025, clock.elapsedTime)
    camera.lookAt(
      new Vector3(
        camera.position.x + distortion.x,
        camera.position.y + distortion.y,
        camera.position.z + distortion.z
      )
    )
    camera.updateProjectionMatrix()
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={setCamera}
        fov={fov}
        near={0.1}
        far={10000}
        position={[0, 8, -5]}
        target={[0, 0, 0]}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
      {/* {camera && <cameraHelper args={[camera]} />} */}
    </>
  )
}

export default Camera
