export const obtenerBlogs = async () => {
  const resultado = await fetch('http://localhost:4000/api/blogs')
  const data = await resultado.json()
  return data
} 

export const obtenerBlog = async id => {
  const resultado = await fetch(`http://localhost:4000/api/blogs/${id}`)
  const data = await resultado.json()

  return data
}