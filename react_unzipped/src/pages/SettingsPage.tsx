import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { clearCache, logout, settings, updateSettings, user } = useAppData();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) => (
    <div onClick={() => onChange(!value)} style={{ width: "48px", height: "28px", borderRadius: "14px", background: value ? "var(--primary)" : "var(--border)", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "white", position: "absolute", top: "3px", left: value ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </div>
  );

  const groups = [
    {
      title: "账号管理",
      items: [
        { label: "登录手机号", value: user.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"), type: "navigate", path: "" },
        { label: "账号安全", value: "", type: "navigate", path: "" },
      ],
    },
    {
      title: "权限设置",
      items: [
        { label: "消息通知", value: "", type: "toggle", key: "notifications" },
        { label: "位置访问", value: "", type: "toggle", key: "locationAccess" },
      ],
    },
    {
      title: "隐私与协议",
      items: [
        { label: "隐私政策", value: "", type: "navigate", path: "/about" },
        { label: "用户协议", value: "", type: "navigate", path: "/about" },
        { label: "关于平台", value: "", type: "navigate", path: "/about" },
      ],
    },
    {
      title: "存储",
      items: [{ label: "清除缓存", value: "12.4MB", type: "clear" }],
    },
  ];

  return (
    <PageWrapper title="设置" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        {groups.map((group) => (
          <div key={group.title} style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "8px", paddingLeft: "4px" }}>{group.title}</div>
            <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden" }}>
              {group.items.map((item, index) => (
                <div
                  key={item.label}
                  onClick={() => {
                    if (item.type === "navigate" && item.path) navigate(item.path);
                    if (item.type === "clear") setShowClearModal(true);
                  }}
                  style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: index < group.items.length - 1 ? "1px solid var(--border)" : "none", cursor: item.type === "toggle" ? "default" : "pointer" }}
                >
                  <span style={{ flex: 1, fontSize: "15px", color: "var(--foreground)" }}>{item.label}</span>
                  {item.type === "navigate" && (
                    <>
                      {item.value && <span style={{ fontSize: "14px", color: "var(--muted-foreground)", marginRight: "8px" }}>{item.value}</span>}
                      <ChevronRight size={16} color="var(--muted-foreground)" />
                    </>
                  )}
                  {item.type === "toggle" && item.key === "notifications" && <Toggle value={settings.notifications} onChange={(value) => updateSettings({ notifications: value })} />}
                  {item.type === "toggle" && item.key === "locationAccess" && <Toggle value={settings.locationAccess} onChange={(value) => updateSettings({ locationAccess: value })} />}
                  {item.type === "clear" && (
                    <>
                      <span style={{ fontSize: "14px", color: "var(--muted-foreground)", marginRight: "8px" }}>{item.value}</span>
                      <ChevronRight size={16} color="var(--muted-foreground)" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => setShowLogoutModal(true)} style={{ width: "100%", height: "52px", borderRadius: "14px", background: "var(--red-light)", border: "1px solid var(--destructive)", color: "var(--destructive)", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "8px" }}>
          退出登录
        </button>

        <div style={{ textAlign: "center", marginTop: "20px", color: "var(--muted-foreground)", fontSize: "12px" }}>益驾增收 v1.0.0 · 山西益驾科技有限公司</div>
      </div>

      {showLogoutModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 200 }}>
          <div style={{ width: "100%", background: "white", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", padding: "24px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <AlertTriangle size={40} color="var(--warning)" style={{ margin: "0 auto 10px", display: "block" }} />
              <div style={{ fontSize: "17px", fontWeight: "600", color: "var(--foreground)" }}>确认退出登录？</div>
              <div style={{ fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>退出后需要重新登录才可继续查看太原本地服务和测算记录</div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowLogoutModal(false)} style={{ flex: 1, height: "48px", borderRadius: "24px", border: "1.5px solid var(--border)", background: "transparent", color: "var(--foreground)", fontSize: "16px", cursor: "pointer" }}>取消</button>
              <button onClick={() => { logout(); navigate("/login"); }} style={{ flex: 1, height: "48px", borderRadius: "24px", background: "var(--destructive)", border: "none", color: "white", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>确认退出</button>
            </div>
          </div>
        </div>
      )}

      {showClearModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ width: "300px", background: "white", borderRadius: "16px", padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "17px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>清除缓存</div>
            <div style={{ fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "20px" }}>将清除 12.4MB 页面缓存，不影响账号信息和测算记录。</div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowClearModal(false)} style={{ flex: 1, height: "44px", borderRadius: "22px", border: "1.5px solid var(--border)", background: "transparent", color: "var(--foreground)", fontSize: "15px", cursor: "pointer" }}>取消</button>
              <button onClick={() => { clearCache(); setShowClearModal(false); }} style={{ flex: 1, height: "44px", borderRadius: "22px", background: "var(--primary)", border: "none", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>确认清除</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SettingsPage;
