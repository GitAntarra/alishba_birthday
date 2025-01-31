"use client"

import { useState, useEffect } from 'react'
import Invitation from './components/Invitation'
 
export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return <div>{isClient ? <Invitation /> : 'Prerendered'}</div>
}