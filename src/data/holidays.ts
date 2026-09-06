// 台灣國定假日與節日資料庫 (依據行政院人事行政總處最新核定與公告辦公日曆表)

export interface HolidayRecord {
  name: string;
  isNational: boolean; // 是否為國定假日
  isDayOff: boolean; // 是否休假
  note?: string;
}

export interface LongHolidayPlan {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  daysCount: number;
  startMonth: number;
  badge: string;
  description: string;
  details: string;
}

// 2026年 (民國115年) 全年3天以上連續假期清單 (總放假日數120天，共9個連假)
export const LONG_HOLIDAYS_2026: LongHolidayPlan[] = [
  {
    id: '2026-cny',
    name: '農曆春節假期',
    year: 2026,
    startDate: '2026-02-14',
    endDate: '2026-02-22',
    daysCount: 9,
    startMonth: 2,
    badge: '連休 9 天',
    description: '2月14日(六) 至 2月22日(日)',
    details: '小年夜、除夕、大年初一至初三國定假，初四補假，前後銜接週六日共連休9天。',
  },
  {
    id: '2026-228',
    name: '和平紀念日',
    year: 2026,
    startDate: '2026-02-27',
    endDate: '2026-03-01',
    daysCount: 3,
    startMonth: 2,
    badge: '連休 3 天',
    description: '2月27日(五) 至 3月1日(日)',
    details: '228紀念日適逢週六，於2月27日(五)提前補假，形成3天連假。',
  },
  {
    id: '2026-tomb',
    name: '兒童及清明節',
    year: 2026,
    startDate: '2026-04-03',
    endDate: '2026-04-06',
    daysCount: 4,
    startMonth: 4,
    badge: '連休 4 天',
    description: '4月3日(五) 至 4月6日(一)',
    details: '兒童節(4/4逢週六補假於4/3)、清明節(4/5逢週日補假於4/6)，合計連休4天。',
  },
  {
    id: '2026-labor',
    name: '勞動節',
    year: 2026,
    startDate: '2026-05-01',
    endDate: '2026-05-03',
    daysCount: 3,
    startMonth: 5,
    badge: '連休 3 天',
    description: '5月1日(五) 至 5月3日(日)',
    details: '5月1日(五)勞動節，銜接週末連休3天(勞工放假)。',
  },
  {
    id: '2026-dragon',
    name: '端午節',
    year: 2026,
    startDate: '2026-06-19',
    endDate: '2026-06-21',
    daysCount: 3,
    startMonth: 6,
    badge: '連休 3 天',
    description: '6月19日(五) 至 6月21日(日)',
    details: '農曆五月初五端午節適逢週五，銜接週末連休3天。',
  },
  {
    id: '2026-moon-teacher',
    name: '中秋及教師節',
    year: 2026,
    startDate: '2026-09-25',
    endDate: '2026-09-28',
    daysCount: 4,
    startMonth: 9,
    badge: '連休 4 天',
    description: '9月25日(五) 至 9月28日(一)',
    details: '中秋節(9/25週五)與孔子誕辰紀念日／教師節(9/28週一)，包含週末連休4天。',
  },
  {
    id: '2026-national',
    name: '國慶日',
    year: 2026,
    startDate: '2026-10-09',
    endDate: '2026-10-11',
    daysCount: 3,
    startMonth: 10,
    badge: '連休 3 天',
    description: '10月9日(五) 至 10月11日(日)',
    details: '雙十國慶日適逢週六，於10月9日(五)提前補假，形成3天連假。',
  },
  {
    id: '2026-retrocession',
    name: '臺灣光復紀念日',
    year: 2026,
    startDate: '2026-10-24',
    endDate: '2026-10-26',
    daysCount: 3,
    startMonth: 10,
    badge: '連休 3 天',
    description: '10月24日(六) 至 10月26日(一)',
    details: '臺灣光復暨金門古寧頭大捷紀念日(10/25逢週日，10/26補假)，連休3天。',
  },
  {
    id: '2026-constitution',
    name: '行憲紀念日',
    year: 2026,
    startDate: '2026-12-25',
    endDate: '2026-12-27',
    daysCount: 3,
    startMonth: 12,
    badge: '連休 3 天',
    description: '12月25日(五) 至 12月27日(日)',
    details: '12月25日(五)行憲紀念日，銜接週末連休3天。',
  },
];

