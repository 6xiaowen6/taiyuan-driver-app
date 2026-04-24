import { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Shield, TrendingDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const faqItems = [
  {
    q: "动态抽成与传统固定抽成有什么区别？",
    a: "固定抽成无论时段和里程都按照同一比例扣费，而动态测算会结合时段、里程、天气和供需热度，让司机更直观看到订单收益变化。",
  },
  {
    q: "抽成比例最低可以降到多少？",
    a: "当前模型会根据订单情况动态测算，常见可优化到 10% 至 13% 区间，具体取决于订单时段、里程和天气条件。",
  },
  {
    q: "这个测算结果是平台官方结论吗？",
    a: "不是。页面展示的是基于公开规则和业务假设的测算结果，用于帮助司机理解收益结构，不代表任何平台的正式结算结果。",
  },
  {
    q: "太原地区为什么要做差异化测算？",
    a: "太原城区高峰、雨雪天气、热门商圈和机场周边会出现明显供需变化，差异化测算能更真实地反映司机在不同场景下的收益表现。",
  },
];

const policyItems = [
  "《网络预约出租汽车经营服务管理暂行办法》",
  "《关于维护新就业形态劳动者劳动保障权益的指导意见》",
  "《互联网平台落实主体责任指引》",
  "《关于促进平台经济规范健康发展的指导意见》",
];

const RulesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageWrapper title="抽成规则说明" showBack backPath="/home">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--gradient-header)", borderRadius: "16px", padding: "20px", marginBottom: "14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", bottom: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingDown size={22} color="rgba(18,201,142,1)" />
            </div>
            <div>
              <div style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>动态智能抽成机制</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>结合太原时段、里程与供需热度进行收益测算</div>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", lineHeight: "1.7" }}>
            传统固定抽成模式不区分时段和订单特征，动态测算则引入订单里程、天气、供需和热门区域等因子，让司机更清楚地理解每单收益波动来源。
          </p>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "4px", height: "18px", background: "var(--primary)", borderRadius: "2px" }} />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>计算逻辑说明</span>
          </div>

          <div style={{ background: "var(--muted)", borderRadius: "10px", padding: "14px", marginBottom: "12px", fontFamily: "monospace" }}>
            <div style={{ fontSize: "13px", color: "var(--primary)", marginBottom: "4px" }}>// 动态抽成率计算</div>
            <div style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: "1.8" }}>
              最终抽成率 = 基础抽成率
              <br />
              - 时段优化系数
              <br />
              - 里程优化系数
              <br />
              - 供需调节系数
              <br />
              - 天气调节系数
            </div>
          </div>

          {[
            { label: "时段优化", desc: "早晚高峰通常可下调 3% 至 5%，夜间和雨雪时段也会结合供需进行优化" },
            { label: "里程优化", desc: "中长途订单通常比短途订单拥有更明显的抽成优化空间" },
            { label: "供需调节", desc: "结合太原机场、长风商务区、南站等热区的订单供需情况动态测算" },
            { label: "天气调节", desc: "雨雪雾等天气下，司机出车成本和风险更高，模型会适度下调抽成" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", background: "var(--blue-light)", borderRadius: "8px", marginBottom: "6px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", fontSize: "11px", fontWeight: "700" }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Shield size={16} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>政策依据</span>
          </div>
          {policyItems.map((item) => (
            <div key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", marginTop: "6px", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: "1.6" }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={16} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>常见问题</span>
          </div>
          {faqItems.map((item, index) => (
            <div key={item.q} style={{ borderBottom: index < faqItems.length - 1 ? "1px solid var(--border)" : "none" }}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--foreground)", textAlign: "left", lineHeight: "1.5" }}>Q. {item.q}</span>
                {openFaq === index ? <ChevronDown size={16} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronRight size={16} color="var(--muted-foreground)" style={{ flexShrink: 0 }} />}
              </button>
              {openFaq === index && (
                <div style={{ padding: "0 16px 14px", background: "var(--blue-light)" }}>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>A. {item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default RulesPage;
