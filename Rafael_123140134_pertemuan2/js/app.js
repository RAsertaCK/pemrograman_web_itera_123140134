const scheduleManager = new ScheduleManager();
const taskManager = new TaskManager();
const noteManager = new NoteManager();

const domElements = {
    scheduleList: document.getElementById('schedule-list'),
    taskList: document.getElementById('task-list'),
    notesList: document.getElementById('notes-list'),
    addScheduleBtn: document.getElementById('add-schedule-btn'),
    addTaskBtn: document.getElementById('add-task-btn'),
    addNoteBtn: document.getElementById('add-note-btn'),
    scheduleModal: document.getElementById('schedule-modal'),
    taskModal: document.getElementById('task-modal'),
    noteModal: document.getElementById('note-modal'),
    scheduleForm: document.getElementById('schedule-form'),
    taskForm: document.getElementById('task-form'),
    noteForm: document.getElementById('note-form'),
    closeButtons: document.querySelectorAll('.close'),
    currentDate: document.getElementById('current-date'),
    currentTime: document.getElementById('current-time'),
    weatherInfo: document.getElementById('weather-info')
};

const renderSchedules = () => {
    const schedules = scheduleManager.getAllSchedules();
    
    if (schedules.length === 0) {
        domElements.scheduleList.innerHTML = `
            <div class="empty-state">
                <p>Belum ada jadwal kuliah. Tambahkan jadwal pertama Anda!</p>
            </div>
        `;
        return;
    }
    
    const dayOrder = {
        'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 
        'Jumat': 5, 'Sabtu': 6, 'Minggu': 7
    };
    
    schedules.sort((a, b) => {
        if (dayOrder[a.day] !== dayOrder[b.day]) {
            return dayOrder[a.day] - dayOrder[b.day];
        }
        return a.time.localeCompare(b.time);
    });
    
    domElements.scheduleList.innerHTML = schedules.map(schedule => `
        <div class="schedule-item">
            <div class="schedule-info">
                <strong>${schedule.name}</strong>
                <div class="schedule-time">${schedule.day}, ${formatTime(schedule.time)} - ${schedule.location}</div>
            </div>
            <div class="actions">
                <button class="btn btn-primary btn-sm edit-schedule" data-id="${schedule.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-schedule" data-id="${schedule.id}">Hapus</button>
            </div>
        </div>
    `).join('');
    
    attachScheduleEventListeners();
}

const renderTasks = () => {
    const tasks = taskManager.getAllTasks();
    
    if (tasks.length === 0) {
        domElements.taskList.innerHTML = `
            <div class="empty-state">
                <p>Belum ada tugas. Tambahkan tugas pertama Anda!</p>
            </div>
        `;
        return;
    }
    
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    
    domElements.taskList.innerHTML = tasks.map(task => {
        const priorityClass = `priority-${task.priority}`;
        const priorityText = {
            'high': 'Tinggi',
            'medium': 'Sedang',
            'low': 'Rendah'
        }[task.priority];
        
        return `
            <div class="task-item">
                <div class="task-info">
                    <strong>${task.name}</strong>
                    <span class="task-priority ${priorityClass}">${priorityText}</span>
                    ${task.description ? `<div>${task.description}</div>` : ''}
                    <div class="task-deadline">Deadline: ${formatDateTime(task.deadline)}</div>
                </div>
                <div class="actions">
                    <button class="btn btn-primary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Hapus</button>
                </div>
            </div>
        `;
    }).join('');
    
    attachTaskEventListeners();
}

