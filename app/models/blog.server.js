export const obtenerBlogs = async () => {
  const resultado = await fetch('http://localhost:4000/api/blogs')
  const data = await resultado.json()
  return data
} 