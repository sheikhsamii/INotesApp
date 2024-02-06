import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const state = useContext(noteContext) 
  return (
    <div>This is About Mr. {state.name}</div>
  )
}

export default About