<template>
  <Suspense>
    <template #default>
      <div>
        <Banner></Banner>
        <gedan></gedan>
      </div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Banner from "@/components/common/banner.vue";
import gedan from "./gedan.vue";
</script>
