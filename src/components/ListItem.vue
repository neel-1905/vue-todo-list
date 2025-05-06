// ListItem.vue
<script setup lang="ts">
import type { Todo } from "../types";
import trash from "../assets/trash.svg";
import editBtn from "../assets/edit.svg";
import { ref } from "vue";
import EditModal from "./EditModal.vue";

const props = defineProps<{
  listItem: Todo;
}>();

const isModalOpen = ref<boolean>(false);

const emit = defineEmits<{
  (e: "toggle-status", id: number): void;
  (e: "delete-item", id: number): void;
  (e: "edit-item", item: Todo): void;
}>();

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const toggleStatus = () => {
  emit("toggle-status", props.listItem.id);
};

const deleteItem = () => {
  emit("delete-item", props.listItem.id);
};

const handleEditItem = (updatedItem: Todo) => {
  console.log(updatedItem);
  emit("edit-item", updatedItem);
};
</script>

<template>
  <div class="p-3 group hover:bg-[#333333]">
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-2">
        <label class="relative cursor-pointer w-5 h-5">
          <input
            type="checkbox"
            class="cursor-pointer peer appearance-none w-full h-full border border-theme-purple rounded-sm transition-colors duration-300 checked:bg-theme-purple checked:border-theme-purple"
            :checked="props.listItem.status === 'completed'"
            @change="toggleStatus"
          />

          <svg
            class="absolute inset-0 w-full h-full text-white opacity-0 scale-95 transition-all duration-300 ease-in-out peer-checked:opacity-100 peer-checked:scale-100 pointer-events-none"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>

        <span
          :class="[
            'text-lg font-semibold',
            props.listItem.status === 'completed'
              ? 'line-through text-text-secondary-dark'
              : '',
          ]"
        >
          {{ props.listItem.name.toUpperCase() }}
        </span>
      </div>
      <div class="hidden group-hover:flex items-center gap-3">
        <button class="cursor-pointer" @click="openModal">
          <img :src="editBtn" alt="Edit" class="size-4" />
        </button>
        <button class="cursor-pointer" @click="deleteItem">
          <img :src="trash" alt="Delete" class="size-4" />
        </button>
      </div>
    </div>
  </div>

  <EditModal
    v-if="isModalOpen"
    :isModalOpen="isModalOpen"
    :close-modal="closeModal"
    :edit-item="props.listItem"
    @edit-item="handleEditItem"
  />
</template>
