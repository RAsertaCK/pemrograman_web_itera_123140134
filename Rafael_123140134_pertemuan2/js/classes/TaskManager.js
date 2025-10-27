class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }
    
    loadTasks = () => {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    addTask = (task) => {
        task.id = Date.now().toString();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }
    
    updateTask = (id, updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks[index] = {...this.tasks[index], ...updatedTask};
            this.saveTasks();
            return true;
        }
        return false;
    }
    
    deleteTask = (id) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            return true;
        }
        return false;
    }
    
    toggleTaskCompletion = (id) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks[index].completed = !this.tasks[index].completed;
            this.saveTasks();
            return true;
        }
        return false;
    }
    
    getAllTasks = () => {
        return [...this.tasks];
    }
    
    getTaskById = (id) => {
        return this.tasks.find(t => t.id === id);
    }
    
    getPendingTasks = () => {
        return this.tasks.filter(t => !t.completed);
    }
    
    getCompletedTasks = () => {
        return this.tasks.filter(t => t.completed);
    }
    
    getHighPriorityTasks = () => {
        return this.tasks.filter(t => t.priority === 'high' && !t.completed);
    }
}