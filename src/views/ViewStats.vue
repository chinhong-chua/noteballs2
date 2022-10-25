<template>
  <div class="notes">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{storeNotes.totalNotesCount}}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{storeNotes.totaCharactersCount}}</td>
        </tr>
      </tbody>
    </table>
    <input v-model="loveNoteballs" class="input" type="text" placeholder="do you love noteballs?" v-autofocus maxlength="50" />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useStoreNotes} from '@/stores/storeNotes'
import {vAutofocus} from '@/directives/vAutofocus'
import{ useWatchCharacters} from '@/use/useWatchCharacters'


const storeNotes = useStoreNotes()

const loveNoteballs=ref('')
useWatchCharacters(loveNoteballs,50)
</script>
