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
						userId: "unique-user-id", // ユーザーごとに一意なIDを設定
						conversationId: "unique-conversation-id", // 会話ごとに一意なIDを設定
						temperature: 0.7, // 創造性の度合いを調整
						maxTokens: 1000, // 応答の最大トークン数
					},
				}),
			});

			const responseData = await response.json();

			if (responseData.success && responseData.data && responseData.data.text) {
				try {
					const parsedData = JSON.parse(responseData.data.text);

					if (parsedData.userInfo && parsedData.userInfo.type === "not_found") {
						throw new Error(`ユーザーID「${qiitaId}」は見つかりませんでした。正しいユーザーIDを確認してください。`);
					}

					setUserInfo(parsedData);
				} catch (parseError) {
					// parseError が Error インスタンスで、メッセージが「ユーザーが見つからない」系の場合はそのまま投げる
					if (parseError instanceof Error && parseError.message.includes("見つかりませんでした")) {
						throw parseError;
					}

					setUserInfo(responseData.data.text);
				}
			} else {
				throw new Error("server error");
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("予期しないエラーが発生しました");
			}
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
