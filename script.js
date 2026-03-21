let sortDirections = [true, true, true, true];

fetch('data.txt')
  .then(response => response.text())
  .then(html => {
    document.getElementById("tableBody").outerHTML = html;
  })
  .catch(err => console.error("Failed to load table:", err));

function sortTable(colIndex) {
  const table = document.getElementById("ratingTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  const isNumeric = colIndex === 0 || colIndex === 2 || colIndex === 3;
  const direction = sortDirections[colIndex] ? 1 : -1;

  rows.sort((a, b) => {
    const valA = a.cells[colIndex].innerText.trim();
    const valB = b.cells[colIndex].innerText.trim();

    if (isNumeric) {
      return (Number(valA) - Number(valB)) * direction;
    } else {
      return valA.localeCompare(valB) * direction;
    }
  });

  rows.forEach(row => tbody.appendChild(row));

  for (let i = 0; i < 4; i++) {
    const arrow = document.getElementById(`arrow${i}`);
    arrow.textContent = i === colIndex ? (sortDirections[i] ? '↑' : '↓') : '↑';
  }

  sortDirections[colIndex] = !sortDirections[colIndex];
}