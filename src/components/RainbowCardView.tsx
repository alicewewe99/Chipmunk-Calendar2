import React, { useState } from 'react';
import { ChakraColor, RainbowCard } from '../types';
import { RAINBOW_CARDS_DATA, CHAKRA_INFO, ChakraMeta } from '../data/rainbowCards';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Copy, Check, Info, Layers, Compass, HeartHandshake } from 'lucide-react';

export const RainbowCardView: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ChakraColor | 'all'>('all');
  const [drawnCard, setDrawnCard] = useState<RainbowCard>(RAINBOW_CARDS_DATA[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [spreadCards, setSpreadCards] = useState<RainbowCard[]>([]);
  const [mode, setMode] = useState<'single' | 'seven'>('single');

  // Draw a card
  const handleDrawCard = (colorFilter: ChakraColor | 'all' = selectedColor) => {
    setIsFlipping(true);

    setTimeout(() => {
      let pool = RAINBOW_CARDS_DATA;
      if (colorFilter !== 'all') {
        pool = RAINBOW_CARDS_DATA.filter((c) => c.color === colorFilter);
      }
      const randomCard = pool[Math.floor(Math.random() * pool.length)];
      setDrawnCard(randomCard);
      setIsFlipping(false);

      // Trigger soft colorful confetti
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'],
      });
    }, 450);
  };

  // Draw 7-color chakra spread
  const handleDrawSevenSpread = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const colors: ChakraColor[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      const spread = colors.map((col) => {
        const pool = RAINBOW_CARDS_DATA.filter((c) => c.color === col);
        return pool[Math.floor(Math.random() * pool.length)];
      });
      setSpreadCards(spread);
      setIsFlipping(false);

      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'],
      });
    }, 500);
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

  const currentChakra: ChakraMeta = CHAKRA_INFO[drawnCard.color];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Introduction */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] border-2 border-[#e6d7c4] rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4a2e18]">
              彩虹卡（Rainbow Cards）智慧肯定牌
            </h2>
            <p className="text-xs text-[#8c6d4f]">
              國外藝術治療師 Doris Wenzel 原創・彭瑛瑛老師中文翻譯
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#66462c] leading-relaxed">
          彩虹卡是一套 7 個顏色的能量小卡，共 245 張充滿智慧與肯定支持的話語。對應人體七大脈輪，
          每天抽一張作為能量提醒卡，能加強自我覺察、找回方向感、療癒撫慰身心靈。
        </p>

        {/* Mode Switcher: Single vs 7-Chakra Spread */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#f0e3d2]">
          <button
            onClick={() => {
              setMode('single');
              handleDrawCard(selectedColor);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              mode === 'single'
                ? 'bg-[#7f4f24] text-white shadow-xs'
                : 'bg-[#f4e9db] text-[#6c4a2d] hover:bg-[#ebdcc8]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>單張每日能量抽卡</span>
          </button>

          <button
            onClick={() => {
              setMode('seven');
              if (spreadCards.length === 0) {
                handleDrawSevenSpread();
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              mode === 'seven'
                ? 'bg-[#7f4f24] text-white shadow-xs'
                : 'bg-[#f4e9db] text-[#6c4a2d] hover:bg-[#ebdcc8]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>七脈輪全能量牌陣 (7色)</span>
          </button>
        </div>
      </div>

      {mode === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Card Flip View */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Chakra Color Selector Pills */}
            <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 scrollbar-none">
              <button
                onClick={() => {
                  setSelectedColor('all');
                  handleDrawCard('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedColor === 'all'
                    ? 'bg-[#582f0e] text-white shadow-xs'
                    : 'bg-[#f4e9db] text-[#6c4a2d] hover:bg-[#ebdcc8]'
                }`}
              >
                全部 7 色
              </button>
              {(Object.keys(CHAKRA_INFO) as ChakraColor[]).map((cKey) => {
                const info = CHAKRA_INFO[cKey];
                return (
                  <button
                    key={cKey}
                    onClick={() => {
                      setSelectedColor(cKey);
                      handleDrawCard(cKey);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                      selectedColor === cKey
                        ? 'ring-2 ring-offset-1 ring-[#582f0e] shadow-xs'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: info.bgHex,
                      color: info.textHex,
                    }}
                  >
                    <span>{info.colorName}</span>
                    <span className="text-[10px] opacity-80">({info.chakraName.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>

            {/* The Rainbow Card Display */}
            <div
              className={`relative w-full max-w-md h-72 sm:h-80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 border-4 border-white/80 select-none ${
                isFlipping ? 'scale-95 rotate-y-90 opacity-60' : 'scale-100 rotate-y-0 opacity-100'
              }`}
              style={{
                backgroundColor: drawnCard.cardBgColor,
                color: drawnCard.cardTextColor,
              }}
            >
              {/* Card Header: Color & Chakra Info */}
              <div className="flex items-center justify-between border-b border-white/25 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  <span className="text-xs sm:text-sm font-bold tracking-wider">
                    {drawnCard.colorName}・{drawnCard.chakraName}
                  </span>
                </div>
                <span className="text-xs opacity-90 px-2 py-0.5 rounded-full bg-black/15 font-mono">
                  No. {drawnCard.id}
                </span>
              </div>

              {/* Card Body: Wisdom Affirmation Quote */}
              <div className="my-auto py-2 text-center">
                <p className="font-serif-title font-bold text-lg sm:text-2xl leading-relaxed sm:leading-loose tracking-wide drop-shadow-xs">
                  「{drawnCard.affirmation}」
                </p>
              </div>

              {/* Card Footer: Chakra Location & Doris Wenzel Credit */}
              <div className="flex items-center justify-between pt-3 border-t border-white/25 text-[11px] opacity-90">
                <span>位置：{drawnCard.chakraLocation}</span>
                <span>彭瑛瑛 譯・Doris Wenzel</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-5 w-full max-w-md">
              <button
                onClick={() => handleDrawCard(selectedColor)}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8b5a2b] to-[#603813] hover:from-[#73441a] hover:to-[#4e2c0e] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition"
              >
                <RefreshCw className={`w-4 h-4 ${isFlipping ? 'animate-spin' : ''}`} />
                <span>換一張能量卡</span>
              </button>

              <button
                onClick={() => handleCopy(drawnCard.affirmation)}
                className="py-3 px-4 rounded-2xl bg-[#f4e9db] hover:bg-[#ebdcc8] text-[#582f0e] font-semibold text-sm border border-[#dec9af] flex items-center justify-center gap-1.5 active:scale-98 transition"
                title="複製肯定句"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已複製' : '複製小語'}</span>
              </button>
            </div>
          </div>

          {/* Right: Chakra Deep Guide & Health Reflection */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-[#fbf7ef] border border-[#e2d2be] rounded-3xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#582f0e]">
                <Info className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif-title font-bold text-base">
                  當前脈輪覺察：{currentChakra.chakraName}
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-[#5e3f26]">
                <div className="p-2.5 bg-white/80 rounded-xl border border-[#ebdcc9]">
                  <span className="font-bold text-[#8b5a2b]">對應位置：</span>
                  <span>{currentChakra.chakraLocation}</span>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-[#ebdcc9]">
                  <span className="font-bold text-[#8b5a2b]">核心特質：</span>
                  <span>{currentChakra.theme}</span>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-[#ebdcc9]">
                  <span className="font-bold text-rose-700">失衡時狀態：</span>
                  <span>{currentChakra.imbalanceSymptom}</span>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-[#ebdcc9]">
                  <span className="font-bold text-emerald-700">平衡時狀態：</span>
                  <span>{currentChakra.balanceBenefit}</span>
                </div>
              </div>
            </div>

            {/* Quick Practice Tip */}
            <div className="p-4 bg-[#f4ece0] border border-[#dec9af] rounded-2xl text-xs text-[#6e4e34] space-y-1.5">
              <div className="font-bold text-[#582f0e] flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <span>花栗鼠的彩虹卡使用小訣竅：</span>
              </div>
              <p className="leading-relaxed">
                抽到小卡後，請深呼吸三次，將手掌輕放在對應的脈輪位置上，默念或朗讀這句肯定句 3 次。
                想像該顏色的溫暖光芒溫柔地充滿身心，為今天注入充沛的力量！
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Seven Chakras Spread Mode */
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-serif-title font-bold text-base text-[#582f0e]">
              🌈 七色彩虹全脈輪能量牌陣
            </h3>
            <button
              onClick={handleDrawSevenSpread}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7f4f24] hover:bg-[#5e3818] text-white text-xs font-semibold shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重新抽七脈輪牌陣</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {spreadCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[160px] border-2 border-white/50"
                style={{ backgroundColor: card.cardBgColor }}
              >
                <div className="flex items-center justify-between text-xs font-bold border-b border-white/20 pb-1.5">
                  <span>{card.colorName}・{card.chakraName}</span>
                  <span className="text-[10px] opacity-80">{card.chakraLocation}</span>
                </div>
                <p className="font-serif-title font-semibold text-sm my-2 leading-relaxed">
                  「{card.affirmation}」
                </p>
                <div className="text-[10px] opacity-80 text-right">
                  {card.theme}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
