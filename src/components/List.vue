<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list flat>
      <v-list-item-group>
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          @click="$emit('openDialog', note)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ note.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'List',
    props: {
      notes: Array
    }
  }
</script>

<style lang="scss" scoped>
  .no-active:before {
    opacity: 0 !important;
  }
</style>