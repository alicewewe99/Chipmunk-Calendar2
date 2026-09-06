import React, { useState } from 'react';
import { TEMPLE_SIGNS } from '../data/templeSigns';
import { TempleSign } from '../types';
import confetti from 'canvas-confetti';
import { ScrollText, Sparkles, RefreshCw, Copy, Check, Compass, HelpCircle, ShieldCheck } from 'lucide-react';

type Step = 'pray' | 'draw_stick' | 'toss_blocks' | 'result';
type BlockResult = 'sheng' | 'xiao' | 'yin'; // 聖筊 (一平一凸), 笑筊 (兩平), 陰筊 (兩凸)

export const TempleOracleView: React.FC = () => {
  const [step, setStep] = useState<Step>('pray');
  const [inquiryType, setInquiryType] = useState('marriage');
  const [userName, setUserName] = useState('');
  const [currentSign, setCurrentSign] = useState<TempleSign>(TEMPLE_SIGNS[0]);
  const [isShaking, setIsShaking] = useState(false);
  const [isTossing, setIsTossing] = useState(false);
  const [blockResult, setBlockResult] = useState<BlockResult | null>(null);
  const [tossHistory, setTossHistory] = useState<BlockResult[]>([]);
  const [copied, setCopied] = useState(false);

  // Step 1 -> Step 2: Start Shaking
  const handleStartDraw = () => {
    setStep('draw_stick');
    setIsShaking(true);
    setTimeout(() => {
      // Pick random sign from TEMPLE_SIGNS
      const randomSign = TEMPLE_SIGNS[Math.floor(Math.random() * TEMPLE_SIGNS.length)];
      setCurrentSign(randomSign);
      setIsShaking(false);
      setStep('toss_blocks');
      setTossHistory([]);
      setBlockResult(null);
    }, 1200);
  };

  // Step 3: Toss Moon Blocks (擲筊)
  const handleTossBlocks = () => {
    setIsTossing(true);
    setBlockResult(null);

    setTimeout(() => {
      // Traditional probability:
      // Two blocks have Flat (Yang) and Curved (Yin).
      // Block A: 50% Flat, 50% Curved
      // Block B: 50% Flat, 50% Curved
      // Flat + Curved = Sheng (50%)
      // Flat + Flat = Xiao (25%)
      // Curved + Curved = Yin (25%)
      const rand = Math.random();
      let res: BlockResult = 'sheng';
      if (rand < 0.55) {
        res = 'sheng'; // 聖筊
      } else if (rand < 0.8) {
        res = 'xiao'; // 笑筊
      } else {
        res = 'yin'; // 陰筊
      }

      setBlockResult(res);
      setIsTossing(false);
      const newHistory = [...tossHistory, res];
      setTossHistory(newHistory);

      if (res === 'sheng') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b71c1c', '#f57f17', '#ffd600'],
        });
      }
    }, 700);
  };

  // Reset to initial state
  const handleReset = () => {
    setStep('pray');
    setBlockResult(null);
    setTossHistory([]);
  };

  // Copy poem
  const handleCopyPoem = async () => {
    const text = `【東港鎮海宮靈籤 第${currentSign.number}籤 ${currentSign.ganzhi}】\n${currentSign.title}（${currentSign.overall}）\n${currentSign.poem.join('\n')}\n【聖意解說】\n事業：${currentSign.explanation.career}\n姻緣：${currentSign.explanation.marriage}\n家庭：${currentSign.explanation.family}\n財運：${currentSign.explanation.wealth}\n健康：${currentSign.explanation.health}`;
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Introduction */}
      <div className="p-5 sm:p-7 bg-[#fdfaf3] border-2 border-[#d8c3a5] rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#8b1e0f] text-white flex items-center justify-center shadow-xs">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4a2e18]">
              東港鎮海宮・六十甲子靈籤
            </h2>
            <p className="text-xs text-[#8c6d4f]">
              傳承古老天干地支陰陽生息・七王爺神意指點迷津
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#66462c] leading-relaxed">
          東港鎮海宮依循天干地支六十甲子古法設立靈籤，涵蓋人生百態。無論求事業、求良緣、家庭家運、求財或健康，
          秉持誠心向神明稟告後搖籤、擲筊請示，精準細膩指引人生航向。
        </p>

        {/* Progress steps indicator */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#ebdcc9] text-center text-xs">
          <div className={`p-2 rounded-xl border ${step === 'pray' ? 'bg-[#8b1e0f] text-white font-bold border-[#8b1e0f]' : 'bg-white/80 text-[#7a5535] border-[#dec9af]'}`}>
            1. 虔誠稟報
          </div>
          <div className={`p-2 rounded-xl border ${step === 'draw_stick' ? 'bg-[#8b1e0f] text-white font-bold border-[#8b1e0f]' : 'bg-white/80 text-[#7a5535] border-[#dec9af]'}`}>
            2. 搖籤抽號
          </div>
          <div className={`p-2 rounded-xl border ${step === 'toss_blocks' ? 'bg-[#8b1e0f] text-white font-bold border-[#8b1e0f]' : 'bg-white/80 text-[#7a5535] border-[#dec9af]'}`}>
            3. 擲筊請示
          </div>
          <div className={`p-2 rounded-xl border ${step === 'result' ? 'bg-[#8b1e0f] text-white font-bold border-[#8b1e0f]' : 'bg-white/80 text-[#7a5535] border-[#dec9af]'}`}>
            4. 恭看籤詩
          </div>
        </div>
      </div>

      {/* STEP 1: Pray & Enter inquiries */}
      {step === 'pray' && (
        <div className="p-6 bg-white border-2 border-[#e0cfbe] rounded-3xl shadow-sm space-y-4 max-w-xl mx-auto animate-in fade-in">
          <div className="text-center space-y-1">
            <h3 className="font-serif-title font-bold text-lg text-[#582f0e]">
              第一步：向鎮海宮七府千歲虔誠稟告
            </h3>
            <p className="text-xs text-[#8c6d4f]">
              請在心中默念或填寫姓名與想祈請神明指引的事情
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#5e3818] mb-1">
                信士 / 信女姓名 (選填)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="例如：王小明（或於心中默念）"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c3a5] bg-[#faf6ee] text-[#432818] focus:outline-hidden focus:ring-2 focus:ring-[#8b1e0f]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#5e3818] mb-1">
                所求事項方向 *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'marriage', label: '姻緣感情' },
                  { id: 'career', label: '事業求職' },
                  { id: 'wealth', label: '財運投資' },
                  { id: 'health', label: '身體健康' },
                  { id: 'family', label: '家庭家運' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInquiryType(item.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition ${
                      inquiryType === item.id
                        ? 'bg-[#8b1e0f] text-white shadow-xs'
                        : 'bg-[#faf6ee] text-[#6c4a2d] hover:bg-[#f0e3d2] border border-[#d8c3a5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#fbf6ec] rounded-xl border border-[#dec9af] text-[11px] text-[#735034] leading-relaxed">
              <span className="font-bold text-[#8b1e0f]">稟告祈詞：</span>
              「弟子/信女 {userName || '某某某'}，今因【{
                inquiryType === 'marriage'
                  ? '姻緣感情'
                  : inquiryType === 'career'
                  ? '事業求職'
                  : inquiryType === 'wealth'
                  ? '財運投資'
                  : inquiryType === 'health'
                  ? '身體健康'
                  : '家庭家運'
              }】之事，心有迷惘，敬求東港鎮海宮七王爺慈悲指點迷津，賜予籤詩開示。」
            </div>
          </div>

          <button
            onClick={handleStartDraw}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8b1e0f] to-[#671206] hover:from-[#75170a] hover:to-[#550c02] text-white font-bold text-sm shadow-md transition active:scale-98"
          >
            稟告完畢，開始搖籤筒抽籤
          </button>
        </div>
      )}

      {/* STEP 2: Draw Stick Shaking */}
      {step === 'draw_stick' && (
        <div className="p-10 bg-white border-2 border-[#e0cfbe] rounded-3xl shadow-sm text-center space-y-4 max-w-md mx-auto animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-4xl animate-bounce">
            🎋
          </div>
          <h3 className="font-serif-title font-bold text-lg text-[#582f0e]">
            正在誠心搖動六十甲子籤筒...
          </h3>
          <p className="text-xs text-[#8c6d4f]">
            竹籤交錯，神明正在為您揀選命定靈籤
          </p>
        </div>
      )}

      {/* STEP 3: Toss Moon Blocks (擲筊) */}
      {step === 'toss_blocks' && (
        <div className="p-6 sm:p-8 bg-white border-2 border-[#e0cfbe] rounded-3xl shadow-sm space-y-5 max-w-lg mx-auto text-center animate-in fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
            抽出籤號：第 {currentSign.number} 籤【{currentSign.ganzhi}】
          </div>

          <h3 className="font-serif-title font-bold text-xl text-[#582f0e]">
            請擲筊請示七王爺：是否為此籤？
          </h3>

          <p className="text-xs text-[#735034]">
            依民間傳統儀式，抽得籤枝後，需向神明擲筊請示。<br />
            擲得<strong>「聖筊（一平一凸）」</strong>代表神明允准確認！
          </p>

          {/* Toss Result Visual */}
          <div className="py-4 flex flex-col items-center justify-center">
            {isTossing ? (
              <div className="text-4xl animate-spin">🌓 🌗</div>
            ) : blockResult ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 text-3xl">
                  {blockResult === 'sheng' && <span>🥠 🥠</span>}
                  {blockResult === 'xiao' && <span>🌕 🌕</span>}
                  {blockResult === 'yin' && <span>🌑 🌑</span>}
                </div>
                <div className="text-sm font-bold">
                  {blockResult === 'sheng' && (
                    <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      ✨ 聖筊（一平一凸）！神明允准！
                    </span>
                  )}
                  {blockResult === 'xiao' && (
                    <span className="text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      😊 笑筊（兩平），神明笑而不答，請再擲一次或重新抽籤
                    </span>
                  )}
                  {blockResult === 'yin' && (
                    <span className="text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      🛑 陰筊（兩凸），神意並非此籤，請重新抽籤
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-3xl text-stone-300">🥠 🥠</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {blockResult !== 'sheng' ? (
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={handleTossBlocks}
                  disabled={isTossing}
                  className="py-3 px-6 rounded-2xl bg-[#8b1e0f] hover:bg-[#6e1509] text-white font-bold text-sm shadow-md transition active:scale-98"
                >
                  {isTossing ? '擲筊翻滾中...' : '擲筊請示'}
                </button>
                {blockResult && blockResult !== 'sheng' && (
                  <button
                    onClick={handleStartDraw}
                    className="py-3 px-4 rounded-2xl bg-[#f4e9db] hover:bg-[#ebdcc8] text-[#582f0e] font-semibold text-xs border border-[#dec9af] transition"
                  >
                    重抽一支籤
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setStep('result')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-lg transition active:scale-98 animate-pulse"
              >
                獲七王爺聖筊允准！解讀第 {currentSign.number} 籤詩 📜
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Full Oracle Sign Result Display */}
      {step === 'result' && (
        <div className="p-6 sm:p-8 bg-[#fffefb] border-2 border-[#d8c3a5] rounded-3xl shadow-md space-y-6 animate-in fade-in">
          {/* Sign Title & Banner */}
          <div className="text-center border-b border-[#ebdcc9] pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#8b1e0f] text-white shadow-xs">
              <span>東港鎮海宮靈籤</span>
              <span>・</span>
              <span>第 {currentSign.number} 籤</span>
              <span>【{currentSign.ganzhi}】</span>
            </div>

            <h3 className="font-serif-title font-extrabold text-2xl text-[#4a2e18]">
              {currentSign.title}
            </h3>

            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                卦象：{currentSign.gua}
              </span>
              <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                評語：{currentSign.overall}
              </span>
            </div>
          </div>

          {/* Poem Scroll Box */}
          <div className="p-6 bg-[#fdf5e6] border-2 border-[#dec9af] rounded-2xl shadow-inner text-center max-w-md mx-auto">
            <div className="space-y-2 font-serif-title text-lg sm:text-xl font-bold text-[#432818] tracking-widest leading-loose">
              {currentSign.poem.map((line, i) => (
                <p key={i} className="border-b border-[#eddcc9] last:border-0 pb-1">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Detailed Divine Explanation Grid */}
          <div className="space-y-3">
            <h4 className="font-serif-title font-bold text-sm text-[#582f0e] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8b1e0f]" />
              <span>各項求問・聖意詳解：</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3.5 rounded-2xl border ${inquiryType === 'marriage' ? 'bg-[#fff5f5] border-rose-300 ring-2 ring-rose-200' : 'bg-[#faf6ee] border-[#dec9af]'}`}>
                <div className="font-bold text-rose-800 mb-1 flex items-center gap-1">
                  <span>❤️ 婚姻・感情：</span>
                </div>
                <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.marriage}</p>
              </div>

              <div className={`p-3.5 rounded-2xl border ${inquiryType === 'career' ? 'bg-[#f0f9ff] border-blue-300 ring-2 ring-blue-200' : 'bg-[#faf6ee] border-[#dec9af]'}`}>
                <div className="font-bold text-blue-800 mb-1 flex items-center gap-1">
                  <span>💼 事業・求職：</span>
                </div>
                <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.career}</p>
              </div>

              <div className={`p-3.5 rounded-2xl border ${inquiryType === 'wealth' ? 'bg-[#fffbeb] border-amber-300 ring-2 ring-amber-200' : 'bg-[#faf6ee] border-[#dec9af]'}`}>
                <div className="font-bold text-amber-800 mb-1 flex items-center gap-1">
                  <span>💰 財運・投資：</span>
                </div>
                <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.wealth}</p>
              </div>

              <div className={`p-3.5 rounded-2xl border ${inquiryType === 'health' ? 'bg-[#f0fdf4] border-emerald-300 ring-2 ring-emerald-200' : 'bg-[#faf6ee] border-[#dec9af]'}`}>
                <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  <span>🌿 身體・健康：</span>
                </div>
                <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.health}</p>
              </div>

              <div className={`p-3.5 rounded-2xl border ${inquiryType === 'family' ? 'bg-[#faf5ff] border-purple-300 ring-2 ring-purple-200' : 'bg-[#faf6ee] border-[#dec9af]'}`}>
                <div className="font-bold text-purple-800 mb-1 flex items-center gap-1">
                  <span>🏡 家庭・家運：</span>
                </div>
                <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.family}</p>
              </div>

              {currentSign.explanation.travel && (
                <div className="p-3.5 rounded-2xl border bg-[#faf6ee] border-[#dec9af]">
                  <div className="font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <span>✈️ 出行・遷移：</span>
                  </div>
                  <p className="text-[#5e3818] leading-relaxed">{currentSign.explanation.travel}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom actions: Copy Poem & Reset */}
          <div className="flex items-center justify-between pt-4 border-t border-[#ebdcc9] flex-wrap gap-2">
            <button
              onClick={handleCopyPoem}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f4e9db] hover:bg-[#ebdcc8] text-[#582f0e] text-xs font-semibold border border-[#dec9af] transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已複製籤文與解籤' : '複製籤文與聖意'}</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b1e0f] hover:bg-[#6e1509] text-white text-xs font-semibold shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>感謝王爺公指點，再求一事</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
