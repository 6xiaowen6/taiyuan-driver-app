import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { useAppData } from "../lib/app-data";

const PLATFORMS = ["滴滴出行", "T3出行", "高德打车", "曹操出行", "享道出行", "美团打车", "其他"];
const CAR_TYPES = ["经济型", "舒适型", "豪华型", "MPV", "新能源"];
const CITIES = ["山西太原", "太原小店区", "太原迎泽区", "太原万柏林区", "太原杏花岭区", "太原尖草坪区", "其他"];

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAppData();
  const [nickname, setNickname] = useState(user.nickname);
  const [platform, setPlatform] = useState(user.platform);
  const [carType, setCarType] = useState(user.carType);
  const [carAge, setCarAge] = useState(user.carAge);
  const [city, setCity] = useState(user.city);
  const [showPlatform, setShowPlatform] = useState(false);
  const [showCarType, setShowCarType] = useState(false);
  const [showCity, setShowCity] = useState(false);

  const SelectModal = ({ options, value, onSelect, onClose }: { options: string[]; value: string; onSelect: (value: string) => void; onClose: () => void }) => (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div style={{ background: "white", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted-foreground)", fontSize: "15px", cursor: "pointer" }}>取消</button>
          <span style={{ fontWeight: "600", fontSize: "15px" }}>请选择</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>确定</button>
        </div>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              style={{ padding: "12px 16px", fontSize: "15px", color: option === value ? "var(--primary)" : "var(--foreground)", fontWeight: option === value ? "600" : "400", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
            >
              {option} {option === value && "✓"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const handleSave = () => {
    updateUser({ nickname, platform, carType, carAge, city });
    navigate("/home");
  };

  return (
    <PageWrapper title="完善个人信息" showBack backPath="/home">
      <div style={{ padding: "16px 16px 0", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{nickname.slice(0, 1)}</span>
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "24px", height: "24px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
              <Camera size={12} color="white" />
            </div>
          </div>
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "8px" }}>点击修改头像</span>
        </div>

        <div style={{ background: "var(--card)", borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: "var(--foreground)", fontWeight: "500", width: "70px", flexShrink: 0 }}>昵称</span>
            <input value={nickname} onChange={(event) => setNickname(event.target.value)} style={{ flex: 1, background: "none", border: "none", outline: "none", textAlign: "right", fontSize: "15px", color: "var(--foreground)" }} placeholder="请输入昵称" />
          </div>

          <div onClick={() => setShowPlatform(true)} style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ fontSize: "15px", color: "var(--foreground)", fontWeight: "500" }}>所属平台</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", color: "var(--foreground)" }}>{platform}</span>
              <ChevronDown size={16} color="var(--muted-foreground)" />
            </div>
          </div>

          <div onClick={() => setShowCarType(true)} style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ fontSize: "15px", color: "var(--foreground)", fontWeight: "500" }}>车型</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", color: "var(--foreground)" }}>{carType}</span>
              <ChevronDown size={16} color="var(--muted-foreground)" />
            </div>
          </div>

          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: "var(--foreground)", fontWeight: "500" }}>车龄</span>
            <div style={{ display: "flex", gap: "8px" }}>
              {["1年以内", "1-3年", "3-5年", "5年以上"].map((age) => (
                <button
                  key={age}
                  onClick={() => setCarAge(age)}
                  style={{ padding: "4px 10px", borderRadius: "6px", border: `1px solid ${carAge === age ? "var(--primary)" : "var(--border)"}`, background: carAge === age ? "var(--blue-light)" : "transparent", color: carAge === age ? "var(--primary)" : "var(--muted-foreground)", fontSize: "12px", cursor: "pointer", fontWeight: carAge === age ? "600" : "400" }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div onClick={() => setShowCity(true)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ fontSize: "15px", color: "var(--foreground)", fontWeight: "500" }}>常用城市</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", color: "var(--foreground)" }}>{city}</span>
              <ChevronDown size={16} color="var(--muted-foreground)" />
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave} style={{ marginTop: "20px" }}>保存并完成</button>
        <button onClick={() => navigate("/home")} style={{ width: "100%", background: "none", border: "none", color: "var(--muted-foreground)", fontSize: "14px", marginTop: "12px", cursor: "pointer", padding: "8px" }}>
          暂时跳过
        </button>
      </div>

      {showPlatform && <SelectModal options={PLATFORMS} value={platform} onSelect={setPlatform} onClose={() => setShowPlatform(false)} />}
      {showCarType && <SelectModal options={CAR_TYPES} value={carType} onSelect={setCarType} onClose={() => setShowCarType(false)} />}
      {showCity && <SelectModal options={CITIES} value={city} onSelect={setCity} onClose={() => setShowCity(false)} />}
    </PageWrapper>
  );
};

export default ProfileSetupPage;
