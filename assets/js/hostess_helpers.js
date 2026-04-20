
// === NEW HOSTESS FUNCTIONS FOR REASON/GAME ===
// === NEW HOSTESS FUNCTIONS FOR REASON/GAME ===
window.generateGameOptions = function (selected) {
    const allMatches = window.db.getMatches() || [];
    // CRITICAL: Strict filter for TODAY only (Local YYYY-MM-DD)
    const today = new Date().toLocaleDateString('en-CA');
    const matches = allMatches.filter(m => m.date === today);

    if (matches.length === 0 && !selected) return '<option disabled>Sin partidos hoy</option>';

    // DEDUPLICATION LOGIC
    const seen = new Set();
    const uniqueMatches = matches.filter(m => {
        const name = m.match || `${m.homeTeam} vs ${m.awayTeam}`;
        // Normalize for comparison
        const key = name.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    let html = uniqueMatches.map(m => {
        // Handle both structure types
        const matchName = m.match || (m.homeTeam && m.awayTeam ? `${m.homeTeam} vs ${m.awayTeam}` : 'Partido Desconocido');
        const isSelected = matchName === selected;
        return `<option value="${matchName}" ${isSelected ? 'selected' : ''}>${matchName} (${m.time})</option>`;
    }).join('');

    // If selected game is NOT in today's list (e.g. was deleted or date changed), show it anyway to avoid data loss visual
    if (selected && !uniqueMatches.find(m => (m.match || `${m.homeTeam} vs ${m.awayTeam}`) === selected)) {
        html += `<option value="${selected}" selected>${selected} (⚠️ No en lista de hoy)</option>`;
    }

    return html;
};

window.updateHostessReason = function (visitId, selectEl) {
    const reason = selectEl.value;
    const gameDiv = document.getElementById(`hostess-game-select-${visitId}`);

    // Show/Hide game select
    if (reason === 'Partido') {
        if (gameDiv) gameDiv.classList.remove('hidden');
    } else {
        if (gameDiv) gameDiv.classList.add('hidden');
    }

    // Save immediately
    window.db.updateVisitDetails(visitId, { reason });
};

window.updateHostessGame = function (visitId, selectEl) {
    const selectedGame = selectEl.value;
    window.db.updateVisitDetails(visitId, { selectedGame });
};
