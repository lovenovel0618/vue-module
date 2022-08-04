/**
 * 代碼格式化配置
 */
module.exports = {
  // 指定每個縮進級別的空格數
  tabWidth: 2,
  // 使用製表符而不是空格縮進行
  useTabs: false,
  // 在語句末尾打印分號
  semi: true,
  // 使用單引號而不是雙引號
  singleQuote: false,
  // 更改引用對象屬性的時間 可選值"<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 多行時盡可能打印尾隨逗號。 （例如，單行數組永遠不會出現逗號結尾。） 可選值"<none|es5|all>"，默認none
  trailingComma: "es5",
  // 在對象文字中的括號之間打印空格
  bracketSpacing: true,
  // 在單獨的箭頭函數參數周圍包括括號 always：(x) => x \ avoid：x => x
  arrowParens: "always",
  // 這兩個選項可用於格式化以給定字符偏移量（分別包括和不包括）開始和結束的代碼
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要寫文件開頭的 @prettier
  requirePragma: false,
  // 不需要自動在文件開頭插入 @prettier
  insertPragma: false,
  // 換行設置 always\never\preserve
  proseWrap: "never",
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: "css",
  // Vue文件腳本和样式標籤縮進
  vueIndentScriptAndStyle: false,
  // 換行符使用 lf 結尾是 可選值"<auto|lf|crlf|cr>"
  endOfLine: "lf",
};
