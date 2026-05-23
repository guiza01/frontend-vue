<template>
  <div class="app">
    <header>
      <h1>Produtos</h1>
      <div class="controls">
        <button class="secondary" @click="view='list'">Listar</button>
        <button class="primary" @click="openCreate">Criar</button>
      </div>
    </header>
    <hr />
    <ProductList :key="listKey" v-if="view==='list'" @show="openDetails" @edit="openEdit" @delete="onDelete" />
    <ProductForm v-if="view==='create'" @created="onCreated" />
    <ProductForm v-if="view==='edit'" :initial="editingProduct" @updated="onUpdated" @cancel="view='list'" />
    <ProductDetails v-if="view==='details'" :id="selectedId" @back="view='list'" @edit="openEdit" @delete="onDelete" />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import ProductDetails from './components/ProductDetails.vue'

export default {
  components: { ProductList, ProductForm, ProductDetails },
  data() {
    return { view: 'list', selectedId: null, editingProduct: null, listKey: 0 }
  },
  methods: {
    openDetails(id) {
      this.selectedId = id
      this.view = 'details'
    },
    openCreate() {
      this.view = 'create'
      this.editingProduct = null
    },
    openEdit(product) {
      this.editingProduct = product
      this.view = 'edit'
    },
    onCreated() {
      this.view = 'list'
      this.listKey += 1
    },
    async onDelete(id) {
      const service = await import('./services/productService')
      try {
        await service.deleteProduct(id)
        this.view = 'list'
        this.listKey += 1
      } catch (e) {
        alert(e.message || 'Erro ao excluir')
      }
    },
    onUpdated() {
      this.view = 'list'
      this.listKey += 1
    }
  }
}
</script>
