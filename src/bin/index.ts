#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { reverseText } from "../index";

function main() {
  // `process.argv`は Node.js プロセスが実行されたときに渡されたコマンドライン引数を含む配列
  // `process.argv[0]` : Node.jsの実行ファイル(node)の絶対パス
  // `process.argv[1]` : 実行中スクリプトファイルのパス
  // `process.argv[2]以降 : ユーザーがスクリプト実行時に渡した引数
  const [, , subCommand, ...args] = process.argv;

  switch (subCommand) {
    case "reverse-console":
      reverseConsole(args);
      break;
    case "reverse-text":
      reverseTextFile(args);
      break;
    case "reverse-json":
      reverseJsonFile(args);
      break;
    default:
      console.error(
        "Unknown command. Use one of: reverse-console, reverse-text, reverse-json",
      );
      process.exit(1);
  }
}

/**
 * 指定した JSON ファイルに記載された文字列をリバースし、その結果を標準出力する。
 * @param args - コマンドライン引数。 args[0]: JSON ファイルのパス
 */
function reverseConsole(args: string[]): void {
  if (args.length < 1) {
    console.error("Usage: rext reverse-console <jsonFilePath>");
    process.exit(1);
  }

  const jsonFilePath = args[0];
  const jsonData = loadJsonFile(jsonFilePath);
  jsonData.texts.forEach((txt: string) => {
    console.log(`${txt} -> ${reverseText(txt)}`);
  });
}

/**
 * 指定した JSON ファイルに記載された文字列をリバースし、その結果をテキストファイルとして保存する。
 * @param args - コマンドライン引数。 args[0]: JSON ファイルのパス, args[1]: 出力ファイル名
 */
function reverseTextFile(args: string[]) {
  if (args.length < 2) {
    console.error("Usage: rext reverse-text <jsonFilePath> <outputFileName>");
    process.exit(1);
  }

  const jsonFilePath = args[0];
  const outputFileName = args[1];
  const jsonData = loadJsonFile(jsonFilePath);

  let output = "";
  jsonData.texts.forEach((txt: string) => {
    output += `${txt} -> ${reverseText(txt)}\n`;
  });

  const outputPath = path.join("reverse-output", `${outputFileName}.text`);
  fs.writeFileSync(outputPath, output);
  console.log(`Saved reversed text to ${outputPath}`);
}

/**
 * 指定した JSON ファイルに記載された文字列をリバースし、その結果を JSON ファイルとして保存する。
 * @param args - コマンドライン引数。 args[0]: JSON ファイルのパス, args[1]: 出力ファイル名
 */
function reverseJsonFile(args: string[]) {
  if (args.length < 2) {
    console.error("Usage: rext reverse-json <jsonFilePath> <outputFileName>");
    process.exit(1);
  }

  const jsonFilePath = args[0];
  const outputFileName = args[1];
  const jsonData = loadJsonFile(jsonFilePath);

  const reversedObject: Record<string, string> = {};
  jsonData.texts.forEach((txt: string) => {
    reversedObject[txt] = reverseText(txt);
  });

  const outputPath = path.join("reverse-output", `${outputFileName}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(reversedObject, null, 2));
  console.log(`Saved reversed JSON to ${outputPath}`);
}

/**
 * 指定したパスの JSON ファイルを読み込み、オブジェクトを返す。
 * @param filePath　- JSON ファイルのパス
 * @returns　JSONオブジェクト
 */
function loadJsonFile(filePath: string): Record<string, string[]> {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

main();
