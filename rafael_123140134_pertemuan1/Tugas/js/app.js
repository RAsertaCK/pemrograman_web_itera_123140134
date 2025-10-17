const App = {
    state: {
        tasks: [],
        currentFilter: 'all',
        currentSearch: '',
        editingTaskId: null
    },

    init: () => {
        App.state.tasks = Storage.loadTasks();
    
        UI.applyDarkMode();
        
        UI.init();
        
        App.render();
        
        document.getElementById('taskForm').addEventListener('submit', App.handleFormSubmit);
        
        console.log('Task Management app initialized successfully');
    },

    handleFormSubmit: (e) => {
        e.preventDefault();
        
        const taskName = document.getElementById('taskName').value;
        const course = document.getElementById('course').value;
        const deadline = document.getElementById('deadline').value;
        
        const validation = Validation.validateTaskForm(taskName, course, deadline);
        
        if (!validation.isValid) {
            Validation.displayErrors(validation.errors);
            return;
        }
        
        Validation.clearErrors();
        
        if (App.state.editingTaskId) {
            App.updateTask(App.state.editingTaskId, {
                name: Validation.sanitizeText(taskName),
                course: Validation.sanitizeText(course),
                deadline: deadline
            });
        } else {
            App.addTask({
                name: Validation.sanitizeText(taskName),
                course: Validation.sanitizeText(course),
                deadline: deadline
            });
        }
    },

    addTask: (taskData) => {
        const newTask = {
            id: Date.now().toString(),
            name: taskData.name,
            course: taskData.course,
            deadline: taskData.deadline,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        const taskValidation = Validation.validateTask(newTask);
        if (!taskValidation.isValid) {
            UI.showToast('Data tugas tidak valid', 'error');
            return;
        }
        
        App.state.tasks.push(newTask);
        App.saveTasks();
        App.render();
        UI.showToast('Tugas berhasil ditambahkan', 'success');
        UI.resetForm();
    },

    updateTask: (taskId, updates) => {
        const taskIndex = App.state.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
            UI.showToast('Tugas tidak ditemukan', 'error');
            return;
        }
        
        App.state.tasks[taskIndex] = {
            ...App.state.tasks[taskIndex],
            ...updates
        };
        
        App.saveTasks();
        App.render();
        App.state.editingTaskId = null;
        UI.showToast('Tugas berhasil diperbarui', 'success');
        UI.resetForm();
    },

    toggleTaskCompletion: (taskId) => {
        App.state.tasks = App.state.tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        App.saveTasks();
        App.render();
        
        const task = App.state.tasks.find(t => t.id === taskId);
        const message = task.completed ? 'Tugas ditandai selesai' : 'Tugas ditandai belum selesai';
        UI.showToast(message, 'success');
    },

    editTask: (taskId) => {
        const task = App.state.tasks.find(t => t.id === taskId);
        
        if (task) {
            App.state.editingTaskId = taskId;
            UI.populateForm(task);
            UI.showToast('Tugas siap diedit', 'success');
            
            document.getElementById('taskForm').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    deleteTask: (taskId) => {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            App.state.tasks = App.state.tasks.filter(task => task.id !== taskId);
            App.saveTasks();
            App.render();
            UI.showToast('Tugas berhasil dihapus', 'success');
        }
    },

    handleSearch: (searchTerm) => {
        App.state.currentSearch = searchTerm;
        App.render();
    },

    handleFilter: (filter) => {
        App.state.currentFilter = filter;
        App.render();
    },

    getFilteredTasks: () => {
        let filteredTasks = App.state.tasks;
        
        if (App.state.currentFilter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (App.state.currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }
        
        if (App.state.currentSearch) {
            const searchTerm = App.state.currentSearch.toLowerCase();
            filteredTasks = filteredTasks.filter(task => 
                task.name.toLowerCase().includes(searchTerm) || 
                task.course.toLowerCase().includes(searchTerm)
            );
        }
        
        return filteredTasks;
    },

    getStats: () => {
        const total = App.state.tasks.length;
        const completed = App.state.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        
        return { total, pending, completed };
    },

    saveTasks: () => {
        const success = Storage.saveTasks(App.state.tasks);
        if (!success) {
            UI.showToast('Gagal menyimpan data', 'error');
        }
    },

    render: () => {
        const filteredTasks = App.getFilteredTasks();
        const stats = App.getStats();
        
        UI.renderTasks(filteredTasks);
        UI.updateStats(stats.total, stats.pending, stats.completed);
    },

    exportTasks: () => {
        const dataStr = JSON.stringify(App.state.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `taskmanagement-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    },

    importTasks: (file) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                
                const validTasks = importedTasks.filter(task => {
                    const validation = Validation.validateTask(task);
                    return validation.isValid;
                });
                
                if (validTasks.length === 0) {
                    UI.showToast('Tidak ada data tugas yang valid', 'error');
                    return;
                }
                
                App.state.tasks = validTasks;
                App.saveTasks();
                App.render();
                UI.showToast(`Berhasil mengimpor ${validTasks.length} tugas`, 'success');
                
            } catch (error) {
                UI.showToast('File tidak valid', 'error');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
    }
};

document.addEventListener('DOMContentLoaded', App.init);

window.App = App;