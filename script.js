let quizData;

// Fetch JSON data
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
  branchDropdown.innerHTML = `<option value="" disabled selected>Select Branch</option>` +
    branches.map(branch => `<option value="${branch}">${capitalize(branch)}</option>`).join("");
  branchDropdown.addEventListener("change", populateSemesterDropdown);
}

// Populate semester dropdown
function populateSemesterDropdown() {
  const branch = branchDropdown.value;
  semesterDropdown.disabled = false;
  semesterDropdown.innerHTML = `<option value="" disabled selected>Select Semester</option>`;
  
  const semesters = Object.keys(quizData.branches[branch].semesters);
  semesterDropdown.innerHTML += semesters.map(sem => `<option value="${sem}">${capitalize(sem)}</option>`).join("");
  semesterDropdown.addEventListener("change", populateChapterDropdown);
}

// Populate chapter dropdown
function populateChapterDropdown() {
  const branch = branchDropdown.value;
  const semester = semesterDropdown.value;
  chapterDropdown.disabled = false;
  chapterDropdown.innerHTML = `<option value="" disabled selected>Select Chapter</option>`;
  
  const chapters = Object.keys(quizData.branches[branch].semesters[semester].chapters);
  chapterDropdown.innerHTML += chapters.map(chap => `<option value="${chap}">${capitalize(chap)}</option>`).join("");
  chapterDropdown.addEventListener("change", displayQuestions);
}

// Display questions
function displayQuestions() {
  const branch = branchDropdown.value;
  const semester = semesterDropdown.value;
  const chapter = chapterDropdown.value;

  const questions = quizData.branches[branch].semesters[semester].chapters[chapter];
  questionsContainer.innerHTML = questions.map(q => `
    <div class="card glass mt-2">
      <div class="card-content">
        <p><strong>Q${q.question_id}:</strong> ${q.question_text}</p>
        <button class="btn btn--success btn--sm mt-2" onclick="toggleSolution(${q.question_id})">Show Solution</button>
        <p id="solution-${q.question_id}" class="hidden mt-2">${q.solution}</p>
      </div>
    </div>
  `).join("");
}

// Toggle solution visibility
function toggleSolution(questionId) {
  const solutionElement = document.getElementById(`solution-${questionId}`);
  solutionElement.classList.toggle("hidden");
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.src = document.body.classList.contains("dark-theme") ? "assets/dark-icon.svg" : "assets/light-icon.svg";
});