const renderNotes = () => {
    const notes = noteManager.getAllNotes();
    
    if (notes.length === 0) {
        domElements.notesList.innerHTML = `
            <div class="note-empty">
                <div>📝</div>
                <p>Belum ada catatan. Tambahkan catatan pertama Anda!</p>
            </div>
        `;
        return;
    }
    
    domElements.notesList.innerHTML = notes.map(note => {
        const createdDate = new Date(note.createdAt);
        const updatedDate = new Date(note.updatedAt);
        const isEdited = updatedDate.getTime() > createdDate.getTime();
        
        return `
            <div class="note-item">
                <div class="note-header">
                    <h4 class="note-title">${note.title}</h4>
                    <div class="note-actions">
                        <button class="btn btn-primary btn-sm edit-note" data-id="${note.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-note" data-id="${note.id}">Hapus</button>
                    </div>
                </div>
                <div class="note-content">${note.content}</div>
                <div class="note-meta">
                    <span>Dibuat: ${formatDateTime(note.createdAt)}</span>
                    ${isEdited ? `<span>Diedit: ${formatDateTime(note.updatedAt)}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    attachNoteEventListeners();
}

const attachScheduleEventListeners = () => {
    document.querySelectorAll('.edit-schedule').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editSchedule(id);
        });
    });
    
    document.querySelectorAll('.delete-schedule').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteSchedule(id);
        });
    });
}

const attachTaskEventListeners = () => {
    document.querySelectorAll('.edit-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editTask(id);
        });
    });
    
    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteTask(id);
        });
    });
}

const attachNoteEventListeners = () => {
    document.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editNote(id);
        });
    });
    
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteNote(id);
        });
    });
}

const addSchedule = () => {
    document.getElementById('schedule-modal-title').textContent = 'Tambah Jadwal';
    domElements.scheduleForm.reset();
    document.getElementById('schedule-id').value = '';
    domElements.scheduleModal.style.display = 'flex';
}

const editSchedule = (id) => {
    const schedule = scheduleManager.getScheduleById(id);
    if (schedule) {
        document.getElementById('schedule-modal-title').textContent = 'Edit Jadwal';
        document.getElementById('schedule-id').value = schedule.id;
        document.getElementById('schedule-name').value = schedule.name;
        document.getElementById('schedule-day').value = schedule.day;
        document.getElementById('schedule-time').value = schedule.time;
        document.getElementById('schedule-location').value = schedule.location;
        domElements.scheduleModal.style.display = 'flex';
    }
}

const deleteSchedule = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
        if (scheduleManager.deleteSchedule(id)) {
            renderSchedules();
            showNotification('Jadwal berhasil dihapus!', 'success');
        }
    }
}

const addTask = () => {
    document.getElementById('task-modal-title').textContent = 'Tambah Tugas';
    domElements.taskForm.reset();
    document.getElementById('task-id').value = '';
    domElements.taskModal.style.display = 'flex';
}

const editTask = (id) => {
    const task = taskManager.getTaskById(id);
    if (task) {
        document.getElementById('task-modal-title').textContent = 'Edit Tugas';
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-name').value = task.name;
        document.getElementById('task-description').value = task.description || '';
        
        const deadline = new Date(task.deadline);
        const formattedDeadline = deadline.toISOString().slice(0, 16);
        document.getElementById('task-deadline').value = formattedDeadline;
        
        document.getElementById('task-priority').value = task.priority;
        domElements.taskModal.style.display = 'flex';
    }
}

const deleteTask = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        if (taskManager.deleteTask(id)) {
            renderTasks();
            showNotification('Tugas berhasil dihapus!', 'success');
        }
    }
}

const addNote = () => {
    document.getElementById('note-modal-title').textContent = 'Tambah Catatan';
    domElements.noteForm.reset();
    document.getElementById('note-id').value = '';
    domElements.noteModal.style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('note-content').focus();
    }, 100);
}

const editNote = (id) => {
    const note = noteManager.getNoteById(id);
    if (note) {
        document.getElementById('note-modal-title').textContent = 'Edit Catatan';
        document.getElementById('note-id').value = note.id;
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').value = note.content;
        domElements.noteModal.style.display = 'flex';
        
        setTimeout(() => {
            document.getElementById('note-content').focus();
        }, 100);
    }
}

const deleteNote = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
        if (noteManager.deleteNote(id)) {
            renderNotes();
            showNotification('Catatan berhasil dihapus!', 'success');
        }
    }
}

const updateDateTime = () => {
    const now = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    domElements.currentDate.textContent = now.toLocaleDateString('id-ID', options);
    
    domElements.currentTime.textContent = now.toLocaleTimeString('id-ID');
}

