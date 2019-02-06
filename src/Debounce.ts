export default class Dbounce<T> {
  public hold: T | null = null;

  private id?: number;
  private time: number = 50;

  private fn: (arg: T) => void;
  constructor(fn: (arg: T) => void) {
    this.fn = fn;
  }

  public input(hold: T) {
    this.hold = hold;

    if (this.id) clearTimeout(this.id);
    this.id = setTimeout(() => {
      this.exec();
      this.id = undefined;
    }, this.time);
  }

  public exec() {
    this.fn(this.hold as any);
  }
}
