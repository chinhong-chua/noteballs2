import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { db } from "../js/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import{useStoreAuth} from '@/stores/storeAuth'

// const notesCollectionRef = collection(db, "notes");
let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        // {
        //   id: "id1",
        //   content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
        //           dignissimos nemo cumque ipsam, maiores doloremque, quia perferendis
        //           quas laboriosam vero ipsum, temporibus deleniti ducimus. Odit, nobis.`,
        // },
        // {
        //   id: "id2",
        //   content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        // },
      ],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      //init db refs
      const storeAuth= useStoreAuth()
      notesCollectionRef = collection(
        db,
        "users",
        storeAuth.user.id,
        "notes"
      );
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;
      // console.log('getnotes')
      // const querySnapshot = await getDocs(collection(db, "notes"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   let note={
      //     id:doc.id,
      //     content:doc.data().content
      //   }
      //   this.notes.push(note)
      // });
      // if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener
      // const unsubscribe =
      //will keep listening whenever user login
       getNotesSnapshot=onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        //   setTimeout(()=>{
        //     this.notes = notes;
        // this.notesLoaded=true
        //   },2000)
        this.notes = notes;
        this.notesLoaded = true;

        // console.log("Current cities in CA: ", cities.join(", "));
      }, error=>{
        console.log('error.message:',error.message)
      });
      //later on
      // unsubscribe()
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();
      // id = uuid();

      // let note = {
      //   id,
      //   content: newNoteContent,
      // };
      // this.notes.unshift(note);

      // await setDoc(doc(notesCollectionRef, id), {
      //   content: newNoteContent,
      //   id,
      // });
      const docRef = await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });

      //   console.log(newNoteContent);
    },
    async deleteNote(idToDelete) {
      // console.log(id)
      // this.notes = this.notes.filter((note) => note.id !== id);
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      // let index = this.notes.findIndex((note) => note.id === id);
      // this.notes[index].content = content;

      // const washingtonRef = doc(db, "cities", "DC");

      // Set the "capital" field of the city 'DC'
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
    },
    clearNotes(){
      this.notes=[]
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener

    }
  },
  getters: {
    getNoteContent: (state) => {
      // return state.notes[0].content;
      return (id) => {
        console.log("id from getter: ", id);
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totaCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
