export const obtenerGuitarras = async () => {
  const resultado = await fetch('http://localhost:4000/guitarras')
  const data = await resultado.json()
  return data
}

export const obtenerGuitarra = async id => {
  const resultado = await fetch(`http://localhost:4000/guitarras/${id}`)
  const data = await resultado.json()
  return data
}