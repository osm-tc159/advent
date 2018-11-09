export type TuppledPostInfo = [
  number, // 〇〇日目
  string, // 日付 (UTC)
  string, // 書いた人
  string, // タイトル
  string  // URL
];

export interface IPost {
  author: string;
  date: string;
  day: number;
  title: string;
  url: string;
}

export function convertFromTuppled(tuppled: TuppledPostInfo): IPost {
  return {
    author: tuppled[2],
    date: tuppled[1],
    day: tuppled[0],
    title: tuppled[3],
    url: tuppled[4],
  };
}
