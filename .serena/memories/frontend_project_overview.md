# Qiita User Frontend プロジェクト概要

## プロジェクトの目的
QiitaユーザーIDを入力してユーザー情報と投稿記事を表示するReact + Viteフロントエンドアプリケーションです。VoltAgentバックエンドAPI (`http://localhost:3141`) と連携して動作します。

## 主な機能
1. **Qiitaユーザー検索**: ユーザーIDを入力してユーザー情報を取得
2. **ユーザープロフィール表示**: プロフィール画像、名前、組織情報の表示
3. **統計情報表示**: フォロワー、フォロー、投稿数の表示
4. **レスポンシブデザイン**: モバイル・デスクトップ対応
5. **エラーハンドリング**: ユーザーが見つからない場合の適切な表示

## 技術スタック
- **フロントエンド**: React 18
- **言語**: TypeScript
- **ビルドツール**: Vite
- **開発サーバー**: Vite Dev Server
- **リンター/フォーマッター**: Biome
- **CSSフレームワーク**: カスタムCSS（レスポンシブ対応）

## 依存関係
### プロダクション依存関係
- `react`: React コア
- `react-dom`: React DOM レンダリング

### 開発依存関係
- `@biomejs/biome`: コード品質管理
- `@types/react`: React型定義
- `@types/react-dom`: React DOM型定義
- `@vitejs/plugin-react`: Vite React プラグイン
- `typescript`: TypeScriptコンパイラ
- `vite`: 高速ビルドツール

## API統合
- VoltAgentエージェントAPIエンドポイント: `http://localhost:3141/agents/main-agent/text`
- Vite Dev Serverが `/api` パスを自動的にバックエンドサーバーにプロキシ