import { GameResources } from '../types';

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

// [AI-新增] 质量改进：统一资源边界收敛，避免出现负值或超过 100 的脏数据
export const normalizeResources = (resources: GameResources): GameResources => ({
  soldiers: clamp(resources.soldiers),
  supplies: clamp(resources.supplies),
  morale: clamp(resources.morale)
});
