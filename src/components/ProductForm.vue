<template>
  <div class="container-card">
    <h2>{{ mode === 'edit' ? 'Editar Produto' : 'Criar Produto' }}</h2>
    <div v-if="errorMsg" class="alert error">Erro: {{ errorMsg }}</div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div>
          <label>Nome</label>
          <input v-model="form.name" />
        </div>
        <div>
          <label>Preço</label>
          <input type="number" step="0.01" v-model.number="form.price" />
        </div>
      </div>
      <div class="form-row">
        <div>
          <label>Descrição</label>
          <input v-model="form.description" />
        </div>
        <div>
          <label>Estoque</label>
          <input type="number" v-model.number="form.stock" />
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button type="submit" class="success">{{ mode === 'edit' ? 'Salvar' : 'Criar' }}</button>
        <button type="button" class="secondary" v-if="mode === 'edit'" @click="$emit('cancel')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createProduct, updateProduct } from '../services/productService'

export default {
  props: { initial: { type: Object, default: null } },
  data() {
    return { form: { name: '', description: '', price: 0, stock: 0 }, errorMsg: null }
  },
  computed: {
    mode() { return this.initial ? 'edit' : 'create' }
  },
  mounted() {
    if (this.initial) {
      this.form = { ...this.initial }
    }
  },
  methods: {
    async submit() {
      this.errorMsg = null
      try {
        if (this.mode === 'edit') {
          await updateProduct(this.form.id, this.form)
          this.$emit('updated')
        } else {
          await createProduct(this.form)
          this.$emit('created')
        }
      } catch (e) {
        this.errorMsg = e.message || (this.mode === 'edit' ? 'Erro ao salvar' : 'Erro ao criar')
      }
    }
  }
}
</script>
