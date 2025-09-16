import type React from "react";
import type { QiitaUserResponse } from "./types";

interface QiitaUserCardProps {
	user: QiitaUserResponse;
}

// 簡単なMarkdownをHTMLに変換する関数
const convertMarkdownToHtml = (markdown: string): string => {
	return markdown
		// 見出し（### → h3, #### → h4）
		.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
		.replace(/^### (.+)$/gm, '<h3>$1</h3>')
		// 太字（**text** → <strong>text</strong>）
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		// 画像（![alt](url) → <img src="url" alt="alt" />）- リンクより先に処理
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100px; border-radius: 50%;" />')
		// リンク（[text](url) → <a href="url">text</a>）
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
		// リスト項目（- text → <li>text</li>）
		.replace(/^- (.+)$/gm, '<li>$1</li>')
		// 改行を<br>に変換
		.replace(/\n/g, '<br>')
		// li要素をulで囲む（簡易版）
		.replace(/(<li>.*?<\/li>(<br>)?)+/g, (match) => {
			const items = match.replace(/<br>/g, '');
			return `<ul>${items}</ul>`;
		});
};

export const QiitaUserCard: React.FC<QiitaUserCardProps> = ({ user }) => {
	const htmlContent = convertMarkdownToHtml(user.markdownText);
	
	return (
		<div className="user-card">
			<div 
				className="markdown-content"
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>
		</div>
	);
};
