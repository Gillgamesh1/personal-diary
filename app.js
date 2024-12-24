document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.querySelector('.entry-form');
    const entryDate = document.getElementById('entryDate');
    const entryContent = document.getElementById('entryContent');
    const saveEntryBtn = document.getElementById('saveEntry');
    const entriesList = document.getElementById('entriesList');

    // Load entries from local storage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    // Display existing entries
    function displayEntries() {
        entriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${entry.date}</strong>
                <p>${entry.content.substring(0, 50)}${entry.content.length > 50 ? '...' : ''}</p>
            `;
            li.addEventListener('click', () => showFullEntry(index));
            entriesList.appendChild(li);
        });
    }

    // Show full entry when clicked
    function showFullEntry(index) {
        const entry = entries[index];
        alert(`Date: ${entry.date}\n\n${entry.content}`);
    }

    // Save new entry
    saveEntryBtn.addEventListener('click', () => {
        const date = entryDate.value;
        const content = entryContent.value.trim();

        if (!date || !content) {
            alert('Please enter both date and content');
            return;
        }

        entries.push({ date, content });
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        entryDate.value = '';
        entryContent.value = '';

        displayEntries();
    });

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    entryDate.value = today;

    // Initial display of entries
    displayEntries();
});