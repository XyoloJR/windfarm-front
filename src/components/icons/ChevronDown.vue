<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown } from '@mdi/js';
</script>

<template>
  <svg-icon type="mdi" :path="mdiChevronDown"></svg-icon>
</template>

<style>
  svg:hover {
    cursor: pointer;
  }
</style>

