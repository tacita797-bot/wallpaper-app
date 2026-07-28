/*! 
 * Wallpaper Pro v1.0 - 인테리어 도배 시공 관리 앱
 * Copyright (c) 2026 tacita797. All rights reserved.
 * 본 소프트웨어의 무단 복제, 수정, 배포를 금지합니다.
 * Unauthorized copying, modification or distribution is strictly prohibited.
 * Contact: tacita797@gmail.com
 * Build ID: WP-2026-T797-ORIGINAL
 */
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sgwhpgekjqntqkezxxed.supabase.co";
const SUPABASE_KEY = "sb_publishable_0kzBl0iQH7_i64jPFHro_g_AMG6kqIt";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── 무료/프리미엄 기능 제한 설정 (한 곳에서 관리) ──
const PREMIUM_FEATURES = {
  maxClients: 50,           // 무료 고객 수 제한
  asRecords: true,          // A/S 탭 (true = 후원자만)
  clientPhotos: true,       // 시공 전/후 사진
  textureFilms: true,       // 벽지 DB 텍스처
  vatCalc: true,            // 부가세/세금계산서
  allianceMax: 5,           // 연합 지역별 최대 멤버 수
};

// 토스 송금용 은행 코드 매핑
const BANK_CODES = {
  "KB국민": "004", "국민": "004", "국민은행": "004", "KB": "004",
  "신한": "088", "신한은행": "088",
  "우리": "020", "우리은행": "020",
  "하나": "081", "하나은행": "081", "KEB하나": "081", "KEB": "081",
  "농협": "011", "농협은행": "011", "NH농협": "011", "NH": "011",
  "IBK기업": "003", "기업": "003", "기업은행": "003", "IBK": "003",
  "카카오뱅크": "090", "카카오": "090",
  "토스뱅크": "092", "토스": "092",
  "케이뱅크": "089", "케이": "089",
  "SC제일": "023", "SC": "023", "씨티": "027", "씨티은행": "027",
  "부산": "032", "부산은행": "032",
  "광주": "034", "광주은행": "034",
  "제주": "035", "제주은행": "035",
  "전북": "037", "전북은행": "037",
  "경남": "039", "경남은행": "039",
  "수협": "007", "수협은행": "007",
  "새마을금고": "045", "MG": "045",
  "신협": "048",
  "우체국": "071"
};

function getBankCode(bankName) {
  if (!bankName) return "";
  if (BANK_CODES[bankName]) return BANK_CODES[bankName];
  for (const [name, code] of Object.entries(BANK_CODES)) {
    if (bankName.includes(name)) return code;
  }
  return "";
}


const _FC = {v:"1.0",b:"FP2026",a:"tacita797",e:"tacita797@gmail.com",t:1717200000,s:"ORIGINAL_NOT_COPY"};

function _fp(d){const k="t797fp";return btoa(k+d+k).replace(/=/g,"");}
const _SN = "FP-" + btoa("tacita797-2026-film-pro-original").slice(0,16);
const THEMES = {
  purple: { PRIMARY: "#5561F5", BG: "#F2F4F8", CARD: "#FFF", TEXT: "#1A1D2E", SUB: "#6B7280", BORDER: "#E5E7EB", PL: "#EDEFFD", HEADER: "#5561F5", NAV_BG: "#FFF" },
  dark: { PRIMARY: "#818CF8", BG: "#0F1117", CARD: "#1A1D2E", TEXT: "#E5E7EB", SUB: "#9CA3AF", BORDER: "#2A2D3E", PL: "#1E2130", HEADER: "#1A1D2E", NAV_BG: "#1A1D2E" },
  blue: { PRIMARY: "#2563EB", BG: "#F0F7FF", CARD: "#FFF", TEXT: "#1E293B", SUB: "#6B7280", BORDER: "#DBEAFE", PL: "#DBEAFE", HEADER: "#2563EB", NAV_BG: "#FFF" },
  green: { PRIMARY: "#059669", BG: "#F0FDF4", CARD: "#FFF", TEXT: "#1A2E20", SUB: "#6B7280", BORDER: "#D1FAE5", PL: "#D1FAE5", HEADER: "#059669", NAV_BG: "#FFF" },
  red: { PRIMARY: "#DC2626", BG: "#FEF8F8", CARD: "#FFF", TEXT: "#2E1A1A", SUB: "#6B7280", BORDER: "#FECACA", PL: "#FEE2E2", HEADER: "#DC2626", NAV_BG: "#FFF" },
};
const savedTheme = (() => { try { return localStorage.getItem("app_theme") || "purple"; } catch { return "purple"; } })();
const T = THEMES[savedTheme] || THEMES.purple;
const PRIMARY = T.PRIMARY, BG = T.BG, CARD = T.CARD, TEXT = T.TEXT, SUB = T.SUB, BORDER = T.BORDER, PL = T.PL;
const GRAD = `linear-gradient(135deg,${T.HEADER},${T.HEADER}dd)`; const NAV_BG = T.NAV_BG || '#FFF';
const QUOTES = [
"오늘 한 걸음이 내일의 천 리를 만든다","좋은 시공은 고객의 신뢰로 돌아온다","작은 디테일이 큰 차이를 만든다","포기하지 않는 한 실패는 없다","오늘의 땀이 내일의 보람이 된다",
"고객의 만족이 최고의 광고다","완벽을 추구하되 완벽에 집착하지 마라","시작이 반이다","매일 조금씩 나아가면 된다","좋은 습관이 좋은 결과를 만든다",
"도전 없이는 성장도 없다","실수는 배움의 기회다","꾸준함이 재능을 이긴다","감사하는 마음이 행복을 부른다","하루를 최선으로 살면 인생이 바뀐다",
"노력은 배신하지 않는다","할 수 있다고 믿으면 할 수 있다","지금 이 순간이 가장 빠른 때다","성공은 준비와 기회의 만남이다","어제보다 나은 오늘을 만들자",
"고객을 내 가족처럼 대하라","기술은 연습에서 완성된다","성실함이 가장 큰 재산이다","위기는 기회의 다른 이름이다","겸손한 자가 더 멀리 간다",
"진심은 반드시 통한다","좋은 일은 작은 것에서 시작된다","열정 없이 위대한 것은 이루어지지 않는다","현장에서 답을 찾아라","끝까지 해내는 사람이 이긴다",
"오늘 힘들더라도 내일은 웃을 수 있다","변화를 두려워하지 마라","최고의 투자는 자기 자신이다","작은 성공이 큰 자신감을 만든다","함께하면 더 멀리 간다",
"정직이 최선의 전략이다","기회는 준비된 자에게 온다","매일이 새로운 시작이다","행동이 말보다 크다","목표를 정하면 길이 보인다",
"실패를 두려워하지 않는 자만이 성공한다","오늘의 노력이 미래의 자산이다","고객의 목소리에 귀를 기울여라","인내는 쓰지만 그 열매는 달다","작은 친절이 큰 감동을 만든다",
"배움에는 끝이 없다","긍정의 힘은 상상 이상이다","과정을 즐기면 결과는 따라온다","나를 믿는 것이 시작이다","한 발짝 물러서면 전체가 보인다",
"시간은 금이다, 지금 시작하라","작은 약속도 반드시 지켜라","프로는 결과로 말한다","당신의 손끝에서 예술이 탄생한다","어려울 때 진짜 실력이 나온다",
"고객의 미소가 나의 보상이다","한계를 정하는 것은 자기 자신이다","매 순간 최선을 다하라","좋은 도구보다 좋은 기술자가 낫다","실패해도 괜찮다, 다시 일어서면 된다",
"오늘 배운 것이 내일의 무기가 된다","성공의 비결은 시작하는 것이다","꿈은 이루어진다, 행동하면","작은 변화가 큰 혁신을 이끈다","함께 성장하는 것이 진정한 성공이다",
"현재에 충실하면 미래는 밝다","좋은 관계가 좋은 사업을 만든다","항상 배우는 자세를 유지하라","고난이 나를 강하게 만든다","오늘도 한 걸음 더 나아가자",
"신뢰는 천천히 쌓이지만 한순간에 무너진다","내가 하는 일에 자부심을 가져라","포기란 선택지에 없다","작은 것에도 정성을 다하라","세상에 쉬운 일은 없다, 하지만 할 수 있다",
"꿈을 꾸는 사람이 꿈을 이룬다","열심히 사는 모습이 가장 아름답다","기회는 모든 사람에게 온다","후회 없는 하루를 보내자","좋은 결과는 좋은 과정에서 나온다",
"사소한 것이 사소하지 않다","매일 1%씩 성장하면 1년 뒤 37배가 된다","지금 하는 일이 미래를 결정한다","불가능이란 게으른 자의 변명이다","하늘은 스스로 돕는 자를 돕는다",
"열정은 전염된다","좋은 시공은 입소문을 탄다","당신만의 색깔을 가져라","실력이 곧 자신감이다","마감이 실력을 만든다",
"고객 한 명 한 명이 소중하다","오늘의 불편함이 내일의 편리함이 된다","타협하지 않는 품질이 브랜드가 된다","느려도 괜찮다, 멈추지만 않으면","일을 사랑하면 일이 즐거워진다",
"안 되면 되게 하라","기본에 충실한 것이 가장 어렵다","실패는 성공의 어머니다","오늘 심은 씨앗이 내일의 열매가 된다","현장 경험이 가장 좋은 스승이다",
"무엇을 하든 최고를 목표로 하라","새벽에 일어나는 사람이 성공한다","문제는 해결하기 위해 존재한다","자기 일에 미친 사람이 세상을 바꾼다","땀 흘린 만큼 보답받는다",
"고객을 감동시키면 사업은 성공한다","내일을 위해 오늘을 투자하라","실력을 쌓는 데 지름길은 없다","겸손하게 배우고 당당하게 시공하라","시간이 걸려도 제대로 하라",
"인생은 도전의 연속이다","좋은 평판은 돈으로 살 수 없다","최선을 다하면 후회는 없다","하루하루가 축복이다","건강이 최고의 재산이다",
"멈추지 않으면 길이 된다","시공 하나에도 장인 정신을","감동을 주는 사람이 성공한다","오늘의 수고가 내일의 걸작이 된다","실패한 곳에서 다시 시작하라",
"눈 앞의 이익보다 신뢰를 택하라","한 가지에 집중하면 전문가가 된다","어제의 나와 경쟁하라","긍정적인 사람 곁에 머물러라","남과 비교하지 말고 나만의 길을 가라",
"작은 시공도 큰 마음으로","목표가 있으면 흔들리지 않는다","믿음이 산을 옮긴다","오늘 잘하면 내일은 더 잘할 수 있다","세상은 노력하는 자의 편이다",
"좋은 사람과 함께하면 좋은 일이 생긴다","역경 속에서 진주가 만들어진다","나의 한계는 내가 정한다","프로는 과정도 아름답게 만든다","매일 발전하는 것이 행복이다",
"진짜 실력은 보이지 않는 곳에서 나온다","비가 온 뒤에 땅이 굳어진다","나를 키우는 것은 나의 결단이다","오늘도 감사하며 시작하자","작은 성취를 축하하라",
"반복이 기적을 만든다","모든 위대한 일은 첫걸음에서 시작됐다","사람이 재산이다","좌절은 일시적이다, 포기는 영원하다","힘든 시간도 지나간다",
"고객의 집이 내 작품이다","세상에서 가장 값진 것은 시간이다","용기 있는 자가 기회를 잡는다","말보다 행동이 사람을 움직인다","오늘 하루도 나의 역사다",
"성장통은 성장의 증거다","신뢰를 쌓는 가장 빠른 방법은 약속을 지키는 것이다","즐기는 자를 이길 수 없다","매일 아침은 새로운 기회다","내가 먼저 변하면 세상이 변한다",
"좋은 의도가 좋은 결과를 낳는다","결국 해내는 사람이 진짜다","천 리 길도 한 걸음부터","보이지 않는 곳에서 빛나는 사람이 되자","나의 가치는 내가 만든다",
"고객의 행복이 나의 행복이다","시간은 기다려주지 않는다","꾸준히 하면 반드시 된다","잘 될 거야, 항상 그랬듯이","지금 포기하면 어제의 노력이 아깝다",
"좋은 하루를 만드는 것은 나 자신이다","성공하는 사람은 핑계를 대지 않는다","내 일에 가장 진심인 사람이 되자","어떤 일이든 시작이 가장 어렵다","작은 봉사가 큰 보답으로 돌아온다",
"미래는 현재의 선택으로 만들어진다","프로와 아마추어의 차이는 꾸준함이다","오늘의 실수가 내일의 경험이 된다","감사하는 습관이 행복의 시작이다","자기 관리가 성공의 첫걸음이다",
"결과보다 과정에서 배운다","힘들 때 한 번 더 하면 프로가 된다","나만의 브랜드를 만들어라","일찍 시작하면 여유가 생긴다","웃으며 일하면 즐거워진다",
"기다리지 말고 만들어라","강한 사람이 울지 않는 게 아니라 울고도 일어서는 거다","완벽한 때를 기다리지 마라, 지금이 최고의 때다","하고 싶은 일을 하는 것이 성공이다","차분하게, 그러나 단단하게",
"오늘 놓치면 내일은 더 어렵다","당신의 경험이 당신의 자산이다","스스로에게 정직하라","인생에서 가장 중요한 건 건강과 가족이다","노력의 방향이 맞으면 결과는 따라온다",
"작은 성공을 모으면 큰 성공이 된다","고객의 작은 요청도 소홀히 하지 마라","내일의 나를 위해 오늘 노력하라","실력은 거짓말을 하지 않는다","모든 마감은 새로운 시작이다",
"위대한 일은 조용히 이루어진다","좋은 사람이 좋은 시공을 한다","쉬어갈 줄 아는 것도 실력이다","목표를 적으면 이루어질 확률이 높아진다","오늘의 고객이 내일의 소개자다",
"비전이 있는 사람은 포기하지 않는다","항상 처음처럼","기술은 정직하다","행복은 여정에 있다","문제가 클수록 기회도 크다",
"지금 가는 길이 맞다","같은 실수를 반복하지 않으면 성장이다","내가 즐거우면 일도 즐겁다","정성이 담긴 시공은 세월이 증명한다","좋은 재료와 좋은 기술이 만나면 명작이 탄생한다",
"당신은 할 수 있다","도움을 요청하는 것도 용기다","세상에 쓸모없는 경험은 없다","꿈꾸는 것을 멈추지 마라","빠르게보다 정확하게",
"하나에 집중하면 열 가지가 보인다","후회보다 도전이 낫다","현장이 학교다","성실함은 언젠가 보상받는다","동료와 함께 성장하자",
"지금의 고생이 나중의 추억이 된다","마음먹기에 달렸다","진정한 프로는 보이지 않는 곳까지 신경 쓴다","고객의 기대를 넘어서라","큰 꿈을 가져라, 그리고 행동하라",
"오늘의 수고에 감사하자","잘하는 것보다 좋아하는 것이 더 오래간다","선택과 집중이 성공의 열쇠다","내가 먼저 웃으면 세상이 웃는다","작은 습관이 인생을 바꾼다",
"어디서든 최선을 다하는 사람이 되자","하루 한 시간의 학습이 인생을 바꾼다","성공은 혼자 하는 것이 아니다","마무리가 시작보다 중요하다","노력 없는 성공은 없다",
"실전이 최고의 연습이다","오늘도 한 발 앞으로","내가 곧 브랜드다","품질이 가격을 정한다","서두르지 말고 꾸준히",
"깨끗한 마무리가 프로의 증거다","매일 성장하고 있다는 사실에 감사하라","작은 배려가 큰 신뢰를 만든다","포기하고 싶을 때가 성공에 가장 가까운 때다","오늘도 누군가에게 도움이 되는 하루를",
"기술은 공유할수록 커진다","나의 시공이 누군가의 일상을 바꾼다","지치지 않는 열정이 진짜 능력이다","기본을 지키는 것이 프로다","고객에게 감동을 주는 시공을 하자",
"오늘 못 한 일은 내일 더 잘하면 된다","나를 믿는 사람을 실망시키지 말자","매출보다 신뢰가 먼저다","실패는 끝이 아니라 과정이다","매일 감사하면 매일 행복하다",
"좋은 시공은 시간이 지나도 빛난다","주어진 환경에서 최선을 다하라","고객은 최고의 스승이다","내일을 걱정하기보다 오늘을 살자","열정이 식지 않는 한 길은 열린다",
"내가 서 있는 곳이 가장 좋은 출발점이다","인생은 마라톤이다, 스프린트가 아니라","좋은 도구는 좋은 결과의 시작이다","남이 아닌 나와의 싸움에서 이겨라","하루의 끝에 만족하는 삶을 살자",
"작은 감사가 큰 행복을 만든다","모든 것은 나의 태도에서 시작된다","오늘 흘린 땀은 내일의 자양분이다","당신의 일이 세상을 아름답게 한다","될 때까지 하면 된다",
"좋은 시공을 위해 좋은 사람이 되자","내 손으로 만드는 나의 미래","아무리 작은 일이라도 최선을 다하라","당신이 있어 이 세상이 더 아름답다","쉬운 길보다 바른 길을 택하라",
"겸손한 마음으로 배우고 당당한 마음으로 일하라","오늘 하루도 충분히 잘하고 있다","지금 이 순간에 집중하라","성공한 사람은 모두 한때 초보였다","기적은 노력하는 사람에게 일어난다",
"좋은 인연이 좋은 사업을 만든다","실패해도 좋다, 시도했으니까","행운은 노력을 가장한 결과다","내가 할 수 있는 것에 집중하라","꾸준함은 천재를 이긴다",
"고객과 함께 성장하라","오늘의 작은 실천이 내일의 큰 변화다","웃으면 복이 온다","나만의 속도로 가면 된다","진심을 담으면 결과가 달라진다",
"세상에서 가장 쉬운 것은 포기, 가장 어려운 것은 계속하는 것","좋은 첫인상이 좋은 결과를 만든다","나의 일이 나를 만든다","오늘 하루 행복했다면 성공한 하루다","작지만 확실한 행복을 찾자",
"인내하는 자에게 길이 열린다","내 일에 자부심을 가져라","도전하는 삶이 아름답다","고객의 칭찬이 가장 큰 동기부여다","일을 미루지 말자, 오늘 해결하자",
"좋은 기운은 전염된다","나의 경쟁자는 어제의 나다","하루를 소중히 여기면 인생이 소중해진다","디테일의 차이가 결과의 차이다","함께 일하는 즐거움을 느끼자",
"불평하기보다 해결책을 찾자","오늘도 최선을 다한 나에게 수고했다고 말하자","느리더라도 올바른 방향이면 괜찮다","끝까지 포기하지 않는 사람이 승리한다","내가 만든 공간에서 사람들이 행복하다면 그것이 보람이다",
"지금 당장 시작하라, 완벽할 때는 오지 않는다","오늘도 파이팅!","성공은 매일의 작은 노력들의 합이다","누군가의 하루를 밝게 해줄 수 있다면 그것으로 충분하다","시작할 용기만 있으면 절반은 성공이다",
"나무를 심기 가장 좋은 때는 20년 전이다, 두 번째로 좋은 때는 지금이다","생각이 바뀌면 행동이 바뀌고 인생이 바뀐다","진정한 장인은 도구를 탓하지 않는다","벽에 부딪히면 돌아가는 법도 배워라","가장 큰 모험은 아무것도 하지 않는 것이다",
"실패를 경험해야 성공의 맛을 안다","남을 돕는 것이 나를 돕는 것이다","작은 시작이 위대한 완성을 만든다","오늘의 선택이 내일의 나를 만든다","멈추고 싶을 때 한 발만 더 가라",
"좋은 평판은 최고의 마케팅이다","나의 열정이 고객에게 전해진다","배움을 멈추는 순간 성장도 멈춘다","정확한 시공이 안전한 공간을 만든다","작은 칭찬이 큰 힘이 된다",
"비 온 뒤에 무지개가 뜬다","오늘 걱정보다 내일 계획을 세우자","성공의 반대는 실패가 아니라 아무것도 안 하는 것이다","좋은 팀이 좋은 결과를 만든다","자신만의 기준을 세우고 지켜라",
"감사한 마음이 더 많은 감사를 부른다","지혜는 경험에서 온다","오늘 배운 것이 평생의 자산이다","작은 정성이 큰 감동을 만든다","매일 성장하는 내가 되자",
"현재를 즐기면 미래는 절로 밝아진다","처음의 마음을 잃지 말자","좋은 결과는 좋은 준비에서 나온다","나의 손끝에서 새로운 공간이 탄생한다","성실한 사람이 결국 이긴다",
"시간을 다스리는 자가 인생을 다스린다","오늘도 새로운 도전을 환영하자","작은 실천이 큰 변화의 시작이다","매일 조금씩이라도 앞으로 나아가자","가치 있는 일에 시간을 쓰자",
"좋은 건 나누면 배가 된다","내가 하는 모든 일에 의미가 있다","어둠이 깊을수록 별은 더 빛난다","포기하지 않는 것이 가장 큰 재능이다","좋은 습관은 좋은 인생의 기초다",
"오늘 하루도 기적 같은 날이다","당신의 노력은 헛되지 않았다","새로운 하루, 새로운 가능성","함께라서 가능한 일이 있다","오늘도 한 뼘 더 성장했다",
"내일은 오늘보다 더 좋을 것이다","시공 한 장 한 장에 정성을 담자","당신은 이미 충분히 잘하고 있다","좋은 하루의 시작은 좋은 마음가짐이다","365일 모든 날이 특별하다"

];
function getDailyQuote() { const d = new Date(); const idx = (d.getMonth() * 31 + d.getDate()) % QUOTES.length; return QUOTES[idx]; }

function trackFilmUse(film) {
  if (!film || !film.code) return;
  try {
    const data = JSON.parse(localStorage.getItem("film_usage") || "{}");
    const key = film.brand + ":" + film.code;
    data[key] = (data[key] || 0) + 1;
    localStorage.setItem("film_usage", JSON.stringify(data));
  } catch {}
}
function getFilmUsage() {
  try { return JSON.parse(localStorage.getItem("film_usage") || "{}"); } catch { return {}; }
}
const STATUS = {
  "상담중": { bg: "#FAF5FF", color: "#7C3AED" },
  "상담완료": { bg: "#EFF6FF", color: "#2563EB" },
  "시공예정": { bg: "#FFF7ED", color: "#EA580C" },
  "완료": { bg: "#F0FDF4", color: "#16A34A" },
  "A/S": { bg: "#FEF2F2", color: "#DC2626" },
};
const FILMS = [];
const BRAND_COLORS = { "LX하우시스": "#5561F5", "개나리벽지": "#E05C1A", "신한벽지": "#1D6B2C", "디아이디": "#0891B2", "현대L&C": "#7C3AED", "Custom": "#6B7280" };

