
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing, Login, Register, Post, InsertPost , EditPost} from './pages'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/post/:id" element={<Post />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/insert" element={<InsertPost />}/>
        <Route path="/edit/:id" element={<EditPost />}/>
        <Route path="*" element={<div>Error</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
