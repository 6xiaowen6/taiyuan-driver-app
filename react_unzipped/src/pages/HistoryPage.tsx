import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, ChevronRight, TrendingUp } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { history, deleteHistoryRecord } = useAppData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("全部");

  const filters = ["全部", "今日", "本周", "本月"];

  const records = useMemo(() => {
    return history.filter((record) => {
      if (search) {
        return record.date.includes(search) || record.timeSlot.includes(search) || record.weather.includes(search);
      }
      return true;
    });
  }, [history, search]);

  const totalIncrease = records.reduce((sum, item) => sum + item.increase, 0);
  const avgIncrease = records.length > 0 ? (totalIncrease / records.length).toFixed(2) : "0.00";

  return (
    <PageWrapper title="历史测算记录" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--gradient-primary)", borderRadius: "14px", padding: "16px", marginBottom: "14px", display: "flex", gap: "0" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>累计增收</div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>¥{totalIncrease.toFixed(2)}</div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>测算次数</div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>{records.length}</div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>单次均值</div>
            <div style={{ color: "rgba(18,201,142,1)", fontSize: "22px", fontWeight: "700" }}>¥{avgIncrease}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "var(--card)", borderRadius: "10px", padding: "0 12px", height: "40px", gap: "8px", border: "1px solid var(--border)" }}>
            <Search size={16} color="var(--muted-foreground)" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索记录" style={{ background: "none", border: "none", outline: "none", flex: 1, fontSize: "14px", color: "var(--foreground)" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{ padding: "6px 16px", borderRadius: "20px", border: `1px solid ${filter === item ? "var(--primary)" : "var(--border)"}`, background: filter === item ? "var(--blue-light)" : "var(--card)", color: filter === item ? "var(--primary)" : "var(--muted-foreground)", fontSize: "13px", cursor: "pointer", fontWeight: filter === item ? "600" : "400" }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {records.map((record) => (
            <div key={record.id} style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", boxShadow: "0 1px 8px rgba(27,108,242,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>{record.date}</span>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    <span className="badge-blue">{record.mileage}km</span>
                    <span className="badge-orange">{record.timeSlot}</span>
                    <span className="badge-green">{record.weather}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                    <TrendingUp size={13} color="var(--success)" />
                    <span style={{ fontSize: "17px", fontWeight: "700", color: "var(--success)" }}>+¥{record.increase.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{record.originalRate}% → {record.newRate}%</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>原收入 <span style={{ color: "var(--foreground)", fontWeight: "500" }}>¥{record.income.toFixed(2)}</span></span>
                <div style={{ flex: 1 }} />
                <button onClick={() => deleteHistoryRecord(record.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                  <Trash2 size={16} color="var(--muted-foreground)" />
                </button>
                <button onClick={() => navigate("/result")} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                  <ChevronRight size={16} color="var(--primary)" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {records.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted-foreground)" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
            <div style={{ fontSize: "15px" }}>暂无测算记录</div>
            <button onClick={() => navigate("/ocr")} style={{ marginTop: "16px", background: "none", border: "none", color: "var(--primary)", fontSize: "14px", cursor: "pointer" }}>
              立即测算 →
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default HistoryPage;
