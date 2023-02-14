
import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'
import { Perf } from 'r3f-perf'
import React from 'react'

import Overlay from './Overlay/Overlay' 
import Loader from './Loader/Loader'
import App from './App/App'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Loader />
      <Overlay />
      <Canvas
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, 4, 6 ]
        }}>
        <React.Suspense>
          <App />
        </React.Suspense>
        { (window.location.hash == "#perf") && <Perf position={"top"} /> }
      </Canvas>
  </React.StrictMode>,
)
