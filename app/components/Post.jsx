import { Link } from "@remix-run/react"

const Post = ({ post }) => {
  const { nombre, descripcion, imagen, id } = post

  return (
    <article className="post">
      <img src={`http://localhost:4000/uploads/blogs/${imagen}`} alt={`Imagen post ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <Link
          to={`/post/${id}`}
          className="enlace"
        >Leer Post
        </Link>
      </div>
    </article>
  )
}

export default Post