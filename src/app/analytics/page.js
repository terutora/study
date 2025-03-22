// src/app/analytics/page.js
"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

  // 円グラフ用の色
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

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

      {/* 学習時間・タスク数グラフ - rechartsバージョン */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">学習時間の推移</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "時間", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value} 時間`, "学習時間"]} />
                <Bar dataKey="time" name="学習時間" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">完了タスク数</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "タスク数", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value} 個`, "タスク数"]} />
                <Bar dataKey="tasks" name="タスク数" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 科目別の学習時間と円グラフ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">科目別の学習時間</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subjectData} dataKey="time" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} 時間`, "学習時間"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 時間帯別の学習効率 - 棒グラフに変更 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">時間帯別の学習効率</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeOfDayData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" orientation="left" label={{ value: "時間", angle: -90, position: "insideLeft" }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: "効率 (%)", angle: 90, position: "insideRight" }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="hours" name="学習時間" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="efficiency" name="効率" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 残りの部分は省略 - 元のコードと同じ */}
    </div>
  );
}
