<template>
  <button
    @click="$emit('click')"
    type="button"
    class="custom-btn"
    :class="{ 'custom-btn--flat': type === 'flat' }">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "CustomButton",
    props: {
      type: {
        type: String,
        required: false
      }
    }
  }
</script>

<style scoped>
  .custom-btn {
    height: 37px;
    background: #1b7696;
    border-radius: 3px;
    color: white;
    padding: 0 20px;
    cursor: pointer;
    border: 1px solid #1b7696;
  }

  .custom-btn--flat {
    background: white;
    color: black;
  }
</style>
