<template>
  <div class="container-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <button class="secondary" @click="$emit('back')">Voltar</button>
      <div class="actions">
        <button class="secondary" @click="$emit('edit', product)">Editar</button>
        <button class="danger" @click="$emit('delete', product.id)">Excluir</button>
      </div>
    </div>
    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="alert error">Erro: {{ error }}</div>
    <div v-else-if="product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Preço: {{ product.price }}</p>
      <p>Estoque: {{ product.stock }}</p>
    </div>
  </div>
</template>

<script>
import { getProduct } from '../services/productService'

export default {
  props: { id: { type: Number, required: true } },
  data() { return { product: null, loading: false, error: null } },
  async mounted() {
    this.loading = true
    try {
      this.product = await getProduct(this.id)
    } catch (e) {
      this.error = e.message || 'Erro ao buscar produto'
    } finally {
      this.loading = false
    }
  }
}
</script>
