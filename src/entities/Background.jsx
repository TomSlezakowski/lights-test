import { a } from '@react-spring/three'
import { useThree } from '@react-three/fiber'
import { Color } from 'three'

const Background = ({ color }) => {
  const { viewport } = useThree()

  return (
    <mesh
      scale={[viewport.width * 10, viewport.height * 10, 1]}
      position={[0, 0, -10]}
      rotateX={-Math.PI / 2}
    >
      <planeGeometry attach='geometry' args={[1, 1]} />
      <a.meshBasicMaterial
        attach='material'
        color={new Color(color)}
        depthTest={false}
      />
    </mesh>
  )
}

export default Background
