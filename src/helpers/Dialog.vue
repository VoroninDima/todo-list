<template>
  <div class="dialog-overlay" @click="handleWarning">
    <div class="dialog-body" :class="{ 'dialog-body--warning': isWarning }">
      <span class="dialog-body__text">{{ dialogWindowInfo.text }}</span>
      <div class="dialog-body__actions-btn">
        <CustomButton @click="handleConfirm">Подтвердить</CustomButton>
        <CustomButton @click="SET_DIALOG_IS_OPEN_ACTION(false)" type="flat">Отменить</CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import CustomButton from "../components/CustomButton";

  export default {
    name: "Dialog",
    components: {CustomButton},
    data() {
      return {
        isWarning: false
      }
    },
    computed: mapState(['dialogWindowInfo']),
    methods: {
      ...mapActions(['SET_DIALOG_IS_OPEN_ACTION']),
      handleConfirm() {
        // Выполняет переданную ранее функцию и закрывает окно
        this.dialogWindowInfo.func();
        this.SET_DIALOG_IS_OPEN_ACTION(false)
      },
      handleWarning({ target }) {
        // Подсвечивает окно, что бы юзер выбрал действие
        if (target.className === 'dialog-overlay') {
          this.isWarning = true
        }
      }
    }
  }
</script>

<style scoped>
  .dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0);
  }

  .dialog-body {
    padding: 20px;
    width: 300px;
    background: white;
    margin: 30px auto;
    border-radius: 3px;
    box-shadow: 0 10px 13px -7px rgb(1, 31, 46);
  }

  @media only screen and (max-width: 350px) {
    .dialog-body {
      width: 100%;
      border-radius: 0;
      padding: 20px 0;
    }

    .dialog-body__text {
      padding: 0 10px;
      font-size: 15px;
    }
  }

  .dialog-body--warning {
    border: 2px solid #ff4000
  }

  .dialog-body__actions-btn {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
</style>
