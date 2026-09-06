import React, { useState } from 'react';
import { DayInfo, CalendarEvent, CalendarMarkerType } from '../types';
import { getFormattedTodayString, getGoogleCalendarLink, exportEventsToICS } from '../utils/calendarUtils';
import { X, Plus, Trash2, CalendarPlus, Copy, Check, Sparkles, Clock, FileText, Tag } from 'lucide-react';

interface DayDetailModalProps {
  day: DayInfo | null;
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => void;
  onDeleteEvent: (id: string) => void;
  onDeleteAllDayEvents?: (dateStr: string) => void;
}

const MARKER_OPTIONS: { type: CalendarMarkerType; emoji: string; label: string }[] = [
  { type: 'cake', emoji: '🎂', label: '生日蛋糕' },
  { type: 'star', emoji: '⭐', label: '重要星號' },
  { type: 'pin', emoji: '📌', label: '釘選備忘' },
  { type: 'heart', emoji: '❤️', label: '重要心動' },
  { type: 'acorn', emoji: '🌰', label: '童話橡實' },
  { type: 'work', emoji: '💼', label: '公務待辦' },
  { type: 'trip', emoji: '✈️', label: '旅行出遊' },
  { type: 'relax', emoji: '🌿', label: '休閒放鬆' },
  { type: 'sparkle', emoji: '🎉', label: '慶祝紀念' },
];

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  day,
  onClose,
  onAddEvent,
  onDeleteEvent,
  onDeleteAllDayEvents,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<CalendarMarkerType>('cake');
  const [selectedEmoji, setSelectedEmoji] = useState('🎂');

  if (!day) return null;

  const dateObj = new Date(day.year, day.month - 1, day.day);
  const formattedDateStr = getFormattedTodayString(dateObj);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedDateStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickStamp = (marker: CalendarMarkerType, emoji: string, defaultTitle: string) => {
    onAddEvent({
      date: day.dateStr,
      title: defaultTitle,
      marker,
      emoji,
    });
  };

  const handleDeleteAll = () => {
    if (day.events.length === 0) return;
    if (window.confirm(`確定要一鍵刪除 ${day.year}/${day.month}/${day.day} 的所有標記與行程嗎？`)) {
      if (onDeleteAllDayEvents) {
        onDeleteAllDayEvents(day.dateStr);
      } else {
        day.events.forEach((ev) => onDeleteEvent(ev.id));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEvent({
      date: day.dateStr,
      title: title.trim(),
      time: time || undefined,
      notes: notes.trim() || undefined,
      marker: selectedMarker,
      emoji: selectedEmoji,
    });

    setTitle('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#fffdf9] border-2 border-[#d4ba96] rounded-3xl shadow-2xl p-5 sm:p-7 text-[#4a3525]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8c6d4f] hover:bg-[#f3e9db] hover:text-[#582f0e] transition"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Date Header */}
        <div className="border-b border-[#ebd9c5] pb-4 mb-4">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-2xl sm:text-3xl font-serif-title font-bold text-[#582f0e]">
              {day.year}年{day.month}月{day.day}日
            </span>
            {day.isToday && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8b5a2b] text-white shadow-xs">
                今日 Today 🌰
              </span>
            )}
            {day.isNationalHoliday && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
                國定假
              </span>
            )}
            {day.holidayName && !day.isNationalHoliday && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                {day.holidayName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5a3619] flex-wrap mt-2">
            <span className="font-bold bg-[#f4e8d8] text-[#582f0e] border border-[#ddc6aa] px-2.5 py-1 rounded-lg shadow-2xs">
              🏮 農曆 {day.lunarFullStr || `${day.lunarMonthStr}${day.lunarDayStr}`}
            </span>
            {day.solarTerm && (
              <span className="font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg shadow-2xs">
                🌿 節氣：{day.solarTerm}
              </span>
            )}
            {day.westernHoliday && (
              <span className="font-medium bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                {day.westernHoliday}
              </span>
            )}
            {day.workdayNote && (
              <span className="font-medium bg-stone-200 text-stone-800 px-2.5 py-1 rounded-lg">
                {day.workdayNote}
              </span>
            )}
          </div>

          {/* Holiday note / long holiday announcement details */}
          {day.holidayNote && (
            <div className="mt-2.5 p-2.5 bg-[#fdf4eb] border border-[#eed4be] rounded-xl text-xs flex items-start gap-2 shadow-2xs">
              <span className="text-sm shrink-0">🌰</span>
              <div>
                <span className="font-bold text-[#8b4513]">人事行政總處假期規範：</span>
                <span className="text-[#6a472d] ml-1 leading-relaxed">{day.holidayNote}</span>
              </div>
            </div>
          )}

          {/* Copy Date in specified format: 年月日農曆日期星期 */}
          <div className="mt-3 flex items-center justify-between bg-[#fbf5eb] border border-[#e8d7c3] rounded-xl px-3 py-2 text-xs">
            <div className="text-[#69482d] truncate mr-2">
              <span className="text-amber-800 font-semibold">標準格式：</span>
              <span className="font-medium">{formattedDateStr}</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#8b5a2b] hover:text-[#582f0e] bg-white border border-[#d8c3a5] px-2.5 py-1 rounded-lg shrink-0 shadow-2xs hover:bg-[#faf4ec] transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已複製' : '複製日期'}</span>
            </button>
          </div>
        </div>

        {/* Quick Emoji Marker Bar (🎂 ⭐ 📌) & 1-Click Delete */}
        <div className="p-3 bg-[#fdf6ec] border-2 border-[#e8d7c3] rounded-2xl mb-4 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#582f0e] flex items-center gap-1">
              <span>標記 emoji：</span>
              <span className="text-[#8c6d4f] font-normal text-[11px]">點選立即標記此日</span>
            </span>
            {day.events.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-lg shadow-2xs active:scale-95 transition cursor-pointer"
                title="一鍵清除此日所有已設定標記"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>一鍵刪除全部 ({day.events.length})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleQuickStamp('cake', '🎂', '🎂 生日慶祝')}
              className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white hover:bg-[#faeee0] active:bg-[#f3dfc8] border-2 border-[#d9ba9b] text-xs font-bold text-[#542e0c] shadow-2xs active:scale-95 transition cursor-pointer"
              title="標記生日蛋糕 🎂"
            >
              <span className="text-lg">🎂</span>
              <span>生日</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickStamp('star', '⭐', '⭐ 重要事項')}
              className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white hover:bg-[#faeee0] active:bg-[#f3dfc8] border-2 border-[#d9ba9b] text-xs font-bold text-[#542e0c] shadow-2xs active:scale-95 transition cursor-pointer"
              title="標記重要星號 ⭐"
            >
              <span className="text-lg">⭐</span>
              <span>重要</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickStamp('pin', '📌', '📌 釘選備忘')}
              className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-white hover:bg-[#faeee0] active:bg-[#f3dfc8] border-2 border-[#d9ba9b] text-xs font-bold text-[#542e0c] shadow-2xs active:scale-95 transition cursor-pointer"
              title="標記釘選備忘 📌"
            >
              <span className="text-lg">📌</span>
              <span>備忘</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#f0e2cf] hover:bg-[#e6d3bb] active:bg-[#d8bf9f] text-xs font-bold text-[#4a2e18] shadow-2xs active:scale-95 transition cursor-pointer"
              title="新增帶時間或備註的自訂詳細行程"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>自訂行程</span>
            </button>
          </div>
        </div>

        {/* Existing Events List */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <h4 className="font-serif-title font-bold text-sm text-[#582f0e] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>當日已標記項目 ({day.events.length})</span>
            </h4>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7f4f24] hover:text-[#582f0e] bg-[#f4e9db] hover:bg-[#ebdcc8] px-2.5 py-1 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增其他記號</span>
              </button>
            )}
          </div>

          {day.events.length === 0 ? (
            <div className="text-center py-6 px-4 bg-[#fcf8f2] border border-dashed border-[#d8c3a5] rounded-2xl text-xs text-[#8c6d4f]">
              <p className="mb-1">今日尚無個人行程或特殊記號</p>
              <p className="text-[11px] text-[#a08264]">可點擊「新增記號/行程」加入星星⭐、生日蛋糕🎂、心動❤️等標記與提醒</p>
            </div>
          ) : (
            <div className="space-y-2">
              {day.events.map((ev) => {
                const googleLink = getGoogleCalendarLink(ev);
                return (
                  <div
                    key={ev.id}
                    className="p-3 bg-[#fbf5eb] border border-[#e8d7c3] rounded-2xl flex items-start justify-between gap-2 shadow-2xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{ev.emoji || '⭐'}</span>
                        <span className="font-bold text-sm text-[#432818]">{ev.title}</span>
                        {ev.time && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#735034] bg-[#ebdcc9] px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3" />
                            {ev.time}
                          </span>
                        )}
                      </div>
                      {ev.notes && (
                        <p className="text-xs text-[#6e4e34] whitespace-pre-wrap pl-6">{ev.notes}</p>
                      )}
                      {/* Action links */}
                      <div className="flex items-center gap-2 pt-1 pl-6">
                        <a
                          href={googleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-900 hover:underline"
                        >
                          <CalendarPlus className="w-3 h-3" /> 新增到 Google 日曆
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteEvent(ev.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="刪除此行程"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Event Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="p-4 bg-[#f8f0e3] border border-[#dec9af] rounded-2xl space-y-3 mb-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#582f0e] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> 標記特殊記號或行程
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-[#8c6d4f] hover:text-[#582f0e]"
              >
                取消
              </button>
            </div>

            {/* Marker / Emoji Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6e4e34] mb-1">
                選擇記號種類（星星⭐、生日蛋糕🎂、心動等）：
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5">
                {MARKER_OPTIONS.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => {
                      setSelectedMarker(opt.type);
                      setSelectedEmoji(opt.emoji);
                    }}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs transition-all ${
                      selectedMarker === opt.type
                        ? 'bg-[#7f4f24] text-white shadow-xs font-bold'
                        : 'bg-white/80 text-[#5e432d] hover:bg-white border border-[#dec9af]'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span className="truncate">{opt.label.slice(0, 2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6e4e34] mb-1">
                事項標題 / 紀念日名稱 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：小花栗鼠生日派對、重要會議、情人節晚餐..."
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-[#dec9af] focus:outline-hidden focus:ring-2 focus:ring-[#8b5a2b] text-[#432818]"
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#6e4e34] mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 時間 (選填)
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-xl bg-white border border-[#dec9af] focus:outline-hidden text-[#432818]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6e4e34] mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3" /> 備註與提醒細節 (選填)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="例如：記得帶禮物、訂位代號、地址等備忘資訊..."
                className="w-full text-xs px-3 py-1.5 rounded-xl bg-white border border-[#dec9af] focus:outline-hidden text-[#432818]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#7f4f24] hover:bg-[#582f0e] text-white font-semibold text-xs rounded-xl shadow-xs transition"
            >
              確認保存行程記號
            </button>
          </form>
        )}

        {/* Bottom Actions: Export iCal */}
        <div className="flex items-center justify-between pt-3 border-t border-[#ebd9c5] text-xs">
          <button
            onClick={() => exportEventsToICS(day.events, `${day.year}年${day.month}月${day.day}日花栗鼠行事曆`)}
            disabled={day.events.length === 0}
            className="inline-flex items-center gap-1.5 text-[#7f4f24] hover:text-[#582f0e] disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            title="匯出此日行程到 iPhone / Android / Google 行事曆"
          >
            <CalendarPlus className="w-4 h-4" /> 匯出今日 iCal (.ics)
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#ebdcc9] hover:bg-[#dec9af] text-[#582f0e] font-semibold transition"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
