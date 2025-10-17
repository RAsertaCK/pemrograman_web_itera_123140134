const Storage = {
    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return true;
        } catch (error) {
            console.error('Error saving tasks to localStorage:', error);
            return false;
        }
    },

    loadTasks: () => {
        try {
            const tasks = localStorage.getItem('tasks');
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error loading tasks from localStorage:', error);
            return [];
        }
    },

    saveDarkMode: (enabled) => {
        try {
            localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
            return true;
        } catch (error) {
            console.error('Error saving dark mode preference:', error);
            return false;
        }
    },

    loadDarkMode: () => {
        try {
            return localStorage.getItem('darkMode') === 'enabled';
        } catch (error) {
            console.error('Error loading dark mode preference:', error);
            return false;
        }
    },

    clearAll: () => {
        try {
            localStorage.removeItem('tasks');
            localStorage.removeItem('darkMode');
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    getStorageInfo: () => {
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length * 2; // UTF-16 characters
                }
            }
            return {
                totalSize: totalSize,
                totalSizeKB: (totalSize / 1024).toFixed(2),
                itemCount: localStorage.length
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    }
};