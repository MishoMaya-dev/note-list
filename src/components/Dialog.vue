<template>
  <v-row>
    <v-dialog
      v-model="dialogOpened"
      max-width="500px"
    >
      <v-card
        :loading="loading"
      >
        <v-card-title>
          {{ edit ? 'Edit note' : 'Create note' }}
        </v-card-title>
          <v-text-field
            :autofocus="!edit"
            :rules="rules"
            :disabled="loading"
            class="px-6 pt-2"
            label="Name note"
            hide-details="auto"
            autocomplete="off"
            v-model="note.name"
            @keyup.enter="saveNote"
          />
        <v-card-actions
          class="d-flex justify-end"
        >
          <v-btn
            color="primary"
            :disabled="loading || isValid"
            @click="saveNote"
          >
            {{ edit ? 'Update' : 'Create' }}
          </v-btn>
          <v-btn
            @click="toggleDialog(false)"
          >
            Close
          </v-btn>
          <v-btn
            v-if="edit"
            color="error"
            @click="deleteNote"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {Note} from '../store/index'

  export default {
    name: 'Dialog',
    props: {
      isOpened: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      },
      editableNote: {
        type: Object,
        required: true
      },
    },
    data: () => ({
      loading: false,
      note: new Note(),
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }),
    computed: {
      dialogOpened: {
        set(val){
          this.toggleDialog(val)
        },
        get(){
          return this.isOpened
        }
      },
      isValid() {
        if (this.note.name === '') return true
      }
    },
    watch: {
      editableNote(val) {
        this.note = { ...val }
      }
    },
    created() {
      this.note = {...this.editableNote}
    },
    methods: {
      saveNote() {
        const noteData = {
          ...this.note,
          id: this.edit ? this.note.id : undefined
        }
        this.loading = true
        setTimeout(() => {
          this.$emit('saveNote', noteData)
          this.loading = false
        }, 1000)
      },
      toggleDialog(val) {
        this.$emit('update:isOpened', val)
        this.note = new Note()
      },
      deleteNote() {
        this.loading = true
        setTimeout(() => {
          this.$emit('deleteNote', this.note)
          this.loading = false
        }, 1000)
      }
    }

  }
</script>

<style scoped>

</style>