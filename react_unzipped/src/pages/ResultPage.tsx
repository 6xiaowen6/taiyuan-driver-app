import { useNavigate } from "react-router-dom";
import { CheckCircle, RefreshCw, Share2, TrendingDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const ResultPage = () => {
  const navigate = useNavigate();
  const { order, result } = useAppData();

  if (!result) {
    navigate("/calculate");
    return null;
  }

  const percent = ((result.increase / Math.max(result.originalTake, 1)) * 100).toFixed(1);

  return (
    <PageWrapper title="增收结果明细" showBack backPath="/calculate">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--gradient-header)", borderRadius: "20px", padding: "24px 20px", marginBottom: "14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: "-30px", left: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(18,201,142,0.1)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <CheckCircle size={18} color="rgba(18,201,142,1)" />
            <span style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>测算完成 · 本单收益可提升</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginBottom: "6px" }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>本次增收</span>
            <span style={{ color: "rgba(18,201,142,1)", fontSize: "42px", fontWeight: "700", lineHeight: "1" }}>+¥{result.increase.toFixed(2)}</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>增收幅度 +{percent}% · 抽成率从 {result.originalRate}% 降至 {result.newRate}%</div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>
          <div style={{ padding: "12px 16px", background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>收入对比详情</span>
          </div>
          <div style={{ padding: "0 16px" }}>
            <div style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ flex: 2, fontSize: "13px", color: "var(--muted-foreground)" }}>项目</div>
              <div style={{ flex: 1.5, textAlign: "center", fontSize: "13px", color: "var(--destructive)", fontWeight: "500" }}>原方案</div>
              <div style={{ flex: 1.5, textAlign: "center", fontSize: "13px", color: "var(--success)", fontWeight: "500" }}>益驾方案</div>
              <div style={{ flex: 1.2, textAlign: "right", fontSize: "13px", color: "var(--primary)", fontWeight: "500" }}>变化</div>
            </div>

            {[
              { label: "总收入", original: `¥${result.originalIncome.toFixed(2)}`, next: `¥${result.originalIncome.toFixed(2)}`, change: "持平", color: "var(--muted-foreground)" },
              { label: "平台抽成", original: `¥${result.originalCommission.toFixed(2)}`, next: `¥${result.newCommission.toFixed(2)}`, change: `-¥${(result.originalCommission - result.newCommission).toFixed(2)}`, color: "var(--success)" },
              { label: "抽成比例", original: `${result.originalRate}%`, next: `${result.newRate}%`, change: `-${result.originalRate - result.newRate}%`, color: "var(--success)" },
              { label: "司机到手", original: `¥${result.originalTake.toFixed(2)}`, next: `¥${result.newTake.toFixed(2)}`, change: `+¥${result.increase.toFixed(2)}`, color: "var(--success)" },
            ].map((row, index) => (
              <div key={row.label} style={{ display: "flex", padding: "12px 0", borderBottom: index < 3 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                <div style={{ flex: 2, fontSize: "14px", color: "var(--foreground)" }}>{row.label}</div>
                <div style={{ flex: 1.5, textAlign: "center", fontSize: "14px", color: "var(--destructive)" }}>{row.original}</div>
                <div style={{ flex: 1.5, textAlign: "center", fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>{row.next}</div>
                <div style={{ flex: 1.2, textAlign: "right", fontSize: "13px", fontWeight: "600", color: row.color }}>{row.change}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <TrendingDown size={16} color="var(--success)" />
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>抽成优化明细</span>
          </div>
          {[
            { label: `时段优化（${order.timeSlot}）`, value: `-${result.timeBonus.toFixed(1)}%` },
            { label: `里程优化（${order.mileageRange}）`, value: `-${result.mileageBonus.toFixed(1)}%` },
            { label: `天气调节（${order.weather}）`, value: `-${result.weatherBonus.toFixed(1)}%` },
            { label: "供需调节", value: `-${result.demandBonus.toFixed(1)}%` },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "var(--green-light)", borderRadius: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "var(--foreground)" }}>{item.label}</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--success)" }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "12px 16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "8px" }}>订单信息</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-blue">{order.mileage}km</span>
            <span className="badge-blue">{order.duration}分钟</span>
            <span className="badge-orange">{order.timeSlot}</span>
            <span className="badge-orange">{order.weather}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button style={{ flex: 1, height: "48px", borderRadius: "24px", border: "1.5px solid var(--primary)", background: "transparent", color: "var(--primary)", fontSize: "15px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <Share2 size={16} /> 分享结果
          </button>
          <button onClick={() => navigate("/ocr")} style={{ flex: 1, height: "48px", borderRadius: "24px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <RefreshCw size={16} /> 再次测算
          </button>
        </div>

        <button onClick={() => navigate("/history")} style={{ width: "100%", background: "none", border: "none", color: "var(--primary)", fontSize: "14px", cursor: "pointer", padding: "8px" }}>
          查看历史测算记录 →
        </button>
      </div>
    </PageWrapper>
  );
};

export default ResultPage;
