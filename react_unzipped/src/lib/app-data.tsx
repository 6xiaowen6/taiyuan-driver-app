import { createContext, useContext, useEffect, useMemo, useState } from "react";

type MessageType = "policy" | "discount" | "system";
type ServiceCategory = "charge" | "insurance" | "repair" | "fuel" | "wash";
type TimeSlot = "早高峰" | "晚高峰" | "平峰" | "夜间";
type WeatherType = "晴天" | "小雨" | "大雨" | "雾天" | "雪天";
type MileageRange = "5km以内" | "5-15km" | "15-30km" | "30km以上";

export interface UserProfile {
  nickname: string;
  phone: string;
  platform: string;
  carType: string;
  carAge: string;
  city: string;
}

export interface OrderDraft {
  mileage: number;
  duration: number;
  income: number;
  commission: number;
  commissionRate: number;
  timeSlot: TimeSlot;
  weather: WeatherType;
  mileageRange: MileageRange;
  platform: string;
}

export interface CalculationResult {
  originalIncome: number;
  originalCommission: number;
  originalRate: number;
  originalTake: number;
  newCommission: number;
  newRate: number;
  newTake: number;
  increase: number;
  timeBonus: number;
  mileageBonus: number;
  weatherBonus: number;
  demandBonus: number;
}

export interface HistoryRecord {
  id: number;
  date: string;
  mileage: number;
  income: number;
  originalRate: number;
  newRate: number;
  increase: number;
  timeSlot: TimeSlot;
  weather: WeatherType;
}

export interface AppMessage {
  id: number;
  type: MessageType;
  icon: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

export interface ServiceItem {
  id: number;
  category: ServiceCategory;
  name: string;
  discount: string;
  distance: string;
  time: string;
  tag: string;
  rating: number;
  reviews: number;
  icon: string;
  desc: string;
  address: string;
  phone: string;
  rules: string[];
  validity: string;
}

interface SettingsState {
  notifications: boolean;
  locationAccess: boolean;
}

interface FeedbackRecord {
  id: number;
  type: string;
  content: string;
  phone: string;
  imageCount: number;
  createdAt: string;
}

interface AppState {
  isLoggedIn: boolean;
  user: UserProfile;
  order: OrderDraft;
  result: CalculationResult | null;
  history: HistoryRecord[];
  messages: AppMessage[];
  services: ServiceItem[];
  settings: SettingsState;
  feedbacks: FeedbackRecord[];
}

interface AppContextValue extends AppState {
  summary: {
    todayIncrease: number;
    totalIncrease: number;
    totalCalculations: number;
    unreadCount: number;
  };
  login: (phone: string) => void;
  logout: () => void;
  updateUser: (payload: Partial<UserProfile>) => void;
  runMockOcr: () => Promise<OrderDraft>;
  updateOrder: (payload: Partial<OrderDraft>) => void;
  calculate: () => Promise<CalculationResult>;
  saveCurrentCalculation: () => void;
  deleteHistoryRecord: (id: number) => void;
  markAllMessagesRead: () => void;
  submitFeedback: (payload: Omit<FeedbackRecord, "id" | "createdAt">) => void;
  updateSettings: (payload: Partial<SettingsState>) => void;
  clearCache: () => void;
}

const STORAGE_KEY = "yjzs-app-state";

const defaultUser: UserProfile = {
  nickname: "张师傅",
  phone: "13800008888",
  platform: "滴滴出行",
  carType: "经济型",
  carAge: "1-3年",
  city: "山西太原",
};

const defaultOrder: OrderDraft = {
  mileage: 12.3,
  duration: 24,
  income: 38.5,
  commission: 8.08,
  commissionRate: 21,
  timeSlot: "晚高峰",
  weather: "晴天",
  mileageRange: "5-15km",
  platform: "滴滴出行",
};

const defaultMessages: AppMessage[] = [
  {
    id: 1,
    type: "policy",
    icon: "📘",
    title: "重要政策提醒",
    desc: "太原网约车平台抽成透明化持续推进，司机可结合订单截图测算抽成区间，便于了解每单收益变化。",
    time: "10分钟前",
    unread: true,
  },
  {
    id: 2,
    type: "discount",
    icon: "🎁",
    title: "太原充电优惠上新",
    desc: "小店区晋阳街周边充电站本周三至周五享受会员折扣，适合新能源网约车司机错峰补能。",
    time: "2小时前",
    unread: true,
  },
  {
    id: 3,
    type: "system",
    icon: "✅",
    title: "历史记录已同步",
    desc: "你最近一次测算结果已保存到历史记录，可随时查看收益优化明细。",
    time: "昨天 18:32",
    unread: false,
  },
  {
    id: 4,
    type: "discount",
    icon: "🛡️",
    title: "司机专属保险活动",
    desc: "太原地区司机车险团购已开启，包含营运用车保障和意外险组合，线上即可办理。",
    time: "2天前",
    unread: false,
  },
];

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    category: "charge",
    name: "星能充电 太原晋阳街站",
    discount: "充100送15",
    distance: "0.8km",
    time: "24小时",
    tag: "热门",
    rating: 4.8,
    reviews: 328,
    icon: "⚡",
    desc: "靠近晋阳街与体育南路，60个快充桩，适合网约车司机夜间补能。",
    address: "山西省太原市小店区晋阳街与体育南路交叉口东南角",
    phone: "0351-6868666",
    rules: ["充值100元赠送15元余额", "新用户首单充电享受88折", "工作日10:00-16:00支持错峰优惠"],
    validity: "2026-12-31",
  },
  {
    id: 2,
    category: "insurance",
    name: "平安车险 太原司机专享",
    discount: "年费立省680元",
    distance: "线上办理",
    time: "全天候",
    tag: "推荐",
    rating: 4.9,
    reviews: 512,
    icon: "🛡️",
    desc: "面向太原网约车司机的营运车险组合方案，支持线上报价和核保。",
    address: "山西省太原市小店区长治路111号",
    phone: "0351-4008600",
    rules: ["活动期间限实名认证司机参与", "报价以车辆信息审核结果为准", "支持电子保单和在线理赔咨询"],
    validity: "2026-10-31",
  },
  {
    id: 3,
    category: "repair",
    name: "途虎机修 太原亲贤街店",
    discount: "保养8折",
    distance: "2.1km",
    time: "08:30-20:00",
    tag: "热门",
    rating: 4.7,
    reviews: 445,
    icon: "🔧",
    desc: "覆盖机油保养、轮胎更换、底盘检测，适合高频运营车辆定期养护。",
    address: "山西省太原市小店区亲贤北街86号",
    phone: "0351-6221999",
    rules: ["需提前预约到店时间", "特价项目不可与门店其他活动同享", "部分品牌机油库存以门店当天为准"],
    validity: "2026-09-30",
  },
  {
    id: 4,
    category: "fuel",
    name: "中石化 太原长风街站",
    discount: "每升优惠0.15元",
    distance: "1.5km",
    time: "24小时",
    tag: "优惠",
    rating: 4.6,
    reviews: 892,
    icon: "⛽",
    desc: "92号、95号汽油供应稳定，支持司机专享加油券叠加。",
    address: "山西省太原市小店区长风街与平阳路交叉口西北角",
    phone: "0351-7280001",
    rules: ["优惠时段以平台展示为准", "司机券需在支付前出示", "节假日高峰可能排队"],
    validity: "2026-08-31",
  },
  {
    id: 5,
    category: "wash",
    name: "净驰洗车 太原南内环店",
    discount: "首单5折",
    distance: "1.1km",
    time: "08:00-21:00",
    tag: "新店",
    rating: 4.5,
    reviews: 96,
    icon: "🚘",
    desc: "提供快速外洗、精洗和内饰清洁，适合运营车辆班次间整理。",
    address: "山西省太原市迎泽区南内环街216号",
    phone: "0351-4668008",
    rules: ["首单优惠仅限线上下单", "精洗需提前预约", "雨雪天气可能调整营业时间"],
    validity: "2026-07-31",
  },
];

