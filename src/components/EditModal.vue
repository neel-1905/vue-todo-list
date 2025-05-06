// EditModal.vue
<script lang="ts" setup>
import { ref } from "vue";
import type { Todo } from "../types";

const props = defineProps<{
  isModalOpen: boolean;
  closeModal: () => void;
  editItem: Todo;
}>();

const emit = defineEmits<{
  (e: "edit-item", item: Todo): void;
}>();

// Initialize with the current item name directly, no need for watch
const existingItem = ref<string>(props.editItem.name);

const handleSubmit = () => {
  if (!existingItem.value.trim()) return;

  // Create a completely new Todo object
  const updatedItem: Todo = {
    id: props.editItem.id,
    name: existingItem.value.trim(),
    status: props.editItem.status,
  };

  emit("edit-item", updatedItem);
  props.closeModal();
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
      <h2 class="text-2xl font-semibold mb-6 text-center">Edit Item</h2>

      <form @submit.prevent="handleSubmit">
        <input
          autofocus
          type="text"
          placeholder="Item Name"
          class="w-full p-2 mb-5 border border-gray-300 rounded outline-none"
          v-model="existingItem"
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
            Edit Item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
