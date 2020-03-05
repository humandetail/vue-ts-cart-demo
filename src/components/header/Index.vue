<template>
  <header class="header">
    <div class="container clearfix">
      <logo />
      <user :userName="'细节'" />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Logo from './sub/Logo.vue';
import User from './sub/User.vue';

@Component({
  name: 'CommonHeader',
  components: {
    Logo,
    User
  }
})
export default class CommonHeader extends Vue {}
</script>

<style lang="scss">
@import '@/assets/styles/header.scss';
</style>