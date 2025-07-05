<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let question: string; // 질문 텍스트
  export let options: { value: string; text: string }[]; // 답변 옵션 배열
  export let selectedAnswer: string | null = null; // 현재 선택된 답변 (부모로부터 바인딩)

  const dispatch = createEventDispatcher();

  // 라디오 버튼 변경 시 호출될 함수
  function handleOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedAnswer = target.value;
    // 부모 컴포넌트로 선택된 답변 값을 디스패치합니다.
    dispatch('answerSelected', selectedAnswer);
  }
</script>

<div class="question-container">
  <p class="question">{question}</p>
  <div class="options">
    {#each options as option}
      <label>
        <input
          type="radio"
          name="answer"
          value={option.value}
          on:change={handleOptionChange}
          checked={selectedAnswer === option.value} /> <!-- 현재 선택된 답변과 일치하는지 확인 -->
        {option.text}
      </label>
    {/each}
  </div>
</div>

<style>
  /* quiz-section의 하위 스타일 중 질문/옵션 관련 스타일을 가져옵니다. */
  .question {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #334155;
    font-weight: bold;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .options label {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    color: #475569;
    font-size: 1rem;
  }

  .options label:hover {
    background: #f1f5f9;
    border-color: #93c5fd;
  }

  .options input[type="radio"] {
    margin-right: 0.8rem;
    transform: scale(1.2);
    accent-color: #2563eb; /* 체크된 라디오 버튼 색상 */
  }

  @media (max-width: 600px) {
    .question {
      font-size: 1.1rem;
    }
  }
</style> 