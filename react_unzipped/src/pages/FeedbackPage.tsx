import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Image } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const types = ["功能异常", "OCR识别问题", "测算结果疑问", "优惠服务问题", "账号相关", "体验建议", "其他"];

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { submitFeedback, user } = useAppData();
  const [selectedType, setSelectedType] = useState("");
  const [content, setContent] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [submitted, setSubmitted] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const handleSubmit = () => {
    if (!selectedType || !content) {
      return;
    }

    submitFeedback({ type: selectedType, content, phone, imageCount });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageWrapper title="意见反馈" showBack backPath="/profile">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "500px", padding: "40px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <CheckCircle size={40} color="var(--success)" />
          </div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--foreground)", marginBottom: "10px" }}>反馈提交成功</div>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8", marginBottom: "30px" }}>
            感谢你的反馈，我们会在 1 到 3 个工作日内跟进处理。如需联系，会通过你预留的手机号回访。
          </p>
          <button onClick={() => navigate("/home")} className="btn-primary" style={{ width: "200px" }}>返回首页</button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="意见反馈" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        <div style={{ background: "var(--blue-light)", borderRadius: "10px", padding: "10px 14px", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--primary)" }}>你的反馈将帮助我们持续优化太原司机端体验。</span>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "12px" }}>问题类型 <span style={{ color: "var(--destructive)" }}>*</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {types.map((type) => (
              <button key={type} onClick={() => setSelectedType(type)} style={{ padding: "7px 14px", borderRadius: "8px", border: `1px solid ${selectedType === type ? "var(--primary)" : "var(--border)"}`, background: selectedType === type ? "var(--blue-light)" : "transparent", color: selectedType === type ? "var(--primary)" : "var(--muted-foreground)", fontSize: "13px", cursor: "pointer", fontWeight: selectedType === type ? "600" : "400" }}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>问题描述 <span style={{ color: "var(--destructive)" }}>*</span></div>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="请详细描述你遇到的问题或建议，越具体越方便我们排查和改进..." maxLength={500} style={{ width: "100%", height: "120px", background: "var(--input)", border: "1px solid transparent", borderRadius: "10px", padding: "12px", fontSize: "14px", color: "var(--foreground)", outline: "none", resize: "none", lineHeight: "1.6", boxSizing: "border-box" }} />
          <div style={{ textAlign: "right", fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>{content.length}/500</div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>上传截图（选填）</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {Array.from({ length: imageCount }).map((_, index) => (
              <div key={index} style={{ width: "68px", height: "68px", borderRadius: "10px", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Image size={24} color="var(--primary)" />
                <button onClick={() => setImageCount(imageCount - 1)} style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%", background: "var(--destructive)", border: "none", color: "white", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            ))}
            {imageCount < 3 && (
              <button onClick={() => setImageCount(Math.min(imageCount + 1, 3))} style={{ width: "68px", height: "68px", borderRadius: "10px", border: "2px dashed var(--border)", background: "var(--muted)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", cursor: "pointer" }}>
                <span style={{ fontSize: "24px", color: "var(--muted-foreground)", lineHeight: 1 }}>+</span>
                <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>添加</span>
              </button>
            )}
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>最多 3 张</span>
          </div>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>联系方式（选填）</div>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="手机号，方便我们联系你" style={{ width: "100%", background: "var(--input)", border: "none", borderRadius: "8px", padding: "10px 12px", fontSize: "15px", color: "var(--foreground)", outline: "none", boxSizing: "border-box" }} />
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={!selectedType || !content} style={{ opacity: selectedType && content ? 1 : 0.5, cursor: selectedType && content ? "pointer" : "not-allowed" }}>
          提交反馈
        </button>
      </div>
    </PageWrapper>
  );
};

export default FeedbackPage;
