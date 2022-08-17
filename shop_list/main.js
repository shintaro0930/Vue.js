// アプリケーションのルートコンポーネント
const app = Vue.createApp({
  data() {
    return {
      // 商品リスト
      list: [
        { name: 'Michael<br>スマホケース', price: 1980, image: 'images/01.jpg', shipping: 0, isSale: true },
        { name: 'Raphael<br>スマホケース', price: 3980, image: 'images/02.jpg', shipping: 0, isSale: true },
        { name: 'Gabriel<br>スマホケース', price: 2980, image: 'images/03.jpg', shipping: 240, isSale: true },
        { name: 'Uriel<br>スマホケース', price: 1580, image: 'images/04.jpg', shipping: 0, isSale: true },
        { name: 'Ariel<br>スマホケース', price: 2580, image: 'images/05.jpg', shipping: 0, isSale: false },
        { name: 'Azrael<br>スマホケース', price: 1280, image: 'images/06.jpg', shipping: 0, isSale: false }
      ]
    }
  },
  // 子コンポーネントを登録する
  components: {
    'product-list': productList
  }
})

// アプリケーションにカスタムフィルターを登録する
app.config.globalProperties.$filters = customFilters;

// アプリケーションをマウントする
const vm = app.mount('#app');
