<template>
  <div class="order-holder">
    <order-header
      :shop_name="shopInfo.shop_name"
      :shop_id="shopInfo.shop_id"
      :is_checked="shopInfo.is_checked"
    />

    <div class="order-content">
      <order-item
        v-for="(item, index) of shopInfo.goods"
        :key="index"
        :goods="item"
      />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

import { ShopInfo } from '@/types/index';

import OrderHeader from './OrderHeader.vue';
import OrderItem from './OrderItem.vue';

@Component({
  name: 'OrderHolder',
  components: {
    OrderHeader,
    OrderItem
  }
})
export default class OrderHolder extends Vue {
  @Prop({
    required: true
  })
  private shopInfo!: ShopInfo;
}
</script>