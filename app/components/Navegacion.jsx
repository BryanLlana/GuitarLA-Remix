import { Link, useLocation } from "@remix-run/react"

import Carrito from '../../public/img/carrito.png'

const Navegacion = () => {
  const location = useLocation()
  
  return (
    <nav className="navegacion">
      <Link
        to='/'
        className={location.pathname === '/' ? 'active' : ''}
      >Inicio
      </Link>
      <Link
        to='/nosotros'
        className={location.pathname === '/nosotros' ? 'active' : ''}
      >Nosotros
      </Link>
      <Link
        to='/blog'
        className={location.pathname === '/blog' ? 'active' : ''}
      >Blog
      </Link>
      <Link
        to='/tienda'
        className={location.pathname === '/tienda' ? 'active' : ''}
      >Tienda
      </Link>
      <Link
        to='/carrito'
      >
        <img src={Carrito} className="carrito" alt="Carrito de compras"/>
      </Link>
    </nav>
  )
}

export default Navegacion