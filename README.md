# Advent

「おさむん家 Advent Calendar」のGoogleスプレッドシートマクロと簡単な記事一覧APIを提供するGoogle Apps Scriptです。

## Setup

```console
$ git clone https://github.com/osm-tc159/advent.git
$ cd advent
$ yarn install
```

## Push to GAS

```console
$ yarn push
```

コードがES5に変換されてGASへプッシュされます。

## Deploy API

Webからバージョンを作成し、新しいURLを発行してください。

## Note

スプレッドシートの共有設定により、このGASプロジェクトはWeb上で誰でも編集可能な状態にあります。必要に応じて `yarn pull` してください。
