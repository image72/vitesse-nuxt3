<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <main class="p-(x4 y10) text-(center dark:gray-200 teal-700)">
    <div class="text-4xl">
      <div class="i-carbon-warning inline-block" />
    </div>
    <div>Not found</div>
    <div>
      <button class="m-(3 t8) text-sm btn" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>
