import { Link } from "@remix-run/react"

const Guitarra = ({ guitarra }) => {
  const { id, nombre, descripcion, precio, imagen } = guitarra

  return (
    <div className="guitarra">
      <img src={`http://localhost:4000/uploads/guitarras/${imagen}`} alt={`Imagen guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">$ {precio}</p>

        <Link
          to={`/guitarra/${id}`}
          className="enlace"
        >Ver Producto
        </Link>
      </div>
    </div>
  )
}

export default Guitarra