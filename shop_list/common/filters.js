// カスタムフィルター
const customFilters = {
  // 数値を通貨書式「#,###,###」に変換するフィルター
  number_format(value) {
    return value.toLocaleString();
  }
}