// 2027年 (民國116年) 全年3天以上連續假期清單 (共9個連假)
export const LONG_HOLIDAYS_2027: LongHolidayPlan[] = [
  {
    id: '2027-newyear',
    name: '2027元旦',
    year: 2027,
    startDate: '2027-01-01',
    endDate: '2027-01-03',
    daysCount: 3,
    startMonth: 1,
    badge: '連休 3 天',
    description: '1月1日(五) 至 1月3日(日)',
    details: '開國紀念日適逢週五，銜接週末連休3天。',
  },
  {
    id: '2027-cny',
    name: '過年春節假期',
    year: 2027,
    startDate: '2027-02-04',
    endDate: '2027-02-10',
    daysCount: 7,
    startMonth: 2,
    badge: '連休 7 天',
    description: '2月4日(四) 至 2月10日(三)',
    details: '小年夜(2/4)、除夕(2/5)、大年初一至初三，初一初二逢週末補假於2/9及2/10，連休7天。',
  },
  {
    id: '2027-228',
    name: '228紀念日',
    year: 2027,
    startDate: '2027-02-27',
    endDate: '2027-03-01',
    daysCount: 3,
    startMonth: 2,
    badge: '連休 3 天',
    description: '2月27日(六) 至 3月1日(一)',
    details: '228和平紀念日適逢週日，於3月1日(一)補假，連休3天。',
  },
  {
    id: '2027-tomb',
    name: '清明節及兒童節',
    year: 2027,
    startDate: '2027-04-03',
    endDate: '2027-04-06',
    daysCount: 4,
    startMonth: 4,
    badge: '連休 4 天',
    description: '4月3日(六) 至 4月6日(二)',
    details: '兒童節(4/4適逢週日)、清明節(4/5週一)，兒童節逢週日於4/6(二)補假，連休4天。',
  },
  {
    id: '2027-labor',
    name: '勞動節',
    year: 2027,
    startDate: '2027-04-30',
    endDate: '2027-05-02',
    daysCount: 3,
    startMonth: 4,
    badge: '連休 3 天',
    description: '4月30日(五) 至 5月2日(日)',
    details: '5月1日勞動節適逢週六，於4月30日(五)提前補假，連休3天。',
  },
  {
    id: '2027-national',
    name: '雙十國慶日',
    year: 2027,
    startDate: '2027-10-09',
    endDate: '2027-10-11',
    daysCount: 3,
    startMonth: 10,
    badge: '連休 3 天',
    description: '10月9日(六) 至 10月11日(一)',
    details: '10月10日國慶日適逢週日，於10月11日(一)補假，連休3天。',
  },
  {
    id: '2027-retrocession',
    name: '台灣光復節',
    year: 2027,
    startDate: '2027-10-23',
    endDate: '2027-10-25',
    daysCount: 3,
    startMonth: 10,
    badge: '連休 3 天',
    description: '10月23日(六) 至 10月25日(一)',
    details: '10月25日(一)臺灣光復節，銜接週末連休3天。',
  },
  {
    id: '2027-constitution',
    name: '行憲紀念日',
    year: 2027,
    startDate: '2027-12-24',
    endDate: '2027-12-26',
    daysCount: 3,
    startMonth: 12,
    badge: '連休 3 天',
    description: '12月24日(五) 至 12月26日(日)',
    details: '12月25日行憲紀念日適逢週六，於12月24日(五)提前補假，連休3天。',
  },
  {
    id: '2027-newyear2028',
    name: '2028跨年假期',
    year: 2027,
    startDate: '2027-12-31',
    endDate: '2028-01-02',
    daysCount: 3,
    startMonth: 12,
    badge: '連休 3 天',
    description: '12月31日(五) 至 1月2日(日)',
    details: '2028年元旦適逢週六，於12月31日(五)提前補假，連休3天迎接2028。',
  },
];

