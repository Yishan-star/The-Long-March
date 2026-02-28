import { GameActionEvent, GameResources, QualityIssue, QualityReport } from '../types';

interface QualityContext {
  resources: GameResources;
  history: GameActionEvent[];
}

interface QualityRule {
  id: string;
  penalty: number;
  check: (context: QualityContext) => QualityIssue | null;
}

// [AI-新增] 责任链模式：将质量规则解耦为可组合的检查节点
const qualityRules: QualityRule[] = [
  {
    id: 'resource-floor',
    penalty: 22,
    check: ({ resources }) => {
      const minResource = Math.min(resources.soldiers, resources.supplies, resources.morale);
      if (minResource >= 25) {
        return null;
      }
      return {
        id: 'resource-floor',
        severity: minResource < 10 ? 'high' : 'medium',
        summary: '关键资源低于安全阈值，存在失败风险。',
        suggestion: '优先执行低消耗动作，先把最低资源恢复到 30 以上。'
      };
    }
  },
  {
    id: 'action-diversity',
    penalty: 14,
    check: ({ history }) => {
      if (history.length < 4) {
        return null;
      }
      const recentActions = history.slice(-4).map((event) => event.actionType);
      const diversity = new Set(recentActions).size;
      if (diversity >= 2) {
        return null;
      }
      return {
        id: 'action-diversity',
        severity: 'medium',
        summary: '最近操作过于单一，策略弹性不足。',
        suggestion: '下一步改用不同动作，平衡推进速度与资源损耗。'
      };
    }
  },
  {
    id: 'progress-rhythm',
    penalty: 10,
    check: ({ history }) => {
      if (history.length < 5) {
        return null;
      }
      const recent = history.slice(-5);
      const avgProgress = recent.reduce((sum, event) => sum + event.progressGain, 0) / recent.length;
      if (avgProgress >= 8) {
        return null;
      }
      return {
        id: 'progress-rhythm',
        severity: 'low',
        summary: '推进节奏偏慢，可能导致后续资源压力累积。',
        suggestion: '在保障士兵与士气安全的前提下，至少执行一次中高推进动作。'
      };
    }
  }
];

export const runQualityPipeline = (resources: GameResources, history: GameActionEvent[]): QualityReport => {
  let score = 100;
  const issues: QualityIssue[] = [];

  for (const rule of qualityRules) {
    const issue = rule.check({ resources, history });
    if (issue) {
      issues.push(issue);
      score -= rule.penalty;
    }
  }

  const strengths: string[] = [];
  if (issues.length === 0) {
    strengths.push('当前运行状态稳定，未发现明显质量风险。');
  }

  const uniqueActions = new Set(history.slice(-6).map((event) => event.actionType)).size;
  if (uniqueActions >= 3) {
    strengths.push('最近决策具备多样性，策略冗余充足。');
  }

  if (Math.min(resources.soldiers, resources.supplies, resources.morale) >= 50) {
    strengths.push('资源储备健康，具备应对突发事件的缓冲空间。');
  }

  return {
    score: Math.max(0, score),
    issues,
    strengths
  };
};
