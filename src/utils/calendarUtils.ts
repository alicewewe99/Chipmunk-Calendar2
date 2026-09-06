import { Solar, Lunar } from 'lunar-javascript';
import { DayInfo, CalendarEvent } from '../types';
import {
  getTaiwanHolidayRecord,
  WESTERN_HOLIDAYS_FIXED,
  getDynamicWesternHoliday,
} from '../data/holidays';

const WEEKDAY_NAMES_ZH = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

// Format date into YYYY-MM-DD
export function formatDateKey(year: number, month: number, day: number): string {
  const m = month.toString().padStart(2, '0');
  const d = day.toString().padStart(2, '0');
  return `${year}-${m}-${d}`;
}

// 格式化當天日期格式：年月日農曆日期星期
// 例如：2026年9月5日 農曆七月廿五 星期六
export function getFormattedTodayString(targetDate?: Date): string {
  const d = targetDate || new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdayStr = WEEKDAY_NAMES_ZH[d.getDay()];

  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();

  const lunarMonthStr = lunar.getMonthInChinese() + '月';
  const lunarDayStr = lunar.getDayInChinese();
  const jieQi = lunar.getJieQi();
  const jieQiSuffix = jieQi ? `・${jieQi}` : '';

  return `${year}年${month}月${day}日 農曆${lunarMonthStr}${lunarDayStr}${jieQiSuffix} ${weekdayStr}`;
}

