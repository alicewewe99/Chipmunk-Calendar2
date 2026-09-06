import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { CalendarView } from './components/CalendarView';
import { RainbowCardView } from './components/RainbowCardView';
import { TempleOracleView } from './components/TempleOracleView';
import { RomanceAngelsView } from './components/RomanceAngelsView';
import { YesNoLoveView } from './components/YesNoLoveView';
import { LoveAnswerBookView } from './components/LoveAnswerBookView';
import { CalendarEvent } from './types';

const INITIAL_EVENTS_2026: CalendarEvent[] = [
  {
    id: 'evt-init-1',
    date: '2026-01-01',
    title: '元旦新年許願日',
    marker: 'star',
    emoji: '⭐',
    notes: '許下2026森林心願，收集金黃橡實與美好回憶。',
    time: '10:00',
    createdAt: Date.now(),
  },
  {
    id: 'evt-init-2',
    date: '2026-02-14',
    title: '西洋情人節浪漫漫步',
    marker: 'heart',
    emoji: '❤️',
    notes: '和心愛的人在童話森林裡分享熱可可。',
    time: '18:00',
    createdAt: Date.now(),
  },
  {
    id: 'evt-init-3',
    date: '2026-02-17',
    title: '春節花栗鼠賀歲生日派對',
    marker: 'cake',
    emoji: '🎂',
    notes: '大年初一，準備好香甜的堅果蛋糕招待森林小夥伴！',
    time: '12:00',
    createdAt: Date.now(),
  },
  {
    id: 'evt-init-4',
    date: '2026-05-10',
    title: '母親節感恩花籃',
    marker: 'sparkle',
    emoji: '🌸',
    notes: '採集清晨帶露珠的野花送給媽媽。',
    time: '11:00',
    createdAt: Date.now(),
  },
  {
    id: 'evt-init-5',
    date: '2026-09-25',
    title: '中秋賞月烤橡實慶典',
    marker: 'acorn',
    emoji: '🌰',
    notes: '農曆八月十五，在中秋明月下許願團聚。',
    time: '19:30',
    createdAt: Date.now(),
  },
  {
    id: 'evt-init-6',
    date: '2026-12-25',
    title: '聖誕節童話壁爐晚會',
    marker: 'cake',
    emoji: '🎂',
    notes: '聖誕快樂！掛起紅色小襪子與金鈴鐺。',
    time: '20:00',
    createdAt: Date.now(),
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('calendar');
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('chipmunk_calendar_events');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_EVENTS_2026;
  });

  // Save events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chipmunk_calendar_events', JSON.stringify(events));
    } catch {
      // localstorage errors
    }
  }, [events]);

  const handleAddEvent = (newEventData: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    const fullEvent: CalendarEvent = {
      ...newEventData,
      id: 'evt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      createdAt: Date.now(),
    };
    setEvents((prev) => [...prev, fullEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDeleteAllDayEvents = (dateStr: string) => {
    setEvents((prev) => prev.filter((e) => e.date !== dateStr));
  };

  const handleImportEvents = (importedList: Partial<CalendarEvent>[]) => {
    const validEvents: CalendarEvent[] = importedList.map((item, idx) => ({
      id: item.id || `imported-${Date.now()}-${idx}`,
      date: item.date || '2026-01-01',
      title: item.title || '匯入行程',
      time: item.time,
      notes: item.notes,
      marker: 'star',
      emoji: '⭐',
      createdAt: Date.now(),
    }));

    setEvents((prev) => [...prev, ...validEvents]);
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#4a3525] flex flex-col font-sans selection:bg-[#d8b48d] selection:text-[#38210f]">
      {/* Top Navigation Bar with Brand, Today Copy & Tab switch */}
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {currentTab === 'calendar' && (
          <CalendarView
            events={events}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onDeleteAllDayEvents={handleDeleteAllDayEvents}
            onImportEvents={handleImportEvents}
          />
        )}

        {currentTab === 'rainbow' && <RainbowCardView />}

        {currentTab === 'temple' && <TempleOracleView />}

        {currentTab === 'romance' && <RomanceAngelsView />}

        {currentTab === 'yesno' && <YesNoLoveView />}

        {currentTab === 'book' && <LoveAnswerBookView />}
      </main>

      {/* Fairytale Storybook Footer */}
      <footer className="mt-8 border-t border-[#ebdcc9] bg-[#f9f3e9] py-6 px-4 text-center text-xs text-[#8c6d4f] space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span>🌰 故事月曆</span>
          <span>・</span>
          <span>支援 iPhone、Android 與桌面離線 PWA</span>
        </div>
        <p className="max-w-xl mx-auto text-[11px] leading-relaxed text-[#a08264]">
          「只要心懷溫柔與善意，哪怕是森林裡最小的一顆橡實，也能在時間的微風中長成參天的希望之樹。」
          —— 安徒生童話小語
        </p>
        <div className="text-[10px] text-[#bca58c]">
          台灣人事行政總處最新行事曆編排・農曆二十四節氣・Doris Wenzel 彩虹卡・東港鎮海宮靈籤・浪漫天使神諭
        </div>
      </footer>
    </div>
  );
}
