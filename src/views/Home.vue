<template>
  <div class="page-home">
    <common-header />
    <cart />
    <common-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CommonHeader from '@/components/header/Index.vue';
import Cart from '@/components/main/cart/Index.vue';
import CommonFooter from '@/components/footer/Index.vue';

@Component({
  name: 'Home',
  components: {
    CommonHeader,
    Cart,
    CommonFooter
  }
})
export default class Home extends Vue {}
</script>
