# SACM 자기 진단 웹 도구

**SACM(Self-Analysis Cognitive Model) 기반 자기주도적 역량 진단 웹앱**  
SvelteKit 기반으로 개발된 자기 진단 도구로, 사용자가 자신의 인지·감정·행동 패턴을 쉽고 빠르게 진단하고 시각적으로 확인할 수 있습니다.

---

## 주요 특징

- **SvelteKit 기반**: 빠른 렌더링, 반응형 UI, 클라이언트 중심 데이터 처리
- **자기주도적 검사**: 문항에 응답하면 즉시 역량 프로필을 시각화
- **프라이버시 보장**: 모든 데이터는 브라우저 내에서만 처리, 서버 저장 없음
- **차트 시각화**: Chart.js 등으로 결과를 직관적으로 표시
- **동적 프롬프트/분석 지원**: gemini_chart 디렉토리의 프롬프트로 자기 해석 가이드 제공
- **향후 확장성**: 결과 공유, 계정 연동, 대시보드 등 로드맵 반영

---

## 폴더 구조

```
scam-app/
  ├─ src/
  │   ├─ routes/
  │   │   ├─ +page.svelte      # 메인(소개) 페이지
  │   │   ├─ quiz/+page.svelte # 검사(진단) 페이지
  │   │   └─ demo/             # 데모/실험용 라우트
  ├─ package.json
  └─ ...
gemini_chart/
  ├─ chart.md   # SACM 차트 설명 및 문항
  └─ prompt.md  # 자기 해석용 프롬프트 예시
prd.md          # 제품 요구사항(PRD)
```

---

## 주요 페이지 및 사용법

### 1. 메인(소개) 페이지
- `/`  
  SACM 자기 진단 도구 소개, 검사 시작 버튼 제공

### 2. 검사(진단) 페이지
- `/quiz`  
  자기주도적 역량 진단 문항에 응답  
  각 문항은 1~5점 척도, 솔직하게 선택

### 3. 결과 페이지
- `/results`  
  (구현 예정)  
  응답 결과를 바탕으로 역량 프로필 차트 및 해석 제공  
  gemini_chart/chart.md의 SACM 차트 기준 활용  
  gemini_chart/prompt.md의 프롬프트로 자기 해석 가이드 제공

---

## 실행 방법

```bash
cd scam-app
npm install
npm run dev
```
- 브라우저에서 `http://localhost:5173` 접속

### 빌드/배포
```bash
npm run build
npm run preview
```
- Vercel, Netlify 등 SvelteKit 호스팅 지원 플랫폼에 배포 가능

---

## 기술 스택

- **프레임워크**: SvelteKit
- **스타일링**: Svelte Scoped CSS, Tailwind CSS(일부)
- **차트**: Chart.js, LayerCake(선택적)
- **상태관리**: Svelte Store
- **테스트**: Vitest, Playwright
- **배포**: Vercel, Netlify, Cloudflare Pages 등

---

## 차트/프롬프트 기능

- **gemini_chart/chart.md**  
  SACM 자기 진단의 각 문항 및 차트 해설 기준 제공  
  (예: 신호 민감성, 논리/감정 우선, 문제 접근 방식 등 6개 영역)

- **gemini_chart/prompt.md**  
  결과 해석, 강점/약점 탐색, 자기 성장 가이드 등 프롬프트 예시  
  (예: "내 SACM 프로필 요약", "강점과 발전 영역 탐색", "특정 상황 적용 분석" 등)

---

## 참고/로드맵

- **prd.md**: 제품 요구사항, 기술 스택, 향후 기능(결과 공유, 계정 연동 등) 명시
- **향후**: 결과 공유, SSR 기반 결과 페이지, 사용자 대시보드 등 확장 예정

---

### ✨ 기여/문의

- 이 저장소는 SACM 자기 진단 도구의 오픈소스 실험 프로젝트입니다.
- 개선 제안, 버그 리포트, PR 환영!
