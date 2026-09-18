<script setup>
import { ref, watch } from "vue";

import "../assets/css/size-input.css";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  multiplier: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value;
  }
);

function handleInput(event) {
  inputValue.value = event.target.value;
}

function handleBlur() {
  let value = Number(inputValue.value);

  if (Number.isNaN(value)) {
    value = 50;
  }

  value = Math.min(100, Math.max(50, value));

  inputValue.value = value;
  emit("update:modelValue", value);
}
</script>

<template>
  <section class="section">
    <h3>Size</h3>

    <div class="size-input">
      <input
        type="number"
        :value="inputValue"
        min="50"
        max="100"
        step="1"
        @input="handleInput"
        @blur="handleBlur"
      />

      <span>×{{ multiplier.toFixed(2) }}</span>
    </div>

    <p class="hint">Size 50 = ×1.00</p>
  </section>
</template>
