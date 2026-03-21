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

  const direction = sortDirections[colIndex] ? 1 : -1;

  rows.sort((a, b) => {
    const cellA = a.cells[colIndex];
    const cellB = b.cells[colIndex];

    // Helper function to safely get the number or text
    const getValue = (cell) => {
      // 1. Look for specific spans first
      const placeSpan = cell.querySelector('.place');
      const eloSpan = cell.querySelector('.elo');

      if (placeSpan) return placeSpan.innerText.trim();
      if (eloSpan) return eloSpan.innerText.trim();
      
      // 2. Fallback to direct text if spans aren't found
      return cell.innerText.trim();
    };

    const valA = getValue(cellA);
    const valB = getValue(cellB);

    // Sorting logic
    const isNumeric = colIndex === 0 || colIndex === 2 || colIndex === 3;

    if (isNumeric) {
      // parseFloat is safer than Number() for strings with hidden characters
      return (parseFloat(valA) - parseFloat(valB)) * direction;
    } else {
      return valA.localeCompare(valB) * direction;
    }
  });

  // Re-render the rows
  rows.forEach(row => tbody.appendChild(row));

  // Update Arrows (with null check for the element)
  for (let i = 0; i < 4; i++) {
    const arrow = document.getElementById(`arrow${i}`);
    if (arrow) {
      arrow.textContent = i === colIndex ? (sortDirections[i] ? '↑' : '↓') : '↑';
    }
  }

  sortDirections[colIndex] = !sortDirections[colIndex];
}