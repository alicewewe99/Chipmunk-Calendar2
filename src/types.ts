export type CalendarMarkerType = 'star' | 'cake' | 'heart' | 'acorn' | 'work' | 'trip' | 'relax' | 'sparkle';

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  notes?: string;
  marker?: CalendarMarkerType;
  emoji?: string;
  createdAt: number;
}

export interface DayInfo {
  dateStr: string; // YYYY-MM-DD
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  holidayName?: string;
  holidayNote?: string; // 假日詳細備註或連假說明
  isNationalHoliday: boolean; // 國定假
  solarTerm?: string; // 24節氣
  lunarMonthStr: string; // 如：七月
  lunarDayStr: string; // 如：廿五 / 初一
  lunarFullStr: string; // 如：丙午年七月廿五
  westernHoliday?: string;
  workdayNote?: string; // 補班日
  events: CalendarEvent[];
}

export type ChakraColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export interface RainbowCard {
  id: number;
  color: ChakraColor;
  colorName: string;
  chakraName: string;
  chakraLocation: string;
  theme: string;
  imbalanceSymptom: string;
  affirmation: string;
  cardBgColor: string;
  cardTextColor: string;
}

export interface TempleSign {
  number: number; // 1 ~ 60
  ganzhi: string; // e.g. 甲子
  gua: string; // 籤頭卦名
  title: string; // 歷史典故
  poem: string[]; // 4 lines 7 characters
  overall: string; // 大吉 / 上上 / 中平 等
  explanation: {
    career: string; // 事業/求職
    marriage: string; // 姻緣/感情
    family: string; // 家庭/家運
    wealth: string; // 財運/求財
    health: string; // 健康/疾病
    travel?: string; // 出行
  };
}

export interface RomanceAngelCard {
  id: number;
  titleZh: string;
  titleEn: string;
  summary: string;
  meaning: string;
  guidance: string;
  affirmation: string;
}

export interface LoveAnswerItem {
  id: number;
  quote: string;
  whisper: string;
  action: string;
}

export interface YesNoAnswer {
  result: 'YES' | 'NO' | 'MAYBE';
  title: string;
  message: string;
  subtext: string;
  chipmunkAdvice: string;
}
