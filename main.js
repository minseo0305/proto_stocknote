/* =====================================================================
   main.js — 여러 페이지에서 함께 쓰는 자바스크립트 함수 모음
   (Lecture7 함수·조건문·반복문, Lecture8 Date·Math·Array 객체 활용)
   [유지보수] 공통 기능을 한 파일에 모아 두어, 고칠 때 여기만 수정하면 됨
   ===================================================================== */

// ---------- 1. 오늘 날짜 출력 (Date 객체, Lecture8) ----------
function writeToday() {
  let now = new Date();
  let days = ["일", "월", "화", "수", "목", "금", "토"];      // Array 객체
  let text = now.getFullYear() + "년 " + (now.getMonth() + 1) + "월 "
           + now.getDate() + "일 (" + days[now.getDay()] + ")";

  // 국내 주식시장 정규장: 평일 09:00 ~ 15:30
  let minutes = now.getHours() * 60 + now.getMinutes();
  let isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
  let status;
  if (isWeekday && minutes >= 9 * 60 && minutes < 15 * 60 + 30) {
    status = "<span class='up'>● 지금은 정규장 시간</span>";
  } else {
    status = "<span class='down'>● 지금은 장 마감 시간</span>";
  }
  document.write(text + "<br>" + status);
}

// ---------- 2. 오늘의 투자 명언 (Math.random, Lecture8) ----------
// 페이지에 접속(새로고침)할 때마다 명언 배열에서 하나를 무작위로 골라 출력
// [유지보수] 명언을 추가하려면 아래 배열에 { text: "...", who: "..." } 한 줄만 넣으면 됨
let quotes = [
  { text: "주식시장은 인내심 없는 사람의 돈을 인내심 있는 사람에게 옮기는 도구다.", who: "워런 버핏" },
  { text: "규칙 1: 절대 돈을 잃지 마라. 규칙 2: 규칙 1을 절대 잊지 마라.", who: "워런 버핏" },
  { text: "10년 이상 보유할 생각이 없다면 단 10분도 보유하지 마라.", who: "워런 버핏" },
  { text: "남들이 욕심낼 때 두려워하고, 남들이 두려워할 때 욕심내라.", who: "워런 버핏" },
  { text: "당신이 무엇을 가지고 있는지, 그리고 왜 가지고 있는지 알아라.", who: "피터 린치" },
  { text: "강세장은 비관 속에서 태어나 회의 속에서 자라고, 낙관 속에서 성숙해 행복 속에서 죽는다.", who: "존 템플턴" },
  { text: "투자자의 가장 큰 문제, 심지어 최악의 적은 바로 자기 자신일 가능성이 높다.", who: "벤저민 그레이엄" },
  { text: "건초 더미에서 바늘을 찾지 말고, 건초 더미를 통째로 사라.", who: "존 보글 (인덱스 펀드의 아버지)" }
];

function writeQuote() {
  let index = Math.floor(Math.random() * quotes.length);   // 0 ~ (개수-1) 사이 난수

  // 직전에 본 명언과 같으면 다음 명언으로 넘김 (브라우저 저장소 사용, 안 되면 그냥 무시)
  try {
    let last = localStorage.getItem("lastQuote");
    if (last !== null && parseInt(last) == index) {
      index = (index + 1) % quotes.length;
    }
    localStorage.setItem("lastQuote", index);
  } catch (e) { }

  document.write("“" + quotes[index].text + "”<br><span class='quote-who'>— " + quotes[index].who + "</span>");
}

// ---------- 3. 복리 계산기 (journal.html 에서 사용) ----------
// 원금·연수익률·기간을 받아 해마다 불어나는 금액을 표로 보여줌
function calcCompound() {
  let principal = parseInt(document.getElementById("principal").value);
  let rate = parseFloat(document.getElementById("rate").value);
  let years = parseInt(document.getElementById("years").value);
  let out = document.getElementById("calcResult");

  // 입력값 검사 (조건문)
  if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || years <= 0) {
    out.innerHTML = "<p class='down'>원금과 기간을 올바르게 입력해 주세요.</p>";
    return;
  }
  if (years > 40) { years = 40; }

  let html = "<table><thead><tr><th>연차</th><th>평가 금액</th><th>누적 수익</th></tr></thead><tbody>";
  let money = principal;
  for (let y = 1; y <= years; y++) {                       // 반복문
    money = money * (1 + rate / 100);
    html += "<tr><td>" + y + "년 후</td><td>" + Math.round(money).toLocaleString() + "원</td>"
          + "<td class='" + (money >= principal ? "up" : "down") + "'>"
          + Math.round(money - principal).toLocaleString() + "원</td></tr>";
  }
  html += "</tbody></table>";
  html += "<p class='notice'>※ 매년 같은 수익률이 난다고 가정한 단순 계산입니다. 실제 투자 수익은 보장되지 않아요.</p>";
  out.innerHTML = html;      // id로 찾은 요소의 내용을 바꿈 (Lecture1 getElementById 응용)
}

// ---------- 4. GET 방식으로 전달된 폼 데이터 읽기 (result.html 에서 사용) ----------
// 주소창의 ?name=값&age=값 부분(location.search)을 잘라서 객체로 만듦 (Lecture8 String 메소드)
function getQueryData() {
  let data = {};
  let query = location.search.substring(1);                // 맨 앞 '?' 제거
  if (query == "") { return data; }
  let pairs = query.split("&");                            // String.split → Array
  for (let i = 0; i < pairs.length; i++) {
    let kv = pairs[i].split("=");
    let key = decodeURIComponent(kv[0]);
    let value = decodeURIComponent((kv[1] || "").replace(/\+/g, " "));
    if (data[key]) { data[key] += ", " + value; }          // 체크박스처럼 같은 이름이 여러 개일 때
    else { data[key] = value; }
  }
  return data;
}

