import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownService } from './countdown.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  private countdownService = inject(CountdownService);

  protected timeUntilReturn = this.countdownService.timeUntilReturn;
  protected daysSinceDeparture = this.countdownService.daysSinceDeparture;
  protected timeUntilMeeting = this.countdownService.timeUntilMeeting;

  protected currentMeeting = this.countdownService.currentMeeting;
  protected nextMeeting = this.countdownService.nextMeeting;
  protected pastMeetings = this.countdownService.pastMeetings;

  protected isReturned = () => this.timeUntilReturn().days === 0 &&
    this.timeUntilReturn().hours === 0 &&
    this.timeUntilReturn().minutes === 0 &&
    this.timeUntilReturn().seconds === 0;

  protected isMeeting = () => this.currentMeeting() !== null;
}
