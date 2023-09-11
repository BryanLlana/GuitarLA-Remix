import { Link, useLoaderData, useRouteError } from '@remix-run/react'

import { obtenerBlog } from "../models/blog.server"
import styles from '~/styles/blog.css'

//* Manejo de errores
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
        title: 'GuitarLa - Post no encontrado',
      },
      {
        description: 'Blog, post no encontrado'
      }
    ]
  }

  return [
    {
      title: `GuitarLA - ${data.post.nombre}`
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
  const post = await obtenerBlog(id)

  if (post == null) {
    throw new Response('', {
      status: 404,
      statusText: 'Post no encontrado'
    })
  }

  return { post }
}

const post = () => {
  const { post } = useLoaderData()

  const { nombre, descripcion, imagen } = post

  return (
    <article className='contenedor post mt-6'>
      <img src={`http://localhost:4000/uploads/blogs/${imagen}`} alt={`Imagen post ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
      </div>
    </article>
  )
}

export default post