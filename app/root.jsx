import { Meta, Links, Outlet, Scripts, LiveReload, useRouteError, Link } from '@remix-run/react'
import { useEffect, useState } from 'react'

import styles from '~/styles/style.css'
import Header from '~/components/header'
import Footer from './components/Footer'

export const meta = () => {
  return (
    [
      { charset: 'utf-8' },
      { title: 'GuitarLA' },
      { viewport: 'width=device-width,initial-scale=1' }
    ]
  )
}

export const links = () => {
  return (
    [
      {
        rel: 'stylesheet',
        href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'true'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
      },
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
  )
}

const App = () => {
  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : []
  const [carrito, setCarrito] = useState(carritoLS)
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito]) 

  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      const carritoActualizado = carrito.map(guitarraState => guitarraState.id === guitarra.id ? guitarra : guitarraState)
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, guitarra])
    }
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }

  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    }, 1500)
  }

  return (
    <Document>
      <Outlet
        context={{
          carrito,
          agregarCarrito,
          alerta, 
          mostrarAlerta,
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>
  ) 
}

export default App

const Document = ({children}) => {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

//* Manejo de errores
export const ErrorBoundary = () => {
  const error = useRouteError()
  
  return (
    <Document>
      <p className='error'>{error.status} {error.statusText}</p>
      <Link
        to={'/'}
        className='error-enlace'
      >Volver a la página principal
      </Link>
    </Document>
  )
}