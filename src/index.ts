/**
 * 指定された文字列をリバースします。
 *
 * @param {string} text - リバースする文字列
 * @returns {string} リバースされた文字列
 */
export function reverseText(text: string): string {
  return text.split("").reverse().join("");
}
