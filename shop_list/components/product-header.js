// 商品ヘッダーコンポーネント
const productHeader = {
  template: `
  <div class="search">
    <div class="search__result">
      検索結果 <span class="search__count">{{count}}件</span>
    </div>
    <div class="search__condition">
      <input type="checkbox"
        v-bind:checked="check1"
        v-on:change="$emit('check1Changed')"> セール対象
      <input type="checkbox"
        v-bind:checked="check2"
        v-on:change="$emit('check2Changed')"> 送料無料
      <select class="search__order"
        v-bind:value="order"
        v-on:change="$emit('orderChanged', parseInt($event.target.value))">
        <option value="0">---並べ替え---</option>
        <option value="1">標準</option>
        <option value="2">安い順</option>
      </select>
    </div>
  </div>`,
  // コンポーネントが親から受け取るデータ
  props: ['count', 'check1', 'check2', 'order']
}
