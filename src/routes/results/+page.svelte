<script lang="ts">
  import { onMount } from 'svelte';
  import { userAnswersStore, type UserAnswer } from '../../lib/stores/quizStore';
  import { goto } from '@sveltejs/kit/navigation';

  let displayedAnswers: UserAnswer[] = [];

  onMount(() => {
    // 스토어의 현재 값을 구독하여 가져옵니다.
    const unsubscribe = userAnswersStore.subscribe(value => {
      displayedAnswers = value;
    });

    // 컴포넌트 언마운트 시 구독 해제
    return unsubscribe;
  });

  function goToHome() {
    // 답변 스토어를 초기화하고 메인 페이지로 이동합니다.
    userAnswersStore.set([]);
    goto('/');
  }
</script>

<svelte:head>
  <title>SACM 자기 진단 결과</title>
</svelte:head>

<main>
  <section class="results-section">
    <h1>SACM 자기 진단 결과</h1>
    <p>응답하신 결과는 다음과 같습니다:</p>
    <div class="answer-list">
      {#if displayedAnswers.length > 0}
        {#each displayedAnswers as answer, i}
          <p><strong>질문 {answer.questionIndex + 1}:</strong> 답변 - {answer.answer}</p>
        {/each}
      {:else}
        <p>아직 답변이 없습니다. 검사를 시작해주세요.</p>
      {/if}
    </div>
    <button class="restart-btn" on:click={goToHome}>처음으로</button>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    text-align: center;
    background: #f8fafc;
  }

  .results-section {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 2.5rem 2rem;
    max-width: 600px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #2563eb;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem; /* 답변 목록 간 간격 조정 */
    color: #334155;
  }

  .answer-list {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;
    width: 100%;
    max-height: 300px; /* 스크롤바를 위한 최대 높이 */
    overflow-y: auto; /* 내용이 많아지면 스크롤 */
    padding: 0 1rem; /* 내부 패딩 */
    box-sizing: border-box;
  }

  .answer-list p {
    background-color: #f1f5f9;
    padding: 0.8rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .answer-list p:last-child {
    margin-bottom: 0;
  }

  .restart-btn {
    background: #2563eb;
    color: #fff;
    font-size: 1.1rem;
    padding: 0.8rem 2.2rem;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    transition: background 0.2s;
    width: auto;
    min-width: 120px;
  }

  .restart-btn:hover {
    background: #1d4ed8;
  }

  @media (max-width: 600px) {
    .results-section {
      padding: 1.5rem 1rem;
      max-width: 95vw;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
</style> 