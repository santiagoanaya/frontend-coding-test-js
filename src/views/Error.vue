<template>
  <div>
    <h1>{{ `Error - ${statusCode}` }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: 'Error'
    },
    message: {
      type: String,
      default: "An error occurred."
    },
    statusCode: {
      type: Number,
      default: 404
    }
  });
</script>
