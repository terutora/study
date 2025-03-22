// src/components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 仮の状態、後で認証システムと連携

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* ロゴ / ブランド名 */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                StudyTracker
              </Link>
            </div>
          </div>

          {/* ナビゲーションリンク - モバイルでは非表示 */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              ダッシュボード
            </Link>
            <Link href="/tasks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              タスク
            </Link>
            <Link href="/notes" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              メモ
            </Link>
            <Link href="/timer" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              タイマー
            </Link>
            <Link href="/analytics" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              分析
            </Link>
            <Link href="/rewards" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              リワード
            </Link>
          </div>

          {/* 右側のボタン */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)} className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                ログアウト
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link href="/auth/login" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50">
                  ログイン
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
