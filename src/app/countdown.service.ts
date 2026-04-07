import { Injectable, signal, computed, OnDestroy, effect } from '@angular/core';

export interface TimeDiff {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const RETURN_DATE = new Date('2026-05-27T12:00:00');
const DEPARTURE_DATE = new Date('2026-01-05T09:30:00');

// Meetings are now an array of objects with start and end
export interface Meeting {
    start: Date;
    end: Date;
}

const MEETINGS: Meeting[] = [
    // 1st meeting: 03.02.26 17:15 to 10.02.26 12:00
    { start: new Date('2026-02-03T17:15:00'), end: new Date('2026-02-10T12:00:00') },
    // 2nd meeting: 30.04.26 10:00 to 05.05.26 18:00
    { start: new Date('2026-03-30T10:00:00'), end: new Date('2026-04-05T18:00:00') }
];

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

    // Returns the next upcoming meeting (or null if none)
    readonly nextMeeting = computed<Meeting | null>(() => {
        const now = this.now().getTime();
        return MEETINGS.find(m => m.start.getTime() > now) || null;
    });

    // Returns the current meeting if now is within any meeting range
    readonly currentMeeting = computed<Meeting | null>(() => {
        const now = this.now().getTime();
        return MEETINGS.find(m => m.start.getTime() <= now && now <= m.end.getTime()) || null;
    });

    // Returns all past meetings (ended before now)
    readonly pastMeetings = computed<Meeting[]>(() => {
        const now = this.now().getTime();
        return MEETINGS.filter(m => m.end.getTime() < now);
    });

    // Time until next meeting (or zero if none)
    readonly timeUntilMeeting = computed<TimeDiff>(() => {
        const next = this.nextMeeting();
        if (!next) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return this.calculateTimeDiff(this.now(), next.start);
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
