import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'

export default function Main () {
  return(
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}