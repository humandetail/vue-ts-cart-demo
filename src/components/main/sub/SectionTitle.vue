<template>
  <h2 class="section-title">
    <router-link to="" class="title">{{ title }}</router-link>
  </h2>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SectionTitle extends Vue {
  @Prop({
    default: ''
  })
  private title!: string;
}
</script>