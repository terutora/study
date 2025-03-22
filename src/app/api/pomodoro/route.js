// src/app/api/pomodoro/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// ここでデータベース接続を設定します（例: Supabase, MongoDB等）
// この例ではシンプルにするため、実際のDB接続は省略しています

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

    // ここで実際のデータベースからデータを取得
    // 今回はダミーデータを返します
    const studyData = {
      userId,
      date,
      todayStudyTime: 3600, // 1時間（秒単位）
      todayPomodoros: 4,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(studyData);
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

    // ここで実際のデータベースにデータを保存
    // 今回はダミーレスポンスを返します
    const savedData = {
      ...data,
      userId,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(savedData);
  } catch (error) {
    console.error("Error saving pomodoro data:", error);
    return NextResponse.json({ error: "データの保存に失敗しました" }, { status: 500 });
  }
}
