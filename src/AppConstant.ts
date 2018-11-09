export class AppConstant {
  public static get(key: string): string {
    return PropertiesService.getScriptProperties().getProperty(key);
  }

  private constructor() {}
}
