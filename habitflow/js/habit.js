export class Habit {
    constructor(title, frequency, priority) {
        this.id = crypto.randomUUID()
        this.title = title
        this.frequency = frequency
        this.priority = priority
        this.status = "Pending"
        this.createdAt = new Date()
    }

    changeStatus(newStatus) {
        this.status = newStatus
    }
}