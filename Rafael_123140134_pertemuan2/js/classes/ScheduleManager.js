class ScheduleManager {
    constructor() {
        this.schedules = this.loadSchedules();
    }
    
    loadSchedules = () => {
        const stored = localStorage.getItem('schedules');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveSchedules = () => {
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
    }
    
    addSchedule = (schedule) => {
        schedule.id = Date.now().toString();
        this.schedules.push(schedule);
        this.saveSchedules();
        return schedule;
    }
    
    updateSchedule = (id, updatedSchedule) => {
        const index = this.schedules.findIndex(s => s.id === id);
        if (index !== -1) {
            this.schedules[index] = {...this.schedules[index], ...updatedSchedule};
            this.saveSchedules();
            return true;
        }
        return false;
    }
    
    deleteSchedule = (id) => {
        const index = this.schedules.findIndex(s => s.id === id);
        if (index !== -1) {
            this.schedules.splice(index, 1);
            this.saveSchedules();
            return true;
        }
        return false;
    }
    
    getAllSchedules = () => {
        return [...this.schedules];
    }
    
    getScheduleById = (id) => {
        return this.schedules.find(s => s.id === id);
    }
    
    getSchedulesByDay = (day) => {
        return this.schedules.filter(s => s.day === day);
    }
}