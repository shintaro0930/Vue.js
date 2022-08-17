// 商品一覧コンポーネント
const productList = {
  template: `
  <div class="container">
    <h1 class="title">商品一覧</h1>
    <!--検索欄-->
    <product-header
      v-bind:count="filteredList.length"
      v-bind:check1="check1"
      v-bind:check2="check2"
      v-bind:order="order"
      v-on:check1Changed="check1 =! check1"
      v-on:check2Changed="check2 =! check2"
      v-on:orderChanged="orderChanged"
    >
    </product-header>
    <!--商品一覧-->
    <div class="products">
      <product
        v-for="(item, index) in filteredList"
        v-bind:item="item"
        v-bind:id="(index + 1)"
        v-bind:key="index">
      </product>
    </div>
  </div>`,
  // コンポーネントが親から受け取るデータ
  props: ['list'],
  // 子コンポーネントを登録する
  components: {
    'product-header': productHeader,
    'product': product
  },
  // コンポーネントが持つデータ
  data() {
    return {
      // セール対象のチェック（true：有り、false：無し）
      check1: false,
      // 送料無料のチェック（true：有り、false：無し）
      check2: false,
      // ソート順（0：未選択、1：標準、2：安い順）
      order: 0
    }
  },
  methods: {
    // 「並び替え」の選択値が変わったとき呼び出されるメソッド
    orderChanged(order) {
      // 現在の選択値を新しい選択値で上書きする
      this.order = order;
    }
  },
  computed: {
    // 検索条件で絞り込んだリストを返す算出プロパティ
    filteredList() {
      // コンポーネントのインスタンスを取得
      const vm = this;
      // 商品の絞り込み
      const filteredList = this.list.filter(function(item){
        // 表示判定（true：表示する、false：表示しない）
        let show = true;
        // 検索条件：セール対象チェックあり
        if (vm.check1) {
          // セール対象外の商品なら表示対象外
          if (!item.isSale) {
            show = false;
          }
        }
        // 検索条件：送料無料チェックあり
        if (vm.check2) {
          // 送料がかかる商品なら表示対象外
          if (item.shipping !== 0) {
            show = false;
          }
        }
        // 表示判定を返す
        return show;
      });
      // 商品の並べ替え
      filteredList.sort(function(a,b){
        //「標準」が選択されている場合
        if (vm.order === 1) {
          // 元のlistと同じ順番なので何もしない
          return 0;
        }
        //「安い順」が選択されている場合
        else if (vm.order === 2) {
          // 価格が安い順にソート
          return a.price - b.price;
        }
      });
      // 商品リストを返す
      return filteredList;
    }
  }
}