<template>
  <div class="add-note-modal-overlay" @click="closeModal">
    <div class="add-note-modal">
      <button class="close-modal" @click="$emit('closeModal')"></button>
      <h2 class="add-note-modal__title">Добавьте заметку</h2>
      <CustomInput @input="emptyTitleError = false" :error="emptyTitleError" id="title" label="Заголовок" v-model="title"/>
      <form @submit="addTodo" class="add-todos">
        <CustomInput
          :error="emptyTodoError"
          class="add-todos__input"
          id="add-todo"
          label="Составьте список"
          v-model="todoItem"
          @input="emptyTodoError = false"/>
        <CustomButton class="add-todos__btn" @click="addTodo">+</CustomButton>
      </form>
      <ol class="add-note-modal__todos-list" v-if="todosList.length">
        <li class="add-note-modal__todos-list-item multiline-overflow" v-for="(todo, i) in todosList" :key="i">
          {{ todo.descr }}
        </li>
      </ol>
      <p v-if="emptyTodosListError" class="error-text">Добавьте пункт в список</p>
      <div class="add-note-modal__action-btns">
        <CustomButton @click="submitNote">Готово</CustomButton>
        <CustomButton @click="$emit('closeModal')" type="flat">Отмена</CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomInput from "./CustomInput";
  import CustomButton from "./CustomButton";
  import {mapActions} from "vuex";

  export default {
    name: "AddNoteModal",
    components: {CustomButton, CustomInput},
    props: {
      isModalVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        title: '',
        todoItem: '',
        todosList: [],
        emptyTodoError: false,
        emptyTitleError: false,
        emptyTodosListError: false
      }
    },
    methods: {
      ...mapActions(['ADD_NOTE_ACTION']),
      closeModal(e) {
        // Закрывает модалку если клик происходит не на ней
        if (e.target.className === 'add-note-modal-overlay') {
          this.$emit('closeModal')
        }
      },
      addTodo(e) {
        // Отменяет перезагрузку страницы при нажатии на ентер, если поле добавления пункта туду в фокусе (сделано для реализации добавления пункта при нажатии на ентер)
        if (e) e.preventDefault();

        if (!this.todoItem) {
          this.emptyTodoError = true;
        } else {
          // Убирает ошибки путого поля нового пункта и пустого списка, добавляет пункт в туду, зачищает поле нового пункта
          this.emptyTodoError = false;
          this.emptyTodosListError = false;
          this.todosList.push({ descr: this.todoItem, checked: false });
          this.todoItem = ''
        }
      },
      submitNote() {
        // Проверяет поля на заполненность
        if (!this.title) this.emptyTitleError = true;
        if (!this.todosList.length) {
          this.emptyTodoError = true;
          this.emptyTodosListError = true
        }

        //Если все поля заполнены, формирует объект заметки и добавляет его в стор, закрывает модалку
        if (!this.emptyTitleError && this.todosList.length) {
          const newNote = {
            title: this.title,
            todos: this.todosList
          };

          this.ADD_NOTE_ACTION(newNote);
          this.$emit('closeModal')
        }
      }
    }
  }
</script>

<style scoped>
  .add-note-modal-overlay {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    position: absolute;
  }

  .add-note-modal {
    width: 400px;
    background: white;
    padding: 20px;
    min-height: 200px;
    max-height: 700px;
    position: relative;
  }

  @media only screen and (max-width: 420px) {
    .add-note-modal {
      width: 100%;
    }
  }

  .close-modal {
    position: absolute;
    right: 20px;
    top: 20px;
    height: 20px;
    width: 20px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .close-modal:before, .close-modal:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 1px;
    left: 0;
    background: #9a9a9a;
  }

  .close-modal:before {
    transform: rotate(45deg);
  }

  .close-modal:after {
    transform: rotate(-45deg);
  }

  .add-note-modal__title {
    text-align: center;
  }

  .add-todos {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .add-todos__input {
    width: 100%;
    margin-right: 5px;
  }

  .add-todos__btn {
    font-size: 20px;
  }

  .add-note-modal__todos-list {
    padding: 0;
  }

  .add-note-modal__todos-list-item {
    font-size: 14px;
  }

  @media only screen and (max-width: 420px) {
    .add-note-modal__todos-list-item {
      width: 70%;
    }
  }

  .add-note-modal__action-btns {
    width: 50%;
    margin: 20px auto 0 auto;
    display: flex;
    justify-content: space-between;
  }

  @media only screen and (max-width: 420px) {
    .add-note-modal__action-btns {
      width: 70%;
    }
  }

  .error-text {
    font-size: 12px;
    color: #ff4000;
  }
</style>
