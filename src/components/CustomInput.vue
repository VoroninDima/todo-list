<template>
  <div class="input-wrapper" :class="{ 'input-wrapper--edit-page': isEditPage }">
    <label class="custom-label" :for="id" v-if="label">{{ label }}</label>
    <input
      class="custom-input"
      :class="{ 'custom-input--error': error }"
      :id="id"
      type="text"
      :value="value"
      @input="handleInput">
  </div>
</template>

<script>
  export default {
    name: "CustomInput",
    props: {
      id: {
        type: String,
        required: false
      },
      label: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: false
      },
      error: {
        type: Boolean,
        required: false
      },
      isEditPage: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      handleInput({ target }) {
        this.$emit('input', target.value)
      }
    }
  }
</script>

<style scoped>
  .input-wrapper {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }

  .custom-label {
    font-size: 14px;
  }

  .custom-input {
    margin-top: 10px;
    border-radius: 3px;
    border: 1px solid #9a9a9a;
    height: 25px;
    padding: 5px;
    font-size: 16px;
  }

  .custom-input--error {
    border-color: #ff4000
  }

  .input-wrapper--edit-page {
    margin-top: 0;
    width: 80%;
  }

  .input-wrapper--edit-page .custom-input {
    margin-top: 0;
    height: 13px;
    font-size: 14px;
    margin-right: 10px;
  }

  @media only screen and (max-width: 420px) {
    .input-wrapper--edit-page .custom-input {
      margin-right: 0;
    }
  }
</style>
