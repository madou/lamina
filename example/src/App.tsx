import React from 'react'
import { Canvas } from '@react-three/fiber'

import Rig from './components/Rig'
import Spheres from './components/Spheres'
import { Leva } from 'leva'
import TextMesh from './components/TextMesh'

export default function App() {
  return (
    <>
      <Leva collapsed titleBar={{ title: 'Layers' }} />

      <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
        <color attach="background" args={['#ebebeb']} />
        <Spheres />
        <Rig />

        <TextMesh />
      </Canvas>
    </>
  )
}
