import { Injectable, signal, computed, OnDestroy, effect } from '@angular/core';

export interface TimeDiff {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const RETURN_DATE = new Date('2026-06-01T12:00:00');
const DEPARTURE_DATE = new Date('2026-01-05T09:30:00');
const NEXT_MEETING = new Date('2026-02-03T17:15:00');

@Injectable({
    providedIn: 'root'
})
export class CountdownService implements OnDestroy {

    private readonly now = signal<Date>(new Date());
    private intervalId: any;

    readonly timeUntilReturn = computed<TimeDiff>(() => {
        return this.calculateTimeDiff(this.now(), RETURN_DATE);
    });

    readonly daysSinceDeparture = computed<number>(() => {
        const start = DEPARTURE_DATE.getTime();
        const current = this.now().getTime();
        if (current < start) return 0;

        const diffMs = current - start;
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    });

    readonly timeUntilMeeting = computed<TimeDiff>(() => {
        return this.calculateTimeDiff(this.now(), NEXT_MEETING);
    });

    constructor() {
        this.startTimer();
    }

    private startTimer() {
        this.intervalId = setInterval(() => {
            this.now.set(new Date());
        }, 1000);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private calculateTimeDiff(start: Date, target: Date): TimeDiff {
        const startTime = start.getTime();
        const targetTime = target.getTime();
        const diffMs = targetTime - startTime;

        if (diffMs <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }
}
