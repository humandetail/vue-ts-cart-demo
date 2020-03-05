<template>
  <div class="order-header">
    <div class="shop-info">
      <cart-checkbox
        field="select-shop"
        :id="shop_id"
        :is_checked="is_checked"
      />
      <span class="shop-icon"></span>
      <span class="shop-txt">店铺：</span>
      <a href="javascript:;" class="shop-name">{{ shop_name }}</a>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

import CartCheckbox from '../sub/CartCheckbox.vue';

@Component({
  name: 'OrderHeader',
  components: {
    CartCheckbox
  }
})
export default class OrderHeader extends Vue {

  @Prop({
    required: true
  })
  private shop_name!: string;

  @Prop({
    required: true
  })
  private shop_id!: string;

  @Prop({
    required: true
  })
  private is_checked!: boolean;
}
</script>