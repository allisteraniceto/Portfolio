import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.06}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.7}
      />
    </EffectComposer>
  )
}
