import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Shield } from "lucide-react";
import { useAppData } from "../lib/app-data";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAppData();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleGetCode = () => {
    if (phone.length < 11) {
      return;
    }

    setCountdown(60);
    const timer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    if (!agreed || phone.length < 11 || code.length < 4) {
      return;
    }

    login(phone);
    navigate("/home");
  };

  return (
    <div className="mobile-container" style={{ display: "flex", flexDirection: "column", background: "white" }}>
      <div
        style={{
          height: "280px",
          background: "var(--gradient-header)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "36px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <div style={{ width: "20px", height: "10px", border: "1.5px solid white", borderRadius: "2px", padding: "1px" }}>
              <div style={{ width: "12px", height: "6px", background: "white", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
          <svg width="36" height="36" viewBox="0 0 54 54" fill="none">
            <path d="M14 38L20 24L27 32L33 20L40 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27 16L30 22H24L27 16Z" fill="rgba(18,201,142,1)" />
            <circle cx="27" cy="27" r="3" fill="white" />
          </svg>
        </div>
        <span style={{ color: "white", fontSize: "24px", fontWeight: "700", letterSpacing: "3px" }}>益驾增收</span>
        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "6px" }}>面向山西太原网约车司机的智能增收助手</span>
      </div>

      <div style={{ flex: 1, padding: "32px 24px 24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "var(--foreground)", marginBottom: "6px" }}>登录 / 注册</h2>
        <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "28px" }}>新用户登录后将自动创建账号</p>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--input)",
              borderRadius: "10px",
              padding: "0 14px",
              height: "52px",
              border: "1.5px solid transparent",
            }}
          >
            <Phone size={18} color="var(--muted-foreground)" />
            <span style={{ color: "var(--foreground)", fontSize: "14px", margin: "0 8px", fontWeight: "500" }}>+86</span>
            <div style={{ width: "1px", height: "18px", background: "var(--border)", marginRight: "10px" }} />
            <input
              className="app-input"
              type="tel"
              placeholder="请输入手机号"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              maxLength={11}
              style={{ background: "transparent", border: "none", flex: 1, height: "100%", outline: "none", fontSize: "16px", color: "var(--foreground)" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--input)",
              borderRadius: "10px",
              padding: "0 14px",
              height: "52px",
              gap: "10px",
            }}
          >
            <Shield size={18} color="var(--muted-foreground)" />
            <input
              type="text"
              placeholder="请输入验证码"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              maxLength={6}
              style={{ background: "transparent", border: "none", flex: 1, height: "100%", outline: "none", fontSize: "16px", color: "var(--foreground)" }}
            />
            <button
              onClick={handleGetCode}
              disabled={phone.length < 11 || countdown > 0}
              style={{
                background: countdown > 0 || phone.length < 11 ? "var(--muted)" : "var(--blue-light)",
                color: countdown > 0 || phone.length < 11 ? "var(--muted-foreground)" : "var(--primary)",
                border: "none",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: phone.length < 11 || countdown > 0 ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {countdown > 0 ? `${countdown}s` : "获取验证码"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "24px" }}>
          <div
            onClick={() => setAgreed(!agreed)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: `2px solid ${agreed ? "var(--primary)" : "var(--border)"}`,
              background: agreed ? "var(--primary)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              marginTop: "1px",
            }}
          >
            {agreed && <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>
            我已阅读并同意 <span style={{ color: "var(--primary)" }}>《用户服务协议》</span> 和 <span style={{ color: "var(--primary)" }}>《隐私政策》</span>
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={!agreed || phone.length < 11 || code.length < 4}
          style={{ opacity: agreed && phone.length >= 11 && code.length >= 4 ? 1 : 0.5, cursor: agreed && phone.length >= 11 && code.length >= 4 ? "pointer" : "not-allowed" }}
        >
          登录 / 注册
        </button>

        <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ margin: "0 12px", color: "var(--muted-foreground)", fontSize: "13px" }}>其他方式</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <button
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "24px",
            background: "#07C160",
            border: "none",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={() => {
            login("13800008888");
            navigate("/home");
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M8.5 13.5C7.7 13.5 7 12.8 7 12S7.7 10.5 8.5 10.5 10 11.2 10 12 9.3 13.5 8.5 13.5ZM15.5 13.5C14.7 13.5 14 12.8 14 12S14.7 10.5 15.5 10.5 17 11.2 17 12 16.3 13.5 15.5 13.5ZM12 3C6.5 3 2 6.7 2 11.3C2 13.9 3.4 16.2 5.7 17.7L4.7 21L8.4 18.9C9.5 19.2 10.7 19.4 12 19.4C17.5 19.4 22 15.7 22 11.1S17.5 3 12 3Z" />
          </svg>
          微信授权登录
        </button>

        <div style={{ marginTop: "18px", fontSize: "12px", color: "var(--muted-foreground)", textAlign: "center", lineHeight: "1.7" }}>
          当前服务城市：山西太原
          <br />
          登录后可使用订单识别、收益测算、历史记录和太原本地服务
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
