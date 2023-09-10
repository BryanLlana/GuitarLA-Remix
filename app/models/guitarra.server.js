export const obtenerGuitarras = async () => {
  const resultado = await fetch('http://localhost:4000/guitarras')
  const data = await resultado.json()
  return data
}