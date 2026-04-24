import { useNavigate } from "react-router-dom";
import { Award, ChevronRight, LogOut, Settings } from "lucide-react";
import { TabBar } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, summary, user } = useAppData();

  const menuGroups = [
    {
      title: "我的记录",
      items: [
        { icon: "📒", label: "我的测算记录", badge: `${summary.totalCalculations}次`, path: "/history", iconBg: "var(--blue-light)" },
        { icon: "🎫", label: "我的优惠服务", badge: "太原专区", path: "/services", iconBg: "var(--orange-light)" },
      ],
    },
    {
      title: "帮助与反馈",
      items: [
        { icon: "❓", label: "使用帮助", badge: "", path: "/help", iconBg: "var(--green-light)" },
        { icon: "💬", label: "意见反馈", badge: "", path: "/feedback", iconBg: "var(--blue-light)" },
        { icon: "📑", label: "抽成规则说明", badge: "", path: "/rules", iconBg: "var(--orange-light)" },
      ],
    },
    {
      title: "账号与设置",
      items: [
        { icon: "⚙️", label: "设置", badge: "", path: "/settings", iconBg: "var(--muted)" },
        { icon: "ℹ️", label: "关于我们", badge: "", path: "/about", iconBg: "var(--blue-light)" },
      ],
    },
  ];

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      <div style={{ background: "var(--gradient-header)", paddingBottom: "20px" }}>
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <span style={{ color: "white", fontSize: "17px", fontWeight: "600" }}>我的</span>
          <button onClick={() => navigate("/settings")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Settings size={20} color="white" />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 20px 0" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>{user.nickname.slice(0, 1)}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontSize: "19px", fontWeight: "700" }}>{user.nickname}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "2px" }}>{user.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")} · {user.platform} · {user.city}</div>
            <button onClick={() => navigate("/profile-setup")} style={{ marginTop: "6px", padding: "3px 12px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: "12px", cursor: "pointer" }}>
              编辑资料
            </button>
          </div>
        </div>
      </div>

      <div style={{ margin: "0 16px", marginTop: "-16px", background: "white", borderRadius: "16px", padding: "16px", boxShadow: "0 4px 20px rgba(27,108,242,0.1)", display: "flex" }}>
        {[
          { label: "累计增收", value: `¥${summary.totalIncrease}`, color: "var(--success)" },
          { label: "测算次数", value: `${summary.totalCalculations}`, color: "var(--primary)" },
          { label: "今日增收", value: `¥${summary.todayIncrease}`, color: "var(--warning)" },
        ].map((item, index) => (
          <div key={item.label} style={{ flex: 1, textAlign: "center", borderRight: index < 2 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "4px" }}>{item.label}</div>
            <div style={{ fontSize: "19px", fontWeight: "700", color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "12px 16px 0", background: "var(--gradient-primary)", borderRadius: "14px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Award size={24} color="rgba(255,215,0,1)" />
          <div>
            <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>太原司机会员</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>继续测算并使用本地服务，解锁更多增收权益</div>
          </div>
        </div>
        <ChevronRight size={18} color="rgba(255,255,255,0.8)" />
      </div>

      <div className="page-scroll" style={{ height: "410px", overflowY: "auto", padding: "12px 16px 8px" }}>
        {menuGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "8px", paddingLeft: "4px" }}>{group.title}</div>
            <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden" }}>
              {group.items.map((item, index) => (
                <div key={item.label} onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", padding: "13px 16px", borderBottom: index < group.items.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "12px" }}>
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  </div>
                  <span style={{ flex: 1, fontSize: "15px", color: "var(--foreground)" }}>{item.label}</span>
                  {item.badge && <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600", marginRight: "8px", background: "var(--blue-light)", padding: "2px 8px", borderRadius: "10px" }}>{item.badge}</span>}
                  <ChevronRight size={16} color="var(--muted-foreground)" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{ width: "100%", height: "50px", borderRadius: "14px", background: "var(--card)", border: "none", color: "var(--destructive)", fontSize: "15px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "4px" }}
        >
          <LogOut size={18} color="var(--destructive)" />
          退出登录
        </button>
      </div>

      <TabBar />
    </div>
  );
};

export default ProfilePage;
