export class TemperatureConverter {
  static cToF(c) { return Math.round((c * 9/5 + 32) * 10) / 10; }
  static fToC(f) { return Math.round(((f - 32) * 5/9) * 10) / 10; }
}
