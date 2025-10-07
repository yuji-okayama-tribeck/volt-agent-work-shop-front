# フロントエンド コードスタイルと規約

## TypeScript設定
- **ターゲット**: ES2020
- **モジュール**: ESNext (bundler mode)
- **JSX**: react-jsx
- **strict mode**: 有効
- **未使用変数/パラメータチェック**: 有効

## React開発規約
### コンポーネント定義
```typescript
// 関数コンポーネント（推奨）
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>...</div>;
};

// またはアロー関数
const ComponentName = ({ prop1, prop2 }: Props) => {
  return <div>...</div>;
};
```

### Props型定義
```typescript
interface ComponentProps {
  prop1: string;
  prop2?: number; // オプショナル
}
```

### 状態管理
```typescript
// useStateの型指定
const [state, setState] = useState<StateType>(initialValue);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## CSS規約
- **ファイル**: `src/index.css` にグローバルスタイル
- **クラス名**: kebab-case (`search-form`, `user-card`)
- **レスポンシブ**: モバイルファースト設計
- **CSS変数**: カスタムプロパティ使用推奨

## ファイル命名規約
- **コンポーネント**: PascalCase (`App.tsx`, `QiitaUserCard.tsx`)
- **スタイル**: kebab-case (`index.css`)
- **設定ファイル**: lowercase (`vite.config.ts`, `tsconfig.json`)

## コード品質ツール
- **リンター/フォーマッター**: Biome
- **設定**: プロジェクトルートの `.biomejs` 設定
- **自動修正**: `npm run lint:fix`

## API通信規約
```typescript
// fetch使用（async/await）
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

// エラーハンドリング
try {
  // API call
} catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('予期しないエラーが発生しました');
  }
}
```

## 日本語対応
- UIテキストは日本語
- エラーメッセージも日本語で表示
- コメントは日本語推奨