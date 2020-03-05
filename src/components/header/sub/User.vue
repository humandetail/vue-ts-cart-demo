<template>
  <div class="user-wrapper">
    <div class="user-name">{{ userName }}</div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'User'
})
export default class User extends Vue {
  @Prop({
    default: '细节'
  })
  private userName!: string;
}
</script>