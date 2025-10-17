const Validation = {
    validateTaskForm: (taskName, course, deadline) => {
        const errors = {
            taskName: '',
            course: '',
            deadline: ''
        };

        let isValid = true;

        if (!taskName || taskName.trim() === '') {
            errors.taskName = 'Nama tugas tidak boleh kosong';
            isValid = false;
        } else if (taskName.trim().length < 3) {
            errors.taskName = 'Nama tugas minimal 3 karakter';
            isValid = false;
        } else if (taskName.trim().length > 100) {
            errors.taskName = 'Nama tugas maksimal 100 karakter';
            isValid = false;
        }

        if (!course || course.trim() === '') {
            errors.course = 'Mata kuliah tidak boleh kosong';
            isValid = false;
        } else if (course.trim().length < 2) {
            errors.course = 'Mata kuliah minimal 2 karakter';
            isValid = false;
        } else if (course.trim().length > 50) {
            errors.course = 'Mata kuliah maksimal 50 karakter';
            isValid = false;
        }

        if (!deadline) {
            errors.deadline = 'Deadline tidak boleh kosong';
            isValid = false;
        } else {
            const deadlineDate = new Date(deadline);
            const now = new Date();
            
            if (deadlineDate <= now) {
                errors.deadline = 'Deadline harus di masa depan';
                isValid = false;
            }
            
            if (deadlineDate > new Date(now.getFullYear() + 2, now.getMonth(), now.getDate())) {
                errors.deadline = 'Deadline maksimal 2 tahun dari sekarang';
                isValid = false;
            }
        }

        return {
            isValid,
            errors
        };
    },

    validateTask: (task) => {
        const errors = [];

        if (!task.id || typeof task.id !== 'string') {
            errors.push('ID tugas tidak valid');
        }

        if (!task.name || task.name.trim() === '') {
            errors.push('Nama tugas tidak valid');
        }

        if (!task.course || task.course.trim() === '') {
            errors.push('Mata kuliah tidak valid');
        }

        if (!task.deadline || isNaN(new Date(task.deadline).getTime())) {
            errors.push('Deadline tidak valid');
        }

        if (typeof task.completed !== 'boolean') {
            errors.push('Status tugas tidak valid');
        }

        if (!task.createdAt || isNaN(new Date(task.createdAt).getTime())) {
            errors.push('Tanggal pembuatan tidak valid');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    },

    sanitizeText: (text) => {
        if (typeof text !== 'string') return '';
        
        return text
            .trim()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },

    validateSearchQuery: (query) => {
        if (typeof query !== 'string') return '';
        
        const sanitized = Validation.sanitizeText(query);
        
        if (sanitized.length > 50) {
            return sanitized.substring(0, 50);
        }
        
        return sanitized;
    },

    displayErrors: (errors) => {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');

        if (errors.taskName) {
            document.getElementById('taskNameError').textContent = errors.taskName;
        }
        if (errors.course) {
            document.getElementById('courseError').textContent = errors.course;
        }
        if (errors.deadline) {
            document.getElementById('deadlineError').textContent = errors.deadline;
        }
    },

    clearErrors: () => {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
    }
};