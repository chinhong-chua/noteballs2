<template>
  <div class="notes">
    <!-- <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            ref="newNoteRef"
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div> -->

    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <!-- <template v-slot:buttons></template> -->
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    />
    <template v-else>
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
        @deleteClicked="deleteNote"
      />
      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";

//note
const newNote = ref("");
// const newNoteRef = ref(null);
const addEditNoteRef = ref(null);

const storeNotes = useStoreNotes();

// const notes = ref([
//   {
//     id: "id1",
//     content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
//           dignissimos nemo cumque ipsam, maiores doloremque, quia perferendis
//           quas laboriosam vero ipsum, temporibus deleniti ducimus. Odit, nobis.`,
//   },
//   {
//     id: "id2",
//     content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
//   },
// ]);

onMounted(()=>{
  // storeNotes.init()
})

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = "";
  // newNoteRef.value.focus();
  addEditNoteRef.value.focusTextarea();
};

//delete note
const deleteNote = (id) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};

//watch characters

// watch(newNote,(newValue,oldValue)=>{
// console.log('oldValue ',oldValue)
// console.log('newValue ',newValue)
// })
// watch(newNote,(newValue)=>{
// if(newValue.length === 100)
// alert('only 100 chars allowed')
// })
useWatchCharacters(newNote);
</script>
