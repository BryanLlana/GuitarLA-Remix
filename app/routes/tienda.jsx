import { useLoaderData } from '@remix-run/react'

import { obtenerGuitarras } from '~/models/guitarra.server'
import Guitarra from '../components/Guitarra'
import styles from '~/styles/guitarras.css'

export const meta = () => {
  return [
    {
      title: 'GuitarLA - Tienda de Guitarras'
    },
    {
      description: 'GuitarLA - Nuestra colección de guitarras'
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

export const loader = async () => {
  const guitarras = await obtenerGuitarras()
  return { guitarras }
}

const tienda = () => {
  const { guitarras } = useLoaderData()

  return (
    <div className='contenedor'>
      <h2 className='heading'>Nuestra Coleccion</h2>

      <div className='guitarras-grid'>
        { guitarras.length && guitarras.map(guitarra => (
          <Guitarra key={guitarra.id} guitarra={guitarra} />
        ))}
      </div>
    </div>
  )
}

export default tienda