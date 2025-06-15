import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import { Root } from './routes/authenticated/Root.tsx'
import { Home } from './routes/authenticated/Home.tsx'
import { About, loader as aboutLoader } from './routes/authenticated/About.tsx'
import { SignIn } from './routes/unauthenticated/SignIn.tsx'
import { SignUp } from './routes/unauthenticated/SignUp.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* <Route index element={<Landing />} /> */}
    <Route index element={<SignIn />} loader={aboutLoader} />
    <Route path="signup" element={<SignUp />} loader={aboutLoader} />
    <Route path="/app" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} loader={aboutLoader} />
    </Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
