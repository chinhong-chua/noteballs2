<template>
  <div class="edit-note">
    <AddEditNote v-model="noteContent" bgColor="link" placeholder="Edit Note" label="Edit Note" ref="addEditNoteRef">
      <!-- <template v-slot:buttons></template> -->
      <template #buttons>
        <!-- <button @click="$router.push('/')" class="button is-link is-light">
          Cancel
        </button> -->
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button @click="handleSaveClick" class="button is-link has-background-link" :disabled="!noteContent">
          Save Note
        </button>
      </template>
    </AddEditNote>
    <pre>{{$route.params.id}}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useRoute, useRouter} from 'vue-router'
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import {useStoreNotes} from '@/stores/storeNotes'

const route=useRoute()
const router = useRouter()

const storeNotes= useStoreNotes()

const noteContent = ref("");
noteContent.value=storeNotes.getNoteContent(route.params.id)

const handleSaveClick=()=>{
  // let payload={
  //   id:route.params.id,
  //   content: noteContent.value
  // }
  storeNotes.updateNote(route.params.id, noteContent.value)
  console.log('handle save')
router.push('/')
  // this.$router.push('/') options api
}
</script>