// ── 공통 컴포넌트 ──
function Badge({ status }) {
  const st = STATUS[status] || { bg: "#F3F4F6", color: "#6B7280" };
  return <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{status}</span>;
}
function Card({ children, style, onClick }) {
  return <div onClick={onClick} style={{ background: CARD, borderRadius: 16, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>;
}
function Header({ title, back, onBack, right }) {
  return (
    <div style={{ background: "#fff", padding: "14px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10 }}>
      {back && <button onClick={onBack} style={{ background: "none", border: "none", padding: 4, cursor: "pointer", fontSize: 20, color: TEXT }}>←</button>}
      <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: TEXT }}>{title}</span>
      {right}
    </div>
  );
}
function Inp({ label, value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", color: TEXT, ...style }}
        onFocus={e => e.target.style.borderColor = PRIMARY} onBlur={e => e.target.style.borderColor = BORDER} />
    </div>
  );
}
function NumFmt({ value, onChange, placeholder, style = {} }) {
  const fmt = (v) => { const n = String(v).replace(/[^0-9]/g, ""); return n ? parseInt(n).toLocaleString() : ""; };
  const raw = (v) => v.replace(/[^0-9]/g, "");
  return <input type="text" inputMode="numeric" value={fmt(value)} onChange={e => onChange({ target: { value: raw(e.target.value) } })} placeholder={placeholder} style={{ border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: "9px 8px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, ...style }} />;
}

// 소수점 허용 숫자 입력 (실측 가로/세로 등, m 단위)
function DecFmt({ value, onChange, placeholder, style = {} }) {
  const raw = (v) => {
    let s = v.replace(/[^0-9.]/g, "");
    // 소수점 2개 이상 입력 방지 (첫 번째만 유지)
    const firstDot = s.indexOf(".");
    if (firstDot !== -1) {
      s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
    }
    return s;
  };
  return <input type="text" inputMode="decimal" value={value} onChange={e => onChange({ target: { value: raw(e.target.value) } })} placeholder={placeholder} style={{ border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: "9px 8px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, ...style }} />;
}

// ── 로그인/회원가입 화면 ──
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleLogin() {
    if (!email || !password) return setMsg("이메일과 비밀번호를 입력해주세요.");
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg("로그인 실패: " + error.message); setLoading(false); return; }
    // 승인 여부 확인
    const { data: user } = await supabase.from("app_users").select("role").eq("id", data.user.id).single();
    if (!user || user.role === "pending") {
      await supabase.auth.signOut();
      setMsg("승인 대기 중입니다. 관리자에게 문의하세요.");
      setLoading(false); return;
    }
    onAuth(data.user, user.role);
    setLoading(false);
  }

  async function handleSignup() {
    if (!email || !password || !name) return setMsg("모든 항목을 입력해주세요.");
    if (password.length < 6) return setMsg("비밀번호는 6자 이상이어야 해요.");
    setLoading(true); setMsg("");
    const { data: authData, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) { setMsg("가입 실패: " + error.message); setLoading(false); return; }
    // app_users 테이블에 이름 저장 (트리거가 자동 생성한 row를 업데이트)
    if (authData?.user?.id) {
      await supabase.from("app_users").update({ name }).eq("id", authData.user.id);
    }
    setMsg("가입 신청 완료! 관리자 승인 후 로그인할 수 있어요.");
    setMode("login"); setLoading(false);
  }

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(135deg,#5561F5,#7C6EF5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎨</div>
      <div style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>도배 시공 앱</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 32 }}>인테리어 벽지 전문 관리 시스템</div>
      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", marginBottom: 20, background: BG, borderRadius: 12, padding: 4 }}>
          <button onClick={() => { setMode("login"); setMsg(""); }} style={{ flex: 1, border: "none", borderRadius: 10, padding: "10px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", background: mode === "login" ? "#fff" : "transparent", color: mode === "login" ? PRIMARY : SUB, boxShadow: mode === "login" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>로그인</button>
          <button onClick={() => { setMode("signup"); setMsg(""); }} style={{ flex: 1, border: "none", borderRadius: 10, padding: "10px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", background: mode === "signup" ? "#fff" : "transparent", color: mode === "signup" ? PRIMARY : SUB, boxShadow: mode === "signup" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>가입 신청</button>
        </div>
        {mode === "signup" && <Inp label="이름" value={name} onChange={e => setName(e.target.value)} placeholder="홍길동" />}
        <Inp label="이메일" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@gmail.com" type="email" />
        <Inp label="비밀번호" value={password} onChange={e => setPassword(e.target.value)} placeholder="6자 이상" type="password" />
        {msg && <div style={{ fontSize: 13, color: msg.includes("완료") ? "#16A34A" : "#DC2626", marginBottom: 12, padding: "8px 12px", background: msg.includes("완료") ? "#F0FDF4" : "#FEF2F2", borderRadius: 8 }}>{msg}</div>}
        <button onClick={mode === "login" ? handleLogin : handleSignup} disabled={loading}
          style={{ width: "100%", background: loading ? BORDER : PRIMARY, color: loading ? SUB : "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입 신청"}
        </button>
      </div>
    </div>
  );
}

// ── 승인 대기 화면 ──
function PendingScreen({ onLogout }) {
  return (
    <div style={{ minHeight: "100dvh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 8 }}>승인 대기 중</div>
      <div style={{ fontSize: 14, color: SUB, marginBottom: 32, lineHeight: 1.6 }}>관리자가 계정을 승인하면<br />사용할 수 있어요</div>
      <button onClick={onLogout} style={{ border: `1.5px solid ${BORDER}`, borderRadius: 13, padding: "12px 24px", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>로그아웃</button>
    </div>
  );
}

// ── 관리자 화면 ──
function AdminScreen({ onLogout, onBack }) {
  const [tab, setTab] = useState("users"); // users / requests / announce / faq / accounts
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    const [u, r, a, f, ac] = await Promise.all([
      supabase.from("app_users").select("id, email, name, role, tier, created_at").order("created_at", { ascending: false }),
      supabase.from("premium_requests").select("*").order("requested_at", { ascending: false }),
      supabase.from("announcements").select("*").order("display_order", { ascending: false }).order("created_at", { ascending: false }),
      supabase.from("faqs").select("*").order("display_order", { ascending: true }),
      supabase.from("donation_accounts").select("*").order("display_order", { ascending: true }),
    ]);
    setUsers(u.data || []);
    setRequests(r.data || []);
    setAnnouncements(a.data || []);
    setFaqs(f.data || []);
    setAccounts(ac.data || []);
    setLoading(false);
  }

  async function updateRole(id, role) { await supabase.from("app_users").update({ role }).eq("id", id); loadAll(); }
  async function updateTier(id, tier) { await supabase.from("app_users").update({ tier }).eq("id", id); loadAll(); }

  const pending = users.filter(u => u.role === "pending");
  const approved = users.filter(u => u.role !== "pending");
  const pendingReqs = requests.filter(r => r.status === "pending");

  const tabs = [
    { id: "users", label: "👥 사용자", count: pending.length },
    { id: "requests", label: "💎 후원신청", count: pendingReqs.length },
    { id: "announce", label: "📢 공지사항", count: announcements.length },
    { id: "faq", label: "❓ FAQ", count: faqs.length },
    { id: "accounts", label: "💳 계좌", count: accounts.length },
  ];

  return (
    <div style={{ background: BG, minHeight: "100dvh" }}>
      <Header title="👑 관리자" back onBack={onBack} right={
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: SUB }}>로그아웃</button>
      } />

      {/* 통계 카드 */}
      <div style={{ padding: "12px 14px 0" }}>
        <Card style={{ background: GRAD, color: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, textAlign: "center" }}>
            <div><div style={{ fontSize: 20, fontWeight: 800 }}>{users.length}</div><div style={{ fontSize: 10, opacity: 0.85 }}>전체</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 800 }}>{users.filter(u => u.tier === "premium").length}</div><div style={{ fontSize: 10, opacity: 0.85 }}>⭐ 후원</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 800 }}>{users.filter(u => u.tier !== "premium" && u.role !== "pending").length}</div><div style={{ fontSize: 10, opacity: 0.85 }}>🆓 무료</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 800 }}>{pending.length}</div><div style={{ fontSize: 10, opacity: 0.85 }}>⏳ 대기</div></div>
          </div>
        </Card>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ display: "flex", overflowX: "auto", padding: "12px 14px 6px", gap: 6 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", background: tab === t.id ? PRIMARY : "#fff", color: tab === t.id ? "#fff" : SUB, position: "relative" }}>
            {t.label}
            {t.count > 0 && tab !== t.id && <span style={{ marginLeft: 4, background: "#EF4444", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>{t.count}</span>}
          </button>
        ))}
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {loading && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>로딩 중...</p></Card>}

        {/* 👥 사용자 탭 */}
        {!loading && tab === "users" && (
          <>
            {pending.length > 0 && (
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", margin: "0 0 8px" }}>⏳ 승인 대기 ({pending.length})</p>
                {pending.map(u => (
                  <Card key={u.id} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{u.name || "이름없음"}</div>
                        <div style={{ fontSize: 12, color: SUB }}>{u.email}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => updateRole(u.id, "user")} style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: "#16A34A", fontWeight: 700 }}>승인</button>
                        <button onClick={() => updateRole(u.id, "blocked")} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: "#DC2626", fontWeight: 700 }}>거절</button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "0 0 8px" }}>✅ 승인된 사용자 ({approved.length})</p>
              {approved.map(u => (
                <Card key={u.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{u.name || "이름없음"} {u.role === "admin" ? "👑" : ""} {u.tier === "premium" ? "⭐" : ""}</div>
                      <div style={{ fontSize: 12, color: SUB }}>{u.email}</div>
                      <div style={{ fontSize: 10, color: u.tier === "premium" ? "#16A34A" : SUB, marginTop: 2 }}>{u.tier === "premium" ? "후원자" : "무료"}</div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {u.role !== "admin" && (
                        <button onClick={() => updateTier(u.id, u.tier === "premium" ? "free" : "premium")} style={{ background: u.tier === "premium" ? "#FEF2F2" : "#F0FDF4", border: `1px solid ${u.tier === "premium" ? "#FECACA" : "#86EFAC"}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, color: u.tier === "premium" ? "#DC2626" : "#16A34A", fontWeight: 700 }}>{u.tier === "premium" ? "무료로" : "⭐ 후원자"}</button>
                      )}
                      {u.role !== "admin" && (
                        <button onClick={() => updateRole(u.id, "blocked")} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, color: "#DC2626", fontWeight: 700 }}>차단</button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* 💎 후원신청 탭 */}
        {!loading && tab === "requests" && (
          <RequestsTab requests={requests} reload={loadAll} />
        )}

        {/* 📢 공지 탭 */}
        {!loading && tab === "announce" && (
          <AnnounceTab items={announcements} reload={loadAll} />
        )}

        {/* ❓ FAQ 탭 */}
        {!loading && tab === "faq" && (
          <FaqTab items={faqs} reload={loadAll} />
        )}

        {/* 💳 후원계좌 탭 */}
        {!loading && tab === "accounts" && (
          <AccountsTab items={accounts} reload={loadAll} />
        )}
      </div>
    </div>
  );
}

// ── 후원신청 처리 탭 ──
function RequestsTab({ requests, reload }) {
  async function approve(req) {
    await supabase.from("premium_requests").update({ status: "approved", processed_at: new Date().toISOString() }).eq("id", req.id);
    await supabase.from("app_users").update({ tier: "premium" }).eq("id", req.user_id);
    alert("✅ 후원자 승인 완료!");
    reload();
  }
  async function reject(req) {
    if (!window.confirm("이 후원 신청을 거절하시겠어요?")) return;
    await supabase.from("premium_requests").update({ status: "rejected", processed_at: new Date().toISOString() }).eq("id", req.id);
    reload();
  }
  const pending = requests.filter(r => r.status === "pending");
  const processed = requests.filter(r => r.status !== "pending");

  return (
    <>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", margin: "0 0 8px" }}>⏳ 처리 대기 ({pending.length})</p>
        {pending.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>대기 중인 신청이 없어요</p></Card>}
        {pending.map(r => (
          <Card key={r.id} style={{ marginBottom: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{r.user_name || "이름없음"} {r.amount ? `· ${r.amount.toLocaleString()}원` : ""}</div>
              <div style={{ fontSize: 12, color: SUB }}>{r.user_email}</div>
              {r.depositor_name && <div style={{ fontSize: 11, color: SUB, marginTop: 3 }}>입금자: {r.depositor_name}</div>}
              {r.message && <div style={{ fontSize: 12, color: TEXT, marginTop: 6, padding: 8, background: BG, borderRadius: 8 }}>💬 {r.message}</div>}
              <div style={{ fontSize: 10, color: SUB, marginTop: 4 }}>{new Date(r.requested_at).toLocaleString("ko-KR")}</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => approve(r)} style={{ flex: 1, background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, color: "#16A34A", fontWeight: 700 }}>⭐ 승인</button>
              <button onClick={() => reject(r)} style={{ flex: 1, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, color: "#DC2626", fontWeight: 700 }}>거절</button>
            </div>
          </Card>
        ))}
      </div>
      {processed.length > 0 && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: SUB, margin: "0 0 8px" }}>📋 처리 완료 ({processed.length})</p>
          {processed.slice(0, 20).map(r => (
            <Card key={r.id} style={{ marginBottom: 6, opacity: 0.7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.user_name} · {r.status === "approved" ? "✅ 승인" : "❌ 거절"}</div>
                  <div style={{ fontSize: 10, color: SUB }}>{new Date(r.processed_at || r.requested_at).toLocaleDateString("ko-KR")}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

// ── 공지사항 관리 탭 ──
function AnnounceTab({ items, reload }) {
  const [edit, setEdit] = useState(null); // null | "new" | item
  const [form, setForm] = useState({ title: "", content: "", is_important: false, is_active: true });

  function open(item) {
    if (item === "new") setForm({ title: "", content: "", is_important: false, is_active: true });
    else setForm({ title: item.title, content: item.content, is_important: item.is_important, is_active: item.is_active });
    setEdit(item);
  }
  async function save() {
    if (!form.title.trim()) return alert("제목을 입력해주세요");
    let result;
    if (edit === "new") {
      result = await supabase.from("announcements").insert([form]).select();
    } else {
      result = await supabase.from("announcements").update({ ...form, updated_at: new Date().toISOString() }).eq("id", edit.id).select();
    }
    if (result.error) {
      alert("저장 실패: " + result.error.message);
      return;
    }
    setEdit(null); reload();
  }
  async function del(item) {
    if (!window.confirm("이 공지를 삭제할까요?")) return;
    await supabase.from("announcements").delete().eq("id", item.id);
    reload();
  }
  async function toggle(item) {
    await supabase.from("announcements").update({ is_active: !item.is_active }).eq("id", item.id);
    reload();
  }

  return (
    <>
      <button onClick={() => open("new")} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>+ 새 공지 추가</button>
      {items.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>등록된 공지가 없어요</p></Card>}
      {items.map(item => (
        <Card key={item.id} style={{ marginBottom: 8, opacity: item.is_active ? 1 : 0.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.is_important ? "📌 " : ""}{item.title}</div>
              <div style={{ fontSize: 12, color: SUB, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{item.content}</div>
              <div style={{ fontSize: 10, color: SUB, marginTop: 6 }}>{new Date(item.created_at).toLocaleDateString("ko-KR")} {!item.is_active && "· 비활성"}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <button onClick={() => open(item)} style={{ background: PL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: PRIMARY, fontWeight: 700 }}>수정</button>
              <button onClick={() => toggle(item)} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: SUB }}>{item.is_active ? "숨기기" : "보이기"}</button>
              <button onClick={() => del(item)} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: "#DC2626" }}>삭제</button>
            </div>
          </div>
        </Card>
      ))}

      {edit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setEdit(null); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{edit === "new" ? "새 공지" : "공지 수정"}</span>
              <button onClick={() => setEdit(null)} style={{ background: "none", border: "none", fontSize: 24, color: SUB, cursor: "pointer" }}>×</button>
            </div>
            <Inp label="제목 *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="공지 제목" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>내용</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={6} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "vertical", lineHeight: 1.6 }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_important} onChange={e => setForm(p => ({ ...p, is_important: e.target.checked }))} /> 📌 중요
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} /> 활성화
              </label>
            </div>
            <button onClick={save} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── FAQ 관리 탭 ──
function FaqTab({ items, reload }) {
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "", display_order: 0, is_active: true });

  function open(item) {
    if (item === "new") setForm({ question: "", answer: "", category: "", display_order: items.length + 1, is_active: true });
    else setForm({ question: item.question, answer: item.answer, category: item.category || "", display_order: item.display_order, is_active: item.is_active });
    setEdit(item);
  }
  async function save() {
    if (!form.question.trim() || !form.answer.trim()) return alert("질문과 답변을 모두 입력해주세요");
    let result;
    if (edit === "new") {
      result = await supabase.from("faqs").insert([form]).select();
    } else {
      result = await supabase.from("faqs").update({ ...form, updated_at: new Date().toISOString() }).eq("id", edit.id).select();
    }
    if (result.error) {
      alert("저장 실패: " + result.error.message);
      return;
    }
    setEdit(null); reload();
  }
  async function del(item) {
    if (!window.confirm("이 FAQ를 삭제할까요?")) return;
    await supabase.from("faqs").delete().eq("id", item.id);
    reload();
  }
  async function toggle(item) {
    await supabase.from("faqs").update({ is_active: !item.is_active }).eq("id", item.id);
    reload();
  }

  return (
    <>
      <button onClick={() => open("new")} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>+ 새 FAQ 추가</button>
      {items.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>등록된 FAQ가 없어요</p></Card>}
      {items.map(item => (
        <Card key={item.id} style={{ marginBottom: 8, opacity: item.is_active ? 1 : 0.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Q. {item.question}</div>
              <div style={{ fontSize: 12, color: SUB, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>A. {item.answer}</div>
              {item.category && <div style={{ fontSize: 10, color: PRIMARY, marginTop: 4 }}>#{item.category}</div>}
              <div style={{ fontSize: 10, color: SUB, marginTop: 4 }}>순서: {item.display_order} {!item.is_active && "· 비활성"}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <button onClick={() => open(item)} style={{ background: PL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: PRIMARY, fontWeight: 700 }}>수정</button>
              <button onClick={() => toggle(item)} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: SUB }}>{item.is_active ? "숨기기" : "보이기"}</button>
              <button onClick={() => del(item)} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: "#DC2626" }}>삭제</button>
            </div>
          </div>
        </Card>
      ))}

      {edit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setEdit(null); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{edit === "new" ? "새 FAQ" : "FAQ 수정"}</span>
              <button onClick={() => setEdit(null)} style={{ background: "none", border: "none", fontSize: 24, color: SUB, cursor: "pointer" }}>×</button>
            </div>
            <Inp label="질문 *" value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} placeholder="자주 묻는 질문" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>답변 *</label>
              <textarea value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} rows={5} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "vertical", lineHeight: 1.6 }} />
            </div>
            <Inp label="카테고리 (선택)" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="예: 결제, 사용법" />
            <Inp label="표시 순서" value={String(form.display_order)} onChange={e => setForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} placeholder="0" type="number" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} /> 활성화
              </label>
            </div>
            <button onClick={save} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── 후원 계좌 관리 탭 ──
function AccountsTab({ items, reload }) {
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ account_type: "은행", bank_name: "", account_number: "", account_holder: "", description: "", is_main: false, is_active: true, display_order: 0 });

  function open(item) {
    if (item === "new") setForm({ account_type: "은행", bank_name: "", account_number: "", account_holder: "", description: "", is_main: false, is_active: true, display_order: items.length + 1 });
    else setForm({ account_type: item.account_type, bank_name: item.bank_name || "", account_number: item.account_number || "", account_holder: item.account_holder || "", description: item.description || "", is_main: item.is_main, is_active: item.is_active, display_order: item.display_order });
    setEdit(item);
  }
  async function save() {
    if (!form.account_number.trim()) return alert("계좌번호 또는 링크를 입력해주세요");
    // 메인 계좌로 설정 시 다른 메인 해제
    if (form.is_main) {
      await supabase.from("donation_accounts").update({ is_main: false }).neq("id", edit === "new" ? 0 : edit.id);
    }
    let result;
    if (edit === "new") {
      result = await supabase.from("donation_accounts").insert([form]).select();
    } else {
      result = await supabase.from("donation_accounts").update(form).eq("id", edit.id).select();
    }
    if (result.error) {
      alert("저장 실패: " + result.error.message);
      return;
    }
    setEdit(null); reload();
  }
  async function del(item) {
    if (!window.confirm("이 계좌를 삭제할까요?")) return;
    await supabase.from("donation_accounts").delete().eq("id", item.id);
    reload();
  }
  async function toggle(item) {
    await supabase.from("donation_accounts").update({ is_active: !item.is_active }).eq("id", item.id);
    reload();
  }

  const ACC_TYPES = ["은행", "카카오페이증권", "토스", "기타"];

  return (
    <>
      <button onClick={() => open("new")} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>+ 새 후원 계좌</button>
      {items.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>등록된 후원 계좌가 없어요</p></Card>}
      {items.map(item => (
        <Card key={item.id} style={{ marginBottom: 8, opacity: item.is_active ? 1 : 0.5, border: item.is_main ? `2px solid ${PRIMARY}` : `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                {item.is_main && "⭐ "}{item.account_type}
                {item.bank_name && ` · ${item.bank_name}`}
              </div>
              <div style={{ fontSize: 13, color: TEXT, fontFamily: "monospace", marginBottom: 4 }}>{item.account_number}</div>
              {item.account_holder && <div style={{ fontSize: 12, color: SUB }}>예금주: {item.account_holder}</div>}
              {item.description && <div style={{ fontSize: 11, color: SUB, marginTop: 4 }}>{item.description}</div>}
              {!item.is_active && <div style={{ fontSize: 10, color: SUB, marginTop: 4 }}>· 비활성</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <button onClick={() => open(item)} style={{ background: PL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: PRIMARY, fontWeight: 700 }}>수정</button>
              <button onClick={() => toggle(item)} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: SUB }}>{item.is_active ? "숨기기" : "보이기"}</button>
              <button onClick={() => del(item)} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: "#DC2626" }}>삭제</button>
            </div>
          </div>
        </Card>
      ))}

      {edit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setEdit(null); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{edit === "new" ? "새 후원 계좌" : "후원 계좌 수정"}</span>
              <button onClick={() => setEdit(null)} style={{ background: "none", border: "none", fontSize: 24, color: SUB, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>유형</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ACC_TYPES.map(t => (
                  <button key={t} onClick={() => setForm(p => ({ ...p, account_type: t }))} style={{ border: `2px solid ${form.account_type === t ? PRIMARY : BORDER}`, borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", background: form.account_type === t ? PL : "#fff", color: form.account_type === t ? PRIMARY : SUB }}>{t}</button>
                ))}
              </div>
            </div>
            {form.account_type === "은행" && (
              <Inp label="은행명" value={form.bank_name} onChange={e => setForm(p => ({ ...p, bank_name: e.target.value }))} placeholder="국민은행" />
            )}
            <Inp label={form.account_type === "은행" ? "계좌번호 *" : "송금 링크 또는 ID *"} value={form.account_number} onChange={e => setForm(p => ({ ...p, account_number: e.target.value }))} placeholder={form.account_type === "은행" ? "123-456-789012" : "https://qr.kakaopay.com/..."} />
            <Inp label="예금주 / 받는사람" value={form.account_holder} onChange={e => setForm(p => ({ ...p, account_holder: e.target.value }))} placeholder="홍길동" />
            <Inp label="설명 (선택)" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="예: 입금 시 닉네임 기재" />
            <Inp label="표시 순서" value={String(form.display_order)} onChange={e => setForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} type="number" />
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_main} onChange={e => setForm(p => ({ ...p, is_main: e.target.checked }))} /> ⭐ 메인 계좌
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} /> 활성화
              </label>
            </div>
            <button onClick={save} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── 고객 수정 모달 ──
function EditClientModal({ client, onClose, onSave }) {
  const [form, setForm] = useState({
    name: client.name || "", phone: client.phone || "", address: client.address || "",
    work_date: client.work_date || "", budget: String(client.budget || ""), notes: client.notes || "", status: client.status || "상담중",
  });
  function save() {
    if (!form.name.trim()) return;
    onSave({ ...client, ...form, budget: parseInt(form.budget) || 0 });
  }
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "88vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>고객 정보 수정</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 8 }}>진행 상태</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["상담중", "상담완료", "시공예정", "완료", "A/S"].map(s => {
              const st = STATUS[s]; const on = form.status === s;
              return <button key={s} onClick={() => setForm(p => ({ ...p, status: s }))} style={{ border: `2px solid ${on ? st.color : BORDER}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: on ? st.bg : "#fff", color: on ? st.color : SUB }}>{s}</button>;
            })}
          </div>
        </div>
        {[{ k: "name", l: "이름 *", p: "홍길동" }, { k: "phone", l: "전화번호", p: "010-0000-0000" }, { k: "address", l: "주소", p: "시/구/동" }, { k: "work_date", l: "작업 예정일", t: "date" }, { k: "budget", l: "예산 (원)", p: "500000", t: "number" }, { k: "notes", l: "메모", p: "작업 내용" }].map(f => (
          <Inp key={f.k} label={f.l} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p} type={f.t || "text"} />
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 13, padding: 14, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>취소</button>
          <button onClick={save} style={{ flex: 2, background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
        </div>
      </div>
    </div>
  );
}

// ── 홈 ──
function HomeScreen({ clients, setScreen, user, onLogout, userId, onSelectClient }) {
  const ds = new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "long" });
  const today = new Date().toISOString().split("T")[0];
  const actions = [["👤", "고객 관리", "clients"], ["📋", "견적 작성", "estimate"], ["🎨", "벽지 DB", "films"], ["✨", "AI 시뮬", "ai"], ["💰", "매입/매출", "books"], ["📅", "일정", "schedule"], ["✅", "할 일", "todo"], ["📝", "메모", "memo"], ["🤝", "연합", "alliance"]];
  const [homeTodos, setHomeTodos] = useState([]);
  const [homeMemos, setHomeMemos] = useState([]);
  const [homeSchedules, setHomeSchedules] = useState([]);

  // 시공예정: 오늘 이후 날짜만 (날짜 지나면 자동 제외)
  const upList = clients.filter(c => c.status === "시공예정" && c.work_date >= today);

  useEffect(() => {
    // 할 일: 완료 안 된 것만 (done=false)
    supabase.from("todos").select("*").eq("user_id", userId).eq("done", false)
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setHomeTodos(data); });

    // 메모: 날짜가 오늘 이후이거나 날짜 없는 것만
    supabase.from("memos").select("*").eq("user_id", userId)
      .order("date", { ascending: true })
      .then(({ data }) => {
        if (data) {
          const filtered = data.filter(m => !m.date || m.date >= today);
          setHomeMemos(filtered);
        }
      });

    // 일정: 오늘 이후 일정 (날짜 지나면 자동 제외)
    supabase.from("schedules").select("*").eq("user_id", userId)
      .gte("date", today)
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .then(({ data }) => { if (data) setHomeSchedules(data); });
  }, [userId]);

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <div style={{ background: GRAD, padding: "28px 20px 36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: 0 }}>{ds}</p>
          <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setScreen("settings")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "4px 10px", color: "rgba(255,255,255,0.8)", fontSize: 11, cursor: "pointer" }}>⚙️ 설정</button>
              <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "4px 10px", color: "rgba(255,255,255,0.8)", fontSize: 11, cursor: "pointer" }}>로그아웃</button>
            </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, margin: "0 0 6px", lineHeight: 1.6, fontStyle: "italic" }}>"{getDailyQuote()}"</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, margin: "0 0 18px" }}>오늘의 한마디</p>
        <div style={{ display: "flex", gap: 10 }}>
          {[["전체 고객", clients.length], ["시공 예정", clients.filter(c => c.status === "시공예정").length], ["완료", clients.filter(c => c.status === "완료").length]].map(([l, v]) => (
            <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.18)", borderRadius: 14, padding: "13px 0", textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "18px 14px" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "0 0 10px" }}>빠른 실행</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
          {actions.map(([ic, lb, to]) => (
            <button key={lb} onClick={() => setScreen(to)} style={{ background: CARD, border: "none", borderRadius: 14, padding: "14px 8px", cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 24 }}>{ic}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>{lb}</span>
            </button>
          ))}
        </div>

        {/* 시공 예정 (오늘 이후만 표시) */}
        {upList.length > 0 && (<>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "0 0 10px" }}>🔧 시공 예정</p>
          {upList.map(c => {
            const isToday = c.work_date === today;
            return (
              <Card key={c.id} onClick={() => { if (onSelectClient) onSelectClient(c); setScreen("detail"); }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, cursor: "pointer", border: isToday ? `2px solid #EA580C` : undefined }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: isToday ? "#FFF7ED" : PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔧</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{c.name} {isToday && <span style={{ fontSize: 10, color: "#EA580C", fontWeight: 800 }}>오늘!</span>}</div>
                  <div style={{ fontSize: 11, color: SUB, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.work_date} · {c.notes}</div>
                </div>
                <Badge status={c.status} />
              </Card>
            );
          })}
        </>)}

        {/* 일정 (오늘 이후만, 날짜 지나면 자동 제외) */}
        {homeSchedules.length > 0 && (<>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "14px 0 8px" }}>📅 일정 ({homeSchedules.length})</p>
          {homeSchedules.map(s => {
            const isToday = s.date === today;
            return (
              <Card key={s.id} onClick={() => setScreen("schedule")} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, padding: 10, cursor: "pointer", border: isToday ? `2px solid ${PRIMARY}` : undefined }}>
                <div style={{ flexShrink: 0, textAlign: "center", minWidth: 36 }}>
                  <div style={{ fontSize: 10, color: isToday ? PRIMARY : SUB, fontWeight: 700 }}>{isToday ? "오늘" : s.date?.slice(5)}</div>
                  {s.time && <div style={{ fontSize: 11, color: TEXT, fontWeight: 700 }}>{s.time.slice(0,5)}</div>}
                </div>
                <div style={{ width: 1, height: 30, background: BORDER, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: TEXT, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</span>
              </Card>
            );
          })}
        </>)}

        {/* 할 일: 미완료만 (완료 시 자동으로 사라짐) */}
        {homeTodos.length > 0 && (<>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "14px 0 8px" }}>✅ 할 일 ({homeTodos.length})</p>
          {homeTodos.map(t => (
            <Card key={t.id} onClick={() => setScreen("todo")} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, padding: 10, cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${BORDER}`, background: "transparent", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: TEXT, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.text}</span>
              {t.date && <span style={{ fontSize: 9, color: t.date < today ? "#DC2626" : SUB, flexShrink: 0, fontWeight: t.date < today ? 700 : 400 }}>{t.date < today ? "⚠️ " : ""}{t.date}</span>}
            </Card>
          ))}
        </>)}

        {/* 메모: 날짜 있는 것은 오늘 이후만, 날짜 없는 것은 항상 표시 */}
        {homeMemos.length > 0 && (<>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: "14px 0 8px" }}>📝 메모 ({homeMemos.length})</p>
          {homeMemos.map(m => (
            <Card key={m.id} onClick={() => setScreen("memo")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, padding: 10, cursor: "pointer" }}>
              <span style={{ fontSize: 13, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{m.title}</span>
              {m.date && <span style={{ fontSize: 9, color: m.date === today ? PRIMARY : SUB, flexShrink: 0, marginLeft: 8, fontWeight: m.date === today ? 700 : 400 }}>{m.date === today ? "오늘" : m.date}</span>}
            </Card>
          ))}
        </>)}
      </div>
    </div>
  );
}

// ── 고객 관리 ──
function ClientsScreen({ clients, setClients, setScreen, onSelect, userId, isPremium }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", work_date: "", budget: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const list = clients.filter(c => (filter === "전체" || c.status === filter) && (c.name.includes(search) || (c.phone || "").includes(search) || (c.address || "").includes(search)));
  const atLimit = !isPremium && clients.length >= PREMIUM_FEATURES.maxClients;

  async function add() {
    if (!form.name.trim()) return;
    // 무료 사용자 고객 50명 제한
    if (!isPremium && clients.length >= PREMIUM_FEATURES.maxClients) {
      window.dispatchEvent(new CustomEvent("openDonateModal"));
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("clients").insert([{ ...form, budget: parseInt(form.budget) || 0, user_id: userId, status: "상담중" }]).select().single();
    if (!error && data) setClients(p => [data, ...p]);
    setShowAdd(false);
    setForm({ name: "", phone: "", address: "", work_date: "", budget: "", notes: "" });
    setLoading(false);
  }

  async function saveEdit(updated) {
    const prevStatus = clients.find(c => c.id === updated.id)?.status;
    const { data, error } = await supabase.from("clients").update({ name: updated.name, phone: updated.phone, address: updated.address, work_date: updated.work_date, budget: updated.budget, notes: updated.notes, status: updated.status }).eq("id", updated.id).select().single();
    if (!error && data) {
      setClients(p => p.map(c => c.id === data.id ? data : c));
      // 상태가 '완료'로 바뀌었으면 가계부 매출에 자동 기록 (중복 방지)
      if (data.status === "완료" && prevStatus !== "완료" && data.budget > 0) {
        const { data: existing } = await supabase.from("transactions").select("id").eq("client_id", data.id).eq("type", "sales").maybeSingle();
        if (!existing) {
          const vat = Math.round((data.budget || 0) / 11);
          const amount = (data.budget || 0) - vat;
          await supabase.from("transactions").insert([{
            user_id: userId,
            client_id: data.id,
            type: "sales",
            date: data.work_date || new Date().toISOString().split("T")[0],
            client_name: data.name,
            amount: amount,
            vat: vat,
            total: data.budget,
            memo: "시공 완료 자동 기록"
          }]);
          alert("✅ 가계부 매출에 자동 기록됐어요!\n금액: ₩" + (data.budget || 0).toLocaleString());
        }
      }
    }
    setEditClient(null);
  }

  async function del(id) {
    await supabase.from("clients").delete().eq("id", id);
    setClients(p => p.filter(c => c.id !== id));
  }

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="고객 관리" back onBack={() => setScreen("home")} right={<button onClick={() => setShowAdd(true)} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "8px 13px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ 추가</button>} />
      <div style={{ background: "#fff", padding: "10px 14px 12px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ background: BG, borderRadius: 11, padding: "9px 13px", display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="이름, 전화번호, 주소 검색" style={{ border: "none", background: "none", flex: 1, fontSize: 14, outline: "none", color: TEXT }} />
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto" }}>
          {["전체", "상담중", "상담완료", "시공예정", "완료", "A/S"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ border: "none", borderRadius: 20, padding: "5px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: filter === f ? PRIMARY : BG, color: filter === f ? "#fff" : SUB }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {list.length === 0 && <Card><p style={{ color: SUB, textAlign: "center", fontSize: 13, margin: 0 }}>고객이 없습니다</p></Card>}
        {list.map(c => (
          <Card key={c.id} onClick={() => { onSelect(c); setScreen("detail"); }} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{c.name}</span>
              <Badge status={c.status} />
            </div>
            <div style={{ fontSize: 12, color: SUB, marginBottom: 3 }}>📞 {c.phone}</div>
            <div style={{ fontSize: 12, color: SUB, marginBottom: 8 }}>📍 {c.address}</div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${BORDER}`, alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 12, color: SUB }}>📅 {c.work_date || "미정"}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, marginLeft: 10 }}>₩{(c.budget || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={e => { e.stopPropagation(); setEditClient(c); }} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "5px 11px", background: "#fff", cursor: "pointer", fontSize: 12, color: TEXT, fontWeight: 600 }}>수정</button>
                <button onClick={e => { e.stopPropagation(); del(c.id); }} style={{ border: "1px solid #FECACA", borderRadius: 8, padding: "5px 11px", background: "#FEF2F2", cursor: "pointer", fontSize: 12, color: "#DC2626", fontWeight: 600 }}>삭제</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 430, maxHeight: "82vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>새 고객 등록</span>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            {[{ k: "name", l: "이름 *", p: "홍길동" }, { k: "phone", l: "전화번호", p: "010-0000-0000" }, { k: "address", l: "주소", p: "시/구/동" }, { k: "work_date", l: "작업 예정일", t: "date" }, { k: "budget", l: "예산(원)", p: "500000" }, { k: "notes", l: "메모", p: "작업 내용" }].map(f => (
              <Inp key={f.k} label={f.l} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p} type={f.t || "text"} />
            ))}
            <button onClick={add} disabled={loading} style={{ width: "100%", background: loading ? BORDER : PRIMARY, color: loading ? SUB : "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>{loading ? "저장 중..." : "등록하기"}</button>
          </div>
        </div>
      )}
      {editClient && <EditClientModal key={editClient.id} client={editClient} onClose={() => setEditClient(null)} onSave={saveEdit} />}
    </div>
  );
}