// HTML 특수문자를 바꿔서 안전하게 출력 (입력값에 태그가 들어와도 실행되지 않도록)
function escapeHTML(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---------- 5. 네이버 차트 이미지 바꾸기 / 자동 새로고침 (index.html 관심 종목 차트) ----------
// [유지보수] 종목을 바꾸려면 아래 종목코드만 수정
let chartCode = "000660";          // SK하이닉스
let chartType = "area/day";        // 처음 보여 줄 차트: 오늘(분 단위)

function changeChart(type) {
  chartType = type;
  reloadChart();
}

function reloadChart() {
  // 주소 뒤에 현재 시각을 붙여서 브라우저가 예전 이미지를 재사용하지 않고 새로 받아오게 함
  document.getElementById("hynixChart").src =
    "https://ssl.pstatic.net/imgfinance/chart/item/" + chartType + "/" + chartCode + ".png?t=" + new Date().getTime();
}

function startChartRefresh() {
  setInterval(reloadChart, 60000);   // 60000ms = 1분마다 reloadChart 실행
}


// ---------- 6. 페이지를 이동해도 BGM 이어서 재생 ----------
// 페이지를 떠날 때 재생 위치(초)와 재생 여부를 sessionStorage(이 탭 안에서만 유지되는 저장소)에 적어 두고,
// 새 페이지가 열리면 그 위치부터 다시 재생함
// ※ 페이지가 바뀌는 순간 아주 잠깐 끊길 수 있고, 브라우저 정책상 자동 재생이 막히면 ▶ 버튼을 눌러야 함
function initBGM() {
  let bgm = document.getElementById("bgm");
  if (!bgm) { return; }
  bgm.volume = 0.3;                                   // 잔잔하게 30%

  function saveTime() {                               // 재생 위치만 저장
    try { sessionStorage.setItem("bgmTime", bgm.currentTime); } catch (e) { }
  }
  function savePlaying(isPlaying) {                    // 재생/일시정지는 사용자가 바꿀 때만 저장
    try { sessionStorage.setItem("bgmPlaying", isPlaying ? "yes" : "no"); } catch (e) { }
  }

  let savedTime = 0, wasPlaying = false;
  try {
    savedTime = parseFloat(sessionStorage.getItem("bgmTime")) || 0;
    wasPlaying = sessionStorage.getItem("bgmPlaying") == "yes";
  } catch (e) { }

  function resume() {
    if (savedTime > 0) { bgm.currentTime = savedTime; }
    if (wasPlaying) {
      let result = bgm.play();
      if (result) {
        result.catch(function () {                     // 자동 재생이 막힌 경우
          let box = document.getElementById("miniPlayer");
          if (box) { box.className += " paused-hint"; }
        });
      }
    }
  }
  if (bgm.readyState >= 1) { resume(); }
  else { bgm.addEventListener("loadedmetadata", resume); }

  bgm.addEventListener("play", function () {
    let box = document.getElementById("miniPlayer");
    if (box) { box.className = "mini-player"; }
    savePlaying(true);
  });
  bgm.addEventListener("pause", function () {
    // 페이지를 떠나면서 생기는 일시정지는 무시하고, 사용자가 직접 멈춘 경우만 기록
    if (!leaving) { savePlaying(false); }
  });
  bgm.addEventListener("timeupdate", saveTime);
  let leaving = false;
  window.addEventListener("pagehide", function () {   // 다른 페이지로 넘어가기 직전에 저장
    leaving = true;
    saveTime();
  });
}


// ---------- 7. 의견을 운영자 메일로 받기 (폼 수신 서비스 FormSubmit) ----------
// 의견 폼을 보내면 ① 같은 내용을 HTTPS·POST 방식으로 FormSubmit 에 보내 메일로 받고,
//                  ② 그다음 원래대로 GET 방식으로 result.html 로 이동해 결과 표를 보여 줌
// [유지보수] 받는 메일 주소는 아래 한 줄만 바꾸면 됨
//   (FormSubmit 확인 메일에서 받은 대체 문자열로 바꾸면 메일 주소를 코드에서 숨길 수 있음)
let FEEDBACK_MAIL_URL = "https://formsubmit.co/ajax/minseo64x74@gmail.com";

function sendFeedbackMail(form) {
  let data = new FormData(form);                          // 폼에 입력한 값 전부
  data.append("_subject", "[민서의 주식 노트] 새 의견이 도착했어요");   // 메일 제목
  data.append("_template", "table");                     // 메일 본문을 표로 깔끔하게
  data.append("_captcha", "false");                      // 로봇 확인 화면 생략

  let btn = document.getElementById("sendBtn");
  if (btn) { btn.innerHTML = "보내는 중..."; btn.disabled = true; }

  let moved = false;
  function goResult() {                                   // GET 방식으로 result.html 이동 (한 번만)
    if (moved) { return; }
    moved = true;
    form.submit();
  }

  fetch(FEEDBACK_MAIL_URL, {
    method: "POST",                                       // POST: 값이 주소창이 아니라 요청 본문에 담겨 감
    headers: { "Accept": "application/json" },
    body: data
  }).then(goResult).catch(goResult);                      // 성공하든 실패하든 결과 페이지로 이동

  setTimeout(goResult, 4000);                             // 4초 넘게 응답이 없으면 그냥 이동
  return false;                                           // 브라우저의 기본 전송은 잠깐 멈춤
}
