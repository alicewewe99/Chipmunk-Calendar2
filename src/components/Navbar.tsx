import React, { useState } from 'react';
import { PWAInstallButton } from './PWAInstallModal';
import { getFormattedTodayString } from '../utils/calendarUtils';
import { Calendar, Sparkles, ScrollText, Heart, HelpCircle, BookOpen, Copy, Check } from 'lucide-react';

export type NavTab = 'calendar' | 'rainbow' | 'temple' | 'romance' | 'yesno' | 'book';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const [copied, setCopied] = useState(false);
  const todayStr = getFormattedTodayString();

  const handleCopyToday = async () => {
    try {
      await navigator.clipboard.writeText(todayStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = todayStr;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const navItems = [
    { id: 'calendar', label: '童話月曆', icon: Calendar, badge: '2026+' },
    { id: 'rainbow', label: '彩虹卡', icon: Sparkles, badge: '7色' },
    { id: 'temple', label: '鎮海宮靈籤', icon: ScrollText, badge: '六十甲子' },
    { id: 'romance', label: '浪漫天使', icon: Heart, badge: '44張' },
    { id: 'yesno', label: 'YES/NO愛情', icon: HelpCircle, badge: '指引' },
    { id: 'book', label: '愛情解答之書', icon: BookOpen, badge: '占卜' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fdfaf3]/95 backdrop-blur-md border-b border-[#e5d4be] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Top bar: Brand + Today's Copy + PWA */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2.5 sm:py-3 gap-2.5 border-b border-[#f1e4d3] sm:border-b-0">
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-md border-2 border-[#d4ba96] bg-[#f2e6d6] shrink-0">
              <img
                src="/icon.png"
                alt="花栗鼠月曆圖案"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-title font-bold text-lg sm:text-xl text-[#4a2e18] tracking-tight">
                  故事月曆
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#8b5a2b]/15 text-[#6f451f] border border-[#8b5a2b]/20">
                  安徒生童話風 🌰
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#8c6d4f]">
                台灣國定節日・農曆節氣・彩虹能量・靈籤與愛情指引
              </p>
            </div>
          </div>

          {/* Actions: Copy Today & Install */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Today Date Badge with 1-click copy */}
            <button
              onClick={handleCopyToday}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#5e432d] bg-[#f4e9db] hover:bg-[#ebdcc8] border border-[#d8c3a5] active:scale-95 transition-all shadow-2xs"
              title="點擊複製當天完整日期格式（年月日農曆日期星期）"
            >
              <span className="text-amber-700 font-semibold">今日：</span>
              <span className="text-[#432818] truncate max-w-[200px] sm:max-w-none">{todayStr}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded-full text-[10px]">
                  <Check className="w-3 h-3" /> 已複製
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#8c6d4f] group-hover:text-[#582f0e] transition" />
              )}
            </button>

            <PWAInstallButton />
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as NavTab)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#7f4f24] text-[#fffcf7] shadow-md shadow-[#7f4f24]/20 scale-102'
                    : 'text-[#6c4a2d] hover:bg-[#f1e5d5] hover:text-[#432818]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#f5deb3]' : 'text-[#8c6d4f]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                      isActive
                        ? 'bg-[#582f0e] text-[#f7eedc]'
                        : 'bg-[#e9dac7] text-[#7a5535]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
