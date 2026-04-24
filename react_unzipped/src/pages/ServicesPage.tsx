import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { TabBar } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const categories = [
  { key: "all", label: "全部", icon: "📍" },
  { key: "charge", label: "充电", icon: "⚡" },
  { key: "insurance", label: "保险", icon: "🛡️" },
  { key: "repair", label: "养护", icon: "🔧" },
  { key: "fuel", label: "加油", icon: "⛽" },
  { key: "wash", label: "洗车", icon: "🚘" },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  热门: { bg: "var(--red-light)", text: "var(--destructive)" },
  推荐: { bg: "var(--green-light)", text: "var(--success)" },
  优惠: { bg: "var(--orange-light)", text: "var(--warning)" },
  新店: { bg: "var(--blue-light)", text: "var(--primary)" },
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const { services } = useAppData();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return services.filter((service) => activeCategory === "all" || service.category === activeCategory);
  }, [activeCategory, services]);

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      <div style={{ background: "var(--gradient-header)", paddingBottom: "16px" }}>
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <span style={{ color: "white", fontSize: "17px", fontWeight: "600" }}>优惠服务</span>
          <MapPin size={18} color="white" />
        </div>
        <div style={{ padding: "0 16px" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={14} color="rgba(255,255,255,0.8)" />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>山西太原 · 小店区 · 晋阳街 / 长风街周边</span>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--card)", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", overflowX: "auto", padding: "0 12px", gap: "8px", scrollbarWidth: "none" }}>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 12px", borderRadius: "10px", border: `1px solid ${activeCategory === category.key ? "var(--primary)" : "transparent"}`, background: activeCategory === category.key ? "var(--blue-light)" : "transparent", cursor: "pointer", flexShrink: 0 }}
            >
              <span style={{ fontSize: "20px" }}>{category.icon}</span>
              <span style={{ fontSize: "12px", color: activeCategory === category.key ? "var(--primary)" : "var(--muted-foreground)", fontWeight: activeCategory === category.key ? "600" : "400" }}>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="page-scroll" style={{ maxHeight: "594px", overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((service) => {
            const tag = tagColors[service.tag] ?? { bg: "var(--blue-light)", text: "var(--primary)" };
            return (
              <div key={service.id} onClick={() => navigate(`/service-detail?id=${service.id}`)} style={{ background: "var(--card)", borderRadius: "14px", padding: "14px", cursor: "pointer", boxShadow: "0 1px 8px rgba(27,108,242,0.06)" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "24px" }}>{service.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{service.name}</span>
                      <span style={{ padding: "2px 8px", borderRadius: "5px", background: tag.bg, color: tag.text, fontSize: "11px", fontWeight: "600", marginLeft: "6px" }}>{service.tag}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "6px" }}>{service.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--success)" }}>{service.discount}</span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={(event) => event.stopPropagation()} style={{ padding: "5px 10px", borderRadius: "8px", background: "var(--blue-light)", border: "none", color: "var(--primary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                          <MapPin size={11} /> 导航
                        </button>
                        <button onClick={(event) => event.stopPropagation()} style={{ padding: "5px 10px", borderRadius: "8px", background: "var(--green-light)", border: "none", color: "var(--success)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Phone size={11} /> 电话
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={11} /> {service.distance}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>🕒 {service.time}</span>
                  <span style={{ fontSize: "12px", color: "var(--warning)" }}>★ {service.rating} ({service.reviews}条评价)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default ServicesPage;
