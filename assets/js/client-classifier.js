// ===================================
// CLIENT CLASSIFICATION SYSTEM
// ===================================
// Handles automatic classification of customers based on behavior patterns

const ClientClassifier = {
    /**
     * Get classification badge
     * @param {string} classification - Type: 'diamond', 'vip', 'blazin', 'new', 'regular'
     * @returns {string} HTML badge markup
     */
    getBadgeHTML(classification) {
        const badges = {
            'diamond': '<span class="badge-diamond">💎 DIAMOND</span>',
            'vip': '<span class="badge-vip">👑 VIP</span>',
            'blazin': '<span class="badge-blazin">🔥 BLAZIN\'</span>',
            'new': '<span class="badge-new">🌱 NUEVO</span>',
            'regular': '<span class="badge-regular">⭐ REGULAR</span>'
        };
        return badges[classification] || '';
    },

    /**
     * Get classification color
     * @param {string} classification
     * @returns {string} CSS color
     */
    getColor(classification) {
        const colors = {
            'diamond': '#60A5FA', // blue-400
            'vip': '#FBBF24',    // yellow-400
            'blazin': '#EF4444', // red-500
            'new': '#34D399',    // green-400
            'regular': '#9CA3AF' // gray-400
        };
        return colors[classification] || '#9CA3AF';
    },

    /**
     * Get classification description
     * @param {string} classification
     * @returns {string} Description
     */
    getDescription(classification) {
        const descriptions = {
            'diamond': 'Más de 1 visita/semana + Gasto >$2,500/semana',
            'vip': 'Gasto promedio >$2,500 + Visita múltiples sucursales',
            'blazin': '1+ visita por semana regularmente',
            'new': 'Primeras 3 visitas',
            'regular': 'Cliente regular'
        };
        return descriptions[classification] || '';
    }
};

// Export to global
window.ClientClassifier = ClientClassifier;
