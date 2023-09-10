import { useLoaderData } from '@remix-run/react'

import { obtenerBlogs } from "../models/blog.server"
import Post from '../components/Post'
import styles from '~/styles/blog.css'

export const meta = () => {
  return [
    {
      title: 'GuitarLA - Blog'
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
  const blogs = await obtenerBlogs()
  return { blogs }
}

const blog = () => {
  const { blogs: posts } = useLoaderData()

  return (
    <div className="contenedor">
      <div className="heading">Blog</div>

      <div className="blog">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default blog