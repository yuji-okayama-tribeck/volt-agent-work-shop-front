# フロントエンド コードベース構造

## ディレクトリ構成
```
volt-agent-work-shop-front/
├── src/
│   ├── App.tsx               # メインアプリケーションコンポーネント
│   ├── main.tsx              # React エントリーポイント
│   ├── QiitaUserCard.tsx     # Qiitaユーザー情報表示コンポーネント
│   ├── index.css             # グローバルスタイル
│   └── vite-env.d.ts         # Vite環境変数型定義
├── node_modules/             # 依存パッケージ
├── index.html                # HTML テンプレート
├── package.json              # プロジェクト設定と依存関係
├── tsconfig.json             # TypeScript設定（メイン）
├── tsconfig.node.json        # TypeScript設定（Node.js）
└── vite.config.ts           # Vite設定
```

## 主要ファイルの役割

### src/App.tsx
- メインアプリケーションコンポーネント
- 状態管理 (qiitaId, userInfo, loading, error)
- VoltAgentAPIとの通信処理
- フォーム送信処理とエラーハンドリング
- QiitaUserCardコンポーネントの呼び出し

### src/QiitaUserCard.tsx
- Qiitaユーザー情報表示専用コンポーネント
- TypeScript型定義 (QiitaUser, QiitaItem, QiitaData)
- ユーザープロフィール、統計、記事一覧の表示
- レスポンシブレイアウト

### src/main.tsx
- React アプリケーションのエントリーポイント
- DOM レンダリング設定

### vite.config.ts
- Vite設定ファイル
- React プラグイン設定
- プロキシ設定 (`/api` → `http://localhost:3141`)
- 開発サーバーポート設定 (5173)

## コンポーネント構造
```
App
├── フォーム (検索入力)
├── エラー表示
├── ローディング表示
└── QiitaUserCard (ユーザー情報表示)
    ├── ユーザープロフィール
    ├── 統計情報
    └── 記事一覧
```