export enum GameStatus {
  START_SCREEN = 'START_SCREEN',
  LEVEL_INTRO = 'LEVEL_INTRO',
  PLAYING = 'PLAYING',
  LEVEL_VICTORY = 'LEVEL_VICTORY',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY',
  QUIZ = 'QUIZ'
}

export interface GameResources {
  soldiers: number; // Health equivalent
  supplies: number; // Food/Ammo
  morale: number;   // Willpower
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  poemLine: string;
  backgroundUrl: string;
  objective: string;
}

export interface LevelProps {
  resources: GameResources;
  onUpdateResources: (newResources: GameResources | ((prev: GameResources) => GameResources)) => void;
  onComplete: () => void;
  onFail: (reason: string) => void;
  // [AI-新增] 统一动作埋点，供 AI 质量分析与项目看板使用
  onAction?: (event: LevelActionEventInput) => void;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

// [AI-新增] 关卡动作事件输入（由关卡组件上报）
export interface LevelActionEventInput {
  levelId: number;
  actionType: string;
  actionLabel: string;
  success: boolean;
  progressGain: number;
  resourceDelta: Partial<GameResources>;
  note: string;
}

// [AI-新增] 动作事件完整体（进入事件总线后补充 id/timestamp）
export interface GameActionEvent extends LevelActionEventInput {
  id: string;
  timestamp: number;
}

export type IssueSeverity = 'low' | 'medium' | 'high';

// [AI-新增] AI 质量问题项
export interface QualityIssue {
  id: string;
  severity: IssueSeverity;
  summary: string;
  suggestion: string;
}

// [AI-新增] AI 质量评估结果
export interface QualityReport {
  score: number; // 0 - 100
  issues: QualityIssue[];
  strengths: string[];
}

// [AI-新增] AI 行动建议
export interface AiSuggestion {
  title: string;
  recommendedAction: string;
  reason: string;
  expectedImpact: string;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

// [AI-新增] 轻量项目管理任务
export interface SprintTask {
  id: string;
  title: string;
  owner: string;
  status: TaskStatus;
  reason: string;
}
