// src/app/notes/page.js
"use client";

import { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "微分方程式の解き方",
      content: "# 変数分離法の基本的な手順\n\n1. 方程式を dx と dy に分ける\n2. 両辺を積分する\n3. 積分定数を求める\n\n## 例題\ndy/dx = y の場合：\n\n1. dy/y = dx\n2. ln|y| = x + C\n3. y = Ce^x\n\n基本的な例だが、多くの微分方程式の基礎となる。",
      tags: ["数学", "微分方程式"],
      createdAt: "2025-03-21T12:00:00Z",
      updatedAt: "2025-03-21T12:00:00Z",
    },
    {
      id: 2,
      title: "英語の不規則動詞リスト",
      content:
        "# 頻出する不規則動詞\n\n| 原形 | 過去形 | 過去分詞 |\n|------|------|--------|\n| be | was/were | been |\n| begin | began | begun |\n| break | broke | broken |\n| bring | brought | brought |\n| buy | bought | bought |\n| come | came | come |\n| do | did | done |\n| drink | drank | drunk |\n| eat | ate | eaten |\n| find | found | found |\n\n覚えるコツ：グループに分けて覚える。例えば、過去形と過去分詞が同じもの、母音が変化するものなど。",
      tags: ["英語", "文法"],
      createdAt: "2025-03-20T15:30:00Z",
      updatedAt: "2025-03-20T15:30:00Z",
    },
    {
      id: 3,
      title: "JavaScriptでの配列操作",
      content:
        "# 配列メソッドのチートシート\n\n## 追加・削除\n- push(): 末尾に追加\n- pop(): 末尾から削除\n- unshift(): 先頭に追加\n- shift(): 先頭から削除\n\n## 変換\n- map(): 各要素を変換した新しい配列を作成\n- filter(): 条件に合う要素だけの新しい配列を作成\n- reduce(): 配列を単一の値に集約\n\n## 例\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]\nconst evens = numbers.filter(n => n % 2 === 0); // [2, 4]\nconst sum = numbers.reduce((acc, n) => acc + n, 0); // 15\n```",
      tags: ["プログラミング", "JavaScript"],
      createdAt: "2025-03-18T09:15:00Z",
      updatedAt: "2025-03-18T10:20:00Z",
    },
  ]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote({
      title: "",
      content: "",
      tags: "",
    });
    setShowAddForm(false);
  };

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();
    return note.title.toLowerCase().includes(search) || note.content.toLowerCase().includes(search) || note.tags.some((tag) => tag.toLowerCase().includes(search));
  });

  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // マークダウンの簡易レンダリング
  const renderMarkdown = (text) => {
    // 見出し
    let html = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>');

    // リスト
    html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-5 list-decimal">$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li class="ml-5 list-disc">$1</li>');

    // 段落
    html = html.replace(/^(?!<h|<li)(.*$)/gm, function (match) {
      return match.trim() ? '<p class="my-2">' + match + "</p>" : "<br>";
    });

    // コードブロック（簡易）
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 my-3 rounded overflow-x-auto"><code>$1</code></pre>');

    // テーブル（簡易）
    if (html.includes("|")) {
      const lines = html.split("\n");
      let tableHTML = '<div class="overflow-x-auto my-4"><table class="min-w-full border border-gray-300">';
      let inTable = false;

      for (let line of lines) {
        if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
          if (!inTable) {
            inTable = true;
            tableHTML += "<thead><tr>";

            // ヘッダー行
            const headerCells = line.split("|").filter((cell) => cell.trim() !== "");
            for (let cell of headerCells) {
              tableHTML += `<th class="px-4 py-2 border border-gray-300 bg-gray-100">${cell.trim()}</th>`;
            }
            tableHTML += "</tr></thead><tbody>";
          } else if (line.includes("---")) {
            // 区切り行はスキップ
            continue;
          } else {
            // データ行
            tableHTML += "<tr>";
            const cells = line.split("|").filter((cell) => cell.trim() !== "");
            for (let cell of cells) {
              tableHTML += `<td class="px-4 py-2 border border-gray-300">${cell.trim()}</td>`;
            }
            tableHTML += "</tr>";
          }
        } else if (inTable) {
          inTable = false;
          tableHTML += "</tbody></table></div>";
          // テーブル以外の内容を追加
          if (!line.includes("<")) {
            tableHTML += line;
          }
        }
      }

      if (inTable) {
        tableHTML += "</tbody></table></div>";
      }

      // テーブル部分だけ置換
      const tableStart = html.indexOf("|");
      const tableEnd = html.lastIndexOf("|");
      if (tableStart !== -1 && tableEnd !== -1) {
        const beforeTable = html.substring(0, tableStart);
        const afterTable = html.substring(tableEnd + 1);
        html = beforeTable + tableHTML + afterTable;
      }
    }

    return html;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">学習メモ</h1>
        <button
          onClick={() => {
            setSelectedNote(null);
            setShowAddForm(!showAddForm);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "キャンセル" : "新規メモ"}
        </button>
      </div>

      {/* 検索バー */}
      <div className="mb-6">
        <div className="relative">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md" placeholder="メモを検索..." />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* メモリスト */}
        <div className={`w-full ${selectedNote || showAddForm ? "md:w-1/3" : "md:w-full"}`}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredNotes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">メモが見つかりません</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredNotes.map((note) => (
                  <li
                    key={note.id}
                    className={`cursor-pointer hover:bg-gray-50 ${selectedNote?.id === note.id ? "bg-indigo-50" : ""}`}
                    onClick={() => {
                      setSelectedNote(note);
                      setShowAddForm(false);
                    }}
                  >
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                        <span className="text-xs text-gray-500">{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 line-clamp-2">{note.content.split("\n")[0].replace(/^#+ /, "")}</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* メモ追加フォーム */}
        {showAddForm && (
          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">新規メモ</h2>
              <form onSubmit={handleAddNote}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイトル*</label>
                  <input type="text" required value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="メモのタイトル" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">内容* (マークダウン対応)</label>
                  <textarea
                    required
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
                    rows="12"
                    placeholder="# 見出し1&#10;## 見出し2&#10;- リスト項目&#10;1. 番号付きリスト&#10;```&#10;コードブロック&#10;```"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">タグ (カンマ区切り)</label>
                  <input type="text" value={newNote.tags} onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="数学, 英語, プログラミング" />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-700 mr-2">
                    キャンセル
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    保存する
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* メモ詳細 */}
        {selectedNote && !showAddForm && (
          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
                <div className="text-sm text-gray-500">
                  <div>作成: {formatDate(selectedNote.createdAt)}</div>
                  <div>更新: {formatDate(selectedNote.updatedAt)}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {selectedNote.tags.map((tag, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-indigo max-w-none border-t pt-4">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedNote.content) }} />
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => setSelectedNote(null)} className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
