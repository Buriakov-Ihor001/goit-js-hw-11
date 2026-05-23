import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const datetimePicker = document.getElementById("datetime-picker");

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      iziToast.error({
        title: "Помилка",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);
startBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function updateTimer() {
  const now = new Date();
  const timeLeft = userSelectedDate - now;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    iziToast.success({ title: "Готово!", message: "Таймер завершився!", position: "topRight" });
    resetTimerUI();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function resetTimerUI() {
  document.querySelector("[data-days]").textContent = "00";
  document.querySelector("[data-hours]").textContent = "00";
  document.querySelector("[data-minutes]").textContent = "00";
  document.querySelector("[data-seconds]").textContent = "00";
  datetimePicker.disabled = false;
  startBtn.disabled = true;
}

startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;
  datetimePicker.disabled = true;
  startBtn.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});