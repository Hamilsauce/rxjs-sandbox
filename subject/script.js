const createDayContents = () => {
  const days = [...document.querySelectorAll('.calendar-day')];
  
  days.forEach((day, i) => {
    day.innerHTML = `
    <div class="day-header">${i}</div>
    <div class="day-body">Big Suck</div>
    `
  })
  
};

createDayContents()