// 產生指定年月的完整日曆網格資料
export function getMonthCalendarDays(
  year: number,
  month: number, // 1 ~ 12
  allEvents: CalendarEvent[]
): DayInfo[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  const days: DayInfo[] = [];

  const today = new Date();
  const todayStr = formatDateKey(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // Helper to map event
  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const ev of allEvents) {
    const list = eventsByDate.get(ev.date) || [];
    list.push(ev);
    eventsByDate.set(ev.date, list);
  }

  const buildDayInfo = (y: number, m: number, d: number, isCurrentMonth: boolean): DayInfo => {
    const dateKey = formatDateKey(y, m, d);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday = dateKey === todayStr;

    // Lunar calculations
    let lunarMonthStr = '';
    let lunarDayStr = '';
    let lunarFullStr = '';
    let solarTerm: string | undefined = undefined;

    try {
      const solar = Solar.fromYmd(y, m, d);
      const lunar = solar.getLunar();
      lunarMonthStr = lunar.getMonthInChinese() + '月';
      lunarDayStr = lunar.getDayInChinese();
      lunarFullStr = `${lunar.getYearInGanZhi()}年${lunarMonthStr}${lunarDayStr}`;
      const jie = lunar.getJieQi();
      if (jie) {
        solarTerm = jie;
      }
    } catch {
      lunarDayStr = `${d}日`;
      lunarMonthStr = '';
      lunarFullStr = '';
    }

    // Holiday checking
    const fixedMmDd = `${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    let holidayName: string | undefined = undefined;
    let holidayNote: string | undefined = undefined;
    let isNationalHoliday = false;
    let isHoliday = isWeekend;
    let workdayNote: string | undefined = undefined;

    // 1. Taiwan National Holiday Check
    const twHoliday = getTaiwanHolidayRecord(dateKey, y, m, d);
    if (twHoliday) {
      holidayName = twHoliday.name;
      holidayNote = twHoliday.note;
      isNationalHoliday = twHoliday.isNational;
      isHoliday = twHoliday.isDayOff;
      if (!twHoliday.isDayOff && twHoliday.note) {
        workdayNote = twHoliday.note;
      }
    }

    // 2. Western holidays
    let westernHoliday = WESTERN_HOLIDAYS_FIXED[fixedMmDd];
    const dynamicWestern = getDynamicWesternHoliday(y, m, d);
    if (dynamicWestern) {
      westernHoliday = westernHoliday ? `${westernHoliday} / ${dynamicWestern}` : dynamicWestern;
    }

    return {
      dateStr: dateKey,
      year: y,
      month: m,
      day: d,
      isCurrentMonth,
      isToday,
      isWeekend,
      isHoliday,
      holidayName,
      holidayNote,
      isNationalHoliday,
      solarTerm,
      lunarMonthStr,
      lunarDayStr,
      lunarFullStr,
      westernHoliday,
      workdayNote,
      events: eventsByDate.get(dateKey) || [],
    };
  };

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const dayNum = prevMonthDays - i;
    days.push(buildDayInfo(prevYear, prevMonth, dayNum, false));
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(buildDayInfo(year, month, d, true));
  }

  // Next month padding to fill standard 42 (or multiple of 7) cells
  const remainingCells = 42 - days.length;
  if (remainingCells > 0 && remainingCells < 7) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    for (let d = 1; d <= remainingCells; d++) {
      days.push(buildDayInfo(nextYear, nextMonth, d, false));
    }
  } else if (days.length % 7 !== 0) {
    const fill = 7 - (days.length % 7);
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    for (let d = 1; d <= fill; d++) {
      days.push(buildDayInfo(nextYear, nextMonth, d, false));
    }
  }

  return days;
}

// 匯出 iCalendar (.ics) 檔案 (支援 iPhone / Android / Google / Mac 行事曆)
export function exportEventsToICS(events: CalendarEvent[], calendarTitle = '花栗鼠童話行事曆'): void {
  if (events.length === 0) {
    alert('目前尚無自訂行程或提醒事項可以匯出喔！請先在日曆上點選日期新增行程。');
    return;
  }

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chipmunk Fairytale Calendar//TW',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${calendarTitle}`,
    'X-WR-TIMEZONE:Asia/Taipei',
  ];

  for (const ev of events) {
    // format YYYYMMDD
    const dateFormatted = ev.date.replace(/-/g, '');
    const startTime = ev.time ? ev.time.replace(':', '') + '00' : '090000';
    const startStr = `${dateFormatted}T${startTime}`;
    // default 1 hour duration
    const endHour = ev.time ? (parseInt(ev.time.split(':')[0], 10) + 1).toString().padStart(2, '0') : '10';
    const endMin = ev.time ? ev.time.split(':')[1] : '00';
    const endStr = `${dateFormatted}T${endHour}${endMin}00`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:chipmunk-${ev.id}@fairytale.calendar`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);
    lines.push(`DTSTART;TZID=Asia/Taipei:${startStr}`);
    lines.push(`DTEND;TZID=Asia/Taipei:${endStr}`);
    lines.push(`SUMMARY:${(ev.emoji ? ev.emoji + ' ' : '') + ev.title}`);
    if (ev.notes) {
      lines.push(`DESCRIPTION:${ev.notes.replace(/\n/g, '\\n')}`);
    }
    lines.push('STATUS:CONFIRMED');
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  const icsContent = lines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `chipmunk_calendar_${new Date().toISOString().slice(0, 10)}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 產生直接加入 Google 日曆的網址
export function getGoogleCalendarLink(event: CalendarEvent): string {
  const title = encodeURIComponent((event.emoji ? event.emoji + ' ' : '') + event.title);
  const details = encodeURIComponent(event.notes || '花栗鼠童話月曆行程');
  const dateStr = event.date.replace(/-/g, '');
  const timeStr = event.time ? event.time.replace(':', '') + '00' : '090000';
  const startParam = `${dateStr}T${timeStr}`;

  const endHour = event.time ? (parseInt(event.time.split(':')[0], 10) + 1).toString().padStart(2, '0') : '10';
  const endMin = event.time ? event.time.split(':')[1] : '00';
  const endParam = `${dateStr}T${endHour}${endMin}00`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startParam}/${endParam}&ctz=Asia/Taipei`;
}

// 解析匯入的 .ics 檔案內容
export function parseICS(icsText: string): Partial<CalendarEvent>[] {
  const events: Partial<CalendarEvent>[] = [];
  const vevents = icsText.split('BEGIN:VEVENT');

  for (let i = 1; i < vevents.length; i++) {
    const block = vevents[i].split('END:VEVENT')[0];
    let summary = '';
    let description = '';
    let dtstart = '';

    const lines = block.split(/\r\n|\n|\r/);
    for (const line of lines) {
      if (line.startsWith('SUMMARY:')) {
        summary = line.substring(8).trim();
      } else if (line.startsWith('DESCRIPTION:')) {
        description = line.substring(12).replace(/\\n/g, '\n').trim();
      } else if (line.startsWith('DTSTART')) {
        const parts = line.split(':');
        if (parts.length > 1) {
          dtstart = parts[1].trim();
        }
      }
    }

    if (summary && dtstart) {
      // Parse YYYYMMDD
      let year = '';
      let month = '';
      let day = '';
      let time = '';
      if (dtstart.length >= 8) {
        year = dtstart.substring(0, 4);
        month = dtstart.substring(4, 6);
        day = dtstart.substring(6, 8);
      }
      if (dtstart.includes('T') && dtstart.length >= 13) {
        const timePart = dtstart.split('T')[1];
        time = `${timePart.substring(0, 2)}:${timePart.substring(2, 4)}`;
      }

      if (year && month && day) {
        events.push({
          id: 'imported-' + Date.now() + '-' + i,
          date: `${year}-${month}-${day}`,
          title: summary,
          time: time || undefined,
          notes: description || undefined,
          createdAt: Date.now(),
        });
      }
    }
  }

  return events;
}
