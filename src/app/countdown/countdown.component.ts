import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number = null;
  public counter: number = 0;
  private countdownTimerRef: any = null;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`init value updated to: ${changes.init.currentValue}`);
    this.startCountdown();
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  startCountdown() {
    if(this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(()=>{
      --this.counter;
      this.processCountdown();
    }, 1000);
  }

  processCountdown() {
    // emitir event COUNT
    this.onDecrease.emit(this.counter);
    console.log(`count is ${this.counter}`);

    if (this.counter == 0) {
      // emit event COUNTER END
      this.onComplete.emit();
      console.log("--counter end--");
    } else {
      this.doCountdown();
    }
  }

}
