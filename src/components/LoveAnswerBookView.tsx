import React, { useState } from 'react';
import { LOVE_ANSWERS_LIST } from '../data/loveAnswers';
import { LoveAnswerItem } from '../types';
import confetti from 'canvas-confetti';
import { BookOpen, Sparkles, RefreshCw, Copy, Check, Feather, Heart } from 'lucide-react';

export const LoveAnswerBookView: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<LoveAnswerItem>(LOVE_ANSWERS_LIST[0]);
  const [isOpening, setIsOpening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState('');

  const handleOpenBook = () => {
    setIsOpening(true);
    setTimeout(() => {
      const randomAnswer = LOVE_ANSWERS_LIST[Math.floor(Math.random() * LOVE_ANSWERS_LIST.length)];
      setCurrentAnswer(randomAnswer);
      setIsOpen(true);
      setIsOpening(false);

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ffb6c1', '#b0e0e6', '#dda0dd'],
      });
    }, 700);
  };

  const handleCopy = async () => {
    const text = `【解答之書】\n解答：${currentAnswer.quote}\n悄悄話：${currentAnswer.whisper}\n今日行動建議：${currentAnswer.action}`;
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
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Introduction */}
      <div className="p-5 sm:p-7 bg-[#fdf9f3] border-2 border-[#e3d0bb] rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9c6644] to-[#582f0e] text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4a2e18]">
              解答之書（The Book of Answers）
            </h2>
            <p className="text-xs text-[#8c6d4f]">
              故事月曆典藏・指引親密關係、人生抉擇與心靈困惑的命中註定之書
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#66462c] leading-relaxed">
          這是一本專為愛情、生活抉擇、心動、想念與釋懷所寫的心靈答案之書。
          當你感到困惑、不知如何抉擇或需要一句安撫內心的話語時，請放鬆呼吸、撫平思緒，輕觸書本，翻開屬於你的宿命章節。
        </p>
      </div>

      {/* Book Interaction Box */}
      <div className="p-6 sm:p-10 bg-white border-2 border-[#dec9af] rounded-3xl shadow-sm text-center">
        {!isOpen ? (
          /* Book Cover State */
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#582f0e]">
                在心中默念或寫下你的心中提問（選填）：
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例如：這段關係未來會往好的方向發展嗎？我的決定是對的嗎？"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#d8c3a5] bg-[#faf6ee] text-xs sm:text-sm text-[#432818] focus:outline-hidden focus:ring-2 focus:ring-[#8b5a2b]"
              />
            </div>

            {/* Vintage Book Visual */}
            <div
              onClick={handleOpenBook}
              className={`group relative w-56 sm:w-64 h-80 mx-auto rounded-2xl p-6 flex flex-col justify-between shadow-2xl cursor-pointer border-4 border-[#b8860b] bg-gradient-to-b from-[#4a1c17] via-[#5c241e] to-[#36120e] text-[#f7e8aa] select-none hover:scale-102 active:scale-98 transition-all duration-300 ${
                isOpening ? 'scale-95 rotate-y-45 opacity-60' : ''
              }`}
            >
              {/* Gold Filigree Header */}
              <div className="flex items-center justify-between border-b border-[#ffd700]/30 pb-2 text-[10px] uppercase font-cinzel tracking-widest text-[#ffd700]">
                <span>Fairytale Oracle</span>
                <span>Vol. I</span>
              </div>

              {/* Book Center Title */}
              <div className="space-y-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#36120e] border-2 border-[#ffd700] flex items-center justify-center text-2xl shadow-inner">
                  🌰
                </div>
                <h3 className="font-serif-title font-black text-2xl text-[#fff5cc] tracking-wider drop-shadow-md">
                  解答之書
                </h3>
                <p className="text-[10px] text-[#ffd700]/80 tracking-widest">
                  童話秘密筆記・指引心靈解答
                </p>
              </div>

              {/* Book Bottom Hint */}
              <div className="pt-2 border-t border-[#ffd700]/30 text-[10px] text-[#ffd700] flex items-center justify-center gap-1 group-hover:underline">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>輕觸書本・揭曉答案</span>
              </div>
            </div>

            <p className="text-xs text-[#8c6d4f]">
              閉上眼睛，深呼吸三秒，把手放在書本上點擊翻開
            </p>
          </div>
        ) : (
          /* Book Open / Page State */
          <div className="space-y-6 max-w-lg mx-auto text-left animate-in fade-in zoom-in-95">
            {/* Book Pages Look */}
            <div className="p-6 sm:p-8 rounded-3xl border-2 border-[#dec9af] bg-[#fdfbf6] shadow-md space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full pointer-events-none" />

              {/* Page Header */}
              <div className="flex items-center justify-between border-b border-[#ebdcc9] pb-3 text-xs text-[#8c6d4f]">
                <div className="flex items-center gap-1 font-serif-title font-bold text-[#582f0e]">
                  <Feather className="w-4 h-4 text-amber-700" />
                  <span>解答頁 No. {currentAnswer.id}</span>
                </div>
                {question && (
                  <span className="text-[11px] text-[#8b5a2b] truncate max-w-[200px]">
                    問：「{question}」
                  </span>
                )}
              </div>

              {/* Destiny Quote */}
              <div className="py-4 text-center space-y-2">
                <p className="font-serif-title font-extrabold text-xl sm:text-2xl text-[#4a2e18] leading-relaxed tracking-wide">
                  「{currentAnswer.quote}」
                </p>
              </div>

              {/* Little Chipmunk Fairytale Whisper */}
              <div className="p-4 bg-[#fbf5eb] rounded-2xl border border-[#ebdcc9] flex items-start gap-3">
                <span className="text-2xl shrink-0">🐿️</span>
                <div className="space-y-0.5 text-xs text-[#5e3818]">
                  <span className="font-bold text-[#8b5a2b] block">小花栗鼠的童話低語：</span>
                  <p className="leading-relaxed">{currentAnswer.whisper}</p>
                </div>
              </div>

              {/* Action Suggestion */}
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900">
                <Heart className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">今天的心靈行動練習：</span>
                  <p className="leading-relaxed">{currentAnswer.action}</p>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f8ede0] text-[#582f0e] text-xs font-semibold border border-[#d8c3a5] transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已複製小語' : '複製解答'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenBook}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4e9db] hover:bg-[#ebdcc8] text-[#582f0e] text-xs font-semibold border border-[#dec9af] transition"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>翻下一頁</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#8b5a2b] hover:bg-[#6c3e17] text-white text-xs font-semibold transition"
                  >
                    闔上解答之書
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
