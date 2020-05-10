<template>
  <div class="edit-page" v-if="currentNote">
    <div @click="backToMain" class="edit-page__back-to-main">
      <svg enable-background="new 0 0 32 32" id="Слой_1" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M1,2.053h3h7.455H19v0.025c6.117,0.264,11,5.292,11,11.475  c0,6.182-4.883,11.211-11,11.475v0.025h-7.545H4H3.362l3.294-3.294c0.389-0.389,0.389-1.025,0-1.414s-1.025-0.389-1.414,0  l-4.95,4.95c-0.201,0.201-0.293,0.467-0.287,0.732c-0.007,0.265,0.086,0.531,0.287,0.732l4.95,4.95c0.389,0.389,1.025,0.389,1.414,0  s0.389-1.025,0-1.414l-3.242-3.241H19c0.059,0,0.109-0.024,0.165-0.034C26.31,26.67,32,20.784,32,13.553  c0-7.456-6.044-13.5-13.5-13.5c-0.135,0-0.266,0.016-0.401,0.02c-0.034-0.004-0.064-0.02-0.099-0.02H1c-0.55,0-1,0.45-1,1  C0,1.603,0.45,2.053,1,2.053z" fill="#121313" fill-rule="evenodd"/><g/><g/><g/><g/><g/><g/></svg>
    </div>
    <h2 class="edit-page__title">Редактирование заметки</h2>
    <p class="note-title multiline-overflow">{{ currentNote.title }}</p>
    <ol class="todos-list">
      <li class="todos-list__item" v-for="(todo, i) in currentNote.todos" :key="i">
        <Checkbox :checked="todo.checked" @change="handleCheck($event, i)"/>
        <TodoEditingInput
          v-if="i === selectedTodoForEdit"
          :i="i"
          v-model="changedTodoText"
          :selectedTodo="selectedTodoForEdit"
          @cancel="selectedTodoForEdit = null"
          @confirm="confirmEditTodo"/>
        <span class="todos-list__item-descr multiline-overflow" v-else>{{ todo.descr }}</span>
        <div class="pencil-svg-wrapper" @click="editTodo(i)">
          <svg class="pencil-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon class="a" points="7 21.5 0.5 23.5 2.5 17 15.33 4.169 19.83 8.669 7 21.5"/><path class="a" d="M15.33,4.169l3.086-3.086a2.007,2.007,0,0,1,2.828,0l1.672,1.672a2,2,0,0,1,0,2.828L19.83,8.669"/><line class="a" x1="17.58" y1="6.419" x2="6" y2="18"/><polyline class="a" points="2.5 17 3.5 18 6 18 6 20.5 7 21.5"/><line class="a" x1="1.5" y1="20.5" x2="3.5" y2="22.5"/><line class="a" x1="16.83" y1="2.669" x2="21.33" y2="7.169"/></svg>
        </div>
        <DeleteSvg class="todos-list__item-delete" @click.native="deleteTodo(i)"/>
      </li>
    </ol>
    <TodoEditingInput
      class="edit-page__add-todo-input"
      v-if="isTodoAdding"
      v-model="addingTodoText"
      @cancel="isTodoAdding = false"
      @confirm="addTodo"/>
    <button class="edit-page__add-todo" @click="isTodoAdding = true" v-else>Добавить пункт</button>
    <div class="edit-page__action-btns">
      <CustomButton class="edit-page__action-btn" @click="submitEdit">Сохранить</CustomButton>
      <CustomButton class="edit-page__action-btn" v-if="prevNoteState" type="flat" @click="cancelLastEditing">
        {{ cancelEditingClicked ? 'Вернуть' : 'Отменить' }} последнее изменение
      </CustomButton>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import Checkbox from "../components/Checkbox";
  import DeleteSvg from "../components/DeleteSvg";
  import CustomInput from "../components/CustomInput";
  import CustomButton from "../components/CustomButton";
  import TodoEditingInput from "../components/TodoEditingInput";

  export default {
    components: {TodoEditingInput, CustomButton, CustomInput, DeleteSvg, Checkbox},
    data() {
      return {
        currentNote: null,
        selectedTodoForEdit: null,
        changedTodoText: '',
        isTodoAdding: false,
        addingTodoText: '',
        prevNoteState: null,
        cancelEditingClicked: false,
        forbidEditCanceling: false
      }
    },
    computed: {
      ...mapState(['notes']),
      todosClone() {
        // При каждом вызове, создает копию массива с пунктами, для предотвращения непредсказуемого поведения
        return JSON.parse(JSON.stringify(this.currentNote.todos))
      }
    },
    methods: {
      ...mapActions(['EDIT_NOTE_ACTION', 'SET_DIALOG_WINDOW_INFO_ACTION']),
      deleteTodo(i) {
        // Создает функцию для вызова в диалоговом окне, открывает диалоговое окно
        const func = (i) => {
          //Создает копию объекта для предотвращения непредсказуемого поведения, удаляет пункт, скрывает поле редактирования текста
          const todosClone = this.currentNote.todos.slice(0);
          todosClone.splice(i, 1);

          this.currentNote = { ...this.currentNote, todos: todosClone };
          this.selectedTodoForEdit = null
        };
        const bindedFunc = func.bind(this, i);
        this.SET_DIALOG_WINDOW_INFO_ACTION({ text: 'Вы действительно хотите удалить пункт?', func: bindedFunc });
      },
      confirmEditTodo() {
        //Заменяет в объекте с данными текст для выбранного пункта
        this.todosClone[this.selectedTodoForEdit].descr = this.changedTodoText;

        this.currentNote = { ...this.currentNote, todos: this.todosClone };
        this.selectedTodoForEdit = null
      },
      editTodo(i) {
        // Подставляет в поле редактирования текст выбранного пункта, выбирает элемент для редактирования
        this.changedTodoText = this.currentNote.todos[i].descr;
        this.selectedTodoForEdit = i
      },
      submitEdit() {
        // Сохраняет изменения и переадресовует на главную
        this.EDIT_NOTE_ACTION({ id: this.$route.params.id, info: this.currentNote });
        this.$router.push('/')
      },
      backToMain() {
        const func = () => {
          this.$router.push('/')
        };
        const bindedFunc = func.bind(this);
        this.SET_DIALOG_WINDOW_INFO_ACTION({ text: 'Вы действительно хотите вернуться на главную?', func: bindedFunc });
      },
      addTodo() {
        // Добавляет пункт если пользователь ввел что-то в поле, после чего скрывает
        if (!this.addingTodoText) return;

        this.todosClone.push({ descr: this.addingTodoText, checked: false });

        this.currentNote = { ...this.currentNote, todos: this.todosClone };
        this.isTodoAdding = false;
        this.addingTodoText = ''
      },
      handleCheck(isChecked, i) {
        this.todosClone[i].checked = isChecked;
        this.currentNote = { ...this.currentNote, todos: this.todosClone };
      },
      cancelLastEditing() {
        // Отменяет последнее изменение и меняет текст в кнопке
        if (this.cancelEditingClicked) {
          // Активирует флаг для запрета отмены редактирования
          this.forbidEditCanceling = true
        }

        this.currentNote = this.prevNoteState;
        this.cancelEditingClicked = true
      }
    },
    mounted() {
      // Получает информацию о конкретной заметке
      this.currentNote = this.notes[this.$route.params.id];
    },
    watch: {
      currentNote(value, prev) {
        if (prev && !this.forbidEditCanceling) {
          // При каждом редактировании заметки сохраняет ее прошлое состояние
          this.prevNoteState = prev
        } else {
          // Если пользователь вернул отмененные изменения, прячет кнопку, и обноляет флаг запрета обновления
          this.prevNoteState = null;
          this.forbidEditCanceling = false;
          this.cancelEditingClicked = false
        }
      }
    }
  }
