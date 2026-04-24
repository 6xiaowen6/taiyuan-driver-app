import { useNavigate } from "react-router-dom";
import { Bell, Calculator, Camera, ChevronRight, MapPin, Tag, TrendingUp } from "lucide-react";
import { TabBar } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, summary } = useAppData();

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      <div
        style={{
          background: "var(--gradient-header)",
          paddingBottom: "24px",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <div style={{ width: "20px", height: "10px", border: "1.5px solid white", borderRadius: "2px", padding: "1px" }}>
              <div style={{ width: "12px", height: "6px", background: "white", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{user.nickname.slice(0, 1)}</span>
            </div>
            <div>
              <div style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{user.nickname}，下午好</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", display: "flex", alignItems: "center", gap: "3px" }}>
                <MapPin size={10} />
                {user.city} · {user.platform}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/messages")}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
          >
            <Bell size={18} color="white" />
            {summary.unreadCount > 0 && <div style={{ position: "absolute", top: "6px", right: "6px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--destructive)", border: "1.5px solid white" }} />}
          </button>
        </div>

        <div style={{ margin: "0 16px", background: "rgba(255,255,255,0.12)", borderRadius: "16px", padding: "16px", border: "1px solid rgba(255,255,255,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginBottom: "4px" }}>今日预计增收</div>
              <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>
                +<span style={{ color: "var(--accent)" }}>{summary.todayIncrease}</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>元</span>
              </div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginBottom: "4px" }}>累计增收总额</div>
              <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>
                <span style={{ color: "var(--accent)" }}>{summary.totalIncrease}</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>元</span>
              </div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginBottom: "4px" }}>测算次数</div>
              <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>
                <span style={{ color: "var(--accent)" }}>{summary.totalCalculations}</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>次</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-scroll" style={{ maxHeight: "548px", overflowY: "auto" }}>
        <div style={{ margin: "16px 16px 0", background: "var(--card)", borderRadius: "16px", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--foreground)" }}>核心功能</span>
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>快捷入口</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: "camera", label: "订单识别", sublabel: "拍照上传", path: "/ocr", iconBg: "var(--primary)", bg: "var(--blue-light)" },
              { icon: "calc", label: "增收测算", sublabel: "智能计算", path: "/calculate", iconBg: "var(--accent)", bg: "var(--green-light)" },
              { icon: "tag", label: "本地优惠", sublabel: "太原专享", path: "/services", iconBg: "var(--warning)", bg: "var(--orange-light)" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px", background: item.bg, borderRadius: "12px", border: "none", cursor: "pointer", gap: "6px" }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon === "camera" && <Camera size={22} color="white" />}
                  {item.icon === "calc" && <Calculator size={22} color="white" />}
                  {item.icon === "tag" && <Tag size={22} color="white" />}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{item.label}</span>
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{item.sublabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ margin: "12px 16px 0", background: "var(--gradient-primary)", borderRadius: "14px", padding: "16px", cursor: "pointer" }} onClick={() => navigate("/ocr")}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>一键识别订单截图</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>拍照或从相册选择 · 自动提取订单数据</div>
            </div>
            <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{ margin: "12px 16px 0", background: "var(--card)", borderRadius: "14px", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "4px", height: "16px", background: "var(--primary)", borderRadius: "2px" }} />
              <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--foreground)" }}>动态抽成规则简介</span>
            </div>
            <button onClick={() => navigate("/rules")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px", color: "var(--primary)", fontSize: "13px" }}>
              详情 <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "供需差异化", desc: "高峰时段优先降低抽成，鼓励多劳多得" },
              { label: "时段浮动", desc: "早晚高峰订单享受更低测算抽成" },
              { label: "里程区间", desc: "中长途订单有机会获得更优收益方案" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: "var(--blue-light)", borderRadius: "8px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={14} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--foreground)" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: "12px 16px 0", background: "var(--card)", borderRadius: "14px", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--foreground)" }}>常用服务</span>
            <button onClick={() => navigate("/services")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px", color: "var(--primary)", fontSize: "13px" }}>
              全部 <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: "flex" }}>
            {[
              { label: "充电优惠", icon: "⚡", badge: "省30%" },
              { label: "保险团购", icon: "🛡️", badge: "7折起" },
              { label: "车辆养护", icon: "🔧", badge: "8折起" },
              { label: "加油优惠", icon: "⛽", badge: "立省" },
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate("/services")}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", padding: "4px", borderRight: index < 3 ? "1px solid var(--border)" : "none" }}
              >
                <span style={{ fontSize: "24px" }}>{item.icon}</span>
                <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>{item.label}</span>
                <span className="badge-green" style={{ fontSize: "10px" }}>{item.badge}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: "20px" }} />
      </div>

      <TabBar />
    </div>
  );
};

export default HomePage;
