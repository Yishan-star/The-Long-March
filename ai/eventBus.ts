import { GameActionEvent } from '../types';

// [AI-新增] 观察者模式：关卡事件发布-订阅总线
export type GameActionSubscriber = (event: GameActionEvent) => void;

class GameEventBus {
  private subscribers = new Set<GameActionSubscriber>();

  subscribe(subscriber: GameActionSubscriber) {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  publish(event: GameActionEvent) {
    this.subscribers.forEach((subscriber) => subscriber(event));
  }
}

export const gameEventBus = new GameEventBus();
