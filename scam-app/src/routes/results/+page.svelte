<script lang="ts">
  import { onMount } from 'svelte';
  import { userAnswersStore } from '$lib/stores/quizStore';
  import type { UserAnswer } from '$lib/stores/quizStore';
  import { get } from 'svelte/store';

  // SACM 설명 문구
  const sacmDescription =
    'SACM(Self-Analysis Cognitive Model)은 개인의 인지, 감정, 행동 패턴을 자기주도적으로 진단하고 이해하기 위한 심리적 자기분석 프레임워크입니다. 본 자기진단은 전문 심리 진단이 아니라 자기 성찰과 성장, 자기 이해를 돕기 위한 도구입니다.';

  // quiz/+page.svelte의 질문 배열 복사
  const questions = [
    {
      question: "새로운 지식과 기술을 배우는 것을 즐깁니다.",
      options: [
        { value: "1", text: "전혀 그렇지 않다" },
        { value: "2", text: "그렇지 않다" },
        { value: "3", text: "보통이다" },
        { value: "4", text: "그렇다" },
        { value: "5", text: "매우 그렇다" },
      ],
    },
    {
      question: "복잡한 문제를 분석하고 해결하는 것을 좋아합니다.",
      options: [
        { value: "1", text: "전혀 그렇지 않다" },
        { value: "2", text: "그렇지 않다" },
        { value: "3", text: "보통이다" },
        { value: "4", text: "그렇다" },
        { value: "5", text: "매우 그렇다" },
      ],
    },
    {
      question: "다른 사람들과 협력하여 목표를 달성하는 것에 보람을 느낍니다.",
      options: [
        { value: "1", text: "전혀 그렇지 않다" },
        { value: "2", text: "그렇지 않다" },
        { value: "3", text: "보통이다" },
        { value: "4", text: "그렇다" },
        { value: "5", text: "매우 그렇다" },
      ],
    },
    {
      question: "새로운 아이디어를 내고 이를 현실로 만드는 과정에 흥미가 많습니다.",
      options: [
        { value: "1", text: "전혀 그렇지 않다" },
        { value: "2", text: "그렇지 않다" },
        { value: "3", text: "보통이다" },
        { value: "4", text: "그렇다" },
        { value: "5", text: "매우 그렇다" },
      ],
    },
  ];

  // 프롬프트 템플릿 예시 (맨 앞에 {SACM설명} 추가)
  const promptTemplates = [
    {
      id: 'summary',
      label: '내 SACM 프로필 요약',
      template:
        '{SACM설명}\n\n아래는 저의 SACM 자기진단 결과입니다.\n{질문응답표}\n위 결과를 바탕으로 저의 인지 시스템 프로필을 요약해 주세요. 특히 점수가 높거나 낮은 항목들을 중심으로 저의 주요 경향성(예: 신중함, 빠른 반응 속도, 감정 중심적 사고 등)을 설명해 주시고, 이것이 어떤 의미를 가질 수 있을지 알려주세요.'
    },
    {
      id: 'strengths',
      label: '강점과 발전 영역 탐색',
      template:
        '{SACM설명}\n\n아래는 저의 SACM 자기진단 결과입니다.\n{질문응답표}\n이 결과를 볼 때, 어떤 부분들이 저의 잠재적인 강점(예: 높은 자기 인식, 효과적인 문제 해결 방식 등)으로 보이나요? 반대로, 어떤 부분들이 제가 앞으로 더 발전시키거나 주의를 기울일 필요가 있는 영역(예: 감정 조절의 어려움, 변화에 대한 저항 등)으로 보이나요?'
    },
    {
      id: 'situation',
      label: '특정 상황에 적용해보기',
      template:
        '{SACM설명}\n\n아래는 저의 SACM 자기진단 결과입니다.\n{질문응답표}\n최근 제가 겪었던 특정 상황(예: {구체적인 상황 설명})을 저의 SACM 프로필({점수/성찰 내용})에 비추어 분석해 주세요. 그 상황에서 저의 SACM 시스템의 각 부분(입력, 처리, 출력 등)이 어떻게 작동했을 것이라고 예상되나요? 실제 저의 반응과 얼마나 일치하나요?'
    }
  ];

  let selectedTemplateId = promptTemplates[0].id;
  let userScoreSummary = '';
  let userSituation = '';

  // 답변 데이터
  let userAnswers: UserAnswer[] = [];

  // 질문-답변 쌍 자동 매핑
  $: questionAnswerPairs = questions.map((q, idx) => {
    const answerObj = userAnswers.find(a => a.questionIndex === idx);
    return {
      idx: idx + 1,
      question: q.question,
      answer: answerObj ? answerObj.answer : '-'
    };
  });

  // 질문-응답 표 텍스트 생성
  $: qaTableText = questionAnswerPairs
    .filter(pair => pair.answer !== '-')
    .map(pair => `${pair.idx}. ${pair.question} : ${pair.answer}점`)
    .join('\n');

  // 자동 요약 텍스트 생성 (예: '1번: 4점, 2번: 2점 ...')
  $: autoSummary = questionAnswerPairs
    .filter(pair => pair.answer !== '-')
    .map(pair => `${pair.idx}번: ${pair.answer}점`)
    .join(', ');

  // 프롬프트 입력란에 자동 반영 (직접 수정도 가능)
  $: if (autoSummary && !userScoreSummary) {
    userScoreSummary = autoSummary;
  }

  $: selectedTemplate = promptTemplates.find(t => t.id === selectedTemplateId);

  $: generatedPrompt = (() => {
    if (!selectedTemplate) return '';
    let prompt = selectedTemplate.template;
    prompt = prompt.replace('{점수/성찰 내용}', userScoreSummary || '[여기에 점수/성찰 내용 입력]');
    prompt = prompt.replace('{구체적인 상황 설명}', userSituation || '[상황 설명 입력]');
    prompt = prompt.replace('{질문응답표}', qaTableText || '[질문과 응답이 없습니다]');
    prompt = prompt.replace('{SACM설명}', sacmDescription);
    return prompt;
  })();

  function copyPrompt() {
    navigator.clipboard.writeText(generatedPrompt);
    alert('프롬프트가 복사되었습니다!');
  }

  // 마운트 시 답변 불러오기
  onMount(() => {
    userAnswers = get(userAnswersStore);
  });
