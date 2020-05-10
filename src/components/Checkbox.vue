<template>
  <label class="custom-checkbox">
    <input class="custom-checkbox__input" @change="$emit('change', $event.target.checked)" type="checkbox" :checked="checked">
    <span class="custom-checkbox__checkmark"></span>
  </label>
</template>

<script>
  export default {
    name: "Checkbox",
    props: {
      checked: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style scoped>
  .custom-checkbox {
    display: block;
    position: relative;
    padding-right: 10px;
    cursor: pointer;
    font-size: 22px;
    width: 25px;
    height: 25px;
  }

  .custom-checkbox__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .custom-checkbox__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  .custom-checkbox:hover input ~ .custom-checkbox__checkmark {
    background-color: #ccc;
  }

  .custom-checkbox input:checked ~ .custom-checkbox__checkmark {
    background-color: #2196F3;
  }

  .custom-checkbox__checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .custom-checkbox input:checked ~ .custom-checkbox__checkmark:after {
    display: block;
  }

  .custom-checkbox .custom-checkbox__checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
</style>
