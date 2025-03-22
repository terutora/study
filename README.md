# ディレクトリ構造

```plaintext
study/
├── .env.local                # 環境変数（実際の値）
├── .env.example              # 環境変数の例
├── middleware.js             # Clerk認証ミドルウェア
├── package.json              # プロジェクト依存関係
├── public/                   # 静的ファイル
│   └── alarm.mp3             # タイマー用アラーム音
├── src/
│   ├── app/
│   │   ├── analytics/
│   │   │   └── page.js       # 分析ページ
│   │   ├── api/
│   │   │   ├── pomodoro/
│   │   │   │   └── route.js  # ポモドーロデータAPI
│   │   │   └── webhook/
│   │   │       └── clerk/
│   │   │           └── route.js  # Clerkウェブフック
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.js   # サインインページ
│   │   │   └── signup/
│   │   │       └── page.js   # サインアップページ
│   │   ├── dashboard/
│   │   │   └── page.js       # ダッシュボードページ
│   │   ├── notes/
│   │   │   └── page.js       # メモページ
│   │   ├── rewards/
│   │   │   └── page.js       # リワードページ
│   │   ├── tasks/
│   │   │   └── page.js       # タスクページ
│   │   ├── timer/
│   │   │   └── page.js       # タイマーページ
│   │   ├── favicon.ico       # ファビコン
│   │   ├── globals.css       # グローバルスタイル
│   │   ├── layout.js         # ルートレイアウト
│   │   └── page.js           # ホームページ
│   ├── components/
│   │   ├── Navbar.js         # ナビゲーションバー
│   │   └── Sidebar.js        # サイドバー
│   └── lib/
│       └── supabase.js       # Supabase接続・ヘルパー関数
└── supabase/
    └── migrations/
        └── 00001_create_tables.sql  # テーブル作成SQL
```
