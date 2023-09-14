const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'red' : 'green'} alerta`}>{alerta.mensaje}</div>
  )
}

export default Alerta