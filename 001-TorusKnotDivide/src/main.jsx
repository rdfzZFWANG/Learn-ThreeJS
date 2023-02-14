import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'
import { Perf } from 'r3f-perf'
import React from 'react'

import Overlay from './Overlay/Overlay'
import App from './App/App'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas shadows={true} dpr={[1,2]} camera={{position: [0,3,3]}}>
      <App />
      { (window.location.hash == "#perf") && <Perf position={"top"} /> }
    </Canvas>
    <Overlay />
  </React.StrictMode>,
)