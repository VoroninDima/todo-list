<template>
  <ul class="notes-items" v-if="Object.keys(notes).length">
    <NoteItem v-for="(note, i) in notes" :noteId="i" :note="note" :key="i"/>
  </ul>
  <div v-else class="empty-notes">
    <span>Здесь будут отображаться ваши заметки</span>
  </div>
</template>

<script>
import NoteItem from "../components/NoteItem";
import {mapState} from "vuex";

export default {
  name: 'Main',
  components: {NoteItem},
  computed: {
    ...mapState(['notes'])
  }
}
</script>

<style scoped>
  .empty-notes {
    padding: 15px;
  }

  .notes-items {
    max-height: 500px;
    overflow: auto;
  }
</style>
