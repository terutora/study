// src/app/timer/page.js
"use client";

import { useState, useEffect, useRef } from "react";

export default function Timer() {
  // ポモドーロタイマーの状態
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25分（秒単位）
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60); // 5分
  const [longBreakTime, setLongBreakTime] = useState(15 * 60); // 15分
  const [currentMode, setCurrentMode] = useState("pomodoro"); // 'pomodoro', 'shortBreak', 'longBreak'
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [pomodoroGoal, setPomodoroGoal] = useState(4);

  // 総合タイマーの状態
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [todayStudyTime, setTodayStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [studyStartTime, setStudyStartTime] = useState(null);

  // 今日のポモドーロ回数とその学習時間
  const [todayPomodoros, setTodayPomodoros] = useState(0);
  const [pomodoroStudyTime, setPomodoroStudyTime] = useState(0);

  // トラッキングモード（手動かポモドーロか）
  const [trackingMode, setTrackingMode] = useState("manual"); // 'manual' または 'pomodoro'

  // タイマーの参照
  const timerRef = useRef(null);
  const studyTimerRef = useRef(null);

  // 音声通知
  const alarmSound = useRef(null);

  // 各タイマーに対応する時間
  const timeModes = {
    pomodoro: pomodoroTime,
    shortBreak: shortBreakTime,
    longBreak: longBreakTime,
  };

  // 現在のモードに対応するラベル
  const modeLabels = {
    pomodoro: "集中時間",
    shortBreak: "短い休憩",
    longBreak: "長い休憩",
  };

  // 現在のモードの色
  const modeColors = {
    pomodoro: "bg-red-600",
    shortBreak: "bg-green-600",
    longBreak: "bg-blue-600",
  };

  // 初期化時に Audio オブジェクトを作成
  useEffect(() => {
    if (typeof window !== "undefined") {
      alarmSound.current = new Audio("/alarm.mp3"); // 音声ファイルのパスを指定（publicディレクトリに配置）
    }
    return () => {
      clearInterval(timerRef.current);
      clearInterval(studyTimerRef.current);
    };
  }, []);

  // モード変更時にタイマーをリセット
  useEffect(() => {
    setTimeLeft(timeModes[currentMode]);
  }, [currentMode, pomodoroTime, shortBreakTime, longBreakTime]);

  // カウントダウンタイマーの処理
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            // 音声通知を再生
            if (alarmSound.current) {
              alarmSound.current.play().catch((e) => console.log("音声再生エラー:", e));
            }

            // タイマー終了時の処理
            if (currentMode === "pomodoro") {
              // ポモドーロが完了したら学習時間を加算
              const minutes = pomodoroTime / 60;
              setTotalStudyTime((prev) => prev + minutes * 60);
              setTodayStudyTime((prev) => prev + minutes * 60);
              setPomodoroStudyTime((prev) => prev + minutes * 60);

              // カウンターの問題修正: setCompletedPomodorosを1回だけ呼び出す
              const newCount = completedPomodoros + 1;
              setCompletedPomodoros(newCount);
              setTodayPomodoros((prev) => prev + 1);

              // Pomodoro完了数に応じて次のモードを決定
              if (newCount % pomodoroGoal === 0) {
                setCurrentMode("longBreak");
              } else {
                setCurrentMode("shortBreak");
              }
            } else if (currentMode === "longBreak") {
              // 修正: 長休憩後はカウンターをリセット
              setCompletedPomodoros(0);
              setCurrentMode("pomodoro");
            } else {
              // 短い休憩後は集中モードに戻る
              setCurrentMode("pomodoro");
            }

            // どのモードからどのモードに移行しても、2秒後に自動的にタイマーを開始
            setTimeout(() => {
              setIsRunning(true);
            }, 2000);

            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, currentMode, pomodoroGoal, pomodoroTime, completedPomodoros]);

  // ポモドーロと学習時間トラッキングの連携
  useEffect(() => {
    // ポモドーロの集中モードが実行中の場合のみ学習時間をカウント
    if (isRunning && currentMode === "pomodoro") {
      if (trackingMode !== "pomodoro") {
        setTrackingMode("pomodoro");
      }

      // 既存の手動トラッキングが動いていれば止める
      if (isStudying) {
        clearInterval(studyTimerRef.current);
      }

      // ポモドーロ専用のタイマーカウント（秒単位で加算）
      studyTimerRef.current = setInterval(() => {
        setTotalStudyTime((prev) => prev + 1);
        setTodayStudyTime((prev) => prev + 1);
      }, 1000);
    } else if (trackingMode === "pomodoro") {
      // ポモドーロが一時停止されたか、集中モード以外になった場合
      clearInterval(studyTimerRef.current);
    }

    return () => {
      if (trackingMode === "pomodoro") {
        clearInterval(studyTimerRef.current);
      }
    };
  }, [isRunning, currentMode, trackingMode, isStudying]);

  // 手動の勉強時間追跡（ポモドーロとは別）
  useEffect(() => {
    if (isStudying) {
      // 手動トラッキングモードに設定
      setTrackingMode("manual");

      // ポモドーロが実行中の場合は、手動トラッキングを開始しない
      if (isRunning && currentMode === "pomodoro") {
        return;
      }

      setStudyStartTime(Date.now());
      studyTimerRef.current = setInterval(() => {
        setTotalStudyTime((prev) => prev + 1);
        setTodayStudyTime((prev) => prev + 1);
      }, 1000);
    } else if (trackingMode === "manual") {
      // 手動トラッキングが停止された場合
      clearInterval(studyTimerRef.current);
    }

    return () => {
      if (trackingMode === "manual") {
        clearInterval(studyTimerRef.current);
      }
    };
  }, [isStudying, isRunning, currentMode, trackingMode]);

  // タイマーコントロール
  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timeModes[currentMode]);
  };

  const toggleStudyTimer = () => {
    // ポモドーロの集中モードが動いている場合は、手動トラッキングを開始しない
    if (isRunning && currentMode === "pomodoro") {
      alert("ポモドーロの集中モード中は手動トラッキングを開始できません。\nポモドーロ中は自動的に学習時間が記録されています。");
      return;
    }

    setIsStudying(!isStudying);
  };

  // 時間のフォーマット（秒→mm:ss）
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 長時間のフォーマット（秒→hh:mm:ss）
  const formatLongTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 設定時間の更新
  const updatePomodoroTime = (e) => {
    const time = parseInt(e.target.value) * 60;
    setPomodoroTime(time);
    if (currentMode === "pomodoro" && !isRunning) {
      setTimeLeft(time);
    }
  };

  const updateShortBreakTime = (e) => {
    const time = parseInt(e.target.value) * 60;
    setShortBreakTime(time);
    if (currentMode === "shortBreak" && !isRunning) {
      setTimeLeft(time);
    }
  };

  const updateLongBreakTime = (e) => {
    const time = parseInt(e.target.value) * 60;
    setLongBreakTime(time);
    if (currentMode === "longBreak" && !isRunning) {
      setTimeLeft(time);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">学習タイマー</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ポモドーロタイマー */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">ポモドーロタイマー</h2>

          <div className="mb-6">
            <div className="flex justify-center gap-4 mb-4">
              <button onClick={() => setCurrentMode("pomodoro")} className={`px-4 py-2 rounded-md ${currentMode === "pomodoro" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                集中
              </button>
              <button onClick={() => setCurrentMode("shortBreak")} className={`px-4 py-2 rounded-md ${currentMode === "shortBreak" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                短休憩
              </button>
              <button onClick={() => setCurrentMode("longBreak")} className={`px-4 py-2 rounded-md ${currentMode === "longBreak" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                長休憩
              </button>
            </div>

            <div className={`text-center p-8 rounded-full mx-auto w-60 h-60 flex flex-col items-center justify-center ${modeColors[currentMode]}`}>
              <div className="text-xs font-medium text-white/80 mb-1">{modeLabels[currentMode]}</div>
              <div className="text-5xl font-bold text-white">{formatTime(timeLeft)}</div>
              <div className="text-xs text-white/80 mt-2">
                完了: {completedPomodoros} / {pomodoroGoal}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {!isRunning ? (
                <button onClick={startTimer} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  開始
                </button>
              ) : (
                <button onClick={pauseTimer} className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                  一時停止
                </button>
              )}
              <button onClick={resetTimer} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                リセット
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">タイマー設定</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">集中時間（分）</label>
                <input type="number" min="1" max="60" value={pomodoroTime / 60} onChange={updatePomodoroTime} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={isRunning} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">短休憩（分）</label>
                <input type="number" min="1" max="30" value={shortBreakTime / 60} onChange={updateShortBreakTime} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={isRunning} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">長休憩（分）</label>
                <input type="number" min="1" max="60" value={longBreakTime / 60} onChange={updateLongBreakTime} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={isRunning} />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm text-gray-600 mb-1">長休憩までの回数</label>
              <input type="number" min="1" max="10" value={pomodoroGoal} onChange={(e) => setPomodoroGoal(parseInt(e.target.value))} className="w-24 px-3 py-2 border border-gray-300 rounded-md" disabled={isRunning} />
            </div>
          </div>
        </div>

        {/* 総合学習時間タイマー */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">総合学習時間</h2>

          <div className="mb-6 text-center">
            <div className="bg-indigo-100 p-6 rounded-lg mb-4">
              <div className="text-sm text-indigo-600 mb-1">今日の学習時間</div>
              <div className="text-4xl font-bold text-indigo-700">{formatLongTime(todayStudyTime)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">今日のポモドーロ</div>
                <div className="text-2xl font-bold text-gray-700">{todayPomodoros}回</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">ポモドーロ時間</div>
                <div className="text-2xl font-bold text-gray-700">
                  {Math.floor(pomodoroStudyTime / 3600)}時間
                  {Math.floor((pomodoroStudyTime % 3600) / 60)}分
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">累計学習時間</div>
              <div className="text-4xl font-bold text-gray-700">{formatLongTime(totalStudyTime)}</div>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={toggleStudyTimer} className={`px-6 py-3 rounded-md text-white ${isStudying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
              {isStudying ? "勉強を終了する" : "勉強を開始する"}
            </button>
          </div>

          {isStudying && (
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600 mb-1">勉強中...</div>
              <div className="text-xl font-medium">開始時間: {new Date(studyStartTime).toLocaleTimeString()}</div>
            </div>
          )}

          <div className="border-t mt-6 pt-4">
            <h3 className="font-medium mb-3">学習記録のヒント</h3>
            <div className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-800">
              <p>ポモドーロタイマーを使用すると、集中時間が自動的に学習時間として記録されます。休憩時間は計測されません。</p>
              <p className="mt-2">手動の「勉強を開始する」ボタンは、ポモドーロを使わない学習や、異なる学習方法を使用する場合に便利です。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
