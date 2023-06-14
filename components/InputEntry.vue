<script setup lang="ts">
const name = ref('');

const router = useRouter();
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`);
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text" autocomplete="off"
      class="outline-active:none m-(t-5) w-250px border border-(dark:gray-700 gray-200 rounded) bg-transparent p-(x-4 y-2) text-center outline-none"
      @keydown.enter="go"
    >
    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        GO
      </button>
    </div>
  </div>
</template>
