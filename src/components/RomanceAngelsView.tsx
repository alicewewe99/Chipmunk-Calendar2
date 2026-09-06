import React, { useState } from 'react';
import { ROMANCE_ANGEL_CARDS } from '../data/romanceCards';
import { RomanceAngelCard } from '../types';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Copy, Check, Grid, Compass, BookOpen } from 'lucide-react';

export const RomanceAngelsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'single' | 'spread' | 'all'>('single');
  const [drawnCard, setDrawnCard] = useState<RomanceAngelCard>(ROMANCE_ANGEL_CARDS[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [spread, setSpread] = useState<{ past: RomanceAngelCard; present: RomanceAngelCard; future: RomanceAngelCard }>({
    past: ROMANCE_ANGEL_CARDS[25], // 前世的關係
    present: ROMANCE_ANGEL_CARDS[0], // 吸引力
    future: ROMANCE_ANGEL_CARDS[37], // 真愛
  });
  const [copied, setCopied] = useState(false);
  const [selectedGalleryCard, setSelectedGalleryCard] = useState<RomanceAngelCard | null>(null);

  // Draw single angel card
  const handleDrawSingle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const card = ROMANCE_ANGEL_CARDS[Math.floor(Math.random() * ROMANCE_ANGEL_CARDS.length)];
      setDrawnCard(card);
      setIsFlipping(false);

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ff80ab', '#f48fb1', '#ce93d8', '#ffd54f'],
      });
    }, 450);
  };

  // Draw three-card love spread (Past, Present, Future)
  const handleDrawSpread = () => {
    setIsFlipping(true);
    setTimeout(() => {
      // Pick 3 distinct cards
      const shuffled = [...ROMANCE_ANGEL_CARDS].sort(() => 0.5 - Math.random());
      setSpread({
        past: shuffled[0],
        present: shuffled[1],
        future: shuffled[2],
      });
      setIsFlipping(false);

      confetti({
        particleCount: 65,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#f06292', '#e1bee7', '#fff176'],
      });
    }, 550);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Introduction */}
      <div className="p-5 sm:p-7 bg-[#fdfaf8] border-2 border-[#f0d8d0] rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-400 to-pink-600 text-white flex items-center justify-center shadow-xs">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4a2e18]">
              浪漫天使指引卡（The Romance Angels Oracle Cards）
            </h2>
            <p className="text-xs text-[#8c6d4f]">
              天使療法權威 朵琳．芙秋（Doreen Virtue）博士設計・專門解讀愛情與親密關係神諭卡
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#66462c] leading-relaxed">
          全套共 44 張精美指引牌卡，涵蓋靈魂伴侶、吸引力、化學反應、前世關係、承諾與寬恕。
          當你對感情心生迷惘、需要肯定或想更深入了解彼此心意時，浪漫天使會在最合適的神聖時機給予愛的守護與清明洞察。
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#f2e1da] flex-wrap">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'single'
                ? 'bg-[#c2185b] text-white shadow-xs'
                : 'bg-[#f8ede8] text-[#703b2b] hover:bg-[#f3ded6]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>單張愛情每日指引</span>
          </button>

          <button
            onClick={() => {
              setViewMode('spread');
              handleDrawSpread();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'spread'
                ? 'bg-[#c2185b] text-white shadow-xs'
                : 'bg-[#f8ede8] text-[#703b2b] hover:bg-[#f3ded6]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>愛情三張牌陣（過去・現在・未來）</span>
          </button>

          <button
            onClick={() => setViewMode('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'all'
                ? 'bg-[#c2185b] text-white shadow-xs'
                : 'bg-[#f8ede8] text-[#703b2b] hover:bg-[#f3ded6]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>瀏覽全數 44 張牌卡</span>
          </button>
        </div>
      </div>

      {/* MODE 1: Single Card Draw */}
      {viewMode === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Card Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className={`relative w-full max-w-[300px] h-[430px] rounded-3xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 border-4 border-[#ffdde1] bg-gradient-to-b from-[#fff5f6] via-[#ffebf0] to-[#ffdce5] select-none ${
                isFlipping ? 'scale-90 rotate-y-90 opacity-50' : 'scale-100 rotate-y-0 opacity-100'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#f3b5c3] pb-2">
                <span className="text-[11px] font-bold text-[#ad1457] tracking-wider">
                  No. {drawnCard.id} / 44
                </span>
                <span className="text-[10px] text-[#880e4f] font-cinzel tracking-widest uppercase">
                  Romance Angels
                </span>
              </div>

              {/* Card Center Visual Art */}
              <div className="my-auto text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/80 shadow-md flex items-center justify-center text-3xl text-rose-500 border border-rose-200">
                  🕊️
                </div>
                <h3 className="font-serif-title font-extrabold text-2xl text-[#880e4f]">
                  {drawnCard.titleZh}
                </h3>
                <p className="font-cinzel text-xs font-semibold text-[#ad1457] tracking-wider uppercase">
                  {drawnCard.titleEn}
                </p>
                <div className="w-12 h-0.5 bg-[#f06292] mx-auto" />
                <p className="font-serif-title text-xs text-[#5e2b3b] leading-relaxed italic px-2">
                  「{drawnCard.summary}」
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-[#f3b5c3] text-[10px] text-center text-[#880e4f]">
                朵琳．芙秋 浪漫天使指引
              </div>
            </div>

            {/* Quick Draw Button */}
            <div className="mt-4 flex items-center gap-3 w-full max-w-[300px]">
              <button
                onClick={handleDrawSingle}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ad1457] to-[#880e4f] hover:from-[#880e4f] hover:to-[#6a0035] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFlipping ? 'animate-spin' : ''}`} />
                <span>抽一張今日愛情卡</span>
              </button>
            </div>
          </div>

          {/* Meaning & Guidance Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 bg-white border border-[#ebd2cb] rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#f4e2dc] pb-3">
                <div>
                  <h3 className="font-serif-title font-bold text-xl text-[#582f0e]">
                    {drawnCard.titleZh}（{drawnCard.titleEn}）
                  </h3>
                  <p className="text-xs text-[#ad1457] font-medium">{drawnCard.summary}</p>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      `【浪漫天使指引：${drawnCard.titleZh} (${drawnCard.titleEn})】\n${drawnCard.summary}\n牌意：${drawnCard.meaning}\n行動建議：${drawnCard.guidance}\n肯定語：${drawnCard.affirmation}`
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-[#fdf2ef] hover:bg-[#fae4de] text-[#ad1457] text-xs font-semibold border border-[#f3d2c9] flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已複製' : '複製解讀'}</span>
                </button>
              </div>

              {/* Core Meaning */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#880e4f] block text-sm">💖 深度牌意解說：</span>
                <p className="text-[#582f0e] leading-relaxed bg-[#fdf8f7] p-3.5 rounded-2xl border border-[#f5e3dd]">
                  {drawnCard.meaning}
                </p>
              </div>

              {/* Action Guidance */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#ad1457] block text-sm">🕊️ 天使行動指引：</span>
                <p className="text-[#582f0e] leading-relaxed bg-[#fdf8f7] p-3.5 rounded-2xl border border-[#f5e3dd]">
                  {drawnCard.guidance}
                </p>
              </div>

              {/* Affirmation */}
              <div className="p-3.5 bg-gradient-to-r from-[#ffebee] to-[#fce4ec] rounded-2xl border border-[#f8bbd0] text-center">
                <span className="text-[11px] font-bold text-[#ad1457] block mb-1">
                  ✨ 今日愛情肯定祈詞 ✨
                </span>
                <p className="font-serif-title font-bold text-sm text-[#880e4f]">
                  「{drawnCard.affirmation}」
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Past / Present / Future Spread */}
      {viewMode === 'spread' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-serif-title font-bold text-lg text-[#582f0e]">
              三張愛情牌陣（過去深因・當前課題・未來走向）
            </h3>
            <button
              onClick={handleDrawSpread}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ad1457] hover:bg-[#880e4f] text-white text-xs font-semibold shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重新洗牌抽牌陣</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Past */}
            <div className="bg-white p-5 rounded-3xl border border-[#f0d8d0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
                  1. 過去因緣與基礎
                </div>
                <h4 className="font-serif-title font-extrabold text-lg text-[#ad1457]">
                  {spread.past.titleZh}
                </h4>
                <p className="text-[11px] text-[#880e4f] font-cinzel">{spread.past.titleEn}</p>
                <p className="text-xs text-[#582f0e] leading-relaxed bg-[#fdf8f7] p-2.5 rounded-xl border border-[#f4e2dc]">
                  {spread.past.meaning}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#ad1457] border-t border-[#f4e2dc] pt-2">
                提示：{spread.past.summary}
              </div>
            </div>

            {/* Present */}
            <div className="bg-[#fff9fa] p-5 rounded-3xl border-2 border-rose-300 shadow-sm space-y-3 flex flex-col justify-between ring-2 ring-rose-100">
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold">
                  2. 當前能量與課題
                </div>
                <h4 className="font-serif-title font-extrabold text-lg text-[#880e4f]">
                  {spread.present.titleZh}
                </h4>
                <p className="text-[11px] text-[#ad1457] font-cinzel">{spread.present.titleEn}</p>
                <p className="text-xs text-[#582f0e] leading-relaxed bg-white p-2.5 rounded-xl border border-[#f4e2dc]">
                  {spread.present.meaning}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#880e4f] border-t border-[#f4e2dc] pt-2">
                指引：{spread.present.guidance}
              </div>
            </div>

            {/* Future */}
            <div className="bg-white p-5 rounded-3xl border border-[#f0d8d0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                  3. 未來發展與祝福
                </div>
                <h4 className="font-serif-title font-extrabold text-lg text-[#6a1b9a]">
                  {spread.future.titleZh}
                </h4>
                <p className="text-[11px] text-[#8e24aa] font-cinzel">{spread.future.titleEn}</p>
                <p className="text-xs text-[#582f0e] leading-relaxed bg-[#fdf8f7] p-2.5 rounded-xl border border-[#f4e2dc]">
                  {spread.future.meaning}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-[#6a1b9a] border-t border-[#f4e2dc] pt-2">
                肯定句：「{spread.future.affirmation}」
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Gallery of all 44 Cards */}
      {viewMode === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-title font-bold text-base text-[#582f0e]">
              全套 44 張浪漫天使牌卡目錄與圖鑑
            </h3>
            <span className="text-xs text-[#8c6d4f]">點擊任一張牌卡查看完整解說</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {ROMANCE_ANGEL_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedGalleryCard(card)}
                className="p-3 bg-white hover:bg-[#fff0f3] border border-[#ecd4ce] hover:border-[#f48fb1] rounded-2xl text-left shadow-2xs hover:shadow-xs transition flex flex-col justify-between min-h-[105px]"
              >
                <div>
                  <span className="text-[10px] text-stone-400 font-mono">#{card.id}</span>
                  <h4 className="font-serif-title font-bold text-xs text-[#880e4f] truncate">
                    {card.titleZh}
                  </h4>
                  <p className="text-[9px] text-[#ad1457] font-cinzel truncate">{card.titleEn}</p>
                </div>
                <span className="text-[9px] text-stone-500 line-clamp-2 mt-1">
                  {card.summary}
                </span>
              </button>
            ))}
          </div>

          {/* Modal for selected card from gallery */}
          {selectedGalleryCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div className="w-full max-w-md bg-white border-2 border-[#f0d8d0] rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span className="text-xs font-mono text-rose-400">No. {selectedGalleryCard.id}</span>
                    <h3 className="font-serif-title font-bold text-lg text-[#880e4f]">
                      {selectedGalleryCard.titleZh}（{selectedGalleryCard.titleEn}）
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedGalleryCard(null)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-[#5e3818]">
                  <p className="font-medium text-[#ad1457]">{selectedGalleryCard.summary}</p>
                  <div className="p-3 bg-[#fdf8f7] rounded-xl border border-[#f5e3dd]">
                    <span className="font-bold text-[#880e4f] block mb-1">牌意深度說明：</span>
                    <p className="leading-relaxed">{selectedGalleryCard.meaning}</p>
                  </div>
                  <div className="p-3 bg-[#fdf8f7] rounded-xl border border-[#f5e3dd]">
                    <span className="font-bold text-[#ad1457] block mb-1">行動指引：</span>
                    <p className="leading-relaxed">{selectedGalleryCard.guidance}</p>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-center">
                    <span className="font-bold text-pink-900 block mb-0.5">肯定句：</span>
                    <p className="font-serif-title text-[#880e4f] font-bold">
                      「{selectedGalleryCard.affirmation}」
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedGalleryCard(null)}
                  className="w-full py-2.5 rounded-xl bg-[#ad1457] text-white font-semibold text-xs"
                >
                  關閉
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
