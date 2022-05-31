import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import { useContext } from 'react'
import AppLevelContext from './context/AppLevelContext'
import Loading from './components/Loading'

function App() {
  const { loading } = useContext(AppLevelContext)

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/users/:id" element={<Profile />} />
        </Routes>
        <MusicPlayer />
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
