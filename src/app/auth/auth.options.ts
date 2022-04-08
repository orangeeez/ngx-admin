import { InjectionToken } from "@angular/core";

export interface ITelegramBotOptions {
    botName: string
  }

export const TELEGRAM_BOT_OPTIONS = new InjectionToken<ITelegramBotOptions>('Telegram Bot');