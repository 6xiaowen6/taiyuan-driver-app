import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Home, Tag, User } from "lucide-react";

const TAB_ITEMS = [
  { label: "首页", icon: "home", path: "/home" },
  { label: "优惠服务", icon: "tag", path: "/services" },
  { label: "消息", icon: "bell", path: "/messages" },
  { label: "我的", icon: "user", path: "/profile" },
];

const StatusBar = ({ light = false }: { light?: boolean }) => (
  <div className={`status-bar ${light ? "text-primary-foreground" : "text-foreground"}`}>
    <span className="text-xs font-medium">9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5 items-end h-3">
        {[6, 8, 10, 12].map((height) => (
          <div
            key={height}
            className="w-0.5 rounded-sm"
            style={{
              height: `${height}px`,
              background: light ? "rgba(255,255,255,0.9)" : "var(--foreground)",
            }}
          />
        ))}
      </div>
      <svg width="15" height="11" viewBox="0 0 15 11" fill={light ? "white" : "var(--foreground)"}>
        <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 9.9 0.5 7.5 0.5C5.1 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" />
        <path d="M7.5 5.5C8.8 5.5 9.9 6 10.7 6.9L12.1 5.5C10.9 4.3 9.3 3.5 7.5 3.5C5.7 3.5 4.1 4.3 2.9 5.5L4.3 6.9C5.1 6 6.2 5.5 7.5 5.5Z" />
        <circle cx="7.5" cy="9" r="1.5" />
      </svg>
      <div className="flex items-center gap-0.5">
        <div
          style={{
            width: "22px",
            height: "11px",
            border: `1.5px solid ${light ? "rgba(255,255,255,0.9)" : "var(--foreground)"}`,
            borderRadius: "2px",
            padding: "1px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "7px",
              background: light ? "rgba(255,255,255,0.9)" : "var(--foreground)",
              borderRadius: "1px",
            }}
          />
        </div>
        <div
          style={{
            width: "2px",
            height: "5px",
            background: light ? "rgba(255,255,255,0.9)" : "var(--foreground)",
            borderRadius: "1px",
          }}
        />
      </div>
    </div>
  </div>
);

const NavBar = ({
  title,
  showBack,
  backPath,
  light = false,
}: {
  title: string;
  showBack: boolean;
  backPath: string;
  light?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center px-4 py-2 ${light ? "text-primary-foreground" : "text-foreground"}`} style={{ height: "44px" }}>
      {showBack && (
        <button
          onClick={() => navigate(backPath)}
          className="flex items-center mr-2"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8.5 1L1.5 8L8.5 15" stroke={light ? "white" : "var(--foreground)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <span className="flex-1 text-center font-semibold" style={{ fontSize: "17px" }}>
        {title}
      </span>
      {showBack && <div style={{ width: "26px" }} />}
    </div>
  );
};

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="tab-bar">
      {TAB_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        const color = isActive ? "var(--primary)" : "var(--muted-foreground)";

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 12px",
              flex: 1,
            }}
          >
            {item.icon === "home" && <Home size={22} color={color} />}
            {item.icon === "tag" && <Tag size={22} color={color} />}
            {item.icon === "bell" && <Bell size={22} color={color} />}
            {item.icon === "user" && <User size={22} color={color} />}
            <span style={{ fontSize: "10px", color, fontWeight: isActive ? "600" : "400" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

interface PageWrapperProps {
  title?: string;
  showBack?: boolean;
  showTabBar?: boolean;
  backPath?: string;
  bgGradient?: boolean;
  contentHeight?: number;
  scrollable?: boolean;
  children: React.ReactNode;
}

const PageWrapper = ({
  title = "",
  showBack = false,
  showTabBar = false,
  backPath = "/home",
  bgGradient = false,
  contentHeight,
  scrollable = true,
  children,
}: PageWrapperProps) => {
  const tabBarHeight = showTabBar ? 56 : 0;
  const navBarHeight = title ? 44 : 0;
  const availableHeight = 812 - 44 - navBarHeight - tabBarHeight;

  return (
    <div className="mobile-container">
      <StatusBar light={bgGradient} />
      {title && <NavBar title={title} showBack={showBack} backPath={backPath} light={bgGradient} />}
      <div
        className={scrollable ? "page-scroll" : ""}
        style={{
          height: contentHeight ?? availableHeight,
          overflowY: scrollable ? "auto" : "hidden",
        }}
      >
        {children}
      </div>
      {showTabBar && <TabBar />}
    </div>
  );
};

export { PageWrapper, StatusBar, NavBar, TabBar };
export default PageWrapper;
