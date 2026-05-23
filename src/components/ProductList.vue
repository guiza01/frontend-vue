<template>
  <div class="container-card">
    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="alert error">Erro: {{ error }}</div>
    <div v-else class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td>{{ p.name }}</td>
            <td>{{ p.description }}</td>
            <td>{{ p.price }}</td>
            <td>{{ p.stock }}</td>
            <td class="actions">
              <button class="secondary" @click="$emit('show', p.id)">Detalhes</button>
              <button class="secondary" @click="$emit('edit', p)">Editar</button>
              <button class="danger" @click="$emit('delete', p.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getProducts } from '../services/productService'

export default {
  data() { return { products: [], loading: false, error: null } },
  async mounted() {
    this.loading = true
    try {
      this.products = await getProducts()
    } catch (e) {
      this.error = e.message || 'Erro ao carregar produtos'
    } finally {
      this.loading = false
    }
  }
}
</script>
