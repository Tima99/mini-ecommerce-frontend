import './App.css'
import { Routes, Route } from 'react-router-dom'
import { EntryPage, HomePage } from './pages'
import { LoginFeature, SignupFeature, VerifyEmailFeature } from './features'
import { CartOutlet, ProductsOutlet } from './outlets'

function App() {

  return (
    <Routes>
       <Route path='/' element={<EntryPage />}>
          <Route index element={<SignupFeature />}/>
          <Route path='/login' element={<LoginFeature />}/>
          <Route path='/:email/verifyEmail' element={<VerifyEmailFeature />}/>
       </Route>

       <Route path='/home' element={<HomePage />}>
          <Route index element={<ProductsOutlet />}></Route>
          <Route path={'/home/cart'} element={<CartOutlet />}></Route>
       </Route>
    </Routes>
  )
}

export default App
