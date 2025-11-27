// 地域ごとの都道府県データ
const HOKKAIDO = [
    { code: "hokkaido", name: "北海道", region: "北海道", row: 1, col: 13 }
];

const TOHOKU = [
    { code: "aomori", name: "青森", region: "東北", row: 2, col: 12 },
    { code: "iwate", name: "岩手", region: "東北", row: 3, col: 13 },
    { code: "miyagi", name: "宮城", region: "東北", row: 4, col: 13 },
    { code: "akita", name: "秋田", region: "東北", row: 3, col: 11 },
    { code: "yamagata", name: "山形", region: "東北", row: 4, col: 12 },
    { code: "fukushima", name: "福島", region: "東北", row: 5, col: 13 }
];

const KANTO = [
    { code: "ibaraki", name: "茨城", region: "関東", row: 6, col: 13 },
    { code: "tochigi", name: "栃木", region: "関東", row: 6, col: 12 },
    { code: "gunma", name: "群馬", region: "関東", row: 6, col: 11 },
    { code: "saitama", name: "埼玉", region: "関東", row: 7, col: 12 },
    { code: "chiba", name: "千葉", region: "関東", row: 8, col: 13 },
    { code: "tokyo", name: "東京", region: "関東", row: 7, col: 13 },
    { code: "kanagawa", name: "神奈川", region: "関東", row: 8, col: 12 }
];

const CHUBU = [
    { code: "niigata", name: "新潟", region: "中部", row: 4, col: 9 },
    { code: "toyama", name: "富山", region: "中部", row: 5, col: 9 },
    { code: "ishikawa", name: "石川", region: "中部", row: 5, col: 8 },
    { code: "fukui", name: "福井", region: "中部", row: 6, col: 8 },
    { code: "yamanashi", name: "山梨", region: "中部", row: 6, col: 10 },
    { code: "nagano", name: "長野", region: "中部", row: 5, col: 10 },
    { code: "gifu", name: "岐阜", region: "中部", row: 6, col: 9 },
    { code: "shizuoka", name: "静岡", region: "中部", row: 7, col: 10 },
    { code: "aichi", name: "愛知", region: "中部", row: 7, col: 9 }
];

const KINKI = [
    { code: "mie", name: "三重", region: "近畿", row: 8, col: 10 },
    { code: "shiga", name: "滋賀", region: "近畿", row: 7, col: 8 },
    { code: "kyoto", name: "京都", region: "近畿", row: 7, col: 7 },
    { code: "osaka", name: "大阪", region: "近畿", row: 8, col: 7 },
    { code: "hyogo", name: "兵庫", region: "近畿", row: 8, col: 8 },
    { code: "nara", name: "奈良", region: "近畿", row: 8, col: 11 },
    { code: "wakayama", name: "和歌山", region: "近畿", row: 9, col: 10 }
];

const CHUGOKU = [
    { code: "tottori", name: "鳥取", region: "中国", row: 7, col: 7 },
    { code: "shimane", name: "島根", region: "中国", row: 6, col: 6 },
    { code: "okayama", name: "岡山", region: "中国", row: 8, col: 6 },
    { code: "hiroshima", name: "広島", region: "中国", row: 9, col: 6 },
    { code: "yamaguchi", name: "山口", region: "中国", row: 9, col: 7 }
];

const SHIKOKU = [
    { code: "tokushima", name: "徳島", region: "四国", row: 10, col: 8 },
    { code: "kagawa", name: "香川", region: "四国", row: 9, col: 9 },
    { code: "ehime", name: "愛媛", region: "四国", row: 10, col: 7 },
    { code: "kochi", name: "高知", region: "四国", row: 11, col: 8 }
];

const KYUSHU_OKINAWA = [
    { code: "fukuoka", name: "福岡", region: "九州", row: 9, col: 4 },
    { code: "saga", name: "佐賀", region: "九州", row: 10, col: 4 },
    { code: "nagasaki", name: "長崎", region: "九州", row: 11, col: 4 },
    { code: "kumamoto", name: "熊本", region: "九州", row: 10, col: 5 },
    { code: "oita", name: "大分", region: "九州", row: 9, col: 5 },
    { code: "miyazaki", name: "宮崎", region: "九州", row: 11, col: 5 },
    { code: "kagoshima", name: "鹿児島", region: "九州", row: 12, col: 4 },
    { code: "okinawa", name: "沖縄", region: "沖縄", row: 12, col: 3 }
];

// 海外データ
const OVERSEAS = [
	{ code: "overseas", name: "海外", region: "海外", row: 1, col: 12 }
];

// 全ての都道府県データを統合
export const PREFECTURES_DATA = [
    ...HOKKAIDO,
    ...TOHOKU,
    ...KANTO,
    ...CHUBU,
    ...KINKI,
    ...CHUGOKU,
    ...SHIKOKU,
    ...KYUSHU_OKINAWA,
    ...OVERSEAS
];