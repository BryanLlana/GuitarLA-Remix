import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export const meta = () => {
  return [
    {
      title: 'GuitarLA - Nosotros'
    }, 
    {
      description: 'Venta de guitarras, sobre nosotros'
    }
  ]
}

const nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="Imagen Nosotros" />

        <div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus in aliquid dolor, doloremque sequi omnis quasi excepturi asperiores id aperiam eaque consequuntur? Est quam distinctio, voluptatem ex suscipit aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus cupiditate nulla minima mollitia aliquam quod temporibus recusandae inventore? Omnis exercitationem atque magni commodi eveniet quos dolore officia cupiditate ipsam?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis molestiae ipsum voluptatum architecto hic deleniti accusantium mollitia iure laborum dolore cupiditate culpa, dicta consequuntur quos, enim, ab delectus? Deleniti, consectetur.</p>
        </div>
      </div>
    </main>
  )
}

export default nosotros