// 2026 行政院人事行政總處核定辦公日曆表放假與國定假日精確清單 (總放假120天)
export const TAIWAN_HOLIDAYS_2026: Record<string, HolidayRecord> = {
  // 開國紀念日元旦
  '2026-01-01': { name: '元旦', isNational: true, isDayOff: true, note: '中華民國開國紀念日' },

  // 1、農曆春節假期，2月14日至2月22日，連休9天
  '2026-02-14': { name: '春節連假', isNational: true, isDayOff: true, note: '春節9天連假第1天 (2/14~2/22連休9天)' },
  '2026-02-15': { name: '小年夜', isNational: true, isDayOff: true, note: '農曆小年夜 (春節連假第2天)' },
  '2026-02-16': { name: '除夕', isNational: true, isDayOff: true, note: '農曆除夕' },
  '2026-02-17': { name: '春節初一', isNational: true, isDayOff: true, note: '農曆大年初一' },
  '2026-02-18': { name: '春節初二', isNational: true, isDayOff: true, note: '大年初二回娘家' },
  '2026-02-19': { name: '春節初三', isNational: true, isDayOff: true, note: '大年初三赤狗日' },
  '2026-02-20': { name: '初四補假', isNational: true, isDayOff: true, note: '春節初四補假/連假' },
  '2026-02-21': { name: '春節初五', isNational: true, isDayOff: true, note: '大年初五 (春節週末連假)' },
  '2026-02-22': { name: '春節初六', isNational: true, isDayOff: true, note: '大年初六 (春節連休收假)' },

  // 2、和平紀念日，2月27日至3月1日，連休3天
  '2026-02-27': { name: '和平紀念補假', isNational: true, isDayOff: true, note: '228適逢週六提前週五補假 (2/27~3/1連休3天)' },
  '2026-02-28': { name: '和平紀念日', isNational: true, isDayOff: true, note: '二二八和平紀念日' },
  '2026-03-01': { name: '和平紀念連假', isNational: false, isDayOff: true, note: '228連假 (週日)' },

  // 3、兒童及清明節，4月3日至4月6日，連休4天
  '2026-04-03': { name: '兒童節補假', isNational: true, isDayOff: true, note: '兒童節逢週六提前週五補假 (4/3~4/6連休4天)' },
  '2026-04-04': { name: '兒童節', isNational: true, isDayOff: true, note: '兒童節' },
  '2026-04-05': { name: '清明節', isNational: true, isDayOff: true, note: '民族掃墓節' },
  '2026-04-06': { name: '清明補假', isNational: true, isDayOff: true, note: '清明節逢週日延後週一補假' },

  // 4、勞動節，5月1日至5月3日，連休3天
  '2026-05-01': { name: '勞動節', isNational: true, isDayOff: true, note: '勞動節(勞工放假，5/1~5/3連休3天)' },
  '2026-05-02': { name: '勞動節連假', isNational: false, isDayOff: true, note: '勞動節連假 (週六)' },
  '2026-05-03': { name: '勞動節連假', isNational: false, isDayOff: true, note: '勞動節連假 (週日)' },

  // 5、端午節，6月19日至6月21日，連休3天
  '2026-06-19': { name: '端午節', isNational: true, isDayOff: true, note: '農曆五月初五端午節 (6/19~6/21連休3天)' },
  '2026-06-20': { name: '端午連假', isNational: false, isDayOff: true, note: '端午連假 (週六)' },
  '2026-06-21': { name: '端午連假', isNational: false, isDayOff: true, note: '端午連假 (週日)' },

  // 6、中秋節及孔子誕辰紀念日／教師節，9月25日至9月28日，連休4天
  '2026-09-25': { name: '中秋節', isNational: true, isDayOff: true, note: '農曆八月十五中秋節 (9/25~9/28連休4天)' },
  '2026-09-26': { name: '中秋連假', isNational: false, isDayOff: true, note: '中秋連假 (週六)' },
  '2026-09-27': { name: '中秋連假', isNational: false, isDayOff: true, note: '中秋連假 (週日)' },
  '2026-09-28': { name: '教師節', isNational: true, isDayOff: true, note: '孔子誕辰紀念日／教師節 (國定假日放假)' },

  // 7、國慶日，10月9日至10月11日，連休3天
  '2026-10-09': { name: '國慶補假', isNational: true, isDayOff: true, note: '雙十國慶逢週六提前週五補假 (10/9~10/11連休3天)' },
  '2026-10-10': { name: '國慶日', isNational: true, isDayOff: true, note: '中華民國國慶日' },
  '2026-10-11': { name: '國慶連假', isNational: false, isDayOff: true, note: '雙十國慶連假 (週日)' },

  // 8、臺灣光復暨金門古寧頭大捷紀念日，10月24日至10月26日，連休3天
  '2026-10-24': { name: '光復節連假', isNational: false, isDayOff: true, note: '臺灣光復節週末連假 (10/24~10/26連休3天)' },
  '2026-10-25': { name: '臺灣光復節', isNational: true, isDayOff: true, note: '臺灣光復暨金門古寧頭大捷紀念日' },
  '2026-10-26': { name: '光復節補假', isNational: true, isDayOff: true, note: '臺灣光復節逢週日延後週一補假' },

  // 9、行憲紀念日，12月25日至12月27日，連休3天
  '2026-12-25': { name: '行憲紀念日', isNational: true, isDayOff: true, note: '行憲紀念日 (12/25~12/27連休3天)' },
  '2026-12-26': { name: '行憲連假', isNational: false, isDayOff: true, note: '行憲紀念日連假 (週六)' },
  '2026-12-27': { name: '行憲連假', isNational: false, isDayOff: true, note: '行憲紀念日連假 (週日)' },
};

