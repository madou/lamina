import { ShaderMaterial, ShaderMaterialParameters } from 'three'
import AbstractLayer from './core/AbstractLayer'

import BaseLayer from './core/BaseLayer'
import DepthLayer from './core/DepthLayer'
import FresnelLayer from './core/FresnelLayer'
import NoiseLayer from './core/NoiseLayer'

import HelperChunk from './core/ShaderChunks/Helpers'
import BlendModesChunk from './core/ShaderChunks/BlendModes'
import RandChunk from './core/ShaderChunks/Rand'

interface LayerMaterialProps {
  layers?: AbstractLayer[]
}

class LayerMaterial extends ShaderMaterial {
  constructor(props: ShaderMaterialParameters & LayerMaterialProps) {
    // TODO: spoof an individual fragment a little better than this ...
    super({ transparent: true, fragmentShader: AbstractLayer.genID(), ...props })

    this.onBeforeCompile = (shader) => {
      // @ts-ignore
      const layers: AbstractLayer[] = props?.layers || this.__r3f.objects

      const variables = {
        vert: '',
        frag: '',
      }
      const body = {
        vert: '',
        frag: '',
      }
      layers.forEach((layer: AbstractLayer) => {
        variables.frag += layer.getFragmentVariables() + ' \n'
        variables.vert += layer.getVertexVariables() + ' \n'

        Object.keys(layer.uniforms).forEach((key) => {
          shader.uniforms[key] = layer.uniforms[key]
        })

        body.frag += layer.getFragmentBody('sc_finalColor') + ' \n'
        body.vert += layer.getVertexBody('') + ' \n'
      })

      shader.vertexShader = `
      ${variables.vert}
      void main() {
        ${body.vert}

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }
      `

      shader.fragmentShader = `
      ${HelperChunk}
      ${RandChunk}
      ${BlendModesChunk}
      ${variables.frag}
      void main() {
        vec4 sc_finalColor = vec4(0.);
        ${body.frag}
        gl_FragColor = sc_finalColor;

        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }
      `

      this.uniformsNeedUpdate = true
      this.needsUpdate = true
    }
  }
}

export { AbstractLayer, LayerMaterial, BaseLayer, DepthLayer, FresnelLayer, NoiseLayer }
