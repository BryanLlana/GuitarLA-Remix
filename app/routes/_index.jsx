import { obtenerGuitarras } from '~/models/guitarra.server'
import { obtenerBlogs } from '../models/blog.server'

import { useLoaderData } from '@remix-run/react'
import Guitarra from '../components/Guitarra'
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'
import Post from '../components/Post'
import Imagen from '../../public/img/cursos_bg.jpg'

export const meta = () => {
  return [
    {
      title: 'GuitarLA - Home'
    }
  ]
}

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export const loader = async () => {
  const [guitarras, posts] = await Promise.all([obtenerGuitarras(), obtenerBlogs()])
  return {
    guitarras,
    posts
  }
}

const index = () => {
  const { guitarras, posts } = useLoaderData()
  return (
    <>
      <main className='contenedor'>
        <h2 className='heading'>Nuestra Coleccion</h2>

        <div className='guitarras-grid'>
          {guitarras.length && guitarras.map(guitarra => (
            <Guitarra key={guitarra.id} guitarra={guitarra} />
          ))}
        </div>
      </main>

      <section className='curso'>
        <div className="contenido curso-grid contenedor">
          <div className="contenido">
            <h2 className='heading'>Cursos con hasta 30% de descuento</h2>
            <p className='texto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis nostrum facere a harum molestias nobis cum aliquam minus natus, nisi incidunt aliquid, magni sunt voluptatibus, eum sint eveniet ipsa amet?</p>
          </div>
        </div>
      </section>

      <section className='contenedor'>
        <div className="heading">Blog</div>

        <div className="blog">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}

export default index