</script>

<svelte:head>
  <title>SACM 검사 결과 및 프롬프트 생성</title>
</svelte:head>

<main class="result-container">
  <section class="result-section">
    <h1>검사 결과</h1>
    <div class="result-summary">
      <table class="qa-table">
        <thead>
          <tr><th>번호</th><th>질문</th><th>내 점수</th></tr>
        </thead>
        <tbody>
          {#each questionAnswerPairs as pair}
            <tr>
              <td>{pair.idx}</td>
              <td>{pair.question}</td>
              <td>{pair.answer}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="auto-summary">
        <strong>자동 요약:</strong> {autoSummary}
      </div>
    </div>
  </section>

  <section class="prompt-section">
    <h2>프롬프트 생성기</h2>
    <label>
      프롬프트 유형 선택:
      <select bind:value={selectedTemplateId}>
        {#each promptTemplates as t}
          <option value={t.id}>{t.label}</option>
        {/each}
      </select>
    </label>

    {#if selectedTemplateId === 'summary' || selectedTemplateId === 'strengths'}
      <label class="input-label">
        점수/성찰 요약 입력:
        <textarea bind:value={userScoreSummary} rows="2" placeholder="예: 1번 4점, 2번 2점... 또는 느낀 점 등"></textarea>
      </label>
    {/if}
    {#if selectedTemplateId === 'situation'}
      <label class="input-label">
        상황 설명 입력:
        <input type="text" bind:value={userSituation} placeholder="예: 최근 팀 프로젝트에서..." />
      </label>
      <label class="input-label">
        점수/성찰 요약 입력:
        <textarea bind:value={userScoreSummary} rows="2" placeholder="예: 1번 4점, 2번 2점... 또는 느낀 점 등"></textarea>
      </label>
    {/if}

    <div class="prompt-preview">
      <strong>완성된 프롬프트 미리보기:</strong>
      <pre>{generatedPrompt}</pre>
      <button class="copy-btn" on:click={copyPrompt}>프롬프트 복사</button>
    </div>
  </section>
</main>

<style>
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  min-height: 80vh;
  background: #f8fafc;
  padding: 2rem 0;
}
.result-section, .prompt-section {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  max-width: 520px;
  width: 100%;
  margin-bottom: 1rem;
}
.result-section h1 {
  font-size: 1.7rem;
  color: #2563eb;
  margin-bottom: 1rem;
}
.result-summary {
  color: #334155;
  font-size: 1.1rem;
}
.qa-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.qa-table th, .qa-table td {
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.7rem;
  text-align: left;
}
.qa-table th {
  background: #f1f5f9;
  color: #475569;
}
.auto-summary {
  margin-top: 0.5rem;
  color: #475569;
  font-size: 1rem;
}
.prompt-section h2 {
  font-size: 1.3rem;
  color: #475569;
  margin-bottom: 1rem;
}
.input-label {
  display: block;
  margin: 1rem 0 0.5rem 0;
  color: #475569;
}
textarea, input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  margin-top: 0.3rem;
  font-size: 1rem;
}
select {
  margin-left: 0.5rem;
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
}
.prompt-preview {
  margin-top: 1.5rem;
  background: #f1f5f9;
  border-radius: 0.7rem;
  padding: 1rem;
  font-size: 1rem;
  color: #334155;
}
.prompt-preview pre {
  word-break: break-all;
  white-space: pre-wrap;
  max-width: 100%;
  overflow-x: auto;
  background: none;
  margin: 0.5rem 0 0 0;
  padding: 0;
  font-family: inherit;
}
.copy-btn {
  margin-top: 0.7rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 1.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.copy-btn:hover {
  background: #1d4ed8;
}
@media (max-width: 600px) {
  .result-section, .prompt-section {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .qa-table th, .qa-table td {
    font-size: 0.95rem;
    padding: 0.3rem 0.3rem;
  }
}
</style> 