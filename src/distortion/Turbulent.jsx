import { Vector3, Vector4, Uniform } from 'three'

const turbulentUniforms = {
  // x,x, y,y
  uFreq: new Vector4(4, 8, 8, 1),
  uAmp: new Vector4(25, 2, 4, 10),
}

const turbulentDistortion = {
  uniforms: turbulentUniforms,
  getJS: (progress, time) => {
    let nsin = (val) => Math.sin(val) * 0.5 + 0.5

    const uFreq = turbulentUniforms.uFreq
    const uAmp = turbulentUniforms.uAmp

    const getX = (p) =>
      Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
      Math.pow(
        Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)),
        2
      ) *
        uAmp.y

    const getY = (p) =>
      -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
      Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) *
        uAmp.w

    let distortion = new Vector3(
      getX(progress) - getX(progress + 0.007),
      getY(progress) - getY(progress + 0.007),
      0
    )
    let lookAtAmp = new Vector3(-2, -5, 8)
    let lookAtOffset = new Vector3(0, -1.4, -10)
    return distortion.multiply(lookAtAmp).add(lookAtOffset)
  },
}

export default turbulentDistortion
