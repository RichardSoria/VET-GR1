import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './pages/Login'
import { LandinPage } from './pages/LandinPage'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './pages/Listar'
import Visualizar from './pages/Visualizar'
import GestionarCorredor from './pages/GestionarCorredor'
import Actualizar from './pages/Actualizar'
import GestionarAdministrador from './pages/GestionarAdministrador'
import { Confirmar } from './pages/Confirmar'
import Restablecer from './pages/Restablecer'
import { AdministradorProvider } from './context/AdministradorProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { TratamientosProvider } from './context/TrataminetosProvider'



function App() {
  return (
    <>
    <BrowserRouter>
      <AdministradorProvider>
      <TratamientosProvider>
      <Routes>
        <Route index element={<LandinPage/>}/>
        <Route path='/' element={<Auth/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='forgot/:id' element={<Forgot/>}/>
          <Route path='confirmar/:token' element={<Confirmar/>}/>
          <Route path='recuperar-password/:token' element={<Restablecer/>}/>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='dashboard/*' element={
          <PrivateRoute>
            <Routes>
              <Route element={<Dashboard/>}>
                <Route index element={<GestionarAdministrador/>}/>
                <Route path='listar' element={<Listar/>}/>
                <Route path='visualizar/:id' element={<Visualizar/>}/>
                <Route path='gestionar-corredor' element={<GestionarCorredor/>}/>
                <Route path='actualizar/:id' element={<Actualizar/>}/>
              </Route>
            </Routes>
          </PrivateRoute> 
        }/>
      </Routes>
      </TratamientosProvider>
      </AdministradorProvider>
    </BrowserRouter>
    </>
  )
}

export default App
