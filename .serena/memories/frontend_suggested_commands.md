# フロントエンド 開発コマンドと使用方法

## 主要なスクリプト

### 開発関連
```bash
# 開発サーバー起動（ホットリロード付き）
npm run dev
# → http://localhost:5173 で起動

# 本番用ビルド（TypeScript → JavaScript + 最適化）
npm run build

# ビルド済みアプリのプレビュー
npm run preview
```

### コード品質管理
```bash
# リント実行（チェックのみ）
npm run lint

# リント実行（自動修正付き）
npm run lint:fix

# TypeScript 型チェック（ビルドなし）
npm run typecheck
```

## セットアップ手順

### 1. 初期セットアップ
```bash
# プロジェクトディレクトリに移動
cd volt-agent-work-shop-front

# 依存関係インストール
npm install
```

### 2. 開発サーバー起動
```bash
npm run dev
```

### 3. バックエンド連携
フロントエンドが正常に動作するには、VoltAgentバックエンドサーバーが稼働している必要があります：
```bash
# 別ターミナルでバックエンドを起動
cd ../volt-agent-work-shop-agent
npm run dev
```

## 本番デプロイ
```bash
# 静的ファイル生成
npm run build

# dist/ フォルダが生成され、静的ホスティングサービスにデプロイ可能
```

## 開発時の注意事項
- バックエンドサーバー (`http://localhost:3141`) が起動していることを確認
- Viteプロキシ設定により `/api` パスが自動的にバックエンドに転送される
- TypeScriptの型チェックは別途実行が必要 (`npm run typecheck`)

## デバッグ
- ブラウザ開発者ツールでネットワークタブを確認
- VoltAgentコンソール (`console.voltagent.dev`) でバックエンドログを確認