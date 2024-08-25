/* Form Elements */
const timePicker = document.getElementById('event-time');
const generateBtn = document.getElementById('generate');

/* Pages */
const generationPage = document.getElementById('generation-page');
const displayPage = document.getElementById('display-page');
const loadingPage = document.getElementById('loading-page');
let pages = [generationPage, displayPage, loadingPage];
let currentPage = 0;

/* Output Elements */
const timeOutput = document.getElementById('time-output');
const discordTimeOutput = document.getElementById('discord-ts-output');

generateBtn.addEventListener('click', onGenerateClicked);

function updateRouter() {
  pages.forEach((page, idx) => {
    if (idx !== currentPage) {
      page.style.display = 'none';
    } else {
      page.style.display = '';
    }
  });
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function parseTimestamp(queryParam) {
  const parsedTs = parseInt(queryParam);
  if (parsedTs != 0 && !parsedTs) {
    return null;
  }

  const date = new Date(parsedTs * 1000);
  if (!isValidDate(date)) {
    return null; // to make this guy have a consistent interface, either null or Date
  }
  return date;
}

function showOutput(dateObj) {
  timeOutput.innerText = dateObj.toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });

  discordTimeOutput.innerText = `<t:${dateObj.getTime() / 1000}:R>`;
}

function parseQuery() {
  const query = new URLSearchParams(window.location.search);
  const ts = query.get('ts');
  const parsedTs = parseTimestamp(ts);

  if (parsedTs !== null) {
    currentPage = 1;
    showOutput(parsedTs);
  } else {
    currentPage = 0;
  }
}

function onGenerateClicked() {
  const dateValue = new Date(timePicker.value);
  if (!isValidDate(dateValue)) {
    window.alert('Please input a valid date');
    return;
  }

  const query = new URLSearchParams(window.location.search);
  query.set('ts', dateValue.getTime() / 1000);
  window.location.href = window.location.origin + window.location.pathname + "?" + query.toString();

  refreshDisplay();
}

function refreshDisplay() {
  parseQuery();

  updateRouter();
}

refreshDisplay();
