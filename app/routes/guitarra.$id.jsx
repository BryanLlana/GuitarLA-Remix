import { Link, useLoaderData, useRouteError, useOutletContext, useNavigate } from '@remix-run/react'
import { useState } from 'react'

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
  const [cantidad, setCantidad] = useState(0)
  const { agregarCarrito, mostrarAlerta } = useOutletContext()
  const navigate = useNavigate()

  const { nombre, descripcion, precio, imagen, id } = guitarra

  const handledSubmit = e => {
    e.preventDefault()

    if (cantidad < 1) {
      alert('Debes seleccionar una cantidad')
      return
    }

    const guitarraSeleccionada = {
      id,
      imagen,
      nombre,
      precio,
      cantidad
    }
    agregarCarrito(guitarraSeleccionada)
    mostrarAlerta({
      mensaje: 'Producto agregado correctamente',
      error: false
    })
    navigate('/carrito')
  }

  return (
    <main className='contenedor guitarra'>
      <img src={`http://localhost:4000/uploads/guitarras/${imagen}`} alt={`Imagen guitarra ${imagen}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className='texto'>{descripcion}</p>
        <p className='precio'>$ {precio}</p>

        <form onSubmit={handledSubmit} className='formulario'>
          <label htmlFor="cantidad">Cantidad</label>
          <select id='cantidad' onChange={e => setCantidad(parseInt(e.target.value))}>
            <option value="" selected disabled>--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input
            type="submit"
            value='Agregar al Carrito'
          />
        </form>
      </div>
    </main>
  )
}

export default guitarra