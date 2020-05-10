<template>
  <div class="app">
    <h1 class="todo-list-title">
      TodoList App
    </h1>
    <div class="router-view">
      <router-view/>
    </div>
    <button class="add-note" @click="isModalVisible = true">+</button>
    <AddNoteModal v-if="isModalVisible" :isModalVisible="isModalVisible" @closeModal="isModalVisible = false"/>
    <Dialog v-if="dialogIsOpen"/>
  </div>
</template>

<script>
import AddNoteModal from "./components/AddNoteModal";
import {mapState} from "vuex";
import Dialog from "./helpers/Dialog";

export default {
  name: 'App',
  components: {Dialog, AddNoteModal },
  data() {
    return {
      isModalVisible: false
    }
  },
  computed: mapState(['notes', 'dialogIsOpen']),
  watch: {
    notes(value) {
      // При каждои изменении заметок, внсит актуальную информацию в local storage
      localStorage.setItem('notes', JSON.stringify(value));
    }
  }
}
</script>

<style>
  body, h1, h2 p, span, ul, li {
    padding: 0;
    margin: 0;
  }

  h1, p, span, li, h2, label {
    font-family: sans-serif;
  }

  .app {
    height: 100vh;
    background: url("./assets/main-bg.jpg") no-repeat;
    background-size: cover;
    overflow: auto;
    position: relative;
  }

  @media only screen and (max-width: 600px) {
    .app {
      background-size: contain;
      background-position: 0 -10px;
    }
  }

  .todo-list-title {
    color: white;
    text-align: center;
    margin: 100px 0 20px 0;
    font-weight: normal;
  }

  .router-view {
    margin: 0 auto;
    width: 500px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 10px 13px -7px rgb(1, 31, 46);
  }

  @media only screen and (max-width: 600px) {
    .router-view {
      width: 100%;
      border-radius: 0;
      height: calc(100vh - 157px);
      box-shadow: none;
    }
  }

  .add-note {
    position: absolute;
    bottom: 40px;
    right: 40px;
    border: 1px solid white;
    width: 70px;
    height: 70px;
    font-size: 40px;
    color: white;
    background: #507976;
    border-radius: 50px;
    cursor: pointer;
  }

  @media only screen and (max-width: 750px) {
    .add-note {
      top: 20px;
      right: 20px;
    }
  }

  .add-note:hover {
    background: #375250
  }

  .multiline-overflow {
    width: 85%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
