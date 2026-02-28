import React, { useMemo, useState } from 'react';
import { AiSuggestion, QualityReport, SprintTask } from '../types';
import { Bot, ChevronDown, ChevronUp, ClipboardCheck, AlertTriangle, Sparkles } from 'lucide-react';

interface AIProjectPanelProps {
  qualityReport: QualityReport;
  suggestion: AiSuggestion;
  sprintTasks: SprintTask[];
  eventFeed: string[];
}

const statusLabel: Record<SprintTask['status'], string> = {
  todo: '待办',
  doing: '进行中',
  done: '已完成'
};

const statusStyle: Record<SprintTask['status'], string> = {
  todo: 'text-red-400',
  doing: 'text-yellow-300',
  done: 'text-green-400'
};

const AIProjectPanel: React.FC<AIProjectPanelProps> = ({ qualityReport, suggestion, sprintTasks, eventFeed }) => {
  const [collapsed, setCollapsed] = useState(true);

  const scoreColor = useMemo(() => {
    if (qualityReport.score >= 85) {
      return 'text-green-400';
    }
    if (qualityReport.score >= 60) {
      return 'text-yellow-300';
    }
    return 'text-red-400';
  }, [qualityReport.score]);

  return (
    <div className="absolute right-2 top-24 z-[60] pointer-events-auto">
      <div
        className={`bg-stone-950/90 border border-cyan-900/80 rounded-lg shadow-2xl backdrop-blur-sm ${
          collapsed ? 'w-[110px]' : 'w-[min(88vw,360px)]'
        }`}
      >
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="w-full p-3 flex items-center justify-between border-b border-stone-700/80"
        >
          <div className="flex items-center gap-2 text-cyan-300">
            <Bot size={16} />
            <span className="text-sm font-bold tracking-wide">{collapsed ? 'AI 助手' : 'AI 工程助手'}</span>
          </div>
          {collapsed ? <ChevronDown size={16} className="text-stone-300" /> : <ChevronUp size={16} className="text-stone-300" />}
        </button>

        {!collapsed && (
          <div className="p-3 space-y-3 text-xs">
            <div className="bg-stone-900/70 rounded p-3 border border-stone-700">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">质量评分</span>
                <span className={`font-bold text-base ${scoreColor}`}>{qualityReport.score}</span>
              </div>
              {qualityReport.issues.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {qualityReport.issues.slice(0, 2).map((issue) => (
                    <div key={issue.id} className="text-stone-300">
                      <div className="flex items-center gap-1 text-red-300">
                        <AlertTriangle size={12} />
                        <span>{issue.summary}</span>
                      </div>
                      <div className="text-stone-500 mt-1">建议：{issue.suggestion}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-300 mt-2">无阻断项，可继续迭代。</p>
              )}
            </div>

            <div className="bg-cyan-950/40 rounded p-3 border border-cyan-900/70">
              <div className="flex items-center gap-2 text-cyan-300 mb-1">
                <Sparkles size={13} />
                <span>{suggestion.title}</span>
              </div>
              <p className="text-white">推荐动作：{suggestion.recommendedAction}</p>
              <p className="text-stone-300 mt-1">原因：{suggestion.reason}</p>
              <p className="text-stone-400 mt-1">预期：{suggestion.expectedImpact}</p>
            </div>

            <div className="bg-stone-900/70 rounded p-3 border border-stone-700">
              <div className="flex items-center gap-2 text-stone-200 mb-2">
                <ClipboardCheck size={13} />
                <span>迭代任务看板</span>
              </div>
              <div className="space-y-1">
                {sprintTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between gap-2">
                    <span className="text-stone-300 truncate">{task.title}</span>
                    <span className={`${statusStyle[task.status]} shrink-0`}>{statusLabel[task.status]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 rounded p-3 border border-stone-800">
              <div className="text-stone-400 mb-2">实时事件流</div>
              <div className="space-y-1 max-h-24 overflow-auto">
                {eventFeed.length === 0 && <p className="text-stone-500">等待玩家行为数据...</p>}
                {eventFeed.map((line, index) => (
                  <p key={`${line}-${index}`} className="text-stone-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProjectPanel;
