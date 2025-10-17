const UI = {
    init: () => {
        UI.setMinimumDate();
        UI.setupEventListeners();
    },

    setMinimumDate: () => {
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 16);
        document.getElementById('deadline').min = formattedDate;
    },

    setupEventListeners: () => {
        document.getElementById('navToggle').addEventListener('click', UI.toggleNavigation);

        document.getElementById('darkModeToggle').addEventListener('click', UI.toggleDarkMode);

        document.getElementById('searchInput').addEventListener('input', UI.handleSearch);

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', UI.handleFilter);
        });
    },

    toggleNavigation: () => {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    },

    toggleDarkMode: () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            Storage.saveDarkMode(true);
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            Storage.saveDarkMode(false);
        }
    },

    handleSearch: (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (typeof App.handleSearch === 'function') {
            App.handleSearch(searchTerm);
        }
    },

    handleFilter: (e) => {
        const filter = e.target.dataset.filter;
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        if (typeof App.handleFilter === 'function') {
            App.handleFilter(filter);
        }
    },

    renderTasks: (tasks) => {
        const taskList = document.getElementById('taskList');
        
        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Tidak ada tugas</h3>
                    <p>Tambahkan tugas baru untuk memulai</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = tasks.map(task => {
            const deadline = new Date(task.deadline);
            const now = new Date();
            const isOverdue = !task.completed && deadline < now;
            
            return `
                <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
                    <div class="task-header-row">
                        <div>
                            <div class="task-title">${task.name}</div>
                            <div class="task-meta">
                                <span><i class="fas fa-book"></i> ${task.course}</span>
                                <span><i class="fas fa-calendar"></i> ${UI.formatDate(deadline)}</span>
                                ${isOverdue ? '<span class="overdue-text"><i class="fas fa-exclamation-circle"></i> Terlambat</span>' : ''}
                            </div>
                        </div>
                        <div class="task-status">
                            ${task.completed ? 
                                '<span class="status-badge completed"><i class="fas fa-check-circle"></i> Selesai</span>' : 
                                '<span class="status-badge pending"><i class="fas fa-clock"></i> Belum Selesai</span>'
                            }
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}" onclick="App.toggleTaskCompletion('${task.id}')">
                            <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i> ${task.completed ? 'Batal Selesai' : 'Tandai Selesai'}
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="App.editTask('${task.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="App.deleteTask('${task.id}')">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    updateStats: (total, pending, completed) => {
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('completedTasks').textContent = completed;
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },

    showToast: (message, type = 'success') => {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    resetForm: () => {
        document.getElementById('taskForm').reset();
        Validation.clearErrors();
    },

    populateForm: (task) => {
        document.getElementById('taskName').value = task.name;
        document.getElementById('course').value = task.course;
        document.getElementById('deadline').value = task.deadline;
    },

    applyDarkMode: () => {
        const isDarkMode = Storage.loadDarkMode();
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
};