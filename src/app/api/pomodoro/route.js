// src/app/api/pomodoro/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { timerService } from "@/lib/supabase";

export async function GET(req) {
  try {
    // ユーザー認証を確認
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "認証されていません" }, { status: 401 });
    }

    // クエリパラメータから日付を取得
    const url = new URL(req.url);
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];

    // Supabaseからデータを取得
    const timerData = await timerService.getUserTimerData(userId, date);

    // データがない場合はデフォルト値を返す
    if (!timerData) {
      return NextResponse.json({
        userId,
        date,
        todayStudyTime: 0,
        todayPomodoros: 0,
        lastUpdated: new Date().toISOString(),
      });
    }

    // データをクライアント形式に変換して返す
    return NextResponse.json({
      userId,
      date,
      todayStudyTime: timerData.study_time_seconds,
      todayPomodoros: timerData.pomodoro_count,
      lastUpdated: timerData.updated_at,
    });
  } catch (error) {
    console.error("Error fetching pomodoro data:", error);
    return NextResponse.json({ error: "データの取得に失敗しました" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // ユーザー認証を確認
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "認証されていません" }, { status: 401 });
    }

    // リクエストボディからデータを取得
    const data = await req.json();

    // データを検証
    if (!data.todayStudyTime && data.todayStudyTime !== 0) {
      return NextResponse.json({ error: "学習時間は必須です" }, { status: 400 });
    }

    // 日付の取得（リクエストから、なければ今日の日付）
    const date = data.date || new Date().toISOString().split("T")[0];

    // Supabaseにデータを保存
    await timerService.saveTimerData(userId, date, data.todayStudyTime, data.todayPomodoros || 0);

    // 保存成功レスポンスを返す
    return NextResponse.json({
      success: true,
      userId,
      date,
      todayStudyTime: data.todayStudyTime,
      todayPomodoros: data.todayPomodoros || 0,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving pomodoro data:", error);
    return NextResponse.json({ error: "データの保存に失敗しました" }, { status: 500 });
  }
}

// 特定期間のデータ取得用エンドポイント（分析ページ用）
export async function PUT(req) {
  try {
    // ユーザー認証を確認
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "認証されていません" }, { status: 401 });
    }

    // リクエストボディからデータを取得
    const { startDate, endDate } = await req.json();

    // データを検証
    if (!startDate || !endDate) {
      return NextResponse.json({ error: "開始日と終了日は必須です" }, { status: 400 });
    }

    // Supabaseから期間データを取得
    const timerDataRange = await timerService.getTimerDataRange(userId, startDate, endDate);

    // データをクライアント形式に変換
    const formattedData = timerDataRange.map((item) => ({
      date: item.date,
      studyTime: item.study_time_seconds,
      pomodoros: item.pomodoro_count,
    }));

    return NextResponse.json({
      userId,
      startDate,
      endDate,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching pomodoro data range:", error);
    return NextResponse.json({ error: "データの取得に失敗しました" }, { status: 500 });
  }
}
