// 商品コンポーネント
const product = {
  template: `
  <div class="product">
    <div class="product__body">
      <template v-if="item.isSale">
        <div class="product__status">SALE</div>
      </template>
      <img class="product__image" v-bind:src="item.image" alt="">
    </div>
    <div class="product__detail">
      <div class="product__name" v-html="item.name"></div>
      <div class="product__price"><span>{{$filters.number_format(item.price)}}</span>円（税込）</div>
      <template v-if="item.shipping === 0">
        <div class="product__shipping">送料無料</div>
      </template>
      <template v-else>
        <div class="product__shipping">+送料<span>{{$filters.number_format(item.shipping)}}</span>円</div>
      </template>
    </div>
  </div>`,
  // コンポーネントが親から受け取るデータ
  props: ['item']
}