// EVA — Hostess + Manager + Regional v22.61
// Proyecto separado de adan-eva-demo
// Módulo ELIMINADO: Waiter / Comandero / Menu (líneas 1807-4608 del original)
// Generado: Mon Apr 20 14:56:52 CST 2026

// ===== SECCIÓN 1: ROUTER + LOGIN + HOSTESS =====
// State
let STATE = {
  user: null, // { id, role, name }
  branch: null, // { id, name }
};

// DOM Elements
const appContainer = document.getElementById('app');

// Database of Standard Team Names for Autocomplete

// HELPER: Confirm Release Table
window.confirmAndRelease = function (visitId) {
  console.log('🛑 Requesting release for visit:', visitId);
  // Simple direct confirm
  if (confirm('¿CONFIRMAR: Finalizar visita y liberar mesa?')) {
    try {
      window.db.releaseTable(visitId);
      // Optional: force refresh if needed, but the listener should handle it
      if (window.showToast) window.showToast('✅ Mesa liberada correctamente', 'success');
    } catch (e) {
      console.error(e);
      alert('Error al liberar mesa: ' + e.message);
    }
  }
};
// AUTO-REFRESH LISTENER
window.addEventListener('db-daily-update', (event) => {
  console.log(`⚡ DB UPDATE EVENT RECEIVED: ${event.detail.type}`);

  // 1. REFRESH WAITER "Partidos" IF ACTIVE
  if (document.getElementById('waitercontent-partidos') && !document.getElementById('waitercontent-partidos').classList.contains('hidden')) {
    console.log('🔄 Auto-refreshing Waiter Games Tab');
    if (typeof window.renderWaiterDashboard === 'function') window.renderWaiterDashboard();
  }

  // 2. REFRESH MANAGER "Games" IF ACTIVE
  if (window.CURRENT_MANAGER_TAB === 'games' && document.getElementById('managertab-games') && document.getElementById('managertab-games').classList.contains('active')) {
    console.log('🔄 Auto-refreshing Manager Games Tab');
    if (typeof renderManagerGamesTab === 'function') {
      const container = document.getElementById('manager-content');
      if (container) renderManagerGamesTab(container);
    }
  }

  // 3. HOSTESS - SHOW TOAST INSTEAD OF RELOAD (To avoid input loss)
  if (document.getElementById('content-tables') && !document.getElementById('content-tables').classList.contains('hidden')) {
    if (window.showToast) window.showToast('📅 Información de Partidos Actualizada', 'success');
  }

  // 4. MANAGER NOTIFICATIONS (NEW REQUESTS & ASSIGNMENTS)
  // Check if we are the Manager
  if (STATE.user && (STATE.user.role === 'manager' || STATE.user.role === 'admin')) {

    // A. Check for NEW Custom Game Requests ("OTRO")
    const currentRequests = window.db.getDailyInfo().gameRequests || [];
    const prevRequestsCount = window.PREV_REQ_COUNT !== undefined ? window.PREV_REQ_COUNT : currentRequests.length;

    if (currentRequests.length > prevRequestsCount) {
      const newReq = currentRequests[currentRequests.length - 1]; // Grab last one
      if (window.showToast) window.showToast(`🔔 Solicitud de Hostess: ${newReq.gameName}`, 'info');
      // Refresh games tab if active to show it
      if (window.CURRENT_MANAGER_TAB === 'games') renderManagerDashboard('games');
    }
    window.PREV_REQ_COUNT = currentRequests.length;

    // Refresh game requests panel if admin is on the games tab right now
    const reqContainer = document.getElementById('manager-requests-container');
    if (reqContainer) renderManagerGameRequests(reqContainer);

    // B. Check for Game Assignments on Tables (Simple Check)
    // This is harder to track diffs without heavy state, but we can check if a "recent" change happened
    // For now, let's just log it. A full "Waiter requested X" requires dedicated event log in DB.
  }
});

window.KNOWN_TEAMS = [
  // LIGA MX (CLAUSURA 2026)
  "América", "Chivas", "Cruz Azul", "Pumas", "Tigres", "Monterrey", "Toluca", "Santos Laguna", "Pachuca", "León", "Atlas", "Querétaro", "Puebla", "Atlético San Luis", "Mazatlán FC", "Necaxa", "Xolos Tijuana", "Juárez FC",

  // LIGA INGLESA (PREMIER LEAGUE)
  "Manchester City", "Arsenal", "Liverpool", "Aston Villa", "Tottenham Hotspur", "Manchester United", "Newcastle United", "West Ham United", "Chelsea", "Bournemouth", "Wolverhampton", "Brighton", "Fulham", "Crystal Palace", "Brentford", "Nottingham Forest", "Everton", "Luton Town", "Burnley", "Sheffield United", "Leicester City", "Leeds United", "Southampton",

  // LIGA ESPAÑOLA (LA LIGA)
  "Real Madrid", "Girona", "FC Barcelona", "Atlético Madrid", "Athletic Bilbao", "Real Sociedad", "Real Betis", "Valencia", "Las Palmas", "Getafe", "Osasuna", "Alavés", "Villarreal", "Rayo Vallecano", "Sevilla", "Mallorca", "Celta de Vigo", "Cádiz", "Granada", "Almería",

  // LIGA ITALIANA (SERIE A)
  "Inter Milan", "Juventus", "AC Milan", "Atalanta", "Bologna", "AS Roma", "Fiorentina", "Lazio", "Napoli", "Torino", "Monza", "Genoa", "Lecce", "Empoli", "Frosinone", "Udinese", "Sassuolo", "Verona", "Cagliari", "Salernitana",

  // UEFA CHAMPIONS LEAGUE (Top clubs de Europa)
  "Bayern Munich", "Paris Saint-Germain", "PSG", "Borussia Dortmund", "RB Leipzig", "Benfica", "Porto", "Sporting CP", "Ajax", "PSV Eindhoven", "Shakhtar Donetsk", "Celtic", "Club Brugge", "Red Star Belgrade", "Dinamo Zagreb", "Salzburg", "Copenhagen", "Galatasaray", "Fenerbahce",


  // NHL (HOCKEY)
  "Boston Bruins", "Colorado Avalanche", "Dallas Stars", "Florida Panthers", "New York Rangers", "Vancouver Canucks", "Winnipeg Jets", "Carolina Hurricanes", "Edmonton Oilers", "Vegas Golden Knights", "Los Angeles Kings", "Nashville Predators", "Philadelphia Flyers", "Tampa Bay Lightning", "Toronto Maple Leafs", "Detroit Red Wings", "New York Islanders", "Pittsburgh Penguins", "St. Louis Blues", "Washington Capitals", "Arizona Coyotes", "Buffalo Sabres", "Calgary Flames", "Chicago Blackhawks", "Columbus Blue Jackets", "Minnesota Wild", "Montréal Canadiens", "New Jersey Devils", "Ottawa Senators", "San Jose Sharks", "Seattle Kraken", "Anaheim Ducks",

  // NFL
  "Kansas City Chiefs", "San Francisco 49ers", "Dallas Cowboys", "Pittsburgh Steelers", "New England Patriots", "Philadelphia Eagles", "Baltimore Ravens", "Buffalo Bills", "Miami Dolphins", "New York Jets", "Cincinnati Bengals", "Cleveland Browns", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Tennessee Titans", "Denver Broncos", "Las Vegas Raiders", "Los Angeles Chargers", "New York Giants", "Washington Commanders", "Green Bay Packers", "Detroit Lions", "Minnesota Vikings", "Chicago Bears", "Tampa Bay Buccaneers", "New Orleans Saints", "Atlanta Falcons", "Carolina Panthers", "Los Angeles Rams", "Seattle Seahawks", "Arizona Cardinals",

  // NBA
  "Los Angeles Lakers", "Golden State Warriors", "Boston Celtics", "Chicago Bulls", "Miami Heat", "New York Knicks", "Brooklyn Nets", "Philadelphia 76ers", "Toronto Raptors", "Milwaukee Bucks", "Detroit Pistons", "Indiana Pacers", "Cleveland Cavaliers", "Orlando Magic", "Charlotte Hornets", "Atlanta Hawks", "Washington Wizards", "Denver Nuggets", "Minnesota Timberwolves", "Oklahoma City Thunder", "Portland Trail Blazers", "Utah Jazz", "Phoenix Suns", "Los Angeles Clippers", "Sacramento Kings", "Dallas Mavericks", "Houston Rockets", "San Antonio Spurs", "Memphis Grizzlies", "New Orleans Pelicans",

  // MLB
  "New York Yankees", "Los Angeles Dodgers", "Boston Red Sox", "Chicago Cubs", "St. Louis Cardinals", "San Francisco Giants", "Atlanta Braves", "Houston Astros", "New York Mets", "Philadelphia Phillies", "Texas Rangers", "Toronto Blue Jays", "Seattle Mariners", "Baltimore Orioles", "Tampa Bay Rays", "Minnesota Twins", "Detroit Tigers", "Chicago White Sox", "Cleveland Guardians", "Kansas City Royals", "Los Angeles Angels", "Oakland Athletics", "San Diego Padres", "Arizona Diamondbacks", "Colorado Rockies", "Miami Marlins", "Washington Nationals", "Cincinnati Reds", "Pittsburgh Pirates", "Milwaukee Brewers"
].sort();

// Helper to refresh datalist from _store or initialization
window.updateTeamDatalist = function () {
  let dataList = document.getElementById('team-suggestions');
  if (!dataList) {
    dataList = document.createElement('datalist');
    dataList.id = 'team-suggestions';
    document.body.appendChild(dataList);
  }

  // Merge potential duplicates and sort
  const uniqueTeams = [...new Set(window.KNOWN_TEAMS)].sort();

  dataList.innerHTML = uniqueTeams.map(t => `<option value="${t}">`).join('');
  console.log('🔄 Team datalist updated. Count:', uniqueTeams.length);
};

// Router / Navigation
function navigateTo(view, params = {}) {
  appContainer.innerHTML = '';

  switch (view) {
    case 'login':
      renderLogin();
      break;
    case 'branch-select':
      renderBranchSelect();
      break;
    case 'hostess-dashboard':
      if (STATE.user?.role !== 'hostess') {
        alert('Acceso denegado: Se requiere rol Hostess');
        renderLogin();
        return;
      }
      renderHostessDashboard();
      break;
    case 'waiter-dashboard':
      // SECURITY CHECK: If Hostess tries to load Waiter Dashboard by mistake
      if (STATE.user?.role !== 'waiter') {
        console.error("⛔ Security Alert: User " + STATE.user?.username + " (Role: " + STATE.user?.role + ") tried to access Waiter Dashboard.");
        // If role is hostess, force redirect to hostess dashboard
        if (STATE.user?.role === 'hostess') {
          navigateTo('hostess-dashboard');
          return;
        }
        renderLogin();
        return;
      }
      // Waiter module not in this project — redirect to login
      console.warn('Waiter module not included in EVA project');
      renderLogin();
      break;
    case 'waiter-detail':
      // Waiter detail not in this project
      renderLogin();
      break;
    case 'manager-dashboard':
      renderManagerDashboard(); // Branch specific
      break;
    case 'regional-dashboard':
      renderRegionalDashboard(); // Global + Reports
      break;
    case 'super-admin-dashboard':
      renderSuperAdminDashboard(); // User Management
      break;
    case 'enrich-customer':
      renderEnrichCustomer(params);
      break;
    case 'view-customer':
      renderViewCustomer(params.customerId);
      break;
    case 'customer-detail':
      // Alias for view-customer
      renderViewCustomer(params.customerId);
      break;
    default:
      renderLogin();
  }
}

// Views
function renderLogin() {
  const div = document.createElement('div');
  div.className = 'login-screen';
  div.style.background = '#000000'; // PURE BLACK BACKGROUND
  div.style.minHeight = '100vh';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  div.style.padding = '20px';

  div.innerHTML = `
    <div class="login-container" style="max-width: 450px; width: 100%; text-align: center;">
      
      <!-- LOGO SUPERIOR (ADAN & EVA) -->
      <div style="margin-bottom: 40px;">
          <img src="assets/img/duckos-logo.png" alt="ADAN & EVA" style="width: 500px; height: auto; display: block; margin: 0 auto;">
      </div>
      
      <!-- Inputs Lado a Lado -->
      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div style="flex: 1; text-align: center;">
            <label style="display: block; color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 12px; margin-bottom: 8px; font-weight: 500;">USUARIO</label>
            <input type="text" id="username" autocomplete="username" 
               style="width: 100%; background: transparent; border: 2px solid #FFD200; color: #FFFFFF; padding: 12px; font-size: 16px; outline: none; border-radius: 0; box-shadow: 0 0 15px rgba(255, 210, 0, 0.2); font-family: 'Inter', sans-serif; text-align: center;">
        </div>
        <div style="flex: 1; text-align: center;">
            <label style="display: block; color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 12px; margin-bottom: 8px; font-weight: 500;">CONTRASEÑA</label>
            <input type="password" id="password" autocomplete="current-password" 
               style="width: 100%; background: transparent; border: 2px solid #FFD200; color: #FFFFFF; padding: 12px; font-size: 16px; outline: none; border-radius: 0; box-shadow: 0 0 15px rgba(255, 210, 0, 0.2); font-family: 'Inter', sans-serif; text-align: center;">
        </div>
      </div>
      
      <!-- Botón Ingresar -->
      <button onclick="handleLogin()" 
              style="width: 100%; background-color: #FFD200; color: #000000; font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 700; padding: 15px; border: none; cursor: pointer; text-transform: uppercase; margin-bottom: 80px; letter-spacing: 1px; transition: transform 0.1s ease;">
        INGRESAR
      </button>
      
      <!-- LOGO INFERIOR (Buffalo Wild Wings) -->
      <div style="display: flex; justify-content: center; opacity: 1;">
         <img src="assets/img/bww-logo.png" alt="Buffalo Wild Wings" style="height: 200px; width: auto;" 
              onerror="this.style.display='none'; document.getElementById('bww-text-fallback').style.display='block';">
         
         <!-- Mensaje simple si falta el logo -->
         <p id="bww-text-fallback" style="display:none; color: #FFD200; font-family: 'Oswald', sans-serif;">(Guarda el logo como assets/img/bww-logo.png)</p>
      </div>

      <!-- VERSION TAG -->
      <div class="text-[10px] text-gray-600 mt-2">
        v22.61 (Mejora: Fuzzy Search para Partidos y Normalización de Texto en CRM)
        <br>
        <div class="flex gap-2 justify-center mt-2">
            <button onclick="window.location.reload(true)" style="background: #333; color: white; padding: 5px 10px; border: none; border-radius: 4px;">
                🔄 Recargar
            </button>
            <button onclick="emergencyCacheClear()" style="background: #d97706; color: white; padding: 5px 10px; border: none; border-radius: 4px;">
                🧹 Limpiar Caché
            </button>
            <button onclick="localStorage.removeItem('ADANYEVA_DATA_V3'); window.location.reload(true);" style="background: #ef4444; color: white; padding: 5px 10px; border: none; border-radius: 4px;">
               ⚠️ BORRAR DATOS Y RESYNC
            </button>
        </div>
      </div>

    </div>
  `;
  appContainer.appendChild(div);
}

function handleLogin() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const user = window.db.login(u, p);

  if (user) {
    STATE.user = user;

    // Auto-assign branch if user has one
    if (user.branchId) {
      const b = window.db.getBranches().find(x => x.id === user.branchId);
      if (b) STATE.branch = { id: b.id, name: b.name };
    }

    // Save Session (REMOVED as requested)
    // localStorage.setItem('ADANYEVA_SESSION', JSON.stringify({ user, branch: STATE.branch }));

    // Redirect
    console.log('Login successful. Role:', user.role);

    // STRICT REDIRECTION BY ROLE
    switch (user.role) {
      case 'waiter':
        navigateTo('waiter-dashboard');
        break;
      case 'hostess':
        navigateTo('hostess-dashboard');
        break;
      case 'manager':
        navigateTo('manager-dashboard');
        break;
      case 'regional':
        navigateTo('regional-dashboard');
        break;
      case 'admin':
        navigateTo('super-admin-dashboard');
        break;
      default:
        alert('Rol desconocido: ' + user.role);
        renderLogin();
    }
  } else {
    alert('Credenciales inválidas');
  }
}

function handleLogout() {
  location.reload(); // Revert to simple reload behavior
}

function goBack() {
  // Smart back navigation based on role
  if (!STATE.user) { renderLogin(); return; }
  const r = STATE.user.role;
  if (r === 'admin') navigateTo('super-admin-dashboard');
  else if (r === 'regional') navigateTo('regional-dashboard');
  else if (r === 'manager') navigateTo('manager-dashboard');
  else if (r === 'hostess') navigateTo('hostess-dashboard');
  else if (r === 'waiter') navigateTo('waiter-dashboard');
  else renderLogin();
}

function renderBranchSelect() {
  const branches = window.db.getBranches();

  const div = document.createElement('div');
  div.className = 'flex flex-col items-center justify-center p-4';
  div.style.height = '100vh';

  let buttonsHtml = branches.map(b =>
    `<button onclick="selectBranch('${b.id}', '${b.name}')" class="btn-secondary w-full p-4 text-lg mb-2">${b.name}</button>`
  ).join('');

  div.innerHTML = `
    <div class="card flex flex-col items-center gap-md" style="max-width: 400px; width: 100%;">
      <h2 class="text-center">Seleccionar Sucursal</h2>
      ${buttonsHtml}
    </div>
  `;
  appContainer.appendChild(div);
}

function selectBranch(id, name) {
  STATE.branch = { id, name };
  if (STATE.user.role === 'hostess') navigateTo('hostess-dashboard');
  if (STATE.user.role === 'waiter') navigateTo('waiter-dashboard');
}

// ------ HOSTESS ------
window.MAP_CONFIG = {
  zones: [
    {
      id: 'z-left',
      name: 'Zona Izquierda (400s)',
      tables: [
        { id: '411', cap: 4 }, { id: '412', cap: 4 }, { id: '413', cap: 3 }, { id: '414', cap: 4 }, { id: '415', cap: 4 }, { id: '416', cap: 4 }, { id: '417', cap: 4 },
        { id: '421', cap: 4 }, { id: '422', cap: 4 }, { id: '423', cap: 3 }, { id: '424', cap: 4 }, { id: '425', cap: 4 }, { id: '426', cap: 4 }
      ]
    },
    {
      id: 'z-top-right',
      name: 'Arriba Centro y Derecha (200s)',
      tables: [
        { id: '211', cap: 3 }, { id: '212', cap: 6 }, { id: '213', cap: 6 }, { id: '214', cap: 6 },
        { id: '221', cap: 4 }, { id: '222', cap: 4 }, { id: '223', cap: 4 }, { id: '224', cap: 4 }, { id: '225', cap: 4 },
        { id: '241', cap: 4 }, { id: '242', cap: 4 }, { id: '243', cap: 3 }, { id: '244', cap: 4 }, { id: '245', cap: 4 },
        { id: '251', cap: 4 }, { id: '252', cap: 4 }, { id: '253', cap: 4 }, { id: '254', cap: 4 }, { id: '255', cap: 4 }
      ]
    },
    {
      id: 'z-bottom',
      name: 'Centro y Abajo (100s, 30s)',
      tables: [
        { id: '111', cap: 6 }, { id: '112', cap: 6 }, { id: '113', cap: 6 }, { id: '114', cap: 6 },
        { id: '121', cap: 3 }, { id: '122', cap: 4 }, { id: '123', cap: 4 }, { id: '124', cap: 3 },
        { id: '131', cap: 7 }, { id: '133', cap: 10 }, { id: '135', cap: 7 },
        { id: '132', cap: 8 }, { id: '134', cap: 8 },
        { id: '32', cap: 3 }, { id: '33', cap: 3 },
        { id: '141', cap: 3 }, { id: '142', cap: 4 }, { id: '143', cap: 4 }, { id: '144', cap: 2 },
        { id: '151', cap: 6 }, { id: '152', cap: 6 }, { id: '153', cap: 6 }
      ]
    }
  ]
};
window.calculateTotalChairs = function() {
  return window.MAP_CONFIG.zones.reduce((sum, z) => sum + z.tables.reduce((s, t) => s + t.cap, 0), 0);
};

function renderHostessDashboard() {
  appContainer.innerHTML = '';

  // FETCH DATA
  const waitlist = window.db.getWaitlist(STATE.branch.id);
  const activeVisits = window.db.getVisits().filter(v => ['seated', 'active'].includes(v.status));
  // FIX: Define reservations variable to prevent crash
  const reservations = window.db.getReservations ? window.db.getReservations() : [];

  // Calculate stats
  const totalCapacity = window.calculateTotalChairs();
  const currentCount = activeVisits.reduce((sum, v) => sum + parseInt(v.pax || 0), 0);

  const div = document.createElement('div');
  div.innerHTML = `
      <!--Header-->
    <header class="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-40" style="background-color: #000000; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
      <div>
        <h1 class="text-2xl font-black text-yellow-500 italic tracking-tighter">RECEPCIÓN</h1>
        <div class="text-[10px] text-gray-400 font-mono tracking-widest">${STATE.branch ? STATE.branch.name.toUpperCase() : 'JURIQUILLA'}</div>
      </div>
      <button onclick="handleLogout()" class="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded border border-gray-700">CERRAR SESIÓN</button>
    </header>


    
    <!--Tab Content: Check - In(Default)-- >
      <div id="content-checkin" class="tab-content pb-24">
        <div class="card border border-yellow-500/30" style="background-color: #111827;">
          <h2 class="text-xl font-black text-white mb-6 flex items-center gap-2">
            📋 NUEVO CHECK-IN
          </h2>

          <!-- Step 1: Customer Info -->
          <div class="space-y-4 mb-6">
            <label class="text-xs text-gray-500 mb-1 block uppercase font-bold tracking-widest">Paso 1: Datos del Cliente</label>

            <!-- Search Bar (New Client Flow) -->
            <div class="relative">
              <input type="text" id="customer-search"
                class="w-full bg-black border border-gray-700 rounded-lg p-4 text-white text-lg font-bold focus:border-yellow-500 outline-none"
                placeholder="🔍 Buscar Cliente (Nombre/Tel)" onkeyup="searchCustomer(this.value)">

                <div id="search-results" class="hidden absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-lg mt-1 z-50 max-h-60 overflow-y-auto shadow-2xl"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <input type="hidden" id="h-reservation-id" value="">
          <input type="text" id="h-firstname" placeholder="NOMBRE" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide">
                <input type="text" id="h-lastname" placeholder="APELLIDO PATERNO" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide">
                </div>
                <input type="text" id="h-lastname2" placeholder="APELLIDO MATERNO (Opcional)" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide w-full">
                <input type="tel" id="h-phone-input" placeholder="TELÉFONO O WHATSAPP (Recomendado)" class="bg-gray-900 text-white border border-gray-700 rounded p-4 font-bold text-sm tracking-wide w-full mt-2">

                  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400 text-sm font-bold uppercase">PERSONAS:</span>
                      <div class="flex items-center gap-4">
                        <button onclick="adjustPax(-1)" class="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600">-</button>
                        <span id="h-pax" class="text-2xl font-black text-white">2</span>
                        <button onclick="adjustPax(1)" class="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Assign Table -->
                <div class="space-y-4">
                  <label class="text-xs text-gray-500 mb-1 block uppercase font-bold tracking-widest">Paso 2: Asignación</label>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-[10px] text-gray-500 mb-1 block uppercase">Mesa #</label>
                      <input type="number" id="h-table" class="w-full bg-gray-900 text-white border border-gray-700 rounded p-4 text-center font-bold text-xl focus:border-green-500 outline-none" placeholder="#">
                    </div>
                    <div>
                      <label class="text-[10px] text-gray-500 mb-1 block uppercase">Mesero</label>
                      <select id="h-waiter" class="w-full bg-gray-900 text-white border border-gray-700 rounded p-4 font-bold text-sm h-[62px]">
                        <option value="" disabled selected>Seleccionar Mesero...</option>
                        ${waiters.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <button onclick="processHostessCheckIn()" class="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-5 rounded-xl uppercase tracking-widest text-lg shadow-lg transform active:scale-95 transition mt-4">
                    ✅ INGRESAR MESA
                  </button>

                  <button onclick="handleAddToWaitlist()" class="w-full bg-gray-800 border-2 border-gray-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-sm hover:border-blue-500 transition mt-2">
                    ⏱️ Agregar a Lista de Espera
                  </button>
                </div>
            </div>
          </div>

          <!-- Tab Content: Tables (Active Visits) -->
          <div id="content-tables" class="tab-content hidden">
            <div class="card">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-black text-white italic tracking-tighter">MESAS HABILITADAS</h2>

                <div class="text-right">
                  <div class="text-yellow-500 font-bold text-xl leading-none">${currentCount} / ${totalCapacity}</div>
                  <div class="text-[10px] text-gray-400 uppercase tracking-widest">Ocupación</div>
                </div>
              </div>

              <!-- Filter / Waiter Tables Inline Toggle -->
              <div class="mb-4">
                <button onclick="window.toggleWaiterTablesInline()" class="w-full bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 rounded-lg p-3 text-white font-bold transition flex items-center justify-center gap-2">
                  📊 MESAS POR MESERO
                </button>
                <div id="inline-waiter-tables" class="hidden mt-4 transition-all duration-300"></div>
              </div>

              ${activeVisits.length === 0 ? `
          <div class="text-center py-12 text-gray-500">
             <div class="text-6xl mb-4">🍽️</div>
             <p>No hay mesas activas</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${activeVisits.map(v => {
    const waiterName = waiters.find(w => w.id === v.waiterId)?.name || 'Sin Asignar';
    const timeToFormat = v.startTime || v.entryTime || v.date;
    const timeSeated = timeToFormat ? new Date(timeToFormat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'NA';

    // Calcular tiempo transcurrido
    const startTimeDate = new Date(timeToFormat);
    const diffMins = Math.floor((new Date() - startTimeDate) / 60000);
    const timeElapsed = isNaN(diffMins) ? '' : (diffMins > 60 ? `${Math.floor(diffMins / 60)}h ${diffMins % 60}m` : `${diffMins}m`);

    const custName = v.customer ? (v.customer.firstName + ' ' + (v.customer.lastName || '')).trim() : (v.customerName || 'Cliente');
    return `
              <div class="table-card bg-gray-900 border-l-4 border-green-500 rounded-r-xl p-4 shadow-lg relative animate-fade-in" data-waiter-id="${v.waiterId}">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="text-xl font-black text-white shadow-text uppercase tracking-wide">Mesa <span class="text-3xl">${v.table}</span></span>
                        <div class="text-xs text-gray-400 font-mono mt-1">
                            🕒 ${timeSeated}
                            ${timeElapsed ? `<span class="ml-2 text-yellow-500 font-bold">⏱️ ${timeElapsed}</span>` : ''}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300 border border-gray-700 mb-1 inline-block">
                           👤 ${waiterName.split(' ')[0]}
                        </div>
                        <div class="text-xl font-bold text-white">${v.pax} <span class="text-sm font-normal text-gray-500">pax</span></div>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-3 mt-2">
                    <div class="font-bold text-white text-lg truncate mb-1">${custName}</div>
                    ${v.vip ? `<div class="inline-block bg-yellow-600/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded border border-yellow-600/50 mb-2 font-bold tracking-wider">VIP ${v.vip.toUpperCase()}</div>` : ''}
                    
                    <button onclick="document.getElementById('edit-visit-${v.id}').classList.toggle('hidden')" class="w-full text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 py-2 rounded mt-2 border border-gray-700 transition">
                       ⚡ GESTIONAR
                    </button>
                    
                    <!-- Hidden Editor -->
                    <div id="edit-visit-${v.id}" class="hidden mt-3 space-y-2 bg-black/20 p-2 rounded border border-gray-800">
                        <!-- Cambio Mesa -->
                        <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                            <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesa</div>
                            <div class="flex gap-2">
                               <input type="number" id="new-table-${v.id}" placeholder="#" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-center font-bold text-lg" min="1">
                               <button onclick="doChangeTable('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                            </div>
                        </div>
                        <!-- Cambio Mesero -->
                         <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                            <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesero</div>
                            <div class="flex gap-2">
                               <select id="new-waiter-${v.id}" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-sm font-bold truncate">
                                  ${waiters.map(w => `<option value="${w.id}" ${w.id === v.waiterId ? 'selected' : ''}>${w.name}</option>`).join('')}
                               </select>
                               <button onclick="doChangeWaiter('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                            </div>
                        </div>
                    </div>

                    <button onclick="window.confirmAndRelease('${v.id}')"
                        class="w-full bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-700/50 font-bold py-3 rounded-lg mb-4 uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        🆓 FINALIZAR VISITA / LIBERAR MESA
                    </button>
                </div>
                
                <div id="table-status-${v.id}" class="hidden mt-2 p-3 rounded text-center text-lg font-bold animate-pulse text-yellow-400"></div>
              </div>
            `}).join('')}
          </div>
        `}
            </div>
          </div>

          <!-- Tab Content: Waitlist - TAB SEPARADO -->
          <div id="content-waitlist" class="tab-content hidden">
            <div class="card">
              <h3 class="text-xl mb-4">Cola de Espera (${waitlist.length})</h3>
              ${waitlist.length === 0 ? `
          <div class="text-center py-12">
            <div class="text-6xl mb-4">⏱️</div>
            <p class="text-xl text-secondary">No hay clientes en espera</p>
            <p class="text-sm text-secondary mt-2">Usa "Agregar a Lista de Espera" desde Check-In</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${waitlist.map((entry, idx) => `
              <div class="bg-yellow-900/20 border-2 border-yellow-500 p-4 rounded-lg hover:bg-yellow-900/30 transition">
                <div class="flex items-start gap-3 mb-3">
                  <span class="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    ${idx + 1}
                  </span>
                  <div class="flex-1">
                    <div class="font-bold text-xl mb-1">${entry.customerName}</div>
                    <div class="text-base text-gray-300">${entry.pax} personas</div>
                    <div class="text-sm text-gray-400">${entry.phone || 'Sin teléfono'}</div>
                    <div class="text-xs text-gray-500 mt-1">🕐 ${new Date(entry.addedAt).toLocaleTimeString()}</div>
                  </div>
                </div>
                <!-- ASIGNACIÓN INLINE -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <input type="number" id="wl-table-${entry.id}" placeholder="Mesa #" 
                         class="p-2 text-xl bg-gray-900 rounded font-bold text-center border border-green-600" 
                         style="min-width: 80px;" min="1">
                  <select id="wl-waiter-${entry.id}" class="p-2 text-sm bg-gray-900 rounded font-bold border border-green-600">
                    <option value="">Mesero</option>
                    ${window.db.data.users.filter(u => u.role === 'waiter' && (!u.branchId || u.branchId === STATE.branch.id)).map(w =>
      `<option value="${w.id}">${w.name}</option>`
    ).join('')}
                  </select>
                </div>
                <!-- BOTONES DE ACCIÓN -->
                <div class="flex gap-2">
                  <button onclick="doAssignFromWaitlist('${entry.id}')" 
                          class="btn-primary flex-1 text-base py-3 font-bold">
                    ✅ ASIGNAR
                  </button>
                  <button onclick="removeFromWaitlist('${entry.id}')" 
                          class="btn-secondary text-sm px-3 py-2 bg-red-900 hover:bg-red-800 whitespace-nowrap">
                    ❌
                  </button>
                </div>
                <!-- STATUS MESSAGE -->
                <div id="wl-status-${entry.id}" class="hidden mt-2 p-2 rounded text-center text-sm font-bold"></div>
              </div>
            `).join('')}
          </div>
        `}
            </div>
            <!-- Tab Content: Reservations (WITH ALERTS AND ASSIGNMENT) -->
            <div id="content-reservations" class="tab-content hidden">
              <div class="card">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    📅 Reservaciones de Hoy
                    <span class="bg-gray-800 text-xs px-2 py-0.5 rounded text-gray-400 font-normal">Solo Lectura</span>
                  </h3>
                  <!-- Timer for refresh/alerts -->
                  <div id="res-timer" class="text-xs text-gray-500 font-mono">Actualizado: Justo ahora</div>
                </div>

                ${reservations.length === 0 ? `
                  <div class="text-center py-12 opacity-50">
                    <div class="text-6xl mb-4">📭</div>
                    <p class="text-xl text-gray-400">No hay reservaciones para hoy</p>
                  </div>
                ` : `
                  <div class="space-y-4">
                    ${reservations.map(r => {
      // ALERT LOGIC
      const now = new Date();
      const [hours, mins] = r.time.split(':');
      const resTime = new Date();
      resTime.setHours(parseInt(hours), parseInt(mins), 0, 0);

      const diffMins = (resTime - now) / 60000;
      let alertClass = "border-gray-600";
      let bgClass = "bg-gray-800";
      let statusBadge = "";

      // Late (> 15 mins past)
      if (diffMins < -15) {
        alertClass = "border-red-600 animate-pulse";
        bgClass = "bg-red-900/20";
        statusBadge = '<span class="text-red-500 font-bold text-xs uppercase">⚠️ RETRASADO</span>';
      }
      // Arriving Soon (< 15 mins before)
      else if (diffMins <= 15 && diffMins >= 0) {
        alertClass = "border-yellow-500";
        bgClass = "bg-yellow-900/20";
        statusBadge = '<span class="text-yellow-500 font-bold text-xs uppercase">🕒 PRÓXIMO</span>';
      }

      // VIP Styles
      if (r.vip === 'diamond') {
        alertClass = "border-blue-400";
        bgClass = "bg-blue-900/10";
      } else if (r.vip === 'blazin') {
        alertClass = "border-orange-500";
        bgClass = "bg-orange-900/10";
      }

      return `
                      <div class="p-4 rounded-xl border-l-4 ${alertClass} ${bgClass} shadow-lg relative group transition-all hover:bg-gray-800">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                             <div class="flex items-center gap-2 mb-1">
                                <span class="text-2xl font-black text-white">${r.time}</span>
                                ${statusBadge}
                                ${r.vip === 'diamond' ? '<span class="bg-blue-900 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500">DIAMOND</span>' : r.vip === 'blazin' ? '<span class="bg-orange-900 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500">BLAZIN</span>' : ''}
                             </div>
                             <div class="font-bold text-white text-lg leading-tight mb-1">${r.customerName}</div>
                             <div class="text-sm text-gray-400 flex items-center gap-3">
                                <span>👥 ${r.pax} pax</span>
                                <span>📞 ${r.phone || 'N/A'}</span>
                             </div>
                             ${r.notes ? `<div class="mt-2 text-xs text-gray-400 italic bg-black/20 p-2 rounded border border-gray-700/50">📝 "${r.notes}"</div>` : ''}
                             ${r.game ? `<div class="mt-2 text-xs text-blue-300 font-bold flex items-center gap-1">📺 PARTIDO: ${r.game}</div>` : ''}
                          </div>

                          <!-- ACTIONS -->
                          <div class="flex flex-col gap-2">
                             <button onclick="
                                document.getElementById('h-firstname').value = '${r.customerName.split(' ')[0]}';
                                document.getElementById('h-lastname').value = '${r.customerName.split(' ').slice(1).join(' ') || ''}';
                                document.getElementById('h-pax').innerText = '${r.pax}';
                                switchHostessTab('checkin');
                                if(window.showToast) window.showToast('✅ Datos cargados. Asigna mesa ahora.', 'success');
                             " 
                             class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-lg transform active:scale-95 transition flex items-center gap-1">
                                🛎️ CHECK-IN
                             </button>
                          </div>
                        </div>
                      </div>
                      `;
    }).join('')}
                  </div>
                `}
              </div>
            </div>

            <!-- BOTTOM NAVIGATION BAR -->
            <nav style="
              position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
              background: #000;
              border-top: 1px solid #222;
              display: flex;
              height: 58px;
              padding-bottom: env(safe-area-inset-bottom, 0px);
            ">
              <button onclick="switchHostessTab('checkin')" id="tab-checkin"
                style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                       background:none; border:none; border-top: 2px solid #fff; cursor:pointer;
                       padding: 6px 0 4px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>
                <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#fff; font-family:'Inter',sans-serif; text-transform:uppercase;">Check-In</span>
              </button>

              <button onclick="switchHostessTab('tables')" id="tab-tables"
                style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                       background:none; border:none; border-top: 2px solid transparent; cursor:pointer;
                       padding: 6px 0 4px; position:relative;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 6V4m8 2V4M3 10h18"/></svg>
                <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Mesas</span>
                ${activeVisits.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;">${activeVisits.length}</span>` : ''}
              </button>

              <button onclick="switchHostessTab('waitlist')" id="tab-waitlist"
                style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                       background:none; border:none; border-top: 2px solid transparent; cursor:pointer;
                       padding: 6px 0 4px; position:relative;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Espera</span>
                ${waitlist.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;">${waitlist.length}</span>` : ''}
              </button>

              <button onclick="switchHostessTab('reservations')" id="tab-reservations"
                style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                       background:none; border:none; border-top: 2px solid transparent; cursor:pointer;
                       padding: 6px 0 4px; position:relative;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Reservas</span>
                ${reservations.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;">${reservations.length}</span>` : ''}
              </button>
            </nav>

            <!-- DuckOS Footer -->
            <div class="dashboard-footer">
              Powered by <span style="color: #F97316;">DuckOS</span> | Bar & Restaurant Solutions
            </div>
            `;

  // Add class for bottom nav padding
  div.className = 'p-4 max-w-6xl mx-auto has-bottom-nav';
  appContainer.appendChild(div);
  
  if (window.renderRestaurantMap) {
    window.renderRestaurantMap();
  }
}

function switchHostessTab(tabName) {
  // Ocultar todos los tabs
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

  // Mostrar el tab seleccionado
  const contentEl = document.getElementById(`content-${tabName}`);
  if (contentEl) contentEl.classList.remove('hidden');

  // Reset todos los botones del nav a estado inactivo
  ['checkin','tables','map','waitlist','reservations'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (!btn) return;
    btn.style.borderTop = '2px solid transparent';
    // Cambiar color de SVG e ícono a gris
    const svg = btn.querySelector('svg');
    const label = btn.querySelector('span');
    if (svg) svg.setAttribute('stroke', '#555');
    if (label) label.style.color = '#555';
  });

  // Activar tab seleccionado
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) {
    activeBtn.style.borderTop = '2px solid #fff';
    const svg = activeBtn.querySelector('svg');
    const label = activeBtn.querySelector('span');
    if (svg) svg.setAttribute('stroke', '#fff');
    if (label) label.style.color = '#fff';
  }
}

// Filtrar mesas por mesero
function filterTablesByWaiter() {
  const filterValue = document.getElementById('filter-waiter').value;
  const tableCards = document.querySelectorAll('.table-card');

  tableCards.forEach(card => {
    const waiterId = card.getAttribute('data-waiter-id');
    if (filterValue === 'all' || waiterId === filterValue) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Hostess Logic
let selectedCustomer = null;

function searchCustomer(query) {
  const resultsDiv = document.getElementById('search-results');
  if (query.length < 2) {
    resultsDiv.classList.add('hidden');
    return;
  }

  const matches = window.db.searchCustomers(query);

  // Build results HTML
  let resultsHtml = '';

  if (matches.length > 0) {
    // Show matching customers
    resultsHtml = matches.map(c =>
      `<div onclick="selectCustomer('${c.id}')" 
            class="cursor-pointer border-b-2 border-gray-700 transition"
            style="padding: 16px; background: #000000; min-height: 70px;"
            onmouseover="this.style.background='#CA8A04'" 
            onmouseout="this.style.background='#000000'">
               <div class="text-lg font-bold" style="color: #FFFFFF;">${c.firstName} ${c.lastName} ${c.lastName2 || ''}</div>
               <div class="text-sm" style="color: #9CA3AF;">ID: ${c.id} | ${c.team || 'Sin Equipo'}</div>
             </div>`
    ).join('');

    // Add "NEW CLIENT" option at the bottom
    resultsHtml += `
            <div onclick="dismissSearchAndContinue()"
              class="cursor-pointer transition"
              style="padding: 16px; background: #14532D; min-height: 60px; border-top: 2px solid #22C55E;"
              onmouseover="this.style.background='#166534'"
              onmouseout="this.style.background='#14532D'">
              <div class="text-lg font-bold" style="color: #22C55E;">➕ Es CLIENTE NUEVO</div>
              <div class="text-sm" style="color: #86EFAC;">Cerrar lista y continuar con el registro</div>
            </div>`;
  } else {
    // No matches - show "new client" message
    resultsHtml = `
      <div onclick="dismissSearchAndContinue()" 
           class="cursor-pointer transition"
           style="padding: 16px; background: #14532D; min-height: 60px;"
           onmouseover="this.style.background='#166534'" 
           onmouseout="this.style.background='#14532D'">
             <div class="text-lg font-bold" style="color: #22C55E;">✅ Cliente no encontrado</div>
             <div class="text-sm" style="color: #86EFAC;">Se creará un nuevo registro</div>
           </div>`;
  }

  // Add close button at top
  resultsHtml = `
            <div style="padding: 8px 16px; background: #1a1a1a; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
              <span style="color: #9CA3AF; font-size: 12px;">${matches.length} resultado(s) encontrado(s)</span>
              <button onclick="dismissSearchResults()" style="background: none; border: none; color: #EF4444; font-size: 20px; cursor: pointer; padding: 4px 8px;">✕</button>
            </div>
            ` + resultsHtml;

  resultsDiv.innerHTML = resultsHtml;
  resultsDiv.classList.remove('hidden');
}

// Close search results
function dismissSearchResults() {
  const resultsDiv = document.getElementById('search-results');
  if (resultsDiv) {
    resultsDiv.classList.add('hidden');
  }
}

// Close and continue with new client
function dismissSearchAndContinue() {
  dismissSearchResults();
  selectedCustomer = null; // Clear any previous selection
  // Focus on the last name field to continue registration
  const lastnameField = document.getElementById('h-lastname');
  if (lastnameField) {
    lastnameField.focus();
  }
}

// Manager Logic: Customer Search
function searchCustomerForManager(query) {
  const resultsDiv = document.getElementById('res-search-results');
  if (!resultsDiv) return;

  if (query.length < 2) {
    resultsDiv.classList.add('hidden');
    return;
  }

  const matches = window.db.searchCustomers(query);
  let resultsHtml = '';

  if (matches.length > 0) {
    resultsHtml = matches.map(c =>
      `<div onclick="selectManagerCustomer('${c.id}', '${c.firstName} ${c.lastName}', '${c.vip || ''}')" 
            class="cursor-pointer border-b border-gray-700 p-3 hover:bg-yellow-900/20 transition flex justify-between items-center group">
               <div>
                 <div class="font-bold text-white group-hover:text-yellow-500">${c.firstName} ${c.lastName}</div>
                 <div class="text-xs text-gray-500">ID: ${c.id}</div>
               </div>
               ${c.vip ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500 text-yellow-500 uppercase">${c.vip}</span>` : ''}
             </div>`
    ).join('');
  } else {
    resultsHtml = `
      <div class="p-4 text-center cursor-pointer hover:bg-gray-800" onclick="dismissManagerSearch()">
         <div class="text-sm font-bold text-green-500">➕ Nuevo Cliente</div>
         <div class="text-xs text-gray-400">Continuar llenando datos manuales</div>
      </div>`;
  }

  // Close button
  resultsHtml = `
            <div style="padding: 4px 8px; background: #111; display: flex; justify-content: flex-end; border-bottom: 1px solid #333;">
              <button onclick="dismissManagerSearch()" class="text-red-500 hover:text-red-400 text-xs font-bold uppercase">Cerrar ✕</button>
            </div>
            ` + resultsHtml;

  resultsDiv.innerHTML = resultsHtml;
  resultsDiv.classList.remove('hidden');
}

function selectManagerCustomer(id, name, vip) {
  document.getElementById('res-name').value = name;

  // Auto-select VIP
  // Reset all first
  document.querySelectorAll('.res-vip-btn').forEach(b => {
    b.classList.remove('selected', 'border-orange-500', 'border-blue-400', 'text-orange-500', 'text-blue-400');
    b.classList.add('border-gray-600', 'text-gray-400');
  });

  const vipInput = document.getElementById('res-vip');
  vipInput.value = vip || ''; // Empty if no VIP

  const display = document.getElementById('res-vip-display');
  if (display) {
    if (vip === 'blazin') {
      display.textContent = '🔥 BLAZIN';
      display.className = 'text-orange-500 font-bold';
    } else if (vip === 'diamond') {
      display.textContent = '💎 DIAMOND';
      display.className = 'text-blue-400 font-bold';
    } else {
      display.textContent = 'Normal';
      display.className = 'text-gray-400 font-bold';
    }
  }

  // Auto-fill Phone if available in DB
  const customers = window.db.getCustomers() || [];
  const customer = customers.find(c => c.id === id);
  if (customer && customer.phone) {
    const phoneInput = document.getElementById('res-phone');
    if (phoneInput) phoneInput.value = customer.phone;
  }

  dismissManagerSearch();
}

function dismissManagerSearch() {
  const resultsDiv = document.getElementById('res-search-results');
  if (resultsDiv) resultsDiv.classList.add('hidden');
}

function selectCustomer(id) {
  const c = window.db.data.customers.find(x => x.id === id);
  if (c) {
    document.getElementById('h-firstname').value = c.firstName;

    let lastName1 = c.lastName || '';
    let lastName2 = c.lastName2 || '';

    // Si no hay apellido materno explícito, pero el paterno tiene espacios, separarlos
    if (!lastName2 && lastName1.includes(' ')) {
      const parts = lastName1.split(' ');
      lastName1 = parts[0];
      lastName2 = parts.slice(1).join(' ');
    }

    document.getElementById('h-lastname').value = lastName1;
    document.getElementById('h-lastname2').value = lastName2;

    selectedCustomer = c;
    document.getElementById('search-results').classList.add('hidden');

    if (window.showToast) {
      window.showToast(`✅ Cliente cargado: ${c.firstName} ${lastName1} ${lastName2}`, 'success');
    }
  }
}

window.adjustPax = function (delta) {
  const paxEl = document.getElementById('h-pax');
  if (!paxEl) return;
  let current = parseInt(paxEl.innerText) || 1;
  current += delta;
  if (current < 1) current = 1;
  if (current > 50) current = 50;
  paxEl.innerText = current;
};

// === NUEVO FLUJO: CHECK-IN SIN PROMPTS ===
function doCheckIn() {
  // SAFETY CHECK: Ensure we are NOT in Waitlist Mode
  const checkinBtn = document.getElementById('btn-checkin');
  if (checkinBtn && checkinBtn.classList.contains('hidden')) {
    console.warn('Prevented doCheckIn while in Waitlist Mode (possible double-trigger).');
    return;
  }

  try {
    const fname = document.getElementById('h-firstname').value.trim();
    const lname = document.getElementById('h-lastname').value.trim();
    const lname2 = document.getElementById('h-lastname2').value.trim();
    const pax = document.getElementById('h-pax').textContent || document.getElementById('h-pax').innerText;
    const table = document.getElementById('h-table').value;
    const waiterId = document.getElementById('h-waiter').value;

    // Validaciones
    if (!fname) {
      showCheckinStatus('⚠️ Escribe el NOMBRE del cliente', 'warning');
      return;
    }
    if (!lname) {
      showCheckinStatus('⚠️ Escribe el APELLIDO del cliente', 'warning');
      return;
    }
    if (!pax || pax < 1) {
      showCheckinStatus('⚠️ Indica el número de PERSONAS', 'warning');
      return;
    }
    if (!table) {
      showCheckinStatus('⚠️ Selecciona una MESA', 'warning');
      return;
    }
    if (!waiterId) {
      showCheckinStatus('⚠️ Selecciona un MESERO', 'warning');
      return;
    }

    // CHECK IF TABLE IS OCCUPIED (New Safety Check)
    if (window.db.isTableOccupied(table, STATE.branch.id)) {
      showCheckinStatus(`⛔ La Mesa ${table} ya está ocupada.`, 'error');
      // Reset button state just in case
      /* (Not strictly needed here as we return early, but good practice if button logic was above) */
      return;
    }

    // LOCK BUTTON TO PREVENT DUPLICATES
    if (checkinBtn.getAttribute('data-processing') === 'true') return;
    checkinBtn.setAttribute('data-processing', 'true');
    checkinBtn.innerHTML = '⏳ PROCESANDO...';
    checkinBtn.style.opacity = '0.7';
    let customer = selectedCustomer;
    if (!customer || customer.firstName !== fname || customer.lastName !== lname) {
      customer = window.db.createCustomer({
        firstName: fname,
        lastName: lname,
        lastName2: lname2
      });
    }

    // Crear visita
    window.db.createVisit({
      branchId: STATE.branch.id,
      customerId: customer.id,
      date: new Date().toISOString(),
      pax: parseInt(pax),
      table: table,
      waiterId: waiterId
    });

    // Mostrar éxito
    const waiterName = window.db.data.users.find(u => u.id === waiterId)?.name || waiterId;
    showCheckinStatus(`✅ CHECK-IN EXITOSO<br>Mesa ${table} | ${customer.firstName} ${customer.lastName}<br>Mesero: ${waiterName}`, 'success');

    selectedCustomer = null;

    // Limpiar y recargar después de 2 segundos
    setTimeout(() => {
      navigateTo('hostess-dashboard');
    }, 2000);

  } catch (error) {
    console.error('Error en check-in:', error);
    showCheckinStatus('❌ Error en check-in. Ver consola.', 'error');
    if (checkinBtn) {
      checkinBtn.removeAttribute('data-processing');
      checkinBtn.innerHTML = 'ASIGNAR MESA';
      checkinBtn.style.opacity = '1';
    }
  }
}

// === CAMBIAR A MODO LISTA DE ESPERA ===
function toggleWaitlistMode() {
  // Ocultar sección de mesa/mesero
  document.getElementById('section-mesa-mesero').classList.add('hidden');
  // Mostrar sección de teléfono
  document.getElementById('section-waitlist-phone').classList.remove('hidden');
  // Cambiar botones
  document.getElementById('btn-checkin').classList.add('hidden');
  document.getElementById('btn-waitlist-toggle').classList.add('hidden');
  document.getElementById('btn-waitlist-confirm').classList.remove('hidden');
  document.getElementById('btn-waitlist-cancel').classList.remove('hidden');
}

// === CANCELAR MODO LISTA DE ESPERA ===
function cancelWaitlistMode() {
  // Mostrar sección de mesa/mesero
  document.getElementById('section-mesa-mesero').classList.remove('hidden');
  // Ocultar sección de teléfono
  document.getElementById('section-waitlist-phone').classList.add('hidden');
  // Restaurar botones
  document.getElementById('btn-checkin').classList.remove('hidden');
  document.getElementById('btn-waitlist-toggle').classList.remove('hidden');
  document.getElementById('btn-waitlist-confirm').classList.add('hidden');
  document.getElementById('btn-waitlist-cancel').classList.add('hidden');
  // Limpiar teléfono
  document.getElementById('h-phone').value = '';
}

// === AGREGAR A LISTA DE ESPERA SIN PROMPTS ===
function doAddToWaitlist() {
  try {
    const fname = document.getElementById('h-firstname').value.trim();
    const lname = document.getElementById('h-lastname').value.trim();
    const pax = document.getElementById('h-pax').value;
    const phone = document.getElementById('h-phone').value.trim();

    // Validaciones
    if (!fname) {
      showCheckinStatus('⚠️ Escribe el NOMBRE del cliente', 'warning');
      return;
    }
    if (!pax || pax < 1) {
      showCheckinStatus('⚠️ Indica el número de PERSONAS', 'warning');
      return;
    }

    const customerName = `${fname} ${lname}`.trim();

    window.db.addToWaitlist({
      branchId: STATE.branch.id,
      customerName,
      pax: parseInt(pax),
      phone: phone || '',
      estimatedWait: 15
    });

    showCheckinStatus(`✅ AGREGADO A LISTA DE ESPERA<br>${customerName} | ${pax} personas${phone ? '<br>📱 ' + phone : ''}`, 'success');

    // Recargar y cambiar a tab de lista
    setTimeout(() => {
      navigateTo('hostess-dashboard');
      setTimeout(() => switchHostessTab('waitlist'), 100);
    }, 1500);

  } catch (error) {
    console.error('Error en lista de espera:', error);
    showCheckinStatus('❌ Error. Ver consola.', 'error');
  }
}

// === MOSTRAR MENSAJE DE ESTADO ===
function showCheckinStatus(message, type) {
  const statusDiv = document.getElementById('checkin-status');
  if (!statusDiv) return;

  statusDiv.innerHTML = message;
  statusDiv.classList.remove('hidden');

  // Estilos según tipo
  if (type === 'success') {
    statusDiv.style.background = 'rgba(34, 197, 94, 0.2)';
    statusDiv.style.border = '2px solid #22C55E';
    statusDiv.style.color = '#86EFAC';
  } else if (type === 'warning') {
    statusDiv.style.background = 'rgba(234, 179, 8, 0.2)';
    statusDiv.style.border = '2px solid #EAB308';
    statusDiv.style.color = '#FCD34D';
    // Auto-ocultar warnings
    setTimeout(() => statusDiv.classList.add('hidden'), 3000);
  } else if (type === 'error') {
    statusDiv.style.background = 'rgba(239, 68, 68, 0.2)';
    statusDiv.style.border = '2px solid #EF4444';
    statusDiv.style.color = '#FCA5A5';
  }
}

// === FUNCIONES LEGACY (mantener por compatibilidad) ===
function promptCheckIn() { doCheckIn(); }
function promptWaitlist() { toggleWaitlistMode(); }

function handleCheckIn() {
  try {
    const fname = document.getElementById('h-firstname').value;
    const lname = document.getElementById('h-lastname').value;
    const lname2 = document.getElementById('h-lastname2').value;
    const pax = document.getElementById('h-pax').value;
    const waiterId = document.getElementById('h-waiter').value;
    const table = document.getElementById('h-table').value;

    console.log('Check-in data:', { fname, lname, lname2, pax, waiterId, table });

    if (!fname || !lname || !pax || !waiterId || !table) {
      alert('Faltan campos obligatorios (Nombre, Apellido, Pax, Mesero, Mesa)');
      return;
    }

    // Validate Table
    if (window.db.isTableOccupied(table, STATE.branch.id)) {
      alert(`⛔ LA MESA ${table} YA ESTÁ OCUPADA. Por favor verifica.`);
      return;
    }

    // Validate waiter can use this table (BARRA restriction)
    const waiter = window.db.data.users.find(u => u.id === waiterId);
    if (waiter && !window.db.isValidTable(table, STATE.branch.id, waiter.position)) {
      alert(`⛔ MESA INVÁLIDA: Las mesas 300 son exclusivas de BARRA. El mesero ${waiter.name} es ${waiter.position}.`);
      return;
    }

    // Find or Create Customer
    let customer = selectedCustomer;
    if (customer) {
      if (customer.firstName !== fname || customer.lastName !== lname) {
        if (confirm("Has cambiado el nombre del cliente seleccionado. ¿Deseas crear un NUEVO cliente con estos datos?")) {
          customer = null;
        }
      }
    }

    if (!customer) {
      customer = window.db.createCustomer({
        firstName: fname,
        lastName: lname,
        lastName2: lname2
      });
      console.log('New customer created:', customer);
    }

    // Create Visit
    const visitData = {
      branchId: STATE.branch.id,
      customerId: customer.id,
      date: new Date().toISOString(),
      pax: parseInt(pax),
      table: table,
      waiterId: waiterId
    };

    console.log('Creating visit:', visitData);
    window.db.createVisit(visitData);

    alert(`✅ Check-in Exitoso.\nMesa: ${table}\nCliente: ${customer.firstName} ${customer.lastName}`);
    selectedCustomer = null;
    navigateTo('hostess-dashboard');
  } catch (error) {
    console.error('Error en check-in:', error);
    alert('Error al hacer check-in. Revisa la consola (F12) para más detalles.');
  }
}

window.handleAddToWaitlist = handleAddToWaitlist;
function handleAddToWaitlist() {
  try {
    const fname = document.getElementById('h-firstname').value;
    const lname = document.getElementById('h-lastname').value;
    const pax = document.getElementById('h-pax').innerText || document.getElementById('h-pax').textContent;

    if (!fname || !pax) {
      alert('Necesitas al menos Nombre y Pax para agregar a lista de espera.');
      return;
    }

    // Pedir teléfono con prompt
    const phone = prompt(`Agregar a lista de espera:\n${fname} ${lname || ''}\n\nIngresa número de teléfono para contacto:`);

    if (!phone) {
      if (!confirm('¿Agregar sin teléfono? (No recomendado - no podrás contactar al cliente)')) {
        return;
      }
    }

    const customerName = `${fname} ${lname || ''}`.trim();

    window.db.addToWaitlist({
      branchId: STATE.branch.id,
      customerName,
      pax: parseInt(pax),
      phone: phone || '',
      estimatedWait: 15
    });

    alert(`✅ ${customerName} agregado a lista de espera.${phone ? '\nTeléfono: ' + phone : ''}`);
    navigateTo('hostess-dashboard');
    setTimeout(() => switchHostessTab('waitlist'), 100);
  } catch (error) {
    console.error('Error al agregar a lista de espera:', error);
    alert('Error al agregar a lista de espera. Revisa la consola (F12).');
  }
}

// === ASIGNAR MESA DESDE LISTA DE ESPERA (SIN PROMPTS) ===
function doAssignFromWaitlist(waitlistId) {
  const entry = window.db.data.waitlist.find(w => w.id === waitlistId);
  if (!entry) {
    showWaitlistStatus(waitlistId, '❌ Entrada no encontrada', 'error');
    return;
  }

  // Obtener valores de los dropdowns
  const tableSelect = document.getElementById(`wl-table-${waitlistId}`);
  const waiterSelect = document.getElementById(`wl-waiter-${waitlistId}`);

  const table = tableSelect ? tableSelect.value : '';
  const waiterId = waiterSelect ? waiterSelect.value : '';

  // Validaciones
  if (!table) {
    showWaitlistStatus(waitlistId, '⚠️ Selecciona una MESA', 'warning');
    return;
  }
  if (!waiterId) {
    showWaitlistStatus(waitlistId, '⚠️ Selecciona un MESERO', 'warning');
    return;
  }

  // Validar mesa no ocupada
  if (window.db.isTableOccupied(table, STATE.branch.id)) {
    showWaitlistStatus(waitlistId, `⛔ Mesa ${table} ocupada`, 'error');
    return;
  }

  // Buscar o crear cliente
  let customer = window.db.searchCustomers(entry.customerName.split(' ')[0])[0];

  if (!customer) {
    const nameParts = entry.customerName.split(' ');
    customer = window.db.createCustomer({
      firstName: nameParts[0] || entry.customerName,
      lastName: nameParts[1] || '',
      lastName2: nameParts[2] || '',
      phone: entry.phone || ''
    });
  }

  // Crear visita
  window.db.createVisit({
    branchId: STATE.branch.id,
    customerId: customer.id,
    date: new Date().toISOString(),
    pax: entry.pax,
    table: table,
    waiterId: waiterId
  });

  // Remover de waitlist
  window.db.removeFromWaitlist(waitlistId);

  const waiterName = window.db.data.users.find(u => u.id === waiterId)?.name || waiterId;
  showWaitlistStatus(waitlistId, `✅ ${entry.customerName} → Mesa ${table}`, 'success');

  // Recargar
  setTimeout(() => navigateTo('hostess-dashboard'), 1500);
}

// === MOSTRAR ESTADO EN TARJETA DE WAITLIST ===
function showWaitlistStatus(waitlistId, message, type) {
  const statusDiv = document.getElementById(`wl-status-${waitlistId}`);
  if (!statusDiv) return;

  statusDiv.textContent = message;
  statusDiv.classList.remove('hidden');

  if (type === 'success') {
    statusDiv.style.background = 'rgba(34, 197, 94, 0.3)';
    statusDiv.style.color = '#86EFAC';
  } else if (type === 'warning') {
    statusDiv.style.background = 'rgba(234, 179, 8, 0.3)';
    statusDiv.style.color = '#FCD34D';
    setTimeout(() => statusDiv.classList.add('hidden'), 2500);
  } else if (type === 'error') {
    statusDiv.style.background = 'rgba(239, 68, 68, 0.3)';
    statusDiv.style.color = '#FCA5A5';
  }
}

// === FUNCIÓN LEGACY (compatibilidad) ===
function assignTableFromWaitlist(waitlistId) {
  // Fallback to new function
  doAssignFromWaitlist(waitlistId);
}

function notifyWaitlistCustomer(id) {
  const entry = window.db.notifyNextInWaitlist(STATE.branch.id);
  if (entry) {
    alert(`📱 Se notificó a ${entry.customerName}. Ahora procede con el check-in.`);
    navigateTo('hostess-dashboard');
  }
}

function removeFromWaitlist(id) {
  // Remover directamente (sin confirm, ya que el botón es pequeño y separado)
  showWaitlistStatus(id, '🗑️ Removido de la lista', 'warning');
  setTimeout(() => {
    window.db.removeFromWaitlist(id);
    navigateTo('hostess-dashboard');
    setTimeout(() => switchHostessTab('waitlist'), 100);
  }, 500);
}

function handleCreateReservation() {
  const name = document.getElementById('r-name').value;
  const phone = document.getElementById('r-phone').value;
  const date = document.getElementById('r-date').value;
  const time = document.getElementById('r-time').value;
  const pax = document.getElementById('r-pax').value;
  const notes = document.getElementById('r-notes').value;

  if (!name || !phone || !date || !time || !pax) {
    alert('Completa todos los campos obligatorios.');
    return;
  }

  window.db.createReservation({
    branchId: STATE.branch.id,
    customerName: name,
    phone,
    date,
    time,
    pax,
    notes
  });

  alert(`✅ Reservación creada para ${name} el ${date} a las ${time}.`);
  navigateTo('hostess-dashboard');
  setTimeout(() => switchHostessTab('reservations'), 100);
}

function confirmReservation(id) {
  window.db.confirmReservation(id);
  alert('✅ Reservación confirmada.');
  navigateTo('hostess-dashboard');
  setTimeout(() => switchHostessTab('reservations'), 100);
}

function cancelReservation(id) {
  if (confirm('¿Cancelar esta reservación?')) {
    window.db.cancelReservation(id);
    navigateTo('hostess-dashboard');
    setTimeout(() => switchHostessTab('reservations'), 100);
  }
}

// === GESTIONAR MESAS SIN POPUPS ===
function doChangeTable(visitId) {
  const inputEl = document.getElementById(`new-table-${visitId}`);
  const newTable = inputEl ? inputEl.value.trim() : '';

  if (!newTable) {
    showTableStatus(visitId, '⚠️ Ingresa # de mesa', 'warning');
    return;
  }

  // Validar que no esté ocupada
  if (window.db.isTableOccupied(newTable, STATE.branch.id)) {
    showTableStatus(visitId, `⛔ Mesa ${newTable} ocupada`, 'error');
    return;
  }

  window.db.updateVisitDetails(visitId, { table: newTable });
  showTableStatus(visitId, `✅ Cambiado a Mesa ${newTable}`, 'success');

  setTimeout(() => navigateTo('hostess-dashboard'), 1500);
}

function doReleaseTable(visitId) {
  window.db.releaseTable(visitId);
  showTableStatus(visitId, '✅ Mesa liberada', 'success');

  setTimeout(() => navigateTo('hostess-dashboard'), 1000);
}

function doChangeWaiter(visitId) {
  const selectEl = document.getElementById(`new-waiter-${visitId}`);
  const newWaiterId = selectEl ? selectEl.value : '';

  if (!newWaiterId) {
    showTableStatus(visitId, '⚠️ Selecciona un mesero', 'warning');
    return;
  }

  window.db.updateVisitDetails(visitId, { waiterId: newWaiterId });
  const waiterName = window.db.data.users.find(u => u.id === newWaiterId)?.name || newWaiterId;
  showTableStatus(visitId, `✅ Mesero: ${waiterName}`, 'success');

  setTimeout(() => navigateTo('hostess-dashboard'), 1500);
}

// === NEW HOSTESS FUNCTIONS FOR REASON/GAME ===
window.getSportIcon = function (league) {
  if (!league) return '📺';
  const l = league.toLowerCase();
  if (l.includes('nfl') || l.includes('americano')) return '🏈';
  if (l.includes('nba') || l.includes('basquet') || l.includes('basket')) return '🏀';
  if (l.includes('mlb') || l.includes('beisbol') || l.includes('baseball')) return '⚾️';
  if (l.includes('soccer') || l.includes('mx') || l.includes('liga') || l.includes('copa') || l.includes('futbol') || l.includes('champions')) return '⚽️';
  if (l.includes('f1') || l.includes('formula')) return '🏎️';
  if (l.includes('ufc') || l.includes('box') || l.includes('pelea')) return '🥊';
  if (l.includes('tenis') || l.includes('atp')) return '🎾';
  return '📺';
};

window.generateGameOptions = function (selected) {
  // Get all matches
  const allMatches = window.db.getMatches() || [];
  // Use en-CA for YYYY-MM-DD format in local time
  const today = new Date().toLocaleDateString('en-CA');

  // SHOW FUTURE GAMES (Requested by Manager)
  // Filter: Date must be today or future
  let matches = allMatches.filter(m => m.date >= today);

  // Sort by Date then Time then League
  matches.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.time !== b.time) return a.time.localeCompare(b.time);
    return (a.league || '').localeCompare(b.league || '');
  });

  console.log(`Dropdown Filter: Found ${matches.length} upcoming games`);

  let html = matches.map(m => {
    const matchName = m.match || `${m.homeTeam} vs ${m.awayTeam}`;
    // Fallback if matchName is undefined/null
    const val = matchName || 'Evento Sin Nombre';
    // Format: "YYYY-MM-DD HH:mm | LEAGUE | Team vs Team"
    // User request: "fecha hora deporte y equipos"
    return `<option value="${val}" ${val === selected ? 'selected' : ''}>${m.date} ${m.time} • ${m.league || 'General'} • ${val}</option>`;
  }).join('');

  // If the currently selected game is NOT in the list (past game or validation error), show it with warning
  if (selected && selected !== 'OTRO' && !matches.find(m => (m.match || `${m.homeTeam} vs ${m.awayTeam}`) === selected)) {
    html += `<option value="${selected}" selected>${selected} (⚠️ Pasado / No listado)</option>`;
  }

  // Add Other Option
  const isCustom = selected === 'OTRO';
  html += `<option value="OTRO" ${isCustom ? 'selected' : ''}>⚠️ OTRO / NO EN LISTA</option>`;

  return html;
};

window.updateHostessReason = function (visitId, selectEl) {
  const reason = selectEl.value;
  const gameDiv = document.getElementById(`hostess-game-select-${visitId}`);

  if (reason === 'Partido') {
    if (gameDiv) gameDiv.classList.remove('hidden');
  } else {
    if (gameDiv) gameDiv.classList.add('hidden');
    // Clear game if not watching game
    window.db.updateVisitDetails(visitId, { selectedGame: '' });
  }

  // Save immediately
  window.db.updateVisitDetails(visitId, { reason });
};

window.toggleFavoriteTeamSection = function (visitId, checkbox) {
  const teamSelectDiv = document.getElementById(`team-select-${visitId}`);
  if (checkbox.checked) {
    if (teamSelectDiv) teamSelectDiv.classList.remove('hidden');
    window.db.updateVisitDetails(visitId, { isFavoriteTeamMatch: true });
  } else {
    if (teamSelectDiv) teamSelectDiv.classList.add('hidden');
    window.db.updateVisitDetails(visitId, { isFavoriteTeamMatch: false });
  }
};

// Helper for Split Custom Game Input
window.saveCustomGameSplit = function (visitId) {
  const homeInput = document.getElementById(`custom-home-${visitId}`);
  const awayInput = document.getElementById(`custom-away-${visitId}`);

  if (homeInput && awayInput) {
    const home = homeInput.value.trim();
    const away = awayInput.value.trim();

    if (home && away) {
      const combinedName = `${home} vs ${away}`;
      // 1. Save locally to visit
      window.db.updateVisitDetails(visitId, { selectedGame: combinedName });

      // 2. Check if this is a NEW game (not in official schedule)
      const officialGames = window.db.getMatches();
      // Normalize comparison
      const exists = officialGames.find(g => {
        const gName = g.match || (["UFC", "F1", "Tenis", "Boxeo"].includes(g.league) ? (g.homeTeam || g.sport || g.league) : `${g.homeTeam} vs ${g.awayTeam}`);
        return gName.toLowerCase() === combinedName.toLowerCase();
      });

      if (!exists) {
        // It's a custom game -> Request approval from Manager
        console.log('Sending request to Manager for:', combinedName);
        window.db.requestGame(combinedName);
        alert(`⚠️ Partido Nuevo Detectado: "${combinedName}"\n\n✅ Se ha enviado una SOLICITUD a la pestaña "JUEGOS" del Gerente para agregarlo a la programación oficial.`);
      } else {
        // If it exists but was entered manually
        // alert('✅ Partido asignado Correctamente');
      }

    } else if (home || away) {
      alert('Por favor ingresa AMBOS equipos (Local y Visita)');
    }
  }
};

// Helper for Manager Add Game Form
window.updateGameFormFields = function () {
  const league = document.getElementById('new-league')?.value;
  const container = document.getElementById('game-form-teams');
  if (!container || !league) return;

  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
  const isIndividual = individualSports.includes(league);

  if (isIndividual) {
    container.innerHTML = `
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-[10px] uppercase font-bold text-yellow-400 block mb-1">🎯 Nombre del Evento</label>
          <input id="new-home" placeholder="Ej: UFC 350, Wimbledon, Gran Premio de México" class="w-full bg-black text-white rounded p-2 text-sm border border-yellow-500 focus:border-yellow-300">
        </div>
        <div>
          <label class="text-[10px] uppercase font-bold text-purple-400 block mb-1">⭐ Pelea / Partido Estelar (opcional)</label>
          <input id="new-away" placeholder="Ej: Moreno vs Cejudo, Alcaraz vs Djokovic" class="w-full bg-black text-white rounded p-2 text-sm border border-purple-500 focus:border-purple-300">
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="grid grid-cols-2 gap-3">
        <input list="team-suggestions" id="new-home" placeholder="Equipo Local" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600 focus:border-blue-500">
        <input list="team-suggestions" id="new-away" placeholder="Equipo Visitante" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600 focus:border-blue-500">
      </div>
    `;
  }
};

window.addGameFromManager = function () {
  const league = document.getElementById('new-league').value;
  const date = document.getElementById('new-date').value; // Now reads the actual date field
  const time = document.getElementById('new-time').value;
  const home = document.getElementById('new-home').value.trim();
  const away = document.getElementById('new-away').value.trim();

  // DEBUG: Log what we're getting
  console.log('📅 Date from form:', date);
  console.log('⏰ Time from form:', time);

  // Individual sports (no home/away concept)
  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
  const isIndividual = individualSports.includes(league);

  if (!league || !time || !date) {
    alert('Por favor completa Liga, Fecha y Hora');
    return;
  }

  if (!isIndividual && (!home || !away)) {
    alert('Por favor completa Equipo Local y Visitante');
    return;
  }

  if (isIndividual && !home) {
    alert('Por favor escribe el nombre del evento (ej: "Hamilton vs Verstappen", "Canelo vs GGG")');
    return;
  }

  // Build game object - EXPLICITLY include date
  const gameData = {
    league,
    date: date, // CRITICAL: Explicitly pass date from form
    time
  };

  console.log('💾 Saving game with date:', gameData.date);

  if (isIndividual) {
    // For individual sports, use "match" field instead of homeTeam/awayTeam
    gameData.match = home; // Event name e.g. "UFC 350", "Wimbledon"
    gameData.mainEvent = away || ''; // Optional: "Moreno vs Cejudo"
    gameData.sport = league;
  } else {
    gameData.homeTeam = home;
    gameData.awayTeam = away;
  }

  window.db.addGame(gameData);

  // Clear and refresh
  if (document.getElementById('new-home')) document.getElementById('new-home').value = '';
  if (document.getElementById('new-away')) document.getElementById('new-away').value = '';
  // Optional: Hide form
  if (document.getElementById('add-game-form')) {
    document.getElementById('add-game-form').classList.add('hidden');
  }

  renderManagerDashboard('games');
};

window.saveFavoriteTeam = function (visitId, customerId, teamName) {
  if (teamName) {
    // Save to customer (permanent data)
    window.db.updateCustomer(customerId, { team: teamName });
    console.log(`✅ Equipo favorito guardado: ${teamName} para cliente ${customerId}`);
  }
};

window.saveVisitInfo = function (visitId) {
  // This function is called when the user clicks "GUARDAR INFO VISITA"
  // All data should already be saved via onChange handlers, but we confirm here
  const visit = window.db.data.visits.find(v => v.id === visitId);
  if (visit) {
    alert(`✅ Información guardada correctamente\n\nMotivo: ${visit.reason || 'No especificado'}\nPartido: ${visit.selectedGame || 'N/A'}\nEquipo Favorito: ${visit.isFavoriteTeamMatch ? 'Sí' : 'No'}`);
    // Force save to ensure persistence
    window.db._save();
    // Refresh the view
    navigateTo('hostess-dashboard');
  }
};

window.updateHostessGame = function (visitId, selectEl) {
  const selectedGame = selectEl.value;
  const customDiv = document.getElementById(`hostess-custom-game-${visitId}`);
  const teamSelect = document.getElementById(`favorite-team-${visitId}`);

  if (selectedGame === 'OTRO') {
    if (customDiv) {
      customDiv.classList.remove('hidden');
      const input = customDiv.querySelector('input');
      if (input) input.focus();
    }
    // Clear team select if custom
    if (teamSelect) teamSelect.innerHTML = '<option value="">Escribe el partido primero</option>';
  } else {
    if (customDiv) customDiv.classList.add('hidden');
    window.db.updateVisitDetails(visitId, { selectedGame });

    // Update Team Select Options
    if (teamSelect && selectedGame) {
      const game = window.db.getMatches().find(m => (m.match || (m.homeTeam + ' vs ' + m.awayTeam)) === selectedGame);
      if (game && game.homeTeam && game.awayTeam) {
        teamSelect.innerHTML = `
                <option value="">-- ¿A quién apoya? --</option>
                <option value="${game.homeTeam}">${game.homeTeam}</option>
                <option value="${game.awayTeam}">${game.awayTeam}</option>
             `;
      } else {
        teamSelect.innerHTML = '<option value="">Datos de equipos no disponibles</option>';
      }
    } else if (teamSelect) {
      teamSelect.innerHTML = '<option value="">Primero selecciona un partido</option>';
    }
  }
};


window.approveGameRequest = function (reqId, name) {
  // Try to guess teams
  const teams = name.split(/ vs | VS | Vs /);
  const home = teams[0] ? teams[0].trim() : name;
  const away = teams[1] ? teams[1].trim() : 'Visitante';

  const league = prompt(`Aprobando: ${name}\n\nLiga (NFL, NBA...):`, 'General');
  if (!league) return;
  const finalHome = prompt('Equipo Local:', home);
  const finalAway = prompt('Equipo Visitante:', away);
  const time = prompt('Hora (HH:MM):', '19:00');

  if (league && finalHome && finalAway && time) {
    window.db.addGame({ league, homeTeam: finalHome, awayTeam: finalAway, time });
    window.db.removeGameRequest(reqId);
    renderManagerDashboard(); // Refresh UI
    alert('✅ Partido agregado exitosamente.');
  }
};

window.saveCustomGame = function (visitId, inputEl) {
  const val = inputEl.value;
  window.db.updateVisitDetails(visitId, { selectedGame: val });
};

window.requestGameToManager = function (visitId) {
  const div = document.getElementById(`hostess-custom-game-${visitId}`);
  const input = div.querySelector('input');
  const gameName = input.value.trim();
  if (gameName) {
    window.db.requestGame(gameName);
    alert(`✅ Solicitud enviada al Gerente para: "${gameName}"\n\nEl partido quedará registrado provisionalmente en esta mesa.`);
  } else {
    alert('Escribe el nombre del partido primero.');
  }
};

function showTableStatus(visitId, message, type) {
  const statusDiv = document.getElementById(`table-status-${visitId}`);
  if (!statusDiv) return;

  statusDiv.textContent = message;
  statusDiv.classList.remove('hidden');

  if (type === 'success') {
    statusDiv.style.background = 'rgba(34, 197, 94, 0.3)';
    statusDiv.style.color = '#86EFAC';
  } else if (type === 'warning') {
    statusDiv.style.background = 'rgba(234, 179, 8, 0.3)';
    statusDiv.style.color = '#FCD34D';
    setTimeout(() => statusDiv.classList.add('hidden'), 2500);
  } else if (type === 'error') {
    statusDiv.style.background = 'rgba(239, 68, 68, 0.3)';
    statusDiv.style.color = '#FCA5A5';
    setTimeout(() => statusDiv.classList.add('hidden'), 3000);
  }
}

// Legacy function (compatibilidad)
function manageVisit(visitId) {
  // No hacer nada - ahora usamos botones inline
}


// ===== SECCIÓN 2: MANAGER DASHBOARD =====

// ------ MANAGER DASHBOARD (TABBED UI - v9.6) ------

window.renderManagerDashboard = function (activeTab = 'tables') {
  appContainer.innerHTML = '';
  console.log('Rendering Manager Dashboard, Tab:', activeTab);
  const branchId = STATE.branch?.id;
  if (!branchId) { alert('Selecciona sucursal'); renderLogin(); return; }

  // Get active visits for badge count
  // Get active visits for badge count
  const activeVisits = window.db.getActiveVisitsByBranch(branchId);
  window.CURRENT_MANAGER_TAB = activeTab;

  // RENDER UI FIRST to prevent black screen
  const div = document.createElement('div');
  div.className = 'bg-gray-900 min-h-screen pb-24'; // Padding for bottom nav

  // AUTO-REPAIR: DISABLED - Was causing Firebase errors with undefined values
  // TODO: Re-enable after proper Firebase integration (Phase 1)
  /*
  if (window.dbFirestore && window.FB) {
    const { doc, getDoc, setDoc } = window.FB;
    const gamesRef = doc(window.dbFirestore, 'config', 'allGames');
    getDoc(gamesRef).then(snap => {
      if (!snap.exists()) {
        const info = window.db.getDailyInfo();
        setDoc(gamesRef, JSON.parse(JSON.stringify(info)))
          .then(() => console.log("✅ REPAIR SUCCESS: config/allGames created!"))
          .catch(e => console.error("❌ REPAIR FAILED:", e));
      } else {
        console.log("✅ Config Check: config/allGames valid.");
      }
    });
  }
  */

  // HEADER FIXED
  div.innerHTML = `
                <header class="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg safe-area-pt">
                  <div>
                    <h1 class="text-xl font-black text-yellow-500 tracking-tighter flex items-center gap-1">
                      GERENTE <span class="text-white text-xs bg-gray-700 px-1 rounded ml-1">v22.20</span>
                    </h1>
                    <p class="text-[10px] text-gray-400 font-mono">${STATE.branch.name} • ${STATE.user.name}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="window.db._syncLocalReservationsToFirebase(); alert('☁️ Intentando subir reservaciones... revisa la consola.');" class="text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-200 px-3 py-1 rounded border border-blue-700 transition-colors uppercase font-bold flex items-center gap-1 mr-2">
                      ☁️ Forzar Sync
                    </button>
                    <button onclick="renderManagerDashboard(window.CURRENT_MANAGER_TAB || 'tables')" class="text-xs bg-gray-700 hover:bg-yellow-600 hover:text-black text-yellow-500 px-3 py-1 rounded border border-yellow-600/50 transition-colors uppercase font-bold flex items-center gap-1">
                      🔄 Actualizar
                    </button>
                    <div class="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-800 font-mono">
                      ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </header>

                <main id="manager-content" class="p-3 pb-32 has-bottom-nav animate-fade-in"></main>

                <!-- BOTTOM NAVIGATION - GERENTE -->
                <nav class="bottom-nav">
                  <button onclick="renderManagerDashboard('tables')" id="managertab-tables" class="bottom-nav-item ${activeTab === 'tables' ? 'active' : ''}" style="position: relative; min-width: 60px;">
                    <span class="bottom-nav-icon">🍽️</span>
                    <span class="bottom-nav-label">Mesas</span>
                    ${activeTab === 'tables' ? '<span class="bottom-nav-badge">' + activeVisits.length + '</span>' : ''}
                  </button>
                  <button onclick="renderManagerDashboard('games')" id="managertab-games" class="bottom-nav-item ${activeTab === 'games' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">📺</span>
                    <span class="bottom-nav-label">Partidos</span>
                    ${(window.db.getDailyInfo().gameRequests || []).length > 0 ? '<span class="bottom-nav-badge">' + (window.db.getDailyInfo().gameRequests || []).length + '</span>' : ''}
                  </button>

                  <!-- NEW: Reservations Tab -->
                  <button onclick="renderManagerDashboard('reservations')" id="managertab-reservations" class="bottom-nav-item ${activeTab === 'reservations' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">🎟️</span>
                    <span class="bottom-nav-label">Reservas</span>
                  </button>

                  <button onclick="renderManagerDashboard('reports')" id="managertab-reports" class="bottom-nav-item ${activeTab === 'reports' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">📊</span>
                    <span class="bottom-nav-label">Reportes</span>
                  </button>

                  <button onclick="renderManagerDashboard('sports')" id="managertab-sports" class="bottom-nav-item ${activeTab === 'sports' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">🏟️</span>
                    <span class="bottom-nav-label">Deportes</span>
                  </button>
                  
                  <!-- Menu Management (86 / Admin) -->
                  <button onclick="renderManagerDashboard('menu')" id="managertab-menu" class="bottom-nav-item ${activeTab === 'menu' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">🍔</span>
                    <span class="bottom-nav-label">Menú</span>
                  </button>
                  
                  <!-- Team / Productivity -->
                  <button onclick="renderManagerDashboard('team')" id="managertab-team" class="bottom-nav-item ${activeTab === 'team' ? 'active' : ''}" style="position: relative;">
                    <span class="bottom-nav-icon">👥</span>
                    <span class="bottom-nav-label">Equipo</span>
                  </button>
                  
                  <button onclick="handleLogout()" class="bottom-nav-item" style="position: relative;">
                    <span class="bottom-nav-icon">🚪</span>
                    <span class="bottom-nav-label">Salir</span>
                  </button>
                </nav>
                `;

  document.getElementById('app').innerHTML = '';
  document.getElementById('app').appendChild(div);

  // RENDER TAB CONTENT
  const content = div.querySelector('#manager-content');

  if (activeTab === 'tables') renderManagerTablesTab(content);
  else if (activeTab === 'games') renderManagerGamesTab(content);
  else if (activeTab === 'reservations') renderManagerReservationsTab(content); // NEW TAB
  else if (activeTab === 'reports') renderManagerReportsTab(content);
  else if (activeTab === 'sports') renderManagerSportsCRMTab(content);
  else if (activeTab === 'menu') renderManagerMenuTab(content);
  else if (activeTab === 'team') renderManagerTeamTab(content);
};

// NEW: Render Reservations

// --- MANAGER TABS IMPLEMENTATION ---

window.INV_STATE = { tab: 'Alimento', category: null, query: '' };

function renderManagerMenuTab(container) {
  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.alimentos || []).map(i => ({ ...i, type: 'Alimento' })),
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];
  window.TEMP_INVENTORY = allItems;

  const div = document.createElement('div');
  div.id = 'inv-manager-container';
  div.className = 'animate-fade-in';
  div.style.paddingBottom = '300px'; // Extreme inline padding to guarantee scroll
  container.innerHTML = '';
  container.appendChild(div);

  // Reset state on open
  window.INV_STATE = { tab: 'Alimento', category: null, query: '' };
  window.renderInvUI();
}

window.renderInvUI = function () {
  const container = document.getElementById('inv-manager-container');
  if (!container) return;

  const { tab, category, query } = window.INV_STATE;
  const allItems = window.TEMP_INVENTORY || [];

  let html = `
    <!-- Top Tabs (Alimentos / Bebidas) -->
    <div class="flex gap-2 p-3 bg-gray-900 sticky top-[72px] z-40 border-b border-gray-700 shadow-xl">
      <button onclick="window.INV_STATE.tab='Alimento'; window.INV_STATE.category=null; window.renderInvUI();" class="flex-1 py-3 rounded-lg font-bold text-center transition-all ${tab === 'Alimento' ? 'bg-orange-600 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">🍔 ALIMENTOS</button>
      <button onclick="window.INV_STATE.tab='Bebida'; window.INV_STATE.category=null; window.renderInvUI();" class="flex-1 py-3 rounded-lg font-bold text-center transition-all ${tab === 'Bebida' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">🍹 BEBIDAS</button>
    </div>
  `;

  const typeItems = allItems.filter(i => i.type === tab);

  if (!category) {
    // CATEGORY VIEW
    const cats = [...new Set(typeItems.map(i => i.category || 'Otros'))].sort();

    html += `
      <div class="p-4">
        <h2 class="text-xl font-black text-white mb-4 uppercase tracking-wider text-center border-b border-gray-700 pb-2">Selecciona Categoría</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${cats.map(c => {
      const count = typeItems.filter(i => (i.category || 'Otros') === c).length;
      return `
              <button onclick="window.INV_STATE.category='${c}'; window.renderInvUI();" class="bg-gray-800 hover:bg-yellow-600 hover:text-black border border-gray-700 p-4 rounded-xl font-bold uppercase tracking-wide text-sm flex flex-col items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                <span>🏷️ ${c}</span>
                <span class="text-[10px] bg-black/40 px-2 py-1 rounded-full text-white">${count} items</span>
              </button>
            `;
    }).join('')}
        </div>
        <!-- Spacer invisible para barra de navegación (Categorías) -->
        <div class="h-48 w-full"></div>
      </div>
    `;

  } else {
    // ITEMS VIEW
    html += `
      <div class="p-4 sticky top-[138px] z-30 bg-gray-900 border-b border-gray-800 shadow-xl flex gap-2">
         <button onclick="window.INV_STATE.category=null; window.INV_STATE.query=''; window.renderInvUI();" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 transition shadow-lg">
           ← 
         </button>
         <div class="relative flex-1">
             <input type="text" id="inv-state-search" oninput="window.INV_STATE.query=this.value; window.renderInvListOnly();" placeholder="Buscar en ${category}..." value="${query}" class="w-full pl-10 pr-3 py-3 bg-gray-800 focus:bg-gray-700 rounded-lg border border-gray-600 text-white text-base font-bold outline-none focus:border-yellow-500 shadow-inner transition-colors">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</div>
         </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-black text-yellow-500 uppercase tracking-tighter mb-4 flex items-center gap-2">
          🏷️ ${category}
        </h2>
        <div id="inv-state-list" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${window._renderStateInvListHTML()}
        </div>
        <!-- Spacer invisible para barra de navegación -->
        <div class="h-48 w-full"></div>
      </div>
    `;
  }

  container.innerHTML = html;
}

window.renderInvListOnly = function () {
  const listContainer = document.getElementById('inv-state-list');
  if (listContainer) {
    listContainer.innerHTML = window._renderStateInvListHTML();
  }
}

window._renderStateInvListHTML = function () {
  const { tab, category, query } = window.INV_STATE;
  const allItems = window.TEMP_INVENTORY || [];

  let items = allItems.filter(i => i.type === tab && (i.category || 'Otros') === category);
  if (query) {
    const q = query.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q));
  }

  if (items.length === 0) return '<div class="col-span-full text-center text-gray-500 py-8 text-lg font-bold">No se encontraron productos</div>';

  return items.sort((a, b) => a.name.localeCompare(b.name)).map(item => `
        <div class="inv-item bg-gray-800 p-4 rounded-xl flex justify-between items-center border-l-4 ${item.available ? 'border-green-500' : 'border-red-600'} shadow-lg hover:bg-gray-750 transition-all group">
          <div class="flex-1 pr-4">
            <div class="font-bold text-white text-lg leading-tight mb-1 group-hover:text-yellow-400 transition-colors">${item.name}</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" class="sr-only peer" onchange="window.handleAvailabilityToggle('${item.id}', this)" ${item.available ? 'checked' : ''}>
              <div class="w-14 h-7 bg-red-900/80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600 peer-checked:after:bg-white shadow-inner"></div>
              <span class="ml-3 text-xs font-black w-[60px] text-right ${item.available ? 'text-green-400' : 'text-red-500'}">${item.available ? 'DISP.' : 'AGOTADO'}</span>
          </label>
        </div>
      `).join('');
}
// === BARRA MENU ADMIN ===
window.renderBarraMenuAdmin = function () {
  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];
  window.TEMP_INVENTORY = allItems;

  const container = document.getElementById('inv-barra-wrapper');
  if (!container) {
    console.error("Missing inv-barra-wrapper container");
    return;
  }
  container.innerHTML = `<div id="inv-barra-container" class="animate-fade-in w-full"></div>`;

  // Force state strictly to Bebida
  window.INV_STATE = { tab: 'Bebida', category: null, query: '' };
  window.renderBarraInvUI();
}

window.renderBarraInvUI = function () {
  const container = document.getElementById('inv-barra-container');
  if (!container) return;

  const { category, query } = window.INV_STATE;
  const allItems = window.TEMP_INVENTORY || [];

  let html = `
    <!-- Barra Header (No toggle for Alimentos) -->
    <div class="p-4 bg-gray-900 sticky top-0 z-40 border-b border-blue-900 shadow-xl flex justify-between items-center">
      <h2 class="text-xl font-black text-blue-400">🍹 GESTIÓN 86 BEBIDAS</h2>
      <button onclick="switchWaiterTab('mesas')" class="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-600">Mesas</button>
    </div>
  `;

  if (!category) {
    // CATEGORY VIEW
    const cats = [...new Set(allItems.map(i => i.category || 'Otros'))].sort();

    html += `
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-400 mb-4 uppercase tracking-wider text-center">Selecciona Categoría</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${cats.map(c => {
      const count = allItems.filter(i => (i.category || 'Otros') === c).length;
      return `
              <button onclick="window.INV_STATE.category='${c}'; window.renderBarraInvUI();" class="bg-gray-800 hover:bg-blue-600 hover:text-white border border-gray-700 p-4 rounded-xl font-bold uppercase tracking-wide text-sm flex flex-col items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                <span>🏷️ ${c}</span>
                <span class="text-[10px] bg-black/40 px-2 py-1 rounded-full text-white">${count} items</span>
              </button>
            `;
    }).join('')}
        </div>
      </div>
    `;

  } else {
    // ITEMS VIEW
    html += `
      <div class="p-4 sticky top-[138px] z-30 bg-gray-900 border-b border-gray-800 shadow-xl flex gap-2">
         <button onclick="window.INV_STATE.category=null; window.INV_STATE.query=''; window.renderBarraInvUI();" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 transition shadow-lg">
           ← 
         </button>
         <div class="relative flex-1">
             <input type="text" id="inv-state-search" oninput="window.INV_STATE.query=this.value; window.renderBarraInvListOnly();" placeholder="Buscar en ${category}..." value="${query}" class="w-full pl-10 pr-3 py-3 bg-gray-800 focus:bg-gray-700 rounded-lg border border-gray-600 text-white text-base font-bold outline-none focus:border-blue-500 shadow-inner transition-colors">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</div>
         </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-black text-blue-400 uppercase tracking-tighter mb-4 flex items-center gap-2">
          🏷️ ${category}
        </h2>
        <div id="inv-state-list" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${window._renderStateInvListHTML()}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

window.renderBarraInvListOnly = function () {
  const listContainer = document.getElementById('inv-state-list');
  if (listContainer) {
    listContainer.innerHTML = window._renderStateInvListHTML();
  }
}

// === SUGERIR MENU ADMIN ===
window.renderSuggestMenuAdmin = function () {
  const container = document.getElementById('inv-sugerir-wrapper');
  if (!container) return; // Not an admin/barra user

  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.alimentos || []).map(i => ({ ...i, type: 'Alimento' })),
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];
  window.TEMP_INVENTORY = allItems;

  container.innerHTML = `<div id="inv-sugerir-container" class="animate-fade-in w-full"></div>`;

  // Default state
  window.INV_STATE = { tab: 'Bebida', category: null, query: '' };
  window.renderSuggestInvUI();
}

window.renderSuggestInvUI = function () {
  const container = document.getElementById('inv-sugerir-container');
  if (!container) return;

  const { tab, category, query } = window.INV_STATE;
  const allItems = window.TEMP_INVENTORY || [];

  let html = `
    <!-- Sugerir Header -->
    <div class="p-4 bg-gray-900 sticky top-0 z-40 border-b border-green-900 shadow-xl flex justify-between items-center">
      <h2 class="text-xl font-black text-green-400">🚀 GESTOR DE SUGERENCIAS</h2>
      <button onclick="switchWaiterTab('mesas')" class="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-600">Mesas</button>
    </div>
    
    <!-- Top Tabs (Alimentos / Bebidas) -->
    <div class="flex gap-2 p-3 bg-gray-900 sticky top-[72px] z-40 border-b border-gray-700 shadow-xl">
      <button onclick="window.INV_STATE.tab='Alimento'; window.INV_STATE.category=null; window.renderSuggestInvUI();" class="flex-1 py-3 rounded-lg font-bold text-center transition-all ${tab === 'Alimento' ? 'bg-orange-600 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">🍔 ALIMENTOS</button>
      <button onclick="window.INV_STATE.tab='Bebida'; window.INV_STATE.category=null; window.renderSuggestInvUI();" class="flex-1 py-3 rounded-lg font-bold text-center transition-all ${tab === 'Bebida' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">🍹 BEBIDAS</button>
    </div>
  `;

  const typeItems = allItems.filter(i => i.type === tab);

  if (!category) {
    // CATEGORY VIEW
    const cats = [...new Set(typeItems.map(i => i.category || 'Otros'))].sort();

    html += `
      <div class="p-4">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${cats.map(c => {
      const count = typeItems.filter(i => (i.category || 'Otros') === c).length;
      return `
              <button onclick="window.INV_STATE.category='${c}'; window.renderSuggestInvUI();" class="bg-gray-800 hover:bg-green-600 hover:text-white border border-gray-700 p-4 rounded-xl font-bold uppercase tracking-wide text-sm flex flex-col items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                <span>🏷️ ${c}</span>
                <span class="text-[10px] bg-black/40 px-2 py-1 rounded-full text-white">${count} items</span>
              </button>
            `;
    }).join('')}
        </div>
      </div>
    `;
  } else {
    // ITEMS VIEW
    html += `
      <div class="p-4 sticky top-[138px] z-30 bg-gray-900 border-b border-gray-800 shadow-xl flex gap-2">
         <button onclick="window.INV_STATE.category=null; window.INV_STATE.query=''; window.renderSuggestInvUI();" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 transition shadow-lg">
           ← 
         </button>
         <div class="relative flex-1">
             <input type="text" id="inv-state-search" oninput="window.INV_STATE.query=this.value; window.renderSuggestInvListOnly();" placeholder="Buscar en ${category}..." value="${query}" class="w-full pl-10 pr-3 py-3 bg-gray-800 focus:bg-gray-700 rounded-lg border border-gray-600 text-white text-base font-bold outline-none focus:border-green-500 shadow-inner transition-colors">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</div>
         </div>
      </div>
      <div class="p-4">
        <div id="inv-state-list-sugerir" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${window._renderSuggestInvListHTML()}
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

window.renderSuggestInvListOnly = function () {
  const listContainer = document.getElementById('inv-state-list-sugerir');
  if (listContainer) {
    listContainer.innerHTML = window._renderSuggestInvListHTML();
  }
}

window._renderSuggestInvListHTML = function () {
  const { tab, category, query } = window.INV_STATE;
  const allItems = window.TEMP_INVENTORY || [];

  // Get currently pushed items to check if active
  const dailyInfo = window.db.getDailyInfo();
  const pushedItems = dailyInfo.products?.push || [];
  const pushedIds = pushedItems.map(p => p.itemId);

  let items = allItems.filter(i => i.type === tab && (i.category || 'Otros') === category);
  if (query) {
    const q = query.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q));
  }

  if (items.length === 0) return '<div class="col-span-full text-center text-gray-500 py-8 text-lg font-bold">No se encontraron productos</div>';

  return items.sort((a, b) => a.name.localeCompare(b.name)).map(item => {
    const isPushed = pushedIds.includes(item.id);
    return `
        <div class="inv-item bg-gray-800 p-4 rounded-xl flex justify-between items-center border-l-4 ${isPushed ? 'border-green-500' : 'border-gray-600'} shadow-lg hover:bg-gray-750 transition-all group">
          <div class="flex-1 pr-4">
            <div class="font-bold text-white text-lg leading-tight mb-1 group-hover:text-green-400 transition-colors">${item.name}</div>
          </div>
          <button onclick="window.handlePushToggle('${item.id}');" class="px-4 py-2 rounded-lg font-bold transition-colors ${isPushed ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}">
            ${isPushed ? 'EN PUSH 🚀' : 'SUGERIR'}
          </button>
        </div>
      `;
  }).join('');
}

window.handlePushToggle = function (itemId) {
  window.db.togglePushProduct(itemId);
  window.renderSuggestInvListOnly();
}

function renderManagerTeamTab(container) {
  const div = document.createElement('div');
  div.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in';
  div.innerHTML = `
    <!-- Dinámicas -->
    <div onclick="alert('Abriendo Módulo de Dinámicas...')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500 cursor-pointer transition group">
      <div class="text-4xl mb-4 group-hover:scale-110 transition">🎯</div>
      <h2 class="text-xl font-bold text-white mb-2">Dinámicas y Concursos</h2>
      <p class="text-gray-400 text-sm">Gestionar concursos y dinámicas de ventas del equipo</p>
    </div>

    <!-- Equipo -->
    <div onclick="alert('Abriendo Gestión de Equipo...')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition group">
      <div class="text-4xl mb-4 group-hover:scale-110 transition">👥</div>
      <h2 class="text-xl font-bold text-white mb-2">Productividad</h2>
      <p class="text-gray-400 text-sm">Métricas de desempeño, horarios y reportes del equipo</p>
    </div>
  `;
  // If the old renderDailyControlView exists we could use it, but for now we put placeholders
  // as the original code triggered "Módulo de Dinámicas - Próximamente" in app.js line 5655.

  container.innerHTML = '';
  container.appendChild(div);
}


function renderManagerGameRequests(container) {
  const requests = window.db.getDailyInfo().gameRequests || [];
  if (requests.length === 0) return;

  const div = document.createElement('div');
  div.innerHTML = `
                <div class="card mb-4 bg-orange-900/20 border border-orange-500/50 shadow-lg animate-pulse-slow">
                  <div class="flex justify-between items-center mb-3">
                    <h2 class="text-lg font-bold text-orange-400 flex items-center gap-2">🔔 Solicitudes Hostess (<span class="text-white">${requests.length}</span>)</h2>
                  </div>
                  <div class="space-y-2">
                    ${requests.map(r => `
               <div class="bg-black/40 p-3 rounded border border-orange-500/30 flex flex-col gap-2">
                   <div class="flex items-center gap-3">
                       <span class="text-2xl">🙋‍♀️</span>
                       <div>
                           <div class="font-bold text-white text-base leading-tight">"${r.name}"</div>
                           <div class="text-[10px] text-gray-400">Solicitado: ${new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                       </div>
                   </div>
                   <div class="grid grid-cols-2 gap-2 mt-1">
                       <button onclick="window.approveGameRequest('${r.id}', '${r.name}')" class="bg-green-600 text-white p-2 rounded font-bold text-[10px] hover:bg-green-500 shadow border-b-2 border-green-800 active:border-b-0 active:translate-y-1 transition-all">✅ APROBAR</button>
                       <button onclick="window.db.removeGameRequest('${r.id}'); renderManagerDashboard('games');" class="bg-red-900/50 text-red-300 p-2 rounded font-bold text-[10px] border border-red-800 hover:bg-red-900">❌ RECHAZAR</button>
                   </div>
               </div>
            `).join('')}
                  </div>
                </div>
                `;
  container.appendChild(div);

  // NEW: Render requests if container exists (Dynamic Injection)
  const reqContainer = div.querySelector('#manager-requests-container');
  if (reqContainer) {
    renderManagerGameRequests(reqContainer);
  }
}

function renderManagerTablesTab(container) {
  const branchId = STATE.branch?.id;
  console.log(`🍽️ MANAGER: Rendering Tables for BranchID: "${branchId}"`);
  // Sort by table number if possible, or naturally
  const activeVisits = window.db.getActiveVisitsByBranch(branchId)
    .sort((a, b) => {
      const tA = a.table.toString();
      const tB = b.table.toString();
      return tA.localeCompare(tB, undefined, { numeric: true, sensitivity: 'base' });
    });

  const prospects = window.db.getProspects();

  // Summary Chips
  const totalPax = activeVisits.reduce((sum, v) => sum + parseInt(v.pax || 0), 0);
  const prospectCount = prospects.length;

  const summaryDiv = document.createElement('div');
  summaryDiv.innerHTML = `
                <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  <div class="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 whitespace-nowrap">
                    <span class="text-gray-400 text-xs uppercase font-bold">Total Mesas</span>
                    <span class="text-white font-bold ml-1">${activeVisits.length}</span>
                  </div>
                  <div class="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 whitespace-nowrap">
                    <span class="text-gray-400 text-xs uppercase font-bold">Comensales</span>
                    <span class="text-white font-bold ml-1">${totalPax}</span>
                  </div>
                  <div class="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 whitespace-nowrap">
                    <span class="text-purple-400 text-xs uppercase font-bold">Prospectos</span>
                    <span class="text-white font-bold ml-1">${prospectCount}</span>
                  </div>
                </div>
                `;
  container.appendChild(summaryDiv);

  // WAITER FILTER
  const waiters = window.db.data.users.filter(u => u.role === 'waiter' && u.branchId === branchId);
  const filterDiv = document.createElement('div');
  filterDiv.className = 'mb-4';
  filterDiv.innerHTML = `
                <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <label class="text-gray-400 text-xs uppercase font-bold block mb-2">🔍 Filtrar por Mesero</label>
                  <select id="waiter-filter" onchange="window.filterManagerTables(this.value)"
                    class="w-full bg-gray-900 text-white border border-gray-600 rounded p-2 text-sm focus:outline-none focus:border-blue-500">
                    <option value="all">👥 Todos los Meseros (${activeVisits.length} mesas)</option>
                    ${waiters.map(w => {
    const waiterTables = activeVisits.filter(v => v.waiterId === w.id).length;
    return `<option value="${w.id}">${w.name} (${waiterTables} mesas)</option>`;
  }).join('')}
                  </select>
                </div>
                `;
  container.appendChild(filterDiv);

  if (activeVisits.length === 0) {
    container.innerHTML += '<div class="text-center text-gray-500 py-20 flex flex-col items-center gap-4"><span class="text-6xl grayscale opacity-50">🍽️</span><p>No hay mesas activas</p></div>';
    return;
  }

  const gridDiv = document.createElement('div');
  gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";

  gridDiv.innerHTML = activeVisits.map(v => {
    // Is Prospect? Check if visitId is in prospects list OR customer is new
    const isProspect = prospects.find(p => p.customerId === v.customerId); // Logic: prospect record exists
    const customer = v.customer; // Customer is already included in the visit object
    const waiter = window.db.data.users.find(u => u.id === v.waiterId);

    // Time logic mimicking Hostess
    const timeToFormat = v.startTime || v.entryTime || v.date;
    const startTimeDate = new Date(timeToFormat);
    const diffMins = Math.floor((new Date() - startTimeDate) / 60000);
    const timeElapsed = isNaN(diffMins) ? '' : (diffMins > 60 ? `${Math.floor(diffMins / 60)}h ${diffMins % 60}m` : `${diffMins}m`);
    const timeSeated = timeToFormat ? startTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'NA';

    // Customer name format
    const custName = customer ? (customer.firstName + ' ' + (customer.lastName || '')).trim() : (v.customerName || 'Cliente');

    // DEBUG: Log visit data to see what fields are available
    console.log('Visit data for table', v.table, ':', {
      reason: v.reason,
      selectedGame: v.selectedGame,
      isFavoriteTeamMatch: v.isFavoriteTeamMatch
    });

    // Prepare visit reason display
    let reasonDisplay = '';
    if (v.reason) {
      if (v.reason === 'Partido' || v.selectedGame) { // Trust selectedGame even if reason isn't explicitly 'Partido' yet
        let sportIcon = '📺';
        // Try to find more info, but don't block display if not found
        if (v.selectedGame) {
          const game = window.db.getMatches().find(m => (m.match || (m.homeTeam + ' vs ' + m.awayTeam)) === v.selectedGame);
          if (game && game.league) sportIcon = window.getSportIcon(game.league);
        }

        reasonDisplay = `
                <div class="mt-2">
                  <div id="mgr-reason-${v.id}" class="text-[11px] text-yellow-400 font-bold truncate">
                    📌 Partido: ${v.selectedGame || 'Sin asignar'}
                  </div>
                </div>
                `;
      } else {
        const emoji = v.reason === 'Cumpleaños' ? '🎂' : (v.reason === 'Negocios' ? '💼' : '🍽️');
        reasonDisplay = `
                <div class="mt-3 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div class="text-sm font-bold text-white">${emoji} ${v.reason.toUpperCase()}</div>
                </div>
                `;
      }
    }

    return `
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border-l-4 ${isProspect ? 'border-purple-500' : 'border-green-500'} relative group" data-waiter-id="${v.waiterId}">
                  <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Mesa</span><span class="text-3xl font-black text-white shadow-text leading-none">${v.table}</span>
                          ${isProspect ? '<span class="text-lg animate-pulse" title="Cliente Prospecto">⭐</span>' : ''}
                        </div>
                        <div class="text-xs text-gray-400 font-mono mt-1">
                            🕒 ${timeSeated}
                            ${timeElapsed ? `<span class="ml-2 text-yellow-500 font-bold">⏱️ ${timeElapsed}</span>` : ''}
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 border border-gray-600 mb-1 inline-block">
                           👤 ${(waiter?.name || 'S/A').split(' ')[0]}
                        </div>
                        <div class="text-xl font-bold text-white">${v.pax || 0} <span class="text-sm font-normal text-gray-500">pax</span></div>
                        <div id="mgr-fav-logo-${v.id}"></div>
                      </div>
                    </div>
                    
                    <!-- Customer Details -->
                    <div class="border-t border-gray-700 pt-3 mt-2">
                       <div class="font-bold text-white text-lg truncate flex items-center gap-2">
                         ${v.isFavoriteTeamMatch && v.watchedTeam ? (() => {
        const fl = window.getTeamLogo(v.watchedTeam);
        return fl ? `<img src="${fl}" style="width:30px;height:30px;max-width:30px;max-height:30px;" class="object-contain rounded border border-yellow-500 bg-black flex-shrink-0" title="${v.watchedTeam}">` : '<span class="text-base flex-shrink-0">⭐</span>';
      })() : ''}
                         <span class="truncate">${custName}</span>
                         <button onclick="event.stopPropagation(); navigateTo('enrich-customer', {customerId: '${v.customerId}', visitId: '${v.id}'})" class="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-0.5 flex-shrink-0 rounded text-[10px] font-bold flex items-center gap-1 transition border border-gray-600" title="Editar información del cliente">📝 INFO</button>
                       </div>
                    ${v.vip ? `<div class="inline-block bg-yellow-600/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded border border-yellow-600/50 mt-1 font-bold tracking-wider">VIP ${v.vip.toUpperCase()}</div>` : ''}

                    <!-- VISIT DETAILS -->
                    <div id="mgr-reason-${v.id}">${reasonDisplay}</div>

                    <!-- ACTION BUTTONS -->
                    <div class="mt-4">
                       <button onclick="document.getElementById('mgr-edit-visit-${v.id}').classList.toggle('hidden')" class="w-full text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 py-2 rounded mb-2 border border-gray-700 transition">
                         ⚡ GESTIONAR
                       </button>

                       <!-- Hidden Manager Editor -->
                       <div id="mgr-edit-visit-${v.id}" class="hidden mb-2 space-y-2 bg-black/20 p-2 rounded border border-gray-800">
                          <!-- Cambio Mesa -->
                          <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                              <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesa</div>
                              <div class="flex gap-2">
                                 <input type="number" id="new-table-${v.id}" placeholder="#" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-center font-bold text-lg" min="1">
                                 <button onclick="doChangeTable('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                              </div>
                          </div>
                          <!-- Cambio Mesero -->
                           <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                              <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesero</div>
                              <div class="flex gap-2">
                                 <select id="new-waiter-${v.id}" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-sm font-bold truncate">
                                    ${window.db.data.users.filter(u => u.role === 'waiter' && (!u.branchId || u.branchId === STATE.branch.id)).map(w => `<option value="${w.id}" ${w.id === v.waiterId ? 'selected' : ''}>${w.name}</option>`).join('')}
                                 </select>
                                 <button onclick="doChangeWaiter('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                              </div>
                          </div>
                       </div>

                       <button onclick="window.confirmAndRelease('${v.id}')"
                          class="w-full bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-700/50 font-bold py-3 rounded-lg mb-2 uppercase tracking-widest transition-all shadow-md text-xs">
                          🆓 FINALIZAR VISITA / LIBERAR MESA
                       </button>

                      <button onclick="navigateTo('waiter-detail', {visitId: '${v.id}'})"
                        class="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1">
                        <span class="text-2xl">🍽️</span>
                        <span>VER MESA / COMANDAR</span>
                      </button>
                    </div>
                  </div>
                </div>
                `;
  }).join('');

  container.appendChild(gridDiv);
}

// Filter tables by waiter
window.filterManagerTables = function (waiterId) {
  const allCards = document.querySelectorAll('[data-waiter-id]');

  allCards.forEach(card => {
    if (waiterId === 'all') {
      card.style.display = '';
    } else {
      if (card.getAttribute('data-waiter-id') === waiterId) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    }
  });
};

// --- LOGO DATABASE ---
window.TEAM_LOGOS = {
  // LIGA MX (CLAUSURA 2026) — IDs verificados en espn.com/soccer/teams
  "América": "https://a.espncdn.com/i/teamlogos/soccer/500/227.png",
  "Club América": "https://a.espncdn.com/i/teamlogos/soccer/500/227.png",
  "America": "https://a.espncdn.com/i/teamlogos/soccer/500/227.png",
  "Chivas": "https://a.espncdn.com/i/teamlogos/soccer/500/219.png",
  "Chivas Guadalajara": "https://a.espncdn.com/i/teamlogos/soccer/500/219.png",
  "Guadalajara": "https://a.espncdn.com/i/teamlogos/soccer/500/219.png",
  "Cruz Azul": "https://a.espncdn.com/i/teamlogos/soccer/500/218.png",
  "Pumas": "https://a.espncdn.com/i/teamlogos/soccer/500/233.png",
  "Pumas UNAM": "https://a.espncdn.com/i/teamlogos/soccer/500/233.png",
  "UNAM": "https://a.espncdn.com/i/teamlogos/soccer/500/233.png",
  "Tigres": "https://a.espncdn.com/i/teamlogos/soccer/500/232.png",
  "Tigres UANL": "https://a.espncdn.com/i/teamlogos/soccer/500/232.png",
  "Monterrey": "https://a.espncdn.com/i/teamlogos/soccer/500/220.png",
  "Rayados": "https://a.espncdn.com/i/teamlogos/soccer/500/220.png",
  "Rayados Monterrey": "https://a.espncdn.com/i/teamlogos/soccer/500/220.png",
  "Toluca": "https://a.espncdn.com/i/teamlogos/soccer/500/223.png",
  "Santos Laguna": "https://a.espncdn.com/i/teamlogos/soccer/500/225.png",
  "Santos": "https://a.espncdn.com/i/teamlogos/soccer/500/225.png",
  "Pachuca": "https://a.espncdn.com/i/teamlogos/soccer/500/234.png",
  "León": "https://a.espncdn.com/i/teamlogos/soccer/500/228.png",
  "Leon": "https://a.espncdn.com/i/teamlogos/soccer/500/228.png",
  "Atlas": "https://a.espncdn.com/i/teamlogos/soccer/500/216.png",
  "Querétaro": "https://a.espncdn.com/i/teamlogos/soccer/500/222.png",
  "Queretaro": "https://a.espncdn.com/i/teamlogos/soccer/500/222.png",
  "Gallos": "https://a.espncdn.com/i/teamlogos/soccer/500/222.png",
  "Gallos Blancos": "https://a.espncdn.com/i/teamlogos/soccer/500/222.png",
  "Puebla": "https://a.espncdn.com/i/teamlogos/soccer/500/231.png",
  "Atlético San Luis": "https://a.espncdn.com/i/teamlogos/soccer/500/15720.png",
  "San Luis": "https://a.espncdn.com/i/teamlogos/soccer/500/15720.png",
  "Mazatlán FC": "https://a.espncdn.com/i/teamlogos/soccer/500/20702.png",
  "Mazatlan": "https://a.espncdn.com/i/teamlogos/soccer/500/20702.png",
  "Mazatlán": "https://a.espncdn.com/i/teamlogos/soccer/500/20702.png",
  "Necaxa": "https://a.espncdn.com/i/teamlogos/soccer/500/229.png",
  "Xolos Tijuana": "https://a.espncdn.com/i/teamlogos/soccer/500/10125.png",
  "Xolos": "https://a.espncdn.com/i/teamlogos/soccer/500/10125.png",
  "Tijuana": "https://a.espncdn.com/i/teamlogos/soccer/500/10125.png",
  "Juárez FC": "https://a.espncdn.com/i/teamlogos/soccer/500/17851.png",
  "Juárez Bravos": "https://a.espncdn.com/i/teamlogos/soccer/500/17851.png",
  "Juarez": "https://a.espncdn.com/i/teamlogos/soccer/500/17851.png",
  "Bravos": "https://a.espncdn.com/i/teamlogos/soccer/500/17851.png",

  // LOCALES QUERÉTARO (LMB/LFA)
  "Conspiradores": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Conspiradores_de_Quer%C3%A9taro_logo.svg/1200px-Conspiradores_de_Quer%C3%A9taro_logo.svg.png",
  "Gallos Negros": "https://upload.wikimedia.org/wikipedia/commons/e/e6/LFA_Gallos_Negros_Logo_2022.png",

  // ESPAÑA
  "Real Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  "FC Barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  "Barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  "Atlético Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "Atleti": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",

  // INGLATERRA
  "Manchester City": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "Man City": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "Liverpool": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
  "Arsenal": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
  "Manchester United": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
  "Man Utd": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",

  // NFL
  "Kansas City Chiefs": "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
  "San Francisco 49ers": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
  "SF 49ers": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
  "Dallas Cowboys": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  "Cowboys": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  "Pittsburgh Steelers": "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
  "Steelers": "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
  "New England Patriots": "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
  "Patriots": "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",

  // NBA
  "Atlanta Hawks": "https://a.espncdn.com/i/teamlogos/nba/500/atl.png",
  "Boston Celtics": "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
  "Brooklyn Nets": "https://a.espncdn.com/i/teamlogos/nba/500/bkn.png",
  "Charlotte Hornets": "https://a.espncdn.com/i/teamlogos/nba/500/cha.png",
  "Chicago Bulls": "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
  "Cleveland Cavaliers": "https://a.espncdn.com/i/teamlogos/nba/500/cle.png",
  "Dallas Mavericks": "https://a.espncdn.com/i/teamlogos/nba/500/dal.png",
  "Denver Nuggets": "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
  "Detroit Pistons": "https://a.espncdn.com/i/teamlogos/nba/500/det.png",
  "Golden State Warriors": "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
  "Houston Rockets": "https://a.espncdn.com/i/teamlogos/nba/500/hou.png",
  "Indiana Pacers": "https://a.espncdn.com/i/teamlogos/nba/500/ind.png",
  "Los Angeles Clippers": "https://a.espncdn.com/i/teamlogos/nba/500/lac.png",
  "Los Angeles Lakers": "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
  "Memphis Grizzlies": "https://a.espncdn.com/i/teamlogos/nba/500/mem.png",
  "Miami Heat": "https://a.espncdn.com/i/teamlogos/nba/500/mia.png",
  "Milwaukee Bucks": "https://a.espncdn.com/i/teamlogos/nba/500/mil.png",
  "Minnesota Timberwolves": "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
  "New Orleans Pelicans": "https://a.espncdn.com/i/teamlogos/nba/500/no.png",
  "New York Knicks": "https://a.espncdn.com/i/teamlogos/nba/500/ny.png",
  "Oklahoma City Thunder": "https://a.espncdn.com/i/teamlogos/nba/500/okc.png",
  "Orlando Magic": "https://a.espncdn.com/i/teamlogos/nba/500/orl.png",
  "Philadelphia 76ers": "https://a.espncdn.com/i/teamlogos/nba/500/phi.png",
  "Phoenix Suns": "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
  "Portland Trail Blazers": "https://a.espncdn.com/i/teamlogos/nba/500/por.png",
  "Sacramento Kings": "https://a.espncdn.com/i/teamlogos/nba/500/sac.png",
  "San Antonio Spurs": "https://a.espncdn.com/i/teamlogos/nba/500/sa.png",
  "Toronto Raptors": "https://a.espncdn.com/i/teamlogos/nba/500/tor.png",
  "Utah Jazz": "https://a.espncdn.com/i/teamlogos/nba/500/uta.png",
  "Washington Wizards": "https://a.espncdn.com/i/teamlogos/nba/500/wsh.png",

  // MLB
  "Arizona Diamondbacks": "https://a.espncdn.com/i/teamlogos/mlb/500/ari.png",
  "Atlanta Braves": "https://a.espncdn.com/i/teamlogos/mlb/500/atl.png",
  "Baltimore Orioles": "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png",
  "Boston Red Sox": "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
  "Chicago Cubs": "https://a.espncdn.com/i/teamlogos/mlb/500/chc.png",
  "Chicago White Sox": "https://a.espncdn.com/i/teamlogos/mlb/500/chw.png",
  "Cincinnati Reds": "https://a.espncdn.com/i/teamlogos/mlb/500/cin.png",
  "Cleveland Guardians": "https://a.espncdn.com/i/teamlogos/mlb/500/cle.png",
  "Colorado Rockies": "https://a.espncdn.com/i/teamlogos/mlb/500/col.png",
  "Detroit Tigers": "https://a.espncdn.com/i/teamlogos/mlb/500/det.png",
  "Houston Astros": "https://a.espncdn.com/i/teamlogos/mlb/500/hou.png",
  "Kansas City Royals": "https://a.espncdn.com/i/teamlogos/mlb/500/kc.png",
  "Los Angeles Angels": "https://a.espncdn.com/i/teamlogos/mlb/500/laa.png",
  "Los Angeles Dodgers": "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
  "Miami Marlins": "https://a.espncdn.com/i/teamlogos/mlb/500/mia.png",
  "Milwaukee Brewers": "https://a.espncdn.com/i/teamlogos/mlb/500/mil.png",
  "Minnesota Twins": "https://a.espncdn.com/i/teamlogos/mlb/500/min.png",
  "New York Mets": "https://a.espncdn.com/i/teamlogos/mlb/500/nym.png",
  "New York Yankees": "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
  "Oakland Athletics": "https://a.espncdn.com/i/teamlogos/mlb/500/oak.png",
  "Philadelphia Phillies": "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png",
  "Pittsburgh Pirates": "https://a.espncdn.com/i/teamlogos/mlb/500/pit.png",
  "San Diego Padres": "https://a.espncdn.com/i/teamlogos/mlb/500/sd.png",
  "San Francisco Giants": "https://a.espncdn.com/i/teamlogos/mlb/500/sf.png",
  "Seattle Mariners": "https://a.espncdn.com/i/teamlogos/mlb/500/sea.png",
  "St. Louis Cardinals": "https://a.espncdn.com/i/teamlogos/mlb/500/stl.png",
  "Tampa Bay Rays": "https://a.espncdn.com/i/teamlogos/mlb/500/tb.png",
  "Texas Rangers": "https://a.espncdn.com/i/teamlogos/mlb/500/tex.png",
  "Toronto Blue Jays": "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png",
  "Washington Nationals": "https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png"
};

window.getTeamLogo = function (teamName) {
  if (!teamName) return null;
  const lower = teamName.toLowerCase().trim();

  // 1. Direct or Case Insensitive Match
  const foundKey = Object.keys(window.TEAM_LOGOS).find(k => k.toLowerCase() === lower);
  if (foundKey) return window.TEAM_LOGOS[foundKey];

  // 2. Partial Match Strategy (Manual Overrides for common aliases)
  if (lower.includes('america')) return window.TEAM_LOGOS["América"];
  if (lower.includes('guadalajara') || lower.includes('chivas')) return window.TEAM_LOGOS["Chivas"];
  if (lower.includes('cruz azul') || lower === 'cruzazul') return window.TEAM_LOGOS["Cruz Azul"];
  if (lower.includes('pumas') || lower === 'unam') return window.TEAM_LOGOS["Pumas"];
  if (lower.includes('tigres')) return window.TEAM_LOGOS["Tigres"];
  if (lower.includes('monterrey') || lower.includes('rayados')) return window.TEAM_LOGOS["Monterrey"];
  if (lower.includes('santos')) return window.TEAM_LOGOS["Santos Laguna"];
  if (lower.includes('le\u00f3n') || lower === 'leon') return window.TEAM_LOGOS["León"];
  if (lower.includes('pachuca')) return window.TEAM_LOGOS["Pachuca"];
  if (lower.includes('toluca')) return window.TEAM_LOGOS["Toluca"];
  if (lower.includes('atlas')) return window.TEAM_LOGOS["Atlas"];
  if (lower.includes('quer\u00e9taro') || lower.includes('queretaro') || lower.includes('gallos')) return window.TEAM_LOGOS["Querétaro"];
  if (lower.includes('necaxa')) return window.TEAM_LOGOS["Necaxa"];
  if (lower.includes('mazatl\u00e1n') || lower.includes('mazatlan')) return window.TEAM_LOGOS["Mazatlán FC"];
  if (lower.includes('tijuana') || lower.includes('xolos')) return window.TEAM_LOGOS["Xolos Tijuana"];
  if (lower.includes('ju\u00e1rez') || lower.includes('juarez') || lower.includes('bravos')) return window.TEAM_LOGOS["Juárez FC"];
  if (lower.includes('san luis') || lower.includes('atl\u00e9tico san luis')) return window.TEAM_LOGOS["Atlético San Luis"];
  if (lower.includes('puebla')) return window.TEAM_LOGOS["Puebla"];

  // NBA ALIASES
  if (lower.includes('hawks')) return window.TEAM_LOGOS["Atlanta Hawks"];
  if (lower.includes('celtics')) return window.TEAM_LOGOS["Boston Celtics"];
  if (lower.includes('nets')) return window.TEAM_LOGOS["Brooklyn Nets"];
  if (lower.includes('hornets')) return window.TEAM_LOGOS["Charlotte Hornets"];
  if (lower.includes('bulls')) return window.TEAM_LOGOS["Chicago Bulls"];
  if (lower.includes('cavaliers') || lower.includes('cavs')) return window.TEAM_LOGOS["Cleveland Cavaliers"];
  if (lower.includes('mavericks') || lower.includes('mavs')) return window.TEAM_LOGOS["Dallas Mavericks"];
  if (lower.includes('nuggets')) return window.TEAM_LOGOS["Denver Nuggets"];
  if (lower.includes('pistons')) return window.TEAM_LOGOS["Detroit Pistons"];
  if (lower.includes('warriors')) return window.TEAM_LOGOS["Golden State Warriors"];
  if (lower.includes('rockets')) return window.TEAM_LOGOS["Houston Rockets"];
  if (lower.includes('pacers')) return window.TEAM_LOGOS["Indiana Pacers"];
  if (lower.includes('clippers')) return window.TEAM_LOGOS["Los Angeles Clippers"];
  if (lower.includes('lakers')) return window.TEAM_LOGOS["Los Angeles Lakers"];
  if (lower.includes('grizzlies')) return window.TEAM_LOGOS["Memphis Grizzlies"];
  if (lower.includes('heat')) return window.TEAM_LOGOS["Miami Heat"];
  if (lower.includes('bucks')) return window.TEAM_LOGOS["Milwaukee Bucks"];
  if (lower.includes('timberwolves') || lower.includes('wolves')) return window.TEAM_LOGOS["Minnesota Timberwolves"];
  if (lower.includes('pelicans')) return window.TEAM_LOGOS["New Orleans Pelicans"];
  if (lower.includes('knicks')) return window.TEAM_LOGOS["New York Knicks"];
  if (lower.includes('thunder')) return window.TEAM_LOGOS["Oklahoma City Thunder"];
  if (lower.includes('magic')) return window.TEAM_LOGOS["Orlando Magic"];
  if (lower.includes('76ers') || lower.includes('sixers')) return window.TEAM_LOGOS["Philadelphia 76ers"];
  if (lower.includes('suns')) return window.TEAM_LOGOS["Phoenix Suns"];
  if (lower.includes('trail blazers') || lower.includes('blazers')) return window.TEAM_LOGOS["Portland Trail Blazers"];
  if (lower.includes('kings')) return window.TEAM_LOGOS["Sacramento Kings"];
  if (lower.includes('spurs')) return window.TEAM_LOGOS["San Antonio Spurs"];
  if (lower.includes('raptors')) return window.TEAM_LOGOS["Toronto Raptors"];
  if (lower.includes('jazz')) return window.TEAM_LOGOS["Utah Jazz"];
  if (lower.includes('wizards')) return window.TEAM_LOGOS["Washington Wizards"];

  // MLB ALIASES
  if (lower.includes('diamondbacks') || lower.includes('d-backs')) return window.TEAM_LOGOS["Arizona Diamondbacks"];
  if (lower.includes('braves')) return window.TEAM_LOGOS["Atlanta Braves"];
  if (lower.includes('orioles')) return window.TEAM_LOGOS["Baltimore Orioles"];
  if (lower.includes('red sox') || lower.includes('redsox') || lower.includes('medias rojas')) return window.TEAM_LOGOS["Boston Red Sox"];
  if (lower.includes('cubs') || lower.includes('cachorros')) return window.TEAM_LOGOS["Chicago Cubs"];
  if (lower.includes('white sox') || lower.includes('whitesox')) return window.TEAM_LOGOS["Chicago White Sox"];
  if (lower.includes('reds')) return window.TEAM_LOGOS["Cincinnati Reds"];
  if (lower.includes('guardians') || lower.includes('indians')) return window.TEAM_LOGOS["Cleveland Guardians"];
  if (lower.includes('rockies')) return window.TEAM_LOGOS["Colorado Rockies"];
  if (lower.includes('tigers')) return window.TEAM_LOGOS["Detroit Tigers"];
  if (lower.includes('astros')) return window.TEAM_LOGOS["Houston Astros"];
  if (lower.includes('royals')) return window.TEAM_LOGOS["Kansas City Royals"];
  if (lower.includes('angels')) return window.TEAM_LOGOS["Los Angeles Angels"];
  if (lower.includes('dodgers')) return window.TEAM_LOGOS["Los Angeles Dodgers"];
  if (lower.includes('marlins')) return window.TEAM_LOGOS["Miami Marlins"];
  if (lower.includes('brewers')) return window.TEAM_LOGOS["Milwaukee Brewers"];
  if (lower.includes('twins')) return window.TEAM_LOGOS["Minnesota Twins"];
  if (lower.includes('mets')) return window.TEAM_LOGOS["New York Mets"];
  if (lower.includes('yankees')) return window.TEAM_LOGOS["New York Yankees"];
  if (lower.includes('athletics') || lower.includes('a\'s')) return window.TEAM_LOGOS["Oakland Athletics"];
  if (lower.includes('phillies')) return window.TEAM_LOGOS["Philadelphia Phillies"];
  if (lower.includes('pirates')) return window.TEAM_LOGOS["Pittsburgh Pirates"];
  if (lower.includes('padres')) return window.TEAM_LOGOS["San Diego Padres"];
  if (lower.includes('giants') && !lower.includes('new york') && !lower.includes('ny')) return window.TEAM_LOGOS["San Francisco Giants"];
  if (lower.includes('mariners')) return window.TEAM_LOGOS["Seattle Mariners"];
  if (lower.includes('cardinals') || lower.includes('cardenales')) return window.TEAM_LOGOS["St. Louis Cardinals"];
  if (lower.includes('rays')) return window.TEAM_LOGOS["Tampa Bay Rays"];
  if (lower.includes('rangers')) return window.TEAM_LOGOS["Texas Rangers"];
  if (lower.includes('blue jays') || lower.includes('bluejays') || lower.includes('azulejos')) return window.TEAM_LOGOS["Toronto Blue Jays"];
  if (lower.includes('nationals') || lower.includes('nacionales')) return window.TEAM_LOGOS["Washington Nationals"];

  return null;
};


// --- MANAGER TABS IMPLEMENTATION ---



function renderManagerTeamTab(container) {
  const div = document.createElement('div');
  div.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in';
  div.innerHTML = `
    <!-- Dinámicas -->
    <div onclick="alert('Abriendo Módulo de Dinámicas...')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500 cursor-pointer transition group">
      <div class="text-4xl mb-4 group-hover:scale-110 transition">🎯</div>
      <h2 class="text-xl font-bold text-white mb-2">Dinámicas y Concursos</h2>
      <p class="text-gray-400 text-sm">Gestionar concursos y dinámicas de ventas del equipo</p>
    </div>

    <!-- Equipo -->
    <div onclick="alert('Abriendo Gestión de Equipo...')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition group">
      <div class="text-4xl mb-4 group-hover:scale-110 transition">👥</div>
      <h2 class="text-xl font-bold text-white mb-2">Productividad</h2>
      <p class="text-gray-400 text-sm">Métricas de desempeño, horarios y reportes del equipo</p>
    </div>
  `;
  // If the old renderDailyControlView exists we could use it, but for now we put placeholders
  // as the original code triggered "Módulo de Dinámicas - Próximamente" in app.js line 5655.

  container.innerHTML = '';
  container.appendChild(div);
}


function renderManagerGamesTab(container) {
  const games = window.db.getMatches();
  // CRITICAL: Use Local Date to match Ingestor
  const today = new Date().toLocaleDateString('en-CA');

  console.log(`Render Games Tab. Today (Local): ${today}. Total Games in DB: ${games.length}`);

  // Sort games chronologically
  games.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  // Filter games
  const todaysGames = games.filter(g => g.date === today);
  const futureGames = games.filter(g => g.date > today);

  // DEBUG: If no games found, show alert in console
  if (games.length > 0 && todaysGames.length === 0) {
    console.warn("⚠️ Games exist but none match today's date:", today);
    console.log("Sample Game Date:", games[0].date);
    console.log("All Game Dates:", games.map(g => `${g.league}: ${g.date}`));
  }

  console.log(`📊 Today's Games: ${todaysGames.length}, Future: ${futureGames.length}`);

  // CRITICAL FIX: Clear duplicate content before rendering
  container.innerHTML = '';

  const div = document.createElement('div');
  div.innerHTML = `
                <!-- MAIN CONTAINER -->
                <div class="space-y-6 mb-24">

                  <!-- QUICK ACTIONS BAR -->
                  <div class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-xl border border-blue-500/30 flex justify-between items-center">
                    <div>
                      <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        ⚡ Gestión Rápida
                      </h3>
                      <p class="text-[10px] text-blue-300">Programación manual de eventos deportivos</p>
                    </div>
                    <div class="flex gap-2">
                      <button onclick="if(confirm('¿Eliminar TODOS los partidos de hoy?')) { 
                    window.db.clearTodayGames(); 
                    renderManagerDashboard('games'); 
                    window.showToast('🗑️ Partidos eliminados', 'info');
                }" class="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 transition">
                        🗑️ Limpiar Hoy
                      </button>
                    </div>
                  </div>

                  <!-- 1. SOLICITUDES HOSTESS -->
                  <div id="manager-requests-container"></div>

                  <!-- 2. PROGRAMAR EVENTOS (INDEPENDIENTE) -->
                  <div class="card bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50 shadow-2xl">
                    <div class="flex justify-between items-center mb-4">
                      <div>
                        <h2 class="text-xl font-black text-white flex items-center gap-2">
                          ➕ PROGRAMAR EVENTOS
                        </h2>
                        <p class="text-xs text-purple-300">Agrega partidos para cualquier fecha (hoy, mañana, futuro)</p>
                      </div>
                      <button onclick="const form = document.getElementById('inline-add-game-form'); form.classList.toggle('hidden'); if(!form.classList.contains('hidden')) { form.scrollIntoView({behavior: 'smooth', block: 'center'}); window.updateGameFormFields(); }"
                        class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 transition">
                        <span>+</span> NUEVO EVENTO
                      </button>
                    </div>

                    <!-- INLINE ADD GAME FORM (Desplegable) -->
                    <div id="inline-add-game-form" class="hidden bg-gray-800/80 p-4 rounded-xl border border-purple-500/30 mb-6 shadow-inner animate-fade-in-down">
                      <h3 class="text-sm font-bold text-purple-300 uppercase mb-3 border-b border-purple-500/20 pb-1">Programación Manual</h3>

                      <!-- FECHA PRIMERO - MUY VISIBLE -->
                      <div class="bg-blue-900/30 border-2 border-blue-500 rounded-lg p-3 mb-4">
                        <label class="text-xs uppercase font-black text-blue-300 block mb-2">📅 FECHA DEL EVENTO</label>
                        <input type="date" id="new-date" class="w-full bg-black text-white rounded-lg p-3 text-base font-bold border-2 border-blue-400 focus:border-blue-300" value="${today}">
                      </div>

                      <!-- Resto de campos -->
                      <div class="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label class="text-[10px] uppercase font-bold text-gray-400">Liga / Deporte</label>
                          <select id="new-league" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600" onchange="window.updateGameFormFields()">
                            <option value="LIGA MX">🇲🇽 LIGA MX</option>
                            <option value="LIGA INGLESA">🇬🇧 PREMIER</option>
                            <option value="LIGA ESPAÑOLA">🇪🇸 LA LIGA</option>
                            <option value="CHAMPIONS">⭐ CHAMPIONS</option>
                            <option value="NFL">🏈 NFL</option>
                            <option value="NBA">🏀 NBA</option>
                            <option value="MLB">⚾ MLB</option>
                            <option value="UFC">🥊 UFC</option>
                            <option value="F1">🏎️ F1</option>
                            <option value="Tenis">🎾 TENIS</option>
                            <option value="Boxeo">🥊 BOXEO</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-[10px] uppercase font-bold text-gray-400">Hora</label>
                          <input type="time" id="new-time" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600" value="19:00">
                        </div>
                      </div>
                      <div id="game-form-teams" class="mb-4">
                        <!-- Filled dynamically by updateGameFormFields() -->
                        <div class="grid grid-cols-2 gap-3">
                          <input list="team-suggestions" id="new-home" placeholder="Equipo Local" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600 focus:border-blue-500">
                          <input list="team-suggestions" id="new-away" placeholder="Equipo Visitante" class="w-full bg-black text-white rounded p-2 text-sm border border-gray-600 focus:border-blue-500">
                        </div>
                      </div>

                      <div class="flex justify-end gap-2">
                        <button onclick="document.getElementById('inline-add-game-form').classList.add('hidden')" class="px-3 py-2 text-gray-400 hover:text-white text-xs font-bold">CANCELAR</button>
                        <button onclick="window.addGameFromManager()" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition">
                          💾 GUARDAR
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 3. PARTIDOS DE HOY (LIVE CONTROL) -->
                  <div class="card bg-gray-900 border-2 border-blue-600 shadow-2xl relative">
                    <div class="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                      <div>
                        <h2 class="text-xl font-black text-white flex items-center gap-2">
                          <span class="text-red-500 animate-pulse">●</span> EN VIVO / HOY <span class="text-[10px] text-gray-500 ml-2">(${today})</span>
                        </h2>
                      </div>
                    </div>

                    <!-- Datalist Injection -->
                    <datalist id="team-suggestions">
                      ${window.KNOWN_TEAMS.map(t => `<option value="${t}">`).join('')}
                    </datalist>

                    ${todaysGames.length === 0
      ? '<div class="text-center py-8 opacity-50"><p class="text-sm">Sin partidos.</p></div>'
      : `<div class="grid grid-cols-1 gap-4">
                    ${todaysGames.map(g => renderGameControlCard(g)).join('')}
                   </div>`
    }
                  </div>

                  <!-- 3. PRÓXIMOS EVENTOS (Agrupados por Mes) -->
                  <div class="card bg-gray-800/50 border border-gray-700">
                    <h3 class="text-lg font-bold text-gray-400 mb-4 uppercase tracking-wider">📅 Próximos Eventos</h3>
                    ${futureGames.length === 0
      ? '<p class="text-gray-500 text-sm">No hay partidos a futuro.</p>'
      : (() => {
        // 1. GROUP BY MONTH
        const groupedByMonth = {};
        futureGames.forEach(g => {
          const dateObj = new Date(g.date + 'T12:00:00');
          const monthKey = dateObj.toLocaleString('es-MX', { month: 'long', year: 'numeric' }).toUpperCase();
          if (!groupedByMonth[monthKey]) groupedByMonth[monthKey] = [];
          groupedByMonth[monthKey].push(g);
        });

        return Object.keys(groupedByMonth).map(month => {
          const gamesInMonth = groupedByMonth[month];

          // 2. GROUP BY LEAGUE (Nested)
          const groupedByLeague = {};
          gamesInMonth.forEach(g => {
            const leagueKey = g.league || 'OTROS';
            if (!groupedByLeague[leagueKey]) groupedByLeague[leagueKey] = [];
            groupedByLeague[leagueKey].push(g);
          });

          // Render Leagues
          const leaguesHtml = Object.keys(groupedByLeague).sort().map(league => `
                <div class="mb-4 pl-2">
                    <div class="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2 flex items-center gap-1 bg-blue-900/20 w-fit px-2 py-1 rounded">
                       ${window.getSportIcon ? window.getSportIcon(league) : '🏆'} ${league}
                    </div>
                    <div class="space-y-2">
                        ${groupedByLeague[league].map(g => `
                            <div class="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-gray-700/50 hover:border-gray-500 transition">
                                <div class="flex items-center gap-3">
                                    <!-- FECHA (Día) -->
                                    <div class="flex flex-col items-center bg-gray-800 p-1.5 rounded border border-gray-700 min-w-[45px]">
                                        <span class="text-[10px] text-red-400 font-bold uppercase">${new Date(g.date + 'T12:00:00').toLocaleString('es-MX', { weekday: 'short' }).replace('.', '')}</span>
                                        <span class="text-xl font-black text-white leading-none">${g.date.split('-')[2]}</span>
                                    </div>
                                    <!-- INFO -->
                                    <div>
                                        <div class="text-[10px] font-bold text-gray-500 flex items-center gap-1 mb-0.5">
                                            ⏰ ${g.time}
                                        </div>
                                        <div class="text-sm font-bold text-white leading-tight flex items-center gap-1">
                                            ${window.getTeamLogo(g.homeTeam) ? `<img src="${window.getTeamLogo(g.homeTeam)}" class="inline-block object-contain" style="width: 20px; height: 20px; max-width: 20px; max-height: 20px;">` : ''}
                                            <span>${g.match || (["UFC", "F1", "Tenis", "Boxeo"].includes(g.league) ? (g.homeTeam || g.sport || g.league) : `${g.homeTeam} vs ${g.awayTeam}`)}</span>
                                            ${window.getTeamLogo(g.awayTeam) ? `<img src="${window.getTeamLogo(g.awayTeam)}" class="inline-block object-contain" style="width: 20px; height: 20px; max-width: 20px; max-height: 20px;">` : ''}
                                        </div>
                                    </div>
                                </div>
                                <button onclick="try { if(confirm('¿Borrar evento futuro?')) { window.db.removeGame('${g.id}'); renderManagerDashboard('games'); } } catch(e) { alert('Error: ' + e.message); console.error(e); }" 
                                        class="text-gray-600 hover:text-red-500 hover:bg-red-900/10 p-2 rounded transition">
                                    🗑️
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

          return `
              <div class="mb-8 last:mb-0">
                  <h4 class="text-yellow-500 font-black text-base uppercase tracking-widest border-b border-gray-700 pb-2 mb-4">
                      ${month}
                  </h4>
                  ${leaguesHtml}
              </div>
            `;
        }).join('');
      })()
    }
                  </div>

                </div>
                `;

  container.appendChild(div);

  // Render Requests if any
  const reqContainer = div.querySelector('#manager-requests-container');
  if (reqContainer) renderManagerGameRequests(reqContainer);
}

// Helper to render individual game card with controls
function renderGameControlCard(game) {
  const isSalonAudio = game.audio?.salon || false;
  const isTerrazaAudio = game.audio?.terraza || false;

  // Logos
  const logoHome = window.getTeamLogo(game.homeTeam);
  const logoAway = window.getTeamLogo(game.awayTeam);

  // Logo HTML or fallback to generic sport icon if neither has logo
  const sportIcon = window.getSportIcon(game.league);

  return `
                   <div class="bg-black/80 px-2 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 flex flex-col gap-1 transition-colors relative overflow-hidden">
                     <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50"></div>
                     <div class="flex flex-col w-full pl-2">
                         <!-- ROW 1: LEAGUE & TIME -->
                         <div class="flex justify-between items-center mb-1">
                             <div class="flex items-center gap-2">
                               <div class="text-[10px] text-blue-400 font-bold uppercase tracking-widest bg-blue-900/20 px-2 py-0.5 rounded">
                                   ${game.league || game.sport}
                               </div>
                               <button onclick="document.getElementById('edit-game-${game.id}').classList.toggle('hidden')" class="bg-gray-700 hover:bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow transition flex items-center gap-1">✏️ Editar</button>
                               <button onclick="try { if(confirm('¿Borrar este partido?')) { window.db.removeGame('${game.id}'); renderManagerDashboard('games'); } } catch(e) { alert('Error: ' + e.message); console.error(e); }" class="text-red-500 hover:text-red-400 p-0.5 ml-1" title="Borrar Partido">🗑️</button>
                             </div>
                             <div class="text-[10px] font-black text-white bg-gray-800 px-2 py-0.5 rounded border border-gray-600">
                                 ⏰ <span id="display-time-${game.id}">${game.time}</span>
                             </div>
                         </div>
                         
                         <!-- ROW 2: LOGOS -->
                         <div class="flex justify-center items-center gap-4 py-0.5">
                            ${(() => {
      if (logoHome || logoAway) {
        return `
                                    <div class="flex flex-col items-center justify-center w-10 h-10 bg-black/50 rounded-full border border-gray-800 shadow-inner">
                                        ${logoHome ? `<img src="${logoHome}" class="w-7 h-7 object-contain" style="max-width: 28px; max-height: 28px;">` : `<span class="text-lg">🏠</span>`}
                                    </div>
                                    <div class="text-[10px] font-bold text-gray-500 pt-1">vs</div>
                                    <div class="flex flex-col items-center justify-center w-10 h-10 bg-black/50 rounded-full border border-gray-800 shadow-inner">
                                        ${logoAway ? `<img src="${logoAway}" class="w-7 h-7 object-contain" style="max-width: 28px; max-height: 28px;">` : `<span class="text-lg">✈️</span>`}
                                    </div>
                                `;
      } else {
        return `<div class="text-3xl filter drop-shadow opacity-80">${sportIcon}</div>`;
      }
    })()}
                         </div>
                         
                         <!-- ROW 3: NAMES -->
                         <div class="text-center mt-0.5">
                            ${(() => {
      const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
      const isIndividual = individualSports.includes(game.league) || individualSports.includes(game.sport);

      if (isIndividual || !game.awayTeam) {
        return `<div class="text-[13px] font-black text-white leading-tight">${game.match || game.homeTeam}</div>`;
      }
      return `<div class="text-[13px] font-black text-white leading-tight">${game.homeTeam} <span class="text-[9px] text-gray-500 font-normal mx-0.5">vs</span> ${game.awayTeam}</div>`;
    })()}
                         </div>
                     </div>
                     
                     <!-- INFO EXTENDIDA (TVs y Audio) -->
                     <div class="flex gap-2 text-[10px] font-bold mt-1 border-t border-white/5 pt-2">
                        ${game.tvs ? `<div class="bg-gray-800 text-yellow-500 px-2 py-1 rounded flex items-center gap-1 flex-1">📺 TVs: ${game.tvs}</div>` : ''}
                        
                        ${isSalonAudio ? `<div class="bg-green-900/50 text-green-400 px-2 py-1 rounded flex items-center gap-1 border border-green-700/50">🔊 SALÓN</div>` : ''}
                        ${isTerrazaAudio ? `<div class="bg-green-900/50 text-green-400 px-2 py-1 rounded flex items-center gap-1 border border-green-700/50">🔊 TERRAZA</div>` : ''}
                     </div>

                     <!-- HIDDEN EDIT SECTION -->
                     <div id="edit-game-${game.id}" class="hidden mt-2 border-t border-gray-700 pt-3 p-1">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 bg-black/40 p-3 rounded-lg border border-gray-800">
                          <!-- TIME EDIT -->
                          <div>
                            <label class="text-[10px] text-gray-400 font-bold uppercase block mb-1">⏰ Editar Hora</label>
                            <input type="time"
                              value="${game.time}"
                              onchange="window.db.updateGameTime('${game.id}', this.value); document.getElementById('display-time-${game.id}').innerText = this.value;"
                              class="w-full bg-gray-900 text-yellow-400 font-mono text-sm border border-gray-600 rounded px-2 py-1.5 focus:border-yellow-500 outline-none hover:border-gray-500 transition-colors">
                          </div>
                          <!-- TV ASSIGNMENT -->
                          <div>
                            <label class="text-[10px] text-gray-400 font-bold uppercase block mb-1">📺 Asignar Pantallas</label>
                            <input type="text"
                              value="${game.tvs || ''}"
                              placeholder="Ej: 1, 3, Bar"
                              onchange="window.db.updateGameTVs('${game.id}', this.value); renderManagerDashboard('games');"
                              class="w-full bg-gray-900 text-yellow-400 font-mono text-sm border border-gray-600 rounded px-2 py-1.5 focus:border-yellow-500 outline-none placeholder-gray-700 hover:border-gray-500 transition-colors">
                          </div>

                          <!-- AUDIO CONTROL -->
                          <div class="col-span-1 md:col-span-2">
                            <label class="text-[10px] text-gray-400 font-bold uppercase block mb-1">🔈 Audio (Zona)</label>
                            <div class="flex gap-2">
                              <button onclick="window.db.setGameAudio('${game.id}', 'salon', ${!isSalonAudio}); renderManagerDashboard('games');"
                                class="flex-1 px-2 py-2 rounded text-xs font-bold transition flex items-center justify-center gap-1 ${isSalonAudio ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'} border ${isSalonAudio ? 'border-green-500' : 'border-gray-600'}">
                                ${isSalonAudio ? '🔊' : '🔈'} SALÓN
                              </button>
                              <button onclick="window.db.setGameAudio('${game.id}', 'terraza', ${!isTerrazaAudio}); renderManagerDashboard('games');"
                                class="flex-1 px-2 py-2 rounded text-xs font-bold transition flex items-center justify-center gap-1 ${isTerrazaAudio ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'} border ${isTerrazaAudio ? 'border-green-500' : 'border-gray-600'}">
                                ${isTerrazaAudio ? '🔊' : '🔈'} TERRAZA
                              </button>
                            </div>
                          </div>
                          
                        </div>
                     </div>
                   </div>
  `;
}

// Helper to pre-fill form
window.fillGameForm = function (league, homeTeam) {
  document.getElementById('new-league').value = league;
  document.getElementById('new-home').value = homeTeam;
  document.getElementById('new-away').value = '';
  document.getElementById('new-away').focus();

  // Auto set sport icon if needed or special cases
  if (league === 'F1' || league === 'UFC' || league === 'BOX') {
    document.getElementById('new-home').value = homeTeam;
    document.getElementById('new-away').value = 'Evento';
  }
};

window.submitNewGame = function () {
  const date = document.getElementById('new-date').value || new Date().toISOString().split('T')[0];
  const time = document.getElementById('new-time').value;
  const league = document.getElementById('new-league').value;
  const home = document.getElementById('new-home').value;
  const away = document.getElementById('new-away').value;

  if (!home || !away) {
    alert('Por favor ingresa los nombres de los equipos.');
    return;
  }

  // Determine Sport from League map
  let sport = 'General';
  if (league.includes('NFL')) sport = 'Americano';
  else if (league.includes('NBA')) sport = 'Basquet';
  else if (league.includes('MLB')) sport = 'Beisbol';
  else if (league.includes('NHL')) sport = 'Hockey';
  else if (league.includes('LIGA') || league.includes('CHAMPIONS')) sport = 'Futbol';
  else if (league.includes('UFC') || league.includes('BOX')) sport = 'Peleas';
  else if (league.includes('F1')) sport = 'Automovilismo';

  window.db.addGame({
    date, time, league, sport, homeTeam: home, awayTeam: away
  });

  document.getElementById('add-game-modal').classList.add('hidden');
  renderManagerDashboard('games');
};

function renderManagerReportsTab(container) {
  const branchId = STATE.branch?.id;
  if (!branchId) {
    container.innerHTML = '<p class="text-center text-red-500 mt-10">Error: Sucursal no seleccionada.</p>';
    return;
  }

  // Métrica por Rango de Fechas
  if (!STATE.reportStartDate || !STATE.reportEndDate) {
    const todayStr = new Date().toISOString().split('T')[0];
    STATE.reportStartDate = todayStr;
    STATE.reportEndDate = todayStr;
  }
  const periodMetrics = window.db.getTimePeriodMetrics(STATE.reportStartDate, STATE.reportEndDate);
  const reportDate = STATE.reportEndDate || new Date().toISOString().split('T')[0];

  // 1. Resumen Operativo (Mesas) - Sólo tiene sentido ver "Mesas Activas" en tiempo real o del día actual de operación
  const activeVisits = (window.db.data.visits || []).filter(v =>
    v.branchId === branchId && (v.status === 'active' || v.status === 'pending')
  );
  const totalPax = activeVisits.reduce((acc, v) => acc + (parseInt(v.pax) || 0), 0);
  const avgPax = activeVisits.length > 0 ? (totalPax / activeVisits.length).toFixed(1) : 0;

  const waiterCounts = {};
  activeVisits.forEach(v => {
    if (v.waiterId) waiterCounts[v.waiterId] = (waiterCounts[v.waiterId] || 0) + 1;
  });
  const topWaiterId = Object.keys(waiterCounts).sort((a, b) => waiterCounts[b] - waiterCounts[a])[0];
  const topWaiter = topWaiterId ? (window.db.data.users.find(u => u.id === topWaiterId)?.name || 'Desconocido') : 'Ninguno';

  // 2. Inventario 86
  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.alimentos || []).map(i => ({ ...i, type: 'Alimento' })),
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];
  const items86 = allItems.filter(i => i.available === false);

  // 3. Impacto de Partidos
  const dailyInfo = window.db.getDailyInfo() || {};
  const gameRequests = dailyInfo.gameRequests || []; // Peticiones en espera
  const allGames = window.db.getMatches() || [];
  const scheduledGames = allGames.filter(g => g.date === reportDate); // Partidos para la fecha del reporte

  // 4. Efectividad de Reservaciones
  const branchReservations = (window.db.data.reservations || []).filter(r => r.branchId === branchId);
  // Reservas para la fecha seleccionada
  const todayReservations = branchReservations.filter(r => r.date === reportDate);

  // Inteligencia de Fidelidad: Clientes en Riesgo (Churn)
  const atRiskCustomers = window.db.getAtRiskCustomers();

  // Inteligencia de Fidelidad: Match Deportivo (Invitaciones)
  const matchTargets = window.db.getMatchTargets();

  // Inteligencia de Fidelidad: Ranking por Zona
  const zoneRanking = window.db.getZoneLoyaltyRanking();

  // Inteligencia de Fidelidad: Conversión de Motivo de Visita
  const conversionData = window.db.getVisitReasonConversion();


  // Funciones auxiliares para fechas
  window.setManagerReportDateRange = function (rangeType) {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (rangeType === 'hoy') {
      // Ya está
    } else if (rangeType === 'semana') {
      start.setDate(today.getDate() - 7);
    } else if (rangeType === 'mes') {
      start.setMonth(today.getMonth() - 1);
    }

    STATE.reportStartDate = start.toISOString().split('T')[0];
    STATE.reportEndDate = end.toISOString().split('T')[0];
    renderManagerDashboard('reports');
  };

  window.updateManagerReportCustomDates = function () {
    const start = document.getElementById('report-start').value;
    const end = document.getElementById('report-end').value;
    if (start && end) {
      STATE.reportStartDate = start;
      STATE.reportEndDate = end;
      renderManagerDashboard('reports');
    }
  };

  // RENDER PANTALLA
  container.innerHTML = `
    <div class="p-4 space-y-6 animate-fade-in pb-20">

      <!-- FILTRO DE FECHAS Y MÉTRICAS DEL PERIODO -->
      <div class="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
         
         <!-- ROW 1: Botones Rápidos -->
         <div class="flex gap-2 mb-3">
             <button onclick="setManagerReportDateRange('hoy')" class="flex-1 py-2 bg-gray-200 hover:bg-white text-black font-black uppercase tracking-wider rounded text-sm transition shadow ${STATE.reportStartDate === STATE.reportEndDate ? 'ring-2 ring-yellow-500 bg-white' : ''}">HOY</button>
             <button onclick="setManagerReportDateRange('semana')" class="flex-1 py-2 bg-gray-200 hover:bg-white text-black font-black uppercase tracking-wider rounded text-sm transition shadow">ÚLTIMOS 7 DÍAS</button>
             <button onclick="setManagerReportDateRange('mes')" class="flex-1 py-2 bg-gray-200 hover:bg-white text-black font-black uppercase tracking-wider rounded text-sm transition shadow">ÚLTIMOS 30 DÍAS</button>
         </div>

         <!-- ROW 2: Selectores de Fechas -->
         <div class="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-gray-700 mb-4 justify-between">
             <input type="date" id="report-start" class="bg-transparent text-sm text-gray-300 font-bold border-none outline-none flex-1 w-full text-center" value="${STATE.reportStartDate}">
             <span class="text-gray-500 font-black">-</span>
             <input type="date" id="report-end" class="bg-transparent text-sm text-gray-300 font-bold border-none outline-none flex-1 w-full text-center" value="${STATE.reportEndDate}">
             <button onclick="updateManagerReportCustomDates()" class="bg-yellow-500 text-black px-4 py-2 rounded font-black tracking-widest text-sm shadow uppercase shrink-0">IR</button>
             <button onclick="window.injectFebruaryGames()" title="Cargar Deportes Febrero 2026" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded text-xs font-bold transition whitespace-nowrap shrink-0 border border-purple-800 shadow">⚽ CARGAR DEPORTES</button>
         </div>

         <!-- ROW 3: Total de Mesas Summary -->
         <div class="bg-blue-900/20 border border-blue-800 p-4 rounded-lg flex justify-between items-center mb-4 shadow-inner">
             <div class="text-xs text-blue-300 font-black uppercase tracking-widest">TOTAL MESAS ESTE PERIODO</div>
             <div class="text-3xl font-black text-blue-400 leading-none">${periodMetrics.totalVisits}</div>
         </div>

         <div class="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
             <div class="bg-black/40 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition" onclick="showMotiveDetailsModal('comer', '${STATE.reportStartDate}', '${STATE.reportEndDate}')">
                <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Comer</div>
                <div class="text-2xl font-black text-white">${periodMetrics.motives.comer}</div>
             </div>
             <div class="bg-black/40 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition" onclick="showMotiveDetailsModal('tragos', '${STATE.reportStartDate}', '${STATE.reportEndDate}')">
                <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Tragos</div>
                <div class="text-2xl font-black text-white">${periodMetrics.motives.tragos}</div>
             </div>
             <div class="bg-black/40 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition" onclick="showMotiveDetailsModal('partido', '${STATE.reportStartDate}', '${STATE.reportEndDate}')">
                <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Partido</div>
                <div class="text-2xl font-black text-white">${periodMetrics.motives.partido}</div>
             </div>
             <div class="bg-black/40 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition" onclick="showMotiveDetailsModal('cumpleaños', '${STATE.reportStartDate}', '${STATE.reportEndDate}')">
                <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Cumpleaños</div>
                <div class="text-2xl font-black text-white">${periodMetrics.motives['cumpleaños']}</div>
             </div>
             <div class="bg-black/40 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition lg:col-span-1 col-span-2" onclick="showMotiveDetailsModal('negocios', '${STATE.reportStartDate}', '${STATE.reportEndDate}')">
                <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Negocios</div>
                <div class="text-2xl font-black text-white">${periodMetrics.motives.negocios}</div>
             </div>
         </div>
      </div>

      <h2 class="text-xl font-black text-yellow-500 flex items-center gap-2 border-b border-gray-700 pb-2 mt-8 uppercase tracking-widest">
        <span>🤖</span> INTELIGENCIA Y FIDELIZACIÓN
      </h2>

      <!-- SCORECARDS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
         <!-- Mesas -->
         <div class="bg-gray-800 p-3 rounded-lg border border-blue-900 shadow-md flex flex-col justify-between">
            <div class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">MESA ACTIVAS</div>
            <div class="flex items-end justify-between flex-wrap gap-1">
              <div class="text-3xl font-black text-blue-400 leading-none">${activeVisits.length}</div>
              <div class="text-[9px] sm:text-[10px] text-gray-400 font-bold bg-black/40 px-2 py-1 rounded truncate">Promedio pax: ${avgPax}</div>
            </div>
         </div>
         
         <!-- Inventario -->
         <div onclick="window.show86ProductsModal()" class="bg-gray-800 p-3 rounded-lg border ${items86.length > 0 ? 'border-red-900 scale-100 hover:scale-[1.02] cursor-pointer' : 'border-gray-700'} shadow-md transition flex flex-col justify-between">
            <div class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">PRODUCTOS 86</div>
            <div class="flex items-end justify-between flex-wrap gap-1">
               <div class="text-3xl font-black leading-none ${items86.length > 0 ? 'text-red-500' : 'text-green-500'}">${items86.length}</div>
               <div class="text-[9px] sm:text-[10px] text-gray-300 font-black tracking-wider bg-black/50 px-2 py-1 rounded uppercase min-w-max flex-shrink-0 border border-gray-700">${items86.length > 0 ? 'VER DETALLES' : 'OK'}</div>
            </div>
         </div>

         <!-- Partidos -->
         <div class="bg-gray-800 p-3 rounded-lg border border-orange-900 shadow-md flex flex-col justify-between">
            <div class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">CANALES/JUEGOS</div>
            <div class="flex items-end justify-between flex-wrap gap-1">
               <div class="text-3xl font-black leading-none text-orange-400">${scheduledGames.length}</div>
               <div class="text-[9px] sm:text-[10px] font-bold bg-black/40 px-2 py-1 rounded uppercase truncate min-w-max flex-shrink-0 border border-gray-700 ${gameRequests.length > 0 ? 'text-orange-500 border-orange-900/50' : 'text-gray-400'}">${gameRequests.length} pets</div>
            </div>
         </div>

         <!-- Reservas -->
         <div class="bg-gray-800 p-3 rounded-lg border border-purple-900 shadow-md flex flex-col justify-between">
            <div class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">RESERVAS HOY</div>
            <div class="flex items-end justify-between flex-wrap gap-1">
               <div class="text-3xl font-black leading-none text-purple-400">${todayReservations.length}</div>
               <div class="text-[9px] sm:text-[10px] text-gray-300 font-bold bg-black/40 px-2 py-1 rounded uppercase truncate min-w-max flex-shrink-0 border border-gray-700">Pendientes</div>
            </div>
         </div>
      </div>

      <h2 class="text-2xl font-black text-blue-400 flex items-center gap-2 border-b border-gray-700 pb-2 mt-8">
        <span>🧠</span> INTELIGENCIA Y FIDELIZACIÓN
      </h2>

      <!-- CHURN / ALGORITMO DE RESCATE -->
      <div class="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-xl">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-black text-white text-lg uppercase tracking-widest text-red-400 flex items-center gap-2">
              🚨 Algoritmo de Rescate (Churn)
            </h3>
            <p class="text-sm text-gray-400 mt-1">Clientes frecuentes (2+/mes) ausentes por más de 21 días ordenados por LTV.</p>
          </div>
          <div class="bg-red-900/30 text-red-500 font-black px-3 py-1 rounded-full text-sm border border-red-800">
            ${atRiskCustomers.length} en Riesgo
          </div>
        </div>

        ${atRiskCustomers.length === 0
      ? '<div class="text-center p-6 text-green-500 font-bold border border-green-900/50 bg-green-900/10 rounded-lg">¡Excelente retención! No hay clientes frecuentes en riesgo de abandono.</div>'
      : `
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-300">
              <thead class="text-xs text-gray-400 uppercase bg-gray-800">
                <tr>
                  <th scope="col" class="px-4 py-3 rounded-tl-lg">Cliente</th>
                  <th scope="col" class="px-4 py-3 text-center">Días Ausente</th>
                  <th scope="col" class="px-4 py-3 text-center">Frecuencia</th>
                  <th scope="col" class="px-4 py-3 text-right">LTV (Top Valor)</th>
                  <th scope="col" class="px-4 py-3 rounded-tr-lg">Acción Preferida</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-800 border-x border-b border-gray-800 rounded-b-lg">
                ${atRiskCustomers.map(risk => `
                  <tr class="hover:bg-gray-800/50 transition-colors">
                    <td class="px-4 py-3">
                      <div class="font-bold text-white">${risk.customer.firstName} ${risk.customer.lastName}</div>
                      <div class="text-xs text-gray-500 font-mono">${risk.customer.phone || 'Sin Teléfono'}</div>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <span class="bg-red-900/50 text-red-400 px-2 py-1 rounded font-bold">${risk.daysAbsent} días</span>
                    </td>
                    <td class="px-4 py-3 text-center text-gray-400 font-mono">
                      ${risk.frequency}x / mes
                    </td>
                    <td class="px-4 py-3 text-right text-green-400 font-bold">
                      $${risk.totalSpend.toLocaleString()}
                    </td>
                    <td class="px-4 py-3">
                      <a href="${risk.customer.phone ? `https://wa.me/52${risk.customer.phone.replace(/\D/g, '')}?text=Hola%20${risk.customer.firstName},%20hace%20tiempo%20no%20te%20vemos%20en%20Adán%20&%20Eva.%20¡Te%20extrañamos!` : '#'}" target="_blank" class="w-full block text-center bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs font-bold transition">
                        📱 WhatsApp (${risk.preferredItem})
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
             <button onclick="alert('Exportación CSV en desarrollo');" class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-xs font-bold transition">📥 Exportar Lista BDD</button>
          </div>
          `
    }
      </div>

      <!-- ESPACIO PARA REPORTES ADICIONALES (MATCH Y ZONA) -->
      <!-- MATCH DEPORTIVO -->
      <div class="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-xl">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-black text-white text-lg uppercase tracking-widest text-orange-400 flex items-center gap-2">
              🏟️ Match Deportivo (Invitación Inteligente)
            </h3>
            <p class="text-sm text-gray-400 mt-1">Identifica a los clientes cuyo equipo favorito juega pronto, ordenado por ingreso proyectado (RevPar).</p>
          </div>
        </div>

        ${matchTargets.length === 0
      ? '<div class="text-center p-6 text-gray-400 border border-gray-800 bg-gray-800/50 rounded-lg">No hay matches detectados entre la cartelera y los favoritos de los clientes.</div>'
      : `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            ${matchTargets.map(match => `
              <div class="bg-black/40 border border-orange-900/50 rounded-lg p-4 relative overflow-hidden flex flex-col justify-between">
                <div class="mb-3">
                  <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                    <div class="font-black text-white text-lg leading-tight flex-1">${match.matchTitle}</div>
                    <div class="bg-orange-900/40 text-orange-400 px-3 py-1 font-bold text-xs rounded border border-orange-900/50 whitespace-nowrap">
                      Rev. Proyectado: $${match.potentialRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div class="text-xs text-gray-400 font-mono">${match.date} • ${match.time} • ${match.league}</div>
                </div>
                <div class="flex justify-between items-end border-t border-gray-800 pt-3 mt-auto">
                  <div class="text-orange-400 font-bold flex items-center gap-2">
                    <span class="text-2xl">👥</span> ${match.fanCount} Fans Encontrados
                  </div>
                  <button onclick="alert('Exportación de Teléfonos en desarrollo');" class="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded text-xs font-bold transition uppercase">
                    📱 Copiar Números
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          `
    }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
         <div class="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-xl">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-black text-white text-lg uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  📍 Fidelidad por Zona (LTV)
                </h3>
                <p class="text-sm text-gray-400 mt-1">Ranking de las 5 zonas o colonias que generan mayor volumen de ventas y valor de cliente a largo plazo.</p>
              </div>
            </div>

            ${zoneRanking.length === 0
      ? '<div class="text-center p-6 text-gray-400 border border-gray-800 bg-gray-800/50 rounded-lg">No hay datos de zonas o colonias registrados en los clientes.</div>'
      : `
              <div class="flex flex-col gap-2">
                ${zoneRanking.slice(0, 5).map((zone, i) => `
                  <div class="bg-gray-800/80 p-3 rounded-lg border flex items-center justify-between ${i === 0 ? 'border-yellow-500' : 'border-gray-700'}">
                    <div class="flex items-center gap-4">
                      <div class="text-3xl font-black ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-600' : 'text-gray-600'}">#${i + 1}</div>
                      <div>
                        <div class="font-bold text-white text-lg">${zone.zone}</div>
                        <div class="text-xs text-gray-400">${zone.customerCount} clientes registrados</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-black text-green-400 text-xl">$${zone.totalRevenue.toLocaleString()}</div>
                      <div class="text-xs text-gray-400">CLV: $${Math.round(zone.avgCLV).toLocaleString()}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="mt-4 text-center">
                <button onclick="alert('Funcionalidad de exportar todas las zonas en desarrollo.');" class="text-blue-400 font-bold hover:text-blue-300 text-sm">Ver ranking completo ↓</button>
              </div>
              `
    }
         </div>

         <!-- CONVERSIÓN MOTIVO DE VISITA -->
         <div class="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-xl flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-black text-white text-lg uppercase tracking-widest text-purple-400 flex items-center gap-2">
                  🔄 Conversión de Escenario
                </h3>
                <p class="text-xs text-gray-400 mt-1">Mide qué % de clientes que vinieron por un "Partido" regresaron a "Comer".</p>
              </div>
            </div>

            <div class="flex items-center justify-between bg-black/40 p-4 rounded-xl border ${conversionData.convertedToDiners > 0 ? 'border-purple-500/50' : 'border-gray-800'} mb-4">
              <div class="text-center">
                 <div class="text-2xl font-black text-gray-300">${conversionData.totalSportsProspects}</div>
                 <div class="text-[10px] text-gray-500 uppercase">A Partido</div>
              </div>
              <div class="text-2xl text-gray-600">→</div>
              <div class="text-center">
                 <div class="text-3xl font-black text-purple-400">${conversionData.conversionRateText}</div>
                 <div class="text-xs text-purple-200 font-bold uppercase tracking-widest">Conversión</div>
              </div>
              <div class="text-2xl text-gray-600">→</div>
              <div class="text-center">
                 <div class="text-2xl font-black text-green-400">${conversionData.convertedToDiners}</div>
                 <div class="text-[10px] text-gray-500 uppercase">Regreso</div>
              </div>
            </div>

            <div class="flex-grow overflow-y-auto max-h-48 pr-1">
              ${conversionData.list.length === 0
      ? '<div class="text-center p-4 text-gray-500 text-xs italic">Aún no hay conversiones registradas.</div>'
      : `
                <div class="text-[10px] text-gray-400 font-bold uppercase mb-2">Casos de Éxito (Recientes)</div>
                <ul class="space-y-2">
                  ${conversionData.list.slice(0, 4).map(c => `
                    <li class="bg-gray-800/80 p-2 rounded flex justify-between items-center text-sm border-l-2 border-purple-500">
                      <div>
                        <div class="text-white font-bold">${c.customer.firstName} ${c.customer.lastName}</div>
                        <div class="text-xs text-gray-400">Total ${c.totalVisits} visitas</div>
                      </div>
                      <div class="text-green-400 font-bold font-mono">$${c.totalSpend.toLocaleString()}</div>
                    </li>
                  `).join('')}
                </ul>
                `
    }
            </div>
         </div>

      </div>

    </div>
  `;
}


// ===== SECCIÓN 3: MANAGER SUBTABS =====
// ------ OLD MANAGER DASHBOARD (DISABLED) ------

function OLD_renderManagerDashboard() {
  console.log('🎯 Rendering FULL Manager Dashboard...');

  const branchId = STATE.branch?.id;
  if (!branchId) {
    alert('Error: No se ha seleccionado sucursal');
    return;
  }

  // Get active visits for this branch
  const activeVisits = window.db.getActiveVisits().filter(v => v.branchId === branchId);

  // Get prospects for this branch
  const prospects = window.db.getProspects().filter(p => p.branchId === branchId);

  const div = document.createElement('div');
  div.className = 'p-4 max-w-6xl mx-auto pb-20';

  div.innerHTML = `
                <header class="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                  <div>
                    <h1 class="text-3xl font-black text-yellow-500">GERENTE <span class="text-white">HUB</span></h1>
                    <p class="text-sm text-gray-400">${STATE.branch?.name || ''} • ${STATE.user?.name || ''}</p>
                  </div>
                  <button onclick="handleLogout()" class="bg-red-900/30 text-red-400 px-4 py-2 rounded font-bold hover:bg-red-900/50">Salir</button>
                </header>

                <!-- SOLICITUDES DE PARTIDOS (HOSTESS) -->
                ${(window.db.getDailyInfo().gameRequests || []).length > 0 ? `
      <div class="card mb-6 bg-orange-900/20 border-2 border-orange-500 shadow-2xl animate-pulse-slow">
         <div class="flex justify-between items-center mb-4">
             <h2 class="text-2xl font-bold text-orange-400 flex items-center gap-2">🔔 Solicitudes de Hostess (${(window.db.getDailyInfo().gameRequests || []).length})</h2>
             <span class="text-xs bg-orange-600 text-white px-2 py-1 rounded-full animate-bounce">NUEVO</span>
         </div>
         <div class="space-y-3">
            ${(window.db.getDailyInfo().gameRequests || []).map(r => `
               <div class="bg-black/60 p-4 rounded-lg border border-orange-500/50 flex flex-col md:flex-row justify-between items-center gap-3">
                   <div class="flex items-center gap-3">
                       <span class="text-2xl">🙋‍♀️</span>
                       <div>
                           <div class="font-bold text-white text-xl">"${r.name}"</div>
                           <div class="text-xs text-gray-400">Solicitado hace unos momentos</div>
                       </div>
                   </div>
                   <div class="flex gap-2 w-full md:w-auto">
                       <button onclick="window.approveGameRequest('${r.id}', '${r.name}')" class="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:shadow-green-500/50 transition transform active:scale-95 flex items-center justify-center gap-2">
                          <span>✅</span> APROBAR
                       </button>
                       <button onclick="window.db.removeGameRequest('${r.id}'); renderManagerDashboard();" class="flex-1 md:flex-none bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-800 px-4 py-2 rounded-lg font-bold transition">
                          DESCARTAR
                       </button>
                   </div>
               </div>
            `).join('')}
         </div>
      </div>
    ` : ''}

                <!-- GESTIÓN DE PARTIDOS -->
                <div class="card mb-6 bg-blue-900/10 border-2 border-blue-600 shadow-xl">
                  <div class="flex justify-between items-center mb-4 border-b border-blue-800 pb-2">
                    <h2 class="text-2xl font-bold text-blue-400 flex items-center gap-2"><span>📺</span> Partidos Programados</h2>
                    <button onclick="
              const league = prompt('Liga (NFL, NBA, Liga MX...):', 'General');
              if(!league) return;
              const home = prompt('Equipo Local (ej. Cowboys):');
              if(!home) return;
              const away = prompt('Equipo Visitante (ej. Eagles):');
              if(!away) return;
              const time = prompt('Hora (HH:MM):', '19:00');
              if(home && away && time) {
                 window.db.addGame({league, homeTeam: home, awayTeam: away, time});
                 renderManagerDashboard(); // Refresh
              }
          " class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-blue-500/50 transition transform active:scale-95">
                      <span>+</span> AGREGAR PARTIDO
                    </button>
                  </div>

                  ${window.db.getMatches().length === 0 ? '<p class="text-gray-400 text-center py-4">No hay partidos programados hoy. Agrega uno arriba.</p>' : `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
         ${window.db.getMatches().map(g => `
            <div class="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700 hover:border-blue-500 transition relative group">
                <div>
                   <div class="font-bold text-white text-lg leading-tight mb-1">${g.match || (["UFC", "F1", "Tenis", "Boxeo"].includes(g.league) ? (g.homeTeam || g.sport || g.league) : `${g.homeTeam || "?"} <span class="text-gray-500 text-sm">vs</span> ${g.awayTeam || "?"}`)}</div>
                   <div class="text-xs text-blue-300 font-bold uppercase tracking-wider bg-blue-900/30 inline-block px-2 py-1 rounded">${g.league} • ⏰ ${g.time}</div>
                </div>
                <button onclick="try { if(confirm('¿Borrar partido?')) { window.db.removeGame('${g.id}'); renderManagerDashboard(); } } catch(e) { alert('Error: ' + e.message); console.error(e); }" class="text-red-500 hover:text-red-400 bg-red-900/20 p-2 rounded hover:bg-red-900/40 transition">🗑️</button>
            </div>
         `).join('')}
      </div>
      `}
                </div>

                <!-- MESAS ACTIVAS -->
                <div class="card mb-6 bg-green-900/10 border-2 border-green-600">
                  <h2 class="text-2xl font-bold text-green-400 mb-4">🍽️ Mesas Activas (${activeVisits.length})</h2>
                  ${activeVisits.length === 0 ? `
        <p class="text-gray-400 text-center py-8">No hay mesas activas en este momento</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          ${activeVisits.map(v => {
    const customer = window.db.getCustomerById(v.customerId);
    const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Cliente';
    const waiter = window.db.data.users.find(u => u.id === v.waiterId);
    const waiterName = waiter?.name || 'Sin asignar';

    return `
              <div onclick="navigateTo('view-customer', { customerId: '${v.customerId}' })" class="bg-gray-800 p-4 rounded-lg border border-green-600 hover:border-green-400 cursor-pointer transition">
                <div class="text-xl font-bold text-yellow-400">Mesa ${v.table}</div>
                <div class="text-white font-semibold">${customerName}</div>
                <div class="text-sm text-gray-400 mt-2">
                  <div>👤 ${waiterName}</div>
                  <div>👥 ${v.pax} personas</div>
                </div>
              </div>
            `;
  }).join('')}
        </div>
      `}
                </div>

                <!-- PROSPECTOS POR REVISAR -->
                <div class="card mb-6 bg-purple-900/10 border-2 border-purple-600">
                  <h2 class="text-2xl font-bold text-purple-400 mb-4">⭐ Prospectos por Revisar (${prospects.length})</h2>
                  ${prospects.length === 0 ? `
        <p class="text-gray-400 text-center py-8">No hay prospectos pendientes</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${prospects.slice(0, 6).map(p => {
    const customer = window.db.getCustomerById(p.customerId);
    if (!customer) return '';

    return `
              <div onclick="navigateTo('enrich-customer', { customerId: '${p.customerId}', visitId: '${p.visitId}' })" class="bg-gray-800 p-4 rounded-lg border border-purple-600 hover:border-purple-400 cursor-pointer transition">
                <div class="text-lg font-bold text-white">${customer.firstName} ${customer.lastName}</div>
                <div class="text-sm text-gray-400">
                  <div>📅 ${new Date(p.createdAt).toLocaleDateString()}</div>
                  <div>🍽️ Mesa ${p.table || 'N/A'}</div>
                </div>
              </div>
            `;
  }).join('')}
        </div>
        ${prospects.length > 6 ? `<p class="text-center text-gray-400 mt-3">+ ${prospects.length - 6} más...</p>` : ''}
      `}
                </div>

                <!-- MÓDULOS PRINCIPALES -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  <!-- Enriquecer Cliente -->
                  <div onclick="alert('Selecciona un prospecto de la lista de arriba')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">👤</div>
                    <h2 class="text-xl font-bold text-white mb-2">Enriquecer Cliente</h2>
                    <p class="text-gray-400 text-sm">Captura datos detallados de prospectos</p>
                  </div>

                  <!-- Reportes -->
                  <div onclick="navigateTo('regional-dashboard')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">📊</div>
                    <h2 class="text-xl font-bold text-white mb-2">Reportes</h2>
                    <p class="text-gray-400 text-sm">Ver reportes y analytics de la sucursal</p>
                  </div>

                  <!-- Marketing & Fidelización -->
                  <div onclick="alert('Módulo de Marketing - Próximamente')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-pink-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">📢</div>
                    <h2 class="text-xl font-bold text-white mb-2">Marketing & Fidelización</h2>
                    <p class="text-gray-400 text-sm">Campañas y segmentación de clientes</p>
                  </div>

                  <!-- Dinámicas -->
                  <div onclick="alert('Módulo de Dinámicas - Próximamente')" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">🎯</div>
                    <h2 class="text-xl font-bold text-white mb-2">Dinámicas</h2>
                    <p class="text-gray-400 text-sm">Gestionar concursos y dinámicas del día</p>
                  </div>

                  <!-- Módulo 86 -->
                  <div onclick="renderInventoryView()" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">🚫</div>
                    <h2 class="text-xl font-bold text-white mb-2">Gestión 86 (Disponibilidad)</h2>
                    <p class="text-gray-400 text-sm">Marca productos como agotados</p>
                  </div>

                  <!-- Admin Menú -->
                  <div onclick="renderMenuAdminView()" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">➕</div>
                    <h2 class="text-xl font-bold text-white mb-2">Administrador de Menú</h2>
                    <p class="text-gray-400 text-sm">Agrega nuevos platillos o bebidas</p>
                  </div>

                  <!-- QR Reseñas -->
                  <div onclick="renderReviewsQR()" class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition">⭐</div>
                    <h2 class="text-xl font-bold text-white mb-2">Código QR Reseñas</h2>
                    <p class="text-gray-400 text-sm">Mostrar código para feedback de clientes</p>
                  </div>
                </div>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);
  console.log('✅ FULL Manager Dashboard rendered successfully');
}

// === VIEW: INVENTORY 86 ===
function renderInventoryView() {
  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.alimentos || []).map(i => ({ ...i, type: 'Alimento' })),
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];

  const div = document.createElement('div');
  div.className = 'p-4 max-w-4xl mx-auto pb-20';

  div.innerHTML = `
                <header class="flex justify-between items-center mb-6 sticky top-0 bg-black z-10 py-4 border-b border-gray-800">
                  <h2 class="text-2xl text-red-500 font-bold flex items-center gap-2">🚫 GESTIÓN 86 <span class="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">Control de Stock</span></h2>
                  <button onclick="renderManagerDashboard()" class="text-gray-400 font-bold hover:text-white">← Volver</button>
                </header>

                <div class="mb-6">
                  <input type="text" id="inv-search" oninput="filterInventory(this.value)" placeholder="🔍 Buscar producto..." class="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 text-white text-lg font-bold">
                </div>

                <div id="inv-list" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${_renderInventoryItemsHTML(allItems)}
                </div>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);

  // Store items globally for filtering
  window.TEMP_INVENTORY = allItems;
}



window.handleAvailabilityToggle = function (id, checkbox) {
  const updatedItem = window.db.toggleItemAvailability(id);
  if (updatedItem) {
    // UI Feedback
    const container = checkbox.closest('.inv-item');
    const label = checkbox.parentElement.querySelector('span');
    const isAvailable = checkbox.checked;

    label.textContent = isAvailable ? 'DISP.' : 'AGOTADO';
    label.className = `ml-3 text-sm font-bold w-16 text-right ${isAvailable ? 'text-green-400' : 'text-red-500'}`;

    container.classList.remove('border-green-900/30', 'border-red-600');
    container.classList.add(isAvailable ? 'border-green-900/30' : 'border-red-600');

    // MANTENER SINCRONIZADA LA VISTA TEMPORAL
    if (window.TEMP_INVENTORY) {
      const tItem = window.TEMP_INVENTORY.find(i => i.id === id);
      if (tItem) tItem.available = isAvailable;
    }
  } else {
    // Revert visual toggle on error
    checkbox.checked = !checkbox.checked;
    alert("Error al guardar la disponibilidad en la base de datos.");
  }
}

// === VIEW: MENU ADMIN ===
function renderMenuAdminView() {
  const div = document.createElement('div');
  div.className = 'p-6 max-w-lg mx-auto bg-gray-900 min-h-screen';

  div.innerHTML = `
                <header class="flex justify-between items-center mb-8 sticky top-0 bg-gray-900 pt-4 pb-4 border-b border-gray-800 z-10">
                  <h2 class="text-2xl text-yellow-500 font-black">➕ NUEVO PRODUCTO</h2>
                  <button onclick="renderManagerDashboard()" class="text-gray-400 font-bold hover:text-white">← Volver</button>
                </header>

                <form onsubmit="handleNewProductSubmit(event)" class="space-y-6 bg-black p-6 rounded-xl border border-gray-800 shadow-2xl">
                  <div>
                    <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Nombre del Producto</label>
                    <input name="name" required type="text" placeholder="Ej: Hamburguesa Especial" class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-bold text-lg focus:border-yellow-500 outline-none transition">
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Precio ($)</label>
                      <input name="price" required type="number" step="0.5" placeholder="0.00" class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-bold text-lg focus:border-yellow-500 outline-none transition">
                    </div>
                    <div>
                      <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Tipo</label>
                      <select name="type" required class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-bold appearance-none focus:border-yellow-500 outline-none transition">
                        <option value="alimentos">🍔 Alimento</option>
                        <option value="bebidas">🍺 Bebida</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Categoría</label>
                    <select name="category" required class="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-bold appearance-none focus:border-yellow-500 outline-none transition">
                      <optgroup label="Alimentos">
                        <option value="Entradas">Entradas</option>
                        <option value="Platillos">Platillos</option>
                        <option value="Postres">Postres</option>
                        <option value="Hamburguesas">Hamburguesas</option>
                        <option value="Boneless">Boneless / Alitas</option>
                      </optgroup>
                      <optgroup label="Bebidas">
                        <option value="Cerveza Barril">Cerveza Barril</option>
                        <option value="Cerveza Botella">Cerveza Botella</option>
                        <option value="Michelados">Michelados</option>
                        <option value="Refrescos">Refrescos</option>
                        <option value="Limonadas">Limonadas</option>
                        <option value="Destilados">Destilados</option>
                        <option value="Coctelería">Coctelería</option>
                        <option value="Café">Café</option>
                      </optgroup>
                    </select>
                  </div>

                  <button type="submit" class="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-4 rounded-lg mt-8 text-lg shadow-lg transform active:scale-95 transition-all">
                    GUARDAR PRODUCTO
                  </button>
                </form>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);
}

window.handleNewProductSubmit = function (e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const result = window.db.addNewProduct(
    data.get('name'),
    data.get('category'),
    data.get('price'),
    data.get('type')
  );
  if (result) {
    if (confirm('✅ Producto agregado correctamente.\n¿Deseas agregar otro?')) {
      e.target.reset();
    } else {
      renderManagerDashboard();
    }
  } else {
    alert('❌ Error al agregar producto. Intenta de nuevo.');
  }
}

// === VIEW: QR REVIEWS ===
function renderReviewsQR() {
  const div = document.createElement('div');
  div.className = 'min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden';

  // Get user name safely
  const userName = (STATE.user && STATE.user.name) ? STATE.user.name : 'Tu Mesero';
  const roleTitle = (STATE.user && STATE.user.role === 'manager') ? 'Gerente' : 'Te atiende';

  // Google Review Link
  const reviewLink = "https://www.google.com/maps/search/?api=1&query=Buffalo+Wild+Wings+Juriquilla";

  div.innerHTML = `
                <!-- Background styling -->
                <div class="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-black pointer-events-none"></div>

                <div class="relative z-10 w-full max-w-md bg-[#111] rounded-3xl overflow-hidden shadow-2xl border md:border-2 border-[#FFC600] flex flex-col items-center transform transition-all duration-500 scale-100">

                  <!-- HEADER: Waiter Name -->
                  <div class="w-full bg-[#FFC600] p-6 pb-8 text-center relative clip-path-slant">
                    <div class="absolute inset-0 bg-white/5 skew-y-3 pointer-events-none"></div>

                    <p class="text-black/80 font-bold text-sm uppercase tracking-widest mb-1 shadow-sm">${roleTitle}</p>
                    <h1 class="text-black text-3xl md:text-4xl font-extrabold uppercase leading-none drop-shadow-md">
                      ${userName}
                    </h1>
                  </div>

                  <!-- BODY: Message & QR -->
                  <div class="w-full px-8 pt-8 pb-10 flex flex-col items-center bg-[#111] relative -mt-4 rounded-t-3xl z-20">

                    <p class="text-white text-lg md:text-xl text-center font-medium mb-6 italic">
                      "Agradezco mucho tu reseña" ⭐
                    </p>

                    <!-- QR Container with Glow -->
                    <div class="relative group mb-8">
                      <div class="absolute -inset-2 bg-gradient-to-tr from-[#FFC600] to-yellow-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-700"></div>

                      <div class="relative bg-white p-3 rounded-xl shadow-inner">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(reviewLink)}"
                          alt="QR Code"
                          class="w-64 h-64 object-contain mix-blend-multiply">
                      </div>
                    </div>

                    <!-- CALL TO ACTION: ESCANÉAME -->
                    <div class="animate-pulse">
                      <div class="bg-[#FFC600] text-black font-black text-2xl px-10 py-3 rounded-full shadow-[0_0_20px_rgba(255,198,0,0.4)] uppercase tracking-widest flex items-center justify-center gap-3 transform hover:scale-105 transition cursor-none">
                        <span class="text-3xl">📷</span>
                        <span>Escanéame</span>
                      </div>
                    </div>

                    <!-- LOCATION SUBTITLE -->
                    <div class="mt-8 text-center opacity-50">
                      <h3 class="text-sm font-bold text-white uppercase tracking-[0.2em]">Buffalo Wild Wings</h3>
                      <h4 class="text-xs text-white uppercase tracking-widest mt-1">Juriquilla</h4>
                    </div>
                  </div>
                </div>

                <!-- Back Button -->
                <div class="mt-8 z-10">
                  <button onclick="goBack()" class="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 hover:text-white transition group">
                    <span class="group-hover:-translate-x-1 transition">←</span>
                    <span>Volver</span>
                  </button>
                </div>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);
}

// Alias for Waiter Dashboard compatibility (Case Insensitive Safety)
window.showQRreviews = renderReviewsQR;
window.showQRReviews = renderReviewsQR;

// === VIEW: ENRICH CUSTOMER ===
window.injectMockHistoryForCustomer = function (customerId, visitId) {
  if (confirm('¿Estás seguro de inyectar 1 año de historial de prueba (20 visitas) para este cliente?')) {
    window.db.devInjectMockHistory(customerId);
    renderEnrichCustomer({ customerId, visitId });
    showToast('Dato inyectado exitosamente');
  }
};
function renderEnrichCustomer(params) {
  const { customerId, visitId } = params;
  const customer = window.db.getCustomerById(customerId);

  if (!customer) {
    alert('Cliente no encontrado');
    renderManagerDashboard();
    return;
  }

  // Cálculos Históricos
  const allVisits = window.db.data.visits.filter(v => v.customerId === customerId && v.status === 'closed').sort((a, b) => new Date(b.date) - new Date(a.date));
  const visitCount = allVisits.length;

  let customerType = '⭐ NUEVO';
  if (visitCount > 10) customerType = '👑 LEAL';
  else if (visitCount > 3) customerType = '💎 FRECUENTE';
  else if (visitCount > 0) customerType = '👋 RECURRENTE';

  // Obtener consumos de sus visitas para calcular favoritos (Avanzado)
  const itemCounts = {};
  allVisits.forEach(v => {
    const orders = window.db.getOrdersByVisit(v.id);
    orders.forEach(o => {
      o.items.forEach(item => {
        itemCounts[item.itemId] = (itemCounts[item.itemId] || 0) + item.quantity;
      });
    });
  });

  // Helper para buscar el ítem más repetido de una categoría
  const getFavorite = (menuPath, categoryMatch = null) => {
    let favName = 'No hay datos';
    let max = 0;
    const itemsToCheck = categoryMatch
      ? window.db.data.menu[menuPath].filter(m => m.category === categoryMatch)
      : window.db.data.menu[menuPath];

    if (!itemsToCheck) return favName;

    itemsToCheck.forEach(m => {
      if (itemCounts[m.id] > max) {
        max = itemCounts[m.id];
        favName = m.name;
      }
    });
    return favName;
  };

  const favFood = getFavorite('alimentos');
  const favDrink = getFavorite('bebidas');
  const favSalsa = getFavorite('alimentos', 'Salsas');

  // Lógica de separación de apellidos si es un cliente antiguo que lo tiene todo en lastName
  let displayLastName1 = customer.lastName || '';
  let displayLastName2 = customer.lastName2 || '';

  if (displayLastName1.includes(' ') && !displayLastName2) {
    const parts = displayLastName1.split(' ');
    displayLastName1 = parts.shift();
    displayLastName2 = parts.join(' ');
  }

  // Checar Alertas de Información Faltante
  const missingInfo = [];
  if (!customer.phone) missingInfo.push('Teléfono');
  if (!customer.email) missingInfo.push('Correo Electrónico');
  if (!customer.birthday) missingInfo.push('Cumpleaños');

  const div = document.createElement('div');
  div.className = 'p-4 max-w-4xl mx-auto pb-20 fade-in';

  div.innerHTML = `
                <header class="flex justify-between items-center mb-6 sticky top-0 bg-black z-10 py-4 border-b border-gray-800">
                  <h2 class="text-2xl text-purple-400 font-bold flex items-center gap-2">💎 INFO DEL CLIENTE</h2>
                  <button onclick="renderManagerDashboard()" class="text-gray-400 font-bold hover:text-white border border-gray-600 px-3 py-1 rounded transition">← Volver al Panel</button>
                </header>
                
                ${missingInfo.length > 0 ? `
                  <div class="bg-red-900/40 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-lg flex items-start gap-3">
                    <span class="text-2xl mt-1">⚠️</span>
                    <div>
                        <h4 class="text-white font-bold text-lg">Perfil Incompleto</h4>
                        <p class="text-red-200 text-sm">Falta registrar: <span class="font-black">${missingInfo.join(', ')}</span>.</p>
                        <p class="text-red-300 text-xs italic mt-1">Presiona "Editar Perfil" para completarlo.</p>
                    </div>
                  </div>
                ` : ''}

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                  <!-- LEFT COLUMN: Profile Form -->
                  <div class="lg:col-span-2">
                      <form id="customer-form" onsubmit="handleEnrichSubmit(event, '${customerId}', '${visitId}')" class="space-y-6 bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-2xl">
                        
                        <div class="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
                            <h3 class="text-white font-bold flex items-center gap-2"><span class="text-xl">👤</span> Información Personal</h3>
                            <button type="button" id="toggle-edit-btn" onclick="toggleCustomerEditMode()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full text-sm shadow transition">
                                ✏️ EDITAR PERFIL
                            </button>
                        </div>

                        <!-- Personal Info -->
                        <div>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Nombre(s)</label>
                              <input name="firstName" disabled required value="${customer.firstName || ''}" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Apellido Paterno</label>
                              <input name="lastName" disabled required value="${displayLastName1}" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                             <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Apellido Materno</label>
                              <input name="lastName2" disabled value="${displayLastName2}" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                          </div>
                        </div>

                        <!-- Contact Info -->
                        <div>
                          <h3 class="text-white font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2 mt-6"><span class="text-xl">📞</span> Contacto & Demografía</h3>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Teléfono</label>
                              <input name="phone" disabled value="${customer.phone || ''}" type="tel" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all" ${!customer.phone ? 'placeholder="Requerido"' : ''}>
                            </div>
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Email</label>
                              <input name="email" disabled value="${customer.email || ''}" type="email" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Cumpleaños</label>
                              <input name="birthday" disabled value="${customer.birthday || ''}" type="date" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                            <div>
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Ciudad</label>
                              <input name="city" disabled value="${customer.city || ''}" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                            <div class="md:col-span-2">
                              <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Colonia</label>
                              <input name="colony" disabled value="${customer.colony || ''}" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all">
                            </div>
                          </div>
                        </div>

                        <!-- Preferences -->
                        <div>
                          <h3 class="text-white font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><span class="text-xl">❤️</span> Preferencias Manuales</h3>
                          <div>
                            <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Equipo Favorito</label>
                            <input name="team" disabled value="${customer.team || ''}" list="team-suggestions" type="text" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all" placeholder="Ej: Dallas Cowboys">
                          </div>
                          <div class="mt-4">
                            <label class="block text-gray-400 text-xs font-bold uppercase mb-2">Notas / Comentarios Internos</label>
                            <textarea name="notes" disabled rows="3" class="customer-field disabled:opacity-50 w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-purple-500 outline-none transition-all" placeholder="Alergias, trato especial, etc...">${customer.notes || ''}</textarea>
                          </div>
                        </div>

                        <button type="submit" id="save-customer-btn" class="hidden w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-lg mt-8 text-lg shadow-lg transform active:scale-95 transition-all">
                          💾 GUARDAR CAMBIOS
                        </button>
                      </form>
                  </div>

                  <!-- RIGHT COLUMN: Historical Analytics -->
                  <div class="space-y-6">
                      <!-- Loyalty Badge -->
                      <div class="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-700 text-center shadow-lg">
                          <div class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Nivel de Cliente</div>
                          <div class="text-2xl font-black text-white bg-white/10 py-2 rounded mb-2">${customerType}</div>
                          <div class="text-purple-400 font-bold"><span class="text-3xl">${visitCount}</span> Visitas Históricas</div>
                      </div>

                      <!-- AI Favorites Box -->
                      <div class="bg-gray-900 border border-gray-700 p-5 rounded-xl shadow-lg">
                         <h3 class="text-white font-black uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
                            <span class="text-lg">🤖</span> Inteligencia de Consumo
                         </h3>
                         
                         <div class="space-y-4">
                            <div>
                                <div class="text-xs text-gray-500 uppercase font-bold mb-1">Platillo Favorito</div>
                                <div class="text-white font-bold bg-black p-2 rounded border border-gray-800">${favFood}</div>
                            </div>
                            <div>
                                <div class="text-xs text-gray-500 uppercase font-bold mb-1">Bebida Favorita</div>
                                <div class="text-white font-bold bg-black p-2 rounded border border-gray-800">${favDrink}</div>
                            </div>
                            <div>
                                <div class="text-xs text-gray-500 uppercase font-bold mb-1">Salsa Favorita</div>
                                <div class="text-white font-bold bg-black p-2 rounded border border-gray-800">${favSalsa}</div>
                            </div>
                             </div>
                         </div>
                      </div>
                      <div class="mt-4 text-center">
                          <button type="button" onclick="injectMockHistoryForCustomer('${customerId}', '${visitId}')" class="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-500 py-1 px-3 rounded-full border border-gray-700 transition uppercase tracking-widest font-bold">
                              🎁 Inyectar Historial (Test)
                          </button>
                      </div>
                  </div>
                </div>

                <!-- Visitas Históricas Table -->
                <div class="mt-8 bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
                    <div class="bg-black py-4 px-6 border-b border-gray-800">
                        <h3 class="text-white font-black text-xl flex items-center gap-2"><span>📜</span> Historial Completo de Visitas</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm text-gray-300">
                            <thead class="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th class="px-6 py-4 font-bold text-center">Fecha</th>
                                    <th class="px-6 py-4 font-bold text-center">Hora</th>
                                    <th class="px-6 py-4 font-bold text-center">Mesa</th>
                                    <th class="px-6 py-4 font-bold text-center">Pax</th>
                                    <th class="px-6 py-4 font-bold text-center w-1/4">Motivo / Partido</th>
                                    <th class="px-6 py-4 font-bold text-right">Consumo</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-800">
                                ${allVisits.length === 0 ? `
                                    <tr>
                                        <td colspan="6" class="px-6 py-8 text-center text-gray-500 italic">No hay visitas cerradas registradas para este cliente aún.</td>
                                    </tr>
                                ` : allVisits.map(v => {
    const d = new Date(v.startTime || v.entryTime || v.date);
    return `
                                    <tr class="hover:bg-gray-800/50 transition text-center">
                                        <td class="px-6 py-4 font-mono">${d.toLocaleDateString()}</td>
                                        <td class="px-6 py-4 font-mono">${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td class="px-6 py-4 font-bold text-white">#${v.table}</td>
                                        <td class="px-6 py-4">${v.pax || '?'} <span class="text-xs text-gray-500">pax</span></td>
                                        <td class="px-6 py-4">
                                            ${v.reason === 'Partido' ? `<span class="bg-blue-900 text-blue-100 px-2 py-1 rounded text-xs border border-blue-700">⚽ Partido: ${v.gameName || 'No Especificado'}</span>` : (v.reason ? `<span class="bg-black text-gray-300 px-2 py-1 rounded text-xs border border-gray-700">${v.reason}</span>` : '-')}
                                        </td>
                                        <td class="px-6 py-4 text-right font-bold text-green-400">$${(v.totalAmount || 0).toLocaleString()}</td>
                                    </tr>
                                    `;
  }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);

  // Ensure datalist exists
  if (window.updateTeamDatalist) window.updateTeamDatalist();
}

// Logic to toggle fields
window.toggleCustomerEditMode = function () {
  const fields = document.querySelectorAll('.customer-field');
  const saveBtn = document.getElementById('save-customer-btn');
  const editBtn = document.getElementById('toggle-edit-btn');

  // Check current state (using the first field)
  const isEditing = !fields[0].disabled;

  if (isEditing) {
    // Cancel edit mode
    fields.forEach(f => f.disabled = true);
    saveBtn.classList.add('hidden');
    editBtn.innerHTML = '✏️ EDITAR PERFIL';

    // Change editBtn color to blue
    editBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
    editBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
  } else {
    // Enable edit mode
    fields.forEach(f => f.disabled = false);
    saveBtn.classList.remove('hidden');
    editBtn.innerHTML = '❌ CANCELAR EDICIÓN';

    // Change editBtn color to red
    editBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
    editBtn.classList.add('bg-red-600', 'hover:bg-red-500');
  }
}

window.handleEnrichSubmit = function (e, customerId, visitId) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const updates = {
    firstName: formData.get('firstName').trim(),
    lastName: formData.get('lastName').trim(),
    lastName2: formData.get('lastName2') ? formData.get('lastName2').trim() : '',
    phone: formData.get('phone'),
    email: formData.get('email'),
    birthday: formData.get('birthday'),
    city: formData.get('city'),
    colony: formData.get('colony'),
    team: formData.get('team'),
    notes: formData.get('notes')
  };

  const success = window.db.updateCustomer(customerId, updates);

  if (success) {
    if (visitId && visitId !== 'undefined') {
      window.db.markProspectAsReviewed(visitId);
    }
    showToast('✅ Cliente actualizado correctamente', 'success');
    renderEnrichCustomer({ customerId, visitId }); // Reload same page natively in read-only
  } else {
    alert('Error al actualizar cliente');
  }
};

// === VIEW: CUSTOMER PROFILE ===
function renderViewCustomer(customerId) {
  const customer = window.db.getCustomerById(customerId);
  if (!customer) {
    alert('Cliente no encontrado');
    renderManagerDashboard();
    return;
  }

  const classification = window.db.getCustomerClassification(customerId);
  const badgeHTML = window.ClientClassifier ? window.ClientClassifier.getBadgeHTML(classification) : classification.toUpperCase();
  const desc = window.ClientClassifier ? window.ClientClassifier.getDescription(classification) : '';
  const visits = window.db.data.visits.filter(v => v.customerId === customerId).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Obtener Gasto Histórico 360°
  const ltv = window.db.getCustomerLTV(customerId);

  const div = document.createElement('div');
  div.className = 'p-4 max-w-2xl mx-auto pb-20';

  div.innerHTML = `
                <header class="flex justify-between items-center mb-6 sticky top-0 bg-black z-10 py-4 border-b border-gray-800">
                  <h2 class="text-2xl text-white font-bold">PERFIL</h2>
                  <button onclick="renderManagerDashboard()" class="text-gray-400 font-bold hover:text-white">← Volver</button>
                </header>

                <!-- Header Card -->
                <div class="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 flex items-center justify-between">
                  <div>
                    <h1 class="text-3xl font-black text-white mb-2">${customer.firstName} ${customer.lastName}</h1>
                    <div class="flex items-center gap-3">
                      ${badgeHTML}
                      <span class="text-gray-400 text-sm">${customer.city || 'Ciudad desconocida'}</span>
                    </div>
                  </div>
                  <button onclick="navigateTo('enrich-customer', { customerId: '${customerId}' })" class="bg-gray-800 hover:bg-gray-700 p-3 rounded-full border border-gray-600 transition">
                    ✏️
                  </button>
                </div>

                <!-- 360° CUSTOMER LTV PROFILE -->
                <div class="mb-6 p-4 bg-gray-900 rounded-xl border border-gray-700 shadow-xl">
                  <h3 class="text-blue-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <span>💎</span> Gasto Histórico y Perfil 360°
                  </h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                      <span class="text-gray-500 block text-[10px] uppercase font-bold mb-1">Visitas Totales</span>
                      <div class="font-black text-xl text-white">${ltv.visitCount}</div>
                    </div>
                    <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                      <span class="text-gray-500 block text-[10px] uppercase font-bold mb-1">Ticket Promedio</span>
                      <div class="font-black text-xl text-yellow-500">$${Math.round(ltv.avgTicket).toLocaleString()}</div>
                    </div>
                    <div class="col-span-2 bg-black/40 p-3 rounded-lg border border-gray-800">
                      <span class="text-gray-500 block text-[10px] uppercase font-bold mb-1">Consumo Lifetime</span>
                      <div class="font-black text-2xl text-green-400">$${ltv.totalSpend.toLocaleString()}</div>
                    </div>
                    <div class="col-span-2 md:col-span-4 bg-black/40 p-3 rounded-lg border border-gray-800 flex items-center justify-between">
                      <span class="text-gray-500 block text-[10px] uppercase font-bold">Producto Preferido:</span>
                      <span class="font-bold text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis ml-2">${ltv.preferredItem}</span>
                    </div>
                    <div class="col-span-2 md:col-span-4 bg-black/40 p-3 rounded-lg border border-gray-800 flex items-center justify-between mt-1">
                      <span class="text-gray-500 block text-[10px] uppercase font-bold">Equipo Favorito:</span>
                      <span class="font-bold text-yellow-500 text-sm whitespace-nowrap overflow-hidden text-ellipsis ml-2">${customer.team || 'Sin Equipo'}</span>
                    </div>
                  </div>
                </div>

                <!-- Info Section -->
                <div class="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 space-y-3">
                  <h3 class="text-gray-500 font-bold text-sm uppercase mb-2">Datos de Contacto</h3>
                  <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Teléfono</span>
                    <span class="text-white font-mono">${customer.phone || '-'}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-800 pb-2">
                    <span class="text-gray-400">Email</span>
                    <span class="text-white text-sm">${customer.email || '-'}</span>
                  </div>
                  <div class="flex justify-between pt-2">
                    <span class="text-gray-400">Cumpleaños</span>
                    <span class="text-white">${customer.birthday || '-'}</span>
                  </div>
                </div>

                <!-- Recent History -->
                <div>
                  <h3 class="text-white font-bold mb-4">Historial de Visitas</h3>
                  <div class="space-y-3">
                    ${visits.slice(0, 5).map(v => {
    const date = new Date(v.date).toLocaleDateString();
    return `
                    <div class="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700">
                        <div>
                            <div class="text-white font-bold">${date}</div>
                            <div class="text-xs text-gray-400">Mesa ${v.table} • consumo $${v.totalAmount || 0}</div>
                        </div>
                        <div class="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                            ${v.status === 'active' ? '🟢 Activo' : '🔴 Cerrado'}
                        </div>
                    </div>
                `;
  }).join('')}
                    ${visits.length === 0 ? '<p class="text-gray-500 text-center italic">Sin historial reciente</p>' : ''}
                  </div>
                </div>
                `;

  appContainer.innerHTML = '';
  appContainer.appendChild(div);
}



// ===== SECCIÓN 4: INIT + RESERVOIR UI + NEW DASHBOARDS =====
// --- INITIALIZATION ---
function initApp() {
  if (localStorage.getItem('ADANYEVA_SESSION') && window.db) {
    renderLogin();
  } else {
    renderLogin();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


// --- INGESTION HELPERS ---

window.renderIngestionConfig = function (type) {
  if (!window.db || !window.db.data.ingestionConfig) return '';
  const items = window.db.data.ingestionConfig[type] || [];
  if (items.length === 0) return '<span class="text-xs text-gray-500 italic">Nada configurado</span>';

  return items.map(item => `
                <span onclick="window.removeIngestItem('${type}', '${item.id}')"
                  class="cursor-pointer bg-${item.active ? 'green' : 'gray'}-900 border border-${item.active ? 'green' : 'gray'}-700 text-${item.active ? 'green' : 'gray'}-300 px-2 py-1 rounded text-[10px] font-bold hover:bg-red-900 hover:text-red-300 hover:border-red-700 transition" title="Clic para eliminar">
                  ${item.active ? '🟢' : '⚪'} ${item.name} (${item.id})
                </span>
                `).join('');
};

window.addIngestItem = function (type) {
  const idInput = document.getElementById(type === 'leagues' ? 'new-league-id' : 'new-team-id');
  const nameInput = document.getElementById(type === 'leagues' ? 'new-league-name' : 'new-team-name');

  const id = idInput.value.trim();
  const name = nameInput.value.trim();

  if (!id || !name) {
    if (window.showToast) window.showToast('❌ Faltan datos (ID y Nombre)', 'error');
    return;
  }

  if (!window.db.data.ingestionConfig[type]) window.db.data.ingestionConfig[type] = [];

  // Check duplicate
  if (window.db.data.ingestionConfig[type].find(i => i.id === id)) {
    if (window.showToast) window.showToast('⚠️ Ese ID ya está registrado', 'warning');
    return;
  }

  window.db.data.ingestionConfig[type].push({ id, name, active: true });
  window.db._save();

  // Re-render
  if (typeof renderManagerDashboard === 'function') renderManagerDashboard('games');
};

window.removeIngestItem = function (type, id) {
  if (!confirm(`¿Dejar de seguir ${type === 'leagues' ? 'esta liga' : 'este equipo'}?`)) return;

  if (!window.db.data.ingestionConfig[type]) return;
  window.db.data.ingestionConfig[type] = window.db.data.ingestionConfig[type].filter(i => i.id !== id);
  window.db._save();

  if (typeof renderManagerDashboard === 'function') renderManagerDashboard('games');
};

// Simplified wrapper to just call Ingestor
window.runSportsIngest = async function () {
  if (!window.ingestor) window.ingestor = new window.SportIngestor();

  try {
    const count = await window.ingestor.runIngest();
    console.log("RunSportsIngest Result:", count);
    if (window.showToast) window.showToast(`✅ ${count} partidos sincronizados.`, 'success');
    return count; // Return value for UI feedback
  } catch (e) {
    console.error("Ingest Error:", e);
    if (window.showToast) window.showToast(`❌ Error al sincronizar.`, 'error');
    throw e;
  }
};

// RENDER HOSTESS REQUESTS (With Dismiss Logic)
function renderManagerGameRequests(container) {
  const requests = window.db.getDailyInfo().gameRequests || [];
  if (requests.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
                <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-4 animate-fade-in">
                  <h4 class="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    🔔 Solicitudes Recientes (${requests.length})
                  </h4>
                  <div class="space-y-2">
                    ${requests.map(req => `
                    <div class="flex justify-between items-center bg-black/40 p-2 rounded border border-blue-500/20">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">📺</span>
                            <div>
                                <div class="text-white font-bold text-sm leading-none">${req.gameName || req.name}</div>
                                <div class="text-[10px] text-gray-500">${new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.db.removeGameRequest('${req.id}'); renderManagerDashboard('games');" 
                                    class="text-gray-500 hover:text-white hover:bg-white/10 p-1.5 rounded transition" title="Descartar">
                                ✕
                            </button>
                            ${!(window.db.getMatches().find(m => m.match === (req.gameName || req.name))) ?
      `<button onclick="document.getElementById('new-home').value = '${req.gameName || req.name}'; document.getElementById('new-league').value='UFC'; document.getElementById('new-league').focus();" 
                                         class="text-blue-400 hover:text-blue-300 text-xs border border-blue-500/50 px-2 py-1 rounded">
                                    + Agregar
                                </button>` : ''}
                        </div>
                    </div>
                `).join('')}
                  </div>
                </div>
                `;
}

// === HOSTESS RESERVATION UI ===

window.showReservationModal = function () {
  // Simple prompt-based flow for now, or inject a modal if preferred.
  // Let's inject a modal for better UX as requested "Professional"

  // Check if modal exists
  let modal = document.getElementById('reservation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reservation-modal';
    // FIX: Fully OPAQUE background (bg-black) to prevent bleed-through. High z-index.
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black animate-fade-in hidden sm:p-4';
    modal.innerHTML = `
                <!-- Modal Content: Solid gray background, no transparency -->
                <div class="bg-gray-900 border border-yellow-500/50 sm:rounded-xl w-full h-full sm:h-auto sm:max-w-md relative shadow-2xl flex flex-col sm:max-h-[90vh]">
                  <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <button onclick="document.getElementById('reservation-modal').classList.add('hidden')" class="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl z-20 bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-700">✕</button>

                    <h3 class="text-2xl font-black text-yellow-500 mb-8 flex items-center gap-2 sticky top-0 bg-gray-900 z-10 py-2 border-b border-gray-800">
                      🎟️ NUEVA RESERVACIÓN
                    </h3>

                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Nombre Cliente</label>
                      <input type="text" id="res-name" class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" placeholder="Ej. Juan Pérez">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Pax</label>
                        <input type="number" id="res-pax" class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white outline-none" value="2">
                      </div>
                      <div>
                        <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Hora</label>
                        <input type="time" id="res-time" class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white outline-none">
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Categoría VIP</label>
                      <div class="flex gap-2">
                        <button onclick="selectResVip(this, '')" class="res-vip-btn flex-1 p-2 rounded border border-gray-600 bg-gray-800 text-gray-400 text-sm selected">Normal</button>
                        <button onclick="selectResVip(this, 'blazin')" class="res-vip-btn flex-1 p-2 rounded border border-orange-500/50 bg-gray-800 text-orange-500 text-sm">🔥 Blazin</button>
                        <button onclick="selectResVip(this, 'diamond')" class="res-vip-btn flex-1 p-2 rounded border border-blue-400/50 bg-gray-800 text-blue-400 text-sm">💎 Diamond</button>
                      </div>
                      <input type="hidden" id="res-vip" value="">
                    </div>

                    <div>
                      <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Motivo / Partido</label>
                      <select id="res-reason" class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white mb-2" onchange="toggleResGameDisplay(this)">
                        <option value="Comer">A Comer / Cenar</option>
                        <option value="Tragos">A Beber</option>
                        <option value="Partido">Ver Partido</option>
                        <option value="Cumpleaños">Cumpleaños</option>
                        <option value="Negocios">Negocios</option>
                      </select>

                      <div id="res-game-container" class="hidden">
                        <select id="res-game" class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white text-sm">
                          <!-- Populated dynamically -->
                        </select>
                      </div>
                    </div>

                    <button onclick="submitReservation()" class="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-4 rounded-lg mt-4 shadow-lg transform active:scale-95 transition">
                      💾 GUARDAR RESERVACIÓN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
    document.body.appendChild(modal);
  }

  // Reset and Show
  document.getElementById('res-name').value = '';
  document.getElementById('res-pax').value = '2';
  document.getElementById('res-time').value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Populate Games
  const gameSelect = document.getElementById('res-game');
  if (window.generateGameOptions) {
    gameSelect.innerHTML = window.generateGameOptions('');
  }

  document.getElementById('reservation-modal').classList.remove('hidden');
};

window.selectResVip = function (btn, val) {
  document.querySelectorAll('.res-vip-btn').forEach(b => {
    b.classList.remove('bg-gray-700', 'ring-2', 'ring-yellow-500');
    b.classList.add('bg-gray-800');
  });
  btn.classList.remove('bg-gray-800');
  btn.classList.add('bg-gray-700', 'ring-2', 'ring-yellow-500');
  document.getElementById('res-vip').value = val;
};

window.toggleResGameDisplay = function (sel) {
  const cont = document.getElementById('res-game-container');
  if (sel.value === 'Partido') cont.classList.remove('hidden');
  else cont.classList.add('hidden');
};

window.submitReservation = function () {
  const name = document.getElementById('res-name').value;
  if (!name) return alert('Nombre requerido');

  const data = {
    customerName: name,
    pax: document.getElementById('res-pax').value,
    time: document.getElementById('res-time').value,
    vip: document.getElementById('res-vip').value,
    reason: document.getElementById('res-reason').value,
    game: document.getElementById('res-reason').value === 'Partido' ? document.getElementById('res-game').value : '',
    date: new Date().toLocaleDateString('en-CA') // Today
  };
  window.db.addReservation(data);
  document.getElementById('reservation-modal').classList.add('hidden');
};

// Delete Reservation (Manager Only)
window.deleteReservation = function (resId) {
  if (!confirm('¿Eliminar esta reservación?')) return;

  if (window.db.removeReservation) {
    window.db.removeReservation(resId);

    // Refresh Manager reservations view
    if (window.renderManagerDashboard && document.getElementById('manager-reservations-list')) {
      window.renderManagerDashboard('reservations');
    }

    alert('✅ Reservación eliminada');
  } else {
    alert('❌ Error al eliminar');
  }
};

// Manager Check-In: Show Inline Form
window.showManagerCheckInForm = function (resId) {
  // Hide all other forms first
  document.querySelectorAll('[id^="checkin-form-"]').forEach(form => {
    form.classList.add('hidden');
  });

  // Show this form
  const form = document.getElementById(`checkin-form-${resId}`);
  if (form) {
    form.classList.remove('hidden');
    // Focus on table input
    setTimeout(() => {
      document.getElementById(`table-input-${resId}`)?.focus();
    }, 100);
  }
};

window.cancelManagerCheckIn = function (resId) {
  const form = document.getElementById(`checkin-form-${resId}`);
  if (form) {
    form.classList.add('hidden');
    // Clear inputs
    const tableInput = document.getElementById(`table-input-${resId}`);
    const waiterSelect = document.getElementById(`waiter-select-${resId}`);
    if (tableInput) tableInput.value = '';
    if (waiterSelect) waiterSelect.value = '';
  }
};

window.confirmManagerCheckInInline = function (resId) {
  const tableNum = document.getElementById(`table-input-${resId}`).value;
  const waiterId = document.getElementById(`waiter-select-${resId}`).value;

  if (!tableNum || !waiterId) {
    alert('Por favor ingresa el número de mesa y selecciona un mesero');
    return;
  }

  const branchId = STATE.branch?.id;

  // Check if table is occupied
  if (window.db.isTableOccupied(parseInt(tableNum), branchId)) {
    alert(`❌ La mesa ${tableNum} ya está ocupada. Por favor elige otra mesa.`);
    return;
  }

  const allRes = window.db.getReservations(branchId);
  const res = allRes.find(r => r.id === resId);

  if (!res) {
    alert('Error: Reservación no encontrada');
    return;
  }

  // Create visit data
  const visitData = {
    table: parseInt(tableNum),
    waiterId: waiterId,
    customerName: res.customerName,
    pax: res.pax,
    branchId: branchId,
    status: 'active'
  };

  // Create visit
  const newVisit = window.db.createVisit(visitData);

  // Mark reservation as completed
  window.db.updateReservation(resId, {
    status: 'completed',
    completedAt: new Date().toISOString()
  });

  // Hide form
  cancelManagerCheckIn(resId);

  // Refresh Manager dashboard
  if (window.renderManagerDashboard) {
    window.renderManagerDashboard('reservations');
  }

  alert(`✅ Mesa ${tableNum} asignada a ${res.customerName}`);
};

// ==========================================
// MANAGER RESERVATIONS TAB (FULL CRUD)
// ==========================================
function renderManagerReservationsTab(container) {
  // Default Date: Today
  const todayStr = new Date().toLocaleDateString('en-CA');
  // Check if a date is already stored in a global/temp state or use today
  // For now, we'll just re-read the input if it exists, or default
  let currentDate = todayStr;
  const existingInput = document.getElementById('manager-date-filter');
  if (existingInput) currentDate = existingInput.value;

  container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-black text-white italic tracking-tighter">ADMINISTRAR RESERVACIONES</h2>
          <button onclick="toggleReservationForm()" class="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-black shadow-lg flex items-center gap-2 transform active:scale-95 transition">
            🎟️ CREAR RESERVACIÓN
          </button>
      </div>

      <!-- DATE FILTER FOR MANAGER -->
      <div class="bg-gray-800 p-4 rounded-xl mb-6 shadow-lg border border-gray-700">
        <label class="text-gray-400 text-xs font-bold uppercase mb-2 block">📅 Filtrar por Fecha:</label>
        <input type="date" id="manager-date-filter" 
               class="w-full bg-black border border-gray-600 rounded p-3 text-white font-bold focus:border-yellow-500 outline-none" 
               value="${currentDate}" 
               onchange="renderManagerReservationsTab(document.getElementById('manager-content'))">
      </div>

      <!-- INLINE RESERVATION FORM (ACCORDION STYLE) -->
      <div id="reservation-form-container" class="hidden bg-gray-900 border border-yellow-500/30 rounded-xl p-4 mb-6 shadow-2xl animate-fade-in relative">
          <div class="absolute top-0 left-0 w-1 h-full bg-yellow-500 rounded-l-xl"></div>
          <h3 class="text-lg font-black text-yellow-500 mb-4 flex items-center gap-2">
            📝 NUEVA RESERVACIÓN
          </h3>

          <div class="space-y-4">
              <div>
                <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Nombre Cliente</label>
                <div class="relative">
                  <input type="text" id="res-name" 
                         class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none font-bold placeholder-gray-600" 
                         placeholder="🔍 Buscar Cliente..." 
                         autocomplete="off"
                         onkeyup="searchCustomerForManager(this.value)">
                  
                  <!-- Search Results Container: RELATIVE to push content down, not absolute overlay -->
                  <div id="res-search-results" class="hidden w-full bg-black border border-yellow-500/50 rounded-lg mt-2 mb-4 overflow-hidden relative shadow-md"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Fecha</label>
                  <input type="date" id="res-date" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white outline-none">
                </div>
                <div>
                  <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Hora</label>
                  <input type="time" id="res-time" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white outline-none">
                </div>
              </div>

               <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Pax</label>
                    <input type="number" id="res-pax" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white outline-none" value="2">
                 </div>
                 <div>
                    <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Teléfono (10 dígitos)</label>
                    <input type="tel" id="res-phone" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white outline-none" placeholder="##########" maxlength="10">
                 </div>
              </div>

              <div>
                <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Observaciones (Opcional)</label>
                <textarea id="res-notes" rows="2" maxlength="50" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white outline-none resize-none" placeholder="Ej. Mesa en terraza, cumpleaños... (Max 50)"></textarea>
              </div>

              <div>
                <label class="block text-xs uppercase text-gray-400 font-bold mb-1 flex justify-between">
                    Categoría VIP (Auto)
                    <span id="res-vip-display" class="text-yellow-500">Normal</span>
                </label>
                <!-- VIP BUTTONS REMOVED AS REQUESTED -->
                <input type="hidden" id="res-vip" value="">
                <p class="text-[10px] text-gray-500 mt-1 italic">* La categoría se asigna automáticamente al buscar el cliente.</p>
              </div>

              <div>
                <label class="block text-xs uppercase text-gray-400 font-bold mb-1">Motivo / Partido</label>
                <select id="res-reason" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white mb-2" onchange="toggleResGameDisplay(this)">
                  <option value="Comer" selected>A Comer / Cenar</option>
                  <option value="Tragos">A Beber</option>
                  <option value="Partido">Ver Partido</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Negocios">Negocios</option>
                </select>

                <div id="res-game-container" class="hidden">
                  <select id="res-game" class="w-full bg-black/50 border border-gray-700 rounded p-3 text-white text-sm">
                    <!-- Populated dynamically -->
                  </select>
                </div>
              </div>

              <div class="flex gap-3 mt-4">
                 <button onclick="toggleReservationForm()" class="flex-1 bg-gray-800 text-gray-400 font-bold py-3 rounded-lg hover:bg-gray-700">CANCELAR</button>
                 <button onclick="submitManagerReservation()" class="flex-[2] bg-yellow-600 hover:bg-yellow-500 text-black font-black py-3 rounded-lg shadow-lg transform active:scale-95 transition">
                    💾 GUARDAR
                 </button>
              </div>
          </div>
      </div>

      <!-- RESERVATIONS LIST (Hostess-style format with proper scroll) -->
      <div class="card">
        <div id="manager-reservations-list" class="space-y-3">
          <!-- Injected via renderManagerReservations() logic but customized for full page -->
        </div>
      </div>
    `;

  // Generate Game Options
  const gameSelect = container.querySelector('#res-game');
  if (window.generateGameOptions && gameSelect) {
    gameSelect.innerHTML = window.generateGameOptions('');
  }

  // Re-use the list renderer but point to our new container
  const listContainer = container.querySelector('#manager-reservations-list');

  const branchId = STATE.branch?.id;

  let reservations = (window.db.getReservations && branchId)
    ? window.db.getReservations(branchId, currentDate)
    : [];

  // FILTER OUT COMPLETED RESERVATIONS (The fix)
  if (reservations.length > 0) {
    reservations = reservations.filter(r => r.status && r.status !== 'completed' && r.status !== 'cancelled');
  }

  if (reservations.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-12 opacity-50">
                <div class="text-6xl mb-4">📭</div>
                <p class="text-xl text-gray-400">No hay reservaciones para:<br><span class="text-yellow-500 font-bold">${currentDate}</span></p>
            </div>
      `;
  } else {
    // Sort: Date then Time
    reservations.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeVal = currentHours * 60 + currentMinutes;
    // Use the SELECTED DATE for "Today" comparison logic
    // If selected date != real today, we shouldn't show "late" status based on current time,
    // but for simplicity we kept the logic. Ideally we check if date === realToday.
    const realToday = new Date().toLocaleDateString('en-CA');

    listContainer.innerHTML = reservations.map(r => {
      // Traffic Light Logic (Same as Hostess)
      const [resH, resM] = r.time.split(':').map(Number);
      const resTimeVal = resH * 60 + resM;
      const diff = currentTimeVal - resTimeVal;

      let statusColor = 'border-green-500';
      let statusIcon = '🟢';
      let statusText = 'A Tiempo';

      // Only apply traffic light if looking at TODAY's reservations
      if (r.date === realToday) {
        if (diff > 30) {
          statusColor = 'border-red-600';
          statusIcon = '🔴';
          statusText = 'Vencida (>30min)';
        } else if (diff > 0) {
          statusColor = 'border-yellow-500';
          statusIcon = '🟡';
          statusText = 'Retraso Permitido';
        }
      } else if (r.date < realToday) {
        statusColor = 'border-red-900';
        statusIcon = '⚫';
        statusText = 'Fecha Pasada';
      }

      return `
      <div class="bg-gray-800 p-4 rounded-xl border-l-4 ${statusColor} shadow-lg relative animate-fade-in group">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-black text-xl uppercase tracking-tight text-white">${r.customerName}</span>
                            ${r.vip === 'diamond' ? '<span class="bg-blue-900 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500">DIAMOND</span>' : r.vip === 'blazin' ? '<span class="bg-orange-900 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500">BLAZIN</span>' : ''}
                        </div>

                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                        <div class="flex items-center gap-1"><span class="text-white">📅</span> ${r.date} ${r.time}</div>
                        <div class="flex items-center gap-1"><span class="text-white">👥</span> ${r.pax} pax</div>
                        ${r.phone ? `<div class="flex items-center gap-1 text-blue-300"><span class="text-white">📞</span> ${r.phone}</div>` : ''}
                        </div>
                    </div>
                    
                     <div class="text-right">
                        <div class="text-xs font-bold text-gray-400 mb-1">${statusIcon} ${statusText}</div>
                    </div>
                  </div>

                  <div class="text-sm text-gray-500 italic truncate max-w-[300px] mb-2">${r.game || r.reason || 'Sin motivo'}</div>
                  ${r.notes ? `<div class="bg-black/30 p-2 rounded text-xs text-yellow-200 mb-3 border border-yellow-900/30">📝 ${r.notes}</div>` : ''}
                  
                  <!-- MANAGER CHECK-IN EXPANDABLE FORM -->
                  <div id="checkin-form-${r.id}" class="hidden bg-gray-800/50 p-4 rounded-lg border border-yellow-600/30 mb-3">
                    <p class="text-yellow-500 text-sm font-bold mb-3">✅ ASIGNAR MESA</p>
                    
                    <div class="mb-3">
                      <label class="text-gray-400 text-xs font-bold block mb-1">Número de Mesa:</label>
                      <input type="number" id="table-input-${r.id}" placeholder="Ej: 5" class="w-full bg-gray-900 text-white border border-gray-600 rounded p-2 focus:border-yellow-500 outline-none text-center text-xl font-bold" min="1">
                    </div>

                    <div class="mb-3">
                      <label class="text-gray-400 text-xs font-bold block mb-1">Mesero:</label>
                      <select id="waiter-select-${r.id}" class="w-full bg-gray-900 text-white border border-gray-600 rounded p-2 focus:border-yellow-500 outline-none">
                        <option value="">-- Selecciona --</option>
                        ${window.db.data.users.filter(u => u.role === 'waiter' && u.branchId === branchId).map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
                      </select>
                    </div>

                    <div class="flex gap-2">
                      <button onclick="confirmManagerCheckInInline('${r.id}')" class="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded font-bold text-sm">
                        ✅ CONFIRMAR
                      </button>
                      <button onclick="cancelManagerCheckIn('${r.id}')" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded font-bold text-sm">
                        ❌ CANCELAR
                      </button>
                    </div>
                  </div>

                  <!-- MANAGER CHECK-IN BUTTON -->
                  <button onclick="showManagerCheckInForm('${r.id}')" class="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-black shadow-lg transform active:scale-95 transition mb-2">
                    ✅ ASIGNAR MESA
                  </button>

                  <!-- MANAGER DELETE BUTTON -->
                  <button onclick="window.deleteReservation('${r.id}')" class="w-full bg-red-900/20 text-red-500 py-2 rounded-lg hover:bg-red-900/40 transition font-bold border border-red-900/30" title="Eliminar Reservación">
                    🗑️ ELIMINAR
                  </button>
      </div>
    `}).join('');
  }
};

// NEW: Render Hostess Reservation List
window.renderHostessReservationList = function (dateFilter) {
  const listContainer = document.getElementById('hostess-reservations-list');
  if (!listContainer) return;

  // Default to today if no date provided
  if (!dateFilter) {
    // Try to get the input value first, if empty then use today
    const input = document.getElementById('hostess-date-filter');
    if (input && input.value) {
      dateFilter = input.value;
    } else {
      dateFilter = new Date().toLocaleDateString('en-CA');
      if (input) input.value = dateFilter;
    }
  }

  const branchId = STATE.branch?.id;
  // Get all reservations either by passing branchId or without it to see all
  let reservations = window.db.getReservations ? window.db.getReservations(branchId) : [];

  if (reservations.length > 0) {
    // Use startsWith just in case there are timestamps in the date
    reservations = reservations.filter(r => r.date.startsWith(dateFilter));
  }

  if (reservations.length === 0) {
    listContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">📅</div>
                <p>No hay reservaciones para: ${dateFilter}</p>
            </div>
        `;
    return;
  }

  reservations.sort((a, b) => a.time.localeCompare(b.time));
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeVal = currentHours * 60 + currentMinutes;
  const realToday = new Date().toLocaleDateString('en-CA');

  listContainer.innerHTML = reservations.map(r => {
    const [resH, resM] = r.time.split(':').map(Number);
    const resTimeVal = resH * 60 + resM;
    const diff = currentTimeVal - resTimeVal;

    let statusColor = 'border-green-500';
    let statusIcon = '🟢';
    let statusText = 'A Tiempo';

    if (r.date === realToday) {
      if (diff > 30) {
        statusColor = 'border-red-600';
        statusIcon = '🔴';
        statusText = 'Vencida (>30min)';
      } else if (diff > 0) {
        statusColor = 'border-yellow-500';
        statusIcon = '🟡';
        statusText = 'Retraso Permitido';
      }
    } else if (r.date < realToday) {
      statusColor = 'border-red-900';
      statusIcon = '⚫';
      statusText = 'Fecha Pasada';
    }

    return `
        <div class="bg-gray-800 p-4 rounded-xl border-l-4 ${statusColor} shadow-lg relative animate-fade-in group">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <div class="flex items-center gap-2">
                         <span class="font-black text-lg text-white uppercase">${r.customerName}</span>
                         ${r.vip ? `<span class="bg-yellow-900 text-yellow-500 text-[10px] px-2 rounded border border-yellow-600 font-bold">${r.vip.toUpperCase()}</span>` : ''}
                    </div>
                    <div class="text-sm text-gray-400 mt-1 flex flex-wrap items-center gap-3">
                        <span>🕒 ${r.time}</span>
                        <span>👥 ${r.pax} pax</span>
                        ${r.phone ? `<span>📞 ${r.phone}</span>` : ''}
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-bold text-gray-400 mb-1">${statusIcon} ${statusText}</div>
                    ${diff > 30 && r.date === realToday ? '<span class="text-[10px] text-red-400 font-bold">CANCELAR?</span>' : ''}
                </div>
            </div>

            ${r.notes ? `<div class="bg-black/30 p-2 rounded text-xs text-yellow-200 mb-3 border border-yellow-900/30">📝 ${r.notes}</div>` : ''}

            <button onclick="checkInReservation('${r.id}')" class="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-2 rounded-lg shadow-md uppercase tracking-wide text-sm flex items-center justify-center gap-2">
                ✅ Check-In / Asignar Mesa
            </button>
        </div>
        `;
  }).join('');
};

// Toggle Helper
window.toggleReservationForm = function () {
  const form = document.getElementById('reservation-form-container');
  form.classList.toggle('hidden');

  if (!form.classList.contains('hidden')) {
    // Reset form when opening
    document.getElementById('res-name').value = '';
    document.getElementById('res-date').value = new Date().toLocaleDateString('en-CA'); // Default Today
    document.getElementById('res-pax').value = '2';
    document.getElementById('res-time').value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('res-phone').value = '';
    document.getElementById('res-notes').value = '';

    // Populate games
    const gameSelect = document.getElementById('res-game');
    if (window.generateGameOptions) {
      gameSelect.innerHTML = window.generateGameOptions('');
    }
  }
};

// --- Waiter Stats Modal ---
// Removed old floating waiter stats modal logic

// ------ HOSTESS DASHBOARD (TABBED UI) ------
window.renderHostessDashboard = function () {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  // FETCH DATA
  const waitlist = window.db.getWaitlist(STATE.branch.id);
  const activeVisits = window.db.getVisits().filter(v => ['seated', 'active'].includes(v.status));
  const reservations = window.db.getReservations ? window.db.getReservations() : [];

  // Calculate stats
  const totalCapacity = window.calculateTotalChairs();
  const currentCount = activeVisits.reduce((sum, v) => sum + parseInt(v.pax || 0), 0);

  const div = document.createElement('div');
  div.innerHTML = `
                <header class="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-40" style="background-color: #000000; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
                  <div>
                    <h1 class="text-2xl font-black text-white italic tracking-tighter">RECEPCIÓN</h1>
                    <div class="text-[10px] text-gray-400 font-mono tracking-widest">${STATE.branch ? STATE.branch.name.toUpperCase() : 'JURIQUILLA'}</div>
                  </div>
                  <button onclick="handleLogout()" class="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded border border-gray-700">CERRAR SESIÓN</button>
                </header>


                <!-- Tab Content: Check-In (Default) -->
  <div id="content-checkin" class="tab-content">
    <div class="card border border-yellow-500/30" style="background-color: #111827;">
      <h2 class="text-xl font-black text-white mb-6 flex items-center gap-2">
        📋 NUEVO CHECK-IN
      </h2>

      <!-- Step 1: Customer Info -->
      <div class="space-y-4 mb-6">
        <label class="text-xs text-gray-500 mb-1 block uppercase font-bold tracking-widest">Paso 1: Datos del Cliente</label>

        <!-- Search Bar (New Client Flow) -->
        <div class="relative">
          <input type="text" id="customer-search"
            class="w-full bg-black border border-gray-700 rounded-lg p-4 text-white text-lg font-bold focus:border-yellow-500 outline-none"
            placeholder="🔍 Buscar Cliente (Nombre/Tel)" onkeyup="searchCustomer(this.value)">

            <div id="search-results" class="hidden absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-lg mt-1 z-50 max-h-60 overflow-y-auto shadow-2xl"></div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <input type="text" id="h-firstname" placeholder="NOMBRE" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide">
            <input type="text" id="h-lastname" placeholder="APELLIDO PATERNO" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide">
            </div>
            <input type="text" id="h-lastname2" placeholder="APELLIDO MATERNO (Opcional)" class="bg-gray-900 text-white border border-gray-700 rounded p-4 uppercase font-bold text-sm tracking-wide w-full">
            <input type="tel" id="h-phone-input" placeholder="TELÉFONO O WHATSAPP (Recomendado)" class="bg-gray-900 text-white border border-gray-700 rounded p-4 font-bold text-sm tracking-wide w-full mt-2">

              <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400 text-sm font-bold uppercase">PERSONAS:</span>
                  <div class="flex items-center gap-4">
                    <button onclick="adjustPax(-1)" class="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600">-</button>
                    <span id="h-pax" class="text-2xl font-black text-white">2</span>
                    <button onclick="adjustPax(1)" class="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600">+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Assign Table -->
            <div class="space-y-4">
              <label class="text-xs text-gray-500 mb-1 block uppercase font-bold tracking-widest">Paso 2: Asignación</label>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-[10px] text-gray-500 mb-1 block uppercase">Mesa #</label>
                  <input type="number" id="h-table" class="w-full bg-gray-900 text-white border border-gray-700 rounded p-4 text-center font-bold text-xl focus:border-green-500 outline-none" placeholder="#">
                </div>
                <div>
                  <label class="text-[10px] text-gray-500 mb-1 block uppercase">Mesero</label>
                  <select id="h-waiter" class="w-full bg-gray-900 text-white border border-gray-700 rounded p-4 font-bold text-sm h-[62px]">
                    <option value="" disabled selected>Seleccionar Mesero...</option>
                    ${window.db.data.users.filter(u => u.role === 'waiter' && (!u.branchId || u.branchId === STATE.branch.id)).map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
                  </select>
                </div>
              </div>

              <button onclick="processHostessCheckIn()" class="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-5 rounded-xl uppercase tracking-widest text-lg shadow-lg transform active:scale-95 transition mt-4">
                ✅ INGRESAR MESA
              </button>

              <button onclick="handleAddToWaitlist()" class="w-full bg-gray-800 border-2 border-gray-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-sm hover:border-blue-500 transition mt-2">
                ⏱️ Agregar a Lista de Espera
              </button>
            </div>
        </div>
      </div>

      <!-- Tab Content: Tables (Active Visits) -->
      <div id="content-tables" class="tab-content hidden pb-24">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-black text-white italic tracking-tighter">MESAS HABILITADAS</h2>

            <div class="text-right">
              <div class="text-yellow-500 font-bold text-xl leading-none">${currentCount} / ${totalCapacity}</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-widest">Ocupación</div>
            </div>
          </div>

          <!-- Filter / Waiter Tables Inline Toggle -->
          <div class="mb-4">
            <button onclick="window.toggleWaiterTablesInline()" class="w-full bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 rounded-lg p-3 text-white font-bold transition flex items-center justify-center gap-2">
              📊 MESAS POR MESERO
            </button>
            <div id="inline-waiter-tables" class="hidden mt-4 transition-all duration-300"></div>
          </div>

          ${activeVisits.length === 0 ? `
          <div class="text-center py-12 text-gray-500">
             <div class="text-6xl mb-4">🍽️</div>
             <p>No hay mesas activas</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${activeVisits.map(v => {
    const waiterName = window.db.data.users.find(w => w.id === v.waiterId)?.name || 'Sin Asignar';
    const timeToFormat = v.startTime || v.entryTime || v.date;
    const timeSeated = timeToFormat ? new Date(timeToFormat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'NA';

    // Calcular tiempo transcurrido
    const startTimeDate = new Date(timeToFormat);
    const diffMins = Math.floor((new Date() - startTimeDate) / 60000);
    const timeElapsed = isNaN(diffMins) ? '' : (diffMins > 60 ? `${Math.floor(diffMins / 60)}h ${diffMins % 60}m` : `${diffMins}m`);

    const custName = v.customer ? (v.customer.firstName + ' ' + (v.customer.lastName || '')).trim() : (v.customerName || 'Cliente');
    return `
              <div class="table-card bg-gray-900 border-l-4 border-green-500 rounded-r-xl p-4 shadow-lg relative animate-fade-in" data-waiter-id="${v.waiterId}">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Mesa</span><span class="text-3xl font-black text-white shadow-text leading-none">${v.table}</span>
                        <div class="text-xs text-gray-400 font-mono mt-1">
                            🕒 ${timeSeated}
                            ${timeElapsed ? `<span class="ml-2 text-yellow-500 font-bold">⏱️ ${timeElapsed}</span>` : ''}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300 border border-gray-700 mb-1 inline-block">
                           👤 ${waiterName.split(' ')[0]}
                        </div>
                        <div class="text-xl font-bold text-white">${v.pax} <span class="text-sm font-normal text-gray-500">pax</span></div>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-3 mt-2">
                    <div class="font-bold text-white text-lg truncate mb-1 flex items-center gap-2">
                      ${v.isFavoriteTeamMatch && v.watchedTeam ? (() => {
        const fl = window.getTeamLogo(v.watchedTeam);
        return fl ? `<img src="${fl}" style="width:28px;height:28px;max-width:28px;max-height:28px;" class="object-contain rounded border border-yellow-500 bg-black flex-shrink-0" title="${v.watchedTeam}">` : '';
      })() : `<div id="h-fav-logo-${v.id}" class="flex-shrink-0"></div>`}
                      <span class="truncate">${custName}</span>
                    </div>
                    ${v.vip ? `<div class="inline-block bg-yellow-600/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded border border-yellow-600/50 mb-2 font-bold tracking-wider">VIP ${v.vip.toUpperCase()}</div>` : ''}
                    ${v.reason && v.reason !== 'Casual' ? `<div id="motivo-badge-${v.id}" class="text-[11px] text-yellow-400 font-bold mt-1 mb-1 truncate">📌 ${v.reason}${v.gameName ? ': ' + v.gameName : ''}</div>` : '<div id="motivo-badge-${v.id}" class="hidden text-[11px] text-yellow-400 font-bold mt-1 mb-1 truncate"></div>'}
                    
                    <button onclick="document.getElementById('edit-visit-${v.id}').classList.toggle('hidden')" class="w-full text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 py-2 rounded mt-2 border border-gray-700 transition">
                       ⚡ GESTIONAR
                    </button>
                    
                    <!-- Hidden Editor -->
                    <div id="edit-visit-${v.id}" class="hidden mt-3 space-y-2 bg-black/20 p-2 rounded border border-gray-800">
                        <!-- Cambio Mesa -->
                        <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                            <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesa</div>
                            <div class="flex gap-2">
                               <input type="number" id="new-table-${v.id}" placeholder="#" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-center font-bold text-lg" min="1">
                               <button onclick="doChangeTable('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                            </div>
                        </div>
                        <!-- Cambio Mesero -->
                         <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                            <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Cambiar Mesero</div>
                            <div class="flex gap-2">
                               <select id="new-waiter-${v.id}" class="bg-gray-900 text-white border border-gray-700 rounded p-3 w-full text-sm font-bold truncate">
                                  ${window.db.data.users.filter(u => u.role === 'waiter' && (!u.branchId || u.branchId === STATE.branch.id)).map(w => `<option value="${w.id}" ${w.id === v.waiterId ? 'selected' : ''}>${w.name}</option>`).join('')}
                               </select>
                               <button onclick="doChangeWaiter('${v.id}')" class="bg-blue-600 text-white rounded px-4 font-bold hover:bg-blue-500 text-xl">✓</button>
                            </div>
                        </div>
                        
                        <!-- Motivo de Visita (NUEVO PESTAÑA MESAS) -->
                         <div class="bg-black/40 p-3 rounded-lg border border-gray-800">
                            <div class="text-[10px] text-gray-500 uppercase font-bold mb-2">Motivo / Partido</div>
                            <select id="h-reason-${v.id}" onchange="window.handleHostessReasonChange(this, '${v.id}')" class="w-full bg-gray-900 text-white border border-gray-700 rounded p-2 text-sm font-bold focus:border-yellow-500 mb-2">
                              <option value="Casual" ${v.reason === 'Casual' ? 'selected' : ''}>Casual</option>
                              <option value="Comer" ${v.reason === 'Comer' ? 'selected' : ''}>🍽️ A Comer / Cenar</option>
                              <option value="Beber" ${v.reason === 'Beber' ? 'selected' : ''}>🍻 A Beber</option>
                              <option value="Partido" ${v.reason === 'Partido' ? 'selected' : ''}>⚽ Ver un Partido</option>
                              <option value="Cumpleaños" ${v.reason === 'Cumpleaños' ? 'selected' : ''}>🎂 Cumpleaños</option>
                              <option value="Negocios" ${v.reason === 'Negocios' ? 'selected' : ''}>💼 Negocios</option>
                            </select>
                            
                            <div id="h-game-flow-${v.id}" class="${v.reason === 'Partido' ? '' : 'hidden'} animate-fade-in mt-2 border-t border-gray-700 pt-2 pb-2">
                               <div id="h-games-container-${v.id}" class="space-y-2 max-h-40 overflow-y-auto mb-2">
                                  <!-- Inyectado por JS -->
                               </div>
                               <input type="hidden" id="h-selected-game-${v.id}" value="${v.gameName || ''}">
                               <input type="hidden" id="h-selected-league-${v.id}" value="${v.league || ''}">
                               
                               <!-- Botón para Mostrar Formulario Manual -->
                               <button onclick="document.getElementById('manual-game-form-${v.id}').classList.toggle('hidden')" class="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 py-1.5 rounded text-xs font-bold border border-gray-600 mb-2">
                                  ➕ El partido no está en la lista (Manual)
                               </button>

                               <!-- Formulario Detallado Manual (Oculto) -->
                               <div id="manual-game-form-${v.id}" class="hidden bg-gray-900 border border-yellow-700/50 p-2 text-xs rounded-lg space-y-2 mt-2">
                                  <label class="text-[10px] text-yellow-500 font-bold uppercase block mb-1">Registro Manual</label>
                                  
                                  <select id="manual-league-${v.id}" class="w-full bg-black text-white p-2 rounded border border-gray-700 focus:border-yellow-500" onchange="window.updateHostessGameForm('${v.id}')">
                                      <option value="Liga MX">⚽ Liga MX</option>
                                      <option value="NFL">🏈 NFL</option>
                                      <option value="NBA">🏀 NBA</option>
                                      <option value="MLB">⚾ MLB</option>
                                      <option value="Champions">⚽ Champions</option>
                                      <option value="MLS">⚽ MLS</option>
                                      <option value="UFC">🥊 UFC</option>
                                      <option value="Boxeo">🥊 Boxeo</option>
                                      <option value="F1">🏎️ F1</option>
                                      <option value="Tenis">🎾 Tenis</option>
                                      <option value="Otro">Otro</option>
                                  </select>

                                  <div id="manual-fields-${v.id}">
                                    <input type="text" id="manual-home-${v.id}" list="team-suggestions" placeholder="Local / Principal" class="w-full bg-black text-white p-2 rounded border border-gray-700 focus:border-yellow-500">
                                    <input type="text" id="manual-away-${v.id}" list="team-suggestions" placeholder="Visitante (si aplica)" class="w-full bg-black text-white p-2 rounded border border-gray-700 focus:border-yellow-500 mt-1">
                                  </div>
                                  
                                  <button onclick="window.saveManualGameHostess('${v.id}')" class="w-full bg-blue-600/50 hover:bg-blue-600 text-white font-bold py-2 rounded mt-1 transition">
                                      Vincular Partido
                                  </button>
                               </div>
                                <!-- Panel: ¿Equipo Favorito? (aparece al seleccionar un partido) -->
                                <div id="h-fav-team-panel-${v.id}" class="hidden animate-fade-in mt-2 border border-yellow-500/30 bg-yellow-900/10 rounded-lg p-2">
                                  <div class="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-2">⭐ ¿Viene a ver a su equipo favorito?</div>
                                  <div id="h-fav-team-btns-${v.id}" class="flex gap-2"></div>
                                  <button onclick="window.selectHostessFavoriteTeam('', '${v.id}')" class="mt-2 w-full text-[10px] text-gray-500 hover:text-white py-1 rounded border border-gray-700 hover:border-gray-500 transition">No, solo ve el partido</button>
                                </div>
                             </div>
                            

                        </div>
                    </div>

                    <button onclick="window.confirmAndRelease('${v.id}')"
                        class="w-full bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-700/50 font-bold py-3 rounded-lg mb-4 uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        🆓 FINALIZAR VISITA / LIBERAR MESA
                    </button>
                </div>
                
                <div id="table-status-${v.id}" class="hidden mt-2 p-3 rounded text-center text-lg font-bold animate-pulse text-yellow-400"></div>
              </div>
            `}).join('')}
          </div>
        `}
        </div>
      </div>

      <!-- Tab Content: Waitlist - TAB SEPARADO -->
      <div id="content-waitlist" class="tab-content hidden">
        <div class="card">
          <h3 class="text-xl mb-4">Cola de Espera (${waitlist.length})</h3>
          ${waitlist.length === 0 ? `
          <div class="text-center py-12">
            <div class="text-6xl mb-4">⏱️</div>
            <p class="text-xl text-secondary">No hay clientes en espera</p>
            <p class="text-sm text-secondary mt-2">Usa "Agregar a Lista de Espera" desde Check-In</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${waitlist.map((entry, idx) => `
              <div class="bg-yellow-900/20 border-2 border-yellow-500 p-4 rounded-lg hover:bg-yellow-900/30 transition">
                <div class="flex items-start gap-3 mb-3">
                  <span class="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    ${idx + 1}
                  </span>
                  <div class="flex-1">
                    <div class="font-bold text-xl mb-1">${entry.customerName}</div>
                    <div class="text-base text-gray-300">${entry.pax} personas</div>
                    <div class="text-sm text-gray-400">${entry.phone || 'Sin teléfono'}</div>
                    <div class="text-xs text-gray-500 mt-1">🕐 ${new Date(entry.addedAt).toLocaleTimeString()}</div>
                  </div>
                </div>
                <!-- ASIGNACIÓN INLINE -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <input type="number" id="wl-table-${entry.id}" placeholder="Mesa #" 
                         class="p-2 text-xl bg-gray-900 rounded font-bold text-center border border-green-600" 
                         style="min-width: 80px;" min="1">
                  <select id="wl-waiter-${entry.id}" class="p-2 text-sm bg-gray-900 rounded font-bold border border-green-600">
                    <option value="">Mesero</option>
                    ${window.db.data.users.filter(u => u.role === 'waiter' && (!u.branchId || u.branchId === STATE.branch.id)).map(w =>
        `<option value="${w.id}">${w.name}</option>`
      ).join('')}
                  </select>
                </div>
                <!-- BOTONES DE ACCIÓN -->
                <div class="flex gap-2">
                  <button onclick="doAssignFromWaitlist('${entry.id}')" 
                          class="btn-primary flex-1 text-base py-3 font-bold">
                    ✅ ASIGNAR
                  </button>
                  <button onclick="removeFromWaitlist('${entry.id}')" 
                          class="btn-secondary text-sm px-3 py-2 bg-red-900 hover:bg-red-800 whitespace-nowrap">
                    ❌
                  </button>
                </div>
                <!-- STATUS MESSAGE -->
                <div id="wl-status-${entry.id}" class="hidden mt-2 p-2 rounded text-center text-sm font-bold"></div>
              </div>
            `).join('')}
          </div>
        `}
        </div>
      </div>

      <!-- Tab Content: Reservations -->
      <div id="content-reservations" class="tab-content hidden pb-24">
        <div class="card">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-white">Reservaciones</h3>
                <input type="date" id="hostess-date-filter" class="bg-gray-800 text-white border border-gray-700 rounded p-2 text-sm font-bold" value="${new Date().toLocaleDateString('en-CA')}" onchange="renderHostessReservationList(this.value)">
            </div>
            
            <div id="hostess-reservations-list" class="space-y-3">
                <!-- Injected via renderHostessReservationList -->
            </div>
        </div>
      </div>
      
      <!-- Tab Content: Map -->
      <div id="content-map" class="tab-content hidden pb-24">
        <div class="card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-black text-white italic tracking-tighter">MAPA DE MESAS</h2>
                <div class="text-right">
                  <div class="text-yellow-500 font-bold text-xl leading-none" id="map-chairs-available">-- / --</div>
                  <div class="text-[10px] text-gray-400 uppercase tracking-widest">Sillas Disp.</div>
                </div>
            </div>
            
            <div id="restaurant-map-container" class="w-full overflow-x-auto bg-black p-4 rounded-xl border border-gray-800">
                <!-- Map rendered here -->
            </div>
        </div>
      </div>

     <!-- BOTTOM NAVIGATION BAR -->
     <nav style="
       position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
       background: #000;
       border-top: 1px solid #222;
       display: flex;
       height: 58px;
       padding-bottom: env(safe-area-inset-bottom, 0px);
     ">
       <button onclick="switchHostessTab('checkin')" id="tab-checkin"
         style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                background:none; border:none; border-top: 2px solid #fff; cursor:pointer; padding: 6px 0 4px;">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>
         <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#fff; font-family:'Inter',sans-serif; text-transform:uppercase;">Check-In</span>
       </button>
       <button onclick="switchHostessTab('tables')" id="tab-tables"
         style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                background:none; border:none; border-top: 2px solid transparent; cursor:pointer; padding: 6px 0 4px; position:relative;">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 6V4m8 2V4M3 10h18"/></svg>
         <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Mesas</span>
         ${activeVisits.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;">` + activeVisits.length + `</span>` : ''}
       </button>
       <button onclick="switchHostessTab('map')" id="tab-map"
         style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                background:none; border:none; border-top: 2px solid transparent; cursor:pointer; padding: 6px 0 4px; position:relative;">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
         <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Mapa</span>
       </button>
       <button onclick="switchHostessTab('waitlist')" id="tab-waitlist"
         style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                background:none; border:none; border-top: 2px solid transparent; cursor:pointer; padding: 6px 0 4px; position:relative;">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
         <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Espera</span>
         ${waitlist.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;">` + waitlist.length + `</span>` : ''}
       </button>
       <button onclick="switchHostessTab('reservations')" id="tab-reservations"
         style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
                background:none; border:none; border-top: 2px solid transparent; cursor:pointer; padding: 6px 0 4px; position:relative;">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
         <span style="font-size:9px; font-weight:700; letter-spacing:0.1em; color:#555; font-family:'Inter',sans-serif; text-transform:uppercase;">Reservas</span>
         ${reservations.length > 0 ? `<span style="position:absolute;top:6px;right:calc(50% - 16px);background:#fff;color:#000;font-size:9px;font-weight:900;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;">` + reservations.length + `</span>` : ''}
       </button>
     </nav>

      <!-- DuckOS Footer -->
      <div class="dashboard-footer">
        Powered by <span style="color: #F97316;">DuckOS</span> | Bar & Restaurant Solutions
      </div>
      `;

  // Add class for bottom nav padding
  div.className = 'p-4 max-w-6xl mx-auto has-bottom-nav';
  appContainer.appendChild(div);

  // POST-RENDER INITIALIZATION
  // Render datalist globally for manual game inputs
  window.updateTeamDatalist();

  // Initialize game options for active tables if they already selected Partido
  activeVisits.forEach(v => {
    if (v.reason === 'Partido') {
      setTimeout(() => {
        window.renderTodaysGamesForHostess(v.id);
      }, 0);
    }
  });

  if (window.renderRestaurantMap) {
    window.renderRestaurantMap();
  }
}

// ===== SECCIÓN 5: VERSIONING + INIT + CACHE =====
// ==========================================
// ==========================================
// VERSION CHECK & AUTO-RELOAD
// ==========================================
const CURRENT_VERSION = '22.50';
console.log("🚀 App Loaded: v22.50");
const storedVersion = localStorage.getItem('app_version');

if (storedVersion && storedVersion !== CURRENT_VERSION) {
  console.log(`🔄 Version mismatch: ${storedVersion} → ${CURRENT_VERSION}. Clearing cache...`);

  // Clear localStorage except auth
  const authData = localStorage.getItem('adanEvaAuth');
  localStorage.clear();
  if (authData) localStorage.setItem('adanEvaAuth', authData);

  // Set new version
  localStorage.setItem('app_version', CURRENT_VERSION);

  // Force reload
  window.location.reload(true);
}

// Set version on first load
if (!storedVersion) {
  localStorage.setItem('app_version', CURRENT_VERSION);
}

// ==========================================
// EMERGENCY CACHE CLEAR (AVAILABLE IMMEDIATELY)
// ==========================================
window.emergencyCacheClear = function () {
  console.log('🚨 EMERGENCY CACHE CLEAR');

  // Save auth
  const authData = localStorage.getItem('adanEvaAuth');

  // Nuclear option: clear everything
  localStorage.clear();
  sessionStorage.clear();

  // Restore auth
  if (authData) {
    localStorage.setItem('adanEvaAuth', authData);
  }
  localStorage.setItem('app_version', '22.31');

  // Clear IndexedDB
  if (window.indexedDB) {
    indexedDB.databases().then(dbs => {
      dbs.forEach(db => {
        indexedDB.deleteDatabase(db.name);
        console.log('🗑️ Deleted:', db.name);
      });
    }).catch(e => console.warn('IndexedDB error:', e));
  }

  alert('✅ Caché eliminado completamente.\n\nRecargando...');
  setTimeout(() => window.location.reload(true), 500);
};

// ==========================================
// INITIALIZATION
// ==========================================
window.initApp = async function () {
  console.log('🚀 Initializing App...');

  // 1. Initialize DB
  if (!window.db) {
    console.error('❌ Database not found!');
    appContainer.innerHTML = '<div class="text-white p-10">Error critic: Base de datos no encontrada.</div>';
    return;
  }

  // 2. Auth Listener
  window.db.auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log('👤 User Authenticated:', user.uid);
      // Check existing user in local DB or fetch
      const dbUser = window.db.data.users.find(u => u.id === user.uid);
      if (dbUser) {
        STATE.user = dbUser;
        STATE.branch = window.db.data.branches.find(b => b.id === dbUser.branchId);
        console.log('🏢 Branch:', STATE.branch);

        // Render Dashboard based on Role
        if (STATE.user.role === 'hostess') {
          // START LISTENER FOR VISITS
          if (typeof window.db.addListener === 'function') {
            window.db.addListener(() => {
              if (typeof window.renderHostessDashboard === 'function') window.renderHostessDashboard();
              else if (typeof renderHostessDashboard === 'function') renderHostessDashboard();
            });
          }
          if (typeof window.renderHostessDashboard === 'function') window.renderHostessDashboard();
          else if (typeof renderHostessDashboard === 'function') renderHostessDashboard();
        } else if (STATE.user.role === 'manager' || STATE.user.role === 'admin') {
          if (typeof renderManagerDashboard === 'function') renderManagerDashboard('home');
        } else if (STATE.user.role === 'waiter') {
          if (typeof renderWaiterDashboard === 'function') renderWaiterDashboard();
        } else {
          appContainer.innerHTML = '<div class="text-white">Rol desconocido</div>';
        }
      } else {
        console.error('User not found in local DB data');
        if (typeof renderLogin === 'function') renderLogin();
      }
    } else {
      console.log('👤 No User. Rendering Login.');
      if (typeof renderLogin === 'function') renderLogin();
    }
  });
};

// Start
document.addEventListener('DOMContentLoaded', window.initApp);

// NEW: Render Game Requests
function renderManagerGameRequests(container) {
  if (!container) return;

  const requests = window.db.getDailyInfo().gameRequests || [];

  if (requests.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="card mb-4 bg-orange-900/20 border border-orange-500/50 shadow-lg">
      <h2 class="text-lg font-bold text-orange-400 flex items-center gap-2 mb-3">🔔 Solicitudes de Partido (<span class="text-white">${requests.length}</span>)</h2>
      <div class="space-y-3">
        ${requests.map((r) => `
          <div class="bg-black/40 p-3 rounded-lg border border-orange-500/30">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-bold text-white text-base">${r.gameName || r.name}</div>
                <div class="text-[10px] text-gray-400 mt-0.5">Solicitado: ${r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
              </div>
              <button onclick="window.db.removeGameRequest('${r.id}'); renderManagerDashboard('games');" class="text-red-400 hover:text-red-300 p-1 rounded transition text-sm">✕</button>
            </div>

            <!-- Quick Add Form -->
            <div id="quick-add-${r.id}" class="hidden bg-black/40 p-2 rounded border border-orange-800 mt-2 space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[9px] text-gray-500 uppercase font-bold block mb-1">Fecha</label>
                  <input type="date" id="req-date-${r.id}" value="${new Date().toLocaleDateString('en-CA')}" class="w-full bg-black text-white rounded p-1.5 text-sm border border-gray-700 focus:border-orange-500">
                </div>
                <div>
                  <label class="text-[9px] text-gray-500 uppercase font-bold block mb-1">Hora</label>
                  <input type="time" id="req-time-${r.id}" class="w-full bg-black text-white rounded p-1.5 text-sm border border-gray-700 focus:border-orange-500">
                </div>
              </div>
              <select id="req-league-${r.id}" class="w-full bg-black text-white rounded p-1.5 text-sm border border-gray-700 focus:border-orange-500">
                <option value="Liga MX">⚽ Liga MX</option>
                <option value="NFL">🏈 NFL</option>
                <option value="NBA">🏀 NBA</option>
                <option value="MLB">⚾ MLB</option>
                <option value="Champions">⚽ Champions</option>
                <option value="MLS">⚽ MLS</option>
                <option value="UFC">🥊 UFC</option>
                <option value="Boxeo">🥊 Boxeo</option>
                <option value="F1">🏎️ F1</option>
                <option value="Tenis">🎾 Tenis</option>
                <option value="Otro">Otro</option>
              </select>
              <button onclick="window.addRequestedGame('${r.id}', '${(r.gameName || r.name || '').replace(/'/g, "\\'")}')" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded text-sm transition">
                ✅ Agregar a Partidos de Hoy
              </button>
            </div>

            <button onclick="document.getElementById('quick-add-${r.id}').classList.toggle('hidden')"
                    class="w-full mt-2 bg-orange-900/40 hover:bg-orange-900/70 text-orange-300 font-bold py-1.5 rounded text-xs border border-orange-800 transition">
              📅 Agregar al Calendario
            </button>
          </div>
        `).join('')}
      </div>
    </div>`;
}


window.addRequestedGame = function (reqId, gameName) {
  const date = document.getElementById('req-date-' + reqId)?.value;
  const time = document.getElementById('req-time-' + reqId)?.value;
  const league = document.getElementById('req-league-' + reqId)?.value;

  if (!date || !time) {
    if (window.showToast) window.showToast('⚠️ Falta la fecha u hora', 'warning');
    return;
  }

  // Parse team names: handles "Away @ Home" or "Home vs Away" format
  let homeTeam = gameName;
  let awayTeam = '';
  if (gameName.includes(' @ ')) {
    const parts = gameName.split(' @ ');
    awayTeam = parts[0].trim();
    homeTeam = parts[1].trim();
  } else if (gameName.includes(' vs ')) {
    const parts = gameName.split(' vs ');
    homeTeam = parts[0].trim();
    awayTeam = parts[1].trim();
  }

  // Individual sports
  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
  const isIndividual = individualSports.includes(league);

  // Determine Sport from League map
  let sport = 'General';
  if (league.includes('NFL')) sport = 'Americano';
  else if (league.includes('NBA')) sport = 'Basquet';
  else if (league.includes('MLB')) sport = 'Beisbol';
  else if (league.includes('NHL')) sport = 'Hockey';
  else if (league.includes('LIGA') || league.includes('CHAMPIONS') || league.includes('MLS')) sport = 'Futbol';
  else if (league.includes('UFC') || league.includes('Boxeo')) sport = 'Peleas';
  else if (league.includes('F1')) sport = 'Automovilismo';
  else if (league.includes('Tenis')) sport = 'Tenis';

  const gameData = {
    league,
    date,
    time,
    sport
  };

  if (isIndividual) {
    gameData.match = gameName;
  } else {
    gameData.homeTeam = homeTeam;
    gameData.awayTeam = awayTeam;
  }

  window.db.addGame(gameData);
  window.db.removeGameRequest(reqId);

  if (window.showToast) window.showToast('✅ Partido "' + gameName + '" agregado al calendario', 'success');

  // Refresh games tab
  renderManagerDashboard('games');
};



// NEW: Render Reservations (Real Data)
function renderManagerReservations(container) {
  if (!container) return;

  const branchId = STATE.branch?.id;
  const today = new Date().toISOString().split('T')[0];
  const reservations = (window.db.getReservations && branchId)
    ? window.db.getReservations(branchId, today)
    : [];

  if (reservations.length === 0) {
    container.innerHTML = '<p class="text-gray-600 text-xs italic text-center py-4">No hay reservaciones para hoy.</p>';
    return;
  }

  container.innerHTML = reservations.map(r => `
      <div class="bg-gray-800 p-3 rounded-lg border-l-4 ${r.vip ? 'border-yellow-500' : 'border-gray-600'} flex justify-between items-center mb-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-white text-base">${r.customerName || 'Cliente'}</span>
            ${r.vip === 'diamond' ? '💎' : r.vip === 'blazin' ? '🔥' : ''}
          </div>
          <div class="text-xs text-gray-400">
            ${r.date || 'Hoy'} • ${r.time || '--:--'} • ${r.pax || 2} Pax
          </div>
          <div class="text-xs text-blue-300 mt-1">
            🎯 ${r.notes || '---'}
          </div>
        </div>
      </div>
      `).join('');
}

// ==========================================
// CACHE CLEAR FUNCTION (FOR MOBILE)
// ==========================================
window.clearAppCache = function () {
  if (!confirm('🧹 ¿Limpiar caché y datos locales?\n\nEsto borrará:\n- Datos en caché\n- Configuración local\n\nTu sesión se mantendrá activa.')) {
    return;
  }

  console.log('🧹 Clearing app cache...');

  // Save auth data
  const authData = localStorage.getItem('adanEvaAuth');

  // Clear localStorage
  localStorage.clear();
  console.log('✅ localStorage cleared');

  // Restore auth
  if (authData) {
    localStorage.setItem('adanEvaAuth', authData);
    localStorage.setItem('app_version', '22.30');
  }

  // Clear sessionStorage
  sessionStorage.clear();
  console.log('✅ sessionStorage cleared');

  // Clear IndexedDB (Firebase offline data)
  if (window.indexedDB) {
    indexedDB.databases().then(databases => {
      databases.forEach(db => {
        if (db.name.includes('firestore') || db.name.includes('firebase')) {
          indexedDB.deleteDatabase(db.name);
          console.log('✅ Deleted IndexedDB:', db.name);
        }
      });
    }).catch(e => console.warn('IndexedDB clear failed:', e));
  }

  alert('✅ Caché limpiado.\n\nLa página se recargará ahora.');

  // Force reload
  window.location.reload(true);
};


// ===== SECCIÓN 6: RESERVATION SUBMIT =====
// ==========================================
// MANAGER RESERVATION LOGIC (v22.4)
// ==========================================
window.submitManagerReservation = function () {
  const name = document.getElementById('res-name').value;
  const date = document.getElementById('res-date').value; // NEW
  const time = document.getElementById('res-time').value;
  const pax = document.getElementById('res-pax').value;
  const phone = document.getElementById('res-phone').value; // NEW
  const notes = document.getElementById('res-notes').value; // NEW
  const vip = document.getElementById('res-vip').value;
  const reason = document.getElementById('res-reason').value;
  const game = document.getElementById('res-game').value;

  if (!name || !date || !time) {
    alert('Por favor complete nombre, fecha y hora.');
    return;
  }

  // AUTH GATE FOR NON-VIP
  if (!vip) {
    const password = prompt("⚠️ Cliente SIN Categoría VIP.\n\nPara autorizar excepcionalmente esta reservación, ingrese su CONTRASEÑA DE GERENTE:");

    // Check against current user's password
    if (password !== STATE.user.password) {
      alert("⛔ CONTRASEÑA INCORRECTA. No se puede crear la reservación.");
      return;
    }
  }

  const data = {
    customerName: name,
    pax: pax,
    phone: phone, // NEW
    time: time,
    date: date, // NEW (Overrides 'today' default)
    notes: notes, // NEW
    vip: vip,
    reason: reason,
    game: reason === 'Partido' ? game : '',
    status: 'pending',
    branchId: STATE.branch ? STATE.branch.id : 'branch-1'
  };

  if (window.db && window.db.addReservation) {
    window.db.addReservation(data);
    alert("✅ Reservación creada exitosamente.");
    toggleReservationForm();

    // Simplified Refresh
    if (typeof window.renderManagerDashboard === 'function') {
      window.renderManagerDashboard('reservations');
    } else {
      window.location.reload();
    }
  } else {
    alert("Error de DB");
  }
};

// Check-In Reservation (Populate Hostess Form)
window.checkInReservation = function (resId) {
  const branchId = STATE.branch?.id;
  const allRes = window.db.getReservations(branchId);
  const res = allRes.find(r => r.id === resId);

  if (!res) {
    alert('Reservación no encontrada');
    return;
  }

  // Check if we're in Hostess dashboard
  const isHostess = document.getElementById('content-checkin') !== null;

  if (!isHostess) {
    alert('Esta función solo está disponible en el dashboard de Hostess');
    return;
  }

  // Switch to Check-In Tab
  switchHostessTab('checkin');

  // Populate form
  const firstNameInput = document.getElementById('h-firstname');
  const lastNameInput = document.getElementById('h-lastname');
  const lastName2Input = document.getElementById('h-lastname2');
  const paxDisplay = document.getElementById('h-pax');

  if (!firstNameInput || !lastNameInput || !paxDisplay) {
    console.error('❌ Hostess form elements not found. Are you in Hostess view?');
    return alert('Error: Esta función solo está disponible en el dashboard de Hostess');
  }

  switchHostessTab('checkin');

  firstNameInput.value = res.customerName.split(' ')[0] || '';
  lastNameInput.value = res.customerName.split(' ')[1] || '';

  // Store reservation ID
  const resIdInput = document.getElementById('h-reservation-id');
  if (resIdInput) resIdInput.value = res.id;

  // Fill Pax (already declared above)
  if (paxDisplay) paxDisplay.innerText = res.pax;

  // Fill Search Input as visual cue
  const searchInput = document.getElementById('customer-search');
  if (searchInput) searchInput.value = res.customerName;

  // Toast
  if (window.showToast) window.showToast(`✅ Datos de ${res.customerName} cargados`, 'success');
};

// ==========================================
// HOSTESS CHECK-IN: REASON & GAME FLOW

// ===== SECCIÓN 7: HOSTESS REASON + GAME FLOW =====
// HOSTESS CHECK-IN: REASON & GAME FLOW
// ==========================================
window.handleHostessReasonChange = function (selectElement, visitId) {
  const reason = selectElement.value;
  const gameFlow = document.getElementById(`h-game-flow-${visitId}`);

  if (reason === 'Partido') {
    gameFlow.classList.remove('hidden');
    window.renderTodaysGamesForHostess(visitId);
    // Auto-save happens in selectHostessGame on game click
  } else {
    gameFlow.classList.add('hidden');
    document.getElementById('h-selected-game-' + visitId).value = '';
    document.getElementById('h-selected-league-' + visitId).value = '';

    // AUTO-SAVE non-Partido reason immediately
    window.db.updateVisitDetails(visitId, { reason: reason, gameName: '', league: '', selectedGame: '' });

    // Update Hostess badge in-place
    const hBadge = document.getElementById('motivo-badge-' + visitId);
    if (hBadge) {
      if (reason && reason !== 'Casual') {
        hBadge.textContent = '\uD83D\uDCCC ' + reason;
        hBadge.classList.remove('hidden');
      } else {
        hBadge.classList.add('hidden');
      }
    }
    // Update Gerente badge in-place
    const mgrDiv = document.getElementById('mgr-reason-' + visitId);
    if (mgrDiv && reason && reason !== 'Casual') {
      const emojiMap = { 'Cumplea\u00f1os': '\uD83C\uDF82', 'Negocios': '\uD83D\uDCBC', 'Beber': '\uD83C\uDF7B', 'Comer': '\uD83C\uDF7D' };
      const emoji = emojiMap[reason] || '\uD83C\uDF7D';
      mgrDiv.innerHTML = '<div class="mt-3 bg-white/5 p-3 rounded-lg border border-white/10"><div class="text-sm font-bold text-white">' + emoji + ' ' + reason.toUpperCase() + '</div></div>';
    } else if (mgrDiv) {
      mgrDiv.innerHTML = '';
    }
    if (window.showToast) window.showToast('\u2705 Motivo: ' + reason, 'success');
  }
};

window.renderTodaysGamesForHostess = function (visitId) {
  const container = document.getElementById(`h-games-container-${visitId}`);
  if (!container) return;

  const dailyInfo = window.db.getDailyInfo() || {};
  const allGames = dailyInfo.games || [];
  const today = new Date().toLocaleDateString('en-CA');
  const games = allGames.filter(g => g.date === today);

  if (games.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-400 py-3 bg-black/50 rounded border border-gray-700">
        <p class="text-xs">📭 No hay partidos registrados hoy</p>
      </div>`;
    return;
  }

  // Sort games by time
  games.sort((a, b) => (a.time || '23:59').localeCompare(b.time || '23:59'));

  const currentSelected = document.getElementById(`h-selected-game-${visitId}`).value;

  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];

  let html = '';
  games.forEach((game, index) => {
    const isIndividual = individualSports.includes(game.league);

    // Create the proper display string (what the user sees)
    let displayStr = '';
    let gameId = ''; // Used for selection logic

    if (isIndividual) {
      displayStr = game.match || game.homeTeam || game.sport || game.league;
      if (game.mainEvent) displayStr += ` • ${game.mainEvent}`;
      gameId = displayStr; // Use the full string as ID for these
    } else {
      displayStr = `${game.awayTeam} vs ${game.homeTeam}`;
      gameId = `${game.awayTeam} @ ${game.homeTeam}`;
    }

    const isSelected = gameId === currentSelected || (game.match && game.match === currentSelected);
    html += `
      <button type="button" onclick="window.selectHostessGame('${gameId.replace(/'/g, "\'")}', '${game.league}', this, '${visitId}')"
        class="hostess-game-btn-${visitId} w-full p-3 bg-black border ${isSelected ? 'border-yellow-500 bg-blue-900/40 ring-2 ring-yellow-500/50' : 'border-gray-700'} hover:border-blue-400 rounded text-left transition text-xs flex justify-between items-center group mb-1">
        <div>
          <span class="text-blue-400 font-bold">[${game.league}]</span>
          <span class="text-white ml-1">${displayStr}</span>
        </div>
        <div class="text-gray-500 font-mono">${game.time}</div>
      </button>`;
  });

  container.innerHTML = html;
};

window.selectHostessGame = function (gameName, league, btnElement, visitId) {
  // Update hidden inputs
  document.getElementById(`h-selected-game-${visitId}`).value = gameName;
  document.getElementById(`h-selected-league-${visitId}`).value = league;

  // Highlight visually
  const allBtns = document.querySelectorAll(`.hostess-game-btn-${visitId}`);
  allBtns.forEach(btn => {
    btn.classList.remove('border-yellow-500', 'bg-blue-900/40', 'ring-2', 'ring-yellow-500/50');
    btn.classList.add('border-gray-700', 'bg-black');
  });

  btnElement.classList.remove('border-gray-700', 'bg-black');
  btnElement.classList.add('border-yellow-500', 'bg-blue-900/40', 'ring-2', 'ring-yellow-500/50');

  // AUTO-SAVE to DB immediately (reset favorites until user picks)
  window.db.updateVisitDetails(visitId, {
    gameName, league, reason: 'Partido', selectedGame: gameName,
    isFavoriteTeamMatch: false, watchedTeam: ''
  });

  // Show ¿Equipo Favorito? panel
  const favPanel = document.getElementById(`h-fav-team-panel-${visitId}`);
  const favBtns = document.getElementById(`h-fav-team-btns-${visitId}`);
  if (favPanel && favBtns) {
    // Parse team names from "Away @ Home" format
    let teamA = '', teamB = '';

    // Check if it's an individual sport by league to be safe
    const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
    const isIndividual = individualSports.includes(league);

    // Hide panel for individual sports
    if (isIndividual || (!gameName.includes(' @ ') && !gameName.includes(' vs '))) {
      favPanel.classList.add('hidden');
      return;
    }

    if (gameName.includes(' @ ')) {
      [teamA, teamB] = gameName.split(' @ ').map(t => t.trim());
    } else if (gameName.includes(' vs ')) {
      [teamA, teamB] = gameName.split(' vs ').map(t => t.trim());
    } else {
      favPanel.classList.add('hidden');
      return;
    }

    const logoA = window.getTeamLogo(teamA);
    const logoB = window.getTeamLogo(teamB);

    favBtns.innerHTML = `
      <button onclick="window.selectHostessFavoriteTeam('${teamA}', '${visitId}')"
        class="flex-1 py-2 px-3 bg-black border border-gray-700 hover:border-yellow-500 rounded text-xs font-bold text-white transition h-fav-btn-${visitId} truncate">
        ${teamA}
      </button>
      <button onclick="window.selectHostessFavoriteTeam('${teamB}', '${visitId}')"
        class="flex-1 py-2 px-3 bg-black border border-gray-700 hover:border-yellow-500 rounded text-xs font-bold text-white transition h-fav-btn-${visitId} truncate">
        ${teamB}
      </button>`;

    favPanel.classList.remove('hidden');
  }

  // Update Hostess badge
  const hBadge = document.getElementById('motivo-badge-' + visitId);
  if (hBadge) { hBadge.textContent = '\u{1F4CC} Partido: ' + gameName; hBadge.classList.remove('hidden'); }

  // Update Gerente card in-place
  const mgrDiv = document.getElementById('mgr-reason-' + visitId);
  if (mgrDiv) mgrDiv.innerHTML = '<div class="mt-3 bg-white/5 p-3 rounded-lg border border-white/10"><div class="text-[10px] text-green-400 font-bold uppercase tracking-widest">PARTIDO</div><div class="text-sm font-black text-white leading-tight mt-0.5">' + gameName + '</div></div>';

  if (window.showToast) window.showToast('\u2705 Partido: ' + gameName, 'success');
};

// Called when hostess picks the team the customer is following
window.selectHostessFavoriteTeam = function (teamName, visitId) {
  const isFav = !!teamName;
  window.db.updateVisitDetails(visitId, {
    isFavoriteTeamMatch: isFav,
    watchedTeam: teamName
  });

  // Visual feedback on buttons
  document.querySelectorAll(`.h-fav-btn-${visitId}`).forEach(btn => {
    btn.classList.remove('border-yellow-500', 'ring-2', 'ring-yellow-500/30');
    btn.classList.add('border-gray-700');
  });

  if (isFav) {
    // Find and highlight the clicked button
    const allFavBtns = document.querySelectorAll(`#h-fav-team-btns-${visitId} button`);
    allFavBtns.forEach(btn => {
      if (btn.textContent.includes(teamName)) {
        btn.classList.add('border-yellow-500', 'ring-2', 'ring-yellow-500/30');
        btn.classList.remove('border-gray-700');
      }
    });

    // Update manager card: inject logo in header slot
    const logo = window.getTeamLogo(teamName);
    const mgrLogoSlot = document.getElementById('mgr-fav-logo-' + visitId);
    if (mgrLogoSlot) {
      mgrLogoSlot.innerHTML = logo
        ? `<img src="${logo}" style="width:38px;height:38px;max-width:38px;max-height:38px;" class="object-contain mt-1 rounded border border-yellow-500 bg-black block" title="${teamName}">`
        : `<div class="text-xl mt-1">⭐</div>`;
    }

    // Also update hostess card header slot
    const hLogoSlot = document.getElementById('h-fav-logo-' + visitId);
    if (hLogoSlot) {
      hLogoSlot.innerHTML = logo
        ? `<img src="${logo}" style="width:38px;height:38px;max-width:38px;max-height:38px;" class="object-contain mt-1 rounded border border-yellow-500 bg-black block ml-auto" title="${teamName}">`
        : `<div class="text-xl mt-1 text-right">⭐</div>`;
    }

    if (window.showToast) window.showToast(`⭐ Favorito: ${teamName}`, 'success');
  } else {
    if (window.showToast) window.showToast('✅ Solo ve el partido', 'info');
    // Hide the panel
    const favPanel = document.getElementById(`h-fav-team-panel-${visitId}`);
    if (favPanel) favPanel.classList.add('hidden');
  }
};

window.updateHostessGameForm = function (visitId) {
  const league = document.getElementById('manual-league-' + visitId)?.value;
  const container = document.getElementById('manual-fields-' + visitId);
  if (!container || !league) return;

  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
  const isIndividual = individualSports.includes(league);

  if (isIndividual) {
    container.innerHTML = `
      <div>
        <label class="text-[10px] uppercase font-bold text-yellow-400 block mb-1">🎯 Nombre del Evento</label>
        <input id="manual-home-${visitId}" placeholder="Ej: UFC 350, Wimbledon, Gran Premio" class="w-full bg-black text-white p-2 rounded border border-yellow-600 focus:border-yellow-400">
      </div>
      <div class="mt-1">
        <label class="text-[10px] uppercase font-bold text-purple-400 block mb-1">⭐ Pelea / Partido Estelar (opcional)</label>
        <input id="manual-away-${visitId}" placeholder="Ej: Moreno vs Cejudo, Alcaraz vs Djokovic" class="w-full bg-black text-white p-2 rounded border border-purple-600 focus:border-purple-400">
      </div>
    `.replace(/\${visitId}/g, visitId);
  } else {
    container.innerHTML = `
      <input type="text" id="manual-home-${visitId}" list="team-suggestions" placeholder="Local / Principal" class="w-full bg-black text-white p-2 rounded border border-gray-700 focus:border-yellow-500">
      <input type="text" id="manual-away-${visitId}" list="team-suggestions" placeholder="Visitante (si aplica)" class="w-full bg-black text-white p-2 rounded border border-gray-700 focus:border-yellow-500 mt-1">
    `.replace(/\${visitId}/g, visitId);
  }
};

window.saveManualGameHostess = function (visitId) {
  const league = document.getElementById(`manual-league-${visitId}`).value;
  const home = document.getElementById(`manual-home-${visitId}`).value.trim();
  const away = document.getElementById(`manual-away-${visitId}`).value.trim();

  // Individual sports (no home/away concept)
  const individualSports = ['UFC', 'F1', 'Tenis', 'Boxeo'];
  const isIndividual = individualSports.includes(league);

  if (isIndividual && !home) {
    alert('Por favor escribe el nombre del evento principal en "Local" (ej: Hamilton vs Verstappen)');
    return;
  }

  if (!isIndividual && (!home || !away)) {
    alert('Por favor completa Equipo Local y Equipo Visitante');
    return;
  }

  const away2 = document.getElementById(`manual-away-${visitId}`)?.value.trim() || '';
  // Construct game string
  let manualGameStr;
  if (isIndividual) {
    manualGameStr = home;
    if (away2) manualGameStr += ` • ${away2}`; // Append estelar if entered
  } else {
    manualGameStr = `${away} @ ${home}`;
  }


  // Remove selection from previous list buttons to show manual is active
  document.querySelectorAll(`.hostess-game-btn-${visitId}`).forEach(btn => {
    btn.classList.remove('border-yellow-500', 'bg-blue-900/40', 'ring-2', 'ring-yellow-500/50');
    btn.classList.add('border-gray-700', 'bg-black');
  });

  // Hide the form visually again
  document.getElementById(`manual-game-form-${visitId}`).classList.add('hidden');

  // AUTO-SAVE to DB
  window.db.updateVisitDetails(visitId, { gameName: manualGameStr, league: league, reason: 'Partido', selectedGame: manualGameStr });

  // Notify manager about unknown game
  window.db.requestGame(manualGameStr);

  // Update Hostess badge in-place
  const hBadge = document.getElementById('motivo-badge-' + visitId);
  if (hBadge) { hBadge.textContent = '\uD83D\uDCCC Partido: ' + manualGameStr; hBadge.classList.remove('hidden'); }

  // Update Gerente badge in-place
  const mgrDiv = document.getElementById('mgr-reason-' + visitId);
  if (mgrDiv) mgrDiv.innerHTML = '<div class="mt-3 bg-white/5 p-3 rounded-lg border border-white/10"><div class="text-[10px] text-green-400 font-bold uppercase tracking-widest">PARTIDO</div><div class="text-sm font-black text-white leading-tight mt-0.5">' + manualGameStr + '</div></div>';

  if (window.showToast) window.showToast('\u2705 Partido vinculado: ' + manualGameStr, 'success');
};

window.updateHostessVisitReason = function (visitId) {
  const reasonSelect = document.getElementById(`h-reason-${visitId}`);
  if (!reasonSelect) return;

  const reason = reasonSelect.value;
  const gameName = document.getElementById(`h-selected-game-${visitId}`).value;
  const league = document.getElementById(`h-selected-league-${visitId}`).value;

  // Validate: if Partido selected but no game chosen, warn
  if (reason === 'Partido' && !gameName) {
    if (window.showToast) window.showToast('⚠️ Selecciona un partido primero', 'warning');
    return;
  }

  // Save to DB
  window.db.updateVisitDetails(visitId, {
    reason: reason,
    gameName: gameName,
    league: league
  });

  // Update the badge on the card in-place (no full re-render)
  const motivoBadgeId = `motivo-badge-${visitId}`;
  let badge = document.getElementById(motivoBadgeId);
  if (badge) {
    if (reason && reason !== 'Casual') {
      badge.textContent = `📌 ${reason}${gameName ? ': ' + gameName : ''}`;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (window.showToast) {
    window.showToast('✅ Motivo de visita guardado', 'success');
  }
};


// Start Hostess Tab Switcher
window.switchHostessTab = function (tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));

  const target = document.getElementById('content-' + tabName);
  const navItem = document.getElementById('tab-' + tabName);


// ===== SECCIÓN 8: PROCESS CHECKIN + WAITER TABLE INLINE =====

  if (target) target.classList.remove('hidden');
  if (navItem) navItem.classList.add('active');

  // Init Logic
  if (tabName === 'reservations') {
    renderHostessReservationList();
  }
};

// ==========================================
// HOSTESS CHECK-IN PROCESS (FIX: READ FROM DOM + MATERNAL SURNAME)
// ==========================================
window.processHostessCheckIn = function (tableNumberArg, waiterIdArg) {
  // 1. Get Values (Argument OR DOM)
  const tableNumber = tableNumberArg || document.getElementById('h-table').value;
  const waiterId = waiterIdArg || document.getElementById('h-waiter').value;

  // 2. Validate Inputs
  if (!tableNumber || !waiterId) {
    alert("Por favor selecciona una Mesa y un Mesero.");
    return;
  }

  const branchId = STATE.branch?.id;
  // Check if table is occupied
  if (window.db.isTableOccupied(tableNumber, branchId)) {
    alert(`❌ La Mesa ${tableNumber} ya está ocupada.`);
    return;
  }

  // 3. Gather Data from Hostess Form
  const firstName = document.getElementById('h-firstname').value.toUpperCase();
  const lastName1 = document.getElementById('h-lastname').value.toUpperCase();
  const lastName2 = document.getElementById('h-lastname2') ? document.getElementById('h-lastname2').value.toUpperCase() : '';
  const phoneInput = document.getElementById('h-phone-input') ? document.getElementById('h-phone-input').value.trim() : '';

  // Combine Last Names
  const fullLastName = `${lastName1} ${lastName2}`.trim();

  const pax = parseInt(document.getElementById('h-pax').innerText) || 2;

  if (!firstName) {
    alert("Falta el nombre del cliente.");
    return;
  }

  // 4. Find or Create Customer
  // Check by full name composition
  const fullNameQuery = `${firstName} ${fullLastName}`.trim();

  let customer = window.db.data.customers.find(c =>
    (c.firstName + ' ' + c.lastName).toLowerCase() === fullNameQuery.toLowerCase()
  );

  if (!customer) {
    customer = window.db.createCustomer({
      firstName,
      lastName: fullLastName,
      phone: phoneInput,
      email: '',
      branchId
    });
  } else {
    // Update existing if needed (optional, maybe just update last visit)
    if (phoneInput && !customer.phone) {
      window.db.updateCustomer(customer.id, { phone: phoneInput });
      customer.phone = phoneInput;
    }
  }

  // 5. Create Visit
  const visitData = {
    branchId,
    table: tableNumber,
    waiterId,
    customerId: customer.id,
    pax,
    startTime: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
    orders: [],
    totalAmount: 0
  };

  const newVisit = window.db.createVisit(visitData);

  // 6. If this came from a Reservation, MARK IT AS COMPLETED
  const todayStr = new Date().toLocaleDateString('en-CA');
  const resIdInput = document.getElementById('h-reservation-id');
  const specificResId = resIdInput ? resIdInput.value : null;

  let pendingRes = null;

  if (specificResId) {
    // Exact match from clicking the Check-In button on a reservation card
    pendingRes = window.db.getReservations().find(r => r.id === specificResId);
  } else {
    // Fallback: Name match (only for today's reservations)
    pendingRes = window.db.getReservations().find(r =>
      r.customerName.toLowerCase() === fullNameQuery.toLowerCase() &&
      r.date === todayStr &&
      r.status !== 'completed' &&
      r.status !== 'cancelled'
    );
  }

  if (pendingRes) {
    // Update reservation status to completed
    window.db.updateReservation(pendingRes.id, { status: 'completed', completedAt: new Date().toISOString() });
    console.log('✅ Reservation marked as completed:', pendingRes.id);

    // Refresh reservation list immediately
    if (window.renderHostessReservationList) {
      setTimeout(() => {
        window.renderHostessReservationList();
      }, 100);
    }
  }

  // 7. Clear Form
  document.getElementById('h-firstname').value = '';
  document.getElementById('h-lastname').value = '';
  if (document.getElementById('h-reservation-id')) document.getElementById('h-reservation-id').value = '';
  if (document.getElementById('h-lastname2')) document.getElementById('h-lastname2').value = '';
  document.getElementById('h-table').value = '';
  document.getElementById('h-waiter').value = '';
  document.getElementById('h-pax').innerText = '1';

  // 8. Re-render and Switch to Tables Tab
  if (typeof window.renderHostessDashboard === 'function') {
    window.renderHostessDashboard();
  } else if (typeof renderHostessDashboard === 'function') {
    renderHostessDashboard();
  }
  switchHostessTab('tables');

  alert(`✅ Mesa ${tableNumber} asignada a ${fullNameQuery}`);
};

// ==========================================
// MESAS POR MESERO INLINE (HOSTESS)
// ==========================================
window.toggleWaiterTablesInline = function () {
  const container = document.getElementById('inline-waiter-tables');
  if (!container) return;

  // Si ya esta visible, lo ocultamos
  if (!container.classList.contains('hidden')) {
    container.classList.add('hidden');
    return;
  }

  const branchId = STATE.branch?.id;

  // Get all waiters for this branch
  const branchWaiters = window.db.data.users.filter(u =>
    u.role === 'waiter' && (!u.branchId || u.branchId === branchId)
  );

  // Get today's visits
  const todayStr = new Date().toLocaleDateString('en-CA');
  const allVisits = window.db.data.visits || [];

  // Create stats object
  const waiterStats = {};
  branchWaiters.forEach(w => {
    waiterStats[w.id] = { name: w.name, total: 0, open: 0, closed: 0 };
  });

  // Calculate stats
  allVisits.forEach(v => {
    // Only count today's visits for this branch
    if (v.date === todayStr && (!v.branchId || v.branchId === branchId)) {
      if (waiterStats[v.waiterId]) {
        waiterStats[v.waiterId].total++;
        if (v.status === 'closed') {
          waiterStats[v.waiterId].closed++;
        } else if (v.status === 'seated' || v.status === 'active') {
          waiterStats[v.waiterId].open++;
        }
      }
    }
  });

  let html = `
    <div class="border-2 border-gray-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden mb-4 relative z-50" style="background-color: #111827;">
      <div class="p-4 overflow-y-auto space-y-3 relative z-50" style="background-color: #111827;">
  `;

  if (branchWaiters.length === 0) {
    html += `<div class="text-center text-gray-500 py-4">No hay meseros registrados.</div>`;
  } else {
    // Sort waiters by total tables descending
    const sortedWaiters = Object.values(waiterStats).sort((a, b) => b.total - a.total);

    sortedWaiters.forEach(ws => {
      html += `
        <div class="border border-gray-700 rounded-xl p-4 flex justify-between items-center" style="background-color: #000000;">
            <div>
                <div class="font-bold text-white text-lg">${ws.name}</div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Hoy</div>
            </div>
            <div class="flex gap-2 text-center">
                <div class="bg-gray-800 rounded px-2 py-1 border border-gray-700">
                    <div class="text-lg font-black text-white">${ws.total}</div>
                    <div class="text-[8px] text-gray-500 uppercase font-bold">Total</div>
                </div>
                <div class="rounded px-2 py-1 border border-green-800" style="background-color: rgba(21, 128, 61, 0.2);">
                    <div class="text-lg font-black text-green-500">${ws.open}</div>
                    <div class="text-[8px] text-green-600/70 uppercase font-bold">Abiertas</div>
                </div>
                <div class="rounded px-2 py-1 border border-red-800" style="background-color: rgba(185, 28, 28, 0.2);">
                    <div class="text-lg font-black text-red-500">${ws.closed}</div>
                    <div class="text-[8px] text-red-600/70 uppercase font-bold">Cerradas</div>
                </div>
            </div>
        </div>
      `;
    });
  }

  html += `
      </div>
    </div>
  `;


// ===== SECCIÓN 9: REGIONAL + SUPER ADMIN DASHBOARDS =====

  container.innerHTML = html;
  container.classList.remove('hidden');
};

// =============================================================
// MANAGER REPORTS 86 PRODUCTS MODAL
// =============================================================
window.show86ProductsModal = function () {
  const menu = window.db.getMenu();
  const allItems = [
    ...(menu.alimentos || []).map(i => ({ ...i, type: 'Alimento' })),
    ...(menu.bebidas || []).map(i => ({ ...i, type: 'Bebida' }))
  ];
  const items86 = allItems.filter(i => i.available === false);

  if (items86.length === 0) {
    alert("Actualmente no hay productos marcados como 86 en el sistema.");
    return;
  }

  const modalHtml = `
  <div id="productos-86-modal" class="fixed inset-0 bg-black flex flex-col animate-fade-in" style="background-color: #000000; z-index: 999999 !important;">
    <div class="border-b border-gray-700 flex justify-between items-center p-4 sticky top-0 shadow-md" style="background-color: #111827; z-index: 1000000 !important;">
       <div class="flex items-center gap-3">
         <button onclick="document.getElementById('productos-86-modal').remove()" class="text-gray-400 hover:text-white bg-gray-800 border border-gray-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition-transform active:scale-90 pb-1">←</button>
         <div>
           <h2 class="text-lg font-black text-white uppercase tracking-tighter">PRODUCTOS <span class="text-red-500">AGOTADOS (86)</span></h2>
           <p class="text-[10px] text-gray-400 font-mono">${items86.length} artículos en esta lista</p>
         </div>
       </div>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4 space-y-3 pb-64">
       ${items86.map(item => `
          <div class="bg-gray-900 p-3 rounded-lg border border-red-900 shadow-md flex justify-between items-center">
             <div>
                <div class="text-xs uppercase font-bold text-gray-500 mb-0.5">${item.type || 'Producto'}</div>
                <div class="text-base font-black text-white">${item.name}</div>
             </div>
             <div class="text-xs bg-red-900/40 text-red-500 border border-red-800 px-2 py-1 rounded-md font-bold uppercase shadow-inner">Agotado</div>
          </div>
       `).join('')}
       <div class="mt-4 flex justify-center">
         <button onclick="document.getElementById('productos-86-modal').remove(); renderManagerDashboard('menu');" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg w-full max-w-sm uppercase shadow-lg border border-blue-400 transition-colors">📄 Ir al Menú a Editar</button>
       </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

// =============================================================
// MANAGER REPORTS DETAILED MOTIVES MODAL
// =============================================================
window.showMotiveDetailsModal = function (motiveType, startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDateStr);
  end.setHours(23, 59, 59, 999);

  // Filter visits
  const matchingVisits = (window.db.data.visits || []).filter(v => {
    if (!v.date) return false;
    const vDate = new Date(v.date);
    if (vDate < start || vDate > end) return false;

    const r = (v.visitReason || v.reason || 'otro').toLowerCase();

    // For specific predefined types
    if (motiveType !== 'otro') {
      return r === motiveType;
    } else {
      // For 'otro', check if it's not one of the predefined ones
      const predefined = ['comer', 'tragos', 'partido', 'cita', 'negocios'];
      return !predefined.includes(r);
    }
  });

  // Calculate totals
  const totalSpend = matchingVisits.reduce((sum, v) => sum + (v.totalAmount || 0), 0);
  const totalPax = matchingVisits.reduce((sum, v) => sum + (parseInt(v.pax) || 0), 0);

  // Sort by most recent
  matchingVisits.sort((a, b) => new Date(b.date) - new Date(a.date));

  const modalHtml = `
  <div id="motive-details-modal" class="fixed inset-0 bg-black flex flex-col animate-fade-in" style="background-color: #000000; z-index: 999999 !important;">
    <div class="border-b border-gray-700 flex justify-between items-center p-4 sticky top-0 shadow-md" style="background-color: #111827; z-index: 1000000 !important;">
       <div class="flex items-center gap-3">
         <button onclick="document.getElementById('motive-details-modal').remove()" class="text-gray-400 hover:text-white bg-gray-800 border border-gray-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition-transform active:scale-90 pb-1">←</button>
         <div>
           <h2 class="text-lg font-black text-white uppercase tracking-tighter">DETALLE: <span class="text-yellow-500">${motiveType.toUpperCase()}</span></h2>
           <p class="text-[10px] text-gray-400 font-mono">${startDateStr} al ${endDateStr}</p>
         </div>
       </div>
    </div>
    
    <div class="p-3 border-b border-gray-800 flex justify-around items-center shadow-inner" style="background-color: #1f2937;">
       <div class="text-center">
         <div class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Mesas</div>
         <div class="text-xl font-black text-white">${matchingVisits.length}</div>
       </div>
       <div class="text-center">
         <div class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Personas</div>
         <div class="text-xl font-black text-white">${totalPax}</div>
       </div>
       <div class="text-center text-green-400">
         <div class="text-[10px] uppercase font-bold tracking-widest opacity-80">Gasto Total</div>
         <div class="text-xl font-black">$${totalSpend.toLocaleString()}</div>
       </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-3 pb-64">
       ${matchingVisits.length === 0 ? '<div class="text-center p-10 text-gray-500 font-bold">No hay mesas en este periodo.</div>' : ''}
       ${matchingVisits.map(v => {
    const customer = window.db.data.customers.find(c => c.id === v.customerId) || { firstName: 'Cliente', lastName: 'Desconocido' };

    // For 'Otro' category, show whatever they typed in reason/comments
    // For 'Partido', show the specific game Name if available
    let actualReason = v.visitReason || v.reason || v.comments || 'No especificado';
    if (motiveType === 'partido' && v.gameName) {
      actualReason = v.gameName;
    }

    return `
           <div class="bg-gray-800 border border-gray-700 p-4 rounded-lg flex items-center justify-between shadow">
             <div class="flex-1 min-w-0 pr-4">
               <div class="font-bold text-lg text-white truncate">${customer.firstName} ${customer.lastName}</div>
               <div class="text-xs text-gray-400 font-mono mt-1">Mesa ${v.table} • ${v.date.split('T')[0]}</div>
               ${motiveType === 'otro' || motiveType === 'partido' ? `<div class="text-[10px] bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded inline-block mt-2 border border-yellow-900/50 uppercase tracking-widest font-bold max-w-full truncate">📌 ${actualReason}</div>` : ''}
             </div>
             <div class="text-right shrink-0">
               <div class="text-sm font-bold text-gray-300">👥 ${v.pax}</div>
               <div class="text-green-400 font-black mt-1">$${(v.totalAmount || 0).toLocaleString()}</div>
             </div>
           </div>
         `;
  }).join('')}
    </div>
  </div>`;

  const existing = document.getElementById('motive-details-modal');
  if (existing) existing.remove();

  const newDiv = document.createElement('div');
  newDiv.innerHTML = modalHtml;
  document.body.appendChild(newDiv.firstElementChild);
};

// =============================================================
// TESTING: INJECT AND REMOVE FEBRUARY DATA
// =============================================================
window.injectFebruaryTestData = function () {
  if (!confirm('¿Inyectar 15 clientes y 30 mesas de prueba para Febrero 2026?')) return;

  const branchId = STATE.branch?.id || 'branch_1';
  let createdCustomers = [];
  const motives = ['Comer', 'Tragos', 'Partido', 'Cita', 'Negocios', 'Cumpleaños'];
  const teams = ['América', 'Chivas', 'Real Madrid', 'San Francisco 49ers', 'Cruz Azul'];

  // 1. Create 15 Fake Customers
  for (let i = 1; i <= 15; i++) {
    const isFan = Math.random() > 0.5;
    const customer = {
      id: 'debug_cust_' + Date.now() + '_' + i,
      firstName: 'Prueba',
      lastName: 'Febrero ' + i,
      phone: '555000' + String(i).padStart(4, '0'),
      zone: ['Juriquilla', 'Centro', 'Álamos', 'Milenio', 'Zibatá'][Math.floor(Math.random() * 5)],
      team: isFan ? teams[Math.floor(Math.random() * teams.length)] : '',
      branchId,
      isFakeData: true
    };
    window.db.data.customers.push(customer);
    createdCustomers.push(customer);
  }

  // 2. Create 30 Fake Visits spanning Feb 1 to Feb 28, 2026
  for (let i = 1; i <= 30; i++) {
    const day = Math.floor(Math.random() * 28) + 1;
    const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
    const cust = createdCustomers[Math.floor(Math.random() * createdCustomers.length)];
    const motive = motives[Math.floor(Math.random() * motives.length)];

    // Assign a mock game if reason is Partido
    let game = '';
    if (motive === 'Partido') {
      game = cust.team ? cust.team + ' vs Rival' : teams[Math.floor(Math.random() * teams.length)] + ' vs Rival';
    }

    const visit = {
      id: 'debug_visit_' + Date.now() + '_' + i,
      branchId,
      customerId: cust.id,
      table: Math.floor(Math.random() * 50) + 1,
      pax: Math.floor(Math.random() * 6) + 1,
      status: 'closed',
      date: dateStr,
      startTime: `${dateStr}T19:00:00Z`,
      endTime: `${dateStr}T21:00:00Z`,
      totalAmount: Math.floor(Math.random() * 4000) + 500,
      reason: motive, // The legacy format hostess uses
      gameName: game,
      isFakeData: true
    };
    window.db.data.visits.push(visit);
  }

  // Save changes locally and to Firebase
  window.db._save();
  if (window.showToast) window.showToast('✅ 30 mesas de prueba inyectadas', 'success');
  console.log('Test data injected for February.');

  // Refresh UI
  if (typeof renderManagerDashboard === 'function') {
    renderManagerDashboard('reports');
  }
};

// =============================================================
// SPORTS CRM & MATCH ANALYTICS
// =============================================================
window.renderManagerSportsCRMTab = function (container) {
  const branchId = STATE.branch?.id;
  if (!branchId) {
    container.innerHTML = '<p class="text-center text-red-500 mt-10">Error: Sucursal no seleccionada.</p>';
    return;
  }

  STATE.sportsData = STATE.sportsData || { match: '', team: '' };

  const allVisits = window.db.data.visits || [];
  const allCustomers = window.db.data.customers || [];

  // 1. Gather Unique Games (Append date to distinguish recurring matchups)
  const uniqueMatchesList = [...new Set(allVisits.filter(v => v.gameName).map(v => {
    const d = v.date ? v.date.split('T')[0] : 'Sin Fecha';
    return d + ' | ' + v.gameName;
  }))].sort().reverse();

  // 2. Gather Unique Teams
  const rawTeams = allCustomers.map(c => c.team).filter(t => t && t.trim() !== '');
  const uniqueTeams = [...new Set(rawTeams)].sort();

  // Calculate Match Analytics if selected
  let matchStatsHtml = '';

  const normalizeString = (str) => {
    if (!str) return '';
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };

  if (STATE.sportsData.match && STATE.sportsData.match.trim() !== '') {
    let matchVisits = [];
    let matchName = '';
    let gameParts = [];

    // Auto-correct partial typed searches to the closest exact match in the datalist
    if (!STATE.sportsData.match.includes(' | ')) {
      const searchNorm = normalizeString(STATE.sportsData.match);
      const foundExact = uniqueMatchesList.find(g => normalizeString(g).includes(searchNorm));
      if (foundExact) {
        STATE.sportsData.match = foundExact;
      }
    }

    if (STATE.sportsData.match.includes(' | ')) {
      const [matchDate, ...rest] = STATE.sportsData.match.split(' | ');
      matchName = rest.join(' | ');
      matchVisits = allVisits.filter(v => {
        const d = v.date ? v.date.split('T')[0] : 'Sin Fecha';
        return d === matchDate && v.gameName === matchName;
      });
      // Split by vs, @, or -
      gameParts = matchName.split(/vs\.?|@|-/i).map(p => p.trim());
    }

    let totalSpend = 0;
    let totalPax = 0;
    let teamSplits = {};

    // Determine the two teams playing from gameName
    if (gameParts.length > 1) {
      gameParts.forEach(p => { if (p) teamSplits[p.toUpperCase()] = { pax: 0, spend: 0, tables: 0 }; });
    }
    teamSplits['NEUTRAL / OTRO EQUIPO'] = { pax: 0, spend: 0, tables: 0 };

    const tableRows = matchVisits.map(v => {
      const c = allCustomers.find(cu => cu.id === v.customerId) || {};

      // Fallback: Check watchedTeam from visit first, then customer.team, then comments/reason
      let rawTeam = v.watchedTeam || c.team || '';
      if (!rawTeam || rawTeam.trim() === '') {
        rawTeam = (v.visitReason || '') + ' ' + (v.comments || '') + ' ' + (v.reason || '');
      }

      const cTeamNorm = normalizeString(rawTeam);
      let fanOf = 'NEUTRAL / OTRO EQUIPO';

      if (cTeamNorm && gameParts.length > 1) {
        for (let p of gameParts) {
          const pNorm = normalizeString(p);
          // Ensure we have a meaningful team name length to search for
          if (pNorm.length > 2 && cTeamNorm.includes(pNorm)) {
            fanOf = p.toUpperCase();
            break;
          }
        }
      } else if (cTeamNorm && gameParts.length <= 1) {
        fanOf = (v.watchedTeam || c.team || '').toUpperCase();
        if (!fanOf) fanOf = 'NEUTRAL / OTRO EQUIPO';
        if (!teamSplits[fanOf]) teamSplits[fanOf] = { pax: 0, spend: 0, tables: 0 };
      }

      totalSpend += (v.totalAmount || 0);
      totalPax += (parseInt(v.pax) || 0);

      if (!teamSplits[fanOf]) teamSplits[fanOf] = { pax: 0, spend: 0, tables: 0 };
      teamSplits[fanOf].pax += (parseInt(v.pax) || 0);
      teamSplits[fanOf].spend += (v.totalAmount || 0);
      teamSplits[fanOf].tables += 1;

      return `
        <div class="bg-gray-800 p-3 rounded border border-gray-700 mt-2 flex justify-between items-center px-4">
          <div>
            <div class="font-bold text-white">${c.firstName || 'Cliente'} ${c.lastName || ''}</div>
            <div class="text-[10px] text-gray-400 font-mono">Mesa ${v.table} • ${v.date}</div>
            <div class="text-xs mt-1 font-bold text-blue-400">Fan: ${fanOf}</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-gray-300">👥 ${v.pax}</div>
            <div class="text-green-400 font-black mt-1">$${(v.totalAmount || 0).toLocaleString()}</div>
          </div>
        </div>
      `;
    }).join('');

    // Generate summary boxes for the splits
    const splitsHtml = Object.keys(teamSplits).sort((a, b) => teamSplits[b].pax - teamSplits[a].pax).map(team => `
      <div class="bg-black/40 p-3 rounded-lg border border-gray-700 text-center">
         <div class="text-[10px] font-bold text-gray-400 mb-1 truncate uppercase tracking-widest">${team}</div>
         <div class="text-xl font-black text-white">${teamSplits[team].pax} <span class="text-[10px] text-gray-500 font-normal uppercase">pax</span></div>
         <div class="text-sm font-bold text-green-400">$${teamSplits[team].spend.toLocaleString()}</div>
      </div>
    `).join('');

    matchStatsHtml = `
      <div class="mt-4 animate-fade-in border-t border-gray-800 pt-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          <div class="bg-blue-900/20 p-3 rounded-lg border border-blue-900/50 text-center">
            <div class="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Mesas Totales</div>
            <div class="text-xl font-black text-white">${matchVisits.length}</div>
          </div>
          <div class="bg-purple-900/20 p-3 rounded-lg border border-purple-900/50 text-center">
            <div class="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Personas Totales</div>
            <div class="text-xl font-black text-white">${totalPax}</div>
          </div>
          <div class="bg-green-900/20 p-3 rounded-lg border border-green-900/50 text-center col-span-2">
            <div class="text-[10px] text-green-400 font-bold uppercase tracking-widest opacity-80">Derrama Total</div>
            <div class="text-xl font-black text-green-400">$${totalSpend.toLocaleString()}</div>
          </div>
        </div>
        
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">📊 División de Aficiones</h4>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          ${splitsHtml}
        </div>

        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🍽️ Desglose de Mesas</h4>
        <div class="max-h-[300px] overflow-y-auto pr-2 rounded-lg border border-gray-800 bg-black/20 p-2 border-dashed">
          ${tableRows}
        </div>
      </div>
    `;
  }

  // Calculate CRM if selected
  let crmHtml = '';
  if (STATE.sportsData.team && STATE.sportsData.team.trim() !== '') {
    const searchTerm = STATE.sportsData.team.toLowerCase().trim();
    // Partial Match Strategy (e.g. searching "america" matches "Club America")
    const fans = allCustomers.filter(c => c.team && c.team.toLowerCase().includes(searchTerm));

    // Calculate lifetime value for these fans
    const fansWithStats = fans.map(f => {
      const fVisits = allVisits.filter(v => v.customerId === f.id);
      const ltv = fVisits.reduce((sum, v) => sum + (v.totalAmount || 0), 0);
      return { ...f, visitCount: fVisits.length, ltv, lastVisit: fVisits.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || 'N/A' };
    }).sort((a, b) => b.ltv - a.ltv);

    const textForCopy = fansWithStats.filter(f => f.phone).map(f => f.phone).join(', ');

    crmHtml = `
      <div class="mt-4 animate-fade-in border-t border-gray-800 pt-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 p-4 rounded-lg border border-gray-700 mb-4 gap-3">
          <div>
            <div class="text-3xl font-black text-white">${fans.length}</div>
            <div class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Fans en Base de Datos</div>
          </div>
          <button onclick="navigator.clipboard.writeText('${textForCopy}').then(()=>{if(window.showToast) window.showToast('✅ Teléfonos copiados al portapapeles', 'success'); else alert('Teléfonos copiados!');})" class="bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg font-black text-xs uppercase shadow transition flex-shrink-0 flex items-center gap-2 border border-green-500">
            <span>📱</span> Copiar Celulares
          </button>
        </div>

        <div class="max-h-[400px] overflow-y-auto pr-2 rounded-lg border border-gray-800 bg-black/20 p-2 space-y-2 border-dashed">
          ${fansWithStats.length === 0 ? '<p class="text-center text-gray-500 font-bold p-5">No existen clientes con esta preferencia registrada.</p>' : ''}
          ${fansWithStats.map((f, i) => `
            <div class="bg-gray-800/80 p-3 rounded-lg flex justify-between items-center border ${i === 0 ? 'border-yellow-500/50' : 'border-gray-700'} shadow-sm">
              <div class="flex-1 min-w-0 pr-4">
                <div class="font-bold text-sm text-white truncate flex items-center gap-2">
                   ${i === 0 ? '<span class="text-yellow-500 text-xs text-shadow-md">👑</span>' : ''}
                   ${f.firstName} ${f.lastName || ''}
                </div>
                <div class="text-[10px] text-gray-400 font-mono mt-1">${f.phone || 'Sin télefono'} ${f.email ? '• ' + f.email : ''}</div>
                <div class="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Última: ${f.lastVisit}</div>
              </div>
              <div class="text-right shrink-0">
                <div class="text-[10px] font-black text-blue-400 uppercase tracking-widest">${f.visitCount} Visitas</div>
                <div class="text-sm font-black text-green-400 mt-0.5">$${f.ltv.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
     `;
  }

  container.innerHTML = `
    <div class="p-4 space-y-6 animate-fade-in pb-48">
      <div class="flex items-center gap-3 border-b border-gray-800 pb-4 mt-2">
        <div class="bg-yellow-500/10 border border-yellow-500/50 p-2 rounded-xl text-2xl shadow-inner">🏟️</div>
        <div>
          <h2 class="text-2xl font-black text-white uppercase tracking-tighter">Marketing Deportivo</h2>
          <p class="text-[10px] text-gray-400 font-mono uppercase tracking-widest text-blue-300">Analítica Post-Partido & CRM</p>
        </div>
      </div>

      <!-- SECTION 1: MATCH POST-MORTEM -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
        <h3 class="text-lg font-black text-white flex items-center gap-2 mb-1 uppercase tracking-wider">
          📈 Análisis Post-Partido
        </h3>
        <p class="text-[10px] text-gray-400 mb-4 font-mono">Búsqueda libre: Escribe el nombre de un equipo para encontrar su último partido.</p>
        
        <input list="crm-match-options" id="crm-match-select" 
          placeholder="Ej. America vs Chivas" 
          value="${STATE.sportsData.match || ''}"
          onchange="STATE.sportsData.match = this.value; renderManagerDashboard('sports');" 
          class="w-full bg-black text-white border border-gray-600 rounded-lg px-4 py-3 outline-none focus:border-yellow-500 font-bold text-sm shadow-inner transition">
        <datalist id="crm-match-options">
          ${uniqueMatchesList.map(g => `<option value="${g}"></option>`).join('')}
        </datalist>

        ${matchStatsHtml}
      </div>

      <!-- SECTION 2: TEAM CRM -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-2xl relative overflow-hidden mt-6">
        <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <h3 class="text-lg font-black text-white flex items-center gap-2 mb-1 uppercase tracking-wider">
          🎯 CRM por Equipo / Liga
        </h3>
        <p class="text-[10px] text-gray-400 mb-4 font-mono">Filtra clientes para enviar campañas de WhatsApp el próximo juego.</p>
        
        <input list="crm-team-options" id="crm-team-select" 
          placeholder="Escribe o selecciona un equipo..." 
          value="${STATE.sportsData.team || ''}"
          onchange="STATE.sportsData.team = this.value; renderManagerDashboard('sports');" 
          class="w-full bg-black text-white border border-gray-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 font-bold text-sm shadow-inner transition">
        <datalist id="crm-team-options">
          ${uniqueTeams.map(t => `<option value="${t}"></option>`).join('')}
        </datalist>

        ${crmHtml}
      </div>
    </div>
  `;
};

window.renderRestaurantMap = function() {
  const container = document.getElementById('restaurant-map-container');
  if (!container) return;

  const activeVisits = window.db.getVisits().filter(v => ['seated', 'active'].includes(v.status));
  
  let occupiedChairs = 0;
  let totalChairs = window.calculateTotalChairs();
  
  let html = `<div style="display: flex; gap: 15px; min-width: 900px; flex-wrap: nowrap;">`;
  
  window.MAP_CONFIG.zones.forEach(zone => {
    html += `<div style="background: #0a0a0a; padding: 15px; border-radius: 12px; border: 1px solid #333; flex: 1; min-width: 200px;">`;
    html += `<h3 style="color: #888; font-size: 11px; margin-bottom: 12px; text-transform: uppercase; text-align: center; letter-spacing: 1px;">${zone.name}</h3>`;
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px;">`;
    
    zone.tables.forEach(table => {
      const visit = activeVisits.find(v => String(v.table) === String(table.id));
      
      let isOccupied = !!visit;
      let pax = visit ? parseInt(visit.pax || 0) : 0;
      if (isOccupied) {
        occupiedChairs += pax;
      }
      
      const bgColor = isOccupied ? 'bg-red-900/40' : 'bg-green-900/40';
      const borderColor = isOccupied ? 'border-red-500' : 'border-green-500';
      const textColor = isOccupied ? 'text-red-400' : 'text-green-400';
      const statusText = isOccupied ? `${pax}/${table.cap}` : `${table.cap} lbrs`;
      
      html += `
        <div class="${bgColor} ${borderColor} border-2 rounded-lg p-2 text-center cursor-pointer transition-transform hover:scale-105 shadow-sm"
             onclick="handleMapTableClick('${table.id}')">
          <div style="font-size: 15px; font-weight: 900; color: #fff; line-height: 1;">${table.id}</div>
          <div class="${textColor}" style="font-size: 10px; font-weight: bold; margin-top: 4px;">${statusText}</div>
        </div>
      `;
    });
    
    html += `</div></div>`;
  });
  
  html += `</div>`;
  container.innerHTML = html;
  
  const chairsAvailEl = document.getElementById('map-chairs-available');
  if (chairsAvailEl) {
    chairsAvailEl.innerText = `${totalChairs - occupiedChairs} / ${totalChairs}`;
  }
};

window.handleMapTableClick = function(tableId) {
    const activeVisits = window.db.getVisits().filter(v => ['seated', 'active'].includes(v.status));
    const visit = activeVisits.find(v => String(v.table) === String(tableId));
    
    if (visit) {
        // Table is occupied
        alert(`Mesa ${tableId} Ocupada por ${visit.pax} personas.`);
    } else {
        // Table is free, pre-fill Check-In form and switch to Check-In tab
        switchHostessTab('checkin');
        const tableInput = document.getElementById('h-table');
        if (tableInput) tableInput.value = tableId;
        
        const nameInput = document.getElementById('h-firstname');
        if (nameInput) nameInput.focus();
    }
};

// === INJECTION SCRIPT FOR SPORTS (FEBRUARY 2026) ===
// Added securely via frontend console proxy to prevent backend API dependencies
window.injectFebruaryGames = function () {
  if (!confirm('¿Deseas cargar la nueva cartelera de Liga MX, NBA, Champions y Seleccion Mexicana para el mes de Febrero 2026 en todos los dispositivos?')) return;

  const games = [
    // Champions League (Playouts/Octavos)
    { id: 'feb26_cl_1', league: 'Champions', match: 'Real Madrid vs Liverpool', homeTeam: 'Real Madrid', awayTeam: 'Liverpool', date: '2026-02-24', time: '14:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_cl_2', league: 'Champions', match: 'Bayern Munich vs PSG', homeTeam: 'Bayern Munich', awayTeam: 'PSG', date: '2026-02-24', time: '14:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_cl_3', league: 'Champions', match: 'Man City vs Inter Milan', homeTeam: 'Man City', awayTeam: 'Inter Milan', date: '2026-02-25', time: '14:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_cl_4', league: 'Champions', match: 'Arsenal vs Barcelona', homeTeam: 'Arsenal', awayTeam: 'Barcelona', date: '2026-02-25', time: '14:00', sport: 'Futbol', status: 'pre' },

    // Seleccion Mexicana
    { id: 'feb26_mx_1', league: 'Selección', match: 'México vs Estados Unidos', homeTeam: 'México', awayTeam: 'Estados Unidos', date: '2026-02-28', time: '19:00', sport: 'Futbol', status: 'pre' },

    // Liga MX
    { id: 'feb26_ligamx_1', league: 'Liga MX', match: 'Atlas vs Tijuana', homeTeam: 'Atlas', awayTeam: 'Tijuana', date: '2026-02-22', time: '21:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_2', league: 'Liga MX', match: 'Necaxa vs Puebla', homeTeam: 'Necaxa', awayTeam: 'Puebla', date: '2026-02-23', time: '19:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_3', league: 'Liga MX', match: 'América vs Cruz Azul', homeTeam: 'América', awayTeam: 'Cruz Azul', date: '2026-02-27', time: '21:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_4', league: 'Liga MX', match: 'Monterrey vs Tigres', homeTeam: 'Monterrey', awayTeam: 'Tigres', date: '2026-02-27', time: '21:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_5', league: 'Liga MX', match: 'Pumas vs Chivas', homeTeam: 'Pumas', awayTeam: 'Chivas', date: '2026-02-28', time: '12:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_6', league: 'Liga MX', match: 'Toluca vs Pachuca', homeTeam: 'Toluca', awayTeam: 'Pachuca', date: '2026-02-28', time: '17:00', sport: 'Futbol', status: 'pre' },
    { id: 'feb26_ligamx_7', league: 'Liga MX', match: 'León vs Santos', homeTeam: 'León', awayTeam: 'Santos', date: '2026-02-28', time: '19:00', sport: 'Futbol', status: 'pre' },

    // NBA
    { id: 'feb26_nba_1', league: 'NBA', match: 'Lakers vs Warriors', homeTeam: 'Lakers', awayTeam: 'Warriors', date: '2026-02-26', time: '21:30', sport: 'Basketball', status: 'pre' },
    { id: 'feb26_nba_2', league: 'NBA', match: 'Celtics vs Knicks', homeTeam: 'Celtics', awayTeam: 'Knicks', date: '2026-02-26', time: '19:30', sport: 'Basketball', status: 'pre' },
    { id: 'feb26_nba_3', league: 'NBA', match: 'Heat vs Bulls', homeTeam: 'Heat', awayTeam: 'Bulls', date: '2026-02-27', time: '20:00', sport: 'Basketball', status: 'pre' },
    { id: 'feb26_nba_4', league: 'NBA', match: 'Mavericks vs Suns', homeTeam: 'Mavericks', awayTeam: 'Suns', date: '2026-02-28', time: '20:30', sport: 'Basketball', status: 'pre' },
    { id: 'feb26_nba_5', league: 'NBA', match: 'Nuggets vs Thunder', homeTeam: 'Nuggets', awayTeam: 'Thunder', date: '2026-02-28', time: '21:00', sport: 'Basketball', status: 'pre' },
    { id: 'feb26_nba_6', league: 'NBA', match: 'Spurs vs Pelicans', homeTeam: 'Spurs', awayTeam: 'Pelicans', date: '2026-02-25', time: '19:00', sport: 'Basketball', status: 'pre' }
  ];

  const currentMatches = window.db.getMatches() || [];

  // Merge uniquely by ID
  const existingMap = new Map();
  currentMatches.forEach(g => existingMap.set(g.id, g));
  games.forEach(g => existingMap.set(g.id, g));

  // Also push the new games to the daily "pending" games list if today is the game date, so they show on Waiter UI immediately
  const todayStr = new Date().toISOString().split('T')[0];
  const todayInfo = window.db.getDailyInfo();
  let updatedDaily = false;
  games.forEach(g => {
    if (g.date === todayStr) {
      if (!todayInfo.games.find(dg => dg.id === g.id)) {
        todayInfo.games.push(g);
        updatedDaily = true;
      }
    }

  });
  if (updatedDaily) window.db._save();

  const finalGames = Array.from(existingMap.values());

  if (window.dbFirestore && window.FB) {
    const { doc, setDoc } = window.FB;
    setDoc(doc(window.dbFirestore, 'config', 'allGames'), { games: finalGames }, { merge: true })
      .then(() => {
        alert('✅ Partidos de Febrero 2026 cargados exitosamente (Liga MX, NBA, Seleccion, Champions).');
        if (typeof window.renderManagerDashboard === 'function') {
          window.renderManagerDashboard('reports');
        }
      })
      .catch(e => {
        console.error('🔥 Error al guardar partidos:', e);
        alert('Error al guardar en Firebase: ' + e.message);
      });
  } else {
    alert('⚠️ Firebase de sincronización no está habilitado actualmente en este entorno.');
  }
};
