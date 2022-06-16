export class Utils {
  static convertDateString(date: string | Date | undefined) {
    return `${new Date(date as Date).toLocaleDateString()}`
  }
}
