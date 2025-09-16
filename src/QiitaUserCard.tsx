import type React from "react";

interface QiitaUser {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string | null;
  id: string;
  items_count: number;
  linkedin_id: string;
  location: string;
  name: string;
  organization: string;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string | null;
  website_url: string;
}

interface QiitaItem {
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: any;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags: Array<{
    name: string;
    versions: string[];
  }>;
  title: string;
  updated_at: string;
  url: string;
  user: QiitaUser;
  page_views_count: number;
  team_membership: any;
  organization_url_name: string;
  slide: boolean;
}

interface QiitaData {
  userInfo: QiitaUser;
  userItems: QiitaItem[];
}

interface QiitaUserCardProps {
  data: QiitaData | string;
}

const QiitaUserCard: React.FC<QiitaUserCardProps> = ({ data }) => {
  // 文字列の場合はそのまま表示
  if (typeof data === "string") {
    return (
      <div className="qiita-user-card">
        <pre>{data}</pre>
      </div>
    );
  }

  const { userInfo, userItems } = data;

  return (
    <div className="qiita-user-card">
      {/* ユーザー情報セクション */}
      <div className="user-info-section">
        <div className="user-header">
          <img
            src={userInfo.profile_image_url}
            alt={`${userInfo.name}のプロフィール画像`}
            className="profile-image"
          />
          <div className="user-details">
            <h2 className="user-name">{userInfo.name}</h2>
            <p className="user-id">@{userInfo.id}</p>
            {userInfo.organization && (
              <p className="organization">{userInfo.organization}</p>
            )}
            {userInfo.location && (
              <p className="location">📍 {userInfo.location}</p>
            )}
          </div>
        </div>

        {userInfo.description && (
          <div className="user-description">
            <h3>自己紹介</h3>
            <p>{userInfo.description}</p>
          </div>
        )}

        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-number">{userInfo.items_count}</span>
            <span className="stat-label">投稿</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userInfo.followers_count}</span>
            <span className="stat-label">フォロワー</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userInfo.followees_count}</span>
            <span className="stat-label">フォロー</span>
          </div>
        </div>

        {/* SNSリンク */}
        <div className="social-links">
          {userInfo.github_login_name && (
            <a
              href={`https://github.com/${userInfo.github_login_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              GitHub
            </a>
          )}
          {userInfo.twitter_screen_name && (
            <a
              href={`https://twitter.com/${userInfo.twitter_screen_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              Twitter
            </a>
          )}
          {userInfo.website_url && (
            <a
              href={userInfo.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link website"
            >
              Website
            </a>
          )}
        </div>
      </div>

      {/* 投稿記事セクション */}
      {userItems && userItems.length > 0 && (
        <div className="user-items-section">
          <h3>最近の投稿</h3>
          {userItems.map((item) => (
            <div key={item.id} className="item-card">
              <h4 className="item-title">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h4>
              
              <div className="item-meta">
                <span className="created-date">
                  {new Date(item.created_at).toLocaleDateString('ja-JP')}
                </span>
                <div className="item-stats">
                  <span>❤️ {item.likes_count}</span>
                  <span>📄 {item.stocks_count}</span>
                  <span>👀 {item.page_views_count}</span>
                  <span>💬 {item.comments_count}</span>
                </div>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="item-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QiitaUserCard;
