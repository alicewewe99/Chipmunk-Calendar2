import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Share2, PlusSquare, Smartphone, CheckCircle, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If running already as standalone PWA, show a subtle active badge or hide
  if (isInstalled) {
    return (
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#8b5a2b]/10 text-[#8b5a2b] border border-[#8b5a2b]/20">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 已安裝桌面版
      </span>
    );
  }

  return (
    <>
      {isInstallable ? (
        <button
          onClick={install}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#9c6644] to-[#7f4f24] hover:from-[#7f4f24] hover:to-[#582f0e] shadow-md shadow-[#7f4f24]/20 active:scale-95 transition-all"
          title="下載安裝故事月曆到手機或電腦桌面"
        >
          <Download className="w-4 h-4" />
          <span>下載桌面 App</span>
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#7f4f24] bg-[#f2e6d6] hover:bg-[#e6d5c1] border border-[#d8c3a5] active:scale-95 transition-all"
          title="手機或桌面安裝指引"
        >
          <Smartphone className="w-4 h-4 text-[#8b5a2b]" />
          <span>下載安裝指引</span>
        </button>
      )}

      {/* Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#fffdf9] border-2 border-[#d8c3a5] rounded-2xl shadow-2xl p-6 text-[#4a3525] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8c6d4f] hover:bg-[#f3e9db] transition"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#e8d5b5] p-1 shadow-inner flex items-center justify-center overflow-hidden">
                <img
                  src="/icon.png"
                  alt="故事月曆 App Icon"
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-lg text-[#582f0e]">下載故事月曆 App</h3>
                <p className="text-xs text-[#8c6d4f]">支援 iPhone、iPad、Android 與電腦桌面</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {/* iPhone / iPad */}
              <div className="p-3.5 bg-[#fdf8f0] border border-[#ecdcc9] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#653e1b]">
                  <span className="w-5 h-5 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center text-xs">1</span>
                  <span>iPhone / iPad (iOS Safari)</span>
                </div>
                <ol className="text-xs space-y-1.5 text-[#5e432d] pl-7 list-decimal">
                  <li>
                    點擊 Safari 瀏覽器底部的 <Share2 className="w-3.5 h-3.5 inline text-blue-600 mx-1" /> <strong>「分享」</strong> 按鈕
                  </li>
                  <li>在選單中向下滑動，選擇 <PlusSquare className="w-3.5 h-3.5 inline text-amber-700 mx-1" /> <strong>「加入主畫面」</strong></li>
                  <li>確認名稱後點擊右上角「新增」，即可像手機 App 一樣全螢幕使用！</li>
                </ol>
              </div>

              {/* Android / Chrome */}
              <div className="p-3.5 bg-[#fdf8f0] border border-[#ecdcc9] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#653e1b]">
                  <span className="w-5 h-5 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center text-xs">2</span>
                  <span>Android (Chrome / 三星瀏覽器)</span>
                </div>
                <ol className="text-xs space-y-1.5 text-[#5e432d] pl-7 list-decimal">
                  <li>點擊瀏覽器右上角選單（三個圓點）</li>
                  <li>選擇 <strong>「安裝應用程式」</strong> 或 <strong>「新增至主螢幕」</strong></li>
                  <li>桌面上即會出現可愛的花栗鼠日曆圖示！</li>
                </ol>
              </div>

              {/* Desktop */}
              <div className="p-3.5 bg-[#fdf8f0] border border-[#ecdcc9] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#653e1b]">
                  <span className="w-5 h-5 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center text-xs">3</span>
                  <span>電腦桌面 (Chrome / Edge)</span>
                </div>
                <p className="text-xs text-[#5e432d] pl-7">
                  點擊瀏覽器網址列右側的 <strong>「安裝應用程式」圖示</strong>，即可安裝為獨立視窗桌面應用。
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#8b5a2b] hover:bg-[#6f451f] text-white font-medium text-sm transition shadow-sm"
            >
              我知道了，開始探索！
            </button>
          </div>
        </div>
      )}
    </>
  );
};
