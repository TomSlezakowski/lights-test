uniform vec4 uFreq;
uniform vec4 uAmp;

#define PI 3.14159265358979

float nsin(float val) {
  return sin(val) * 0.5 + 0.5;
}

float getDistortionX(float progress, float time, vec4 uFreq, vec4 uAmp) {
  return
    (
      cos( PI * progress * uFreq.r + time) * uAmp.r +
      pow(cos(PI * progress * uFreq.g + time * (uFreq.g / uFreq.r)),2. ) * uAmp.g
    );
}

float getDistortionY(float progress, float time, vec4 uFreq, vec4 uAmp) {
    return
    (
      -nsin( PI * progress * uFreq.b + time) * uAmp.b +
      -pow(nsin(PI * progress * uFreq.a + time / (uFreq.b / uFreq.a) ),5.) * uAmp.a
    );
}

vec3 getDistortion(float progress, float time, vec4 uFreq, vec4 uAmp) {
  return vec3(
    getDistortionX(progress, time, uFreq, uAmp) - getDistortionX(0.02, time, uFreq, uAmp) ,
    getDistortionY(progress, time, uFreq, uAmp) - getDistortionY(0.02, time, uFreq, uAmp),
    0.
  );
}


#pragma glslify: export(getDistortion)

