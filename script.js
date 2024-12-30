// Fetching JSON data
let quizData;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    populateBranchDropdown();
  });

const branchDropdown = document.getElementById("branch");
const semesterDropdown = document.getElementById("semester");
const chapterDropdown = document.getElementById("chapter");
const questionsContainer = document.getElementById("questions-container");

// Populate branch dropdown
function populateBranchDropdown() {
  const branches = Object.keys(quizData.branches);
  branchDropdown.innerHTML = branches.map(branch => `<option value="${branch}">${branch}</option>`).join("");
  branchDropdown.addEventListener("change", populateSemesterDropdown);
}

// Populate semester dropdown
function populateSemesterDropdown() {
  const branch = branchDropdown.value;
  semesterDropdown.innerHTML = "";
  semesterDropdown.disabled = false;

  const semesters = Object.keys(quizData.branches[branch].semesters);
  semesterDropdown.innerHTML = semesters.map(sem => `<option value="${sem}">${sem}</option>`).join("");
  semesterDropdown.addEventListener("change", populateChapterDropdown);
}

// Populate chapter dropdown
function populateChapterDropdown() {
  const branch = branchDropdown.value;
  const semester = semesterDropdown.value;
  chapterDropdown.innerHTML = "";
  chapterDropdown.disabled = false;

  const chapters = Object.keys(quizData.branches[branch].semesters[semester].chapters);
  chapterDropdown.innerHTML = chapters.map(chap => `<option value="${chap}">${chap}</option>`).join("");
  chapterDropdown.addEventListener("change", displayQuestions);
}

// Display questions
function displayQuestions() {
  const branch = branchDropdown.value;
  const semester = semesterDropdown.value;
  const chapter = chapterDropdown.value;

  const questions = quizData.branches[branch].semesters[semester].chapters[chapter];
  questionsContainer.innerHTML = questions.map(q => `
    <div class="question-card">
      <p>${q.question_id}. ${q.question_text}</p>
      <button class="show-solution" onclick="toggleSolution(${q.question_id})">Show Solution</button>
      <p id="solution-${q.question_id}" style="display:none;">${q.solution}</p>
    </div>
  `).join("");
}

// Toggle solution visibility
function toggleSolution(questionId) {
  const solutionElement = document.getElementById(`solution-${questionId}`);
  solutionElement.style.display = solutionElement.style.display === "none" ? "block" : "none";
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.src = document.body.classList.contains("dark-mode") ? "assets/dark-icon.svg" : "assets/light-icon.svg";
});
