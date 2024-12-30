// Variables
let quizData;
const branchDropdown = document.getElementById("branch");
const semesterDropdown = document.getElementById("semester");
const getPyqsButton = document.getElementById("get-pyqs");
const chapterListContainer = document.querySelector(".chapter-list");
const dropdownContainer = document.querySelector(".dropdown-container");
const chapterList = document.getElementById("chapter-list");
const questionView = document.querySelector(".questions-view");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const prevQuestion = document.getElementById("prev-question");
const nextQuestion = document.getElementById("next-question");
const showSolutionButton = document.getElementById("show-solution");
const solutionContainer = document.getElementById("solution");

let selectedBranch = '';
let selectedSemester = '';
let currentQuestionIndex = 0;
let currentQuestions = [];

// Fetch JSON Data
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    populateBranchDropdown();
  })
  .catch(error => console.error("Error loading data:", error));

// Populate Branch Dropdown
function populateBranchDropdown() {
  const branches = Object.keys(quizData.branches);
  branchDropdown.innerHTML = `<option value="" disabled selected>Select Branch</option>` +
    branches.map(branch => `<option value="${branch}">${capitalize(branch)}</option>`).join("");
  
  branchDropdown.addEventListener("change", () => {
    semesterDropdown.disabled = false;
    populateSemesterDropdown();
  });
}

// Populate Semester Dropdown
function populateSemesterDropdown() {
  const branch = branchDropdown.value;
  const semesters = Object.keys(quizData.branches[branch].semesters);

  semesterDropdown.innerHTML = `<option value="" disabled selected>Select Semester</option>` +
    semesters.map(sem => `<option value="${sem}">${capitalize(sem)}</option>`).join("");
}

// Handle Get PYQs Button
getPyqsButton.addEventListener("click", () => {
  selectedBranch = branchDropdown.value;
  selectedSemester = semesterDropdown.value;

  if (selectedBranch && selectedSemester) {
    dropdownContainer.classList.add("hidden"); // Hide dropdowns
    chapterListContainer.classList.remove("hidden"); // Show chapter list
    populateChapters();
  } else {
    alert("Please select both branch and semester!");
  }
});

// Populate Chapter List
function populateChapters() {
  const chapters = Object.keys(quizData.branches[selectedBranch].semesters[selectedSemester].chapters);

  chapterList.innerHTML = chapters
    .map(chapter => `
      <li>
        <button class="chapter-button px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
          ${capitalize(chapter)}
        </button>
      </li>`).join("");

  const chapterButtons = document.querySelectorAll(".chapter-button");
  chapterButtons.forEach((button, index) => {
    button.addEventListener("click", () => startChapterQuiz(index));
  });
}

// Start Chapter Quiz
function startChapterQuiz(chapterIndex) {
  chapterListContainer.classList.add("hidden"); // Hide chapter list
  questionView.classList.remove("hidden"); // Show question view

  const chapters = Object.keys(quizData.branches[selectedBranch].semesters[selectedSemester].chapters);
  const selectedChapter = chapters[chapterIndex];
  currentQuestions = quizData.branches[selectedBranch].semesters[selectedSemester].chapters[selectedChapter];

  currentQuestionIndex = 0; // Start from the first question
  displayQuestion();
}

// Display a Single Question
function displayQuestion() {
  const question = currentQuestions[currentQuestionIndex];

  questionContainer.innerHTML = `
    <div class="navigation-buttons flex justify-between mb-4">
      <button id="prev-question" class="px-4 py-2 bg-gray-500 text-white rounded-md" ${
        currentQuestionIndex === 0 ? "disabled" : ""
      }>Previous Question</button>
      <button id="next-question" class="px-4 py-2 bg-blue-500 text-white rounded-md" ${
        currentQuestionIndex === currentQuestions.length - 1 ? "disabled" : ""
      }>Next Question</button>
    </div>

    <div class="question-text mb-4">
      <p><strong>Q${question.question_id}:</strong> ${question.question_text}</p>
    </div>

    <div class="solution-container">
      <button id="show-solution" class="px-4 py-2 bg-green-500 text-white rounded-md mt-4">Show Solution</button>
      <div id="solution" class="hidden mt-2">
        <p>${question.solution}</p>
      </div>
    </div>
  `;

  document.getElementById("prev-question").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    }
  });

  document.getElementById("show-solution").addEventListener("click", () => {
    const solutionContainer = document.getElementById("solution");
    solutionContainer.classList.toggle("hidden");
  });
}


// Show Solution Button
showSolutionButton.addEventListener("click", () => {
  solutionContainer.classList.toggle("hidden");
});

// Capitalize First Letter of Strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
