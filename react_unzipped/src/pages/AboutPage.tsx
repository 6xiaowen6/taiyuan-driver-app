import { ChevronRight, Shield } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const AboutPage = () => {
  return (
    <PageWrapper title="关于平台" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--gradient-header)", borderRadius: "20px", padding: "32px 20px", textAlign: "center", marginBottom: "16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <svg width="40" height="40" viewBox="0 0 54 54" fill="none">
              <path d="M14 38L20 24L27 32L33 20L40 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M27 16L30 22H24L27 16Z" fill="rgba(18,201,142,1)" />
              <circle cx="27" cy="27" r="3" fill="white" />
            </svg>
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: "700", letterSpacing: "3px" }}>益驾增收</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "6px" }}>服务山西太原网约车司机的轻量化收益工具</div>
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.15)", borderRadius: "20px", color: "white", fontSize: "12px" }}>v1.0.0</span>
            <span style={{ padding: "4px 12px", background: "rgba(18,201,142,0.3)", borderRadius: "20px", color: "rgba(18,201,142,1)", fontSize: "12px" }}>已认证</span>
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "18px", background: "var(--primary)", borderRadius: "2px" }} />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>平台介绍</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8" }}>
            益驾增收是一款面向网约车司机的收益分析与本地服务平台，聚焦订单识别、动态抽成测算、历史对比和本地优惠服务，让司机更清楚地了解每单收入结构。
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8", marginTop: "10px" }}>
            当前版本以山西太原为核心服务区域，围绕司机高频出车场景，整合 OCR 识别、收益测算和本地服务资源，帮助司机在日常运营中更高效地做出决策。
          </p>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Shield size={16} color="var(--success)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>合规说明</span>
          </div>
          {[
            "测算数据基于公开行业规则与页面录入数据生成，仅供收益分析参考。",
            "平台不替代任何网约车平台官方结算或账单展示。",
            "用户数据仅用于当前应用内展示与体验优化，不向第三方出售。",
            "平台将持续关注网约车行业相关规则和司机权益保障要求。",
          ].map((item) => (
            <div key={item} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
          {["用户服务协议", "隐私政策", "联系我们", "加入我们"].map((item, index) => (
            <div key={item} style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: index < 3 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
              <span style={{ flex: 1, fontSize: "15px", color: "var(--foreground)" }}>{item}</span>
              <ChevronRight size={16} color="var(--muted-foreground)" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "12px", lineHeight: "1.8" }}>
          <div>山西益驾科技有限公司</div>
          <div>地址：山西省太原市小店区晋阳街 84 号云水世纪明珠 A 座</div>
          <div>ICP备案：晋ICP备2026001234号</div>
          <div style={{ marginTop: "8px" }}>© 2026 益驾增收. All Rights Reserved.</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
