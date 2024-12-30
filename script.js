// Dummy Question Data (this would usually be dynamic, based on selected chapter)
const quizData = {
  "chapter1": [
    { 
      "question_id": 1,
      "question_text": "Define the following terms with examples: a) Morpheme b) Prefix c) Homograms d) Auxiliary Verb e) IPA",
      "solution": "A morpheme is the smallest unit of meaning in language."
    },
    { 
      "question_id": 2,
      "question_text": "What is the root word of 'unbreakable'?",
      "solution": "The root word is 'break'."
    }
  ],
  "chapter2": [
    { 
      "question_id": 1,
      "question_text": "What is a synonym for 'difficult'?",
      "solution": "A synonym for difficult is 'hard'."
    }
  ]
};

// Event listener to show questions based on chapter selection
document.getElementById('chapter').addEventListener('change', function() {
  const selectedChapter = this.value;
  displayQuestions(selectedChapter);
});

// Function to display questions for the selected chapter
function displayQuestions(chapter) {
  const questionsContainer = document.getElementById('questions-container');
  questionsContainer.innerHTML = ""; // Clear previous questions
  
  const selectedQuestions = quizData[chapter];
  if (!selectedQuestions) return; // If no questions for selected chapter

  selectedQuestions.forEach(question => {
    // Create a question card with "Show Solution" button
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    
    const questionContent = `
      <p>${question.question_id}. ${question.question_text}</p>
      <button class="show-solution" onclick="showSolution(${question.question_id})">Show Solution</button>
      <div id="solution-${question.question_id}" class="solution-text">${question.solution}</div>
    `;
    
    questionCard.innerHTML = questionContent;
    questionsContainer.appendChild(questionCard);
  });
}

// Toggle solution visibility
function showSolution(questionId) {
  const solutionElement = document.getElementById(`solution-${questionId}`);
  solutionElement.style.display = solutionElement.style.display === "none" || solutionElement.style.display === "" ? "block" : "none";
}

// Initial call to populate questions for Chapter 1
document.addEventListener("DOMContentLoaded", () => displayQuestions("chapter1"));
