const habitsKey = "habits"

export function getHabits () {
    const habits = localStorage.getItem(habitsKey)
    return habits ? JSON.parse(habits) : []
}

export function saveHabits(habits) {
    localStorage.setItem(habitsKey, JSON.stringify(habits))
    }
    