import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CheckCircle, ChevronRight, Image, RefreshCw } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const OcrPage = () => {
  const navigate = useNavigate();
  const { order, runMockOcr } = useAppData();
  const [step, setStep] = useState<"upload" | "processing" | "done">("upload");

  const handleSelectImage = async () => {
    setStep("processing");
    await runMockOcr();
    setStep("done");
  };

  return (
    <PageWrapper title="订单截图识别" showBack backPath="/home">
      <div style={{ padding: "16px" }}>
        {step === "upload" && (
          <>
            <div style={{ background: "var(--blue-light)", borderRadius: "12px", padding: "12px 14px", marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <span style={{ color: "white", fontSize: "11px", fontWeight: "700" }}>!</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: "1.6" }}>
                请上传太原地区平台订单完成页截图，系统将自动识别订单里程、时长、收入和抽成数据。
              </p>
            </div>

            <div
              onClick={handleSelectImage}
              style={{ height: "220px", border: "2px dashed var(--primary)", borderRadius: "16px", background: "var(--blue-light)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "12px", marginBottom: "16px" }}
            >
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera size={36} color="white" />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--foreground)", marginBottom: "4px" }}>点击拍照识别</div>
                <div style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>支持 JPG、PNG 格式</div>
              </div>
            </div>

            <button onClick={handleSelectImage} style={{ width: "100%", height: "52px", border: "1.5px solid var(--primary)", borderRadius: "26px", background: "transparent", color: "var(--primary)", fontSize: "16px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
              <Image size={18} />
              从相册选择
            </button>

            <div style={{ background: "var(--card)", borderRadius: "12px", padding: "14px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>识别小技巧</div>
              {[
                "确保截图清晰，订单金额和时间完整可见",
                "避免截图有遮挡或模糊区域",
                "支持滴滴、T3、高德等主流平台订单",
                "无法识别时可进入下一步手动修改数据",
              ].map((tip, index) => (
                <div key={tip} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--blue-light)", color: "var(--primary)", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{index + 1}</div>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>{tip}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "500px", gap: "20px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshCw size={36} color="var(--primary)" className="animate-spin" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "600", color: "var(--foreground)", marginBottom: "8px" }}>正在识别订单信息...</div>
              <div style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>请稍候，AI 正在提取数据</div>
            </div>
            <div style={{ width: "200px", height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "70%", background: "var(--gradient-primary)", borderRadius: "2px", transition: "width 0.3s" }} />
            </div>
          </div>
        )}

        {step === "done" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", padding: "12px 14px", background: "var(--green-light)", borderRadius: "12px" }}>
              <CheckCircle size={20} color="var(--success)" />
              <span style={{ fontSize: "14px", color: "var(--success)", fontWeight: "600" }}>识别成功，请确认以下信息</span>
            </div>

            <div style={{ background: "var(--card)", borderRadius: "16px", overflow: "hidden", marginBottom: "16px", boxShadow: "0 2px 12px rgba(27,108,242,0.08)" }}>
              <div style={{ padding: "14px 16px", background: "var(--gradient-header)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>识别结果</span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>{order.platform}</span>
              </div>
              <div style={{ padding: "14px 16px" }}>
                {[
                  { label: "行驶里程", value: `${order.mileage} km` },
                  { label: "行驶时长", value: `${order.duration} 分钟` },
                  { label: "原始收入", value: `¥ ${order.income.toFixed(2)}`, highlight: true },
                  { label: "平台抽成", value: `¥ ${order.commission.toFixed(2)}`, red: true },
                  { label: "抽成比例", value: `${order.commissionRate}%`, red: true },
                ].map((item, index) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: index < 4 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>{item.label}</span>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: item.highlight ? "var(--primary)" : item.red ? "var(--destructive)" : "var(--foreground)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <button onClick={() => setStep("upload")} className="btn-outline" style={{ flex: 1, height: "48px" }}>
                <RefreshCw size={14} style={{ marginRight: "4px" }} />
                重新识别
              </button>
              <button onClick={() => navigate("/order-edit")} style={{ flex: 1, height: "48px", borderRadius: "24px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                确认数据 <ChevronRight size={16} />
              </button>
            </div>

            <button onClick={() => navigate("/order-edit")} style={{ width: "100%", background: "none", border: "none", color: "var(--muted-foreground)", fontSize: "13px", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              手动修改订单数据
            </button>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default OcrPage;