const fetchWeatherData = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dummyData = {
            name: 'Jakarta',
            main: {
                temp: 30,
                humidity: 78
            },
            weather: [
                {
                    main: 'Clouds',
                    description: 'berawan'
                }
            ],
            wind: {
                speed: 3.6
            }
        };
        
        displayWeatherData(dummyData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        domElements.weatherInfo.innerHTML = `
            <div class="empty-state">
                <p>Gagal memuat data cuaca. Silakan coba lagi nanti.</p>
            </div>
        `;
    }
}

const displayWeatherData = (data) => {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    
    domElements.weatherInfo.innerHTML = `
        <div class="weather-icon">${weatherIcon}</div>
        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
        <div class="weather-desc">${data.weather[0].description}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <span class="detail-label">Kelembaban</span>
                <span class="detail-value">${data.main.humidity}%</span>
            </div>
            <div class="weather-detail">
                <span class="detail-label">Angin</span>
                <span class="detail-value">${data.wind.speed} km/jam</span>
            </div>
        </div>
    `;
}

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

const initApp = () => {
    renderSchedules();
    renderTasks();
    renderNotes();
    updateDateTime();
    fetchWeatherData();
    
    setInterval(updateDateTime, 1000);
    
    domElements.addScheduleBtn.addEventListener('click', addSchedule);
    
    domElements.addTaskBtn.addEventListener('click', addTask);
    
    domElements.addNoteBtn.addEventListener('click', addNote);
    
    domElements.scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('schedule-id').value;
        const scheduleData = {
            name: document.getElementById('schedule-name').value,
            day: document.getElementById('schedule-day').value,
            time: document.getElementById('schedule-time').value,
            location: document.getElementById('schedule-location').value
        };
        
        if (id) {
            if (scheduleManager.updateSchedule(id, scheduleData)) {
                renderSchedules();
                showNotification('Jadwal berhasil diperbarui!', 'success');
            }
        } else {
            scheduleManager.addSchedule(scheduleData);
            renderSchedules();
            showNotification('Jadwal berhasil ditambahkan!', 'success');
        }
        
        domElements.scheduleModal.style.display = 'none';
    });
    
    domElements.taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('task-id').value;
        const taskData = {
            name: document.getElementById('task-name').value,
            description: document.getElementById('task-description').value,
            deadline: document.getElementById('task-deadline').value,
            priority: document.getElementById('task-priority').value
        };
        
        if (id) {
            if (taskManager.updateTask(id, taskData)) {
                renderTasks();
                showNotification('Tugas berhasil diperbarui!', 'success');
            }
        } else {
            taskManager.addTask(taskData);
            renderTasks();
            showNotification('Tugas berhasil ditambahkan!', 'success');
        }
        
        domElements.taskModal.style.display = 'none';
    });
    
    domElements.noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('note-id').value;
        const noteData = {
            title: document.getElementById('note-title').value || 'Catatan Tanpa Judul',
            content: document.getElementById('note-content').value
        };
        
        if (id) {
            if (noteManager.updateNote(id, noteData.content)) {
                if (noteData.title !== 'Catatan Tanpa Judul') {
                    const note = noteManager.getNoteById(id);
                    note.title = noteData.title;
                    noteManager.saveNotes();
                }
                renderNotes();
                showNotification('Catatan berhasil diperbarui!', 'success');
            }
        } else {
            noteManager.addNote(noteData);
            renderNotes();
            showNotification('Catatan berhasil ditambahkan!', 'success');
        }
        
        domElements.noteModal.style.display = 'none';
    });
    
    domElements.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            domElements.scheduleModal.style.display = 'none';
            domElements.taskModal.style.display = 'none';
            domElements.noteModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === domElements.scheduleModal) {
            domElements.scheduleModal.style.display = 'none';
        }
        if (e.target === domElements.taskModal) {
            domElements.taskModal.style.display = 'none';
        }
        if (e.target === domElements.noteModal) {
            domElements.noteModal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);