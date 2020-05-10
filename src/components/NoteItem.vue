<template>
  <li class="note-item">
    <div class="note-item__wrapper">
      <span class="note-item__title multiline-overflow">{{ note.title }}</span>
      <ol class="todos-list">
        <li class="todos-list__item multiline-overflow" v-for="(todo, i) in todoList" :key="i">
          {{ todo.descr }}
        </li>
      </ol>
      <span v-if="isTodoListLongerThenTwo">...</span>
      <router-link :to="'edit/' + noteId">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="edit-svg"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
      </router-link>
      <DeleteSvg @click.native="deleteNote"/>
    </div>
  </li>
</template>

<script>
import {mapActions} from "vuex";
import DeleteSvg from "./DeleteSvg";

export default {
  name: "NoteItem",
  components: {DeleteSvg},
  props: {
    note: {
      title: {
        type: String,
        required: true
      },
      todos: {
        type: Array,
        required: true
      },
      checked: {
        type: Boolean,
        required: true
      }
    },
    noteId: {
      type: String,
      required: true
    }
  },
  computed: {
    todoList() {
      // Обрезает список до двух пунктов для отрисовки на главной странице
      let todosList = this.note.todos;

      if (this.isTodoListLongerThenTwo) {
        todosList = this.note.todos.slice(0, 2)
      }
      return todosList
    },
    isTodoListLongerThenTwo() {
      return this.note.todos.length > 2
    }
  },
  methods: {
    ...mapActions(['DELETE_NOTE_ACTION', 'SET_DIALOG_WINDOW_INFO_ACTION']),
    deleteNote() {
      // Байндит функциую для передачи её в диалоговое окно, открывает диалоговое окно с необходимой информацией
      const bindedFunc = this.DELETE_NOTE_ACTION.bind(this, this.noteId);
      this.SET_DIALOG_WINDOW_INFO_ACTION({ text: 'Вы действительно хотите удалить заметку?', func: bindedFunc });
    }
  }
}
</script>

<style scoped>
  .note-item {
    padding: 15px;
    list-style: none;
    border-bottom: 1px solid #cacaca;
  }

  .note-item__wrapper {
    position: relative;
  }

  .todos-list {
    padding-left: 0;
    margin-top: 10px;
    font-size: 14px;
  }

  .todos-list__item {
    color: #808080;
  }

  .edit-svg, .delete-svg {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 30px;
    top: 0;
    cursor: pointer;
    color: black
  }

  .edit-svg:hover {
    color: #636363
  }

  .delete-svg {
    right: 0;
  }

  .delete-svg:hover {
    fill: #636363;
  }
</style>
