<script setup lang="ts">
import type { Todo, TodoList } from "../types";
import emptyImg from "../assets/emptyList.svg";
import ListItem from "./ListItem.vue";

const props = defineProps<{
  todoList: TodoList;
}>();

const emit = defineEmits<{
  (e: "update-status", id: number): void;
  (e: "delete-item", id: number): void;
  (e: "edit-item", item: Todo): void;
}>();
</script>

<template>
  <div v-if="props.todoList.length === 0" class="flex justify-center">
    <img :src="emptyImg" alt="Empty List" />
  </div>
  <p
    v-if="props.todoList.length === 0"
    class="text-center mt-2 font-semibold text-xl"
  >
    Empty...
  </p>

  <div v-else class="flex justify-center mt-4">
    <div class="flex flex-col items-center max-w-3xl w-full">
      <div class="flex flex-col w-full divide-y divide-theme-purple">
        <ListItem
          v-for="todo in props.todoList"
          :key="todo.id"
          :listItem="todo"
          @toggle-status="emit('update-status', todo.id)"
          @delete-item="emit('delete-item', todo.id)"
          @edit-item="emit('edit-item', $event)"
        />
      </div>
    </div>
  </div>
</template>
