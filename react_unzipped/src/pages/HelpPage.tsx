import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calculator, Camera, ChevronDown, ChevronRight } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const helpSections = [
  {
    title: "如何使用 OCR 识别",
    icon: "📷",
    color: "var(--blue-light)",
    steps: [
      { step: 1, title: "进入订单识别页", desc: "点击首页的订单识别入口，上传太原地区平台订单截图。" },
      { step: 2, title: "选择截图来源", desc: "可以现场拍照，也可以从手机相册中选择已经保存的订单截图。" },
      { step: 3, title: "等待 AI 提取", desc: "系统会自动提取里程、时长、收入和抽成等关键字段，通常 1 到 3 秒完成。" },
      { step: 4, title: "确认并修改", desc: "识别后可手动修正数据，再进入收益测算流程。" },
    ],
  },
  {
    title: "如何看懂增收测算",
    icon: "📊",
    color: "var(--green-light)",
    steps: [
      { step: 1, title: "核对订单参数", desc: "先确认里程、时长、时段、天气等参数是否正确。" },
      { step: 2, title: "查看计算因子", desc: "系统会展示时段、里程、供需和天气四类优化因子。" },
      { step: 3, title: "执行一键测算", desc: "点击一键测算后，系统会基于当前订单给出优化后收益。" },
      { step: 4, title: "保存历史记录", desc: "测算完成后可以保存记录，方便后续对比分析。" },
    ],
  },
];

const faqItems = [
  { q: "为什么识别结果不准确？", a: "请确保截图清晰、无遮挡，并且完整展示金额、里程、时长等关键信息。" },
  { q: "支持哪些网约车平台截图？", a: "当前支持滴滴、T3、高德、曹操等主流平台页面，后续还会继续扩展。" },
  { q: "测算结果可以作为维权依据吗？", a: "页面结果主要用于收益分析和自我对比，不替代平台官方账单或法律证据。" },
  { q: "历史记录会保存多久？", a: "当前会长期保存在本地数据中，除非你主动删除。" },
];

const HelpPage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageWrapper title="使用帮助" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
          <button style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <Camera size={24} color="var(--primary)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>OCR识别</span>
          </button>
          <button style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <Calculator size={24} color="var(--success)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>收益测算</span>
          </button>
          <button onClick={() => navigate("/rules")} style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <BookOpen size={24} color="var(--warning)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>规则说明</span>
          </button>
        </div>

        <div style={{ marginBottom: "14px" }}>
          {helpSections.map((section, index) => (
            <div key={section.title} style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "10px" }}>
              <button onClick={() => setOpenSection(openSection === index ? null : index)} style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: section.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "18px" }}>{section.icon}</span>
                </div>
                <span style={{ flex: 1, fontSize: "15px", fontWeight: "600", color: "var(--foreground)", textAlign: "left" }}>{section.title}</span>
                {openSection === index ? <ChevronDown size={16} color="var(--primary)" /> : <ChevronRight size={16} color="var(--muted-foreground)" />}
              </button>
              {openSection === index && (
                <div style={{ padding: "0 16px 14px", borderTop: "1px solid var(--border)" }}>
                  {section.steps.map((step) => (
                    <div key={step.step} style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", color: "white", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step.step}</div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "3px" }}>{step.title}</div>
                        <div style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)", marginBottom: "10px", paddingLeft: "4px" }}>常见问题 FAQ</div>
          <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden" }}>
            {faqItems.map((item, index) => (
              <div key={item.q} style={{ borderBottom: index < faqItems.length - 1 ? "1px solid var(--border)" : "none" }}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} style={{ width: "100%", padding: "13px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "14px", color: "var(--foreground)", textAlign: "left", lineHeight: "1.5" }}>Q. {item.q}</span>
                  {openFaq === index ? <ChevronDown size={15} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronRight size={15} color="var(--muted-foreground)" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === index && (
                  <div style={{ padding: "0 16px 12px", background: "var(--blue-light)" }}>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>A. {item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "6px" }}>没有找到答案？</div>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "12px" }}>欢迎提交反馈，我们会继续优化太原本地司机使用体验。</p>
          <button onClick={() => navigate("/feedback")} style={{ padding: "8px 24px", borderRadius: "20px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
            提交意见反馈
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HelpPage;
