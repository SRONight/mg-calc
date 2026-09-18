<script setup>
import { computed, ref, watch } from "vue";

import "../assets/css/crop-selector.css";

const props = defineProps({
  crops: {
    type: Array,
    required: true,
  },

  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref(props.modelValue);
const isOpen = ref(false);

const filteredCrops = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return props.crops;
  }

  return props.crops.filter((plant) =>
    plant.crop.name.toLowerCase().includes(query)
  );
});

watch(
  () => props.modelValue,
  (value) => {
    searchQuery.value = value;
  }
);

function selectCrop(crop) {
  const cropName = crop.crop.name;

  searchQuery.value = cropName;
  emit("update:modelValue", cropName);

  isOpen.value = false;
}

function openDropdown() {
  isOpen.value = true;
}

function closeDropdown() {
  setTimeout(() => {
    isOpen.value = false;
  }, 100);
}
</script>

<template>
  <section class="section crop-selector">
    <h3>Crop</h3>

    <div class="crop-search">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search crop..."
        @focus="openDropdown"
        @input="isOpen = true"
        @blur="closeDropdown"
      />

      <div v-if="isOpen" class="crop-dropdown">
        <button
          v-for="plant in filteredCrops"
          :key="plant.crop.name"
          type="button"
          class="crop-option"
          @mousedown.prevent="selectCrop(plant)"
        >
          {{ plant.crop.name }}
        </button>

        <div v-if="filteredCrops.length === 0" class="crop-no-result">
          No crops found.
        </div>
      </div>
    </div>
  </section>
</template>
