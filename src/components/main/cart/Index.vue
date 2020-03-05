<template>
  <section class="cart-layout container">
    <section-title title="我的购物车" />

    <!-- 购物车表单 -->
    <cart-table></cart-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SectionTitle from '@/components/main/sub/SectionTitle.vue';
import CartTable from './cartTable/Index.vue';

@Component({
  name: 'Cart',
  components: {
    SectionTitle,
    CartTable
  }
})
export default class Cart extends Vue {}
</script>

<style lang="scss">
@import '@/assets/styles/cart.scss';
</style>