const defaultHistory: HistoryRecord[] = [
  { id: 1, date: "2026-04-23 18:32", mileage: 12.3, income: 38.5, originalRate: 21, newRate: 12, increase: 3.46, timeSlot: "晚高峰", weather: "晴天" },
  { id: 2, date: "2026-04-23 09:14", mileage: 8.6, income: 26.8, originalRate: 21, newRate: 13, increase: 2.14, timeSlot: "早高峰", weather: "晴天" },
  { id: 3, date: "2026-04-22 20:05", mileage: 25.1, income: 68.3, originalRate: 22, newRate: 11, increase: 7.51, timeSlot: "夜间", weather: "小雨" },
];

const defaultState: AppState = {
  isLoggedIn: false,
  user: defaultUser,
  order: defaultOrder,
  result: null,
  history: defaultHistory,
  messages: defaultMessages,
  services: defaultServices,
  settings: {
    notifications: true,
    locationAccess: true,
  },
  feedbacks: [],
};

const AppDataContext = createContext<AppContextValue | null>(null);

const getDemandBonus = (timeSlot: TimeSlot, mileageRange: MileageRange) => {
  const timeMap: Record<TimeSlot, number> = {
    早高峰: 1.6,
    晚高峰: 2.4,
    平峰: 0.9,
    夜间: 1.8,
  };
  const mileageMap: Record<MileageRange, number> = {
    "5km以内": 0.5,
    "5-15km": 1.2,
    "15-30km": 2,
    "30km以上": 2.8,
  };

  return Number((timeMap[timeSlot] + mileageMap[mileageRange] * 0.4).toFixed(2));
};

