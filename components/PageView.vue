<script setup lang="ts">
const { data } = await useFetch('/api/pageview');

const time = useTimeAgo(() => data.value?.startAt || 0);
</script>

<template>
  <div class="text-gray:80">
    <span class="font-500 text-gray">{{ data?.pageview }}</span>
    page views since
    <span class="text-gray">{{ time }}</span>
  </div>
</template>
