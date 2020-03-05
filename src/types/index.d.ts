export interface GoodsItem {
  id: string,
  shop_info: {
    shop_id: string,
    shop_name: string
  },
  title: string,
  img: string,
  price: string,
  stock: number,
  count: number,
  is_checked: boolean
}

export interface ShopInfo {
  shop_id: string,
  shop_name: string,
  is_checked: boolean,
  goods: GoodsItem[]
}

export interface AddressItem {
  id: string,
  name: string,
  address: string,
  phone: string,
  postcode: string,
  is_default: boolean
}