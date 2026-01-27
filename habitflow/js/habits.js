import { Habit } from "./habit.js"
import { getHabits, saveHabits } from "./storage.js"

const habitForm = document.getElementById("habit-form")
const titleInput = document.getElementById("habit-title")
const frequencySelect = document.getElementById("habit-frequency")
const prioritySelect = document.getElementById("habit-priority")
const habitsList = document.getElementById("habits-list")

let habits = getHabits()

renderHabits()

habitForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const title = titleInput.value
    const frequency = frequencySelect.value
    const priority = prioritySelect.value

    const newHabit = new Habit(title, frequency, priority)

    habits.push(newHabit)
    saveHabits(habits)

    renderHabits()
    habitForm.reset()
})

function renderHabits() {
    habitsList.innerHTML = ""

    habits.forEach((habit, index) => {
        const li = document.createElement("li")
        li.classList.add("habit-card")

        li.innerHTML = `
            <h4>${habit.title}</h4>

            <div class="habit-meta">
                <span>Frequency: 📅 ${habit.frequency}</span>
                <span>Priority: ${formatPriority(habit.priority)}</span>
                <span class="status ${habit.status === "Done" ? "done" : "pending"}">
                    Status: ${habit.status === "Done" ? "✅ Done" : "⏳ Pending"}
                </span>
            </div>

            <div class="habit-actions">
                <button class="status-btn">
                    ${habit.status === "Done" ? "Mark as pending" : "Mark as done"}
                </button>
                <button class="delete-btn">🗑 Delete</button>
            </div>
        `

        const deleteBtn = li.querySelector(".delete-btn")

        deleteBtn.addEventListener("click", () => {
            habits = habits.filter(h => h.id !== habit.id)
            saveHabits(habits)
            renderHabits()
        })


        const button = li.querySelector(".status-btn")
        button.addEventListener("click", () => {
            habit.status = habit.status === "Pending" ? "Done" : "Pending"
            saveHabits(habits)
            renderHabits()
        })

        habitsList.appendChild(li)
    })
}

function formatPriority(priority) {
    if (priority === "low") return "🟢 Low Priority"
    if (priority === "medium") return "🟠 Medium Priority"
    if (priority === "high") return "🔴 High Priority"
}

