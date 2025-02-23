# AIにディベートさせるアプリ
<br>

## 概要
- LLMに議題を投げると、LLMが賛成・反対に分かれてディベートを行う
- 最後に審判役のLLMが勝敗を決める
<br>

## 開発の目的
- LLMに何か捻ったことをやらせてみること
- Webホスティングサービスを学んで実践すること
<br>

## 使用技術
|  |  |
| ---- | ---- |
| フロントエンド | Next.js, TypeScript |
| バックエンド | hono.js, TypeScript |
| インフラ | Cloudflare Workers (Webサーバー ＋ APIサーバー) |
| 外部API | Groq API（LLM） |
<br>

## 感想とコメント
- 全部無料でできた
- GroqのLLMが無料なのにとても高速
- hono.jsがCloudflare Workersと楽に連携するために作られたので、流石APIサーバーのデプロイが楽だった
- Cloudflare Workers × Next.jsは、環境変数の設定が難しい...
- Cloudflare Workersは、ある程度の機密を含むtomlファイルをGit管理する前提らしく、ちょっと怖い...