</script>

<style scoped>
  .edit-page {
    overflow: auto;
    position: relative;
  }

  .todos-list {
    padding: 0;
    max-height: 230px;
    overflow: auto;
  }

  .edit-page__title {
    text-align: center;
    font-weight: normal;
  }

  @media only screen and (max-width: 450px) {
    .edit-page__title {
      font-size: 18px;
      margin: 30px auto;
    }
  }

  .note-title {
    margin: 0 auto;
  }

  .todos-list__item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #dadada;
  }

  .todos-list__item-descr {
    font-size: 14px;
    width: 80%;
  }

  @media only screen and (max-width: 450px) {
    .todos-list__item-descr {
      width: 70%;
    }
  }

  .todos-list__item-delete {
    right: 15px;
    top: 12px;
  }

  .pencil-svg-wrapper {
    position: absolute;
    top: 12px;
    width: 20px;
    right: 45px;
    cursor: pointer;
  }

  .pencil-svg {
    fill:none;
    stroke:#000;
    stroke-linecap:round;
    stroke-linejoin:round;
  }

  .pencil-svg:hover {
    color: #636363
  }

  .edit-page__action-btns {
    display: flex;
    margin: 30px auto;
    justify-content: space-between;
    width: 80%;
  }

  @media only screen and (max-width: 500px) {
    .edit-page__action-btns {
      width: 100%;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .edit-page__action-btn {
      margin-top: 10px;
    }
  }

  .edit-page__return-editing {
    margin-left: 20px;
    font-size: 14px;
    color: #5d5d5d;
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: underline;
  }

  .edit-page__back-to-main {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 20px;
    cursor: pointer;
  }

  .edit-page__add-todo {
    text-align: center;
    display: block;
    margin: 10px auto;
    background: none;
    color: #1b7696;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    .edit-page__add-todo {
      font-size: 16px;
      margin: 20px auto;
    }
  }

  .edit-page__add-todo-input {
    margin: 10px auto;
  }
</style>
