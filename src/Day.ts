export class Day {
  public static today(): Day {
    return new Day(new Date());
  }

  constructor(private dateObj: Date) {}

  public nextSunday(): Day {
    const newDate = new Date(this.dateObj.getTime());
    newDate.setDate(this.dateObj.getDate() + (7 - this.dateObj.getDay()) % 7);
    return new Day(newDate);
  }

  public prevMonday(): Day {
    const newDate = new Date(this.dateObj.getTime());
    newDate.setDate(this.dateObj.getDate() - (6 + this.dateObj.getDay()) % 7);
    return new Day(newDate);
  }

  public elapsedDaysFrom(from: Day | Date): number {
    const d = (from instanceof Day) ? from.dateObj : from;
    return Math.floor((this.dateObj.getTime() - d.getTime()) / 1000 / 60 / 60 / 24);
  }
}
