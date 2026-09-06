import React, { useState } from 'react';
import { YES_NO_GUIDANCES } from '../data/loveAnswers';
import { YesNoAnswer } from '../types';
import confetti from 'canvas-confetti';
import { HelpCircle, RefreshCw, Copy, Check, Sparkles, HeartHandshake } from 'lucide-react';

export const YesNoLoveView: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<YesNoAnswer | null>(null);
  const [isDivining, setIsDivining] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleQuestions = [
    '我今天應該主動傳訊息給他嗎？',
    '他是真心把我放在心上的嗎？',
    '這週末適合跟對方告白嗎？',
    '我們之間的誤會能順利解開嗎？',
    '我該給彼此的感情多一點耐心與時間嗎？',
  ];

  const handleAsk = (qText: string = question) => {
    setIsDivining(true);
    setResult(null);

    setTimeout(() => {
      const answer = YES_NO_GUIDANCES[Math.floor(Math.random() * YES_NO_GUIDANCES.length)];
      setResult(answer);
      setIsDivining(false);

      if (answer.result === 'YES') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4caf50', '#81c784', '#ffd54f'],
        });
      }
    }, 850);
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `【YES/NO 愛情指引】\n問題：${question || '心中的愛情疑問'}\n答案：${result.title}\n指引：${result.message}\n心靈深意：${result.subtext}\n花栗鼠悄悄話：${result.chipmunkAdvice}`;
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
      <div className="p-5 sm:p-7 bg-[#fdfaf5] border-2 border-[#e6d8c5] rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4a2e18]">
              YES、NO 愛情指引神諭
            </h2>
            <p className="text-xs text-[#8c6d4f]">
              直擊心靈的是非題開示・給予果斷明確的感情指引
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#66462c] leading-relaxed">
          當你在愛情的十字路口左右為難，不知道該主動還是等待、該堅持還是放手時，請在心中默念一個明確的是非題，
          讓花栗鼠童話的神奇橡實羅盤為你揭示當下的能量走向。
        </p>

        {/* Sample questions chips */}
        <div className="pt-2 border-t border-[#ebdcc9] space-y-1.5">
          <span className="text-[11px] font-bold text-[#8b5a2b] block">快速選擇靈感問題：</span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(sq);
                  handleAsk(sq);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-[#faf4ec] text-[#6c4a2d] border border-[#d8c3a5] transition active:scale-95"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Divination Card */}
      <div className="p-6 sm:p-8 bg-white border-2 border-[#dec9af] rounded-3xl shadow-sm space-y-6 text-center">
        <div className="space-y-2 max-w-lg mx-auto">
          <label className="block text-xs font-bold text-[#582f0e]">
            輸入你想詢問的愛情是非題：
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我該主動約他這週末喝咖啡嗎？"
              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#d8c3a5] bg-[#faf6ee] text-xs sm:text-sm text-[#432818] focus:outline-hidden focus:ring-2 focus:ring-[#8b5a2b]"
            />
            <button
              onClick={() => handleAsk()}
              disabled={isDivining}
              className="px-5 py-2.5 rounded-2xl bg-[#8b5a2b] hover:bg-[#6c3e17] text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 whitespace-nowrap"
            >
              {isDivining ? '占卜中...' : '求取指引'}
            </button>
          </div>
        </div>

        {/* Divining Animation / Reveal */}
        <div className="py-4">
          {isDivining ? (
            <div className="space-y-3 animate-pulse">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-4xl shadow-inner">
                🔮
              </div>
              <p className="font-serif-title font-bold text-sm text-[#8b5a2b]">
                心靈羅盤正在感應天地能量...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 max-w-lg mx-auto text-left animate-in fade-in zoom-in-95">
              {/* Badge for YES / NO / MAYBE */}
              <div className="text-center">
                <div
                  className={`inline-block px-6 py-2 rounded-2xl font-serif-title font-black text-2xl sm:text-3xl tracking-widest shadow-md ${
                    result.result === 'YES'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                      : result.result === 'NO'
                      ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  }`}
                >
                  {result.title}
                </div>
              </div>

              {/* Message Details */}
              <div className="p-4 bg-[#fdfbf7] rounded-2xl border border-[#ebdcc9] space-y-2">
                <p className="font-bold text-sm sm:text-base text-[#4a2e18] leading-relaxed">
                  {result.message}
                </p>
                <p className="text-xs text-[#735034] leading-relaxed border-t border-[#f2e5d5] pt-2">
                  {result.subtext}
                </p>
              </div>

              {/* Chipmunk Whisper */}
              <div className="p-4 bg-[#f5eddf] rounded-2xl border border-[#dec9af] flex items-start gap-3">
                <span className="text-2xl shrink-0">🐿️</span>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#8b5a2b]">小花栗鼠的安徒生叮嚀：</span>
                  <p className="text-xs text-[#582f0e] leading-relaxed">
                    {result.chipmunkAdvice}
                  </p>
                </div>
              </div>

              {/* Copy & Reset */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f4e9db] hover:bg-[#ebdcc8] text-[#582f0e] text-xs font-semibold border border-[#dec9af] transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已複製指引' : '複製指引'}</span>
                </button>

                <button
                  onClick={() => handleAsk()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8b5a2b] hover:bg-[#6c3e17] text-white text-xs font-semibold shadow-xs transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>再問一題</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-stone-400 space-y-2">
              <div className="text-4xl">🌰</div>
              <p className="text-xs">請輸入問題或點選上方靈感，點擊「求取指引」！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
