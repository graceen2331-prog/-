export interface GeneratedCode {
  html: string;
  explanation: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface HistoryItem {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
}