<template>
  <ul class="order-item clearfix" :class="{ checked: goods.is_checked }">
    <li class="td td-chk">
      <div class="td-inner">
        <cart-checkbox
          field="select-item"
          :is_checked="goods.is_checked"
          :id="goods.id"
        />
      </div>
    </li>
    <li class="td td-item">
      <div class="td-inner flex-container">
        <a href="javascript:;" class="item-pic" :title="goods.title">
          <img
            :src="goods.img"
            :alt="goods.title"
          />
        </a>
        <a href="javascript:;" class="item-title">{{ goods.title }}</a>
      </div>
    </li>
    <li class="td td-price">
      <div class="td-inner">
        <price
          :price="goods.price"
          symbolClass="unit-symbol"
        />
      </div>
    </li>
    <li class="td td-number">
      <div class="td-inner">
        <amount
          :stock="goods.stock"
          :count="goods.count"
          :goods_id="goods.id"
        />
        <goods-max-tips :limit="goods.stock" :count="goods.count" />
      </div>
    </li>
    <li class="td td-sum">
      <div class="td-inner">
        <price
          :price="priceSum"
          symbolClass="sum-symbol"
        />
      </div>
    </li>
    <li class="td td-op">
      <div class="td-inner">
        <a
          href="javascript:;"
          class="J_deleteItemBtn delete-item-btn"
          @click="handleDelete"
        >删除</a>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { GoodsItem } from '@/types/index';

import CartCheckbox from '../sub/CartCheckbox.vue';
import Price from '../sub/Price.vue';
import Amount from '../sub/Amount.vue';
import GoodsMaxTips from '../sub/GoodsMaxTips.vue';

@Component({
  name: 'OrderItem',
  components: {
    CartCheckbox,
    Price,
    Amount,
    GoodsMaxTips
  }
})
export default class OrderItem extends Vue {
  @Prop({
    required: true
  })
  private goods!: GoodsItem;

  get priceSum (): string {
    const { price, count } = this.goods;
    return (Number(price) * count).toFixed(2);
  }

  handleDelete ():void {
    if (confirm('确认要删除该宝贝吗？')) {
      this.$bus.$emit('deleteItem', this.goods.id);
    }
  }
}
</script>