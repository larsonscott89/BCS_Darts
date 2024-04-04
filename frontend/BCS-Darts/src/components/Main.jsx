import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import Header from './Header'
import Home from './Home'
import Leagues from './Leagues'
import Teams from './Teams'

export default function Main () {
  const [leagues, setLeagues] = useState([])

  return(
    <div>
      <div>
        <Header
          setLeagues={setLeagues}
        />
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/leagues' element={<Leagues/>}/>
        <Route path='/teams' element={<Teams/>}/>
      </Routes>
    </div>
  )
}