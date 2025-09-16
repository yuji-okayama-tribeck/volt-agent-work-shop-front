# Qiita User Info Frontend

QiitaユーザーのAPI情報を表示するReact + Viteアプリケーション

## 機能

- QiitaユーザーIDを入力してユーザー情報を取得・表示
- ユーザープロフィール画像、名前、組織情報の表示
- フォロワー、フォロー、投稿数の統計表示
- レスポンシブデザイン対応

## 技術スタック

- React 18
- TypeScript
- Vite
- Biome (リンター/フォーマッター)

## セットアップ

### 依存関係のインストール

```bash
cd front
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは http://localhost:5173 で起動します。

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - 本番用ビルド
- `npm run preview` - ビルド済みアプリのプレビュー
- `npm run lint` - コードリンティング
- `npm run lint:fix` - リンティングエラーの自動修正
- `npm run typecheck` - TypeScript型チェック

## API統合

このアプリケーションは、VoltAgentのAPIエンドポイント（`http://localhost:3141`）と連携します。
Viteの開発サーバーは、`/api`パスを自動的にVoltAgentサーバーにプロキシします。

## 使い方

1. VoltAgentサーバー（agentディレクトリ）を起動
2. フロントエンドの開発サーバーを起動
3. ブラウザでQiitaユーザーIDを入力してユーザー情報を取得

## 注意事項

- VoltAgentのAPIレスポンス形式に応じて、`App.tsx`のAPIコール部分の調整が必要な場合があります
- API統合の詳細は、VoltAgentの実際のエンドポイント仕様に合わせて実装してください