// ── 고객 상세 ──
function DetailScreen({ client, setScreen, userId, setClients, isPremium }) {
  const [estimate, setEstimate] = useState(null);
  const [asRecords, setAsRecords] = useState([]);
  const [showAddAS, setShowAddAS] = useState(false);
  const [asForm, setAsForm] = useState({ date: new Date().toISOString().split("T")[0], title: "", notes: "", cost: "", photos: [] });
  const [savingAS, setSavingAS] = useState(false);
  const [viewPhoto, setViewPhotoRaw] = useState(null);
  // 사진 뷰어 열고닫을 때 App에 알림 + history 푸시
  const setViewPhoto = (v) => {
    setViewPhotoRaw(v);
    
    if (v) window.history.pushState({ app: "filmpro" }, "", "");
  };

  const [showEditClient, setShowEditClient] = useState(false);
  // 시공 사진 갤러리 (프리미엄 전용)
  const [clientPhotos, setClientPhotos] = useState([]);
  const [uploadingClientPhoto, setUploadingClientPhoto] = useState(false);
  const [photoFilter, setPhotoFilter] = useState("전체");
  const clientPhotoInputRef = useRef();

  async function handleEditSave(updated) {
    const prevStatus = client.status;
    const { data, error } = await supabase.from("clients").update(updated).eq("id", client.id).select().single();
    if (!error && data) {
      if (setClients) setClients(p => p.map(c => c.id === data.id ? data : c));
      // 상태가 '완료'로 바뀌었으면 가계부 매출에 자동 기록
      if (data.status === "완료" && prevStatus !== "완료" && data.budget > 0) {
        const { data: existing } = await supabase.from("transactions").select("id").eq("client_id", data.id).eq("type", "sales").maybeSingle();
        if (!existing) {
          const vat = Math.round((data.budget || 0) / 11);
          const amount = (data.budget || 0) - vat;
          await supabase.from("transactions").insert([{
            user_id: userId,
            client_id: data.id,
            type: "sales",
            date: data.work_date || new Date().toISOString().split("T")[0],
            client_name: data.name,
            amount: amount,
            vat: vat,
            total: data.budget,
            memo: "시공 완료 자동 기록"
          }]);
          alert("✅ 가계부 매출에 자동 기록됐어요!");
        }
      }
      setShowEditClient(false);
    } else {
      alert("저장 실패: " + (error && error.message));
    }
  }

  useEffect(() => {
    if (!client) return;
    // 견적 불러오기
    supabase.from("estimates").select("*").eq("client_id", client.id).maybeSingle().then(({ data }) => {
      if (data) setEstimate(data);
    });
    // A/S 기록 불러오기 (후원자만)
    if (isPremium) {
      supabase.from("as_records").select("*").eq("client_id", client.id).order("date", { ascending: false }).then(({ data }) => {
        setAsRecords(data || []);
      });
    }

  }, [client]);

  // 사진 정렬: 시공전 → 시공후 → 기타, 같은 그룹 내에선 먼저 찍은 게 위
  const sortPhotos = (photos) => {
    const order = { "시공전": 0, "시공후": 1, "기타": 2 };
    return [...photos].sort((a, b) => {
      const ao = order[a.photo_type] ?? 3;
      const bo = order[b.photo_type] ?? 3;
      if (ao !== bo) return ao - bo;
      return new Date(a.created_at) - new Date(b.created_at);
    });
  };

  // 시공 사진 로드 (프리미엄만)
  useEffect(() => {
    if (!client || !isPremium) return;
    supabase.from("client_photos").select("*").eq("client_id", client.id).then(({ data }) => {
      if (data) setClientPhotos(sortPhotos(data));
    });
  }, [client, isPremium]);

  async function handleClientPhotoUpload(e, photoType) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingClientPhoto(true);
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(file.name + " 파일이 10MB를 초과해요.");
        continue;
      }
      try {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const rand = Math.random().toString(36).slice(2, 8);
        const path = `${userId}/${client.id}/${Date.now()}_${rand}.${ext}`;
        const contentType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;
        const { error: upErr } = await supabase.storage.from("photos").upload(path, file, {
          contentType,
          upsert: false
        });
        if (upErr) {
          alert("업로드 실패: " + upErr.message + "\n\n* Supabase에 photos 버킷이 생성되어 있는지 확인해주세요.");
          continue;
        }
        const { data: urlData } = supabase.storage.from("photos").getPublicUrl(path);
        // DB에 저장
        const { data, error: dbErr } = await supabase.from("client_photos").insert([{
          client_id: client.id,
          user_id: userId,
          photo_url: urlData.publicUrl,
          photo_type: photoType,
          storage_path: path,
          memo: ""
        }]).select().single();
        if (dbErr) {
          alert("DB 저장 실패: " + dbErr.message);
          continue;
        }
        if (data) setClientPhotos(p => sortPhotos([...p, data]));
      } catch (err) {
        alert("업로드 오류: " + err.message);
      }
    }
    setUploadingClientPhoto(false);
    if (e.target) e.target.value = "";
  }

  async function deleteClientPhoto(photo) {
    if (!window.confirm("이 사진을 삭제할까요?")) return;
    // Storage에서 삭제
    if (photo.storage_path) {
      await supabase.storage.from("photos").remove([photo.storage_path]);
    }
    // DB에서 삭제
    await supabase.from("client_photos").delete().eq("id", photo.id);
    setClientPhotos(p => p.filter(ph => ph.id !== photo.id));
  }

  const filteredPhotos = photoFilter === "전체" ? clientPhotos : clientPhotos.filter(p => p.photo_type === photoFilter);

  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  async function handleASPhotoUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingPhoto(true);
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(file.name + " 파일이 10MB를 초과해요.");
        continue;
      }
      try {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const rand = Math.random().toString(36).slice(2, 8);
        const path = `${userId}/${client.id}/${Date.now()}_${rand}.${ext}`;
        const contentType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;
        const { error } = await supabase.storage.from("as-photos").upload(path, file, {
          contentType,
          upsert: false
        });
        if (error) {
          alert("A/S 사진 업로드 실패:\n" + error.message + "\n\n* as-photos 버킷이 생성되어 있고\n  업로드 정책(RLS)이 설정되어 있는지 확인해주세요.");
          continue;
        }
        const { data: urlData } = supabase.storage.from("as-photos").getPublicUrl(path);
        setAsForm(p => ({ ...p, photos: [...p.photos, urlData.publicUrl] }));
      } catch (err) {
        alert("업로드 오류: " + err.message);
      }
    }
    setUploadingPhoto(false);
    e.target.value = "";
  }

  function removeASPhoto(idx) {
    const url = asForm.photos[idx];
    // Storage 파일도 삭제 시도 (URL에서 path 추출)
    try {
      const match = url && url.match(/\/as-photos\/(.+)$/);
      if (match) supabase.storage.from("as-photos").remove([match[1]]);
    } catch {}
    setAsForm(p => ({ ...p, photos: p.photos.filter((_, i) => i !== idx) }));
  }

  async function saveASRecord() {
    if (!asForm.title.trim()) { alert("제목을 입력해주세요."); return; }
    setSavingAS(true);
    const payload = {
      user_id: userId,
      client_id: client.id,
      date: asForm.date,
      title: asForm.title,
      notes: asForm.notes,
      cost: parseInt(asForm.cost) || 0,
      photos: asForm.photos
    };
    const { data, error } = await supabase.from("as_records").insert([payload]).select().single();
    if (!error && data) {
      setAsRecords(p => [data, ...p]);
      // 고객 상태도 A/S로 자동 변경
      if (client.status === "완료") {
        await supabase.from("clients").update({ status: "A/S" }).eq("id", client.id);
      }
      setShowAddAS(false);
      setAsForm({ date: new Date().toISOString().split("T")[0], title: "", notes: "", cost: "", photos: [] });
      alert("✅ A/S 기록 저장됨");
    } else {
      alert("저장 실패: " + (error && error.message));
    }
    setSavingAS(false);
  }

  async function deleteASRecord(id) {
    if (!window.confirm("이 A/S 기록을 삭제할까요?\n첨부 사진도 함께 삭제됩니다.")) return;
    const record = asRecords.find(r => r.id === id);
    // Storage에서 사진 파일들 삭제
    if (record && record.photos && record.photos.length > 0) {
      const paths = record.photos
        .map(url => { const m = url && typeof url === "string" && url.match(/\/as-photos\/(.+)$/); return m ? m[1] : null; })
        .filter(Boolean);
      if (paths.length > 0) {
        try { await supabase.storage.from("as-photos").remove(paths); } catch(e) { console.warn("사진 삭제 실패", e); }
      }
    }
    await supabase.from("as_records").delete().eq("id", id);
    setAsRecords(p => p.filter(r => r.id !== id));
  }

  if (!client) return null;
  const isASEligible = client.status === "완료" || client.status === "A/S";
  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title={client.name} back onBack={() => setScreen("clients")} right={<button onClick={() => setShowEditClient(true)} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "6px 12px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✏️ 수정</button>} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><Badge status={client.status} /><span style={{ fontSize: 20, fontWeight: 800, color: PRIMARY }}>₩{(client.budget || 0).toLocaleString()}</span></div>
          <div style={{ fontSize: 14, color: TEXT, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            📞 {client.phone}
            {client.phone && <a href={`tel:${client.phone}`} style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>전화</a>}
            {client.phone && <a href={`sms:${client.phone}`} style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>문자</a>}
          </div>
          <div style={{ fontSize: 14, color: TEXT, marginBottom: 8 }}>📍 {client.address}</div>
          <div style={{ fontSize: 14, color: TEXT }}>📅 {client.work_date || "미정"}</div>
        </Card>
        <Card><p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 8px", color: SUB }}>📝 메모</p><p style={{ fontSize: 14, color: TEXT, margin: 0, lineHeight: 1.6 }}>{client.notes || "메모 없음"}</p></Card>

        {/* 시공 내역 (견적 데이터) */}
        {estimate && estimate.items && estimate.items.length > 0 && (
          <Card>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: SUB }}>🔧 시공 내역</p>
            {estimate.items.filter(it => it.memo || (it.w && it.h)).map((it, i) => {
              const w = parseFloat(it.w) || 0, h = parseFloat(it.h) || 0;
              const area = (w * h) / 1000000;
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < estimate.items.length - 1 ? `1px solid ${BORDER}` : "none", fontSize: 12 }}>
                  <span style={{ fontWeight: 600, color: TEXT, flex: 2 }}>{it.memo || `항목 ${i+1}`}</span>
                  <span style={{ color: SUB, flex: 1, textAlign: "center" }}>{area > 0 ? area.toFixed(2) + "㎡" : ""}</span>
                  <span style={{ color: SUB, flex: 1, textAlign: "right", fontSize: 11 }}>{it.film && it.film.code ? it.film.brand + " " + it.film.code : ""}</span>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `2px solid ${BORDER}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>총 견적금액</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: PRIMARY }}>₩{(estimate.total || 0).toLocaleString()}</span>
            </div>
          </Card>
        )}

        {/* 📸 시공 사진 갤러리 (프리미엄 전용) */}
        {!isPremium && (
          <Card onClick={() => window.dispatchEvent(new CustomEvent("openDonateModal"))} style={{ textAlign: "center", padding: "16px 14px", background: "#EFF6FF", border: "1px solid #93C5FD", cursor: "pointer" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🔒</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E40AF", marginBottom: 4 }}>시공 전/후 사진은 후원자 전용이에요</div>
            <div style={{ fontSize: 11, color: "#3B82F6" }}>탭해서 후원하기 →</div>
          </Card>
        )}
        {isPremium && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: SUB }}>📸 시공 사진 ({clientPhotos.length}장)</p>
              <div style={{ display: "flex", gap: 6 }}>
                <button disabled={uploadingClientPhoto} onClick={() => { clientPhotoInputRef.current?.setAttribute("data-type", "시공전"); clientPhotoInputRef.current?.click(); }} style={{ background: "#FEF3C7", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#92400E", fontWeight: 700, cursor: uploadingClientPhoto ? "wait" : "pointer" }}>+ 시공 전</button>
                <button disabled={uploadingClientPhoto} onClick={() => { clientPhotoInputRef.current?.setAttribute("data-type", "시공후"); clientPhotoInputRef.current?.click(); }} style={{ background: "#DCFCE7", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#15803D", fontWeight: 700, cursor: uploadingClientPhoto ? "wait" : "pointer" }}>+ 시공 후</button>
              </div>
            </div>
            <input
              ref={clientPhotoInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={e => handleClientPhotoUpload(e, e.target.getAttribute("data-type") || "시공후")}
              style={{ display: "none" }}
            />
            {uploadingClientPhoto && <div style={{ textAlign: "center", padding: 10, fontSize: 12, color: PRIMARY }}>📤 업로드 중...</div>}

            {/* 필터 */}
            {clientPhotos.length > 0 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {["전체", "시공전", "시공후", "기타"].map(t => (
                  <button key={t} onClick={() => setPhotoFilter(t)} style={{ border: "none", borderRadius: 14, padding: "4px 10px", fontSize: 11, cursor: "pointer", background: photoFilter === t ? PRIMARY : BG, color: photoFilter === t ? "#fff" : SUB, fontWeight: 600 }}>{t}{t !== "전체" ? ` ${clientPhotos.filter(p => p.photo_type === t).length}` : ""}</button>
                ))}
              </div>
            )}

            {/* 사진 그리드 */}
            {filteredPhotos.length === 0 ? (
              <div style={{ textAlign: "center", padding: 20, color: SUB, fontSize: 12 }}>
                {clientPhotos.length === 0 ? "📷 첨부된 사진이 없어요" : "이 카테고리에 사진이 없어요"}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {filteredPhotos.map(photo => (
                  <div key={photo.id} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${BORDER}` }}>
                    <img src={photo.photo_url} alt={photo.photo_type} onClick={() => setViewPhoto(photo.photo_url)} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} />
                    <div style={{ position: "absolute", top: 4, left: 4, background: photo.photo_type === "시공전" ? "#FEF3C7" : photo.photo_type === "시공후" ? "#DCFCE7" : "#E5E7EB", color: photo.photo_type === "시공전" ? "#92400E" : photo.photo_type === "시공후" ? "#15803D" : "#4B5563", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>{photo.photo_type}</div>
                    <button onClick={() => deleteClientPhoto(photo)} style={{ position: "absolute", top: 4, right: 4, background: "rgba(220,38,38,0.9)", border: "none", borderRadius: "50%", width: 20, height: 20, color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* A/S 기록 섹션 — 완료 또는 A/S 상태, 그리고 후원자만 */}
        {isASEligible && !isPremium && (
          <Card onClick={() => window.dispatchEvent(new CustomEvent("openDonateModal"))} style={{ textAlign: "center", padding: "16px 14px", background: "#FFF7ED", border: "1px solid #FB923C", cursor: "pointer" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🔒</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9A3412", marginBottom: 4 }}>A/S 기록은 후원자 전용이에요</div>
            <div style={{ fontSize: 11, color: "#C2410C" }}>탭해서 후원하기 →</div>
          </Card>
        )}
        {isASEligible && isPremium && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: SUB }}>🛠️ A/S 기록 ({asRecords.length}건)</p>
              <button onClick={() => setShowAddAS(true)} style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>+ A/S 추가</button>
            </div>
            {asRecords.length === 0 && <p style={{ fontSize: 12, color: SUB, textAlign: "center", padding: "12px 0", margin: 0 }}>A/S 기록 없음</p>}
            {asRecords.map(r => (
              <div key={r.id} style={{ padding: 10, background: "#FEF2F2", borderRadius: 10, marginBottom: 8, border: "1px solid #FECACA" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#991B1B" }}>{r.title}</span>
                  <button onClick={() => deleteASRecord(r.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626", fontSize: 11 }}>삭제</button>
                </div>
                <div style={{ fontSize: 11, color: SUB, marginBottom: 6 }}>📅 {r.date}{r.cost ? ` · 💰 ₩${r.cost.toLocaleString()}` : ""}</div>
                {r.notes && <div style={{ fontSize: 12, color: TEXT, marginBottom: 6, lineHeight: 1.5 }}>{r.notes}</div>}
                {r.photos && r.photos.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {r.photos.map((p, i) => (
                      <img key={i} src={p} onClick={() => setViewPhoto(p)} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid #FCA5A5", cursor: "pointer" }} alt="" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Card>
        )}

        <button onClick={() => setScreen("estimate")} style={{ background: PL, color: PRIMARY, border: `1.5px solid ${PRIMARY}`, borderRadius: 14, padding: 15, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>📋 견적 추가</button>
      </div>

      {/* A/S 추가 모달 */}
      {showAddAS && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowAddAS(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>🛠️ A/S 기록 추가</span>
              <button onClick={() => setShowAddAS(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <Inp label="날짜" value={asForm.date} onChange={e => setAsForm(p => ({ ...p, date: e.target.value }))} type="date" />
            <Inp label="제목 *" value={asForm.title} onChange={e => setAsForm(p => ({ ...p, title: e.target.value }))} placeholder="예: 벽지 들뜸 보수" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>상세 내용</label>
              <textarea value={asForm.notes} onChange={e => setAsForm(p => ({ ...p, notes: e.target.value }))} placeholder="A/S 내용 상세 기록..." rows={3} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", color: TEXT, resize: "vertical", fontFamily: "inherit" }} />
            </div>
            <Inp label="추가 비용 (선택)" value={asForm.cost} onChange={e => setAsForm(p => ({ ...p, cost: e.target.value }))} placeholder="50000" type="number" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>사진 첨부 ({asForm.photos.length}장)</label>
              {asForm.photos.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  {asForm.photos.map((p, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img src={p} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: `1px solid ${BORDER}` }} alt="" />
                      <button onClick={() => removeASPhoto(i)} style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#DC2626", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <label style={{ display: "block", background: uploadingPhoto ? "#FEF3C7" : "#F3F4F6", border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "12px", textAlign: "center", cursor: uploadingPhoto ? "wait" : "pointer", fontSize: 12, color: SUB }}>
                {uploadingPhoto ? "⏳ 업로드 중..." : "📷 사진 선택 (여러 장 가능, 10MB 이하)"}
                <input type="file" accept="image/*" multiple onChange={handleASPhotoUpload} style={{ display: "none" }} disabled={uploadingPhoto} />
              </label>
            </div>
            <button onClick={saveASRecord} disabled={savingAS} style={{ width: "100%", background: savingAS ? BORDER : "#DC2626", color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: savingAS ? "not-allowed" : "pointer" }}>{savingAS ? "저장 중..." : "A/S 기록 저장"}</button>
          </div>
        </div>
      )}

      {/* 사진 크게 보기 */}
      {viewPhoto && (
        <div onClick={() => setViewPhoto(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer" }}>
          <img src={viewPhoto} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} alt="" />
        </div>
      )}

      {/* 고객 정보 수정 */}
      {showEditClient && <EditClientModal client={client} onClose={() => setShowEditClient(false)} onSave={handleEditSave} />}
    </div>
  );
}

// ── 벽지 DB ──
function FilmsScreen({ setScreen, userId, isPremium, filmsCache, filmsLoaded }) {
  const [brand, setBrand] = useState("LX하우시스");
  const [cat, setCat] = useState("전체");
  const [subCat, setSubCat] = useState("전체");
  const [showCatPopup, setShowCatPopup] = useState(false);
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [zoomFilm, setZoomFilm] = useState(null);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [customFilms, setCustomFilms] = useState([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customForm, setCustomForm] = useState({ code: "", name: "", cat: "실크벽지", color: "#D8CBB8", memo: "", photo: null });
  const [dbFilms, setDbFilms] = useState([]);
  const fileRef = useRef();
  const BRANDS = ["즐겨찾기", "LX하우시스", "개나리벽지", "신한벽지", "디아이디", "현대L&C", "Custom"];

  useEffect(() => {
    if (!filmsLoaded || !filmsCache) return;
    const all = filmsCache.map(f => ({ id: f.id, code: f.code, name: f.name, color: f.color || "#D0CBC4", cat: f.category, sub_cat: (f.sub_category && f.sub_category !== "_") ? f.sub_category : null, brand: f.brand, isNew: f.is_new, img_url: f.img_url, memo: f.memo, user_id: f.user_id }));
    setDbFilms(all.filter(f => f.brand !== "Custom"));
    setCustomFilms(all.filter(f => f.brand === "Custom" && (!userId || f.user_id === userId || !f.user_id)));
  }, [filmsCache, filmsLoaded, userId]);

  const allFilms = [...FILMS, ...dbFilms];
  const usage = getFilmUsage();
  const favFilms = allFilms.filter(f => {
    const key = f.brand + ":" + f.code;
    return (usage[key] || 0) >= 5;
  }).concat(customFilms.filter(f => {
    const key = (f.brand || "Custom") + ":" + f.code;
    return (usage[key] || 0) >= 5;
  }));

  const bf = brand === "즐겨찾기" ? favFilms : brand === "Custom" ? customFilms : allFilms.filter(f => f.brand === brand);
  const cats = ["전체", ...Array.from(new Set(bf.map(f => f.cat)))];
  // 현재 카테고리에 속한 sub_category 목록
  const subCats = cat === "전체" ? [] : Array.from(new Set(bf.filter(f => f.cat === cat && f.sub_cat).map(f => f.sub_cat)));
  const hasSubCats = subCats.length > 0;
  const SAMPLE_LIMIT = 5;
  // 무료: 텍스처 벽지 숨김 (is_texture=true 제외), 프리미엄: 전체 표시
  const visibleBf = (!isPremium && PREMIUM_FEATURES.textureFilms)
    ? bf.filter(f => !f.is_texture)
    : bf;
  const fullList = visibleBf.filter(f => (cat === "전체" || f.cat === cat) && (!hasSubCats || !subCat || f.sub_cat === subCat) && (!search || f.code.toLowerCase().includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase())));
  const list = fullList;
  const isLimited = false; // 개수 제한 제거
  // 카테고리 바뀌면 첫 번째 sub_category 자동 선택
  useEffect(() => {
    if (subCats.length > 0 && !subCats.includes(subCat)) setSubCat(subCats[0]);
  }, [cat, brand, dbFilms.length]);
  const [uploadingFilmPhoto, setUploadingFilmPhoto] = useState(false);
  const [savingCustom, setSavingCustom] = useState(false);

  async function handlePhoto(e) {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert("5MB 이하 사진만 가능해요."); return; }
    setUploadingFilmPhoto(true);
    try {
      const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
      const rand = Math.random().toString(36).slice(2, 8);
      const path = `${userId || "anon"}/${Date.now()}_${rand}.${ext}`;
      const { error } = await supabase.storage.from("film-photos").upload(path, f, { contentType: f.type });
      if (error) { alert("업로드 실패: " + error.message + "\n\nfilm-photos 버킷이 생성되어 있는지 확인해주세요."); setUploadingFilmPhoto(false); return; }
      const { data: urlData } = supabase.storage.from("film-photos").getPublicUrl(path);
      setCustomForm(p => ({ ...p, photo: urlData.publicUrl }));
    } catch(err) {
      alert("오류: " + err.message);
    }
    setUploadingFilmPhoto(false);
    e.target.value = "";
  }

  async function addCustom() {
    if (!customForm.name.trim()) { alert("이름을 입력해주세요."); return; }
    setSavingCustom(true);
    const payload = {
      brand: "Custom",
      category: customForm.cat || "기타",
      code: customForm.code || `MY-${Date.now().toString(36).slice(-5).toUpperCase()}`,
      name: customForm.name,
      color: customForm.color,
      memo: customForm.memo,
      img_url: customForm.photo,
      user_id: userId
    };
    const { data, error } = await supabase.from("wallpapers").insert([payload]).select().single();
    if (error) {
      alert("저장 실패: " + error.message + "\n\n* films 테이블 권한이 없을 수 있어요.\n새 SQL(films_vendors_setup.sql)을 Supabase에서 실행해주세요.");
      setSavingCustom(false);
      return;
    }
    if (data) {
      setCustomFilms(p => [...p, { id: data.id, code: data.code, name: data.name, color: data.color, cat: data.category, brand: "Custom", img_url: data.img_url, memo: data.memo }]);
    }
    setShowAddCustom(false);
    setCustomForm({ code: "", name: "", cat: "실크벽지", color: "#D8CBB8", memo: "", photo: null });
    setSavingCustom(false);
  }

  async function deleteCustomFilm(f) {
    if (!window.confirm(`'${f.name}' 벽지를 삭제할까요?`)) return;
    // 사진 파일도 삭제
    if (f.img_url) {
      const m = f.img_url.match(/\/film-photos\/(.+)$/);
      if (m) { try { await supabase.storage.from("film-photos").remove([m[1]]); } catch{} }
    }
    await supabase.from("wallpapers").delete().eq("id", f.id);
    setCustomFilms(p => p.filter(x => x.id !== f.id));
  }
  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="벽지 DB" back onBack={() => setScreen("home")} />
      <div style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "10px 14px", position: "relative" }}>
        <button onClick={() => setShowBrandPopup(!showBrandPopup)} style={{ width: "100%", border: `1.5px solid ${BRAND_COLORS[brand] || BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", background: PL, color: BRAND_COLORS[brand] || TEXT, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{brand}</span>
          <span style={{ fontSize: 11 }}>{showBrandPopup ? "▲" : "▼"}</span>
        </button>
        {showBrandPopup && (
          <div style={{ position: "absolute", top: "calc(100% - 2px)", left: 14, right: 14, background: CARD, border: `1.5px solid ${PRIMARY}`, borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, maxHeight: 320, overflowY: "auto" }}>
            {BRANDS.map(b => (
              <button key={b} onClick={() => { setBrand(b); setCat("전체"); setSubCat("전체"); setSel(null); setShowCatPopup(false); setShowBrandPopup(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 14px", fontSize: 13, fontWeight: brand === b ? 700 : 500, cursor: "pointer", background: brand === b ? PL : "transparent", color: brand === b ? BRAND_COLORS[b] : TEXT, border: "none", borderBottom: `1px solid ${BORDER}` }}>{b}</button>
            ))}
          </div>
        )}
      </div>
      {showBrandPopup && <div onClick={() => setShowBrandPopup(false)} style={{ position: "fixed", inset: 0, zIndex: 90 }} />}
      {brand !== "Custom" ? (
        <>
          {brand === "즐겨찾기" && favFilms.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⭐</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8 }}>즐겨찾기가 비어있어요</div>
              <div style={{ fontSize: 12, color: SUB, lineHeight: 1.6 }}>견적 작성이나 AI 시뮬레이션에서<br/>벽지를 <b>5회 이상 선택</b>하면<br/>자동으로 즐겨찾기에 등록돼요!</div>
            </div>
          ) : (
          <>
          <div style={{ background: "#fff", padding: "10px 14px 12px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button onClick={() => setShowCatPopup(!showCatPopup)} style={{ border: `1.5px solid ${cat === "전체" ? BORDER : PRIMARY}`, borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: cat === "전체" ? CARD : PL, color: cat === "전체" ? SUB : PRIMARY, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>{cat === "전체" ? "전체" : cat}<span style={{ fontSize: 10 }}>{showCatPopup ? "▲" : "▼"}</span></button>
                {showCatPopup && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: CARD, border: `1.5px solid ${PRIMARY}`, borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 110, overflow: "hidden" }}>
                    {cats.map(c => (
                      <button key={c} onClick={() => { setCat(c); setSubCat("전체"); setShowCatPopup(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", fontSize: 12, fontWeight: cat === c ? 700 : 500, cursor: "pointer", background: cat === c ? PL : "transparent", color: cat === c ? PRIMARY : TEXT, border: "none", borderBottom: `1px solid ${BORDER}` }}>{c}</button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, background: BG, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}><span>🔍</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="코드·수종 검색" style={{ border: "none", background: "none", flex: 1, fontSize: 13, outline: "none", color: TEXT }} /></div>
            </div>
            {hasSubCats && (
              <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", paddingBottom: 2 }}>
                {subCats.map(sc => (
                  <button key={sc} onClick={() => setSubCat(sc)} style={{ flexShrink: 0, border: `1.5px solid ${subCat === sc ? PRIMARY : BORDER}`, borderRadius: 16, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", background: subCat === sc ? PL : "#fff", color: subCat === sc ? PRIMARY : SUB, whiteSpace: "nowrap" }}>{sc}</button>
                ))}
              </div>
            )}
          </div>
          <div style={{ padding: "8px 14px 80px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {list.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 32, color: SUB, fontSize: 13 }}>등록된 벽지가 없습니다<br />(추후 업데이트 예정)</div>}
            {list.map(f => {
              const on = sel && sel.id === f.id;
              return (
                <button key={f.id} onClick={() => { if (zoomFilm && zoomFilm.id === f.id) { setZoomFilm(null); setSel(on ? null : f); } else { setZoomFilm(f); } }} style={{ background: CARD, border: on ? `2px solid ${PRIMARY}` : "2px solid transparent", borderRadius: 12, padding: "10px 8px", cursor: "pointer", textAlign: "center", position: "relative" }}>
                  {brand === "즐겨찾기" && <span onClick={e => { e.stopPropagation(); const data = getFilmUsage(); const key = (f.brand || "Custom") + ":" + f.code; delete data[key]; localStorage.setItem("film_usage", JSON.stringify(data)); setSel(null); window.location.reload(); }} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, cursor: "pointer" }}>×</span>}
                  <div style={{ width: "100%", paddingBottom: "70%", borderRadius: 8, background: f.img_url ? `url(${f.img_url}) center/cover no-repeat` : f.color, border: "1px solid rgba(0,0,0,0.08)", marginBottom: 6, position: "relative" }}>
                    {f.pop && <span style={{ position: "absolute", top: 4, right: 4, fontSize: 8, background: "#FEF9C3", color: "#854D0E", padding: "1px 5px", borderRadius: 8, fontWeight: 700 }}>인기</span>}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: on ? PRIMARY : TEXT }}>{f.code}</div>
                  <div style={{ fontSize: 9.5, color: SUB, marginTop: 1 }}>{f.name}</div>
                </button>
              );
            })}
                        {!isPremium && PREMIUM_FEATURES.textureFilms && (
              <div onClick={() => window.dispatchEvent(new CustomEvent("openDonateModal"))} style={{ margin: "8px 0", padding: "10px 14px", background: "#FFF7ED", borderRadius: 10, fontSize: 12, color: "#9A3412", textAlign: "center", cursor: "pointer" }}>
                🔒 텍스처 벽지은 후원자 전용이에요 · <span style={{ fontWeight: 700 }}>탭해서 후원하기 →</span>
              </div>
            )}
          </div>
          </>
          )}
        </>
      ) : (
        <div style={{ padding: "12px 14px 80px" }}>
          <button onClick={() => setShowAddCustom(true)} style={{ width: "100%", border: `2px dashed ${BORDER}`, borderRadius: 14, padding: 16, background: "#fff", cursor: "pointer", fontSize: 14, color: SUB, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>📷 + 내 벽지 등록</button>
          {customFilms.length === 0 && <div style={{ textAlign: "center", padding: 40, color: SUB, fontSize: 13 }}>아직 등록된 벽지가 없어요<br />사진을 찍어서 나만의 벽지 DB를 만들어보세요!</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {customFilms.map(f => {
              const on = sel && sel.id === f.id;
              const photoUrl = f.img_url || f.photo;
              return (
                <div key={f.id} style={{ position: "relative" }}>
                  <button onClick={() => setSel(on ? null : f)} style={{ background: CARD, border: on ? `2px solid ${PRIMARY}` : "2px solid transparent", borderRadius: 12, padding: "10px 8px", cursor: "pointer", textAlign: "center", width: "100%" }}>
                    {photoUrl ? <img src={photoUrl} alt={f.name} style={{ width: "100%", borderRadius: 8, marginBottom: 6, aspectRatio: "1", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", paddingBottom: "70%", borderRadius: 8, background: f.color, marginBottom: 6 }} />}
                    <div style={{ fontSize: 10, fontWeight: 800, color: on ? PRIMARY : TEXT }}>{f.code || f.name}</div>
                    <div style={{ fontSize: 9, color: SUB }}>{f.cat}</div>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteCustomFilm(f); }} style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: "rgba(220,38,38,0.9)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {sel && (
        <div style={{ position: "fixed", bottom: 60, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 18, padding: "14px 16px", width: "calc(100% - 28px)", maxWidth: 402, boxShadow: "0 8px 32px rgba(0,0,0,0.16)", zIndex: 50, display: "flex", gap: 14, alignItems: "center" }}>
          {sel.photo ? <img src={sel.photo} style={{ width: 54, height: 54, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} alt="" /> : <div style={{ width: 54, height: 54, borderRadius: 12, background: sel.color, flexShrink: 0 }} />}
          <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 800 }}>{sel.code || sel.name}</div><div style={{ fontSize: 12, color: SUB }}>{sel.name} · {sel.brand}</div></div>
          <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: SUB }}>×</button>
        </div>
      )}
      {showAddCustom && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowAddCustom(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>내 벽지 등록</span>
              <button onClick={() => setShowAddCustom(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>📷 사진 (선택, 5MB 이하)</label>
              <button onClick={() => fileRef.current.click()} disabled={uploadingFilmPhoto} style={{ width: "100%", border: `2px dashed ${BORDER}`, borderRadius: 12, padding: customForm.photo ? 0 : "20px 0", background: uploadingFilmPhoto ? "#FEF3C7" : BG, cursor: uploadingFilmPhoto ? "wait" : "pointer", overflow: "hidden" }}>
                {uploadingFilmPhoto ? <span style={{ fontSize: 13, color: SUB }}>⏳ 업로드 중...</span> : (customForm.photo ? <img src={customForm.photo} style={{ width: "100%", maxHeight: 160, objectFit: "cover", display: "block" }} alt="" /> : <span style={{ fontSize: 13, color: SUB }}>탭해서 사진 선택</span>)}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            </div>
            <Inp label="코드" value={customForm.code} onChange={e => setCustomForm(p => ({ ...p, code: e.target.value }))} placeholder="MY-001" />
            <Inp label="이름 *" value={customForm.name} onChange={e => setCustomForm(p => ({ ...p, name: e.target.value }))} placeholder="벽지 이름" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>카테고리</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["실크벽지", "합지벽지", "친환경벽지", "패턴", "기타"].map(c => (
                  <button key={c} onClick={() => setCustomForm(p => ({ ...p, cat: c }))} style={{ border: `2px solid ${customForm.cat === c ? PRIMARY : BORDER}`, borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", background: customForm.cat === c ? PL : "#fff", color: customForm.cat === c ? PRIMARY : SUB }}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>대표 색상</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="color" value={customForm.color} onChange={e => setCustomForm(p => ({ ...p, color: e.target.value }))} style={{ width: 48, height: 40, border: `1.5px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", padding: 2 }} />
                <span style={{ fontSize: 12, color: SUB }}>{customForm.color}</span>
              </div>
            </div>
            <Inp label="메모" value={customForm.memo} onChange={e => setCustomForm(p => ({ ...p, memo: e.target.value }))} placeholder="특징, 사용처 등" />
            <button onClick={addCustom} disabled={savingCustom || uploadingFilmPhoto} style={{ width: "100%", background: (savingCustom || uploadingFilmPhoto) ? BORDER : PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: (savingCustom || uploadingFilmPhoto) ? "not-allowed" : "pointer" }}>{savingCustom ? "저장 중..." : "등록하기"}</button>
          </div>
        </div>
      )}
      {zoomFilm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setZoomFilm(null)}>
          <div style={{ background: CARD, borderRadius: 20, padding: 20, width: "80%", maxWidth: 320, textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: "100%", paddingBottom: "100%", borderRadius: 14, background: zoomFilm.img_url ? `url(${zoomFilm.img_url}) center/cover` : zoomFilm.color, border: "1px solid rgba(0,0,0,0.08)", marginBottom: 14, position: "relative" }} />
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 4 }}>{zoomFilm.code}</div>
            <div style={{ fontSize: 14, color: SUB, marginBottom: 4 }}>{zoomFilm.name}</div>
            <div style={{ fontSize: 12, color: BORDER }}>{zoomFilm.brand} · {zoomFilm.cat}</div>
            <div style={{ fontSize: 11, color: BORDER, marginTop: 4 }}>{zoomFilm.color}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button onClick={() => { setSel(zoomFilm); setZoomFilm(null); }} style={{ flex: 1, background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✓ 선택</button>
              <button onClick={() => setZoomFilm(null)} style={{ flex: 1, background: BG, color: SUB, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 가계부 (매출/매입/부가세/세금계산서) ──
function BookkeepingScreen({ userId, setScreen, clients: appClients, isPremium }) {
  const [tab, setTab] = useState("sales");
  const [txns, setTxns] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewMonth, setViewMonth] = useState(() => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`; });
  const CATS = ["자재비", "교통비", "공구", "식비", "기타"];
  const EMPTY_TXN = { date: new Date().toISOString().split("T")[0], client_name: "", category: "자재비", amount: "", vat: "", memo: "", vat_mode: "separate" };
  const EMPTY_INV = { date: new Date().toISOString().split("T")[0], client_type: "기업", biz_number: "", biz_name: "", rep_name: "", biz_addr: "", biz_type: "", biz_item: "", items: [{ name: "", spec: "", qty: "", price: "", amount: "", vat: "" }], amount: "", vat: "", memo: "", payment_type: "영수" };
  const [form, setForm] = useState(EMPTY_TXN);
  const [invTab, setInvTab] = useState("issued");

  // 고정 거래처
  const [vendors, setVendors] = useState([]);
  const [showVendorMgr, setShowVendorMgr] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const EMPTY_VENDOR = { name: "", biz_number: "", rep_name: "", phone: "", memo: "" };
  const [vendorForm, setVendorForm] = useState(EMPTY_VENDOR);

  useEffect(() => {
    supabase.from("vendors").select("*").eq("user_id", userId).then(({ data }) => setVendors(data || []));
  }, [userId]);

  // 연합 멤버 (수취 세금계산서 선택용)
  const [allianceMembers, setAllianceMembers] = useState([]);
  useEffect(() => {
    supabase.from("alliance").select("*").eq("user_id", userId).then(({ data }) => setAllianceMembers(data || []));
  }, [userId]);

  async function addVendor() {
    if (!vendorForm.name.trim()) { alert("거래처명을 입력해주세요."); return; }
    const { data } = await supabase.from("vendors").insert([{ ...vendorForm, user_id: userId }]).select().single();
    if (data) {
      setVendors(p => [...p, data]);
      setVendorForm(EMPTY_VENDOR);
      setShowAddVendor(false);
    }
  }
  async function delVendor(id) {
    if (!window.confirm("이 거래처를 삭제할까요?")) return;
    await supabase.from("vendors").delete().eq("id", id);
    setVendors(p => p.filter(v => v.id !== id));
  }

  // 사업자 정보 & 도장
  const EMPTY_BIZ = { name: "", biz_no: "", rep: "", addr: "", biz_type: "", biz_item: "", tel: "", stamp: "" };
  const [bizInfo, setBizInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem("biz_info") || "{}"); } catch { return {}; }
  });
  const [showBizModal, setShowBizModal] = useState(false);
  const [bizForm, setBizForm] = useState(EMPTY_BIZ);

  function openBizModal() {
    setBizForm({ ...EMPTY_BIZ, ...bizInfo });
    setShowBizModal(true);
  }
  function saveBizInfo() {
    localStorage.setItem("biz_info", JSON.stringify(bizForm));
    setBizInfo(bizForm);
    setShowBizModal(false);
  }
  function handleStampUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setBizForm(p => ({ ...p, stamp: ev.target.result }));
    reader.readAsDataURL(file);
  }

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const [t, i] = await Promise.all([
      supabase.from("transactions").select("*").eq("user_id", userId).order("date", { ascending: false }),
      supabase.from("tax_invoices").select("*").eq("user_id", userId).order("date", { ascending: false })
    ]);
    setTxns(t.data || []);
    setInvoices(i.data || []);
    setLoading(false);
  }

  // 월 필터
  const monthTxns = txns.filter(t => t.date && t.date.startsWith(viewMonth));
  const sales = monthTxns.filter(t => t.type === "sales");
  const expenses = monthTxns.filter(t => t.type === "expense");
  const salesTotal = sales.reduce((s, t) => s + (t.amount || 0), 0);
  const salesVat = sales.reduce((s, t) => s + (t.vat || 0), 0);
  const expTotal = expenses.reduce((s, t) => s + (t.amount || 0), 0);
  const expVat = expenses.reduce((s, t) => s + (t.vat || 0), 0);

  function openAdd() {
    if (tab === "invoice") setForm({ ...EMPTY_INV });
    else setForm({ ...EMPTY_TXN });
    setShowAdd(true);
  }
  function openEdit(item) {
    if (tab === "invoice") setForm({ date: item.date, biz_number: item.biz_number || "", biz_name: item.biz_name || "", rep_name: item.rep_name || "", amount: String(item.amount || ""), vat: String(item.vat || ""), memo: item.memo || "" });
    else setForm({ date: item.date, client_name: item.client_name || "", category: item.category || "자재비", amount: String(item.amount || ""), vat: String(item.vat || ""), memo: item.memo || "" });
    setEditItem(item);
  }

  async function addTxn() {
    if (!form.amount) return;
    const amt = parseInt(form.amount) || 0;
    const vat = parseInt(form.vat) || 0;
    const rec = { user_id: userId, type: tab === "sales" ? "sales" : "expense", date: form.date, client_name: form.client_name, category: form.category, amount: amt, vat: vat, total: amt + vat, memo: form.memo };
    const { data, error } = await supabase.from("transactions").insert([rec]).select().single();
    if (error) { alert("저장 실패: " + error.message); return; }
    setShowAdd(false); setForm(EMPTY_TXN);
    load();
  }

  async function addInvoice() {
    if (!form.biz_name) return;
    const amt = parseInt(form.amount) || 0;
    const vat = parseInt(form.vat) || 0;
    const rec = { user_id: userId, type: invTab, date: form.date, client_type: form.client_type || "기업", biz_number: form.biz_number, biz_name: form.biz_name, rep_name: form.rep_name, biz_addr: form.biz_addr, biz_type: form.biz_type, biz_item: form.biz_item, items: form.items || [], amount: amt, vat: vat, total: amt + vat, memo: form.memo, payment_type: form.payment_type || "영수" };
    const { data, error } = await supabase.from("tax_invoices").insert([rec]).select().single();
    if (error) { alert("저장 실패: " + error.message); return; }
    setShowAdd(false); setForm(EMPTY_INV);
    load();
  }

  async function saveEdit() {
    if (tab === "invoice") {
      const amt = parseInt(form.amount) || 0;
      const vat = parseInt(form.vat) || 0;
      const { error } = await supabase.from("tax_invoices").update({ date: form.date, client_type: form.client_type || "기업", biz_number: form.biz_number, biz_name: form.biz_name, rep_name: form.rep_name, biz_addr: form.biz_addr, biz_type: form.biz_type, biz_item: form.biz_item, items: form.items || [], amount: amt, vat: vat, total: amt + vat, memo: form.memo, payment_type: form.payment_type || "영수" }).eq("id", editItem.id);
      if (error) { alert("수정 실패: " + error.message); return; }
    } else {
      const amt = parseInt(form.amount) || 0;
      const vat = parseInt(form.vat) || 0;
      const { error } = await supabase.from("transactions").update({ date: form.date, client_name: form.client_name, category: form.category, amount: amt, vat: vat, total: amt + vat, memo: form.memo }).eq("id", editItem.id);
      if (error) { alert("수정 실패: " + error.message); return; }
    }
    setEditItem(null); setForm(EMPTY_TXN);
    load();
  }

  async function delItem(item) {
    if (tab === "invoice") {
      await supabase.from("tax_invoices").delete().eq("id", item.id);
      setInvoices(p => p.filter(i => i.id !== item.id));
    } else {
      await supabase.from("transactions").delete().eq("id", item.id);
      setTxns(p => p.filter(t => t.id !== item.id));
    }
  }

  function autoVat(amt) {
    const a = parseInt(amt) || 0;
    return String(Math.round(a * 0.1));
  }

  function buildInvoiceHtml(inv, type = "recipient") {
    // type: "recipient" = 공급받는자 보관용(청색), "supplier" = 공급자 보관용(적색)
    const biz = bizInfo || {};
    const isSupplier = type === "supplier";
    const C = isSupplier ? "#c00000" : "#1a3a8f"; // 적색 / 청색
    const typeTop = isSupplier ? "공 급 자" : "공급받는자";
    const dateStr = inv.date || "";
    const [yyyy, mm, dd] = dateStr.split("-");

    // 사업자등록번호 → 개별 자리 칸 (10자리)
    const splitRegNo = (no) => {
      const d = (no || "").replace(/[^0-9]/g, "").slice(0, 10).split("");
      let cells = "";
      for (let i = 0; i < 10; i++) {
        const sep = (i === 3 || i === 5) ? `<td class="rn-sep">-</td>` : "";
        cells += sep + `<td class="rn">${d[i] || ""}</td>`;
      }
      return cells;
    };

    // 금액 → 자릿수별 칸 (오른쪽 정렬)
    const digitCells = (num, len) => {
      const s = (num || 0).toString();
      let cells = "";
      for (let i = 0; i < len; i++) {
        const pos = s.length - len + i;
        const ch = (pos >= 0 && pos < s.length) ? s.charAt(pos) : "";
        cells += `<td class="dg">${ch}</td>`;
      }
      return cells;
    };

    const supplyCells = digitCells(inv.amount, 11); // 백억~일 (11칸)
    const vatCells = digitCells(inv.vat, 10);        // 십억~일 (10칸)
    const stampImg = biz.stamp
      ? `<img src="${biz.stamp}" style="width:38px;height:38px;object-fit:contain;" />`
      : `<span style="color:${C};font-size:11px;">인</span>`;

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>세금계산서</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Malgun Gothic','맑은 고딕',sans-serif;}
body{padding:14px;background:#fff;}
.sheet{width:760px;margin:0 auto;color:${C};}
.formno{font-size:11px;margin-bottom:2px;color:${C};font-weight:600;}
table{border-collapse:collapse;width:100%;}
td,th{border:1px solid ${C};text-align:center;font-size:11px;padding:1px 2px;color:${C};}
.title{font-size:22px;font-weight:900;letter-spacing:4px;color:${C};white-space:nowrap;}
.type-cell{font-size:13px;font-weight:800;line-height:1.4;color:${C};}
.lbl{font-weight:700;background:#fff;color:${C};font-size:10.5px;white-space:nowrap;}
.vlbl{width:18px;font-weight:800;font-size:11px;color:${C};}
.rn{width:15px;height:20px;font-size:12px;}
.rn-sep{width:7px;border:none;}
.dg{width:15px;height:20px;font-size:11px;}
.val{text-align:left;padding-left:6px;font-size:11px;}
.amt{text-align:right;padding-right:5px;font-size:11px;}
.no-print{background:#333;color:#fff;padding:9px 14px;border-radius:8px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;}
.no-print button{border:none;border-radius:6px;padding:8px 14px;font-weight:700;cursor:pointer;font-size:13px;color:#fff;}
@media print{.no-print{display:none!important}@page{size:182mm 128mm;margin:3mm}body{padding:0}.sheet{width:100%!important}}
</style></head><body>
<div class="no-print">
  <span style="font-weight:700">📄 세금계산서 (${isSupplier ? "공급자 보관용" : "공급받는자 보관용"})</span>
  <div style="display:flex;gap:6px">
    <button onclick="window.print()" style="background:#5561F5">🖨️ 인쇄</button>
    <button id="pdf-btn" onclick="savePdf()" style="background:#16A34A">📥 PDF 저장</button>
  </div>
</div>
<div class="sheet">
  <div class="formno">[별지 제11호 서식]</div>
  <table>
    <colgroup>
      <col style="width:215px"><col><col style="width:60px"><col style="width:70px"><col style="width:30px"><col style="width:70px"><col style="width:30px">
    </colgroup>
    <!-- 제목 + 책번호/일련번호 -->
    <tr>
      <td rowspan="2" class="title">세 금 계 산 서</td>
      <td rowspan="2" class="type-cell">( ${typeTop} )<br>보관용</td>
      <td class="lbl">책 번호</td><td colspan="2"><span style="font-size:10px">제　　호</span></td>
      <td class="lbl">권</td><td class="lbl">호</td>
    </tr>
    <tr>
      <td class="lbl">일련번호</td><td colspan="4"></td>
    </tr>
  </table>

  <!-- 공급자 / 공급받는자 -->
  <table style="border-top:none;">
    <tr>
      <td class="vlbl" rowspan="4">공<br>급<br>자</td>
      <td class="lbl" style="width:52px">등록<br>번호</td>
      <td colspan="4" style="padding:0"><table style="border:none;width:100%"><tr style="border:none">${splitRegNo(biz.biz_no)}</tr></table></td>
      <td class="vlbl" rowspan="4">공<br>급<br>받<br>는<br>자</td>
      <td class="lbl" style="width:52px">${inv.client_type === "개인" ? "주민등록<br>번호" : "등록<br>번호"}</td>
      <td colspan="4" style="padding:0"><table style="border:none;width:100%"><tr style="border:none">${splitRegNo(inv.biz_number)}</tr></table></td>
    </tr>
    <tr>
      <td class="lbl">상호<br>(법인명)</td><td class="val">${biz.name || ""}</td>
      <td class="lbl" style="width:36px">성명</td><td class="val">${biz.rep || ""}</td><td style="width:42px">${stampImg}</td>
      <td class="lbl">${inv.client_type === "개인" ? "성명" : "상호<br>(법인명)"}</td><td class="val">${inv.biz_name || ""}</td>
      <td class="lbl" style="width:36px">${inv.client_type === "개인" ? "이메일" : "성명"}</td><td class="val">${inv.rep_name || ""}</td><td style="width:42px"><span style="font-size:11px">인</span></td>
    </tr>
    <tr>
      <td class="lbl">사업장<br>주소</td><td class="val" colspan="4">${biz.addr || ""}</td>
      <td class="lbl">${inv.client_type === "개인" ? "주소" : "사업장<br>주소"}</td><td class="val" colspan="4">${inv.biz_addr || ""}</td>
    </tr>
    <tr>
      <td class="lbl">업태</td><td class="val">${biz.biz_type || ""}</td>
      <td class="lbl" style="width:36px">종목</td><td class="val" colspan="2">${biz.biz_item || ""}</td>
      <td class="lbl">${inv.client_type === "개인" ? "" : "업태"}</td><td class="val">${inv.client_type === "개인" ? "" : (inv.biz_type || "")}</td>
      <td class="lbl" style="width:36px">${inv.client_type === "개인" ? "" : "종목"}</td><td class="val" colspan="2">${inv.client_type === "개인" ? "" : (inv.biz_item || "")}</td>
    </tr>
  </table>

  <!-- 작성 / 공급가액 / 세액 / 비고 -->
  <table style="border-top:none;">
    <tr>
      <td class="lbl" style="width:80px">작성</td>
      <td class="lbl">공　급　가　액</td>
      <td class="lbl">세　　액</td>
      <td class="lbl" style="width:90px">비고</td>
    </tr>
    <tr>
      <td style="padding:0">
        <table style="border:none;width:100%"><tr style="border:none">
          <td class="lbl" style="width:30px;border:none;border-right:1px solid ${C}">년</td>
          <td class="lbl" style="width:24px;border:none;border-right:1px solid ${C}">월</td>
          <td class="lbl" style="width:24px;border:none">일</td>
        </tr><tr style="border:none">
          <td style="border:none;border-right:1px solid ${C}">${yyyy || ""}</td>
          <td style="border:none;border-right:1px solid ${C}">${mm || ""}</td>
          <td style="border:none">${dd || ""}</td>
        </tr></table>
      </td>
      <td style="padding:0">
        <table style="border:none;width:100%"><tr style="border:none">
          <td class="lbl" style="border:none;font-size:9px">공란수</td>
          <td class="lbl" style="border:none;font-size:9px">백</td><td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">억</td>
          <td class="lbl" style="border:none;font-size:9px">천</td><td class="lbl" style="border:none;font-size:9px">백</td><td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">만</td>
          <td class="lbl" style="border:none;font-size:9px">천</td><td class="lbl" style="border:none;font-size:9px">백</td><td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">일</td>
        </tr><tr style="border:none">
          <td class="dg" style="border-top:1px solid ${C}"></td>
          ${supplyCells.replace(/<td class="dg">/g, `<td class="dg" style="border-top:1px solid ${C}">`)}
        </tr></table>
      </td>
      <td style="padding:0">
        <table style="border:none;width:100%"><tr style="border:none">
          <td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">억</td>
          <td class="lbl" style="border:none;font-size:9px">천</td><td class="lbl" style="border:none;font-size:9px">백</td><td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">만</td>
          <td class="lbl" style="border:none;font-size:9px">천</td><td class="lbl" style="border:none;font-size:9px">백</td><td class="lbl" style="border:none;font-size:9px">십</td><td class="lbl" style="border:none;font-size:9px">일</td>
        </tr><tr style="border:none">
          ${vatCells.replace(/<td class="dg">/g, `<td class="dg" style="border-top:1px solid ${C}">`)}
        </tr></table>
      </td>
      <td></td>
    </tr>
  </table>

  <!-- 품목 -->
  <table style="border-top:none;">
    <colgroup><col style="width:34px"><col style="width:34px"><col><col style="width:70px"><col style="width:50px"><col style="width:90px"><col style="width:120px"><col style="width:100px"><col style="width:70px"></colgroup>
    <tr>
      <td class="lbl">월</td><td class="lbl">일</td><td class="lbl">품　목</td><td class="lbl">규격</td>
      <td class="lbl">수량</td><td class="lbl">단가</td><td class="lbl">공급가액</td><td class="lbl">세액</td><td class="lbl">비고</td>
    </tr>
    ${(inv.items && inv.items.length > 0 && inv.items.some(x => x.name)) ? inv.items.filter(x => x.name || x.amount).map(it => `<tr>
      <td>${mm || ""}</td><td>${dd || ""}</td>
      <td class="val">${it.name || ""}</td>
      <td>${it.spec || ""}</td><td>${it.qty || ""}</td><td class="amt">${it.price ? parseInt(it.price).toLocaleString() : ""}</td>
      <td class="amt">${it.amount ? parseInt(it.amount).toLocaleString() : ""}</td>
      <td class="amt">${it.vat ? parseInt(it.vat).toLocaleString() : ""}</td>
      <td></td>
    </tr>`).join("") : `<tr>
      <td>${mm || ""}</td><td>${dd || ""}</td>
      <td class="val">${biz.biz_item || "인테리어 도배 시공"}</td>
      <td></td><td></td><td></td>
      <td class="amt">${(inv.amount||0).toLocaleString()}</td>
      <td class="amt">${(inv.vat||0).toLocaleString()}</td>
      <td></td>
    </tr>`}
    <tr style="height:18px"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </table>

  <!-- 합계 -->
  <table style="border-top:none;">
    <colgroup><col style="width:130px"><col style="width:120px"><col style="width:110px"><col style="width:110px"><col style="width:120px"><col></colgroup>
    <tr>
      <td class="lbl">합계금액</td><td class="lbl">현금</td><td class="lbl">수표</td><td class="lbl">어음</td><td class="lbl">외상미수금</td>
      <td class="lbl" rowspan="2" style="width:130px">위 금액을 <b>${inv.payment_type === "청구" ? "청구" : "영수"}</b> 함</td>
    </tr>
    <tr>
      <td class="amt" style="font-weight:800">${(inv.total||0).toLocaleString()}</td>
      <td></td><td></td><td></td><td></td>
    </tr>
  </table>
  <div style="margin-top:4px;font-size:10px;color:${C};">비고 : ${inv.memo || ""}</div>
</div>
<script>
function loadLib(cb){
  if(window.html2pdf){cb();return;}
  var s=document.createElement("script");
  s.src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  s.onload=cb;
  document.head.appendChild(s);
}
function savePdf(){
  var btn=document.getElementById("pdf-btn");
  btn.textContent="변환 중...";btn.disabled=true;
  loadLib(function(){
    var el=document.querySelector(".sheet");
    var opt={margin:6,filename:"세금계산서.pdf",image:{type:"jpeg",quality:0.98},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:"㎜",format:"a4",orientation:"landscape"}};
    html2pdf().set(opt).from(el).save().then(function(){btn.textContent="📥 PDF 저장";btn.disabled=false;});
  });
}
loadLib(function(){});
\x3c/script>
</body></html>`;
  }

  // 공급자 보관용 자동 백업 (localStorage)
  // 세금계산서 미리보기 상태
  const [previewHtml, setPreviewHtml] = useState(null);

  // 공급자 보관용 자동 백업 (localStorage)
  function saveSupplierCopy(inv) {
    try {
      const key = "supplier_invoices";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const html = buildInvoiceHtml(inv, "supplier");
      const record = { id: inv.id, date: inv.date, biz_name: inv.biz_name, total: inv.total, html, saved_at: new Date().toISOString() };
      const filtered = existing.filter(r => r.id !== inv.id);
      filtered.unshift(record);
      localStorage.setItem(key, JSON.stringify(filtered.slice(0, 200)));
    } catch(e) { console.warn("공급자 보관용 저장 실패", e); }
  }

  function printInvoice(inv) {
    saveSupplierCopy(inv);
    const html = buildInvoiceHtml(inv, "recipient");
    setPreviewHtml(html);
  }

  function emailInvoice(inv) {
    saveSupplierCopy(inv);
    // 파일 다운로드
    const html = buildInvoiceHtml(inv, "recipient");
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `세금계산서_${inv.biz_name}_${inv.date}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    // 메일앱 열기
    const subject = encodeURIComponent(`세금계산서 송부 - ${inv.biz_name} (${inv.date})`);
    const body = encodeURIComponent(
      `안녕하세요.\n\n세금계산서를 송부해 드립니다.\n\n■ 공급자 : ${(bizInfo && bizInfo.name) || ""}\n■ 사업자등록번호 : ${(bizInfo && bizInfo.biz_no) || ""}\n■ 공급받는자 : ${inv.biz_name}\n■ 작성일자 : ${inv.date}\n■ 공급가액 : ${(inv.amount||0).toLocaleString()}원\n■ 세   액 : ${(inv.vat||0).toLocaleString()}원\n■ 합   계 : ${(inv.total||0).toLocaleString()}원\n${inv.memo ? "■ 비   고 : " + inv.memo : ""}\n\n* 다운로드된 세금계산서 파일을 첨부해서 보내주세요.\n\n감사합니다.`
    );
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:?subject=${subject}&body=${body}`;
    mailLink.style.display = "none";
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);
  }

  function faxInvoice(inv) {
    saveSupplierCopy(inv);
    const html = buildInvoiceHtml(inv, "recipient");
    setPreviewHtml(html);
  }

  function MonthSelector() {
    const [y, m] = viewMonth.split("-").map(Number);
    const prev = () => { const d = new Date(y, m - 2); setViewMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); };
    const next = () => { const d = new Date(y, m); setViewMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); };
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={prev} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: SUB, padding: "0 8px" }}>‹</button>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{y}년 {m}월</span>
        <button onClick={next} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: SUB, padding: "0 8px" }}>›</button>
      </div>
    );
  }

  // 모달 상태 계산
  const showTxnModal = (showAdd && tab !== "invoice") || (editItem && tab !== "invoice");
  const showInvModal = (showAdd && tab === "invoice") || (editItem && tab === "invoice");
  const txnTitle = showAdd ? `${tab === "sales" ? "매출" : "매입"} 추가` : editItem ? `${(editItem.type === "sales") ? "매출" : "매입"} 수정` : "";
  const invTitle = showAdd ? (invTab === "issued" ? "세금계산서 발행" : "수취 세금계산서 등록") : "세금계산서 수정";
  const txnSave = showAdd ? addTxn : saveEdit;
  const invSave = showAdd ? addInvoice : saveEdit;
  const txnClose = () => { setShowAdd(false); setEditItem(null); setForm(EMPTY_TXN); };
  const invClose = () => { setShowAdd(false); setEditItem(null); setForm(EMPTY_INV); };
  const isSales = showAdd ? tab === "sales" : editItem ? editItem.type === "sales" : false;

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="💰 매입/매출" back onBack={() => setScreen("home")} />
      <div style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, display: "flex" }}>
        {[["sales","매출"],["expense","매입"],["vat","부가세"],["invoice","세금계산서"]].filter(([id]) => {
          if (!isPremium && PREMIUM_FEATURES.vatCalc && (id === "vat" || id === "invoice")) return false;
          return true;
        }).map(([id,l]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "12px 0", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: tab===id?PRIMARY:SUB, borderBottom: tab===id?`2.5px solid ${PRIMARY}`:"2.5px solid transparent" }}>{l}</button>
        ))}
        {!isPremium && PREMIUM_FEATURES.vatCalc && (
          <button onClick={() => window.dispatchEvent(new CustomEvent("openDonateModal"))} style={{ flex: 1, padding: "12px 0", border: "none", background: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#D1D5DB", borderBottom: "2.5px solid transparent" }}>🔒 세금</button>
        )}
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {(tab==="sales"||tab==="expense") && (<>
          <Card><MonthSelector /><div style={{ display: "flex", gap: 10 }}><div style={{ flex: 1, background: tab==="sales"?"#F0FDF4":"#FEF2F2", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}><div style={{ fontSize: 11, color: tab==="sales"?"#16A34A":"#DC2626", fontWeight: 600 }}>{tab==="sales"?"매출":"매입"} 합계</div><div style={{ fontSize: 18, fontWeight: 800, color: tab==="sales"?"#16A34A":"#DC2626", marginTop: 4 }}>₩{(tab==="sales"?salesTotal:expTotal).toLocaleString()}</div></div><div style={{ flex: 1, background: "#F0F9FF", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}><div style={{ fontSize: 11, color: "#2563EB", fontWeight: 600 }}>부가세</div><div style={{ fontSize: 18, fontWeight: 800, color: "#2563EB", marginTop: 4 }}>₩{(tab==="sales"?salesVat:expVat).toLocaleString()}</div></div></div></Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{tab==="sales"?"매출":"매입"} 내역</span><button onClick={openAdd} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "7px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ 추가</button></div>
          {loading && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>로딩 중...</p></Card>}
          {!loading && (tab==="sales"?sales:expenses).length===0 && (<Card style={{ textAlign: "center", padding: "30px 16px" }}><div style={{ fontSize: 32, marginBottom: 10 }}>{tab==="sales"?"📈":"📉"}</div><div style={{ fontSize: 13, color: SUB }}>{viewMonth.split("-")[1]}월 {tab==="sales"?"매출":"매입"} 내역이 없어요</div></Card>)}
          {(tab==="sales"?sales:expenses).map(t => (<Card key={t.id}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}><div><div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{t.client_name||"미입력"}</div><div style={{ fontSize: 11, color: SUB, marginTop: 2 }}>{t.date}{t.category?` · ${t.category}`:""}</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: 15, fontWeight: 800, color: tab==="sales"?"#16A34A":"#DC2626" }}>₩{(t.total||0).toLocaleString()}</div><div style={{ fontSize: 10, color: SUB }}>공급 {(t.amount||0).toLocaleString()} + 세 {(t.vat||0).toLocaleString()}</div></div></div>{t.memo&&<div style={{ fontSize: 11, color: SUB, marginBottom: 6 }}>💬 {t.memo}</div>}<div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}><button onClick={() => openEdit(t)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", background: "#fff", cursor: "pointer", fontSize: 11, color: TEXT, fontWeight: 600 }}>수정</button><button onClick={() => delItem(t)} style={{ border: "1px solid #FECACA", borderRadius: 8, padding: "4px 10px", background: "#FEF2F2", cursor: "pointer", fontSize: 11, color: "#DC2626", fontWeight: 600 }}>삭제</button></div></Card>))}
        </>)}
        {tab==="vat" && (<><Card><MonthSelector /><div style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>매출 공급가액</span><span style={{ fontSize: 13, fontWeight: 700 }}>₩{salesTotal.toLocaleString()}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: "#16A34A", fontWeight: 600 }}>매출세액</span><span style={{ fontSize: 13, fontWeight: 700, color: "#16A34A" }}>₩{salesVat.toLocaleString()}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>매입 공급가액</span><span style={{ fontSize: 13, fontWeight: 700 }}>₩{expTotal.toLocaleString()}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: "#DC2626", fontWeight: 600 }}>매입세액</span><span style={{ fontSize: 13, fontWeight: 700, color: "#DC2626" }}>₩{expVat.toLocaleString()}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: salesVat-expVat>=0?"#FEF2F2":"#F0FDF4", borderRadius: 10, marginTop: 4 }}><span style={{ fontSize: 14, fontWeight: 700 }}>{salesVat-expVat>=0?"납부할 부가세":"환급 받을 부가세"}</span><span style={{ fontSize: 18, fontWeight: 800, color: salesVat-expVat>=0?"#DC2626":"#16A34A" }}>₩{Math.abs(salesVat-expVat).toLocaleString()}</span></div></div></Card>
          <Card><p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: SUB }}>📊 분기별 요약</p>{[["1분기","01","03"],["2분기","04","06"],["3분기","07","09"],["4분기","10","12"]].map(([label,sm,em])=>{const year=viewMonth.split("-")[0];const qSV=txns.filter(t=>t.type==="sales"&&t.date>=`${year}-${sm}`&&t.date<=`${year}-${em}-31`).reduce((s,t)=>s+(t.vat||0),0);const qEV=txns.filter(t=>t.type==="expense"&&t.date>=`${year}-${sm}`&&t.date<=`${year}-${em}-31`).reduce((s,t)=>s+(t.vat||0),0);const diff=qSV-qEV;return(<div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 12, color: SUB }}>{year} {label}</span><div style={{ textAlign: "right" }}><span style={{ fontSize: 12, fontWeight: 700, color: diff>=0?"#DC2626":"#16A34A" }}>{diff>=0?"납부":"환급"} ₩{Math.abs(diff).toLocaleString()}</span><div style={{ fontSize: 10, color: SUB }}>매출세 {qSV.toLocaleString()} - 매입세 {qEV.toLocaleString()}</div></div></div>);})}</Card>
        </>)}
        {tab==="invoice" && (<>
          {/* 1순위: 국세청 홈택스 연결 */}
          <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "linear-gradient(135deg,#0EA5E9,#0284C7)", color: "#fff", textAlign: "center", padding: "12px 14px", borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: "none", marginBottom: 8, boxShadow: "0 2px 8px rgba(14,165,233,0.25)" }}>
            🌐 국세청 홈택스 — 전자세금계산서 발행하러 가기 →
          </a>
          {/* 2순위: 발행/수취 탭 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}><button onClick={()=>setInvTab("issued")} style={{ flex: 1, border: `2px solid ${invTab==="issued"?PRIMARY:BORDER}`, borderRadius: 12, padding: "10px 0", cursor: "pointer", background: invTab==="issued"?PL:"#fff", color: invTab==="issued"?PRIMARY:SUB, fontSize: 13, fontWeight: 700 }}>📤 발행</button><button onClick={()=>setInvTab("received")} style={{ flex: 1, border: `2px solid ${invTab==="received"?"#EA580C":BORDER}`, borderRadius: 12, padding: "10px 0", cursor: "pointer", background: invTab==="received"?"#FFF7ED":"#fff", color: invTab==="received"?"#EA580C":SUB, fontSize: 13, fontWeight: 700 }}>📥 수취</button></div>
          {/* 3순위: 사업자 등록 */}
          <div style={{ background: bizInfo && bizInfo.name ? "#F0FDF4" : "#FFF7ED", border: `1px solid ${bizInfo && bizInfo.name ? "#BBF7D0" : "#FED7AA"}`, borderRadius: 10, padding: "8px 12px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 11, fontWeight: 700, color: bizInfo && bizInfo.name ? "#16A34A" : "#EA580C" }}>{bizInfo && bizInfo.name ? `🏢 ${bizInfo.name}` : "⚠️ 사업자 정보 미등록"}</div>{bizInfo && bizInfo.biz_no && <div style={{ fontSize: 10, color: "#6B7280" }}>{bizInfo.biz_no} · {bizInfo.rep || ""}</div>}</div>
            <button onClick={openBizModal} style={{ background: bizInfo && bizInfo.name ? "#16A34A" : "#EA580C", border: "none", borderRadius: 8, padding: "5px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{bizInfo && bizInfo.name ? "수정" : "등록"}</button>
          </div>
          {/* 4순위: 발행/수취 세금계산서 목록 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{invTab==="issued"?"발행한 세금계산서":"수취한 세금계산서"}</span><button onClick={openAdd} style={{ background: invTab==="issued"?PRIMARY:"#EA580C", border: "none", borderRadius: 10, padding: "7px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ {invTab==="issued"?"발행":"수취 등록"}</button></div>
          {loading && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>로딩 중...</p></Card>}
          {!loading && invoices.filter(i=>i.type===invTab).length===0 && (<Card style={{ textAlign: "center", padding: "30px 16px" }}><div style={{ fontSize: 32, marginBottom: 10 }}>{invTab==="issued"?"📤":"📥"}</div><div style={{ fontSize: 13, color: SUB }}>{invTab==="issued"?"발행한":"수취한"} 세금계산서가 없어요</div></Card>)}
          {invoices.filter(i=>i.type===invTab).map(inv=>(<Card key={inv.id}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}><div><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{inv.biz_name}</span><span style={{ padding: "1px 6px", fontSize: 9, borderRadius: 8, background: inv.type==="issued"?PL:"#FFF7ED", color: inv.type==="issued"?PRIMARY:"#EA580C", fontWeight: 600 }}>{inv.type==="issued"?"발행":"수취"}</span></div><div style={{ fontSize: 11, color: SUB, marginTop: 2 }}>{inv.date} · {inv.biz_number||"번호 미입력"}</div>{inv.rep_name&&<div style={{ fontSize: 11, color: SUB }}>대표: {inv.rep_name}</div>}</div><div style={{ textAlign: "right" }}><div style={{ fontSize: 15, fontWeight: 800, color: inv.type==="issued"?PRIMARY:"#EA580C" }}>₩{(inv.total||0).toLocaleString()}</div><div style={{ fontSize: 10, color: SUB }}>공급 {(inv.amount||0).toLocaleString()} + 세 {(inv.vat||0).toLocaleString()}</div></div></div>{inv.memo&&<div style={{ fontSize: 11, color: SUB, marginBottom: 6 }}>💬 {inv.memo}</div>}<div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}><button onClick={()=>printInvoice(inv)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", background: "#fff", cursor: "pointer", fontSize: 11, color: TEXT, fontWeight: 600 }}>🖨️ 인쇄</button>{inv.type==="issued"&&<><button onClick={()=>emailInvoice(inv)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", background: "#fff", cursor: "pointer", fontSize: 11, color: TEXT, fontWeight: 600 }}>📧 이메일</button><button onClick={()=>faxInvoice(inv)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", background: "#fff", cursor: "pointer", fontSize: 11, color: TEXT, fontWeight: 600 }}>📠 팩스</button><button onClick={()=>{const s=JSON.parse(localStorage.getItem("supplier_invoices")||"[]");const r=s.find(x=>x.id===inv.id);if(!r){alert("아직 저장된 내 사본이 없어요.\n인쇄/이메일/팩스 버튼을 누르면 자동으로 저장돼요.");return;}setPreviewHtml(r.html);}} style={{ border: "1px solid #D1FAE5", borderRadius: 8, padding: "4px 10px", background: "#F0FDF4", cursor: "pointer", fontSize: 11, color: "#16A34A", fontWeight: 600 }}>📁 내 사본</button></>}<button onClick={()=>openEdit(inv)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", background: "#fff", cursor: "pointer", fontSize: 11, color: TEXT, fontWeight: 600 }}>수정</button><button onClick={()=>delItem(inv)} style={{ border: "1px solid #FECACA", borderRadius: 8, padding: "4px 10px", background: "#FEF2F2", cursor: "pointer", fontSize: 11, color: "#DC2626", fontWeight: 600 }}>삭제</button></div></Card>))}
        </>)}
      </div>
      {showTxnModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e=>{if(e.target===e.currentTarget)txnClose();}}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{txnTitle}</span>
              <button onClick={txnClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <Inp label="날짜 *" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} type="date" />
            <div style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: SUB }}>{isSales ? "고객/거래처" : "거래처"}</label>
                {!isSales && (
                  <button onClick={() => setShowVendorMgr(true)} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: SUB, cursor: "pointer" }}>📋 거래처 관리</button>
                )}
              </div>
              <input list="vendor-list" value={form.client_name} onChange={e=>setForm(p=>({...p,client_name:e.target.value}))} placeholder="거래처명 (또는 선택)" style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", color: TEXT }} />
              {!isSales && vendors.length > 0 && (
                <datalist id="vendor-list">
                  {vendors.map(v => <option key={v.id} value={v.name} />)}
                </datalist>
              )}
            </div>
            {!isSales && (
              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>카테고리</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {CATS.map(c=>(<button key={c} onClick={()=>setForm(p=>({...p,category:c}))} style={{ border: `2px solid ${form.category===c?PRIMARY:BORDER}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", background: form.category===c?PL:"#fff", color: form.category===c?PRIMARY:SUB }}>{c}</button>))}
                </div>
              </div>
            )}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>부가세 처리</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setForm(p => ({ ...p, vat_mode: "separate", vat: autoVat(p.amount) }))} style={{ flex: 1, border: `2px solid ${form.vat_mode === "separate" ? PRIMARY : BORDER}`, borderRadius: 10, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: form.vat_mode === "separate" ? PL : "#fff", color: form.vat_mode === "separate" ? PRIMARY : SUB }}>별도 (공급가+VAT)</button>
                <button onClick={() => { const total = parseInt(form.amount) || 0; const vat = Math.round(total / 11); const amt = total - vat; setForm(p => ({ ...p, vat_mode: "include", amount: total ? String(amt) : "", vat: total ? String(vat) : "" })); }} style={{ flex: 1, border: `2px solid ${form.vat_mode === "include" ? PRIMARY : BORDER}`, borderRadius: 10, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: form.vat_mode === "include" ? PL : "#fff", color: form.vat_mode === "include" ? PRIMARY : SUB }}>포함 (총액)</button>
                <button onClick={() => setForm(p => ({ ...p, vat_mode: "none", vat: "0" }))} style={{ flex: 1, border: `2px solid ${form.vat_mode === "none" ? PRIMARY : BORDER}`, borderRadius: 10, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: form.vat_mode === "none" ? PL : "#fff", color: form.vat_mode === "none" ? PRIMARY : SUB }}>면세</button>
              </div>
            </div>
            <Inp label={form.vat_mode === "include" ? "공급가액 (총액에서 분리됨)" : "공급가액 *"} value={form.amount} onChange={e=>{ const v = e.target.value; setForm(p=>({...p,amount:v,vat: p.vat_mode === "none" ? "0" : (p.vat_mode === "separate" ? autoVat(v) : p.vat)})); }} placeholder="100000" type="number" />
            <Inp label="부가세" value={form.vat} onChange={e=>setForm(p=>({...p,vat:e.target.value}))} placeholder="10000" type="number" />
            <div style={{ background: "#F0F9FF", borderRadius: 10, padding: "10px 14px", marginBottom: 13, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: SUB }}>합계</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: PRIMARY }}>₩{((parseInt(form.amount)||0)+(parseInt(form.vat)||0)).toLocaleString()}</span>
            </div>
            <Inp label="메모" value={form.memo} onChange={e=>setForm(p=>({...p,memo:e.target.value}))} placeholder="내용" />
            <button onClick={txnSave} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
          </div>
        </div>
      )}
      {/* 거래처 관리 모달 */}
      {showVendorMgr && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 250, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowVendorMgr(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>📋 고정 거래처 관리</span>
              <button onClick={() => setShowVendorMgr(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <button onClick={() => setShowAddVendor(true)} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 14 }}>+ 새 거래처 등록</button>
            {vendors.length === 0 && <p style={{ fontSize: 13, color: SUB, textAlign: "center", padding: 20 }}>등록된 거래처가 없어요</p>}
            {vendors.map(v => (
              <div key={v.id} style={{ padding: 12, background: BG, borderRadius: 10, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{v.name}</div>
                  {(v.biz_number || v.rep_name || v.phone) && <div style={{ fontSize: 11, color: SUB, marginTop: 3 }}>{[v.biz_number, v.rep_name, v.phone].filter(Boolean).join(" · ")}</div>}
                </div>
                <button onClick={() => delVendor(v.id)} style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 8px", fontSize: 11, cursor: "pointer" }}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 거래처 등록 모달 */}
      {showAddVendor && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 260, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowAddVendor(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>+ 거래처 등록</span>
              <button onClick={() => setShowAddVendor(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <Inp label="거래처명 *" value={vendorForm.name} onChange={e => setVendorForm(p => ({ ...p, name: e.target.value }))} placeholder="(주)○○상사" />
            <Inp label="사업자번호" value={vendorForm.biz_number} onChange={e => setVendorForm(p => ({ ...p, biz_number: e.target.value }))} placeholder="000-00-00000" />
            <Inp label="대표자" value={vendorForm.rep_name} onChange={e => setVendorForm(p => ({ ...p, rep_name: e.target.value }))} />
            <Inp label="연락처" value={vendorForm.phone} onChange={e => setVendorForm(p => ({ ...p, phone: e.target.value }))} placeholder="010-0000-0000" />
            <Inp label="메모" value={vendorForm.memo} onChange={e => setVendorForm(p => ({ ...p, memo: e.target.value }))} />
            <button onClick={addVendor} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>등록하기</button>
          </div>
        </div>
      )}
      {showInvModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e=>{if(e.target===e.currentTarget)invClose();}}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "90vh", overflowY: "auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{invTitle}</span>
              <button onClick={invClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            {invTab === "received" && allianceMembers.length > 0 && (
              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#EA580C", display: "block", marginBottom: 6 }}>🤝 연합 멤버에서 불러오기</label>
                <select onChange={e => { const m = allianceMembers.find(x => String(x.id) === e.target.value); if (m) setForm(p => ({ ...p, biz_name: m.name || "", rep_name: m.name || "", biz_number: m.biz_number || "" })); }} style={{ width: "100%", border: "1.5px solid #FED7AA", borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, background: "#FFF7ED" }}>
                  <option value="">연합 멤버 선택</option>
                  {allianceMembers.map(m => <option key={m.id} value={m.id}>{m.region} · {m.name}</option>)}
                </select>
              </div>
            )}
            {/* 기업/개인 구분 */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>발행 구분</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["기업", "개인"].map(t => (
                  <button key={t} onClick={() => setForm(p => ({ ...p, client_type: t }))} style={{ flex: 1, border: `2px solid ${(form.client_type || "기업") === t ? PRIMARY : BORDER}`, borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", background: (form.client_type || "기업") === t ? PL : "#fff", color: (form.client_type || "기업") === t ? PRIMARY : SUB }}>{t === "기업" ? "🏢 사업자" : "👤 개인"}</button>
                ))}
              </div>
            </div>
            {/* 고객관리에서 불러오기 */}
            {appClients && appClients.length > 0 && (
              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#16A34A", display: "block", marginBottom: 6 }}>📋 고객관리에서 불러오기</label>
                <select onChange={e => {
                  const c = appClients.find(x => String(x.id) === e.target.value);
                  if (c) setForm(p => ({ ...p, biz_name: c.name || "", rep_name: c.name || "", biz_addr: c.address || "", memo: c.notes || "" }));
                }} style={{ width: "100%", border: `1.5px solid #BBF7D0`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, background: "#F0FDF4" }}>
                  <option value="">등록된 고객 선택 (자동 입력)</option>
                  {appClients.map(c => <option key={c.id} value={c.id}>{c.name}{c.phone ? ` · ${c.phone}` : ""}{c.status ? ` (${c.status})` : ""}</option>)}
                </select>
              </div>
            )}
            <Inp label="작성일자 *" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} type="date" />
            {(form.client_type || "기업") === "기업" && <Inp label="사업자번호" value={form.biz_number} onChange={e=>setForm(p=>({...p,biz_number:e.target.value}))} placeholder="000-00-00000" />}
            {(form.client_type || "기업") === "개인" && <Inp label="주민등록번호 (13자리) *" value={form.biz_number} onChange={e=>setForm(p=>({...p,biz_number:e.target.value}))} placeholder="000000-0000000" />}
            <Inp label={(form.client_type || "기업") === "기업" ? "상호 *" : "성명 *"} value={form.biz_name} onChange={e=>setForm(p=>({...p,biz_name:e.target.value}))} placeholder={(form.client_type || "기업") === "기업" ? "업체명" : "홍길동"} />
            <Inp label={(form.client_type || "기업") === "기업" ? "대표자" : "이메일 (선택)"} value={form.rep_name} onChange={e=>setForm(p=>({...p,rep_name:e.target.value}))} placeholder={(form.client_type || "기업") === "기업" ? "대표자명" : "email@example.com"} />
            <Inp label={(form.client_type || "기업") === "기업" ? "사업장 소재지" : "주소 (선택)"} value={form.biz_addr || ""} onChange={e=>setForm(p=>({...p,biz_addr:e.target.value}))} placeholder="서울시 강남구..." />
            {(form.client_type || "기업") === "기업" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 13 }}>
                <div style={{ flex: 1 }}><Inp label="업태" value={form.biz_type || ""} onChange={e=>setForm(p=>({...p,biz_type:e.target.value}))} placeholder="서비스" /></div>
                <div style={{ flex: 1 }}><Inp label="종목" value={form.biz_item || ""} onChange={e=>setForm(p=>({...p,biz_item:e.target.value}))} placeholder="인테리어" /></div>
              </div>
            )}
            {(form.client_type || "기업") === "개인" && !form.biz_number && (
              <div style={{ background: "#FFF7ED", borderRadius: 10, padding: "8px 12px", marginBottom: 13, fontSize: 11, color: "#EA580C", lineHeight: 1.5 }}>
                ⚠️ 주민등록번호를 모르는 경우 세금계산서 발행이 불가합니다.<br/>이 경우 <b>현금영수증</b>(소비자 소득공제용)을 발급해주세요.
              </div>
            )}
            <div style={{ background: "#F8F9FA", borderRadius: 12, padding: 12, marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: SUB }}>📋 품목</label>
                <button onClick={() => setForm(p => ({ ...p, items: [...(p.items||[]), { name: "", spec: "", qty: "", price: "", amount: "", vat: "" }] }))} style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ 추가</button>
              </div>
              {(form.items || []).map((it, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 8, padding: 10, marginBottom: 6, border: "1px solid " + BORDER }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <input value={it.name} onChange={e => { const items = [...form.items]; items[i] = { ...items[i], name: e.target.value }; setForm(p => ({ ...p, items })); }} placeholder="품목" style={{ flex: 2, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                    <input value={it.spec} onChange={e => { const items = [...form.items]; items[i] = { ...items[i], spec: e.target.value }; setForm(p => ({ ...p, items })); }} placeholder="규격" style={{ flex: 1, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                    {(form.items||[]).length > 1 && <button onClick={() => setForm(p => ({ ...p, items: p.items.filter((_, j) => j !== i) }))} style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "2px 6px", fontSize: 11, cursor: "pointer", flexShrink: 0 }}>×</button>}
                  </div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <input value={it.qty} onChange={e => { const items = [...form.items]; const q = e.target.value; const p2 = parseInt(items[i].price) || 0; const a = (parseInt(q) || 0) * p2; items[i] = { ...items[i], qty: q, amount: a ? String(a) : "", vat: a ? String(Math.round(a * 0.1)) : "" }; setForm(p => ({ ...p, items, amount: String(items.reduce((s, x) => s + (parseInt(x.amount) || 0), 0)), vat: String(items.reduce((s, x) => s + (parseInt(x.vat) || 0), 0)) })); }} placeholder="수량" type="number" style={{ flex: 1, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                    <input value={it.price} onChange={e => { const items = [...form.items]; const pr = e.target.value; const q2 = parseInt(items[i].qty) || 0; const a = q2 * (parseInt(pr) || 0); items[i] = { ...items[i], price: pr, amount: a ? String(a) : "", vat: a ? String(Math.round(a * 0.1)) : "" }; setForm(p => ({ ...p, items, amount: String(items.reduce((s, x) => s + (parseInt(x.amount) || 0), 0)), vat: String(items.reduce((s, x) => s + (parseInt(x.vat) || 0), 0)) })); }} placeholder="단가" type="number" style={{ flex: 1, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <input value={it.amount} onChange={e => { const items = [...form.items]; items[i] = { ...items[i], amount: e.target.value, vat: String(Math.round((parseInt(e.target.value) || 0) * 0.1)) }; setForm(p => ({ ...p, items, amount: String(items.reduce((s, x) => s + (parseInt(x.amount) || 0), 0)), vat: String(items.reduce((s, x) => s + (parseInt(x.vat) || 0), 0)) })); }} placeholder="공급가액" type="number" style={{ flex: 1, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                    <input value={it.vat} readOnly placeholder="세액" style={{ flex: 1, border: "1px solid " + BORDER, borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none", background: "#F3F4F6", color: SUB }} />
                  </div>
                </div>
              ))}
            </div>
            <Inp label="공급가액 합계" value={form.amount} onChange={e=>setForm(p=>({...p,amount:e.target.value,vat:autoVat(e.target.value)}))} placeholder="자동 합산" type="number" />
            <Inp label="세액 합계" value={form.vat} onChange={e=>setForm(p=>({...p,vat:e.target.value}))} placeholder="자동 10%" type="number" />
            <div style={{ background: "#F0F9FF", borderRadius: 10, padding: "10px 14px", marginBottom: 13, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: SUB }}>합계금액</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: PRIMARY }}>₩{((parseInt(form.amount)||0)+(parseInt(form.vat)||0)).toLocaleString()}</span>
            </div>
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>위 금액을</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["영수", "청구"].map(t => (
                  <button key={t} onClick={() => setForm(p => ({ ...p, payment_type: t }))} style={{ flex: 1, border: "2px solid " + (form.payment_type === t ? PRIMARY : BORDER), borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", background: form.payment_type === t ? PL : "#fff", color: form.payment_type === t ? PRIMARY : SUB }}>{t}함</button>
                ))}
              </div>
            </div>
            <Inp label="비고" value={form.memo} onChange={e=>setForm(p=>({...p,memo:e.target.value}))} placeholder="내용" />
            <button onClick={invSave} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
          </div>
        </div>
      )}
      {previewHtml && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 400, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#1A1D2E", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>📄 세금계산서 미리보기</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { const f = document.getElementById("inv-preview"); if(f && f.contentWindow) f.contentWindow.print(); }} style={{ background: PRIMARY, border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🖨️ 인쇄</button>
              <button onClick={() => { const f = document.getElementById("inv-preview"); if(f && f.contentWindow && f.contentWindow.savePdf) f.contentWindow.savePdf(); else alert("PDF 변환 로딩 중... 잠시 후 다시 눌러주세요."); }} style={{ background: "#16A34A", border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📥 PDF 저장</button>
              <button onClick={() => setPreviewHtml(null)} style={{ background: "#DC2626", border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✕ 닫기</button>
            </div>
          </div>
          <iframe id="inv-preview" srcDoc={previewHtml} sandbox="allow-scripts allow-same-origin allow-modals allow-downloads allow-popups" style={{ flex: 1, border: "none", background: "#fff", width: "100%" }} title="세금계산서" />
        </div>
      )}
      {showBizModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e=>{if(e.target===e.currentTarget)setShowBizModal(false);}}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "90vh", overflowY: "auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>🏢 내 사업자 정보 등록</span>
              <button onClick={()=>setShowBizModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <div style={{ background: "#F0F9FF", borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#0369A1" }}>💡 여기 입력한 정보가 세금계산서 공급자란에 자동으로 들어가요.</div>
            <Inp label="상호 *" value={bizForm.name} onChange={e=>setBizForm(p=>({...p,name:e.target.value}))} placeholder="인테리어 벽지 전문점" />
            <Inp label="사업자등록번호 *" value={bizForm.biz_no} onChange={e=>setBizForm(p=>({...p,biz_no:e.target.value}))} placeholder="000-00-00000" />
            <Inp label="대표자명 *" value={bizForm.rep} onChange={e=>setBizForm(p=>({...p,rep:e.target.value}))} placeholder="홍길동" />
            <Inp label="사업장 주소" value={bizForm.addr} onChange={e=>setBizForm(p=>({...p,addr:e.target.value}))} placeholder="서울시 강남구..." />
            <Inp label="업태" value={bizForm.biz_type} onChange={e=>setBizForm(p=>({...p,biz_type:e.target.value}))} placeholder="서비스" />
            <Inp label="종목" value={bizForm.biz_item} onChange={e=>setBizForm(p=>({...p,biz_item:e.target.value}))} placeholder="인테리어 도배 시공" />
            <Inp label="전화번호" value={bizForm.tel} onChange={e=>setBizForm(p=>({...p,tel:e.target.value}))} placeholder="010-0000-0000" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>도장 이미지 업로드</label>
              {bizForm.stamp && (
                <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={bizForm.stamp} style={{ width: 72, height: 72, objectFit: "contain", border: "1px dashed #ccc", borderRadius: 8, padding: 4 }} alt="도장" />
                  <button onClick={()=>setBizForm(p=>({...p,stamp:""}))} style={{ fontSize: 11, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}>삭제</button>
                </div>
              )}
              <label style={{ display: "block", background: "#F3F4F6", border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "12px", textAlign: "center", cursor: "pointer", fontSize: 12, color: SUB }}>
                📷 도장 이미지 선택 (PNG 투명 권장)
                <input type="file" accept="image/*" onChange={handleStampUpload} style={{ display: "none" }} />
              </label>
            </div>
            <button onClick={saveBizInfo} style={{ width: "100%", background: "#16A34A", color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── 연합 (지역별 시공사 커넥션) ──
function AllianceScreen({ userId, setScreen, isPremium }) {
  const REGIONS = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
  const DISTRICTS = {
    "서울": ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],
    "경기": ["수원시","성남시","고양시","용인시","부천시","안산시","안양시","남양주시","화성시","평택시","의정부시","시흥시","파주시","광명시","김포시","광주시","군포시","이천시","양주시","오산시","구리시","안성시","포천시","의왕시","하남시","여주시","동두천시","과천시","가평군","양평군","연천군"],
    "인천": ["중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"],
    "부산": ["중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군"],
    "대구": ["중구","동구","서구","남구","북구","수성구","달서구","달성군","군위군"],
    "대전": ["동구","중구","서구","유성구","대덕구"],
    "광주": ["동구","서구","남구","북구","광산구"],
    "울산": ["중구","남구","동구","북구","울주군"],
    "세종": ["세종시"],
    "강원": ["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"],
    "충북": ["청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군"],
    "충남": ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"],
    "전북": ["전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군"],
    "전남": ["목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"],
    "경북": ["포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"],
    "경남": ["창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"],
    "제주": ["제주시","서귀포시"],
  };
  const TITLES = ["사업자", "팀장", "실장", "기사", "기타"];
  const [region, setRegion] = useState("서울");
  const [district, setDistrict] = useState("전체");
  const [members, setMembers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editMem, setEditMem] = useState(null);
  const [viewMem, setViewMem] = useState(null);
  const [loading, setLoading] = useState(true);
  const EMPTY = { name: "", title: "팀장", phone: "", work_desc: "", memo: "", district: "", blog: "", website: "" };
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { loadMembers(); }, []);

  async function loadMembers() {
    setLoading(true);
    const { data } = await supabase.from("alliance").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    setMembers(data || []);
    setLoading(false);
  }

  const filtered = members.filter(m => m.region === region && (district === "전체" || m.district === district));
  const districtList = ["전체", ...(DISTRICTS[region] || [])];
  // 시/군/구가 바뀐 광역시도일 때 district 초기화
  useEffect(() => { setDistrict("전체"); }, [region]);

  function openAdd() { setForm({ ...EMPTY, district: district !== "전체" ? district : "" }); setShowAdd(true); }
  function openEdit(m) { setForm({ name: m.name, title: m.title, phone: m.phone, work_desc: m.work_desc || "", memo: m.memo || "", district: m.district || "", blog: m.blog || "", website: m.website || "" }); setEditMem(m); }

  async function addMember() {
    if (!form.name.trim()) return;
    // 무료 사용자 지역별 5명 제한
    const regionCount = members.filter(m => m.region === region).length;
    if (!isPremium && regionCount >= PREMIUM_FEATURES.allianceMax) {
      window.dispatchEvent(new CustomEvent("openDonateModal"));
      return;
    }
    const { data } = await supabase.from("alliance").insert([{ ...form, region, user_id: userId }]).select().single();
    if (data) setMembers(p => [data, ...p]);
    setShowAdd(false); setForm(EMPTY);
  }

  async function saveEdit() {
    if (!form.name.trim()) return;
    const updates = { name: form.name, title: form.title, phone: form.phone, work_desc: form.work_desc, memo: form.memo, district: form.district, blog: form.blog, website: form.website };
    const { data, error } = await supabase.from("alliance").update(updates).eq("id", editMem.id).select().single();
    if (error) { alert("저장 실패: " + error.message); return; }
    if (data) {
      setMembers(p => p.map(m => m.id === data.id ? data : m));
    } else {
      // data가 null이어도 로컬 상태는 업데이트
      setMembers(p => p.map(m => m.id === editMem.id ? { ...m, ...updates } : m));
    }
    setEditMem(null); setForm(EMPTY);
  }

  async function delMember(id) {
    await supabase.from("alliance").delete().eq("id", id);
    setMembers(p => p.filter(m => m.id !== id));
  }

  const titleColor = { "팀장": { bg: "#EFF6FF", color: "#2563EB" }, "사업자": { bg: "#FAF5FF", color: "#7C3AED" }, "실장": { bg: "#FFF7ED", color: "#EA580C" }, "기사": { bg: "#F0FDF4", color: "#16A34A" }, "기타": { bg: "#F3F4F6", color: "#6B7280" } };

  const showMemModal = showAdd || editMem;
  const memTitle = showAdd ? `연합 멤버 추가 — ${region}` : "연합 멤버 수정";
  const memSave = showAdd ? addMember : saveEdit;
  const memClose = () => { setShowAdd(false); setEditMem(null); setForm(EMPTY); };

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="🤝 연합" back onBack={() => setScreen("home")} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>
          <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: SUB }}>📍 지역 선택</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {REGIONS.map(r => {
              const count = members.filter(m => m.region === r).length;
              return (
                <button key={r} onClick={() => setRegion(r)} style={{ border: `2px solid ${region === r ? PRIMARY : BORDER}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", background: region === r ? PRIMARY : "#fff", color: region === r ? "#fff" : SUB }}>
                  {r}{count > 0 ? ` (${count})` : ""}
                </button>
              );
            })}
          </div>
          {DISTRICTS[region] && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 8px", color: SUB }}>🏘️ {region} 시/군/구</p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {districtList.map(d => {
                  const cnt = d === "전체" ? members.filter(m => m.region === region).length : members.filter(m => m.region === region && m.district === d).length;
                  return (
                    <button key={d} onClick={() => setDistrict(d)} style={{ border: `1.5px solid ${district === d ? PRIMARY : BORDER}`, borderRadius: 16, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: district === d ? PL : "#fff", color: district === d ? PRIMARY : SUB }}>
                      {d}{cnt > 0 ? ` ${cnt}` : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Card>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: TEXT }}>📍 {region} <span style={{ fontSize: 12, color: SUB }}>({filtered.length}명)</span></p>
          <button onClick={openAdd} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "7px 14px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ 추가</button>
        </div>

        {loading && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0 }}>로딩 중...</p></Card>}
        {!loading && filtered.length === 0 && (
          <Card style={{ textAlign: "center", padding: "30px 16px" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🤝</div>
            <div style={{ fontSize: 13, color: SUB }}>등록된 연합 멤버가 없어요<br />+ 추가 버튼을 눌러 등록해보세요</div>
          </Card>
        )}
        {filtered.map(m => {
          const tc = titleColor[m.title] || titleColor["기타"];
          return (
            <Card key={m.id} onClick={() => setViewMem(m)} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{m.name}</span>
                    <span style={{ padding: "2px 8px", fontSize: 10, borderRadius: 12, background: tc.bg, color: tc.color, fontWeight: 600 }}>{m.title}</span>
                    {m.district && <span style={{ padding: "2px 8px", fontSize: 10, borderRadius: 12, background: "#F3F4F6", color: "#4B5563", fontWeight: 600 }}>📍 {m.district}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: SUB, marginTop: 4 }}>📞 {m.phone}</div>
                </div>
              </div>
              {m.work_desc && (
                <div style={{ background: "#FAFAFA", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: SUB, margin: "0 0 4px" }}>공동작업 내용</p>
                  <p style={{ fontSize: 13, color: TEXT, margin: 0, lineHeight: 1.5 }}>{m.work_desc}</p>
                </div>
              )}
              {m.memo && <div style={{ fontSize: 11, color: SUB }}>💬 {m.memo}</div>}
              {(m.blog || m.website) && (
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {m.blog && <a href={m.blog} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#16A34A", textDecoration: "none", fontWeight: 600 }}>📝 블로그</a>}
                  {m.website && <a href={m.website} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>🌐 홈페이지</a>}
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {viewMem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setViewMem(null); }}>
          <div style={{ background: CARD, borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>👤 멤버 정보</span>
              <button onClick={() => setViewMem(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 20, background: PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 8px" }}>🤝</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>{viewMem.name}</div>
              <div style={{ fontSize: 12, color: SUB }}>{viewMem.title} · {viewMem.region} {viewMem.district || ""}</div>
            </div>
            <div style={{ background: BG, borderRadius: 12, padding: 14, marginBottom: 12 }}>
              {viewMem.phone && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>📞 연락처</span><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{viewMem.phone}</span></div>}
              {viewMem.biz_number && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>🏢 사업자번호</span><span style={{ fontSize: 13, color: TEXT }}>{viewMem.biz_number}</span></div>}
              {viewMem.district && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>📍 지역</span><span style={{ fontSize: 13, color: TEXT }}>{viewMem.region} {viewMem.district}</span></div>}
              {viewMem.work_desc && <div style={{ padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>🔧 공동작업</span><p style={{ fontSize: 13, color: TEXT, margin: "4px 0 0", lineHeight: 1.5 }}>{viewMem.work_desc}</p></div>}
              {viewMem.blog && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>📝 블로그</span><a href={viewMem.blog} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: PRIMARY, textDecoration: "none" }}>바로가기 →</a></div>}
              {viewMem.website && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>🌐 홈페이지</span><a href={viewMem.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: PRIMARY, textDecoration: "none" }}>바로가기 →</a></div>}
              {viewMem.memo && <div style={{ padding: "6px 0" }}><span style={{ fontSize: 13, color: SUB }}>💬 메모</span><p style={{ fontSize: 13, color: TEXT, margin: "4px 0 0", lineHeight: 1.5 }}>{viewMem.memo}</p></div>}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {viewMem.phone && <a href={`tel:${viewMem.phone}`} style={{ flex: 1, background: "#16A34A", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>📱 전화</a>}
              {viewMem.phone && <a href={`sms:${viewMem.phone}`} style={{ flex: 1, background: "#2563EB", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>💬 문자</a>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { openEdit(viewMem); setViewMem(null); }} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: "12px 0", background: CARD, cursor: "pointer", fontSize: 13, fontWeight: 700, color: TEXT }}>✏️ 수정</button>
              <button onClick={() => { delMember(viewMem.id); setViewMem(null); }} style={{ flex: 1, border: "1.5px solid #FECACA", borderRadius: 12, padding: "12px 0", background: "#FEF2F2", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#DC2626" }}>🗑️ 삭제</button>
            </div>
          </div>
        </div>
      )}
      {showMemModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) memClose(); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{memTitle}</span>
              <button onClick={memClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <Inp label="이름 *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="홍길동" />
            {DISTRICTS[region] && (
              <div style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>시/군/구 ({region})</label>
                <select value={form.district || ""} onChange={e => setForm(p => ({ ...p, district: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, background: "#fff" }}>
                  <option value="">선택 안 함</option>
                  {DISTRICTS[region].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            )}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>직함</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TITLES.map(t => (<button key={t} onClick={() => setForm(p => ({ ...p, title: t }))} style={{ border: `2px solid ${form.title === t ? PRIMARY : BORDER}`, borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", background: form.title === t ? PL : "#fff", color: form.title === t ? PRIMARY : SUB }}>{t}</button>))}
              </div>
            </div>
            <Inp label="연락처" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="010-0000-0000" type="tel" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>공동작업 내용</label>
              <textarea value={form.work_desc} onChange={e => setForm(p => ({ ...p, work_desc: e.target.value }))} placeholder="어떤 작업을 함께 할 수 있는지..." rows={3} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "none", lineHeight: 1.6 }} />
            </div>
            <Inp label="블로그" value={form.blog} onChange={e => setForm(p => ({ ...p, blog: e.target.value }))} placeholder="https://blog.naver.com/..." />
            <Inp label="홈페이지" value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} placeholder="https://..." />
            <Inp label="메모" value={form.memo} onChange={e => setForm(p => ({ ...p, memo: e.target.value }))} placeholder="경력, 활동 지역, 특이사항 등" />
            <button onClick={memSave} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AI 시뮬 ──
function AIScreen({ userId, setScreen, filmsCache, filmsLoaded }) {
  const [selectedWallpapers, setSelectedWallpapers] = useState([]); // 선택된 벽지 목록 (최대 3개)
  const [extra, setExtra] = useState("");
  const [dbFilms, setDbFilms] = useState([]);
  const [zoomFilm, setZoomFilm] = useState(null);
  const [catPopupId, setCatPopupId] = useState(null);
  const [brand, setBrand] = useState("LX하우시스");
  const [cat, setCat] = useState("전체");
  const [copied, setCopied] = useState(false);
  const BRANDS = ["LX하우시스", "개나리벽지", "신한벽지", "디아이디", "현대L&C", "Custom"];
  const allFilms = [...FILMS, ...dbFilms];
  const MAX_SELECT = 3;

  useEffect(() => {
    if (!filmsLoaded || !filmsCache) return;
    setDbFilms(filmsCache.map(f => ({ id: f.id, code: f.code, name: f.name, color: f.color || "#D0CBC4", cat: f.category, brand: f.brand, isNew: f.is_new, img_url: f.img_url })));
  }, [filmsCache, filmsLoaded]);

  function toggleWallpaper(f) {
    setSelectedWallpapers(p => {
      const exists = p.find(x => x.id === f.id);
      if (exists) return p.filter(x => x.id !== f.id);
      if (p.length >= MAX_SELECT) { alert(`벽지는 최대 ${MAX_SELECT}개까지 선택할 수 있어요.`); return p; }
      trackFilmUse(f);
      return [...p, f];
    });
  }

  // 벽지 이미지 다운로드
  function downloadImage(dataUrl, filename) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadAllWallpapers() {
    selectedWallpapers.forEach((f, i) => {
      if (f.img_url) {
        setTimeout(() => downloadImage(f.img_url, `벽지_${i + 1}_${f.code}.jpg`), i * 300);
      }
    });
  }

  // Gemini에 보낼 프롬프트 자동 생성
  function buildPrompt() {
    if (selectedWallpapers.length === 0) return "";
    const wallpaperDesc = selectedWallpapers.map((f, i) =>
      `${i + 1}번 이미지: ${f.brand} ${f.name || f.code} (${f.cat || ""})`
    ).join("\n");
    return `[사진] 이 실내 사진에 아래 벽지를 적용한 모습을 보여줘.

${wallpaperDesc}

- 원래 사진의 구도, 조명, 원근감은 그대로 유지해줘
- 벽면에만 벽지를 자연스럽게 입혀줘 (가구, 바닥, 창문 등은 그대로)
- 실제 도배 시공 후처럼 사실적으로 만들어줘${extra ? `\n\n추가 요청: ${extra}` : ""}`;
  }

  async function copyPrompt() {
    const text = buildPrompt();
    if (!text) { alert("먼저 벽지를 선택해주세요."); return; }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("복사에 실패했어요. 아래 텍스트를 직접 선택해서 복사해주세요.");
    }
  }

  function openGemini() {
    if (selectedWallpapers.length === 0) { alert("먼저 벽지를 선택해주세요."); return; }
    window.open("https://gemini.google.com/", "_blank");
  }

  const brandFilms = allFilms.filter(f => f.brand === brand);
  const cats = ["전체", ...Array.from(new Set(brandFilms.map(f => f.cat).filter(Boolean)))];
  const filmsToShow = cat === "전체" ? brandFilms : brandFilms.filter(f => f.cat === cat);

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="AI 벽지 시뮬레이터" back onBack={() => setScreen("home")} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>

        <Card style={{ background: "#EFF6FF", border: "1px solid #93C5FD" }}>
          <div style={{ fontSize: 12, color: "#1E40AF", fontWeight: 700, marginBottom: 4 }}>💡 사용 방법</div>
          <div style={{ fontSize: 11, color: "#1E40AF", lineHeight: 1.7 }}>
            1. 적용할 벽지 선택 (최대 {MAX_SELECT}개)<br/>
            2. 벽지 이미지 다운로드<br/>
            3. 아래 버튼으로 Gemini 열기<br/>
            4. Gemini에서 <b>갤러리의 시공 전 사진 + 방금 받은 벽지 사진</b>을 함께 업로드하고 프롬프트 붙여넣기<br/>
            5. 무료이고 한도 걱정 없이 사용할 수 있어요!
          </div>
        </Card>

        {/* 벽지 선택 */}
        <div style={{ height: 2, background: BORDER, margin: "6px 0" }} />
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: SUB }}>🎨 벽지 선택</p>
            <span style={{ fontSize: 11, color: SUB }}>{selectedWallpapers.length}/{MAX_SELECT}개 선택됨</span>
          </div>

          {/* 브랜드 + 카테고리 */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center", position: "relative" }}>
            <select value={brand} onChange={e => { setBrand(e.target.value); setCat("전체"); setCatPopupId(null); }} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "8px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: "#fff", color: BRAND_COLORS[brand] || PRIMARY, outline: "none" }}>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {cats.length > 1 && (
              <div style={{ flex: 1, position: "relative" }}>
                <button onClick={() => setCatPopupId(catPopupId === "main" ? null : "main")} style={{ width: "100%", border: `1.5px solid ${cat === "전체" ? BORDER : PRIMARY}`, borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: cat === "전체" ? "#fff" : PL, color: cat === "전체" ? SUB : PRIMARY, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                  <span>{cat}</span>
                  <span style={{ fontSize: 10 }}>{catPopupId === "main" ? "▲" : "▼"}</span>
                </button>
                {catPopupId === "main" && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, zIndex: 10, maxHeight: 240, overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    {cats.map(c => (
                      <button key={c} onClick={() => { setCat(c); setCatPopupId(null); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", fontSize: 12, fontWeight: cat === c ? 700 : 500, cursor: "pointer", background: cat === c ? PL : "transparent", color: cat === c ? PRIMARY : TEXT, border: "none", borderBottom: `1px solid ${BORDER}` }}>{c}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 벽지 그리드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 5 }}>
            {filmsToShow.map(f => {
              const on = selectedWallpapers.find(x => x.id === f.id);
              return (
                <button key={f.id} onClick={() => toggleWallpaper(f)} style={{ border: on ? `2.5px solid ${PRIMARY}` : `1.5px solid ${BORDER}`, borderRadius: 8, padding: 3, background: on ? PL : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
                  {on && <div style={{ position: "absolute", top: 2, right: 2, background: PRIMARY, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{selectedWallpapers.findIndex(x => x.id === f.id) + 1}</div>}
                  {f.img_url ? (
                    <img src={f.img_url} alt={f.code} style={{ width: "100%", aspectRatio: "1", borderRadius: 5, objectFit: "cover", border: "1px solid rgba(0,0,0,0.08)" }} />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: 5, background: f.color, border: "1px solid rgba(0,0,0,0.08)" }} />
                  )}
                  <span style={{ fontSize: 8, color: on ? PRIMARY : TEXT, fontWeight: on ? 700 : 500, textAlign: "center", lineHeight: 1.1, wordBreak: "break-all" }}>{f.code}</span>
                </button>
              );
            })}
          </div>
          {filmsToShow.length === 0 && <span style={{ fontSize: 12, color: SUB, padding: 10, display: "block", textAlign: "center" }}>등록된 벽지 없음</span>}
        </Card>

        {/* 선택된 벽지 목록 */}
        {selectedWallpapers.length > 0 && (
          <Card>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: SUB }}>✅ 선택된 벽지 ({selectedWallpapers.length}개)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedWallpapers.map((f, i) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, background: BG, borderRadius: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: PRIMARY, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  {f.img_url ? (
                    <img src={f.img_url} alt={f.code} style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: f.color, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.brand} · {f.code}</div>
                    <div style={{ fontSize: 11, color: SUB, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name || ""}</div>
                  </div>
                  <button onClick={() => toggleWallpaper(f)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>×</button>
                </div>
              ))}
            </div>
            <button onClick={downloadAllWallpapers} style={{ width: "100%", marginTop: 10, background: CARD, color: PRIMARY, border: `1.5px solid ${PRIMARY}`, borderRadius: 10, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📥 선택한 벽지 이미지 전체 저장</button>
          </Card>
        )}

        {/* 추가 요청 */}
        <div style={{ height: 2, background: BORDER, margin: "6px 0" }} />
        <Card>
          <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 8px", color: SUB }}>💬 추가 요청 (선택)</p>
          <textarea value={extra} onChange={e => setExtra(e.target.value)} placeholder="예: 밝은 톤으로, 현대적인 느낌으로..." rows={2} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "none" }} />
        </Card>

        {/* 프롬프트 미리보기 + 복사 */}
        {selectedWallpapers.length > 0 && (
          <Card style={{ background: "#FAFAFA" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: SUB, margin: 0 }}>📋 Gemini에 붙여넣을 프롬프트</p>
              <button onClick={copyPrompt} style={{ background: copied ? "#16A34A" : PL, color: copied ? "#fff" : PRIMARY, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{copied ? "✓ 복사됨" : "📋 복사"}</button>
            </div>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.7, whiteSpace: "pre-wrap", background: "#fff", padding: 10, borderRadius: 8, border: `1px solid ${BORDER}` }}>{buildPrompt()}</div>
          </Card>
        )}

        {/* Gemini 열기 버튼 */}
        <button onClick={openGemini} style={{ width: "100%", background: GRAD, color: "#fff", border: "none", borderRadius: 14, padding: "15px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          ✨ Gemini 앱에서 시뮬레이션하기 →
        </button>
        <div style={{ fontSize: 11, color: SUB, textAlign: "center", lineHeight: 1.6, padding: "0 10px" }}>
          Gemini가 열리면 <b>갤러리에서 시공 전 사진</b>과<br/>
          방금 받은 벽지 이미지를 함께 첨부하고<br/>
          복사한 프롬프트를 붙여넣어 주세요
        </div>
      </div>

      {zoomFilm && (
        <div onClick={() => setZoomFilm(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, padding: 20, maxWidth: 360, width: "100%", textAlign: "center" }}>
            <div style={{ width: "100%", paddingBottom: "100%", borderRadius: 14, background: zoomFilm.img_url ? `url(${zoomFilm.img_url}) center/cover` : zoomFilm.color, border: "1px solid rgba(0,0,0,0.08)", marginBottom: 14, position: "relative" }} />
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 4 }}>{zoomFilm.code}</div>
            <div style={{ fontSize: 14, color: SUB, marginBottom: 4 }}>{zoomFilm.name}</div>
            <div style={{ fontSize: 12, color: BORDER }}>{zoomFilm.brand} · {zoomFilm.cat}</div>
            <button onClick={() => setZoomFilm(null)} style={{ marginTop: 14, width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 견적 ──
function EstimateScreen({ clients, setClients, setScreen, userId, preClient, clearPreClient, isPremium, filmsCache, filmsLoaded }) {
  const [step, setStep] = useState(1);
  const [selC, setSelC] = useState(null);

  // ── 입력 방식: 실측(measure) or 평형대(pyeong) ──
  const [inputMode, setInputMode] = useState("pyeong"); // "pyeong" | "measure"
  const [pyeongInput, setPyeongInput] = useState("");     // 분양평수(대략 견적용)
  const [measureRooms, setMeasureRooms] = useState([{ id: 0, name: "", w: "", h: "" }]); // 실측: 공간별 가로×세로 리스트

  // ── 옵션 ──
  const [isExpanded, setIsExpanded] = useState(false);     // 베란다 확장형 (+15%)
  const [builtinRate, setBuiltinRate] = useState(0);        // 붙박이장 감산율 (0, 5, 8)
  const [ceilingIncluded, setCeilingIncluded] = useState(true); // 천장 포함 여부
  const [lossType, setLossType] = useState("무지");          // 무지/무늬/복층 손실률
  const LOSS_RATES = { "무지": 4, "무늬": 12, "복층": 22 }; // 대표값(중간값)

  // ── 벽지 종류 & 자재 단가 ──
  const WALLPAPER_TYPES = { "소폭합지": 2, "장폭": 5, "실크벽지": 5 }; // 시공평수 환산
  const [wallpaperType, setWallpaperType] = useState("실크벽지");
  const [matUnitPrice, setMatUnitPrice] = useState(""); // 롤당 자재단가

  // ── 인건비 (기공/준기공/조공, 다중 선택 + 인원수) ──
  const [laborItems, setLaborItems] = useState([{ id: 0, type: "", count: "", days: "" }]);
  const LABOR_TYPES = { "기공": 280000, "준기공": 200000, "조공": 100000 };

  // ── 부대비용 (자동계산 + 수동 조정 가능) ──
  const [useRemovalFee, setUseRemovalFee] = useState(true);   // 벽지제거비
  const [useWasteFee, setUseWasteFee] = useState(true);       // 폐기물처리비
  const [useGlueFee, setUseGlueFee] = useState(true);         // 풀기계사용료
  const [useMealFee, setUseMealFee] = useState(true);         // 식대

  const [extraItems, setExtraItems] = useState([]);
  const [feeRate, setFeeRate] = useState("");
  const [feeTarget, setFeeTarget] = useState("전체금액");
  const [vat, setVat] = useState("none");
  const [done, setDone] = useState(false);
  const [estimateId, setEstimateId] = useState(null); // 기존 견적 ID (수정 모드)
  const [loadingEst, setLoadingEst] = useState(false);
  const [workDate, setWorkDate] = useState(""); // 시공 확정 시 작업일
  const [dbFilms, setDbFilms] = useState([]);
  const [searchClient, setSearchClient] = useState(""); // 고객 검색
  const [filterRegion, setFilterRegion] = useState("전체"); // 지역 필터

  // 주소에서 지역(시/도) 추출
  const extractRegion = (addr) => {
    if (!addr) return "";
    const trimmed = addr.trim();
    const first = trimmed.split(/\s+/)[0] || "";
    // 서울특별시 → 서울, 경기도 → 경기, 인천광역시 → 인천 등
    return first.replace(/특별시|광역시|특별자치시|특별자치도|도$/g, "");
  };

  // 고객 목록에서 지역 추출 (중복 제거)
  const regionList = Array.from(new Set(
    clients.map(c => extractRegion(c.address)).filter(Boolean)
  )).sort();

  // 검색 + 지역 필터 적용
  const filteredClients = clients.filter(c => {
    const matchSearch = !searchClient ||
      c.name.toLowerCase().includes(searchClient.toLowerCase()) ||
      (c.phone || "").includes(searchClient) ||
      (c.address || "").toLowerCase().includes(searchClient.toLowerCase());
    const matchRegion = filterRegion === "전체" || extractRegion(c.address) === filterRegion;
    return matchSearch && matchRegion;
  });
  useEffect(() => {
    if (!filmsLoaded || !filmsCache) return;
    setDbFilms(filmsCache.map(f => ({ id: f.id, code: f.code, name: f.name, color: f.color || "#D0CBC4", cat: f.category, brand: f.brand })));
  }, [filmsCache, filmsLoaded]);
  const allFilms = [...FILMS, ...dbFilms];
  const BRANDS_LIST = ["LX하우시스", "개나리벽지", "신한벽지", "디아이디", "현대L&C", "Custom"];

  // 고객 상세에서 견적 작성 진입 시 해당 고객 자동 선택 (한 번만)
  useEffect(() => {
    if (preClient && !selC) {
      pickClient(preClient).then(() => setStep(2));
      // 사용 후 즉시 초기화 (다음 진입 시 자동 선택 안 되도록)
      if (clearPreClient) clearPreClient();
    }
    // eslint-disable-next-line
  }, [preClient]);

  // 완료 상태 잠금
  const isLocked = selC && selC.status === "완료";

  // ── 소수점 올림 유틸 (도배업 관행: 무조건 올림) ──
  const ceilUp = (n) => Math.ceil(n);

  // ── 실평수 계산 ──
  // 실측 모드: 각 공간(가로m × 세로m) / 3.24 를 모두 더함
  // 평형대 모드: 입력한 분양평수를 그대로 공급면적으로 사용
  // ※ 산출 시 소수점 이하는 무조건 올림
  const roomAreas = measureRooms.map(r => ((parseFloat(r.w) || 0) * (parseFloat(r.h) || 0)) / 3.24);
  const supplyPyeongRaw = inputMode === "measure"
    ? roomAreas.reduce((s, a) => s + a, 0)
    : (parseFloat(pyeongInput) || 0);
  const supplyPyeong = ceilUp(supplyPyeongRaw);

  // ── 도배 주문수량 계산 ──
  // 기본: 공급면적 × 2.5
  // 확장형: × 1.15 / 붙박이장: × (1 - rate) / 천장 미시공: 공급면적 × 1.5 로 대체
  let baseQty = ceilingIncluded ? supplyPyeong * 2.5 : supplyPyeong * 1.5;
  if (isExpanded) baseQty *= 1.15;
  if (builtinRate > 0) baseQty *= (1 - builtinRate / 100);
  // 벽지 손실률 가산
  const lossRate = LOSS_RATES[lossType] || 0;
  const orderQty = ceilUp(baseQty * (1 + lossRate / 100));

  // ── 도배지 필요량 (참고용: 실평수 × 3) ──
  const materialQty = supplyPyeong * 3;

  // ── 자재비 계산: 필요 롤 수 × 롤당 단가 ──
  // 필요 롤 수 = 도배 주문수량(평) ÷ 벽지종류별 롤당 시공평수 (소수점 올림)
  const rollCoverage = WALLPAPER_TYPES[wallpaperType] || 5;
  const neededRolls = ceilUp(orderQty / rollCoverage);
  const matTotal = neededRolls * (parseFloat(matUnitPrice) || 0);

  // ── 인건비 계산 ──
  const laborTotal = laborItems.reduce((s, l) => s + (parseInt(l.count) || 0) * (LABOR_TYPES[l.type] || 0) * (parseInt(l.days) || 1), 0);
  const totalWorkers = laborItems.reduce((s, l) => s + (parseInt(l.count) || 0), 0);

  // ── 부대비용 자동 계산 ──
  const removalFee = useRemovalFee ? ceilUp(supplyPyeong * 5000) : 0;
  const wasteFee = useWasteFee ? ceilUp(supplyPyeong * 3000) : 0;
  const glueFee = useGlueFee ? 20000 : 0;
  const mealFee = useMealFee ? totalWorkers * 10000 : 0;
  const extraAutoTotal = removalFee + wasteFee + glueFee + mealFee;

  const extraTotal = extraItems.reduce((s, e) => s + (parseInt(e.amount) || 0), 0) + extraAutoTotal;
  const subtotal = matTotal + laborTotal + extraTotal;
  const feeBase = feeTarget === "자재비" ? matTotal : feeTarget === "인건비" ? laborTotal : subtotal;
  const feeAmount = feeBase * ((parseFloat(feeRate) || 0) / 100);
  const beforeVat = subtotal + feeAmount;
  const vatAmount = vat === "separate" ? beforeVat * 0.1 : 0;
  const finalTotal = beforeVat + vatAmount;
  const customerUnit = supplyPyeong > 0 ? finalTotal / supplyPyeong : 0;

  function reset() {
    setDone(false); setStep(1); setSelC(null);
    setInputMode("pyeong"); setPyeongInput(""); setMeasureRooms([{ id: 0, name: "", w: "", h: "" }]);
    setIsExpanded(false); setBuiltinRate(0); setCeilingIncluded(true); setLossType("무지");
    setWallpaperType("실크벽지"); setMatUnitPrice("");
    setLaborItems([{ id: 0, type: "", count: "", days: "" }]);
    setUseRemovalFee(true); setUseWasteFee(true); setUseGlueFee(true); setUseMealFee(true);
    setExtraItems([]); setFeeRate(""); setFeeTarget("전체금액"); setVat("none");
    setEstimateId(null); setWorkDate("");
  }
  function handleFocus(e) { setTimeout(() => e.target.scrollIntoView({ behavior: "smooth", block: "center" }), 100); }

  // 고객 선택 시 기존 견적 자동 로드
  async function pickClient(c) {
    setSelC(c);
    setLoadingEst(true);
    try {
      const { data, error } = await supabase.from("estimates").select("*").eq("client_id", c.id).maybeSingle();
      if (!error && data && data.items) {
        setEstimateId(data.id);
        const d = data.items; // 도배 견적 데이터는 items 컬럼에 JSON으로 저장
        setInputMode(d.inputMode || "pyeong");
        setPyeongInput(d.pyeongInput || "");
        setMeasureRooms(Array.isArray(d.measureRooms) && d.measureRooms.length > 0 ? d.measureRooms : [{ id: 0, name: "", w: "", h: "" }]);
        setIsExpanded(!!d.isExpanded);
        setBuiltinRate(d.builtinRate || 0);
        setCeilingIncluded(d.ceilingIncluded !== false);
        setLossType(d.lossType || "무지");
        setWallpaperType(d.wallpaperType || "실크벽지");
        setMatUnitPrice(d.matUnitPrice || "");
        setUseRemovalFee(d.useRemovalFee !== false);
        setUseWasteFee(d.useWasteFee !== false);
        setUseGlueFee(d.useGlueFee !== false);
        setUseMealFee(d.useMealFee !== false);
        setLaborItems(Array.isArray(data.labor) ? data.labor : [{ id: 0, type: "", count: "", days: "" }]);
        setExtraItems(Array.isArray(data.extra_items) ? data.extra_items : []);
        setFeeRate(data.fee_rate ? String(data.fee_rate) : "");
        setFeeTarget(data.fee_target || "전체금액");
        setVat(data.vat || "none");
      } else {
        // 기존 견적 없으면 초기화
        setEstimateId(null);
        setInputMode("pyeong"); setPyeongInput(""); setMeasureRooms([{ id: 0, name: "", w: "", h: "" }]);
        setIsExpanded(false); setBuiltinRate(0); setCeilingIncluded(true); setLossType("무지");
        setWallpaperType("실크벽지"); setMatUnitPrice("");
        setLaborItems([{ id: 0, type: "", count: "", days: "" }]);
        setFeeRate(""); setVat("none");
      }
    } catch(e) {
      console.warn("견적 로드 실패", e);
    }
    setWorkDate(c.work_date || "");
    setLoadingEst(false);
  }

  // 견적 저장 (DB upsert)
  async function saveEstimate() {
    if (!selC || !userId) return null;
    if (selC.status === "완료") { return null; } // 완료된 견적은 저장 안 함
    const payload = {
      user_id: userId,
      client_id: selC.id,
      items: {
        inputMode, pyeongInput, measureRooms,
        isExpanded, builtinRate, ceilingIncluded, lossType,
        wallpaperType, matUnitPrice,
        useRemovalFee, useWasteFee, useGlueFee, useMealFee,
        supplyPyeong, orderQty, materialQty, neededRolls
      },
      labor: laborItems,
      extra_items: extraItems,
      fee_rate: parseFloat(feeRate) || 0,
      fee_target: feeTarget,
      vat: vat,
      total: Math.round(finalTotal),
      updated_at: new Date().toISOString()
    };
    try {
      if (estimateId) {
        const { data } = await supabase.from("estimates").update(payload).eq("id", estimateId).select().single();
        return data;
      } else {
        const { data } = await supabase.from("estimates").insert([payload]).select().single();
        if (data) setEstimateId(data.id);
        return data;
      }
    } catch(e) {
      console.warn("견적 저장 실패", e);
      return null;
    }
  }

  // 시공 확정: 고객 상태를 시공예정으로 + 작업일 업데이트
  async function confirmConstruction() {
    if (!selC) return;
    if (selC.status === "완료") { alert("이미 완료된 시공이에요."); return; }
    const dateToUse = workDate || selC.work_date || "";
    const { data } = await supabase.from("clients").update({
      status: "시공예정",
      work_date: dateToUse,
      budget: Math.round(finalTotal)
    }).eq("id", selC.id).select().single();
    if (data) {
      setClients(p => p.map(c => c.id === data.id ? data : c));
      setSelC(data);
      await saveEstimate();
      // 같은 고객의 기존 수동 일정(중복) 정리 — 이름이 포함된 일정 자동 삭제
      try {
        const { data: oldSched } = await supabase.from("schedules").select("*").eq("user_id", userId);
        if (oldSched && oldSched.length > 0) {
          const toDelete = oldSched.filter(s => s.title && s.title.includes(selC.name));
          for (const s of toDelete) {
            await supabase.from("schedules").delete().eq("id", s.id);
          }
        }
      } catch(e) { console.warn("기존 일정 정리 실패", e); }
      alert("✅ 시공예정으로 확정됐어요!\n일정에도 자동으로 추가됩니다.");
    }
  }
  function printPDF(date) {
    const vatLine = vat === "include" ? `<div style="display:flex;justify-content:space-between;font-size:12px;color:#6B7280"><span>부가세(VAT 10% 포함)</span><span>포함</span></div>` : vat === "separate" ? `<div style="display:flex;justify-content:space-between;font-size:12px;color:#6B7280"><span>부가세 별도 (+10%)</span><span>₩${Math.round(vatAmount).toLocaleString()}</span></div>` : "";
    const vatNote = vat === "include" ? "· 본 견적 금액은 부가세(VAT 10%)가 포함된 금액입니다." : vat === "separate" ? "· 본 견적 금액에 부가세(VAT 10%)가 별도로 추가됩니다." : "";
    const rows = [
      { label: "공급면적", value: `${supplyPyeong}평` },
      { label: "도배 주문수량", value: `${orderQty}평` },
      { label: `자재비 (${wallpaperType} ${neededRolls}롤 × ₩${Math.round(parseFloat(matUnitPrice) || 0).toLocaleString()})`, value: `₩${Math.round(matTotal).toLocaleString()}` },
      { label: "인건비", value: `₩${Math.round(laborTotal).toLocaleString()}` },
      { label: "부대비용 (제거비/폐기물/풀기계/식대)", value: `₩${Math.round(extraTotal).toLocaleString()}` },
    ];
    const rowsHtml = rows.map((r, i) => `<tr style="background:${i % 2 === 0 ? "#fff" : "#F8F9FF"}"><td style="padding:8px 10px;font-size:12px;border-bottom:1px solid #E5E7EB">${r.label}</td><td style="padding:8px 10px;font-size:12px;font-weight:700;color:#5561F5;text-align:right;border-bottom:1px solid #E5E7EB">${r.value}</td></tr>`).join("");
    const htmlContent = `<div style="font-family:sans-serif;padding:28px 24px;max-width:700px;margin:0 auto"><div style="display:flex;justify-content:space-between;margin-bottom:24px;padding-bottom:20px;border-bottom:2px solid #5561F5"><div><div style="font-size:22px;font-weight:800;color:#5561F5;margin-bottom:4px">도배 시공 견적서</div><div style="font-size:12px;color:#6B7280">발행일: ${date}</div></div><div style="text-align:right"><div style="font-size:14px;font-weight:700">인테리어 벽지 전문점</div></div></div><div style="background:#F8F9FF;border-radius:12px;padding:14px 16px;margin-bottom:20px"><div style="font-size:12px;font-weight:700;color:#5561F5;margin-bottom:10px">고객 정보</div><table style="width:100%;font-size:12px;border-collapse:collapse"><tr><td style="color:#6B7280;padding:2px 0;width:70px">고객명</td><td style="font-weight:700">${selC ? selC.name : ""}</td></tr><tr><td style="color:#6B7280;padding:2px 0">연락처</td><td>${selC ? selC.phone : ""}</td></tr><tr><td style="color:#6B7280;padding:2px 0">주소</td><td>${selC ? selC.address : ""}</td></tr><tr><td style="color:#6B7280;padding:2px 0">작업일</td><td>${selC ? (selC.work_date || "미정") : ""}</td></tr></table></div><table style="width:100%;border-collapse:collapse;margin-bottom:20px"><thead><tr style="background:#5561F5"><th style="padding:8px 10px;font-size:11px;color:#fff;text-align:left">항목</th><th style="padding:8px 10px;font-size:11px;color:#fff;text-align:right">금액</th></tr></thead><tbody>${rowsHtml}</tbody></table><div style="background:#F8F9FF;border-radius:8px;padding:14px 16px;margin-bottom:20px">${vatLine}<div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:#5561F5;border-top:1px solid #E5E7EB;margin-top:8px;padding-top:8px"><span>최종 견적 금액</span><span>₩${Math.round(finalTotal).toLocaleString()}</span></div></div><div style="border-top:1px solid #E5E7EB;padding-top:14px;font-size:11px;color:#6B7280;line-height:1.8">· 본 견적서의 유효기간은 발행일로부터 30일입니다.<br>· 자재비 및 시공 범위에 따라 최종 금액이 변경될 수 있습니다.</div><div style="color:transparent;font-size:1px;position:absolute;left:-9999px;user-select:none" aria-hidden="true">WP-2026-tacita797-ORIGINAL ${Date.now()}</div>${vatNote ? "<br>" + vatNote : ""}</div></div>`;
    return htmlContent;
  }
  function downloadEstimatePDF(date) {
    const content = printPDF(date);
    const el = document.createElement("div");
    el.innerHTML = content;
    document.body.appendChild(el);
    const loadH2P = (cb) => { if (window.html2pdf) { cb(); return; } const s = document.createElement("script"); s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"; s.onload = cb; document.head.appendChild(s); };
    loadH2P(() => {
      html2pdf().set({ margin: 10, filename: `견적서_${selC ? selC.name : "고객"}_${date}.pdf`, image: { type: "jpeg", quality: 0.95 }, html2canvas: { scale: 2 }, jsPDF: { unit: "㎜", format: "a4", orientation: "portrait" } }).from(el).save().then(() => { document.body.removeChild(el); });
    });
  }
  function printEstimate(date) {
    const content = printPDF(date);
    const w = window.open("", "_blank");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="author" content="tacita797"><meta name="copyright" content="Wallpaper Pro by tacita797 2026"><title>견적서</title><style>*{margin:0;padding:0;box-sizing:border-box}@media print{@page{size:A4 portrait;margin:15mm}}</style></head><body>${content}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 300);
  }
  if (done) {
    const date = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
    return (
      <div style={{ background: BG, minHeight: "100%" }}>
        <Header title="견적서" back onBack={() => setScreen("home")} />
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ textAlign: "center", padding: "28px 16px", background: GRAD }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>견적서가 완성됐어요!</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{selC ? selC.name : ""} 고객 · ₩{Math.round(finalTotal).toLocaleString()}</div>
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>발행일</span><span style={{ fontSize: 13, fontWeight: 600 }}>{date}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${BORDER}` }}><span style={{ fontSize: 13, color: SUB }}>고객명</span><span style={{ fontSize: 13, fontWeight: 700 }}>{selC ? selC.name : ""}</span></div>
            <div style={{ fontSize: 12, color: SUB, lineHeight: 1.9 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>공급면적</span><span>{supplyPyeong}평</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>도배 주문수량</span><span>{orderQty}평</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>자재비 ({wallpaperType} {neededRolls}롤)</span><span>₩{Math.round(matTotal).toLocaleString()}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>인건비</span><span>₩{Math.round(laborTotal).toLocaleString()}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>부대비용</span><span>₩{Math.round(extraTotal).toLocaleString()}</span></div>
            </div>
            <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 6, paddingTop: 10 }}>
              {vat === "include" && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 12, color: SUB }}>부가세 10% 포함</span><span style={{ fontSize: 12, color: SUB }}>포함</span></div>}
              {vat === "separate" && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 12, color: SUB }}>부가세 별도 (+10%)</span><span style={{ fontSize: 12, color: SUB }}>₩{Math.round(vatAmount).toLocaleString()}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700 }}>최종 견적</span><span style={{ fontSize: 20, fontWeight: 800, color: PRIMARY }}>₩{Math.round(finalTotal).toLocaleString()}</span></div>
            </div>
          </Card>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => printEstimate(date)} style={{ flex: 1, background: PRIMARY, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>🖨️ 인쇄</button>
            <button onClick={() => downloadEstimatePDF(date)} style={{ flex: 1, background: "#059669", color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>📥 PDF 저장</button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={reset} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 14, background: CARD, cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>새 견적</button>
            <button onClick={() => setScreen("home")} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 14, background: CARD, cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>🏠 홈으로</button>
          </div>
        </div>
      </div>
    );
  }
  if (!clients || clients.length === 0) {
    return (<div style={{ background: BG, minHeight: "100%" }}><Header title="견적 작성" back onBack={() => setScreen("home")} /><div style={{ padding: 40, textAlign: "center" }}><div style={{ fontSize: 40, marginBottom: 16 }}>👤</div><div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 8 }}>등록된 고객이 없어요</div><button onClick={() => setScreen("clients")} style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: 14, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>고객 등록하러 가기</button></div></div>);
  }
  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="견적 작성" back onBack={() => setScreen("home")} />
      <div style={{ background: "#fff", padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 8 }}>
        {["고객 선택", "원가 입력", "견적 확인"].map((s, i) => (
          <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: step >= i + 1 ? PRIMARY : BG, color: step >= i + 1 ? "#fff" : SUB }}>{i + 1}</div>
            <span style={{ fontSize: 10, color: step === i + 1 ? PRIMARY : SUB, fontWeight: step === i + 1 ? 700 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {step === 1 && (
          <div>
            <Card>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 12px", color: TEXT }}>📋 견적서 작성</p>
              <div style={{ position: "relative", marginBottom: 10 }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: SUB }}>🔍</span>
                <input
                  value={searchClient}
                  onChange={e => setSearchClient(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") e.preventDefault(); }}
                  placeholder="고객명 · 전화번호 · 주소로 검색"
                  style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 12px 10px 36px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT }}
                />
              </div>
              {regionList.length > 0 && (
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 10 }}>
                  <button onClick={() => setFilterRegion("전체")} style={{ border: "none", borderRadius: 20, padding: "5px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: filterRegion === "전체" ? PRIMARY : BG, color: filterRegion === "전체" ? "#fff" : SUB }}>전체</button>
                  {regionList.map(r => (
                    <button key={r} onClick={() => setFilterRegion(r)} style={{ border: "none", borderRadius: 20, padding: "5px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: filterRegion === r ? PRIMARY : BG, color: filterRegion === r ? "#fff" : SUB }}>{r}</button>
                  ))}
                </div>
              )}
              <button onClick={() => { setSelC({ id: "_new", name: "새 고객", phone: "", address: "" }); setStep(2); }} style={{ width: "100%", border: `2px dashed ${PRIMARY}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", textAlign: "center", background: "#fff", marginBottom: 10, color: PRIMARY, fontSize: 13, fontWeight: 700 }}>
                + 새 견적 작성 (고객 미선택)
              </button>
              <p style={{ fontSize: 11, fontWeight: 600, color: SUB, marginBottom: 6 }}>👤 고객관리에서 선택 ({filteredClients.length}명)</p>
              {filteredClients.length === 0 && (
                <div style={{ textAlign: "center", padding: 20, color: SUB, fontSize: 12 }}>
                  {searchClient || filterRegion !== "전체" ? "검색 결과가 없어요" : "등록된 고객이 없어요"}
                </div>
              )}
              {filteredClients.map(c => { const on = selC && selC.id === c.id; return (<button key={c.id} onClick={() => pickClient(c)} style={{ width: "100%", border: on ? `2px solid ${PRIMARY}` : `2px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", textAlign: "left", background: on ? PL : "#fff", marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: on ? PRIMARY : TEXT }}>{c.name}</span><Badge status={c.status} /></div><div style={{ fontSize: 12, color: SUB, marginTop: 3 }}>{c.phone}{c.address ? ` · ${c.address}` : ""}</div>{on && estimateId && <div style={{ fontSize: 11, color: "#16A34A", marginTop: 4, fontWeight: 600 }}>📋 기존 견적이 있어요 — 불러왔습니다</div>}{on && loadingEst && <div style={{ fontSize: 11, color: SUB, marginTop: 4 }}>견적 불러오는 중...</div>}</button>); })}
            </Card>
            <button onClick={() => { if (selC) setStep(2); }} disabled={!selC} style={{ width: "100%", marginTop: 12, background: selC ? PRIMARY : BORDER, color: selC ? "#fff" : SUB, border: "none", borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 700, cursor: selC ? "pointer" : "not-allowed" }}>다음 →</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <Card style={{ background: PL }}><div style={{ fontSize: 13, fontWeight: 700, color: PRIMARY }}>👤 {selC ? selC.name : ""}</div></Card>
            {isLocked && (
              <Card style={{ marginTop: 12, background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>🔒 완료된 시공이에요</div>
                <div style={{ fontSize: 11, color: "#991B1B", lineHeight: 1.5 }}>이미 시공이 완료된 견적은 수정할 수 없어요. 보기만 가능합니다.</div>
              </Card>
            )}

            {/* 면적 입력 방식 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8 }}>📐 면적 입력</label>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <button onClick={() => setInputMode("pyeong")} style={{ flex: 1, border: `2px solid ${inputMode === "pyeong" ? PRIMARY : BORDER}`, borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", background: inputMode === "pyeong" ? PL : "#fff", color: inputMode === "pyeong" ? PRIMARY : SUB }}>평형대 (대략)</button>
                <button onClick={() => setInputMode("measure")} style={{ flex: 1, border: `2px solid ${inputMode === "measure" ? PRIMARY : BORDER}`, borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", background: inputMode === "measure" ? PL : "#fff", color: inputMode === "measure" ? PRIMARY : SUB }}>실측 (정확)</button>
              </div>
              {inputMode === "pyeong" ? (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: SUB, display: "block", marginBottom: 4 }}>분양평수</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <NumFmt value={pyeongInput} onChange={e => setPyeongInput(e.target.value)} placeholder="32" style={{ flex: 1 }} />
                    <span style={{ fontSize: 13, color: SUB, flexShrink: 0 }}>평</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: SUB, display: "block", marginBottom: 8 }}>공간별 실측 (가로 × 세로)</label>
                  {measureRooms.map((room, i) => (
                    <div key={room.id} style={{ background: BG, borderRadius: 10, padding: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        <input
                          value={room.name}
                          onChange={e => setMeasureRooms(p => p.map(r => r.id === room.id ? { ...r, name: e.target.value } : r))}
                          placeholder={`공간 이름 (예: 안방)`}
                          style={{ flex: 1, minWidth: 0, border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "8px 10px", fontSize: 12, outline: "none", color: TEXT, boxSizing: "border-box" }}
                        />
                        {measureRooms.length > 1 && (
                          <button onClick={() => setMeasureRooms(p => p.filter(r => r.id !== room.id))} style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 8, padding: "0 10px", fontSize: 13, cursor: "pointer", flexShrink: 0 }}>×</button>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <DecFmt value={room.w} onChange={e => setMeasureRooms(p => p.map(r => r.id === room.id ? { ...r, w: e.target.value } : r))} placeholder="가로" style={{ flex: 1, minWidth: 0, textAlign: "center" }} />
                        <span style={{ color: SUB, fontSize: 13, flexShrink: 0 }}>×</span>
                        <DecFmt value={room.h} onChange={e => setMeasureRooms(p => p.map(r => r.id === room.id ? { ...r, h: e.target.value } : r))} placeholder="세로" style={{ flex: 1, minWidth: 0, textAlign: "center" }} />
                        <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 700, flexShrink: 0, minWidth: 40, textAlign: "right" }}>{roomAreas[i] > 0 ? roomAreas[i].toFixed(1) + "평" : ""}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setMeasureRooms(p => [...p, { id: Date.now(), name: "", w: "", h: "" }])} style={{ width: "100%", border: `1.5px dashed ${PRIMARY}`, borderRadius: 10, padding: "9px 0", background: "#fff", color: PRIMARY, fontSize: 12, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>+ 공간 추가</button>
                  {supplyPyeong > 0 && (
                    <div style={{ textAlign: "right", fontSize: 13, fontWeight: 700, color: PRIMARY, padding: "6px 2px" }}>합계: {supplyPyeong}평</div>
                  )}
                </div>
              )}
            </Card>

            {/* 옵션 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8 }}>⚙️ 옵션</label>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, padding: "8px 10px", background: BG, borderRadius: 8 }}>
                <span style={{ fontSize: 12, color: TEXT }}>베란다 확장형 (+15%)</span>
                <button onClick={() => setIsExpanded(p => !p)} style={{ width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", background: isExpanded ? PRIMARY : BORDER, position: "relative" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: isExpanded ? 20 : 2, transition: "left 0.15s" }} />
                </button>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, color: TEXT, display: "block", marginBottom: 6 }}>붙박이장 감산</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 5, 8].map(v => (
                    <button key={v} onClick={() => setBuiltinRate(v)} style={{ flex: 1, border: `2px solid ${builtinRate === v ? PRIMARY : BORDER}`, borderRadius: 8, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", background: builtinRate === v ? PL : "#fff", color: builtinRate === v ? PRIMARY : SUB }}>{v === 0 ? "없음" : `-${v}%`}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: BG, borderRadius: 8 }}>
                <span style={{ fontSize: 12, color: TEXT }}>천장 포함 시공</span>
                <button onClick={() => setCeilingIncluded(p => !p)} style={{ width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", background: ceilingIncluded ? PRIMARY : BORDER, position: "relative" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: ceilingIncluded ? 20 : 2, transition: "left 0.15s" }} />
                </button>
              </div>
            </Card>

            {/* 벽지 종류 & 손실률 & 단가 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8 }}>🧻 벽지 자재</label>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>벽지 종류</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {Object.keys(WALLPAPER_TYPES).map(t => (
                    <button key={t} onClick={() => setWallpaperType(t)} style={{ flex: 1, border: `2px solid ${wallpaperType === t ? PRIMARY : BORDER}`, borderRadius: 8, padding: "7px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", background: wallpaperType === t ? PL : "#fff", color: wallpaperType === t ? PRIMARY : SUB }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: SUB, display: "block", marginBottom: 6 }}>손실률 (벽지 무늬)</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {Object.keys(LOSS_RATES).map(t => (
                    <button key={t} onClick={() => setLossType(t)} style={{ flex: 1, border: `2px solid ${lossType === t ? PRIMARY : BORDER}`, borderRadius: 8, padding: "7px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", background: lossType === t ? PL : "#fff", color: lossType === t ? PRIMARY : SUB }}>{t} (+{LOSS_RATES[t]}%)</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: SUB, display: "block", marginBottom: 4 }}>롤당 자재단가</label>
                <NumFmt value={matUnitPrice} onChange={e => setMatUnitPrice(e.target.value)} placeholder="30,000" style={{ width: "100%" }} />
              </div>
              {supplyPyeong > 0 && (
                <div style={{ marginTop: 10, padding: 10, background: BG, borderRadius: 8, fontSize: 11, color: SUB, lineHeight: 1.8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>공급면적</span><span style={{ fontWeight: 700, color: TEXT }}>{supplyPyeong}평</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>도배 주문수량 (손실률 포함)</span><span style={{ fontWeight: 700, color: PRIMARY }}>{orderQty}평</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>{wallpaperType} 1롤 시공평수</span><span>{rollCoverage}평/롤</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>필요 롤 수</span><span style={{ fontWeight: 700, color: PRIMARY }}>{neededRolls}롤</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>도배지 필요량 (참고)</span><span>{materialQty.toFixed(1)}평</span></div>
                </div>
              )}
              {matTotal > 0 && <div style={{ fontSize: 11, color: PRIMARY, marginTop: 6, textAlign: "right", fontWeight: 700 }}>자재비: ₩{Math.round(matTotal).toLocaleString()}</div>}
            </Card>

            {/* 인건비 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 10 }}>👷 인건비</label>
              {Object.keys(LABOR_TYPES).map(type => {
                const item = laborItems.find(l => l.type === type) || { type, count: "", days: "" };
                const updLabor = (field, val) => {
                  setLaborItems(p => {
                    const exists = p.find(l => l.type === type);
                    if (exists) {
                      return p.map(l => l.type === type ? { ...l, [field]: val } : l);
                    } else {
                      return [...p.filter(l => l.type), { id: Date.now(), type, count: "", days: "", [field]: val }];
                    }
                  });
                };
                const amount = (parseInt(item.count) || 0) * (LABOR_TYPES[type] || 0) * (parseInt(item.days) || 1);
                return (
                  <div key={type} style={{ background: BG, borderRadius: 8, padding: 10, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ flex: 2, fontSize: 12, fontWeight: 700, color: TEXT }}>{type} <span style={{ fontWeight: 400, color: SUB, fontSize: 11 }}>(₩{LABOR_TYPES[type].toLocaleString()}/일)</span></span>
                      <input value={item.count} onChange={e => updLabor("count", e.target.value)} placeholder="명" type="number" style={{ width: 50, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "7px 2px", fontSize: 12, outline: "none", textAlign: "center", flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: SUB, flexShrink: 0 }}>명</span>
                      <input value={item.days} onChange={e => updLabor("days", e.target.value)} placeholder="1" type="number" style={{ width: 50, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "7px 2px", fontSize: 12, outline: "none", textAlign: "center", flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: SUB, flexShrink: 0 }}>일</span>
                    </div>
                    {parseInt(item.count) > 0 && <div style={{ textAlign: "right", fontSize: 11, fontWeight: 600, color: PRIMARY, marginTop: 4 }}>{item.count}명 × {item.days || 1}일 × ₩{LABOR_TYPES[type].toLocaleString()} = ₩{amount.toLocaleString()}</div>}
                  </div>
                );
              })}
              {laborTotal > 0 && <div style={{ textAlign: "right", fontSize: 12, fontWeight: 700, color: PRIMARY, marginTop: 4 }}>인건비 합계: ₩{laborTotal.toLocaleString()} ({totalWorkers}명)</div>}
            </Card>

            {/* 부대비용 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8 }}>🧾 부대비용</label>
              {[
                ["벽지제거비 (공급면적×5,000원)", removalFee, useRemovalFee, setUseRemovalFee],
                ["폐기물처리비 (공급면적×3,000원)", wasteFee, useWasteFee, setUseWasteFee],
                ["풀기계사용료 (고정)", glueFee, useGlueFee, setUseGlueFee],
                [`식대 (${totalWorkers}명×10,000원)`, mealFee, useMealFee, setUseMealFee],
              ].map(([label, amount, use, setUse]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: BG, borderRadius: 8, marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 12, color: TEXT }}>{label}</div>
                    <div style={{ fontSize: 11, color: PRIMARY, fontWeight: 700 }}>₩{Math.round(amount).toLocaleString()}</div>
                  </div>
                  <button onClick={() => setUse(p => !p)} style={{ width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer", background: use ? PRIMARY : BORDER, position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: use ? 18 : 2, transition: "left 0.15s" }} />
                  </button>
                </div>
              ))}
              <div style={{ textAlign: "right", fontSize: 12, fontWeight: 700, color: PRIMARY, marginTop: 4 }}>부대비용 합계: ₩{Math.round(extraTotal).toLocaleString()}</div>
            </Card>

            {/* 기타 항목 */}
            <button onClick={() => setExtraItems(p => [...p, { id: Date.now(), desc: "", amount: "" }])} style={{ width: "100%", marginTop: 6, border: `2px dashed ${BORDER}`, borderRadius: 14, padding: 13, background: "#fff", cursor: "pointer", fontSize: 13, color: SUB, fontWeight: 600 }}>+ 기타 항목 추가</button>
            {extraItems.length > 0 && (
              <Card style={{ marginTop: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8 }}>📦 기타 항목</label>
                {extraItems.map(e => (
                  <div key={e.id} style={{ background: BG, borderRadius: 8, padding: 8, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      <input value={e.desc} onChange={ev => setExtraItems(p => p.map(x => x.id === e.id ? { ...x, desc: ev.target.value } : x))} placeholder="내용" style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "7px 8px", fontSize: 12, outline: "none", color: TEXT }} />
                      <button onClick={() => setExtraItems(p => p.filter(x => x.id !== e.id))} style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 8px", fontSize: 12, cursor: "pointer", flexShrink: 0 }}>×</button>
                    </div>
                    <NumFmt value={e.amount} onChange={ev => setExtraItems(p => p.map(x => x.id === e.id ? { ...x, amount: ev.target.value } : x))} placeholder="금액" style={{ width: "100%" }} />
                  </div>
                ))}
              </Card>
            )}

            {/* 수수료 / 부가세 */}
            <Card style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: TEXT, display: "block", marginBottom: 6 }}>수수료</label>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {["자재비", "인건비", "전체금액"].map(t => (
                  <button key={t} onClick={() => setFeeTarget(t)} style={{ flex: 1, border: `2px solid ${feeTarget === t ? PRIMARY : BORDER}`, borderRadius: 8, padding: "7px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", background: feeTarget === t ? PL : CARD, color: feeTarget === t ? PRIMARY : SUB }}>{t}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <NumFmt value={feeRate} onChange={e => setFeeRate(e.target.value)} placeholder="수수료 %" style={{ flex: 1 }} />
                <span style={{ fontSize: 12, color: SUB, flexShrink: 0 }}>%</span>
              </div>
              {feeAmount > 0 && <div style={{ fontSize: 11, color: PRIMARY, marginTop: 4, textAlign: "right" }}>{feeTarget} ₩{Math.round(feeBase).toLocaleString()} × {feeRate}% = ₩{Math.round(feeAmount).toLocaleString()}</div>}
              <label style={{ fontSize: 12, fontWeight: 700, color: TEXT, display: "block", marginBottom: 8, marginTop: 10 }}>부가세 (10%)</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["none", "해당없음"], ["include", "포함 (합산)"], ["separate", "별도 (+10%)"]].map(([v, l]) => (
                  <button key={v} onClick={() => setVat(v)} style={{ flex: 1, border: `2px solid ${vat === v ? PRIMARY : BORDER}`, borderRadius: 10, padding: "8px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", background: vat === v ? PL : "#fff", color: vat === v ? PRIMARY : SUB }}>{l}</button>
                ))}
              </div>
            </Card>

            {/* 원가 요약 */}
            {(matTotal > 0 || laborTotal > 0) && (
              <Card style={{ marginTop: 12, background: "#FAFAFA" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: SUB, margin: "0 0 8px" }}>💡 원가 요약 (고객 비공개)</p>
                <div style={{ fontSize: 12, color: SUB, lineHeight: 1.9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>자재비 합계</span><span>₩{Math.round(matTotal).toLocaleString()}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>인건비</span><span>₩{Math.round(laborTotal).toLocaleString()}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>부대비용</span><span>₩{Math.round(extraTotal).toLocaleString()}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>소계</span><span>₩{Math.round(subtotal).toLocaleString()}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>수수료 ({parseFloat(feeRate) || 0}%)</span><span>₩{Math.round(feeAmount).toLocaleString()}</span></div>
                  {vat === "separate" && <div style={{ display: "flex", justifyContent: "space-between" }}><span>부가세 별도 (+10%)</span><span>₩{Math.round(vatAmount).toLocaleString()}</span></div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: TEXT, borderTop: `1px solid ${BORDER}`, marginTop: 4, paddingTop: 4 }}><span>최종</span><span>₩{Math.round(finalTotal).toLocaleString()}</span></div>
                </div>
              </Card>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 14, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>← 이전</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, background: PRIMARY, color: "#fff", border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>견적 확인 →</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <Card style={{ background: GRAD }}>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 4 }}>총 견적 금액</div>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>₩{Math.round(finalTotal).toLocaleString()}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>공급면적 {supplyPyeong}평 · 도배 주문수량 {orderQty}평</div>
            </Card>
            <Card style={{ marginTop: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 12px", color: SUB }}>📋 고객 견적서 미리보기</p>
              <div style={{ fontSize: 13, lineHeight: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: SUB }}>공급면적</span><span style={{ fontWeight: 600 }}>{supplyPyeong}평</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: SUB }}>도배 주문수량</span><span style={{ fontWeight: 600 }}>{orderQty}평</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: SUB }}>자재비 ({wallpaperType} {neededRolls}롤)</span><span style={{ fontWeight: 700, color: PRIMARY }}>₩{Math.round(matTotal).toLocaleString()}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: SUB }}>인건비</span><span style={{ fontWeight: 700, color: PRIMARY }}>₩{Math.round(laborTotal).toLocaleString()}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: SUB }}>부대비용</span><span style={{ fontWeight: 700, color: PRIMARY }}>₩{Math.round(extraTotal).toLocaleString()}</span></div>
              </div>
            </Card>
            <Card style={{ marginTop: 12, background: "#FFF7ED", border: "1px solid #FED7AA" }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: "#EA580C" }}>📅 시공 일정 (확정 시)</p>
              <input type="date" value={workDate} onChange={e => setWorkDate(e.target.value)} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, marginBottom: 8 }} />
              <div style={{ fontSize: 11, color: SUB, lineHeight: 1.5 }}>확정하면 고객 상태가 <b>시공예정</b>으로 바뀌고, 위 날짜로 일정에 자동 등록돼요.</div>
            </Card>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 14, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, color: SUB }}>← 수정</button>
              <button onClick={async () => { await saveEstimate(); setDone(true); }} style={{ flex: 2, background: GRAD, color: "#fff", border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>견적서 보기 📄</button>
            </div>
            <button onClick={async () => { await confirmConstruction(); setDone(true); }} style={{ width: "100%", marginTop: 10, background: "#16A34A", color: "#fff", border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>✅ 시공 확정 (시공예정으로 등록)</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 일정 관리 ──
function ScheduleScreen({ clients, setClients, userId, setScreen }) {
  const now = new Date();
  const [cur, setCur] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selDay, setSelDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [memos, setMemos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState("schedule"); // "schedule" | "todo" | "memo"
  const [editEv, setEditEv] = useState(null);
  const EMPTY_FORM = { title: "", date: "", time: "", notes: "" };
  const [form, setForm] = useState(EMPTY_FORM);
  const yr = cur.getFullYear(), mo = cur.getMonth();
  const dim = new Date(yr, mo + 1, 0).getDate(), fd = new Date(yr, mo, 1).getDay();
  const ms = cur.toLocaleDateString("ko-KR", { year: "numeric", month: "long" });
  const selDayStr = selDay ? `${yr}-${String(mo + 1).padStart(2, "0")}-${String(selDay).padStart(2, "0")}` : "";

  useEffect(() => { loadEvents(); loadTodosMemos(); }, []);
  async function loadEvents() {
    const { data } = await supabase.from("schedules").select("*").eq("user_id", userId).order("date", { ascending: true });
    setEvents(data || []);
  }
  async function loadTodosMemos() {
    const { data: td } = await supabase.from("todos").select("*").eq("user_id", userId);
    const { data: mm } = await supabase.from("memos").select("*").eq("user_id", userId);
    setTodos(td || []);
    setMemos(mm || []);
  }

  const evMap = {};
  clients.forEach(c => {
    if (!c.work_date) return;
    const d = new Date(c.work_date);
    if (d.getFullYear() !== yr || d.getMonth() !== mo) return;
    const day = d.getDate();
    if (!evMap[day]) evMap[day] = [];
    evMap[day].push({ id: "c" + c.id, clientId: c.id, title: "[시공] " + c.name, time: "", notes: c.notes || "", alarm: "none", color: "#EA580C", type: "client" });
  });
  events.forEach(e => {
    if (!e.date) return;
    const d = new Date(e.date);
    if (d.getFullYear() !== yr || d.getMonth() !== mo) return;
    const day = d.getDate();
    if (!evMap[day]) evMap[day] = [];
    evMap[day].push({ ...e, color: PRIMARY, type: "custom" });
  });
  todos.filter(t => t.date).forEach(t => {
    const d = new Date(t.date);
    if (d.getFullYear() !== yr || d.getMonth() !== mo) return;
    const day = d.getDate();
    if (!evMap[day]) evMap[day] = [];
    evMap[day].push({ id: "t" + t.id, title: (t.done ? "✅ " : "☐ ") + t.text, color: t.done ? "#9CA3AF" : "#16A34A", type: "todo", done: t.done });
  });
  memos.filter(m => m.date).forEach(m => {
    const d = new Date(m.date);
    if (d.getFullYear() !== yr || d.getMonth() !== mo) return;
    const day = d.getDate();
    if (!evMap[day]) evMap[day] = [];
    evMap[day].push({ id: "m" + m.id, title: "📝 " + m.title, color: "#F59E0B", type: "memo" });
  });
  const selEvs = selDay ? (evMap[selDay] || []) : [];

  function openAdd(type = "schedule") { setAddType(type); setForm({ ...EMPTY_FORM, date: selDayStr }); setShowAdd(true); }
  function openEdit(e) { setForm({ title: e.title || "", date: e.date || selDayStr, time: e.time || "", notes: e.notes || "" }); setEditEv(e); }

  async function addItem() {
    if (!form.title.trim()) return;
    if (addType === "schedule") {
      const { data } = await supabase.from("schedules").insert([{ title: form.title, date: form.date, time: form.time, notes: form.notes, user_id: userId }]).select().single();
      if (data) setEvents(p => [...p, data]);
    } else if (addType === "todo") {
      const { data } = await supabase.from("todos").insert([{ text: form.title, date: form.date, notes: form.notes, done: false, user_id: userId }]).select().single();
      if (data) setTodos(p => [...p, data]);
    } else if (addType === "memo") {
      const { data } = await supabase.from("memos").insert([{ title: form.title, date: form.date, content: form.notes, user_id: userId }]).select().single();
      if (data) setMemos(p => [...p, data]);
    }
    setShowAdd(false); setForm(EMPTY_FORM);
  }

  async function saveEdit() {
    if (!form.title.trim()) return;
    if (editEv.type === "client") {
      await supabase.from("clients").update({ work_date: form.date, notes: form.notes }).eq("id", editEv.clientId);
      setClients(p => p.map(c => c.id === editEv.clientId ? { ...c, work_date: form.date, notes: form.notes } : c));
    } else {
      const { data } = await supabase.from("schedules").update({ title: form.title, date: form.date, time: form.time, notes: form.notes }).eq("id", editEv.id).select().single();
      if (data) setEvents(p => p.map(e => e.id === data.id ? data : e));
    }
    if (form.date) setSelDay(parseInt(form.date.split("-")[2]));
    setEditEv(null); setForm(EMPTY_FORM);
  }

  async function delEv(e) {
    if (e.type === "client") {
      await supabase.from("clients").update({ work_date: "" }).eq("id", e.clientId);
      setClients(p => p.map(c => c.id === e.clientId ? { ...c, work_date: "" } : c));
    } else {
      await supabase.from("schedules").delete().eq("id", e.id);
      setEvents(p => p.filter(ev => ev.id !== e.id));
    }
  }

  const showEvModal = editEv != null; // 수정 모달만
  const evTitle = editEv ? (editEv.type === "client" ? "시공 일정 수정" : "일정 수정") : "";
  const evSave = saveEdit;
  const evClose = () => { setShowAdd(false); setEditEv(null); setForm(EMPTY_FORM); };
  const evIsClient = editEv ? editEv.type === "client" : false;

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <Header title="일정 관리" back onBack={() => setScreen("home")} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => setCur(new Date(yr, mo - 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: SUB, padding: "0 6px" }}>‹</button>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{ms}</span>
            <button onClick={() => setCur(new Date(yr, mo + 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: SUB, padding: "0 6px" }}>›</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 6 }}>
            {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: i === 0 ? "#EF4444" : i === 6 ? "#3B82F6" : SUB, padding: "3px 0" }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "3px 0" }}>
            {Array(fd).fill(null).map((_, i) => <div key={"e" + i} />)}
            {Array(dim).fill(null).map((_, i) => {
              const day = i + 1, iT = now.getDate() === day && now.getMonth() === mo && now.getFullYear() === yr, isSel = selDay === day;
              const dayEvs = evMap[day] || [];
              return (
                <button key={day} onClick={() => setSelDay(isSel ? null : day)} style={{ textAlign: "center", padding: "6px 2px", borderRadius: 8, border: "none", cursor: "pointer", background: isSel ? PRIMARY : iT ? PL : "transparent" }}>
                  <span style={{ fontSize: 12, color: isSel ? "#fff" : iT ? PRIMARY : TEXT, fontWeight: isSel || iT ? 700 : 400, display: "block" }}>{day}</span>
                  <div style={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}>
                    {dayEvs.slice(0, 3).map((e, ei) => <div key={ei} style={{ width: 5, height: 5, borderRadius: "50%", background: isSel ? "#fff" : e.color }} />)}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
        {selDay && (
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{mo + 1}월 {selDay}일</span>
              <div style={{ display: "flex", gap: 5 }}>
                <button onClick={() => openAdd("todo")} style={{ background: "#16A34A", border: "none", borderRadius: 10, padding: "7px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>✅ 할일</button>
                <button onClick={() => openAdd("memo")} style={{ background: "#F59E0B", border: "none", borderRadius: 10, padding: "7px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>📝 메모</button>
                <button onClick={() => openAdd("schedule")} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "7px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>📅 일정</button>
              </div>
            </div>
            {selEvs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px 0", color: SUB, fontSize: 13 }}><div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>일정 없음</div>
            ) : selEvs.map(e => (
              <div key={e.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ width: 4, minHeight: 36, borderRadius: 2, background: e.color, flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: e.done ? SUB : TEXT, textDecoration: e.done ? "line-through" : "none" }}>{e.title}</div>
                  {e.time && <div style={{ fontSize: 11, color: SUB, marginTop: 2 }}>🕐 {e.time}</div>}

                  {e.notes && <div style={{ fontSize: 11, color: SUB, marginTop: 3, lineHeight: 1.5 }}>{e.notes}</div>}
                </div>
                <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                  {e.type === "todo" && <button onClick={() => setScreen("todo")} style={{ border: `1px solid #BBF7D0`, borderRadius: 8, padding: "5px 10px", background: "#F0FDF4", cursor: "pointer", fontSize: 11, color: "#16A34A", fontWeight: 600 }}>할일 →</button>}
                  {e.type === "memo" && <button onClick={() => setScreen("memo")} style={{ border: `1px solid #FDE68A`, borderRadius: 8, padding: "5px 10px", background: "#FFFBEB", cursor: "pointer", fontSize: 11, color: "#D97706", fontWeight: 600 }}>메모 →</button>}
                  {e.type === "custom" && <>
                    <button onClick={() => openEdit(e)} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: "5px 10px", background: "#fff", cursor: "pointer", fontSize: 12, color: TEXT, fontWeight: 600 }}>수정</button>
                    <button onClick={() => delEv(e)} style={{ border: "1px solid #FECACA", borderRadius: 8, padding: "5px 10px", background: "#FEF2F2", cursor: "pointer", fontSize: 12, color: "#DC2626", fontWeight: 600 }}>삭제</button>
                  </>}
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
      {/* 추가 모달 (일정/할일/메모 타입 선택) */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{mo + 1}월 {selDay}일 추가</span>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
              {[["schedule", "📅 일정", PRIMARY], ["todo", "✅ 할 일", "#16A34A"], ["memo", "📝 메모", "#F59E0B"]].map(([t, l, c]) => (
                <button key={t} onClick={() => setAddType(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `2px solid ${addType === t ? c : BORDER}`, background: addType === t ? c : "#fff", color: addType === t ? "#fff" : SUB, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
            <Inp label={addType === "todo" ? "할 일 *" : addType === "memo" ? "메모 제목 *" : "일정 제목 *"} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder={addType === "todo" ? "할 일 내용" : addType === "memo" ? "메모 제목" : "일정 제목"} />
            <Inp label="날짜" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="" type="date" />
            {addType === "schedule" && <Inp label="시간" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} placeholder="" type="time" />}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>{addType === "memo" ? "내용" : "메모 (선택)"}</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder={addType === "memo" ? "메모 내용" : addType === "todo" ? "추가 메모" : "메모, 준비물 등"} rows={3} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "none", lineHeight: 1.6 }} />
            </div>
            <button onClick={addItem} style={{ width: "100%", background: addType === "todo" ? "#16A34A" : addType === "memo" ? "#F59E0B" : PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>추가하기</button>
          </div>
        </div>
      )}

      {showEvModal && (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) evClose(); }}>
    <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 17, fontWeight: 700 }}>{evTitle}</span>
        <button onClick={evClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
      </div>
      {!evIsClient && <Inp label="제목 *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="일정 제목" />}
      <Inp label="날짜" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="" type="date" />
      <Inp label="시간" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} placeholder="" type="time" />
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>내용</label>
        <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="메모, 준비물, 상세 내용 등" rows={3} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 13, outline: "none", boxSizing: "border-box", color: TEXT, resize: "none", lineHeight: 1.6 }} />
      </div>
      <button onClick={evSave} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>저장하기</button>
    </div>
  </div>
)}
    </div>
  );
}

// ── 하단 네비 ──
// ── 할 일 ──
function TodoScreen({ setScreen, userId }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { window.scrollTo(0, 0); loadTodos(); }, []);
  async function loadTodos() {
    const { data } = await supabase.from("todos").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (data) setTodos(data);
    setLoading(false);
  }
  async function add() {
    if (!input.trim()) return;
    const { data } = await supabase.from("todos").insert([{ user_id: userId, text: input.trim(), done: false, date: new Date().toISOString().split("T")[0] }]).select().single();
    if (data) setTodos([data, ...todos]);
    setInput("");
  }
  async function toggle(id) {
    const t = todos.find(x => x.id === id);
    if (!t) return;
    await supabase.from("todos").update({ done: !t.done }).eq("id", id);
    setTodos(todos.map(x => x.id === id ? { ...x, done: !x.done } : x));
  }
  async function del(id) {
    await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter(x => x.id !== id));
  }
  async function clearDone() {
    if (!window.confirm("완료된 항목을 모두 삭제할까요?")) return;
    const doneIds = todos.filter(t => t.done).map(t => t.id);
    for (const id of doneIds) await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter(t => !t.done));
  }
  const pending = todos.filter(t => !t.done).length;
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Header title={`✅ 할 일 (${pending})`} back onBack={() => setScreen("home")} />
      <div style={{ padding: "14px 14px 80px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="할 일 추가..." style={{ flex: 1, border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, outline: "none", color: TEXT, background: CARD }} />
          <button onClick={add} style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: 12, padding: "0 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>추가</button>
        </div>
        {todos.length > 0 && todos.some(t => t.done) && (
          <button onClick={clearDone} style={{ background: "none", border: "none", color: SUB, fontSize: 11, cursor: "pointer", textAlign: "right" }}>완료 항목 삭제</button>
        )}
        {todos.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0, padding: 20 }}>등록된 할 일이 없어요</p></Card>}
        {todos.map(t => (
          <Card key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
            <button onClick={() => toggle(t.id)} style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${t.done ? "#16A34A" : BORDER}`, background: t.done ? "#16A34A" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 14 }}>{t.done ? "✓" : ""}</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, color: t.done ? SUB : TEXT, textDecoration: t.done ? "line-through" : "none", fontWeight: 500 }}>{t.text}</div>
              <div style={{ fontSize: 10, color: SUB, marginTop: 2 }}>{t.date}</div>
            </div>
            <button onClick={() => del(t.id)} style={{ background: "none", border: "none", color: SUB, cursor: "pointer", fontSize: 16, flexShrink: 0 }}>×</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── 메모 ──
function MemoScreen({ setScreen, userId }) {
  const today = new Date().toISOString().split("T")[0];
  const [memos, setMemos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editMemo, setEditMemo] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", date: today });
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); loadMemos(); }, []);

  async function loadMemos() {
    const { data } = await supabase.from("memos").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (data) setMemos(data);
    setLoading(false);
  }

  async function addMemo() {
    if (!form.title.trim()) return;
    // 날짜 미지정 시 작성일(오늘) 자동 입력
    const memoDate = form.date || today;
    const { data } = await supabase.from("memos").insert([{
      user_id: userId,
      title: form.title,
      content: form.content,
      date: memoDate
    }]).select().single();
    if (data) setMemos([data, ...memos]);
    setForm({ title: "", content: "", date: today });
    setShowAdd(false);
  }

  async function updateMemo() {
    if (!form.title.trim()) return;
    const memoDate = form.date || today;
    await supabase.from("memos").update({ title: form.title, content: form.content, date: memoDate }).eq("id", editMemo.id);
    setMemos(memos.map(m => m.id === editMemo.id ? { ...m, title: form.title, content: form.content, date: memoDate } : m));
    setForm({ title: "", content: "", date: today });
    setEditMemo(null);
  }

  async function del(id) {
    if (!window.confirm("이 메모를 삭제할까요?")) return;
    await supabase.from("memos").delete().eq("id", id);
    setMemos(memos.filter(m => m.id !== id));
  }

  const isModal = showAdd || editMemo;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Header title={`📝 메모 (${memos.length})`} back onBack={() => setScreen("home")} right={<button onClick={() => { setForm({ title: "", content: "", date: today }); setShowAdd(true); }} style={{ background: PRIMARY, border: "none", borderRadius: 10, padding: "6px 14px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ 추가</button>} />
      <div style={{ padding: "14px 14px 80px", display: "flex", flexDirection: "column", gap: 10 }}>
        {memos.length === 0 && <Card><p style={{ textAlign: "center", color: SUB, fontSize: 13, margin: 0, padding: 20 }}>등록된 메모가 없어요</p></Card>}
        {memos.map(m => (
          <Card key={m.id} onClick={() => { setForm({ title: m.title, content: m.content, date: m.date || today }); setEditMemo(m); }} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{m.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: m.date === today ? PRIMARY : SUB, fontWeight: m.date === today ? 700 : 400 }}>
                  {m.date === today ? "오늘" : m.date}
                </span>
                <button onClick={e => { e.stopPropagation(); del(m.id); }} style={{ background: "none", border: "none", color: SUB, cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
            </div>
            <div style={{ fontSize: 12, color: SUB, lineHeight: 1.5, whiteSpace: "pre-wrap", maxHeight: 60, overflow: "hidden" }}>{m.content || "내용 없음"}</div>
          </Card>
        ))}
      </div>
      {isModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) { setShowAdd(false); setEditMemo(null); } }}>
          <div style={{ background: CARD, borderRadius: "22px 22px 0 0", padding: "22px 18px 36px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>{editMemo ? "메모 수정" : "새 메모"}</span>
              <button onClick={() => { setShowAdd(false); setEditMemo(null); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: SUB }}>×</button>
            </div>
            <Inp label="제목 *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="메모 제목" />
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>내용</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="메모 내용..." rows={5} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", color: TEXT, resize: "vertical", fontFamily: "inherit", background: CARD }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: SUB, display: "block", marginBottom: 5 }}>날짜 <span style={{ fontSize: 10, fontWeight: 400 }}>(작성일 자동 입력, 변경 가능)</span></label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", color: TEXT, background: CARD }} />
            </div>
            <div style={{ padding: 10, background: "#FFFBEB", borderRadius: 10, marginBottom: 14, fontSize: 11, color: "#92400E" }}>
              📅 일정 달력에 자동 연동됩니다. 날짜를 바꾸면 해당 날짜에 표시돼요.
            </div>
            <button onClick={editMemo ? updateMemo : addMemo} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 13, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{editMemo ? "수정하기" : "저장하기"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsScreen({ setScreen, userId, isPremium }) {
  const [backing, setBacking] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(savedTheme);
  const [faqOpen, setFaqOpen] = useState(null);
  const [dbFaqs, setDbFaqs] = useState([]);
  const [dbAnnouncements, setDbAnnouncements] = useState([]);
  const [showDonate, setShowDonate] = useState(false);
  const [donationAccounts, setDonationAccounts] = useState([]);
  useEffect(() => {
    if (showDonate) {
      supabase.from("donation_accounts").select("*").eq("is_active", true).order("is_main", { ascending: false }).order("display_order", { ascending: true }).then(({ data }) => {
        setDonationAccounts(data || []);
      });
    }
  }, [showDonate]);

  // 실시간 알람 체크 + 강제 발송

  // 1분 후 임시 일정으로 알림 확인

  // DB에서 공지사항/FAQ 로드
  useEffect(() => {
    supabase.from("announcements").select("*").eq("is_active", true).order("display_order", { ascending: false }).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setDbAnnouncements(data);
    });
    supabase.from("faqs").select("*").eq("is_active", true).order("display_order", { ascending: true }).then(({ data }) => {
      if (data) setDbFaqs(data);
    });
  }, []);

  function changeTheme(t) {
    localStorage.setItem("app_theme", t);
    setCurrentTheme(t);
    window.location.reload();
  }

  async function handleBackup() {
    setBacking(true);
    try {
      const [clientsRes, txnsRes, invoicesRes, schedRes, estRes, asRes] = await Promise.all([
        supabase.from("clients").select("*").eq("user_id", userId),
        supabase.from("transactions").select("*").eq("user_id", userId),
        supabase.from("tax_invoices").select("*").eq("user_id", userId),
        supabase.from("schedules").select("*").eq("user_id", userId),
        supabase.from("estimates").select("*").eq("user_id", userId),
        supabase.from("as_records").select("*").eq("user_id", userId),
      ]);
      const bizInfo = (() => { try { return JSON.parse(localStorage.getItem("biz_info") || "{}"); } catch { return {}; } })();
      const supplierInvoices = (() => { try { return JSON.parse(localStorage.getItem("supplier_invoices") || "[]"); } catch { return []; } })();
      const backup = { version: "1.0", exported_at: new Date().toISOString(), biz_info: bizInfo, supplier_invoices: supplierInvoices, clients: clientsRes.data || [], transactions: txnsRes.data || [], tax_invoices: invoicesRes.data || [], schedules: schedRes.data || [], estimates: estRes.data || [], as_records: asRes.data || [] };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `film_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
    } catch (e) { alert("백업 실패: " + e.message); }
    setBacking(false);
  }

  async function handleRestore(e) {
    const file = e.target.files[0]; if (!file) return;
    setRestoring(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.biz_info) localStorage.setItem("biz_info", JSON.stringify(data.biz_info));
      if (data.supplier_invoices) localStorage.setItem("supplier_invoices", JSON.stringify(data.supplier_invoices));
      if (data.clients?.length) await supabase.from("clients").upsert(data.clients.map(r => ({ ...r, user_id: userId })));
      if (data.transactions?.length) await supabase.from("transactions").upsert(data.transactions.map(r => ({ ...r, user_id: userId })));
      if (data.tax_invoices?.length) await supabase.from("tax_invoices").upsert(data.tax_invoices.map(r => ({ ...r, user_id: userId })));
      if (data.schedules?.length) await supabase.from("schedules").upsert(data.schedules.map(r => ({ ...r, user_id: userId })));
      if (data.estimates?.length) await supabase.from("estimates").upsert(data.estimates.map(r => ({ ...r, user_id: userId })));
      if (data.as_records?.length) await supabase.from("as_records").upsert(data.as_records.map(r => ({ ...r, user_id: userId })));
      alert("✅ 복원 완료! 새로고침합니다.");
      window.location.reload();
    } catch (e) { alert("복원 실패: " + e.message); }
    setRestoring(false);
  }

  const themeList = [
    { id: "purple", name: "보라", color: "#5561F5", bg: "#EDEFFD" },
    { id: "dark", name: "다크", color: "#818CF8", bg: "#1A1D2E" },
    { id: "blue", name: "블루", color: "#2563EB", bg: "#DBEAFE" },
    { id: "green", name: "그린", color: "#059669", bg: "#D1FAE5" },
    { id: "red", name: "레드", color: "#DC2626", bg: "#FEE2E2" },
  ];

  const faqs = []; // DB에서 가져옴 (dbFaqs)

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Header title="⚙️ 설정" back onBack={() => setScreen("home")} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        {showDonate && <DonateModal donationAccounts={donationAccounts} onClose={() => setShowDonate(false)} />}

        <Card style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)", border: "2px solid #FB923C" }}>
          <button onClick={() => setShowDonate(true)} style={{ width: "100%", background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EA580C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>☕</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#9A3412", marginBottom: 2 }}>개발자 후원하기</div>
                <div style={{ fontSize: 11, color: "#C2410C", lineHeight: 1.4 }}>후원 부탁드립니다. 더 좋은 프로그램으로 보답하겠습니다</div>
              </div>
              <div style={{ fontSize: 18, color: "#EA580C", flexShrink: 0 }}>›</div>
            </div>
          </button>
        </Card>

        <Card>
          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: TEXT }}>🎨 테마</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {themeList.map(t => {
              const locked = false; // 테마 전체 무료 사용 가능
              return (
              <button key={t.id} onClick={() => { if (locked) { alert("후원자 전용 테마입니다 ☕"); return; } changeTheme(t.id); }} style={{ border: currentTheme === t.id ? `2.5px solid ${t.color}` : `1.5px solid ${BORDER}`, borderRadius: 12, padding: "10px 4px", cursor: "pointer", background: t.id === "dark" ? t.bg : t.bg, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.color }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: currentTheme === t.id ? t.color : SUB }}>{t.name}</span>
                {currentTheme === t.id && <span style={{ fontSize: 8, color: t.color }}>✓ 사용중</span>}
                {locked && <span style={{ fontSize: 8, color: SUB }}>🔒</span>}
              </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: TEXT }}>💾 백업 / 복원</p>
          <div style={{ fontSize: 12, color: SUB, marginBottom: 12, lineHeight: 1.6 }}>
            고객, 매출/매입, 세금계산서, 견적, A/S 기록을 하나의 파일로 백업해요.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleBackup} disabled={backing} style={{ flex: 1, background: PRIMARY, border: "none", borderRadius: 12, padding: "12px 0", color: "#fff", fontSize: 13, fontWeight: 700, cursor: backing ? "not-allowed" : "pointer", opacity: backing ? 0.7 : 1 }}>
              {backing ? "백업 중..." : "💾 백업"}
            </button>
            <label style={{ flex: 1, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 0", color: restoring ? SUB : TEXT, fontSize: 13, fontWeight: 700, cursor: restoring ? "not-allowed" : "pointer", textAlign: "center", display: "block", opacity: restoring ? 0.7 : 1 }}>
              {restoring ? "복원 중..." : "📂 복원"}
              <input type="file" accept=".json" onChange={handleRestore} style={{ display: "none" }} disabled={restoring} />
            </label>
          </div>
        </Card>

        <Card>
          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: TEXT }}>📢 공지사항</p>
          {dbAnnouncements.length === 0 && (
            <div style={{ padding: 12, background: BG, borderRadius: 10, textAlign: "center", fontSize: 12, color: SUB }}>등록된 공지사항이 없어요</div>
          )}
          {dbAnnouncements.map((item, i) => (
            <div key={item.id} style={{ borderRadius: 10, marginBottom: 6, overflow: "hidden", border: `1px solid ${item.is_important ? "#FCD34D" : BORDER}`, background: item.is_important ? "#FFFBEB" : BG }}>
              <button onClick={() => setFaqOpen(faqOpen === `ann_${i}` ? null : `ann_${i}`)} style={{ width: "100%", textAlign: "left", border: "none", background: "transparent", padding: "11px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                  {item.is_important && <span style={{ fontSize: 10, background: "#FEF3C7", color: "#92400E", borderRadius: 6, padding: "2px 6px", fontWeight: 700, flexShrink: 0 }}>📌 중요</span>}
                  <span style={{ fontSize: 12, fontWeight: 600, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                </div>
                <span style={{ fontSize: 13, color: SUB, flexShrink: 0 }}>{faqOpen === `ann_${i}` ? "▲" : "▼"}</span>
              </button>
              {faqOpen === `ann_${i}` && (
                <div style={{ padding: "10px 12px 12px", fontSize: 11, color: SUB, lineHeight: 1.8, whiteSpace: "pre-wrap", borderTop: `1px solid ${BORDER}` }}>
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </Card>

        <Card>
          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: TEXT }}>❓ 자주 묻는 질문</p>
          {dbFaqs.length === 0 && (
            <div style={{ padding: 12, background: BG, borderRadius: 10, textAlign: "center", fontSize: 12, color: SUB }}>등록된 FAQ가 없어요</div>
          )}
          {dbFaqs.map((f, i) => (
            <div key={f.id} style={{ marginBottom: 6 }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", textAlign: "left", border: "none", background: BG, borderRadius: 10, padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{f.question}</span>
                <span style={{ fontSize: 14, color: SUB }}>{faqOpen === i ? "▲" : "▼"}</span>
              </button>
              {faqOpen === i && (
                <div style={{ padding: "8px 12px", fontSize: 12, color: SUB, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{f.answer}</div>
              )}
            </div>
          ))}
        </Card>

        <div style={{ textAlign: "center", padding: "20px 0 40px", fontSize: 11, color: SUB }}>
          Wallpaper Pro v1.0<br/>인테리어 도배 시공 관리 앱
        </div>
      </div>
    </div>
  );
}

function BottomNav({ screen, setScreen }) {
  const tabs = [{ id: "home", ic: "🏠", l: "홈" }, { id: "clients", ic: "👥", l: "고객" }, { id: "films", ic: "🎨", l: "벽지DB" }, { id: "books", ic: "💰", l: "매입/매출" }, { id: "ai", ic: "✨", l: "AI시뮬" }, { id: "schedule", ic: "📅", l: "일정" }, { id: "alliance", ic: "🤝", l: "연합" }];
  return (
    <div style={{ background: NAV_BG, borderTop: `1px solid ${BORDER}`, display: "flex", overflowX: "auto" }}>
      {tabs.map(t => {
        const active = screen === t.id;
        return (
          <button key={t.id} onClick={() => setScreen(t.id)} style={{ flexShrink: 0, minWidth: 60, padding: "9px 4px 7px", border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: active ? PRIMARY : "#9CA3AF" }}>
            <span style={{ fontSize: 20 }}>{t.ic}</span>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>{t.l}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── 앱 루트 ──
// ── 개발자 후원 모달 ──
function DonateModal({ donationAccounts, onClose }) {
  const [amounts, setAmounts] = useState({});

  function handleAmountChange(accId, value) {
    const num = value.replace(/[^0-9]/g, "");
    setAmounts(p => ({ ...p, [accId]: num }));
  }

  function formatAmount(v) {
    if (!v) return "";
    return parseInt(v).toLocaleString();
  }

  function sendToss(acc) {
    const amt = amounts[acc.id];
    if (!amt || parseInt(amt) < 1) {
      alert("후원 금액을 입력해주세요.");
      return;
    }
    // 링크형 후원(supertoss.me 등)이면 그냥 열기
    if (acc.account_number.startsWith("http")) {
      window.open(acc.account_number, "_blank");
      return;
    }
    const bankCode = getBankCode(acc.bank_name);
    const accNo = acc.account_number.replace(/[^0-9]/g, "");
    if (!bankCode || !accNo) {
      navigator.clipboard.writeText(acc.account_number).catch(()=>{});
      alert(`계좌번호가 복사되었어요!\n\n${acc.bank_name || ""} ${acc.account_number}\n금액: ${formatAmount(amt)}원\n\n사용 중인 은행 앱에서 직접 송금해주세요.`);
      return;
    }
    // 토스 앱 송금 URL
    const tossUrl = `supertoss://send?bank=${bankCode}&accountNo=${accNo}&amount=${amt}`;
    window.location.href = tossUrl;

    // 토스 앱이 없는 경우 안내
    setTimeout(() => {
      if (document.hidden) return;
      if (confirm(`토스 앱이 열리지 않으셨나요?\n\n계좌번호를 복사하고 사용 중인 은행 앱에서\n직접 송금하실 수 있어요.\n\n복사하시겠어요?`)) {
        navigator.clipboard.writeText(acc.account_number).catch(()=>{});
        alert("✅ 계좌번호가 복사되었어요!");
      }
    }, 1500);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#fff", borderRadius: "22px 22px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 430, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>☕ Wallpaper Pro 후원하기</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, color: SUB, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 12, background: "#FFF7ED", borderRadius: 10, marginBottom: 14, fontSize: 13, color: "#9A3412", lineHeight: 1.6, textAlign: "center" }}>
          후원 감사합니다.<br/><b>더 좋은 프로그램으로 보답하겠습니다 🙏</b>
        </div>
        {donationAccounts.length === 0 ? (
          <div style={{ padding: 20, textAlign: "center", color: SUB, fontSize: 13 }}>등록된 후원 계좌가 없어요</div>
        ) : (
          <>
            {donationAccounts.map(acc => {
              const isLink = acc.account_number.startsWith("http");
              return (
                <div key={acc.id} style={{ border: acc.is_main ? `2px solid #EA580C` : `1.5px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 10, background: acc.is_main ? "#FFF7ED" : "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>
                      {acc.is_main && "⭐ "}{acc.account_type}{acc.bank_name && ` · ${acc.bank_name}`}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, fontFamily: "monospace", color: TEXT, marginBottom: 4, wordBreak: "break-all" }}>{acc.account_number}</div>
                  {acc.account_holder && <div style={{ fontSize: 12, color: SUB, marginBottom: 6 }}>예금주: {acc.account_holder}</div>}
                  {acc.description && <div style={{ fontSize: 11, color: SUB, marginTop: 4, marginBottom: 8, padding: 8, background: BG, borderRadius: 8 }}>{acc.description}</div>}
                  {!isLink && (
                    <div style={{ marginTop: 10, marginBottom: 8 }}>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="후원 금액"
                          value={formatAmount(amounts[acc.id] || "")}
                          onChange={e => handleAmountChange(acc.id, e.target.value)}
                          style={{ width: "100%", padding: "10px 40px 10px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontSize: 14, fontWeight: 600, color: TEXT, boxSizing: "border-box" }}
                        />
                        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: SUB, fontWeight: 600 }}>원</span>
                      </div>
                      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {[["5천", 5000], ["1만", 10000], ["3만", 30000], ["5만", 50000]].map(([l, v]) => (
                          <button key={v} onClick={() => setAmounts(p => ({ ...p, [acc.id]: String(v) }))} style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "5px 0", fontSize: 11, color: SUB, fontWeight: 600, cursor: "pointer" }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button onClick={() => { navigator.clipboard.writeText(acc.account_number); alert("✅ 복사됨!"); }} style={{ flex: 1, background: PL, color: PRIMARY, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📋 복사</button>
                    <button onClick={() => sendToss(acc)} style={{ flex: 2, background: acc.account_type === "카카오페이증권" ? "#FFE600" : "#EA580C", color: acc.account_type === "카카오페이증권" ? "#3A1D1D" : "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      {isLink ? "🔗 후원 페이지 열기" : acc.account_type === "카카오페이증권" ? "💛 카카오페이로 송금" : acc.account_type === "토스" ? "💸 토스로 송금하기" : "💸 송금하기"}
                    </button>
                  </div>
                </div>
              );
            })}
            <div style={{ padding: 12, background: "#F0FDF4", borderRadius: 10, marginTop: 10, fontSize: 11, color: "#16A34A", lineHeight: 1.6 }}>
              💡 입금 후 닉네임을 메모로 적어주시면 더 빠른 후원자 등록이 가능해요.<br/>
              💡 토스 앱이 설치되어 있어야 자동 송금이 작동해요.
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function App() {
  useEffect(() => { console.log("%c Wallpaper Pro v1.0 © 2026 tacita797. All rights reserved. Unauthorized use prohibited.", "color:#5561F5;font-weight:bold;font-size:10px"); }, []);
  const [authUser, setAuthUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userTier, setUserTier] = useState("free");
  const [loading, setLoading] = useState(true);
  const [screen, setScreenState] = useState("home");
  const screenRef = useRef("home");
  useEffect(() => { screenRef.current = screen; }, [screen]);

  // 페이지 visibility 변화 추적 (카메라/갤러리 복귀 감지)
  const lastVisChangeRef = useRef(0);
  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) lastVisChangeRef.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);



  // 화면 전환 — history는 더미 상태만 유지
  const setScreen = (next) => {
    if (next === screenRef.current) return;
    window.history.pushState({ app: "filmpro" }, "", "");
    setScreenState(next);
  };

  // 전역 후원 모달 열기 (잠금 카드에서 호출)
  useEffect(() => {
    const openDonate = () => setShowDonateModal(true);
    window.addEventListener("openDonateModal", openDonate);
    return () => window.removeEventListener("openDonateModal", openDonate);
  }, []);

  // ⚠️ input 안에서 Enter 키 누르면 폼 제출처럼 동작해서
  // 화면 이동/뒤로가기가 발생하는 문제 방지 (전역 차단)
  // textarea는 줄바꿈이 필요하므로 제외, select도 제외
  useEffect(() => {
    const blockEnterSubmit = (e) => {
      if (e.key !== "Enter") return;
      const tag = e.target.tagName;
      if (tag === "INPUT") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockEnterSubmit);
    return () => document.removeEventListener("keydown", blockEnterSubmit);
  }, []);

  // 뒤로가기(popstate) → 앱 내부에서만 처리
  useEffect(() => {
    window.history.replaceState({ app: "filmpro" }, "", "");
    const handlePop = () => {
      // 카메라/갤러리 앱에서 막 돌아온 직후의 popstate는 무시
      if (Date.now() - lastVisChangeRef.current < 1000) {
        window.history.pushState({ app: "filmpro" }, "", "");
        return;
      }
      window.history.pushState({ app: "filmpro" }, "", "");
      window.dispatchEvent(new CustomEvent("appGoBack"));
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // appGoBack → 현재 화면에 맞게 뒤로가기
  useEffect(() => {
    const handleGoBack = () => {
      const cur = screenRef.current;
      if (cur === "detail") setScreenState("clients");
      else if (cur === "settings") setScreenState("home");
      else if (cur !== "home") setScreenState("home");
    };
    window.addEventListener("appGoBack", handleGoBack);
    return () => window.removeEventListener("appGoBack", handleGoBack);
  }, []);
  const [clients, setClients] = useState([]);
  const [selClient, setSelClient] = useState(null);
  // 벽지DB 전역 캐싱 (모든 화면이 공유)
  const [allFilmsCache, setAllFilmsCache] = useState([]);
  const [filmsLoaded, setFilmsLoaded] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAccounts, setDonationAccounts] = useState([]);

  useEffect(() => {
    // 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) checkUser(session.user);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) checkUser(session.user);
      else { setAuthUser(null); setUserRole(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  // 로그인 후 벽지DB 전역 로드 (한 번만)
  useEffect(() => {
    if (!authUser || filmsLoaded) return;
    (async () => {
      let allData = [];
      let from = 0;
      const PAGE = 1000;
      while (true) {
        const { data, error } = await supabase.from("wallpapers").select("*").range(from, from + PAGE - 1);
        if (error || !data || data.length === 0) break;
        allData = allData.concat(data);
        if (data.length < PAGE) break;
        from += PAGE;
      }
      setAllFilmsCache(allData);
      setFilmsLoaded(true);
    })();
  }, [authUser, filmsLoaded]);

  // 후원 모달 열릴 때 계좌 로드
  useEffect(() => {
    if (showDonateModal) {
      supabase.from("donation_accounts").select("*").eq("is_active", true).order("is_main", { ascending: false }).order("display_order", { ascending: true }).then(({ data }) => {
        if (data) setDonationAccounts(data);
      });
    }
  }, [showDonateModal]);

  async function checkUser(user) {
    const { data } = await supabase.from("app_users").select("role, name, tier").eq("id", user.id).single();
    setAuthUser(user);
    setUserRole(data?.role || "pending");
    setUserTier(data?.tier || "free");
    if (data?.role === "user" || data?.role === "admin") loadClients(user.id);
    setLoading(false);
  }

  async function loadClients(userId) {
    const { data } = await supabase.from("clients").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    setClients(data || []);
  }

  async function handleAuth(user, role) {
    setAuthUser(user); setUserRole(role);
    if (role === "user" || role === "admin") loadClients(user.id);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAuthUser(null); setUserRole(null); setClients([]); setScreen("home");
  }

  // 첫 실행 시 관리자 계정 자동 생성 (사장님)
  async function makeAdmin(userId) {
    await supabase.from("app_users").update({ role: "admin" }).eq("id", userId);
  }

  if (loading) return (
    <div style={{ minHeight: "100dvh", background: GRAD, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 48 }}>🎨</div>
      <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>도배 시공 앱</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>로딩 중...</div>
    </div>
  );

  if (!authUser) return <AuthScreen onAuth={handleAuth} />;
  if (userRole === "pending" || userRole === "blocked") return <PendingScreen onLogout={handleLogout} />;
  if (userRole === "admin" && screen === "admin") return <AdminScreen onLogout={handleLogout} onBack={() => setScreen("home")} />;

  const isPremium = userTier === "premium" || userRole === "admin";
  const noNav = screen === "detail" || screen === "settings";
  return (
    <div style={{ maxWidth: 430, margin: "0 auto", height: "100dvh", display: "flex", flexDirection: "column", background: BG, fontFamily: "'Pretendard',-apple-system,'Noto Sans KR',sans-serif", overflow: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.12)" }}>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {screen === "home" && <HomeScreen clients={clients} setScreen={setScreen} user={authUser} onLogout={handleLogout} userId={authUser.id} onSelectClient={setSelClient} />}
        {screen === "clients" && <ClientsScreen clients={clients} setClients={setClients} setScreen={setScreen} onSelect={setSelClient} userId={authUser.id} isPremium={isPremium} />}
        {screen === "detail" && <DetailScreen client={selClient} setScreen={setScreen} userId={authUser.id} setClients={setClients} isPremium={isPremium} />}
        {screen === "films" && <FilmsScreen setScreen={setScreen} userId={authUser.id} isPremium={isPremium} filmsCache={allFilmsCache} filmsLoaded={filmsLoaded} />}
        {screen === "books" && <BookkeepingScreen userId={authUser.id} setScreen={setScreen} clients={clients} isPremium={isPremium} />}
        {screen === "ai" && <AIScreen userId={authUser.id} setScreen={setScreen} filmsCache={allFilmsCache} filmsLoaded={filmsLoaded} />}
        {screen === "estimate" && <EstimateScreen isPremium={isPremium} clients={clients} setClients={setClients} setScreen={setScreen} userId={authUser.id} preClient={selClient} clearPreClient={() => setSelClient(null)} filmsCache={allFilmsCache} filmsLoaded={filmsLoaded} />}
        {screen === "schedule" && <ScheduleScreen clients={clients} setClients={setClients} userId={authUser.id} setScreen={setScreen} />}
        {screen === "alliance" && <AllianceScreen userId={authUser.id} setScreen={setScreen} isPremium={isPremium} />}
        {screen === "settings" && <SettingsScreen setScreen={setScreen} userId={authUser.id} isPremium={isPremium} />}
        {screen === "todo" && <TodoScreen setScreen={setScreen} userId={authUser.id} />}
        {screen === "memo" && <MemoScreen setScreen={setScreen} userId={authUser.id} />}
      </div>
      {!noNav && (
        <div>
          {userRole === "admin" && (
            <button onClick={() => setScreen("admin")} style={{ width: "100%", background: "#1A1D2E", border: "none", padding: "6px 0", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer" }}>👑 관리자 화면</button>
          )}
          <BottomNav screen={screen} setScreen={setScreen} />
        </div>
      )}

      {/* 개발자 후원 모달 */}
      {showDonateModal && <DonateModal donationAccounts={donationAccounts} onClose={() => setShowDonateModal(false)} />}
    </div>
  );
}
