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
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            li.querySelector('.edit-btn').addEventListener('click', () => showEditEntry(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteEntry(index));
            entriesList.appendChild(li);
        });
    }

    // Show full entry when clicked
    function showFullEntry(index) {
        const entry = entries[index];
        alert(`Date: ${entry.date}\n\n${entry.content}`);
    }

    // Show edit entry form
    function showEditEntry(index) {
        const entry = entries[index];
        entryDate.value = entry.date;
        entryContent.value = entry.content;
        saveEntryBtn.textContent = 'Update Entry';
        saveEntryBtn.dataset.index = index;
    }

    // Update entry
    saveEntryBtn.addEventListener('click', () => {
        const date = entryDate.value;
        const content = entryContent.value.trim();

        if (!date || !content) {
            alert('Please enter both date and content');
            return;
        }

        const index = saveEntryBtn.dataset.index;
        if (index) {
            entries[index] = { date, content };
        } else {
            entries.push({ date, content });
        }

        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        entryDate.value = '';
        entryContent.value = '';
        saveEntryBtn.textContent = 'Save Entry';
        saveEntryBtn.removeAttribute('data-index');

        displayEntries();
    });

    // Delete entry
    function deleteEntry(index) {
        if (confirm('Are you sure you want to delete this entry?')) {
            entries.splice(index, 1);
            localStorage.setItem('diaryEntries', JSON.stringify(entries));
            displayEntries();
        }
    }

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    entryDate.value = today;

    // Initial display of entries
    displayEntries();
});