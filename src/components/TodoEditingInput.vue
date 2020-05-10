<template>
  <div class="edit-todo-text">
    <CustomInput class="edit-todo-text__input" @input="handleInput" :value="value" isEditPage/>
    <CustomButton class="edit-todo-text__btn" type="flat" @click="$emit('confirm')">
      <svg class="edit-todo-text__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 80.588 61.158" style="enable-background:new 0 0 80.588 61.158;" xml:space="preserve"><path style="fill:#231F20;" d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z"/></svg>
    </CustomButton>
    <CustomButton class="edit-todo-text__btn" type="flat" @click="$emit('cancel')">
      <svg class="edit-todo-text__svg edit-todo-text__svg-cancel" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 60.963 60.842" style="enable-background:new 0 0 60.963 60.842;" xml:space="preserve"><path style="fill:#231F20;" d="M59.595,52.861L37.094,30.359L59.473,7.98c1.825-1.826,1.825-4.786,0-6.611c-1.826-1.825-4.785-1.825-6.611,0L30.483,23.748L8.105,1.369c-1.826-1.825-4.785-1.825-6.611,0c-1.826,1.826-1.826,4.786,0,6.611l22.378,22.379L1.369,52.861c-1.826,1.826-1.826,4.785,0,6.611c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369l22.502-22.502l22.501,22.502c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369C61.42,57.647,61.42,54.687,59.595,52.861z"/></svg>
    </CustomButton>
  </div>
</template>

<script>
  import CustomInput from "./CustomInput";
  import CustomButton from "./CustomButton";
  export default {
    name: "TodoEditingInput",
    components: {CustomButton, CustomInput},
    props: {
      selectedTodo: {
        type: Number,
        required: false
      },
      value: {
        type: String,
        required: false
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e)
      }
    }
  }
</script>

<style scoped>
  .edit-todo-text {
    display: flex;
    width: 70%;
    justify-content: space-between;
  }

  .edit-todo-text__btn {
    height: 25px;
    padding: 0 10px;
    margin-left: 10px;
  }

  .edit-todo-text__svg {
    width: 15px;
  }

  .edit-todo-text__svg-cancel {
    margin-top: 4px;
  }

  @media only screen and (max-width: 420px) {
    .edit-todo-text {
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .edit-todo-text__input {
      width: 100%;
    }

    .edit-todo-text__btn {
      margin: 10px 0;
      width: 30%;
    }
  }
</style>