// 2027年 國定假日與連續假期精確清單 (9個3天以上連假)
export const TAIWAN_HOLIDAYS_2027: Record<string, HolidayRecord> = {
  // 1、2027元旦 3 天（1/1(五) ~ 1/3(日)）
  '2027-01-01': { name: '元旦', isNational: true, isDayOff: true, note: '開國紀念日 (1/1~1/3連休3天)' },
  '2027-01-02': { name: '元旦連假', isNational: false, isDayOff: true, note: '元旦週末連假' },
  '2027-01-03': { name: '元旦連假', isNational: false, isDayOff: true, note: '元旦週末連假' },

  // 2、過年春節 7 天（2/4(四) ~ 2/10(三)）
  '2027-02-04': { name: '小年夜', isNational: true, isDayOff: true, note: '農曆小年夜 (2/4~2/10春節連休7天)' },
  '2027-02-05': { name: '除夕', isNational: true, isDayOff: true, note: '農曆除夕' },
  '2027-02-06': { name: '春節初一', isNational: true, isDayOff: true, note: '農曆大年初一' },
  '2027-02-07': { name: '春節初二', isNational: true, isDayOff: true, note: '大年初二回娘家' },
  '2027-02-08': { name: '春節初三', isNational: true, isDayOff: true, note: '大年初三赤狗日' },
  '2027-02-09': { name: '初四補假', isNational: true, isDayOff: true, note: '初一適逢週六初四補假' },
  '2027-02-10': { name: '初五補假', isNational: true, isDayOff: true, note: '初二適逢週日初五補假 (收假)' },

  // 3、228紀念日 3 天（2/27(六) ~ 3/1(一)）
  '2027-02-27': { name: '和平紀念連假', isNational: false, isDayOff: true, note: '228週末連假 (2/27~3/1連休3天)' },
  '2027-02-28': { name: '和平紀念日', isNational: true, isDayOff: true, note: '二二八和平紀念日' },
  '2027-03-01': { name: '和平紀念補假', isNational: true, isDayOff: true, note: '228適逢週日延後週一補假' },

  // 4、清明節 4 天（4/3(六) ~ 4/6(二)）
  '2027-04-03': { name: '清明連假', isNational: false, isDayOff: true, note: '清明連假週末 (4/3~4/6連休4天)' },
  '2027-04-04': { name: '兒童節', isNational: true, isDayOff: true, note: '兒童節' },
  '2027-04-05': { name: '清明節', isNational: true, isDayOff: true, note: '民族掃墓節' },
  '2027-04-06': { name: '兒童清明補假', isNational: true, isDayOff: true, note: '兒童節逢週日補假' },

  // 5、勞動節 3 天（4/30(五) ~ 5/2(日)）
  '2027-04-30': { name: '勞動節補假', isNational: true, isDayOff: true, note: '5/1適逢週六提前週五補假 (4/30~5/2連休3天)' },
  '2027-05-01': { name: '勞動節', isNational: true, isDayOff: true, note: '勞動節(勞工放假)' },
  '2027-05-02': { name: '勞動節連假', isNational: false, isDayOff: true, note: '勞動節週末連假' },

  // 2027端午節 (6/9週三)
  '2027-06-09': { name: '端午節', isNational: true, isDayOff: true, note: '農曆五月初五端午節' },

  // 2027中秋節 (9/15週三)
  '2027-09-15': { name: '中秋節', isNational: true, isDayOff: true, note: '農曆八月十五中秋節' },

  // 2027教師節 (9/28週二)
  '2027-09-28': { name: '教師節', isNational: true, isDayOff: true, note: '孔子誕辰紀念日／教師節' },

  // 6、雙十國慶 3 天（10/9(六) ~ 10/11(一)）
  '2027-10-09': { name: '國慶連假', isNational: false, isDayOff: true, note: '國慶週末連假 (10/9~10/11連休3天)' },
  '2027-10-10': { name: '國慶日', isNational: true, isDayOff: true, note: '雙十國慶日' },
  '2027-10-11': { name: '國慶補假', isNational: true, isDayOff: true, note: '國慶逢週日延後週一補假' },

  // 7、台灣光復節 3 天（10/23(六) ~ 10/25(一)）
  '2027-10-23': { name: '光復節連假', isNational: false, isDayOff: true, note: '臺灣光復節週末 (10/23~10/25連休3天)' },
  '2027-10-24': { name: '光復節連假', isNational: false, isDayOff: true, note: '臺灣光復節週末' },
  '2027-10-25': { name: '臺灣光復節', isNational: true, isDayOff: true, note: '臺灣光復紀念日' },

  // 8、行憲紀念日 3 天（12/24(五) ~ 12/26(日)）
  '2027-12-24': { name: '行憲補假', isNational: true, isDayOff: true, note: '12/25適逢週六提前週五補假 (12/24~12/26連休3天)' },
  '2027-12-25': { name: '行憲紀念日', isNational: true, isDayOff: true, note: '行憲紀念日' },
  '2027-12-26': { name: '行憲連假', isNational: false, isDayOff: true, note: '行憲紀念日週末連假' },

  // 9、2028跨年 3 天（12/31(五) ~ 1/2(日)）
  '2027-12-31': { name: '跨年/元旦補假', isNational: true, isDayOff: true, note: '2028元旦逢週六提前週五補假 (12/31~1/2連休3天)' },
  '2028-01-01': { name: '元旦', isNational: true, isDayOff: true, note: '中華民國開國紀念日' },
  '2028-01-02': { name: '元旦連假', isNational: false, isDayOff: true, note: '跨年元旦週末連假' },
};

