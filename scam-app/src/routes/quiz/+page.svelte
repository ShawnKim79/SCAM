<svelte:head>
  <title>SACM 자기 진단 검사</title>
</svelte:head>

<script lang="ts">
  import QuizQuestion from '$lib/components/QuizQuestion.svelte';
  import { goto } from '$app/navigation'; // 페이지 이동을 위한 goto 함수 임포트
  import { userAnswersStore } from '$lib/stores/quizStore'; // 답변 저장을 위한 스토어 임포트
  import type { UserAnswer } from '$lib/stores/quizStore'; // UserAnswer 타입 임포트

  let currentQuestionIndex = 0; // 현재 질문 인덱스
  let selectedAnswer: string | null = null; // 사용자가 선택한 답변을 저장할 변수
  // let userAnswers: { questionIndex: number; answer: string }[] = []; // 이제 스토어를 사용하므로 필요 없음

  // 실제 질문 데이터 (예시)
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

  // 현재 표시될 질문 데이터를 계산합니다.
  $: currentQuizItem = questions[currentQuestionIndex];

  function handleAnswerSelected(event: CustomEvent<string>) {
    selectedAnswer = event.detail;
  }

  async function handleNext() { // 비동기 함수로 변경
    if (selectedAnswer !== null) {
      // 현재 질문의 답변을 스토어에 저장합니다.
      userAnswersStore.update((currentAnswers: UserAnswer[]) => [...currentAnswers, { questionIndex: currentQuestionIndex, answer: selectedAnswer! }]);

      // 다음 질문으로 이동하거나 검사를 완료합니다.
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedAnswer = null; // 다음 질문을 위해 선택된 답변 초기화
      } else {
        // 모든 질문에 답변했습니다. 결과 페이지로 이동합니다.
        console.log('모든 질문에 답변했습니다. 결과 페이지로 이동합니다.');
        // TODO: 결과 페이지로 이동하는 로직 추가
        await goto('/results');
      }
    } else {
      alert('답변을 선택해주세요.');
    }
  }
</script>

<main>
  <section class="quiz-section">
    <h1>SACM 자기 진단 검사 ({currentQuestionIndex + 1}/{questions.length})</h1>
    {#if currentQuizItem}
      <QuizQuestion
        question={currentQuizItem.question}
        options={currentQuizItem.options}
        bind:selectedAnswer
        on:answerSelected={handleAnswerSelected}
      />
    {/if}
    <button class="next-btn" on:click={handleNext}>다음</button>
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

  .quiz-section {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 2.5rem 2rem;
    max-width: 500px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #2563eb;
  }

  .next-btn {
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

  .next-btn:hover {
    background: #1d4ed8;
  }

  @media (max-width: 600px) {
    .quiz-section {
      padding: 1.5rem 1rem;
      max-width: 95vw;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
</style> 