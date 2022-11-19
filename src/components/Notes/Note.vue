<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>

          <small class="column has-text-right">{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item"
        >Edit</RouterLink
      >
      <!-- <a
        @click.prevent="storeNotes.deleteNote(note.id)"
        href="#"
        class="card-footer-item"
        >Delete</a
      > -->
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
import { useNow, useDateFormat } from "@vueuse/core";

//props
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const storeNotes = useStoreNotes();

//date formated
const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  return useDateFormat(date, "YYYY-MM-DD @ HH:mm").value;
});
//emits
const emit = defineEmits(["deleteClicked"]);

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "Characters" : "Character";
  return `${length} ${description}`;
});

const handleDeleteClicked = () => {
  emit("deleteClicked", props.note.id);
};

//modals

const modals = reactive({
  deleteNote: false,
  editNote: false,
});
</script>
