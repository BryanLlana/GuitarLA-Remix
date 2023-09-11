import { Link, useLoaderData, useRouteError } from '@remix-run/react'

import styles from '~/styles/guitarras.css'
import { obtenerGuitarra } from '../models/guitarra.server'

export const ErrorBoundary = () => {
  const error = useRouteError()
  
  return (
    <>
      <p className='error'>{error.status} {error.statusText}</p>
      <Link
        to={'/'}
        className='error-enlace'
      >Volver a la página principal
      </Link>
    </>
  )
}

export const meta = ({ data }) => {
  if (!data) {
    return [
      {
        title: 'GuitarLa - Guitarra no encontrada',
      },
      {
        description: 'Guitarras, venta de guitarras, guitarra no encontrada'
      }
    ]
  }

  return [
    {
      title: `GuitarLA - ${data.guitarra.nombre}`
    },
    {
      description: `Guitarras, venta de guitarras, guitarra ${data.guitarra.nombre}`
    }
  ]
}

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export const loader = async ({ params }) => {
  const { id } = params
  const guitarra = await obtenerGuitarra(id)

  if (guitarra == null) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }

  return { guitarra }
}

const guitarra = () => {
  const { guitarra } = useLoaderData()

  const { nombre, descripcion, precio, imagen } = guitarra

  return (
    <main className='contenedor guitarra'>
      <img src={`http://localhost:4000/uploads/guitarras/${imagen}`} alt={`Imagen guitarra ${imagen}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>$ {precio}</p>
      </div>
    </main>
  )
}

export default guitarra