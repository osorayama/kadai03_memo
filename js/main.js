import { PREFECTURES_DATA as PREFECTURES } from "./prefectures.js";

// アプリの主要定数（標高と到達判定）
const FUJI_ELEVATION = 3776;
const STRATOSPHERE_HEIGHT = 12000;
const MESOSPHERE_HEIGHT = 50000;
const THERMOSPHERE_HEIGHT = 80000;
const MAX_HEIGHT = THERMOSPHERE_HEIGHT;
const DEFAULT_PREFECTURE_OPTION = '<option value="">都道府県（必須）</option>';

// ランク名（表示テキスト）
const RANK = {
  THERMOSPHERE: "熱圏チャレンジャー",
  MESOSPHERE: "中間圏アドベンチャー",
  STRATOSPHERE: "成層圏ブレイカー",
  FUJI3: "富士山3回クリア！成層圏到達",
  FUJI1: "富士山登頂クラス",
  GROUND: "地上民"
};

let mountains = [];
let selectedPrefecture = null;

// ローカルストレージ入出力
const loadMountains = () => {
  const data = localStorage.getItem("mountains");
  return data ? JSON.parse(data) : [];
};
const saveMountains = (list) => {
  localStorage.setItem("mountains", JSON.stringify(list));
};

// 都道府県コード単位で登頂数・標高合計を集計
function aggregateByPref(list, PREFS) {
  const result = {};
  PREFS.forEach(pref => {
    result[pref.code] = { climbedCount: 0, totalElevation: 0 };
  });
  list.forEach(m => {
    if (m.status !== "climbed") return;
    const pref = PREFS.find(p => p.name === m.prefecture);
    if (!pref) return;
    result[pref.code].climbedCount++;
    result[pref.code].totalElevation += Number(m.elevation);
  });
  return result;
}

// 累計標高に応じたランク名を返す
function getRankByElevation(totalElevation) {
  if (totalElevation >= THERMOSPHERE_HEIGHT) return RANK.THERMOSPHERE;
  if (totalElevation >= MESOSPHERE_HEIGHT) return RANK.MESOSPHERE;
  if (totalElevation >= STRATOSPHERE_HEIGHT) return RANK.STRATOSPHERE;
  if (totalElevation >= FUJI_ELEVATION * 3) return RANK.FUJI3;
  if (totalElevation >= FUJI_ELEVATION) return RANK.FUJI1;
  return RANK.GROUND;
}

// ヘッダーの統計と進捗バーを更新
function updateStats(list) {
  const climbed = list.filter(m => m.status === "climbed");
  const climbedCount = climbed.length;
  const totalElevation = climbed.reduce((sum, m) => sum + Number(m.elevation), 0);
  const fujiCount = totalElevation / FUJI_ELEVATION;
  const percent = (totalElevation / MAX_HEIGHT) * 100;
  const percentText = percent < 0.01 && percent > 0 ? "<0.01%" : percent.toFixed(2) + "%";
  const currentKm = Math.floor(totalElevation / 1000);
  const remainKm = Math.max(0, Math.floor((THERMOSPHERE_HEIGHT - totalElevation) / 1000));
  const rank = getRankByElevation(totalElevation);

  $("#climbed-count").text(climbedCount);
  $("#total-elevation").text(totalElevation);
  $("#fuji-count").text(fujiCount.toFixed(2));
  $("#space-rank")
    .text(rank)
    .removeClass()
    .addClass(
      "font-bold badge px-2 py-1 rounded " +
        (rank === RANK.THERMOSPHERE
          ? "bg-gradient-to-r from-blue-400 via-purple-400 to-green-200 text-slate-900"
          : rank === RANK.MESOSPHERE
          ? "bg-blue-400 text-slate-900"
          : rank === RANK.STRATOSPHERE
          ? "bg-sky-300 text-slate-900"
          : rank === RANK.FUJI3
          ? "bg-emerald-400 text-slate-900"
          : rank === RANK.FUJI1
          ? "bg-emerald-300 text-slate-900"
          : "bg-slate-600 text-slate-100")
    );

  $("#progress-bar").css("width", Math.min(100, percent) + "%");
  let barColor = "bg-green-400";
  if (totalElevation >= THERMOSPHERE_HEIGHT) barColor = "bg-gradient-to-r from-blue-400 via-purple-400 to-green-200";
  else if (totalElevation >= MESOSPHERE_HEIGHT) barColor = "bg-blue-400";
  else if (totalElevation >= STRATOSPHERE_HEIGHT) barColor = "bg-sky-300";
  else if (totalElevation >= FUJI_ELEVATION * 3) barColor = "bg-emerald-400";
  $("#progress-bar").removeClass().addClass("h-5 transition-all " + barColor);
  $("#progress-percent").text(percentText);
  $("#current-km").text(currentKm);
  $("#remain-km").text(remainKm);
}

