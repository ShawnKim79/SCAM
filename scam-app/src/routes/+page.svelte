<svelte:head>
  <title>SACM 자기 진단 웹 도구</title>
  <meta name="description" content="SACM 자기 진단 웹 도구 - 자기주도적 역량 진단을 위한 SvelteKit 기반 웹앱" />
</svelte:head>

<main class="intro-container">
  <section class="intro-section">
    <h1>SACM 자기 진단 웹 도구</h1>
    <p class="intro-desc">
      본 도구는 자기주도적 역량 진단을 쉽고 빠르게 할 수 있도록 설계된 웹 애플리케이션입니다.<br />
      아래 안내에 따라 검사를 시작해보세요.
    </p>
    <ol class="usage-guide">
      <li>1. <b>검사 시작</b> 버튼을 클릭합니다.</li>
      <li>2. 각 문항에 솔직하게 응답합니다.</li>
      <li>3. 결과 페이지에서 자신의 역량 프로필을 확인합니다.</li>
    </ol>
    <a href="/quiz" class="start-btn" aria-label="검사 시작">검사 시작</a>
  </section>
</main>

<style>
.intro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f8fafc;
}
.intro-section {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
}
.intro-section h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2563eb;
}
.intro-desc {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #334155;
}
.usage-guide {
  text-align: left;
  margin: 1.5rem 0 2rem 0;
  padding-left: 1.2rem;
  color: #475569;
}
.start-btn {
  background: #2563eb;
  color: #fff;
  font-size: 1.1rem;
  padding: 0.8rem 2.2rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.start-btn:hover {
  background: #1d4ed8;
}
@media (max-width: 600px) {
  .intro-section {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .intro-section h1 {
    font-size: 1.3rem;
  }
}
</style>
