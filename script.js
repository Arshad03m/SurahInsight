const surahListContainer = document.getElementById('surah-list');
const totalSurahs = 114;

// To store the JSON data
let surahData = {};

// Fetch data from the JSON file
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    surahData = data;

    // Generate Surah items for all 114 Surahs
    for (let i = 1; i <= totalSurahs; i++) {
      const surahId = `surah${i}`; // Construct Surah ID dynamically

      // Create a new div for each Surah item
      const surahItem = document.createElement('div');
      surahItem.className = 'surah-item';

      // Check if data for this Surah is available
      if (surahData[surahId]) {
        const surah = surahData[surahId];
        surahItem.innerHTML = ` 
          <div><strong>${i}. ${surah.SurahName}</strong></div>
          <div style="font-size: 0.9em; color: #7D977D;">(<strong>${surah.Translation}</strong>)</div>
        `; // Display name above and translation below with smaller font for translation
      } else {
        surahItem.textContent = `Surah ${i}`; // Placeholder for unavailable Surahs
      }

      // Assign an onclick event that calls displaySurah with the correct Surah ID
      surahItem.onclick = () => displaySurah(surahId);

      // Append the item to the container
      surahListContainer.appendChild(surahItem);
    }
  })
  .catch((error) => console.error("Error loading Surah data:", error));

// Function to display Surah content
function displaySurah(surahId) {
  const contentDiv = document.getElementById("surah-content");
  const surah = surahData[surahId];

  // Display Surah content if data is available
  if (surah) {
    contentDiv.innerHTML = `
      <h2>${surah.SurahName} (${surah.Translation})</h2>
      <p><strong>Surah Number:</strong> ${surah.ChapterNumber}</p>
      <p><strong>Revelation Place:</strong> ${surah.RevelationPlace}</p>
      <p><strong>Total Verses:</strong> ${surah.TotalVerses}</p>
      <p><strong>Description:</strong> ${surah.Description}</p>
      <h3>Key Themes</h3>
      <ul>
      
      ${Object.entries(surah.KeyThemes).map(([key, value]) => `
        <li><strong>${key.replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase
                       .toLowerCase() // Convert to lowercase
                       .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
                       .replace(/\ballah\b/, 'Allah')}:</strong> 
          ${Array.isArray(value) ? `<ul>${value.map(item => `<li>${item}</li>`).join('')}</ul>` : value}
        </li>
      `).join('')}
      
      
      
      </ul>
    `;
  } else {
    // Placeholder for unavailable Surah data
    contentDiv.innerHTML = "<h2>Will be updated soon!</h2>";
  }
}
