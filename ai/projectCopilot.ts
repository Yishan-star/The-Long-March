import { AiSuggestion, GameActionEvent, GameResources, QualityReport, SprintTask, TaskStatus } from '../types';

interface StrategyInput {
  resources: GameResources;
  history: GameActionEvent[];
}

interface ActionStrategy {
  suggest: (input: StrategyInput) => AiSuggestion;
}

class XiangRiverStrategy implements ActionStrategy {
  suggest({ resources }: StrategyInput): AiSuggestion {
    if (resources.soldiers < 40) {
      return {
        title: '第一关 AI 建议',
        recommendedAction: '地形隐蔽',
        reason: '当前兵力偏低，继续硬冲会触发兵力归零风险。',
        expectedImpact: '短期推进变慢，但能稳住生存线。'
      };
    }

    return {
      title: '第一关 AI 建议',
      recommendedAction: '强行突围',
      reason: '兵力和士气尚可，适合用高推进动作快速破局。',
      expectedImpact: '可缩短通关回合，降低长期补给损耗。'
    };
  }
}

class JinshaRiverStrategy implements ActionStrategy {
  suggest({ resources, history }: StrategyInput): AiSuggestion {
    const lastAction = history[history.length - 1]?.actionType;

    if (resources.morale < 35) {
      return {
        title: '第二关 AI 建议',
        recommendedAction: '组织渡江',
        reason: '士气不足时不宜频繁执行佯攻任务。',
        expectedImpact: '避免士气继续下滑导致直接失败。'
      };
    }

    if (lastAction === 'ferry') {
      return {
        title: '第二关 AI 建议',
        recommendedAction: '化装侦察',
        reason: '连续渡江后建议插入侦察动作提升船只效率。',
        expectedImpact: '提高后续每轮运输效率。'
      };
    }

    return {
      title: '第二关 AI 建议',
      recommendedAction: '声东击西',
      reason: '用战术动作拉开敌距，争取稳定运输窗口。',
      expectedImpact: '降低被敌军追上的时间压力。'
    };
  }
}

class LazikouDodgeStrategy implements ActionStrategy {
  suggest({ resources }: StrategyInput): AiSuggestion {
    if (resources.soldiers < 35) {
      return {
        title: '第三关 AI 建议',
        recommendedAction: '保守走位',
        reason: '当前兵力较低，被连续命中后容易直接失败。',
        expectedImpact: '通关速度略慢，但生存稳定性更高。'
      };
    }

    return {
      title: '第三关 AI 建议',
      recommendedAction: '连续横向移动',
      reason: '保持移动可降低被弹道锁定的概率。',
      expectedImpact: '减少受击次数，稳住士兵与士气。'
    };
  }
}

// [AI-新增] 工厂模式：按关卡动态选择策略对象
class StrategyFactory {
  static create(levelId: number): ActionStrategy {
    if (levelId === 1) {
      return new XiangRiverStrategy();
    }
    if (levelId === 2) {
      return new JinshaRiverStrategy();
    }
    return new LazikouDodgeStrategy();
  }
}

export const getAiSuggestion = (
  levelId: number,
  resources: GameResources,
  history: GameActionEvent[]
): AiSuggestion => {
  const strategy = StrategyFactory.create(levelId);
  return strategy.suggest({ resources, history });
};

const statusFromIssueCount = (issueCount: number): TaskStatus => {
  if (issueCount === 0) {
    return 'done';
  }
  if (issueCount === 1) {
    return 'doing';
  }
  return 'todo';
};

export const buildSprintTasks = (qualityReport: QualityReport, history: GameActionEvent[]): SprintTask[] => {
  const issueCount = qualityReport.issues.length;
  const hasHighRisk = qualityReport.issues.some((issue) => issue.severity === 'high');
  const coverageStatus = history.length >= 8 ? 'done' : 'doing';

  return [
    {
      id: 'task-risk-control',
      title: '风险动作参数回归',
      owner: 'AI助手+开发者',
      status: statusFromIssueCount(issueCount),
      reason: hasHighRisk ? '检测到高风险告警，需要优先调整关卡参数。' : '当前风险可控，保持持续回归验证。'
    },
    {
      id: 'task-data-observe',
      title: '关键事件埋点监控',
      owner: 'AI助手',
      status: coverageStatus,
      reason: history.length >= 8 ? '动作样本已覆盖主要路径。' : '样本量不足，建议继续采集玩家行为。'
    },
    {
      id: 'task-quality-gate',
      title: '质量门禁复核',
      owner: '开发者',
      status: qualityReport.score >= 80 ? 'done' : 'doing',
      reason: qualityReport.score >= 80 ? '质量分达到发布阈值。' : '质量分未达阈值，暂不建议发布。'
    }
  ];
};
