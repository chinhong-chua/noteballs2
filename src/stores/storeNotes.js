import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
                  dignissimos nemo cumque ipsam, maiores doloremque, quia perferendis
                  quas laboriosam vero ipsum, temporibus deleniti ducimus. Odit, nobis.`,
        },
        {
          id: "id2",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        },
      ],
    };
  },
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();

      let note = {
        id: uuid(),
        content: newNoteContent,
      };
      //   notes.value.push(note)
      this.notes.unshift(note);

      //   console.log(newNoteContent);
    },
    deleteNote(id) {
      // console.log(id)
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    updateNote(id,content){
      let index= this.notes.findIndex(note => note.id=== id)
      this.notes[index].content=content
    }
  },
  getters: {
    getNoteContent: (state) => {
      // return state.notes[0].content;
      return (id) => {
        console.log("id from getter: ", id);
        return state.notes.filter(note => note.id === id)[0].content
      };
    },
    totalNotesCount:(state)=>{
      return state.notes.length
    },
    totaCharactersCount:(state)=>{
      let count =0
      state.notes.forEach(note => {
        count +=note.content.length
      })
      return count
    },
  },
});
