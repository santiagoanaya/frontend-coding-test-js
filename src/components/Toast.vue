<template>
  <div
    v-if="showToast"
    class="toast"
    :class="{
      'success-toast': toastType === 'success',
      'error-toast': toastType === 'error',
    }"
  >
    {{ toastMessage }}
  </div>
</template>

<script setup>
import { inject } from 'vue'

const { toastMessage, showToast, toastType } = inject('toast')
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}

.success-toast {
  background-color: green;
}

.error-toast {
  background-color: red;
}
</style>
