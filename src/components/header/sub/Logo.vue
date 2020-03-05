<template>
  <router-link tag="div" to="/" class="site-wrapper clearfix">
    <div class="logo">
      <img class="logo-img" src="../../../assets/logo.png" />
    </div>
    <div class="site-name">
      Vue购物车小Demo
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Logo"
})
export default class Logo extends Vue {}
</script>