// 日本地図ボタンを都道府県データから再描画
function renderJapanMap(list) {
  const agg = aggregateByPref(list, PREFECTURES);
  const $map = $("#japan-map");
  $map.empty();
  PREFECTURES.forEach(pref => {
    const { totalElevation } = agg[pref.code];
    let color = "bg-slate-700";
    let textColor = "text-slate-100";
    if (totalElevation >= 3000) {
      color = "bg-emerald-500/80"; textColor = "text-slate-900";
    } else if (totalElevation >= 1000) {
      color = "bg-emerald-700/70";
    } else if (totalElevation >= 1) {
      color = "bg-emerald-900/70";
    }
    const isSelected = selectedPrefecture && selectedPrefecture.code === pref.code;
    const ring = isSelected ? "ring-2 ring-cyan-400" : "ring-1 ring-slate-600";
    const isOverseas = pref.code === "overseas";
    const btn = $(
      `<button class="${color} ${textColor} ${ring} rounded flex items-center justify-center text-xs font-bold transition ${isOverseas ? 'w-full h-10' : 'w-full h-full'} min-h-[2.5rem] min-w-[2.5rem]" style="${isOverseas ? '' : `grid-row:${pref.row};grid-column:${pref.col};`}" data-code="${pref.code}">${pref.name}</button>`
    );
    btn.on("click", function() {
      selectedPrefecture = pref;
      renderJapanMap(mountains);
      renderMountains(mountains, selectedPrefecture);
    });
    $map.append(btn);
  });
}

// ステータス表示用バッジHTML
function createBadge(status) {
  return status === "climbed"
    ? '<span class="badge bg-emerald-400 text-slate-900 px-2 py-1 rounded">登った</span>'
    : '<span class="badge bg-yellow-400 text-slate-900 px-2 py-1 rounded">行きたい</span>';
}

function resetForm($form) {
  $form[0].reset();
}

// 都道府県セレクトボックスを描画
function renderPrefSelect() {
	const $sel = $("#mountain-pref");
	$sel.empty();
	$sel.append(DEFAULT_PREFECTURE_OPTION);
	PREFECTURES.forEach(pref => {
		$sel.append(`<option value="${pref.name}">${pref.name}</option>`);
	});
}

// 選択都道府県の山リストを描画
function renderMountains(list, selectedPref) {
  const $list = $("#mountain-list");
  $list.empty();
  if (!selectedPref) {
    $("#mountain-list-empty").show();
    return;
  }
  $("#mountain-list-empty").hide();
  const filtered = list.filter(m => m.prefecture === selectedPref.name);
  if (filtered.length === 0) {
    $list.append('<li class="text-slate-400">この都道府県の山は登録されていません</li>');
    return;
  }
  filtered.forEach(m => {
    $list.append(
      `<li class="flex flex-col gap-1 bg-green-50 border border-green-300 rounded p-2 relative shadow-sm">
        <div class="flex items-center gap-2">
          <span class="font-bold text-base text-green-900">${m.name}</span>
          ${createBadge(m.status)}
          <span class="ml-auto text-sm text-green-800">${m.elevation}m</span>
          <button class="ml-2 text-red-500 hover:text-red-700 font-bold delete-btn" data-id="${m.id}">✕</button>
        </div>
        <div class="flex flex-wrap gap-2 text-xs text-green-700">
          ${m.date ? `<span>🗓️${m.date}</span>` : ""}
        </div>
        ${m.memo ? `<div class="text-xs text-green-700">${m.memo}</div>` : ""}
      </li>`
    );
  });
  $(".delete-btn").on("click", function() {
    const id = Number($(this).data("id"));
    mountains = mountains.filter(m => m.id !== id);
    saveMountains(mountains);
    renderJapanMap(mountains);
    renderMountains(mountains, selectedPrefecture);
    updateStats(mountains);
  });
}

// 初期化とフォーム送信ハンドラ
$(function() {
  mountains = loadMountains();
  renderPrefSelect();
  renderJapanMap(mountains);
  updateStats(mountains);
  renderMountains(mountains, selectedPrefecture);

  $("#add-mountain-form").on("submit", function(e) {
    e.preventDefault();
    const name = $("#mountain-name").val().trim();
    const prefecture = $("#mountain-pref").val();
    const elevation = Number($("#mountain-elevation").val());
    const date = $("#mountain-date").val();
    const weather = $("#mountain-weather").val();
    const status = $("input[name='mountain-status']:checked").val();
    const memo = $("#mountain-memo").val().trim();
    if (!name || !prefecture || !elevation) return;
    const prefObj = PREFECTURES.find(p => p.name === prefecture);
    if (!prefObj) return;
    const newMountain = {
      id: Date.now(),
      name,
      prefecture,
      region: prefObj.region,
      elevation,
      date,
      weather,
      status,
      memo
    };
    mountains.push(newMountain);
    saveMountains(mountains);
    renderJapanMap(mountains);
    renderMountains(mountains, selectedPrefecture);
    updateStats(mountains);
    resetForm($(this));
  });
});
