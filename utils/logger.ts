/**
 * Logging utility for the Trusted Search Engine
 */

import { config } from '@/lib/config';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = config.app.nodeEnv === 'development' ? LogLevel.DEBUG : LogLevel.INFO;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    if (level > this.level) return;

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    
    const logEntry = {
      timestamp,
      level: levelName,
      message,
      ...context,
    };

    // In development, use console methods for better formatting
    if (config.app.nodeEnv === 'development') {
      switch (level) {
        case LogLevel.ERROR:
          console.error(`[${timestamp}] ERROR: ${message}`, context || '');
          break;
        case LogLevel.WARN:
          console.warn(`[${timestamp}] WARN: ${message}`, context || '');
          break;
        case LogLevel.INFO:
          console.info(`[${timestamp}] INFO: ${message}`, context || '');
          break;
        case LogLevel.DEBUG:
          console.debug(`[${timestamp}] DEBUG: ${message}`, context || '');
          break;
      }
    } else {
      // In production, use structured JSON logging
      console.log(JSON.stringify(logEntry));
    }
  }

  error(message: string, context?: LogContext) {
    this.log(LogLevel.ERROR, message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log(LogLevel.WARN, message, context);
  }

  info(message: string, context?: LogContext) {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: string, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context);
  }
}

export const logger = new Logger();