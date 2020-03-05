import { ShopInfo, GoodsItem } from '../types/index';

export function formatCartData (data: GoodsItem[]): ShopInfo[] {
  let temp: ShopInfo[] = [];

  data.forEach((item: GoodsItem) => {
    const shop_id: string = item.shop_info.shop_id,
          idx: number = temp.findIndex((i) => i.shop_id === shop_id);

    if (idx === -1) {
      // 初始化某店铺
      temp.push({
        shop_id: shop_id,
        shop_name: item.shop_info.shop_name,
        is_checked: item.is_checked,
        goods: [item]
      });
    } else {
      temp[idx].goods.push(item);
      // 更新店铺选中状态
      if (temp[idx].is_checked && !item.is_checked) {
        temp[idx].is_checked = true;
      }
    }
  });

  return temp;
}