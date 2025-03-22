// src/app/tasks/page.js
"use client";

import { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "英語の単語を50個覚える", description: "英検準1級の単語帳から", estimated: "30分", completed: false, priority: "medium", due: "2025-03-24", category: "英語" },
    { id: 2, title: "数学の問題集 P.23-25", description: "微分方程式の練習問題", estimated: "45分", completed: true, priority: "high", due: "2025-03-23", category: "数学" },
    { id: 3, title: "物理のレポート作成", description: "力学の法則について1000字程度", estimated: "2時間", completed: false, priority: "high", due: "2025-03-25", category: "物理" },
    { id: 4, title: "歴史の年表を確認", description: "江戸時代の重要な出来事", estimated: "15分", completed: true, priority: "low", due: "2025-03-22", category: "歴史" },
    { id: 5, title: "プログラミングの課題", description: "ReactでTodoアプリを作成する", estimated: "3時間", completed: false, priority: "medium", due: "2025-03-26", category: "プログラミング" },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    estimated: "",
    priority: "medium",
    due: "",
    category: "",
  });

  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
  const [showAddForm, setShowAddForm] = useState(false);

  const handleTaskToggle = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      estimated: "",
      priority: "medium",
      due: "",
      category: "",
    });
    setShowAddForm(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // 優先度に対応する色を返す関数
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 優先度に対応する日本語を返す関数
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "高";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">勉強タスク管理</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {showAddForm ? "キャンセル" : "新規タスク"}
        </button>
      </div>

      {/* 新規タスク追加フォーム */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-medium mb-4">新規タスクの追加</h2>
          <form onSubmit={handleAddTask}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイトル*</label>
                <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="タスクのタイトル" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                <input type="text" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="例: 数学、英語、物理" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">予定時間</label>
                <input type="text" value={newTask.estimated} onChange={(e) => setNewTask({ ...newTask, estimated: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="例: 30分、1時間" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">期日</label>
                <input type="date" value={newTask.due} onChange={(e) => setNewTask({ ...newTask, due: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">優先度</label>
                <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
              <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows="3" placeholder="タスクの詳細"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-700 mr-2">
                キャンセル
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                追加する
              </button>
            </div>
          </form>
        </div>
      )}

      {/* フィルタボタン */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          すべて
        </button>
        <button onClick={() => setFilter("active")} className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          未完了
        </button>
        <button onClick={() => setFilter("completed")} className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
          完了済み
        </button>
      </div>

      {/* タスクリスト */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タスク
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                予定時間
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                期日
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                優先度
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id} className={task.completed ? "bg-gray-50" : ""}>
                <td className="px-6 py-4">
                  <div className="flex items-start">
                    <input type="checkbox" checked={task.completed} onChange={() => handleTaskToggle(task.id)} className="mt-1 mr-3" />
                    <div>
                      <div className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>{task.title}</div>
                      {task.description && <div className="text-sm text-gray-500 mt-1">{task.description}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.category && <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">{task.category}</span>}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.estimated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.due}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>{getPriorityLabel(task.priority)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{task.completed ? "完了" : "進行中"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
