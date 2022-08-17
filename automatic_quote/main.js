// 自動見積コンポーネント
const app = Vue.createApp({
  data() {
    return {
      // 消費税率
      taxRate: 0.10,
      // 制作したいムービー
      movieType: '余興ムービー',
      // 基本料金（税抜）
      basePrice: 50000,
      // 割増料金
      addPrice1: 10000, // 納期まで3週間未満の場合
      addPrice2: 15000, // 納期まで2週間未満の場合
      addPrice3: 20000, // 納期まで1週間未満の場合
      addPrice4: 35000, // 納期まで3日以内の場合
      // オプション料金（税抜）
      optPrice: 0,
      // 合計金額（税抜）
      totalPrice: 0,
      // 挙式日（日付）
      wedding_date: '',
      // DVD納品希望日（日付）
      delivery_date: '',
      // オプション「BGM手配」
      opt1_check: false,  // true：利用する、false：利用しない
      opt1_price: 5000,   // 料金（税抜）
      // オプション「撮影」
      opt2_check: false,  // true：利用する、false：利用しない
      opt2_price: 5000,   // 料金（税抜）
      // オプション「DVD盤面印刷」
      opt3_check: false,  // true：利用する、false：利用しない
      opt3_price: 5000,   // 料金（税抜）
      // オプション「写真スキャニング」
      opt4_num: 0,        // 利用枚数
      opt4_price: 500,    // 料金（税抜）
    }
  },
  // メソッド
  methods: {
    // 日付をYYYY-MM-DDの書式で返すメソッド
    formatDate(dt) {
      return [
        dt.getFullYear(),
        ('00' + (dt.getMonth()+1)).slice(-2),
        ('00' + dt.getDate()).slice(-2)
      ].join('-');
    },
    // 税抜き金額を税込み金額に変換するメソッド
    incTax(untaxed) {
      return Math.floor(untaxed * (1 + this.taxRate));
    },
    // 日付の差を求めるメソッド
    getDateDiff(dateString1, dateString2) {
      // 日付を表す文字列から日付オブジェクトを生成
      const date1 = new Date(dateString1);
      const date2 = new Date(dateString2);
      // 2つの日付の差分（ミリ秒）を計算
      const diff  = date1.getTime() - date2.getTime();
      // 求めた差分（ミリ秒）を日付に変換
      // 差分÷(1000ミリ秒×60秒×60分×24時間)
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
  },
  // ウォッチャ
  watch: {
    // 挙式日
    wedding_date(newValue, oldValue) {
      // DVD納品希望日に、挙式日の1週間前の日付を設定
      const y = this.wedding_date.split('-')[0];
      const m = this.wedding_date.split('-')[1];
      const d = this.wedding_date.split('-')[2];
      const dt = new Date(y, m - 1, d);
      dt.setDate(dt.getDate() - 7);
      this.delivery_date = this.formatDate(dt);
    }
  },
  // 算出プロパティ
  computed: {
    // オプション「BGM手配」の税込金額
    taxedOpt1() {
      return this.incTax(this.opt1_price);
    },
    // オプション「撮影」の税込金額
    taxedOpt2() {
      return this.incTax(this.opt2_price);
    },
    // オプション「DVD盤面印刷」の税込金額
    taxedOpt3() {
      return this.incTax(this.opt3_price);
    },
    // オプション「写真スキャニング」の税込金額
    taxedOpt4() {
      return this.incTax(this.opt4_price);
    },
    // 基本料金（税込）
    taxedBasePrice() {
      // 割増料金
      let addPrice = 0;
      // 納期までの残り日数を計算
      const diff = this.getDateDiff(this.delivery_date, (new Date()).toLocaleString());
      // 割増料金を求める
      if (14 <= diff && diff < 21) {
        // 納期まで3週間未満の場合
        addPrice = this.addPrice1;
      }
      else if (7 <= diff && diff < 14) {
        // 納期まで2週間未満の場合
        addPrice = this.addPrice2;
      }
      else if (3 < diff && diff < 7) {
        // 納期まで1週間未満の場合
        addPrice = this.addPrice3;
      }
      else if (diff <= 3) {
        // 納期まで3日以内の場合
        addPrice = this.addPrice4;
      }
      // 基本料金（税込）を返す
      return this.incTax(this.basePrice + addPrice);
    },
    // オプション料金（税込）
    taxedOptPrice() {
      // オプション料金
      let optPrice = 0;
      // BGM手配
      if (this.opt1_check) { optPrice += this.opt1_price; }
      // 撮影
      if (this.opt2_check) { optPrice += this.opt2_price; }
      // DVD盤面印刷
      if (this.opt3_check) { optPrice += this.opt3_price; }
      // 写真スキャニング
      if (this.opt4_num === '') { this.opt4_num = 0; }
      optPrice += this.opt4_num * this.opt4_price;
      // オプション料金（税込）を返す
      return this.incTax(optPrice);
    },
    // 合計金額（税込）を返す算出プロパティ
    taxedTotalPrice() {
      // 基本料金（税込）とオプション料金（税込）の合計を返す
      return (this.taxedBasePrice + this.taxedOptPrice);
    },
    // 明日の日付
    tomorrow() {
      const dt = new Date();
      dt.setDate(dt.getDate() + 1);
      return this.formatDate(dt);
    }
  },
  // ライフサイクルフック
  created() {
    // 今日の日付を取得
    const dt = new Date();
    // 挙式日に2ヵ月後の日付を設定
    dt.setMonth(dt.getMonth() + 2);
    this.wedding_date = this.formatDate(dt);
    // DVD納品希望日に、挙式日の1週間前の日付を設定
    dt.setDate(dt.getDate() - 7);
    this.delivery_date = this.formatDate(dt);
  }
})
app.config.globalProperties.$filters = {
  // 数値を通貨書式「#,###,###」に変換するフィルター
  number_format(val) {
    return val.toLocaleString();
  }
}
const vm = app.mount('#app');
