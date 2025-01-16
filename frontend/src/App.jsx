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
import Crear from './pages/Crear'
import Actualizar from './pages/Actualizar'
import Perfil from './pages/Perfil'
import { Confirmar } from './pages/Confirmar'
import Restablecer from './pages/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { TratamientosProvider } from './context/TrataminetosProvider'



function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
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
                <Route index element={<Perfil/>}/>
                <Route path='listar' element={<Listar/>}/>
                <Route path='visualizar/:id' element={<Visualizar/>}/>
                <Route path='crear' element={<Crear/>}/>
                <Route path='actualizar/:id' element={<Actualizar/>}/>
              </Route>
            </Routes>

          </PrivateRoute>
        
        }/>

        

      </Routes>
      </TratamientosProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
