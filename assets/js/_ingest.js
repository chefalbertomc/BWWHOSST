window.SportIngestor = class {
    constructor() {
        // ESPN Public Endpoints via LOCAL PROXY (Bypasses CORS)
        this.localProxy = "http://localhost:8006/proxy?url=";
        this.baseUrl = "https://site.api.espn.com/apis/site/v2/sports";
    }

    // Helper: Mags ESPN Slug parts
    // soccer/mex.1
    // basketball/nba
    getEndpoint(type, id) {
        // Handle special cases
        if (type === 'racing') return `${this.baseUrl}/racing/f1/scoreboard`;
        if (type === 'mma') return `${this.baseUrl}/mma/ufc/scoreboard`;
        if (type === 'boxing') return `${this.baseUrl}/boxing/boxing/scoreboard`;

        // Basic routing
        if (id === 'nfl') return `${this.baseUrl}/football/nfl/scoreboard`;
        if (id === 'nba') return `${this.baseUrl}/basketball/nba/scoreboard`;
        if (id === 'mlb') return `${this.baseUrl}/baseball/mlb/scoreboard`;

        // Soccer routing
        if (type === 'soccer') {
            return `${this.baseUrl}/soccer/${id}/scoreboard`;
        }

        return null;
    }

    async fetchEspnLeague(leagueConfig) {
        const url = this.getEndpoint(leagueConfig.type, leagueConfig.id);
        if (!url) return [];

        try {
            // Use LOCAL Proxy + URL
            const finalUrl = this.localProxy + encodeURIComponent(url);
            console.log(`📡 ESPN Fetch via Local Proxy: ${leagueConfig.name}`);

            const res = await fetch(finalUrl);
            if (!res.ok) throw new Error(`Proxy Error ${res.status}`);
            const data = await res.json();

            console.log(`✅ ${leagueConfig.name}: Received ${data.events?.length || 0} events`);
            return data.events || [];
        } catch (e) {
            console.error(`⚠️ ESPN Fetch Failed for ${leagueConfig.name}:`, e);
            return []; // Fail silently per league to allow others
        }
    }

    // --- FALLBACK MODE (Safety Net) ---
    getFallbackGames() {
        const today = new Date().toLocaleDateString('en-CA');
        console.log("🛡️ Activating Fallback Games for:", today);
        return [
            { id: 'fb_nba_1', league: 'NBA', homeTeam: 'Los Angeles Lakers', awayTeam: 'Golden State Warriors', date: today, time: '21:00', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_2', league: 'NBA', homeTeam: 'Boston Celtics', awayTeam: 'Miami Heat', date: today, time: '18:30', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_3', league: 'NBA', homeTeam: 'New York Knicks', awayTeam: 'Brooklyn Nets', date: today, time: '19:00', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_4', league: 'NBA', homeTeam: 'Chicago Bulls', awayTeam: 'Milwaukee Bucks', date: today, time: '19:30', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_5', league: 'NBA', homeTeam: 'Dallas Mavericks', awayTeam: 'Phoenix Suns', date: today, time: '20:00', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_6', league: 'NBA', homeTeam: 'Denver Nuggets', awayTeam: 'OKC Thunder', date: today, time: '20:30', sport: 'Basketball', status: 'pre' },
            { id: 'fb_nba_7', league: 'NBA', homeTeam: 'Philadelphia 76ers', awayTeam: 'Toronto Raptors', date: today, time: '18:00', sport: 'Basketball', status: 'pre' }
        ];
    }

    async runIngest() {
        if (!window.db || !window.db.data) return console.error("Database not ready");

        const config = window.db.data.ingestionConfig || { leagues: [] };
        console.log('🚀 Starting ESPN Ingest via Local Proxy...');

        let newGames = [];
        // CRITICAL: Use same date format as UI expects
        const todayLocal = new Date().toLocaleDateString('en-CA');
        console.log(`📅 Local Date: ${todayLocal}`);

        // RE-ENABLE ESPN API via Local Proxy
        if (config.leagues) {
            for (const league of config.leagues) {
                if (!league.active) continue;

                const events = await this.fetchEspnLeague(league);
                console.log(`🔎 ESPN ${league.name}: Found ${events.length} raw events.`);

                events.forEach(e => {
                    // Start permissive: Accept 'pre' (scheduled), 'in' (live), 'post' (finished recently)
                    const status = e.status?.type?.state;

                    // ESPN Data Structure
                    const competition = e.competitions?.[0];
                    if (!competition) return;

                    const gameDate = new Date(e.date); // "2026-01-27T19:00:00Z" (UTC)
                    // Convert to Local Date String for storage
                    const dateStr = gameDate.toLocaleDateString('en-CA'); // YYYY-MM-DD local
                    const timeStr = gameDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

                    // 1. DATE FILTER: Allow Today AND Future (for upcoming games in list)
                    if (dateStr < todayLocal) {
                        // console.log(`⏩ Skipping old game: ${e.shortName} (${dateStr})`);
                        return;
                    }

                    // SAFETY CHECK: Ensure competitors exist (F1 sometimes lacks this structure or is different)
                    if (!competition.competitors || !Array.isArray(competition.competitors)) {
                        console.warn(`⚠️ Skipping event due to missing competitors: ${e.shortName || e.id}`);
                        return;
                    }

                    const home = competition.competitors.find(c => c.homeAway === 'home');
                    const away = competition.competitors.find(c => c.homeAway === 'away');

                    // Specific Handling for F1/MMA/Boxing where homeAway might not act as expected or be generic
                    let homeName = home?.team?.displayName || competition.competitors[0]?.athlete?.displayName || e.name || 'Evento';
                    let awayName = away?.team?.displayName || competition.competitors[1]?.athlete?.displayName || '';

                    // Logic to handle F1 Grand Prix names better
                    if (league.type === 'racing') {
                        homeName = e.shortName || e.name; // e.g. "Mexico City GP"
                        awayName = 'F1 Race';
                    }

                    const homeLogo = home?.team?.logo || '';
                    const awayLogo = away?.team?.logo || '';

                    newGames.push({
                        id: `espn_${e.id}`,
                        league: league.name.toUpperCase(),
                        homeTeam: homeName,
                        awayTeam: awayName,
                        time: timeStr,
                        date: dateStr,
                        sport: league.type === 'soccer' ? 'Soccer' : 'General',
                        apiId: e.id,
                        // Extra Metadata
                        status: status,
                        logoHome: homeLogo,
                        logoAway: awayLogo
                    });
                });
            }
        }

        console.log(`✅ ESPN Ingest Complete: ${newGames.length} events found`);

        // If no games from API, use fallback
        if (newGames.length === 0) {
            console.warn("⚠️ No events from ESPN. Using fallback.");
            newGames = this.getFallbackGames();
        }

        // Merge Logic
        const currentGames = window.db.getDailyInfo().games || [];

        // Remove only previous auto-ingested games (api_, af_, espn_, agent_)
        // BUT KEEP MANUAL ones
        const manualGames = currentGames.filter(g => {
            const id = g.id.toString();
            return !id.startsWith('api_') &&
                !id.startsWith('af_') &&
                !id.startsWith('espn_') &&
                !id.startsWith('agent_');
        });

        const finalGames = [...manualGames, ...newGames];

        // Sort
        finalGames.sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.time.localeCompare(b.time);
        });

        // Save
        const daily = window.db.getDailyInfo();
        daily.games = finalGames;
        window.db._save();

        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            // CRITICAL FIX: Sync to 'allGames' instead of 'daily'
            setDoc(doc(window.dbFirestore, 'config', 'allGames'), { games: daily.games }, { merge: true })
                .catch(e => console.error('🔥 Sync ingest error', e));
        }

        // Update UI
        if (typeof renderManagerDashboard === 'function') renderManagerDashboard('games');
        window.dispatchEvent(new CustomEvent('db-daily-update', { detail: { type: 'games' } }));

        return newGames.length;
    }
};

window.ingestor = new window.SportIngestor();