const calculateResult = (order: OrderDraft): CalculationResult => {
  const timeBonusMap: Record<TimeSlot, number> = {
    早高峰: 2.8,
    晚高峰: 4,
    平峰: 1.5,
    夜间: 3.2,
  };
  const mileageBonusMap: Record<MileageRange, number> = {
    "5km以内": 0.8,
    "5-15km": 3,
    "15-30km": 4.5,
    "30km以上": 5.8,
  };
  const weatherBonusMap: Record<WeatherType, number> = {
    晴天: 0.2,
    小雨: 0.8,
    大雨: 1.5,
    雾天: 1.1,
    雪天: 1.8,
  };

  const timeBonus = timeBonusMap[order.timeSlot];
  const mileageBonus = mileageBonusMap[order.mileageRange];
  const weatherBonus = weatherBonusMap[order.weather];
  const demandBonus = getDemandBonus(order.timeSlot, order.mileageRange);
  const totalBonus = timeBonus + mileageBonus + weatherBonus + demandBonus;
  const newRate = Math.max(10, Number((order.commissionRate - totalBonus).toFixed(0)));
  const originalTake = Number((order.income - order.commission).toFixed(2));
  const newCommission = Number((order.income * (newRate / 100)).toFixed(2));
  const newTake = Number((order.income - newCommission).toFixed(2));
  const increase = Number((newTake - originalTake).toFixed(2));

  return {
    originalIncome: order.income,
    originalCommission: order.commission,
    originalRate: order.commissionRate,
    originalTake,
    newCommission,
    newRate,
    newTake,
    increase,
    timeBonus,
    mileageBonus,
    weatherBonus,
    demandBonus,
  };
};

const loadState = (): AppState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  try {
    return { ...defaultState, ...JSON.parse(raw) } as AppState;
  } catch {
    return defaultState;
  }
};

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const summary = useMemo(() => {
    const totalIncrease = state.history.reduce((sum, item) => sum + item.increase, 0);
    const todayIncrease = state.history
      .filter((item) => item.date.startsWith("2026-04-23") || item.date.startsWith("2026-04-24"))
      .reduce((sum, item) => sum + item.increase, 0);

    return {
      todayIncrease: Number(todayIncrease.toFixed(2)),
      totalIncrease: Number(totalIncrease.toFixed(2)),
      totalCalculations: state.history.length,
      unreadCount: state.messages.filter((item) => item.unread).length,
    };
  }, [state.history, state.messages]);

  const value: AppContextValue = {
    ...state,
    summary,
    login: (phone) => {
      setState((prev) => ({
        ...prev,
        isLoggedIn: true,
        user: {
          ...prev.user,
          phone,
        },
      }));
    },
    logout: () => {
      setState((prev) => ({
        ...prev,
        isLoggedIn: false,
      }));
    },
    updateUser: (payload) => {
      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...payload,
        },
      }));
    },
    runMockOcr: () =>
      new Promise((resolve) => {
        const order = {
          ...defaultOrder,
          platform: state.user.platform,
        };
        window.setTimeout(() => {
          setState((prev) => ({
            ...prev,
            order,
          }));
          resolve(order);
        }, 1500);
      }),
    updateOrder: (payload) => {
      setState((prev) => ({
        ...prev,
        order: {
          ...prev.order,
          ...payload,
        },
      }));
    },
    calculate: () =>
      new Promise((resolve) => {
        const nextResult = calculateResult(state.order);
        window.setTimeout(() => {
          setState((prev) => ({
            ...prev,
            result: nextResult,
          }));
          resolve(nextResult);
        }, 1200);
      }),
    saveCurrentCalculation: () => {
      if (!state.result) {
        return;
      }

      const nextRecord: HistoryRecord = {
        id: Date.now(),
        date: "2026-04-24 10:28",
        mileage: state.order.mileage,
        income: state.order.income,
        originalRate: state.result.originalRate,
        newRate: state.result.newRate,
        increase: state.result.increase,
        timeSlot: state.order.timeSlot,
        weather: state.order.weather,
      };

      setState((prev) => ({
        ...prev,
        history: [nextRecord, ...prev.history],
        messages: [
          {
            id: Date.now() + 1,
            type: "system",
            icon: "📄",
            title: "测算记录已保存",
            desc: `最新一笔 ${state.order.timeSlot} 订单测算已写入历史记录，预计增收 ¥${state.result.increase.toFixed(2)}。`,
            time: "刚刚",
            unread: true,
          },
          ...prev.messages,
        ],
      }));
    },
    deleteHistoryRecord: (id) => {
      setState((prev) => ({
        ...prev,
        history: prev.history.filter((item) => item.id !== id),
      }));
    },
    markAllMessagesRead: () => {
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((item) => ({ ...item, unread: false })),
      }));
    },
    submitFeedback: (payload) => {
      setState((prev) => ({
        ...prev,
        feedbacks: [
          {
            id: Date.now(),
            createdAt: "2026-04-24 10:35",
            ...payload,
          },
          ...prev.feedbacks,
        ],
      }));
    },
    updateSettings: (payload) => {
      setState((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          ...payload,
        },
      }));
    },
    clearCache: () => {
      setState((prev) => ({
        ...prev,
        feedbacks: [],
      }));
    },
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
};

