<template>
  <div class="cart-table-bd">
    <order-holder
      v-for="shopInfo of shopList"
      :key="shopInfo.shop_id"
      :shopInfo="shopInfo"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { ShopInfo } from '@/types/index';

import OrderHolder from '../orderHolder/Index.vue';

@Component({
  name: 'TBody',
  components: {
    OrderHolder
  }
})
export default class TBody extends Vue {
  @Prop({
    required: true
  })
  private shopList!: ShopInfo[];
}
</script>