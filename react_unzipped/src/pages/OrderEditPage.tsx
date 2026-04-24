import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const TIME_SLOTS = ["早高峰", "晚高峰", "平峰", "夜间"] as const;
const WEATHERS = ["晴天", "小雨", "大雨", "雾天", "雪天"] as const;
const MILEAGE_RANGES = ["5km以内", "5-15km", "15-30km", "30km以上"] as const;

const OrderEditPage = () => {
  const navigate = useNavigate();
  const { order, updateOrder } = useAppData();

  const SelectRow = ({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) => (
    <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "8px" }}>{label}</div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${value === option ? "var(--primary)" : "var(--border)"}`, background: value === option ? "var(--blue-light)" : "transparent", color: value === option ? "var(--primary)" : "var(--muted-foreground)", fontSize: "13px", cursor: "pointer", fontWeight: value === option ? "600" : "400" }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const InputRow = ({ label, value, unit, onChange }: { label: string; value: string; unit: string; onChange: (value: string) => void }) => (
    <div style={{ display: "flex", alignItems: "center", padding: "13px 0", borderBottom: "1px solid var(--border)" }}>
      <span style={{ fontSize: "15px", color: "var(--foreground)", width: "80px", flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
        <input value={value} onChange={(event) => onChange(event.target.value)} style={{ width: "100px", textAlign: "right", background: "var(--input)", border: "1px solid var(--border)", borderRadius: "8px", padding: "6px 10px", fontSize: "15px", color: "var(--foreground)", outline: "none" }} />
        <span style={{ fontSize: "14px", color: "var(--muted-foreground)", width: "30px" }}>{unit}</span>
      </div>
    </div>
  );

  return (
    <PageWrapper title="编辑订单信息" showBack backPath="/ocr">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--blue-light)", borderRadius: "10px", padding: "10px 14px", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--primary)" }}>以下数据来自 OCR 识别，请核对后再进行收益测算。</span>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "0 16px", marginBottom: "12px" }}>
          <div style={{ padding: "14px 0 8px", fontSize: "14px", fontWeight: "600", color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>基础订单数据</div>
          <InputRow label="行驶里程" value={String(order.mileage)} unit="km" onChange={(value) => updateOrder({ mileage: Number(value) || 0 })} />
          <InputRow label="行驶时长" value={String(order.duration)} unit="分钟" onChange={(value) => updateOrder({ duration: Number(value) || 0 })} />
          <InputRow label="原始收入" value={String(order.income)} unit="元" onChange={(value) => updateOrder({ income: Number(value) || 0 })} />
          <InputRow label="平台抽成" value={String(order.commission)} unit="元" onChange={(value) => updateOrder({ commission: Number(value) || 0, commissionRate: Number((((Number(value) || 0) / Math.max(Number(order.income), 1)) * 100).toFixed(0)) })} />
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "0 16px 12px", marginBottom: "16px" }}>
          <div style={{ padding: "14px 0 8px", fontSize: "14px", fontWeight: "600", color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>补充信息（影响测算结果）</div>
          <SelectRow label="时段" value={order.timeSlot} options={TIME_SLOTS} onChange={(value) => updateOrder({ timeSlot: value as typeof order.timeSlot })} />
          <SelectRow label="天气" value={order.weather} options={WEATHERS} onChange={(value) => updateOrder({ weather: value as typeof order.weather })} />
          <SelectRow label="里程区间" value={order.mileageRange} options={MILEAGE_RANGES} onChange={(value) => updateOrder({ mileageRange: value as typeof order.mileageRange })} />
        </div>

        <div style={{ background: "var(--card)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "10px" }}>当前测算参数</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-blue">{order.mileage}km</span>
            <span className="badge-blue">{order.duration}分钟</span>
            <span className="badge-orange">{order.timeSlot}</span>
            <span className="badge-orange">{order.weather}</span>
            <span className="badge-green">{order.mileageRange}</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => navigate("/calculate")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          开始增收测算 <ChevronRight size={18} />
        </button>
      </div>
    </PageWrapper>
  );
};

export default OrderEditPage;
