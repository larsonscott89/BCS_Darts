import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import Header from './Header'
import Home from './Home'
import Leagues from './Leagues'
import Teams from './Teams'
import Signup from './Signup'
import Players from './Players'
import Scoresheet from './Scoresheet'

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
        <Route path='/teamsignups' element={<Signup/>}/>
        <Route path='/players' element={<Players/>}/>
        <Route path='/Scoresheets' element={<Scoresheet/>}/>
      </Routes>
    </div>
  )
}