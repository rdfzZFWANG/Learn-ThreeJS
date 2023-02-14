import * as React from 'react'
import { useProgress } from '@react-three/drei'
import './Loader.css'


export default function Loader() {
  const { active, progress } = useProgress()

  return (
    <div className="loader">
      <span>
        Loading: {Math.floor(progress)}%
      </span>
    </div>
    )
}