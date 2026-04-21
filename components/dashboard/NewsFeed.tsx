interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: Date;
}

interface NewsFeedProps {
  news: NewsItem[];
}

const TYPE_ICONS: Record<string, string> = {
  WELCOME: "🎉",
  RECORD: "🏆",
  TRANSFER: "🔄",
  RETIRED_JERSEY: "👕",
  TROPHY: "🏆",
  INJURY: "🤕",
  RETIREMENT: "👋",
  HOF: "⭐",
  SPONSOR: "💰",
  NATIONAL_TEAM: "🌍",
  PROMOTION: "⬆️",
  RELEGATION: "⬇️",
};

export function NewsFeed({ news }: NewsFeedProps) {
  if (news.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Journal</h2>
        <div className="bg-white rounded-lg p-6 text-center text-gray-500 shadow-sm border border-gray-100">
          Aucune actualité pour le moment.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Journal ({news.length})
      </h2>
      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">
                {TYPE_ICONS[item.type] || "📰"}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
