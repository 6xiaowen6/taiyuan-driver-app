import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, TrendingDown, Zap } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const CalculatePage = () => {
  const navigate = useNavigate();
  const { order, result, calculate, saveCurrentCalculation } = useAppData();
  const [calculated, setCalculated] = useState(Boolean(result));
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    await calculate();
    setLoading(false);
    setCalculated(true);
  };

  const current = result;

  return (
    <PageWrapper title="动态增收测算" showBack backPath="/order-edit">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>当前订单参数</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-blue">{order.mileage}km · {order.duration}分钟</span>
            <span className="badge-orange">{order.timeSlot}</span>
            <span className="badge-orange">{order.weather}</span>
            <span className="badge-green">{order.mileageRange}</span>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <div style={{ flex: 1, padding: "10px", background: "var(--blue-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原始收入</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)" }}>¥{order.income.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--red-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原始抽成</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--destructive)" }}>¥{order.commission.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--orange-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>抽成率</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--warning)" }}>{order.commissionRate}%</div>
            </div>
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>动态抽成计算因子</div>
            <button onClick={() => navigate("/rules")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "12px", display: "flex", alignItems: "center", gap: "2px" }}>
              <Info size={13} /> 规则说明
            </button>
          </div>

          {[
            { label: "基础抽成率", desc: "平台当前展示费率", value: `${order.commissionRate}%`, color: "var(--destructive)" },
            { label: "时段优化", desc: `${order.timeSlot} 时段优先降低抽成`, value: "-3% ~ -5%", color: "var(--success)" },
            { label: "里程优化", desc: `${order.mileageRange} 区间享受差异化测算`, value: "-2% ~ -4%", color: "var(--success)" },
            { label: "供需调节", desc: "结合太原城区热区需求动态平衡", value: "-1% ~ -3%", color: "var(--success)" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "var(--foreground)" }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>{item.desc}</div>
              </div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: item.color }}>{item.value}</span>
            </div>
          ))}

          {current && (
            <div style={{ marginTop: "10px", padding: "10px", background: "var(--green-light)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <TrendingDown size={16} color="var(--success)" />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>优化后抽成率</span>
              </div>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--success)" }}>{current.newRate}%</span>
            </div>
          )}
        </div>

        {!calculated && !loading && (
          <button className="btn-primary" onClick={handleCalculate} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Zap size={20} />
            一键计算增收金额
          </button>
        )}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={24} color="var(--primary)" className="animate-pulse" />
            </div>
            <span style={{ fontSize: "15px", color: "var(--muted-foreground)" }}>计算中...</span>
          </div>
        )}

        {calculated && current && (
          <>
            <div style={{ background: "var(--gradient-primary)", borderRadius: "16px", padding: "20px", marginBottom: "12px", textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: "6px" }}>本次预计增收金额</div>
              <div style={{ color: "white", fontSize: "40px", fontWeight: "700", lineHeight: "1.1" }}>+¥{current.increase.toFixed(2)}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "8px" }}>抽成率从 {current.originalRate}% 降至 {current.newRate}%</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "14px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>原到手</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>¥{current.originalTake.toFixed(2)}</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>新到手</div>
                  <div style={{ color: "rgba(18,201,142,1)", fontSize: "18px", fontWeight: "700" }}>¥{current.newTake.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{ flex: 1, height: "48px", borderRadius: "24px", border: "1.5px solid var(--primary)", background: "transparent", color: "var(--primary)", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}
                onClick={() => {
                  saveCurrentCalculation();
                  navigate("/history");
                }}
              >
                保存记录
              </button>
              <button
                style={{ flex: 1, height: "48px", borderRadius: "24px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
                onClick={() => navigate("/result")}
              >
                查看明细
              </button>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default CalculatePage;
