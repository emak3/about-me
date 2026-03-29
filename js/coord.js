/**
 * ヘッダ一行を差し替え（正確さは求めない）。
 */
export function initFakeCoord() {
  const el = document.getElementById("fake-coord");
  if (!el) return;

  const lines = [
    "座標: 未確定（神奈川の気配）",
    "緯度経度より ping の方が信頼できる",
    "位置情報: 拒否済みのまま進む",
  ];
  let i = 0;
  window.setInterval(() => {
    i = (i + 1) % lines.length;
    el.textContent = lines[i];
  }, 11000);
}
