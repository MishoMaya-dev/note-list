<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
    :loading="loading"
  >
    <v-list flat>
      <v-list-item-group>
        <v-list-item
          v-for="note in notes"
          :key="note.id"
        >
          <v-list-item-content
            @click="$emit('openDialog', note)">
            <v-list-item-title>{{ note.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              text
              color="error"
              @click="deleteNote(note)"
            >
              Delete
            </v-btn>
          </v-list-item-action>

        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'List',
    props: {
      notes: Array,
    },
    data: () => ({
      loading: false
    }),
    methods: {
      deleteNote(note) {
        this.loading = true
        setTimeout(() => {
          this.$emit('deleteNote', note)
          this.loading = false
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .no-active:before {
    opacity: 0 !important;
  }
</style>