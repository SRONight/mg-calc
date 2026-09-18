import { onMounted, ref } from "vue";

const API_URL = "https://mg-api.ariedam.fr/data/";

export function useCropData() {
  const crops = ref([]);
  const mutationData = ref([]);

  const loading = ref(true);
  const error = ref(null);

  const selectedCropName = ref("");

  onMounted(async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      crops.value = Object.values(data.plants);
      mutationData.value = Object.values(data.mutations);

      console.log(mutationData.value);

      if (crops.value.length > 0) {
        selectedCropName.value = crops.value[0].crop.name;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  });

  return {
    crops,
    mutationData,
    loading,
    error,
    selectedCropName,
  };
}
