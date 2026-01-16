# CEO Staff - 정성언 포트폴리오

## 프로젝트 개요

**특허법인 관리팀 업무 효율개선 기획** 포트폴리오 웹사이트입니다.

특허법인의 관리팀에서 발생하는 업무 프로세스 문제점을 분석하고, CX(고객 경험) 향상을 위한 개선안을 제시하며, A/B 테스트를 통해 실제 효과를 검증한 내용을 담고 있습니다.

---

## 콘텐츠 요약

### 1. 문제 인식
- **CX의 중요성**: 고객 경험이 기업 성장과 수익에 직결되는 핵심 전략임을 설명
- **특허법인 관리팀 역할**: 지식재산권 관리, 고객 소통, CX 경험의 핵심 부서
- **실제 고객 컴플레인**: 유튜브 댓글에서 발견된 고객 불만 사례 제시

### 2. 현행 업무 프로세스 문제점
- 불필요한 업무처리
- 비효율적인 커뮤니케이션
- 수작업으로 인한 오류 발생

### 3. INSIGHT & 개선안
- **개선안 1**: 자동화 시스템 도입
- **개선안 2**: 문자 알림 기능 활성화
- 업무 프로세스 효율화 방안 제시

### 4. A/B 테스트 결과
- 개선안 적용 전후 비교 분석
- 약 95% 효율 향상 달성
- 직원 피드백 수집 및 분석

### 5. 추가 개선 사항
- 현장 직원들의 추가 피드백 반영
- 지속적인 개선 방향 제시

---

## 주요 기능

- **GSAP 스타일 로딩 애니메이션**: 글자가 순차적으로 등장하는 인트로 로더
- **가로 스크롤 섹션**: 섹션 4, 8, 12, 14에서 카드 슬라이드 형태의 가로 스크롤
- **스크롤 잠금**: 가로 스크롤 섹션 진입 시 세로 스크롤 잠금 후 카드 전환
- **순차 등장 애니메이션**: 섹션 5에서 아이템이 순차적으로 나타남
- **프로그레스 바 애니메이션**: 섹션 10, 11에서 수치 카운트업 효과
- **텍스트 패럴랙스 효과**: 인트로, 섹션 3, 9, 13, 15에서 스크롤에 따른 텍스트 이동

---

## 파일 구조

```
portfolio_easypat/
├── index.html                      # 메인 HTML 파일
├── README.md                       # 프로젝트 설명 문서
│
├── assets/
│   ├── css/
│   │   ├── main.css                # CSS 진입점 (모든 파일 import)
│   │   │
│   │   ├── base/                   # 기본 스타일
│   │   │   ├── reset.css           # CSS 리셋
│   │   │   ├── variables.css       # CSS 변수 (색상, 폰트, 간격)
│   │   │   └── typography.css      # 타이포그래피 스타일
│   │   │
│   │   ├── components/             # 재사용 컴포넌트
│   │   │   ├── card.css            # 카드 컴포넌트
│   │   │   ├── horizontal-scroll.css # 가로 스크롤 섹션 스타일
│   │   │   ├── loading.css         # 로딩 화면 (GSAP 스타일)
│   │   │   ├── progress-bar.css    # 진행바 컴포넌트
│   │   │   ├── progress-nav.css    # 상단 프로그레스 네비게이션
│   │   │   ├── scroll-animations.css # 스크롤 애니메이션
│   │   │   └── testimonial.css     # 후기/피드백 카드
│   │   │
│   │   └── sections/               # 섹션별 스타일
│   │       ├── intro.css           # 인트로 섹션
│   │       ├── section1.css        # CX 중요성 & 관리팀 소개
│   │       ├── section2.css        # 고객 컴플레인 스크린샷
│   │       ├── section3.css        # 질문 텍스트 섹션
│   │       ├── section4.css        # 문제점 카드 (가로 스크롤)
│   │       ├── section5.css        # INSIGHT (순차 등장)
│   │       ├── section6.css        # 개선안 1
│   │       ├── section7.css        # 개선안 2
│   │       ├── section8.css        # 개선점 카드 (가로 스크롤)
│   │       ├── section9.css        # A/B 테스트 소개
│   │       ├── section10.css       # A/B 테스트 결과 1
│   │       ├── section11.css       # A/B 테스트 결과 2
│   │       ├── section12.css       # 직원 피드백 (가로 스크롤)
│   │       ├── section13.css       # 보완점 질문
│   │       ├── section14.css       # 추가 개선 (가로 스크롤)
│   │       └── section15.css       # 마무리
│   │
│   ├── js/
│   │   ├── main.js                 # JavaScript 진입점
│   │   │                           # - 로딩 애니메이션
│   │   │                           # - 가로 스크롤 핸들러
│   │   │                           # - 섹션 5 순차 등장
│   │   │                           # - 프로그레스 바 애니메이션
│   │   │                           # - 텍스트 패럴랙스
│   │   │
│   │   └── utils/                  # 유틸리티 함수
│   │       ├── scroll.js           # 스크롤 관련 유틸리티
│   │       └── animations.js       # 애니메이션 유틸리티
│   │
│   └── images/                     # 이미지 파일
│       └── customerComplain.png    # 고객 컴플레인 스크린샷
```

---

## 사용 기술

| 분류 | 기술 |
|------|------|
| Markup | HTML5 |
| Styling | CSS3 (Grid, Flexbox, CSS Variables, Animations) |
| Scripting | JavaScript (ES6+) |
| Font | Pretendard, Inter, Space Grotesk |

---

## 실행 방법

### 방법 1: 직접 열기
`index.html` 파일을 브라우저에서 직접 열기

### 방법 2: 로컬 서버
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```
브라우저에서 `http://localhost:8000` 접속

---

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

---

## 개발자

**정성언** - CEO Staff
