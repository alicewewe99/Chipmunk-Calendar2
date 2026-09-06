import React, { useState, useRef } from 'react';
import { CalendarEvent, DayInfo } from '../types';
import { getMonthCalendarDays, exportEventsToICS, parseICS, getFormattedTodayString } from '../utils/calendarUtils';
import {
  LONG_HOLIDAYS_2026,
  LONG_HOLIDAYS_2027,
  LongHolidayPlan,
} from '../data/holidays';
import { DayDetailModal } from './DayDetailModal';
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Calendar as CalendarIcon,
  PartyPopper,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => void;
  onDeleteEvent: (id: string) => void;
  onDeleteAllDayEvents?: (dateStr: string) => void;
  onImportEvents: (newEvents: Partial<CalendarEvent>[]) => void;
}

const MONTH_NAMES_ZH = [
  '一月 (睦月)',
  '二月 (如月)',
  '三月 (彌生)',
  '四月 (卯月)',
  '五月 (皋月)',
  '六月 (水無月)',
  '七月 (文月)',
  '八月 (葉月)',
  '九月 (長月)',
  '十月 (神無月)',
  '十一月 (霜月)',
  '十二月 (師走)',
];

const WEEKDAYS = [
  { name: '日', isWeekend: true },
  { name: '一', isWeekend: false },
  { name: '二', isWeekend: false },
  { name: '三', isWeekend: false },
  { name: '四', isWeekend: false },
  { name: '五', isWeekend: false },
  { name: '六', isWeekend: true },
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onAddEvent,
  onDeleteEvent,
  onDeleteAllDayEvents,
  onImportEvents,
}) => {
  // Requirement: starts from year 2026 onwards
  const today = new Date();
  const initialYear = today.getFullYear() >= 2026 ? today.getFullYear() : 2026;
  const initialMonth = today.getFullYear() >= 2026 ? today.getMonth() + 1 : 1;

  const [currentYear, setCurrentYear] = useState<number>(initialYear);
  const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [copiedToday, setCopiedToday] = useState(false);
  const [showLongHolidaysGuide, setShowLongHolidaysGuide] = useState(false);
  const [selectedGuideYear, setSelectedGuideYear] = useState<2026 | 2027>(
    initialYear === 2027 ? 2027 : 2026
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Jump to specific long holiday month
  const handleJumpToHoliday = (holiday: LongHolidayPlan) => {
    setCurrentYear(holiday.year);
    setCurrentMonth(holiday.startMonth);
  };

  // Years options from 2026 to 2036
  const availableYears = Array.from({ length: 11 }, (_, i) => 2026 + i);

  // Calendar cells
  const days = getMonthCalendarDays(currentYear, currentMonth, events);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      if (currentYear > 2026) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(12);
      }
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleGoToday = () => {
    const now = new Date();
    const targetY = now.getFullYear() >= 2026 ? now.getFullYear() : 2026;
    const targetM = now.getFullYear() >= 2026 ? now.getMonth() + 1 : 9;
    setCurrentYear(targetY);
    setCurrentMonth(targetM);
  };

  // 複製當天標準格式字串
  const handleCopyTodayFormatted = async () => {
    const formatted = getFormattedTodayString();
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedToday(true);
      setTimeout(() => setCopiedToday(false), 2200);
    } catch {
      setCopiedToday(true);
      setTimeout(() => setCopiedToday(false), 2200);
    }
  };

  // Import .ics handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const parsed = parseICS(content);
        if (parsed.length > 0) {
          onImportEvents(parsed);
          alert(`成功匯入 ${parsed.length} 項行事曆行程！`);
        } else {
          alert('未能從此檔案讀取到相容的行事曆事件，請確認是否為標準 .ics 檔案。');
        }
      }
    };
    reader.readAsText(file);
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Fairytale Storybook Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#d8c3a5] bg-gradient-to-r from-[#faede1] via-[#f7e6d2] to-[#f4dfc7] shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#8b5a2b]/15 text-[#5e3818] border border-[#8b5a2b]/25">
              <span>🌰 故事月曆</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>2026+ 台灣國定假日</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#4a2e18] tracking-tight">
              {currentYear} 年 {MONTH_NAMES_ZH[currentMonth - 1]}
            </h2>
            <p className="text-xs sm:text-sm text-[#6c4a2d] leading-relaxed">
              依行政院人事行政總處核定 115年(2026) 與 116年(2027) 辦公日曆表編排：總放假 120 天，每年 9 個三天以上連續假期（春節9天、中秋教師節4天、臺灣光復節3天、行憲紀念日3天等），標註國定假、傳統農曆初一十五、24節氣與西洋佳節。
            </p>

            {/* Quick Copy Today Pill & Long Holidays Guide Button */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyTodayFormatted}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 hover:bg-white text-[#582f0e] border border-[#d8c3a5] shadow-2xs hover:shadow-xs active:scale-98 transition"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
                <span>複製當天標準格式：</span>
                <span className="text-[#8b5a2b] font-mono">{getFormattedTodayString()}</span>
                {copiedToday ? (
                  <span className="text-emerald-700 font-bold ml-1 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> 已複製
                  </span>
                ) : (
                  <Copy className="w-3 h-3 ml-1 text-[#8c6d4f]" />
                )}
              </button>

              <button
                onClick={() => setShowLongHolidaysGuide(!showLongHolidaysGuide)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs ${
                  showLongHolidaysGuide
                    ? 'bg-[#7f4f24] text-white shadow-xs'
                    : 'bg-rose-100/80 hover:bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                <PartyPopper className="w-3.5 h-3.5 text-rose-600" />
                <span>9大連假攻略 (2026/2027)</span>
                {showLongHolidaysGuide ? (
                  <ChevronUp className="w-3 h-3 ml-0.5" />
                ) : (
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Storybook Mascot Illustration */}
          <div className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-[#d8c3a5] bg-[#ebdcc8] shrink-0">
            <img
              src="/hero.jpg"
              alt="花栗鼠童話故事插畫"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-2">
              <span className="text-[10px] text-white/90 font-medium drop-shadow-xs">花栗鼠小屋的月曆日記</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Control Bar & Year/Month Pickers */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#fbf6ec] border-2 border-[#dec9af] rounded-3xl shadow-xs">
        {/* Navigation buttons & Selectors */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Large Previous Month Button */}
          <button
            onClick={handlePrevMonth}
            disabled={currentYear <= 2026 && currentMonth === 1}
            className="flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base text-[#4a2e18] bg-white hover:bg-[#f6eee3] active:bg-[#ede0d0] border-2 border-[#d4ba96] shadow-xs hover:shadow-sm disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
            title="切換至上一個月份"
            aria-label="上個月"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#7f4f24] stroke-[2.5]" />
            <span>上月</span>
          </button>

          {/* Year & Month Pickers */}
          <div className="flex items-center bg-white border-2 border-[#d4ba96] rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-xs">
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
              className="text-sm sm:text-base font-black text-[#4a2e18] bg-transparent focus:outline-hidden cursor-pointer"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr} 年
                </option>
              ))}
            </select>

            <span className="text-[#c4a98c] mx-1 font-bold">/</span>

            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
              className="text-sm sm:text-base font-black text-[#4a2e18] bg-transparent focus:outline-hidden cursor-pointer"
            >
              {MONTH_NAMES_ZH.map((mName, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1} 月
                </option>
              ))}
            </select>
          </div>

          {/* Large Next Month Button */}
          <button
            onClick={handleNextMonth}
            className="flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base text-[#4a2e18] bg-white hover:bg-[#f6eee3] active:bg-[#ede0d0] border-2 border-[#d4ba96] shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            title="切換至下一個月份"
            aria-label="下個月"
          >
            <span>下月</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#7f4f24] stroke-[2.5]" />
          </button>

          {/* Return Today Button */}
          <button
            onClick={handleGoToday}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm text-[#542e0c] bg-gradient-to-r from-[#faecd8] to-[#f4deb8] hover:from-[#f4e0c5] hover:to-[#edd0a2] border-2 border-[#cfab84] shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            title="立即跳回今天所在月份"
          >
            <CalendarIcon className="w-4 h-4 text-[#8b5a2b]" />
            <span>回到今天</span>
          </button>
        </div>

        {/* Sync & Export Toolset */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export iCal */}
          <button
            onClick={() => exportEventsToICS(events)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#7f4f24] hover:bg-[#603813] rounded-xl shadow-2xs active:scale-95 transition"
            title="匯出至 iPhone、Android、Google 日曆相容的 .ics 格式"
          >
            <Download className="w-3.5 h-3.5" />
            <span>匯出行事曆 (.ics)</span>
          </button>

          {/* Import iCal */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5e3818] bg-white hover:bg-[#f5ecdf] border border-[#dec9af] rounded-xl shadow-2xs active:scale-95 transition"
            title="匯入 iPhone、Android 或 Google 的 .ics 行事曆檔案"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>匯入行事曆</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".ics,text/calendar"
            className="hidden"
          />
        </div>
      </div>

      {/* 9 大連續假期攻略面板 (Collapsible) */}
      {showLongHolidaysGuide && (
        <div className="bg-[#fffcf7] border-2 border-[#d8c3a5] rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebd9c5] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-rose-600" />
                <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#4a2e18]">
                  行政院核定 3 天以上連續假期攻略
                </h3>
              </div>
              <p className="text-xs text-[#735034] mt-0.5">
                {selectedGuideYear === 2026
                  ? '西元2026年（民國115年）：總放假日數 120 天，全年 3 天以上連續假期共 9 個'
                  : '西元2027年（民國116年）：全年 3 天以上連續假期共 9 個'}
              </p>
            </div>

            {/* Tabs for 2026 / 2027 */}
            <div className="inline-flex bg-[#ebdcc8] p-1 rounded-xl gap-1 shrink-0 self-start sm:self-center">
              <button
                onClick={() => setSelectedGuideYear(2026)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedGuideYear === 2026
                    ? 'bg-[#7f4f24] text-white shadow-2xs'
                    : 'text-[#6c4a2d] hover:text-[#4a2e18]'
                }`}
              >
                2026 年 (120天・9大連假)
              </button>
              <button
                onClick={() => setSelectedGuideYear(2027)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedGuideYear === 2027
                    ? 'bg-[#7f4f24] text-white shadow-2xs'
                    : 'text-[#6c4a2d] hover:text-[#4a2e18]'
                }`}
              >
                2027 年 (9大連假)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(selectedGuideYear === 2026 ? LONG_HOLIDAYS_2026 : LONG_HOLIDAYS_2027).map(
              (holiday, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf4ec] hover:bg-[#f6eee2] border border-[#e5d4be] rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 transition shadow-2xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#4a2e18]">
                        {idx + 1}、{holiday.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                          holiday.daysCount >= 7
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : holiday.daysCount >= 4
                            ? 'bg-amber-600 text-white'
                            : 'bg-[#8b5a2b] text-white'
                        }`}
                      >
                        {holiday.badge}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-rose-700 bg-white/80 px-2 py-1 rounded-lg border border-[#edd7c4]">
                      📅 {holiday.description}
                    </div>

                    <p className="text-xs text-[#6e4e33] leading-relaxed">
                      {holiday.details}
                    </p>
                  </div>

                  <button
                    onClick={() => handleJumpToHoliday(holiday)}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl text-xs font-bold text-[#6a3f1a] bg-white hover:bg-[#fffdfa] border border-[#d8c3a5] shadow-2xs hover:shadow-xs active:scale-98 transition"
                  >
                    <span>前往查看 {holiday.year}年{holiday.startMonth}月</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8b5a2b]" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Legend & Reminder notice */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-3 text-[11px] text-[#78593e]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <strong className="text-rose-700">休假日 (紅色標註)</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1 py-0.2 rounded-sm bg-rose-600 text-white font-bold text-[9px]">國定假</span>
            <span>行政院人事總處公告</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1 py-0.2 rounded-sm bg-emerald-100 text-emerald-800 font-medium text-[9px]">節氣</span>
            <span>二十四節氣</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-xs">🎂 ⭐ 📌</span>
            <span className="font-semibold text-[#542e0c]">標記 emoji (支援一鍵刪除)</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#8c6d4f]">
          <Info className="w-3 h-3" />
          <span>點選任一天即可加入標記、自訂行程或一鍵清除</span>
        </div>
      </div>

      {/* Calendar Month Grid */}
      <div className="bg-[#fffdfa] border-2 border-[#d8c3a5] rounded-3xl shadow-sm overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-[#e5d4be] bg-[#f8f0e3] text-center font-bold text-xs py-2">
          {WEEKDAYS.map((wd, i) => (
            <div
              key={i}
              className={`py-1 ${
                wd.isWeekend ? 'text-rose-600 font-extrabold' : 'text-[#582f0e]'
              }`}
            >
              週{wd.name}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[#eee0cb]">
          {days.map((dayItem, idx) => {
            const isRedHoliday = dayItem.isHoliday || dayItem.isWeekend || dayItem.isNationalHoliday;

            return (
              <div
                key={idx}
                onClick={() => setSelectedDay(dayItem)}
                className={`relative min-h-[90px] sm:min-h-[112px] p-1.5 sm:p-2 cursor-pointer transition-all duration-150 flex flex-col justify-between select-none ${
                  !dayItem.isCurrentMonth
                    ? 'bg-[#faf6ee]/50 opacity-40 hover:opacity-80'
                    : 'bg-white hover:bg-[#fbf4eb]'
                } ${
                  dayItem.isToday
                    ? 'ring-2 ring-inset ring-[#8b5a2b] bg-[#fcf8f0] shadow-inner'
                    : ''
                }`}
              >
                {/* Top: Day Number + Lunar Date (FULLY visible and prominent, never hidden) */}
                <div>
                  <div className="flex items-start justify-between gap-1">
                    {/* Day number with holiday red highlight */}
                    <span
                      className={`text-sm sm:text-base font-bold leading-none ${
                        isRedHoliday ? 'text-rose-600 font-black' : 'text-[#432818]'
                      } ${
                        dayItem.isToday
                          ? 'w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center text-xs shadow-xs'
                          : ''
                      }`}
                    >
                      {dayItem.day}
                    </span>

                    {/* Complete Lunar Date display - completely visible, unmasked */}
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[10.5px] sm:text-xs font-bold text-[#674121] leading-none whitespace-nowrap">
                        {dayItem.lunarDayStr === '初一' ? dayItem.lunarMonthStr : dayItem.lunarDayStr}
                      </span>
                      {dayItem.solarTerm && (
                        <span className="text-[9px] sm:text-[9.5px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300/70 px-1 py-0.2 rounded-xs whitespace-nowrap leading-none mt-0.5">
                          {dayItem.solarTerm}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Holiday / Workday label */}
                  <div className="mt-1 flex flex-col gap-0.5">
                    {dayItem.isNationalHoliday && (
                      <span className="inline-block px-1 py-0.2 rounded-sm text-[9px] font-bold bg-rose-600 text-white tracking-tighter truncate leading-tight w-fit">
                        國定假 {dayItem.holidayName || ''}
                      </span>
                    )}
                    {dayItem.holidayName && !dayItem.isNationalHoliday && (
                      <span className="text-[9px] font-semibold text-rose-600 truncate leading-tight">
                        {dayItem.holidayName}
                      </span>
                    )}
                    {dayItem.holidayNote && dayItem.holidayNote !== dayItem.holidayName && (
                      <span className="text-[8.5px] text-[#8b5a2b] font-medium truncate leading-tight hidden sm:block" title={dayItem.holidayNote}>
                        {dayItem.holidayNote.split('(')[0]}
                      </span>
                    )}
                    {dayItem.workdayNote && (
                      <span className="inline-block px-1 py-0.2 rounded-sm text-[9px] font-bold bg-stone-200 text-stone-700 truncate leading-tight w-fit">
                        {dayItem.workdayNote}
                      </span>
                    )}
                    {dayItem.westernHoliday && (
                      <span className="text-[9px] font-medium text-amber-800 truncate leading-tight">
                        {dayItem.westernHoliday}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom: Custom markers (🎂, ⭐, 📌, emoji) and event count */}
                <div className="mt-1 flex items-center justify-between pt-1 border-t border-[#f4e7d5]/60">
                  <div className="flex items-center gap-0.5 overflow-hidden">
                    {dayItem.events.slice(0, 3).map((ev) => (
                      <span key={ev.id} className="text-xs shrink-0" title={ev.title}>
                        {ev.emoji || '⭐'}
                      </span>
                    ))}
                    {dayItem.events.length > 3 && (
                      <span className="text-[9px] text-[#8c6d4f] font-bold">
                        +{dayItem.events.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Tiny acorn for today */}
                  {dayItem.isToday && (
                    <span className="text-[11px]" title="今天">
                      🌰
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Detail & Edit Modal */}
      {selectedDay && (
        <DayDetailModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
          onAddEvent={(newEvent) => {
            onAddEvent(newEvent);
            // Refresh modal state
            setSelectedDay((prev) => {
              if (!prev) return null;
              const fullEv: CalendarEvent = {
                ...newEvent,
                id: 'evt-' + Date.now(),
                createdAt: Date.now(),
              };
              return {
                ...prev,
                events: [...prev.events, fullEv],
              };
            });
          }}
          onDeleteEvent={(id) => {
            onDeleteEvent(id);
            setSelectedDay((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                events: prev.events.filter((e) => e.id !== id),
              };
            });
          }}
          onDeleteAllDayEvents={(dateStr) => {
            onDeleteAllDayEvents?.(dateStr);
            setSelectedDay((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                events: [],
              };
            });
          }}
        />
      )}
    </div>
  );
};
