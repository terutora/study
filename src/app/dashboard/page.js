// src/app/dashboard/page.js
export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>

      {/* 概要カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">今日の勉強時間</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-indigo-600">2時間30分</span>
            <span className="text-green-500 ml-2 text-sm">+45分</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">完了タスク</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-indigo-600">3/8</span>
            <span className="text-sm ml-2 text-gray-600">タスク</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">学習ストリーク</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-indigo-600">5</span>
            <span className="text-sm ml-2 text-gray-600">日連続</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 今日のタスク */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-4">今日のタスク</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>英語の単語を50個覚える</span>
              </div>
              <span className="text-sm text-gray-500">30分</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" checked />
                <span className="line-through text-gray-500">数学の問題集 P.23-25</span>
              </div>
              <span className="text-sm text-gray-500">45分</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>物理のレポート作成</span>
              </div>
              <span className="text-sm text-gray-500">2時間</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" checked />
                <span className="line-through text-gray-500">歴史の年表を確認</span>
              </div>
              <span className="text-sm text-gray-500">15分</span>
            </li>
          </ul>
          <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">すべてのタスクを表示 →</button>
        </div>

        {/* 最近のメモ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-4">最近のメモ</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <h3 className="font-medium">微分方程式の解き方</h3>
              <p className="text-sm text-gray-600 truncate">変数分離法の基本的な手順と例題について...</p>
              <span className="text-xs text-gray-500">2日前</span>
            </li>
            <li className="py-3">
              <h3 className="font-medium">英語の不規則動詞リスト</h3>
              <p className="text-sm text-gray-600 truncate">頻出する不規則動詞の一覧とその活用形...</p>
              <span className="text-xs text-gray-500">3日前</span>
            </li>
            <li className="py-3">
              <h3 className="font-medium">プログラミング - 配列操作</h3>
              <p className="text-sm text-gray-600 truncate">JavaScriptでの配列メソッドの使い方と実例...</p>
              <span className="text-xs text-gray-500">5日前</span>
            </li>
          </ul>
          <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">すべてのメモを表示 →</button>
        </div>
      </div>
    </div>
  );
}
