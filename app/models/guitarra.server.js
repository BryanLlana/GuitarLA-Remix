export const obtenerGuitarras = async () => {
  const resultado = await fetch('http://localhost:4000/api/guitarras')
  const data = await resultado.json()
  return data
}

export const obtenerGuitarra = async id => {
  const resultado = await fetch(`http://localhost:4000/api/guitarras/${id}`)
  const data = await resultado.json()
  return data
}