const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/app.log');

function ensureLogDirectory() {
  const dir = path.dirname(logFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function log(level, message) {
  ensureLogDirectory();
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level}]: ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(logMessage); // 同时输出到控制台
}

module.exports = {
  error: (message) => log('ERROR', message),
  info: (message) => log('INFO', message),
  warn: (message) => log('WARN', message),
};
