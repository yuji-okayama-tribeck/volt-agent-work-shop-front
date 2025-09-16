import type React from "react";
import { useState } from "react";
import { QiitaUserCard } from "./QiitaUserCard";
import type { QiitaUserResponse } from "./types";

function App() {
	const [userId, setUserId] = useState("");
	const [user, setUser] = useState<QiitaUserResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUserInfo = async () => {
		if (!userId.trim()) {
			setError("ユーザーIDを入力してください");
			return;
		}

		setLoading(true);
		setError(null);
		setUser(null);

		try {
			const response = await fetch('http://localhost:3141/agents/qiita-agent/text', {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					input: `QiitaユーザーIDが"${userId}"のユーザー情報を取得してください。`,
					options: {
						userId: "unique-user-id",
						conversationId: "unique-conversation-id",
						contextLimit: 10,
						temperature: 0.7,
						maxTokens: 100,
					},
				}),
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();

			if (responseData.success && responseData.data && responseData.data.text) {
				// Markdownテキストをそのまま設定
				setUser({ markdownText: responseData.data.text });
			}
			// 失敗時のレスポンス（textに直接エラーメッセージが含まれる場合）
			else if (responseData.data && responseData.data.text) {
				// エラーメッセージかどうかを判定
				if (responseData.data.text.includes("見つかりませんでした") || 
					responseData.data.text.includes("正しいユーザーIDを確認")) {
					throw new Error(responseData.data.text);
				} else {
					throw new Error("予期しないレスポンス形式です");
				}
			}
			// その他の場合
			else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			console.error("Error fetching user info:", err);
			setError(
				err instanceof Error ? err.message : "ユーザー情報の取得に失敗しました",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchUserInfo();
	};

	return (
		<div className="app">
			<div className="container">
				<h1>Qiita User Info</h1>
				<p>QiitaユーザーIDを入力してユーザー情報を取得します</p>

			<form onSubmit={handleSubmit} className="search-form">
				<input
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					placeholder="QiitaユーザーID"
					disabled={loading}
				/>
				<button type="submit" disabled={loading || !userId.trim()}>
					{loading ? "取得中..." : "取得"}
				</button>
			</form>

			{loading && <div className="loading">ユーザー情報を取得中...</div>}

			{error && <div className="error">エラー: {error}</div>}

			{user && <QiitaUserCard user={user} />}
			</div>
		</div>
	);
}

export default App;
