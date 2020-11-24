<template>
  <v-app>
    <v-main class="d-flex align-center py-10">
      <v-card max-width="400"  class="mx-auto" tile>
        <v-list flat>
          <v-subheader>NOTES</v-subheader>
          <v-list-item-group>
            <v-list-item
              @click="openDialog(null)"
            >
              <v-list-item-icon>
                <v-icon>mdi-file-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Add Note</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <list
        :notes="notes"
        @openDialog="openDialog"
        @deleteNote="deleteNote"
      />
      <app-dialog
        :isOpened.sync="isDialogOpened"
        :editableNote="currentNote"
        :edit="editMode"
        @saveNote="saveNote"
        @deleteNote="deleteNote"
      />
    </v-main>
  </v-app>
</template>

<script>
import list from './components/List';
import appDialog from "./components/Dialog";
import {Note} from "./store";

export default {
  name: 'App',
  components: {
    list,
    appDialog
  },
  data: () => ({
    isDialogOpened: false,
    currentNote: new Note(),
    editMode: false
  }),
  computed: {
    notes() {
      return this.$store.getters.notes
    }
  },
  methods: {
    openDialog(note) {
      if (note) {
        this.editMode = true
        this.currentNote = note
      }
      this.isDialogOpened = true
    },
    saveNote(note) {
      if (this.editMode) {
        this.$store.dispatch('editNote', note)
      } else {
        this.$store.dispatch('createNote', note)
      }
      this.clearState()
    },
    deleteNote(note) {
      this.$store.dispatch('deleteNote', note)
      this.clearState()
    },
    clearState() {
      this.isDialogOpened = false
      this.currentNote = new Note()
      this.editMode = false
    },
  }
}
</script>

<style lang="scss">
  html {
    overflow-y: auto;
  }
</style>
