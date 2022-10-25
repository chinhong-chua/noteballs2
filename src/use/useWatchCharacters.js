import { watch } from "vue"
// export function useWatchCharacters(valueToWatch){
//     watch(valueToWatch,(newValue)=>{
//         if(newValue.length === 100)
//         alert('only 100 chars allowed')
//         })
// }

export function useWatchCharacters(valueToWatch,maxChars =100){
    watch(valueToWatch,(newValue)=>{
        if(newValue.length === maxChars)
        alert(`only ${maxChars} chars allowed`)
        })
}