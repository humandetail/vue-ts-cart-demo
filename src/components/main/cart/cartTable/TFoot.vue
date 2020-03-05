<template>
  <div class="cart-table-tf clearfix">
    <div class="tf tf-chk">
      <div class="selectAll">
        <cart-checkbox field="select-all" :is_checked="selectedAll" />
        <span class="txt" @click="handleSelectAll">全选</span>
      </div>
    </div>
    <div class="tf tf-operations">
      <a
        href="javascript:;"
        class="J_deleteSelected delete-btn"
        @click="handleDelete"
      >删除</a>
    </div>
    <div class="tf tf-selected-items">
      <span class="txt">已选商品</span>
      <em class="selected-items-count">{{ selectedItemCount }}</em>
      <span class="txt">件</span>
    </div>
    <div class="tf tf-price-sum">
      <span class="txt">合计（不含运费）：</span>
      <price
        symbolClass="total-symbol"
        :price="totalPrice"
      />
    </div>
    <div class="tf tf-btn-area">
      <a
        href="javascript:;" 
        class="J_checkout_btn checkout-btn" 
        :class="{disabled: selectedItemCount <= 0}"
        @click="handleCheckout"
      >结算</a>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

import CartCheckbox from '../sub/CartCheckbox.vue';
import Price from '../sub/Price.vue';

@Component({
  name: 'TFoot',
  components: {
    CartCheckbox,
    Price
  }
})
export default class TFoot extends Vue {
  @Prop({
    required: true
  })
  private totalPrice!: string;

  @Prop({
    required: true
  })
  private selectedItemCount!: number;

  @Prop({
    required: true
  })
  private selectedAll!: boolean;

  handleSelectAll ():void {
    this.$bus.$emit('changeCheckd', {
      field: 'select-all',
      item_id: ''
    });
  }

  handleDelete ():void {
    this.$bus.$emit('deleteSelected');
  }

  // 结算
  handleCheckout () {
    if (this.selectedItemCount <= 0) return;

    this.$router.push({
      name: 'Address'
    });
  }
}
</script>