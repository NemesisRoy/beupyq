const branchDropdown = document.getElementById('branch');
const semesterDropdown = document.getElementById('semester');
const chaptersList = document.getElementById('chapters-list');

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

branchDropdown.addEventListener('change', () => {
  const branch = branchDropdown.value;
  semesterDropdown.disabled = !branch;
  semesterDropdown.innerHTML = semesters.map(sem => `<option value="${sem}">Semester ${sem}</option>`).join('');
  chaptersList.innerHTML = ''; // Clear chapters
});

semesterDropdown.addEventListener('change', () => {
  const semester = semesterDropdown.value;
  const dummyChapters = ["Chapter 1", "Chapter 2", "Chapter 3"];
  chaptersList.innerHTML = dummyChapters.map(chapter => `<li>${chapter}</li>`).join('');
});