// 合併所有已定義年分的國定假日速查表
export const TAIWAN_HOLIDAYS_ALL: Record<string, HolidayRecord> = {
  ...TAIWAN_HOLIDAYS_2026,
  ...TAIWAN_HOLIDAYS_2027,
};

// 取得特定日期的台灣國定假日記錄
export function getTaiwanHolidayRecord(dateKey: string, year: number, month: number, day: number): HolidayRecord | undefined {
  if (TAIWAN_HOLIDAYS_ALL[dateKey]) {
    return TAIWAN_HOLIDAYS_ALL[dateKey];
  }

  // 通用 fallback (若使用者查詢 2028+ 年等)
  const mmDd = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  if (mmDd === '01-01') {
    return { name: '元旦', isNational: true, isDayOff: true, note: '開國紀念日' };
  }
  if (mmDd === '02-28') {
    return { name: '和平紀念日', isNational: true, isDayOff: true, note: '二二八和平紀念日' };
  }
  if (mmDd === '04-04') {
    return { name: '兒童節', isNational: true, isDayOff: true, note: '兒童節' };
  }
  if (mmDd === '04-05') {
    return { name: '清明節', isNational: true, isDayOff: true, note: '民族掃墓節' };
  }
  if (mmDd === '05-01') {
    return { name: '勞動節', isNational: true, isDayOff: true, note: '勞動節(勞工放假)' };
  }
  if (mmDd === '09-28') {
    return { name: '教師節', isNational: true, isDayOff: true, note: '孔子誕辰紀念日／教師節' };
  }
  if (mmDd === '10-10') {
    return { name: '國慶日', isNational: true, isDayOff: true, note: '雙十國慶' };
  }
  if (mmDd === '10-25') {
    return { name: '臺灣光復節', isNational: true, isDayOff: true, note: '臺灣光復紀念日' };
  }
  if (mmDd === '12-25') {
    return { name: '行憲紀念日', isNational: true, isDayOff: true, note: '行憲紀念日' };
  }

  return undefined;
}

// 西洋傳統節日與紀念日 (公曆固定月份與日期)
export const WESTERN_HOLIDAYS_FIXED: Record<string, string> = {
  '01-01': '元旦 (New Year)',
  '02-14': '西洋情人節 ❤️',
  '03-08': '國際婦女節 🌸',
  '03-14': '白色情人節 🍬',
  '04-01': '愚人節 🎭',
  '04-22': '世界地球日 🌍',
  '08-08': '父親節 🎩',
  '09-03': '軍人節 🎖️',
  '09-28': '教師節 📚',
  '10-31': '萬聖節 🎃',
  '12-24': '平安夜 🕯️',
  '12-25': '聖誕節 🎄',
  '12-31': '跨年夜 🎆',
};

// 計算動態母親節 (5月第2個星期日) 與 感恩節 (11月第4個星期四)
export function getDynamicWesternHoliday(year: number, month: number, day: number): string | undefined {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); // 0 is Sunday, 4 is Thursday

  // 5月第二個週日: 母親節
  if (month === 5 && dayOfWeek === 0) {
    const sundayIndex = Math.ceil(day / 7);
    if (sundayIndex === 2) {
      return '母親節 💐';
    }
  }

  // 11月第四個週四: 感恩節
  if (month === 11 && dayOfWeek === 4) {
    const thursdayIndex = Math.ceil(day / 7);
    if (thursdayIndex === 4) {
      return '感恩節 🦃';
    }
  }

  return undefined;
}
