import { useCallback,useState } from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './Clock'; // Clock を直接使う

export default function PipButton({pipRef}) {
    const [pipWin, setPipWin] = useState(null);

    //  ピクチャーインピクチャーボタンがクリックされた時の処理
    const handleClick = useCallback(async () => {
        // Document Picture-in-Picture API がサポートされているか確認
        if (!("documentPictureInPicture" in window)) {
            alert("ピクチャーインピクチャーはサポートされていません");
            return;
        }

        // ピクチャーインピクチャー中なら閉じる
        if (pipWin && !pipWin.closed) {
            try {
                await documentPictureInPicture.exit();
            } catch (e) {
                pipWin.close();
            }     
            setPipWin(null);
            return;
        }

        // ピクチャーインピクチャーに表示する要素を取得（時計全体のDOM）
        const pipContent = pipRef.current;
        if (!pipContent) return;

        // ウィンドウ作成前にサイズを取得
        const width = pipContent.offsetWidth;
        const height = pipContent.offsetHeight;

        // ピクチャーインピクチャーのウィンドウを作成
        const newPipWindow = await window.documentPictureInPicture.requestWindow({ width, height });
        setPipWin(newPipWindow);

        // Tailwindのstyleをコピー
        document.querySelectorAll('link[rel=stylesheet], style').forEach((el) => {
            newPipWindow.document.head.appendChild(el.cloneNode(true));
        });

        // 背景や余白の初期化
        const body = newPipWindow.document.body;
        body.style.margin = '0';
        body.style.backgroundColor = '#18181b';
        body.style.color = '#cffafe';
        body.style.fontSize = '10vmax';
        body.style.fontWeight = 'bold';
        body.style.fontFamily = 'sans-serif';
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
        body.style.alignItems = 'center';
        body.style.height = '100vh';
        body.style.overflow = 'hidden';


        /// 時計表示用divを作成
        const clockDiv = newPipWindow.document.createElement('div');
        body.appendChild(clockDiv);

        // 時間更新関数
        function updateTime() {
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, '0');
            clockDiv.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        }

        updateTime();
        const timerId = setInterval(updateTime, 1000);

        // PiP閉じたらタイマー解除・状態更新
        newPipWindow.addEventListener('unload', () => {
            clearInterval(timerId);
            setPipWin(null);
        });

    }, [pipRef, pipWin]);

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded"
        >
            PiP
        </button>
  );
}