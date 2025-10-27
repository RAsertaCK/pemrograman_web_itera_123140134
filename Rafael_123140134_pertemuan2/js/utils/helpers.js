const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

const formatDateTime = (dateTimeString) => {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('id-ID', options);
}

const getWeatherIcon = (condition) => {
    const icons = {
        'Clear': '☀️',
        'Clouds': '⛅',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️'
    };
    
    return icons[condition] || '🌤️';
}

const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

const validateForm = (formData) => {
    const errors = {};
    
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value.trim() === '') {
            errors[key] = `${key} tidak boleh kosong`;
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatTime,
        formatDateTime,
        getWeatherIcon,
        generateId,
        validateForm,
        debounce,
        truncateText
    };
}