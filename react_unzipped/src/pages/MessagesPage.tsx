import { useState } from "react";
import { Bell } from "lucide-react";
import { TabBar } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const typeLabels = {
  policy: { label: "政策公告", color: "var(--destructive)", bg: "var(--red-light)" },
  discount: { label: "优惠推荐", color: "var(--success)", bg: "var(--green-light)" },
  system: { label: "系统通知", color: "var(--primary)", bg: "var(--blue-light)" },
};

const MessagesPage = () => {
  const { messages, markAllMessagesRead } = useAppData();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "全部" },
    { key: "policy", label: "公告" },
    { key: "discount", label: "优惠" },
    { key: "system", label: "系统" },
  ];

  const filtered = messages.filter((item) => activeTab === "all" || item.type === activeTab);
  const unreadCount = messages.filter((item) => item.unread).length;

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      <div style={{ background: "var(--gradient-header)", paddingBottom: "0" }}>
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <span style={{ color: "white", fontSize: "17px", fontWeight: "600" }}>消息通知</span>
          <button onClick={markAllMessagesRead} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontSize: "12px", cursor: "pointer" }}>
            全部已读
          </button>
        </div>

        {unreadCount > 0 && (
          <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF4D4F" }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>你有 {unreadCount} 条未读消息</span>
          </div>
        )}

        <div style={{ display: "flex", padding: "0 16px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", color: activeTab === tab.key ? "white" : "rgba(255,255,255,0.6)", fontWeight: activeTab === tab.key ? "600" : "400", fontSize: "14px", borderBottom: activeTab === tab.key ? "2px solid white" : "2px solid transparent" }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-scroll" style={{ height: "636px", overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((message) => {
            const typeInfo = typeLabels[message.type];
            return (
              <div key={message.id} style={{ background: "var(--card)", borderRadius: "14px", padding: "14px", position: "relative", boxShadow: message.unread ? "0 2px 12px rgba(27,108,242,0.1)" : "0 1px 6px rgba(0,0,0,0.04)", border: message.unread ? "1px solid var(--blue-light)" : "1px solid transparent" }}>
                {message.unread && <div style={{ position: "absolute", top: "14px", right: "14px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--destructive)" }} />}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: typeInfo.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "22px" }}>{message.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{message.title}</span>
                    <div style={{ marginTop: "4px" }}>
                      <span style={{ padding: "1px 8px", borderRadius: "4px", background: typeInfo.bg, color: typeInfo.color, fontSize: "11px", fontWeight: "500" }}>{typeInfo.label}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6", marginTop: "6px" }}>{message.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{message.time}</span>
                      <span style={{ fontSize: "12px", color: "var(--primary)", cursor: "pointer" }}>查看详情</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted-foreground)" }}>
            <Bell size={40} color="var(--muted-foreground)" style={{ margin: "0 auto 12px", display: "block" }} />
            <div>暂无相关消息</div>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};

export default MessagesPage;
