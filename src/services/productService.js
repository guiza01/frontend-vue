const API = import.meta.env.VITE_API_URL

async function handleResponse(res) {
  const text = await res.text()
  let data = null
  try { data = JSON.parse(text) } catch (e) { }
  if (!res.ok) {
    const msg = data && data.error && data.error.message ? data.error.message : res.statusText
    const err = new Error(msg)
    throw err
  }
  if (data && data.error) {
    if (data.error.message) {
      const err = new Error(data.error.message)
      throw err
    }
  }
  return data ? data.payload : null
}

export async function getProducts() {
  const res = await fetch(`${API}/api/products`)
  return await handleResponse(res)
}

export async function getProduct(id) {
  const res = await fetch(`${API}/api/products/${id}`)
  return await handleResponse(res)
}

export async function createProduct(payload) {
  const res = await fetch(`${API}/api/products`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  return await handleResponse(res)
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${API}/api/products/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  return await handleResponse(res)
}

export async function deleteProduct(id) {
  const res = await fetch(`${API}/api/products/${id}`, { method: 'DELETE' })
  return await handleResponse(res)
}

export default { getProducts, getProduct, createProduct }
