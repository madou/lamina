import { Color, ColorRepresentation } from 'three'

export const SC_BLEND_MODES = {
  NORMAL: 1,
  ADD: 2,
  SUBTRACT: 3,
  MULTIPLY: 4,
  ADDSUB: 5,
  LIGHTEN: 6,
  DARKEN: 7,
  SWITCH: 8,
  DIVIDE: 9,
  OVERLAY: 10,
  SCREEN: 11,
  SOFTLIGHT: 12,
}

export type LayerBlendMode = keyof typeof SC_BLEND_MODES

export interface BaseLayerProps {
  color?: ColorRepresentation
  alpha?: number
  mode?: LayerBlendMode
}

export interface DepthLayerProps {
  colorA?: ColorRepresentation
  colorB?: ColorRepresentation
  alpha?: number
  mode?: LayerBlendMode
  near?: number
  far?: number
  origin?: number[]
  isVector?: boolean
}

export interface FresnelLayerProps {
  color?: ColorRepresentation
  alpha?: number
  mode?: LayerBlendMode
  intensity?: number
  scale?: number
  bias?: number
}

export interface NoiseLayerProps {
  color?: ColorRepresentation
  alpha?: number
  mode?: LayerBlendMode
  scale?: number
}
