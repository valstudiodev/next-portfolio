const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');

const DAILY_GOAL_HOURS = 4;
const BREAK_MINUTES = 50;
const STATS_FILE = path.join(process.cwd(), 'stats.json');

function openBrowser(url) {
  const platformCommands = {
    win32: ['cmd', ['/c', 'start', '', url]],
    darwin: ['open', [url]],
    linux: ['xdg-open', [url]],
  };

  const command = platformCommands[process.platform];

  if (!command) {
    console.warn(`Не вдалося відкрити браузер автоматично на ${process.platform}`);
    return;
  }

  spawn(command[0], command[1], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

function loadStats() {
  if (!fs.existsSync(STATS_FILE)) {
    return { sessions: [] };
  }

  try {
    return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  } catch {
    return { sessions: [] };
  }
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}г ${String(minutes).padStart(
    2,
    '0',
  )}хв ${String(seconds).padStart(2, '0')}с`;
}

function createProgressBar(currentSec, goalHours) {
  const goalSec = goalHours * 3600;
  const percentage = Math.min(Math.floor((currentSec / goalSec) * 100), 100);
  const width = 12;
  const completed = Math.floor((percentage / 100) * width);
  const bar =
    chalk.green('█'.repeat(completed)) +
    chalk.gray('░'.repeat(width - completed));

  return `${bar} ${percentage}%`;
}

const arg = process.argv[2];

if (arg === 'start') {
  const startTime = Date.now();
  let isExiting = false;

  console.log(
    '\n' +
    chalk.bgBlue.white(' TRACKER ') +
    chalk.cyan(` Сесія розпочата: ${new Date().toLocaleTimeString()}`),
  );

  const child = spawn('npx', ['next', 'dev'], {
    stdio: ['inherit', 'pipe', 'inherit'],
    shell: true,
  });

  let browserOpened = false;

  child.stdout.on('data', (data) => {
    const output = data.toString();

    process.stdout.write(output);

    if (!browserOpened && output.includes('Local:')) {
      browserOpened = true;
      openBrowser('http://localhost:3000/en');
    }
  });

  const breakTimer = setInterval(() => {
    process.stdout.write(
      '\n' +
      chalk.bgRed.white.bold(' ☕ ПЕРЕРВА! ') +
      chalk.bold.red(
        ` Ви працюєте вже ${BREAK_MINUTES} хв. Зробіть паузу!\n`,
      ),
    );
  }, 1000 * 60 * BREAK_MINUTES);

  const handleExit = (exitCode = 0) => {
    if (isExiting) {
      return;
    }

    isExiting = true;
    clearInterval(breakTimer);

    const durationSec = Math.floor((Date.now() - startTime) / 1000);

    if (durationSec > 5) {
      const stats = loadStats();

      stats.sessions.push({
        start: new Date(startTime).toISOString(),
        duration: durationSec,
      });

      fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));

      process.stdout.write(
        '\n' +
        chalk.bgGreen.black(' SAVED ') +
        ` Працювали: ${formatTime(durationSec)}\n`,
      );
    }

    process.exit(exitCode);
  };

  process.once('SIGINT', () => handleExit(0));
  process.once('SIGTERM', () => handleExit(0));
  child.once('exit', (code) => handleExit(code ?? 0));
}

if (arg === 'stat') {
  const stats = loadStats();

  if (!stats.sessions || stats.sessions.length === 0) {
    console.log(chalk.yellow('\nℹ️ Статистика порожня. Попрацюйте трохи!'));
    process.exit(0);
  }

  const table = new Table({
    head: [
      chalk.blue('Дата'),
      chalk.blue('Час роботи'),
      chalk.blue('Прогрес дня'),
    ],
    style: {
      head: [],
      border: [],
    },
  });

  const dailyTotals = {};
  let totalSec = 0;

  stats.sessions.forEach((session) => {
    const date = new Date(session.start).toLocaleDateString('uk-UA');

    dailyTotals[date] = (dailyTotals[date] || 0) + session.duration;
    totalSec += session.duration;
  });

  Object.keys(dailyTotals)
    .sort((a, b) => {
      const parseDate = (date) =>
        new Date(date.split('.').reverse().join('-'));

      return parseDate(a) - parseDate(b);
    })
    .forEach((date) => {
      table.push([
        date,
        formatTime(dailyTotals[date]),
        createProgressBar(dailyTotals[date], DAILY_GOAL_HOURS),
      ]);
    });

  console.log(chalk.bold.magenta('\n📊 ВАШ ПРОГРЕС ПО ПРОЄКТУ:'));
  console.log(table.toString());
  console.log(
    chalk.bold.bgGreen.black(` УСЬОГО ВІДПРАЦЬОВАНО: ${formatTime(totalSec)} `) +
    '\n',
  );
}
