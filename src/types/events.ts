export type BaseEvent = {
    eventId: string;
    timestamp: number;
    x: number;
    y: number;
    eventType: EventType;
  };

  export enum EventType {
    Goal = "Goal",
    Collect = "Collect",
    Feed = "Feed",
    DroppedBall = "DroppedBall",
    PoorPass = "PoorPass",
  }

  export enum GoalType {
    Penalty = "Penalty",
    LongShot = "LongShot",
    MidShot = "MidShot",
  }
  
  export type GoalEvent = BaseEvent & {
    eventType: EventType.Goal;
    goalType: GoalType;
    scorer: string;
    assister?: string;
  };
  
  export type CollectEvent = BaseEvent & {
    eventType: EventType.Collect;
    collectWon: boolean;
    collectLost: boolean;
    leftCollect: boolean;
  };
  
  export type FeedEvent = BaseEvent & {
    eventType: EventType.Feed;
    wentIntoFeed: boolean;
  };
  
  export type DroppedBallEvent = BaseEvent & {
    eventType: EventType.DroppedBall;
  };
  
  export type PoorPassEvent = BaseEvent & {
    eventType: EventType.PoorPass;
  };
  
  export type KorfballEvent =
    | GoalEvent
    | CollectEvent
    | FeedEvent
    | DroppedBallEvent
    | PoorPassEvent;
  