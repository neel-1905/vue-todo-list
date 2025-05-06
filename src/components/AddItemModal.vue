<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  isModalOpen: boolean;
  closeModal: () => void;
}>();

const emit = defineEmits<{
  (e: "add-item", item: string): void;
}>();

const newItem = ref<string>("");

const handleSubmit = () => {
  if (!newItem.value.trim()) return;

  emit("add-item", newItem.value.trim());
  newItem.value = ""; // Clear the input after submission
  props.closeModal(); // Close the modal after submission
};
</script>

<template>
  <!-- Backdrop -->
  <div
    v-if="props.isModalOpen"
    @click.self="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
  >
    <!-- Modal Box -->
    <div class="bg-bg-dark rounded-lg shadow-lg w-full max-w-lg p-6">
      <h2 class="text-2xl font-semibold mb-6 text-center">Add Item</h2>

      <form @submit.prevent="handleSubmit">
        <input
          autofocus
          type="text"
          placeholder="Item Name"
          class="w-full p-2 mb-5 border border-gray-300 rounded outline-none"
          v-model="newItem"
        />

        <div class="flex items-center justify-end gap-2">
          <button
            type="button"
            @click="props.closeModal"
            class="px-4 py-2 bg-transparent border border-theme-purple text-white rounded-primary cursor-pointer"
          >
            Close
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-theme-purple hover:bg-theme-purple-hover rounded-primary cursor-pointer"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
