<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label for="" class="label has-text-white" v-if="props.label">{{
      label
    }}</label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          ref="textareaRef"
          class="textarea"
          :placeholder="placeholder"
          v-autofocus
          maxlength="100"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {vAutofocus} from '@/directives/vAutofocus'

//props
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type Something...",
  },
  label: {
    type: String,
  },
});

//emits
const emit = defineEmits(["update:modelValue"]);

//focus textarea

const textareaRef = ref(null);

const focusTextarea = () => {
  // console.log('test')
  textareaRef.value.focus();
};

defineExpose({
  focusTextarea,
});

// /directives
// const vAutofocus = {
//   mounted: (el) => {
//     el.focus();
//   },
// };
</script>
