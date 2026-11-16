민서의 주식 노트 — 웹기초프로그래밍 과제
==========================================

실행 방법: index.html 을 브라우저(크롬 권장)로 열기
(YouTube 동영상, 관심 종목 차트는 인터넷 연결이 필요합니다)
※ YouTube 정책상, html 파일을 더블클릭해서 열면(file://) 동영상에 "오류 153"이 뜰 수 있습니다.
  VS Code의 Live Server 등 웹 서버로 열거나 배포된 주소로 접속하면 정상 재생되며,
  영상 아래 "YouTube에서 직접 보기" 링크로도 볼 수 있습니다.

[폴더 구조]
index.html      홈 — 자기소개, 나의 주식 히스토리, 관심 섹터(반도체·우주항공),
                2년 투자 타임라인(표), 프로필 사진, BGM(음악)
basics.html     주식 기초 — 용어 표, 캔들 차트 그림 + 차트 공부 영상(YouTube), Q&A
journal.html    투자 일지 · 종목 차트 — 원칙, 관심 종목 차트(SK하이닉스·ASTX·VOO), 회고, 복리 계산기
links.html      내가 쓰는 증권 앱(표), 자주 쓰는 사이트 4개(하이퍼링크), 의견 남기기 폼(GET)
result.html     GET 으로 보낸 폼 데이터를 읽어서 보여 주는 페이지
css/common.css  모든 페이지 공통 스타일 + 디자인 변수(색·글꼴) — 디자인 수정은 여기 한 곳에서
css/*.css       페이지 전용 스타일 (common.css 와 합쳐지고 필요한 부분만 오버라이딩)
js/main.js      공통 자바스크립트 함수
images/         SVG 그림 3개(로고·캔들 차트·복리 그래프) + 프로필 사진(profile.jpg)
media/          BGM 음악 파일 (red-flavor.mp3) — 모든 페이지 왼쪽 아래 미니 플레이어, 페이지를 옮겨도 이어서 재생
레이아웃_도안.pdf         평가항목 7
생성형AI_사용내역.pdf     평가항목 8

[평가항목 위치]
1 기본 구조      모든 html 파일 상단 주석 [평가 1]
2 TABLE         index.html #timeline, basics.html #terms, links.html #apps (rowspan, colspan, caption, thead/tbody/tfoot)
3 링크·미디어    외부 링크 9개(KRX·네이버페이 증권·파인·인베스팅닷컴·DART·TradingView 등) + 페이지 간 링크/앵커, 그림 images/*.svg,
                동영상 basics.html #candle 아래 차트 공부 영상 (YouTube iframe), 음악 모든 페이지 왼쪽 아래 BGM 미니 플레이어 (audio 태그)
                관심 종목 차트 journal.html #charts (네이버 차트 이미지 + TradingView 위젯)
4 시맨틱 태그    header, nav, section, article, aside, footer, figure, details, time, mark, fieldset
5 셀렉터         css/common.css 상단 설명 + 각 규칙 옆 ①~⑧ 번호
6 CSS 규칙       css 파일마다 [CSS-번호] 로 표시 (common.css 만 47개 이상)

[가산점]
- 스타일 합치기·오버라이딩: index.html <head> 주석 + common.css 상단 설명
  (common.css → 페이지 css → <style> → style 속성 순으로 적용)
- GET: links.html 의견 폼 → result.html 에서 실제로 값 표시
- POST + HTTPS: 같은 의견을 FormSubmit(https://formsubmit.co)으로 POST 전송 → 운영자 메일로 도착 (js/main.js 7번)
- 유지보수: CSS 변수, 공통/페이지별 CSS 분리, 공통 JS 파일, 폴더 구분, 이 README
- 통일감: 모든 페이지 같은 header/nav/footer, 같은 색(상승 빨강·하락 파랑·남색·금색)과 카드 디자인
