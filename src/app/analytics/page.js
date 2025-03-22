// src/app/analytics/page.js
"use client";

import { useState } from "react";

export default function Analytics() {
  // 期間選択の状態
  const [period, setPeriod] = useState("week");

  // サンプルデータ
  const weeklyData = [
    { date: "3/17", time: 2.5, tasks: 4 },
    { date: "3/18", time: 3.0, tasks: 6 },
    { date: "3/19", time: 1.5, tasks: 3 },
    { date: "3/20", time: 4.0, tasks: 8 },
    { date: "3/21", time: 3.5, tasks: 7 },
    { date: "3/22", time: 2.0, tasks: 5 },
    { date: "3/23", time: 2.5, tasks: 6 },
  ];

  const monthlyData = [
    { date: "週1", time: 12.5, tasks: 25 },
    { date: "週2", time: 15.0, tasks: 32 },
    { date: "週3", time: 10.5, tasks: 22 },
    { date: "週4", time: 18.0, tasks: 36 },
  ];

  const yearlyData = [
    { date: "1月", time: 45, tasks: 90 },
    { date: "2月", time: 52, tasks: 105 },
    { date: "3月", time: 60, tasks: 120 },
    { date: "4月", time: 48, tasks: 96 },
    { date: "5月", time: 55, tasks: 110 },
    { date: "6月", time: 50, tasks: 100 },
    { date: "7月", time: 42, tasks: 84 },
    { date: "8月", time: 38, tasks: 76 },
    { date: "9月", time: 65, tasks: 130 },
    { date: "10月", time: 70, tasks: 140 },
    { date: "11月", time: 58, tasks: 116 },
    { date: "12月", time: 45, tasks: 90 },
  ];

  // 科目別の学習時間データ
  const subjectData = [
    { name: "数学", time: 12, percentage: 30 },
    { name: "英語", time: 10, percentage: 25 },
    { name: "物理", time: 8, percentage: 20 },
    { name: "化学", time: 6, percentage: 15 },
    { name: "歴史", time: 4, percentage: 10 },
  ];

  // 時間帯別の学習時間データ
  const timeOfDayData = [
    { time: "6-9時", hours: 5, efficiency: 80 },
    { time: "9-12時", hours: 10, efficiency: 90 },
    { time: "12-15時", hours: 8, efficiency: 75 },
    { time: "15-18時", hours: 12, efficiency: 85 },
    { time: "18-21時", hours: 15, efficiency: 70 },
    { time: "21-24時", hours: 7, efficiency: 60 },
  ];

  // 選択されたデータセット
  const getSelectedData = () => {
    switch (period) {
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      case "year":
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const selectedData = getSelectedData();

  // 学習時間の合計
  const totalTime = selectedData.reduce((sum, item) => sum + item.time, 0);

  // タスク数の合計
  const totalTasks = selectedData.reduce((sum, item) => sum + item.tasks, 0);

  // 平均学習時間
  const avgTime = totalTime / selectedData.length;

  // グラフの最大値（表示用）
  const maxTime = Math.max(...selectedData.map((item) => item.time)) * 1.2;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">学習データ分析</h1>

      {/* 期間選択 */}
      <div className="flex space-x-2 mb-8">
        <button onClick={() => setPeriod("week")} className={`px-4 py-2 rounded-md ${period === "week" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          週間
        </button>
        <button onClick={() => setPeriod("month")} className={`px-4 py-2 rounded-md ${period === "month" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          月間
        </button>
        <button onClick={() => setPeriod("year")} className={`px-4 py-2 rounded-md ${period === "year" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          年間
        </button>
      </div>

      {/* 概要データ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">総学習時間</h2>
          <div className="text-3xl font-bold text-indigo-600">{totalTime.toFixed(1)}時間</div>
          <div className="text-sm text-gray-500 mt-1">
            平均: {avgTime.toFixed(1)}時間/{period === "week" ? "日" : period === "month" ? "週" : "月"}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">完了タスク</h2>
          <div className="text-3xl font-bold text-indigo-600">{totalTasks}個</div>
          <div className="text-sm text-gray-500 mt-1">
            平均: {(totalTasks / selectedData.length).toFixed(1)}個/{period === "week" ? "日" : period === "month" ? "週" : "月"}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">効率</h2>
          <div className="text-3xl font-bold text-indigo-600">{(totalTasks / totalTime).toFixed(1)}</div>
          <div className="text-sm text-gray-500 mt-1">タスク/時間</div>
        </div>
      </div>

      {/* 学習時間グラフ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">学習時間の推移</h2>
          <div className="h-64 flex items-end space-x-2">
            {selectedData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">{item.time.toFixed(1)}h</div>
                <div className="w-full bg-indigo-500 rounded-t" style={{ height: `${(item.time / maxTime) * 100}%` }}></div>
                <div className="text-xs text-gray-500 mt-1">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 完了タスク数グラフ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">完了タスク数</h2>
          <div className="h-64 flex items-end space-x-2">
            {selectedData.map((item, index) => {
              const maxTasks = Math.max(...selectedData.map((item) => item.tasks)) * 1.2;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{item.tasks}</div>
                  <div className="w-full bg-green-500 rounded-t" style={{ height: `${(item.tasks / maxTasks) * 100}%` }}></div>
                  <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 科目別の学習時間 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">科目別の学習時間</h2>
          <div className="space-y-4">
            {subjectData.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{subject.name}</span>
                  <span>
                    {subject.time}時間 ({subject.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${subject.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 時間帯別の学習効率 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">時間帯別の学習効率</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left pb-2 text-sm font-medium text-gray-500">時間帯</th>
                <th className="text-left pb-2 text-sm font-medium text-gray-500">時間</th>
                <th className="text-left pb-2 text-sm font-medium text-gray-500">効率</th>
              </tr>
            </thead>
            <tbody>
              {timeOfDayData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2">{item.time}</td>
                  <td className="py-2">{item.hours}時間</td>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className={`h-2.5 rounded-full ${item.efficiency >= 80 ? "bg-green-600" : item.efficiency >= 70 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${item.efficiency}%` }}></div>
                      </div>
                      <span className="text-sm">{item.efficiency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 学習習慣分析 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium mb-4">学習習慣の分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">学習ストリーク</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-1">5日</div>
            <p className="text-sm text-gray-600">継続は力なり！毎日コツコツと学習を続けましょう。</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">最も効果的な学習時間</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-1">9-12時</div>
            <p className="text-sm text-gray-600">この時間帯の学習効率が最も高いようです。</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">ポモドーロ完了数</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-1">28回</div>
            <p className="text-sm text-gray-600">先週より3回増加しました。素晴らしい進歩です！</p>
          </div>
        </div>
      </div>

      {/* アドバイスセクション */}
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
        <h2 className="text-lg font-medium text-indigo-800 mb-4">学習アドバイス</h2>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>朝の9-12時の時間帯に集中的に学習すると効率が最も高いようです。可能であればこの時間帯に重要な学習タスクをスケジュールしましょう。</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>物理の学習時間が先週より減少しています。定期的に全科目をバランスよく学習することを心がけましょう。</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>学習ストリークを維持していますね！素晴らしいです。習慣化が進んでいます。</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>短時間（25分以下）の学習セッションが多いようです。もう少し長いセッション（40-50分）を試してみると、深い理解につながるかもしれません。</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
