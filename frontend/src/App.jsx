import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './pages/Login'
import { LandinPage } from './pages/LandinPage'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'

import VisualizarAdministrador from './pages/VisualizarAdministrador'
import VisualizarCorredor from './pages/VisualizarCorredor'
import GestionarCorredor from './pages/GestionarCorredor'
import GestionarAdministrador from './pages/GestionarAdministrador'
import { AdministradorProvider } from './context/AdministradorProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { ParadasProvider } from './context/ParadaProvider'
import { CorredorProvider } from './context/CorredorProvider'



function App() {
  return (
    <>
      <BrowserRouter>
        <AdministradorProvider>
          <CorredorProvider>
            <ParadasProvider>
              <Routes>
                <Route index element={<LandinPage />} />
                <Route path='/' element={<Auth />}>
                  <Route path='login' element={<Login />} />
                  <Route path='*' element={<NotFound />} />
                </Route>
                <Route path='dashboard/*' element={
                  <PrivateRoute>
                    <Routes>
                      <Route element={<Dashboard />}>
                        <Route index element={<GestionarAdministrador />} />
                        <Route path='visualizar/:id' element={<VisualizarAdministrador />} />
                        <Route path='gestionar-corredor' element={<GestionarCorredor />} />
                        <Route path='corredor/:id' element={<VisualizarCorredor />} />
                      </Route>
                    </Routes>
                  </PrivateRoute>
                } />
              </Routes>
            </ParadasProvider>
          </CorredorProvider>
        </AdministradorProvider>
      </BrowserRouter>
    </>
  )
}

export default App
