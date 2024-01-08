import { ref } from 'vue'

export function useToast() {
  const toastMessage = ref('')
  const showToast = ref(false)
  const toastType = ref('')

  function triggerToast(message, type = 'success') {
    toastMessage.value = message
    showToast.value = true
    toastType.value = type
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }

  return { toastMessage, toastType, showToast, triggerToast }
}
