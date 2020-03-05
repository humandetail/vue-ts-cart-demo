<template>
  <div class="cart-table" v-if="shopList.length > 0">
    <t-head
      :selectedAll="selectedAll"
    />
    <t-body :shopList="shopList" />
    <t-foot
      :totalPrice="totalPrice"
      :selectedItemCount="selectedItemCount"
      :selectedAll="selectedAll"
    />
  </div>

  <div class="cart-empty" v-else>
    购物车空空如也~
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

import { GoodsItem, ShopInfo } from '@/types/index';
import { formatCartData } from '@/utils/tools';

import THead from './THead.vue';
import TBody from './TBody.vue';
import TFoot from './TFoot.vue';

@Component({
  name: 'CartTable',
  components: {
    THead,
    TBody,
    TFoot
  }
})
export default class CartTable extends Vue {

  private shopList: ShopInfo[] = [];

  // 计算属性
  // - 用户选中的商品数量
  // - 只计算选中的商品，忽略购买数量
  get selectedItemCount (): number {
    return this.shopList.reduce((prev: number, item: ShopInfo) => {
      return prev + item.goods.reduce((p: number, i: GoodsItem) => {
        return p + Number(i.is_checked);
      }, 0);
    }, 0);
  }

  // 计算属性
  // - 用户选中的商品的总价
  get totalPrice (): string {
    let price: number = this.shopList.reduce((prev: number, item: ShopInfo) => {
      return prev + item.goods.reduce((p: number, i: GoodsItem) => {
        return i.is_checked
                ? p + Number(i.price) * i.count
                : p;
      }, 0);
    }, 0);
    return price.toFixed(2);
  }

  get selectedAll (): boolean {
    return this.shopList.every((shopInfo: ShopInfo) => shopInfo.is_checked);
  }

  // 获取购物车数据
  getCartInfo (): void {
    axios.get('/mock/cart.json').then((response) => {
      let res = response.data;
      if (res.err_code === 0) {
        const data: GoodsItem[] = res.data;
        
        this.shopList = formatCartData(data);
      } else {
        throw new Error('Request failed');
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  // 改变商品数量
  changeGoodsCount (goodsInfo: {count: number, goods_id: string}):void {
    let { count, goods_id } = goodsInfo;
        
    this.shopList.forEach((shopInfo: ShopInfo) => {
      shopInfo.goods.forEach((goodsItem: GoodsItem) => {
        if (goodsItem.id === goods_id) {
          goodsItem.count = count;
        }
      });
    });
  }

  // 改变选择状态
  changeChecked (info: {field: string, id: string}): void {
    const { field, id } = info;

    switch (field) {
      case 'select-all':
        this.changeAllChecked();
        break;
      case 'select-shop':
        this.changeShopChecked(id);
        break;
      case 'select-item':
        this.changeItemChecked(id);
        break;
      default:
        break;
    }
  }

  // 改变商品的选中状态
  changeItemChecked (id: string): void {
    // 1. 先找出该商品所属的店铺
    const shopInfo = this.shopList.find((item: ShopInfo) => {
      return item.goods.some((i: GoodsItem) => i.id === id);
    });

    if (!shopInfo) {
      console.error('程序出错');
      return;
    }
    // 2. 找出该商品
    const goodsItem = shopInfo.goods.find((item: GoodsItem) => item.id === id);

    if (!goodsItem) {
      console.error('程序出错');
      return;
    }
    // 3. 修改商品状态
    goodsItem.is_checked = !goodsItem.is_checked;

    // 4. 商品状态修改后，需要检测店铺的选择状态
    shopInfo.is_checked = shopInfo.goods.every((item: GoodsItem) => item.is_checked);
  }

  // 改变店铺的选中状态
  changeShopChecked (id: string): void {
    const shopInfo = this.shopList.find((item: ShopInfo) => item.shop_id === id);

    if (!shopInfo) {
      console.error('程序出错！');
      return;
    }
    
    let status = !shopInfo.is_checked;

    // 1. 改变该商店下所有的商品的选中状态
    shopInfo.goods.forEach((item: GoodsItem) => {
      item.is_checked = status;
    });

    // 2. 修改店铺的被选中状态
    shopInfo.is_checked = status;
  }

  // 改变全选状态
  changeAllChecked (): void {
    const status: boolean = !this.selectedAll;

    this.shopList.forEach((shopInfo: ShopInfo) => {
      shopInfo.goods.forEach((goodsItem: GoodsItem) => goodsItem.is_checked = status);
      shopInfo.is_checked = status;
    });
  }

  // 删除选中的商品
  deleteSelected (): void {
    let ids = this.shopList.reduce((prev: string[], item: ShopInfo) => {
      return prev.concat(item.goods.reduce((p: string[], i: GoodsItem) => {
        if (i.is_checked) {
          p.push(i.id);
        }
        return p;
      }, []));
    }, []);

    if (ids.length <= 0) {
      alert('您还没有选中任何商品呢！');
      return;
    }

    if (!confirm('确认要删除吗？')) return;

    ids.forEach((id: string) => this.deleteItem(id));
  }

  // 删除商品
  deleteItem (id: string):void {
    // 1. 先找出该商品所属的店铺
    const shopInfo = this.shopList.find((item: ShopInfo) => {
      return item.goods.some((i: GoodsItem) => i.id === id);
    });

    if (!shopInfo) {
      console.error('程序出错');
      return;
    }
    // 2. 找出该商品的索引
    const goodsIndex: number = shopInfo.goods.findIndex((item: GoodsItem) => item.id === id);

    if (goodsIndex === -1) {
      console.error('程序出错');
      return;
    }

    // 3. 删除该项
    shopInfo.goods.splice(goodsIndex, 1);
    
    // 4. 检测店铺的商品列表是否为空，如为空则清除该店铺数据
    if (shopInfo.goods.length <= 0) {
      this.shopList = [...this.shopList.filter((item: ShopInfo) => item.shop_id != shopInfo.shop_id)];
    }
  }

  mounted (): void {
    this.getCartInfo();
    this.$bus.$on('changeGoodsCount', this.changeGoodsCount);
    this.$bus.$on('changeCheckd', this.changeChecked);
    this.$bus.$on('deleteItem', this.deleteItem);
    this.$bus.$on('deleteSelected', this.deleteSelected);
  }

  beforeDestory ():void {
    // this.$off('changeGoodsCount');
  }
}
</script>