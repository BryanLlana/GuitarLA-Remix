import { useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils'

import stylesCarrito from '~/styles/carrito.css'
import Alerta from '../components/Alerta'

export const meta = () => {
  return [
    {
      title: 'GuitarLA - Carrito de Compras'
    }
  ]
}

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesCarrito
    }
  ]
}

const carrito = () => {
  const { alerta, carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalActualizado = carrito.reduce((total, guitarra) => total + guitarra.cantidad * guitarra.precio, 0)
    setTotal(totalActualizado)
  }, [carrito])

  return (
    <ClientOnly fallback='...cargando'>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>

          {alerta.mensaje && <Alerta alerta={alerta} />}

          <div className="contenido">
            <div className="carrito">
              <h2>Productos</h2>

              {carrito.length > 0 ?
                carrito.map(guitarra => (
                  <div key={guitarra.id} className='producto'>
                    <div>
                      <img src={`http://localhost:4000/uploads/guitarras/${guitarra.imagen}`} alt={`Imagen guitarra ${guitarra.nombre}`} />
                    </div>
                    <div>
                      <p className='nombre'>{guitarra.nombre}</p>
                      <p className='cantidad'>Cantidad: </p>
                      <select value={guitarra.cantidad} className='select' onChange={e => actualizarCantidad({
                        cantidad: parseInt(e.target.value),
                        id: guitarra.id
                      })}>
                        <option value="" selected disabled>--Seleccione--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <p className='precio'>$ <span>{guitarra.precio}</span></p>
                      <p className='subtotal'>Subtotal: $ <span>{guitarra.precio * guitarra.cantidad}</span></p>
                    </div>

                    <button
                      type='button'
                      className='btn-eliminar'
                      onClick={() => eliminarGuitarra(guitarra.id)}
                    >X
                    </button>
                  </div>
                )) : (
                  <p>No hay productos</p>
                )}
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: $ {total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  )
}

export default carrito