import type React from "react";
import { useState } from "react";
import QiitaUserCard from "./QiitaUserCard";

function App() {
	const [qiitaId, setQiitaId] = useState("");
	const [userInfo, setUserInfo] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUserInfo = async () => {
		if (!qiitaId.trim()) {
			setError("ユーザーIDを入力してください");

			return;
		}

		setLoading(true);
		setError(null);
		setUserInfo(null);

		try {
			const response = await fetch('http://localhost:3141/agents/main-agent/text', {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					input: `Qiita ID: ${qiitaId}`,
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
				try {
					// textがJSON文字列の場合はパースして表示
					const parsedData = JSON.parse(responseData.data.text);
					setUserInfo(parsedData);
				} catch (parseError) {
					// JSON パースに失敗した場合は文字列として表示
					setUserInfo(responseData.data.text);
				}
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
			else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "ユーザー情報の取得に失敗しました",);
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
						value={qiitaId}
						onChange={(e) => setQiitaId(e.target.value)}
						placeholder="QiitaユーザーID"
						disabled={loading}
					/>
					<button type="submit" disabled={loading || !qiitaId.trim()}>
						取得
					</button>
				</form>

				{loading && <div className="loading">ユーザー情報を取得中...</div>}

				{error && <div className="error">エラー: {error}</div>}

				{userInfo && <QiitaUserCard data={userInfo} />}
			</div>
		</div>
	);
}

export default App;
