import type { Quest, Repeatability, ScalingConfig } from './types';

export class QuestFactory {
    create({
        id,
        title,
        description = "",
        xp = 50,
        repeatable = "none",
        scaling = { enabled: false},
        target = 1
    }: {
        id: string;
        title: string;
        description?: string;
        xp?: number;
        repeatable?: Repeatability;
        scaling?: ScalingConfig;
        target?: number;
    }): Quest {
        return {
            id,
            title,
            description,
            xp,
            repeatable,
            scaling,
            status: "in_progress",
            progress: 0,
            target,
            lastCompletedAt: undefined,
            timesCompleted: 0
        };
    }

    dailyQuest(opts: Omit<Parameters<QuestFactory["create"]>[0], "repeatable">) {
        return this.create({ ...opts, repeatable: "daily"});
    }
    weeklyQuest(opts: Omit<Parameters<QuestFactory["create"]>[0], "repeatable">) {
        return this.create({ ...opts, repeatable: "weekly"});
    }
    monthlyQuest(opts: Omit<Parameters<QuestFactory["create"]>[0], "repeatable">) {
        return this.create({ ...opts, repeatable: "monthly"});
    }
}