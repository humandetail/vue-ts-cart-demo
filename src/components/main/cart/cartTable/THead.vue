<template>
  <div class="cart-table-th clearfix">
    <div class="th th-chk">
      <div class="selectAll">
        <cart-checkbox field="select-all" :is_checked="selectedAll" />
        <span class="txt" @click="handleSelectAll">全选</span>
      </div>
    </div>
    <div class="th th-item">
      <div class="td-inner">商品信息</div>
    </div>
    <div class="th th-price">
      <div class="td-inner">单价</div>
    </div>
    <div class="th th-number">
      <div class="td-inner">数量</div>
    </div>
    <div class="th th-sum">
      <div class="td-inner">金额</div>
    </div>
    <div class="th th-op">
      <div class="td-inner">操作</div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

import CartCheckbox from '../sub/CartCheckbox.vue';

@Component({
  components: {
    CartCheckbox
  }
})
export default class THead extends Vue {
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
}
</script>