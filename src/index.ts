import { AppConstant } from "./AppConstant";
import { Day } from "./Day";
import { convertFromTuppled, IPost, TuppledPostInfo } from "./Post";

/**
 * マクロ: フィルターを操作し、先頭行を今週月曜にする
 */
function forwardToMonday() {
  const sheet = SpreadsheetApp
    .getActive()
    .getSheetByName(AppConstant.get("CALENDAR_SHEET_NAME"));

  const firstDayAsString = sheet
    .getRange(2, parseInt(AppConstant.get("CALENDAR_SHEET_DATE_COLUMN"), 10))
    .getValue() as string;
  const calculated = Day
    .today()
    .prevMonday()
    .elapsedDaysFrom(new Date(firstDayAsString)) + 1; // 経過日数+1で「〇〇日目」の表示となる

  const criteria = SpreadsheetApp
    .newFilterCriteria()
    .whenNumberGreaterThanOrEqualTo(calculated)
    .build();

  sheet
    .getFilter()
    .setColumnFilterCriteria(parseInt(AppConstant.get("CALENDAR_SHEET_DAY_COLUMN"), 10), criteria);
}

/**
 * マクロ: フィルターを解除し、1日目から閲覧出来るようにする
 */
function rewindFirstDay() {
  SpreadsheetApp
    .getActive()
    .getSheetByName(AppConstant.get("CALENDAR_SHEET_NAME"))
    .getFilter()
    .removeColumnFilterCriteria(parseInt(AppConstant.get("CALENDAR_SHEET_DAY_COLUMN"), 10));
}

/**
 * GET APIのレスポンス内容
 *
 * @see doGet()
 */
interface IApiResponse {
  posts: IPost[];
}

/**
 * GET API: 放送で読まれていない記事一覧を返す
 *
 * @see IApiResponse
 */
function doGet() {
  const sheet = SpreadsheetApp
    .openById(AppConstant.get("CALENDAR_SHEET_ID"))
    .getSheetByName(AppConstant.get("CALENDAR_SHEET_NAME"));

  const firstDayAsString = sheet
    .getRange(2, parseInt(AppConstant.get("CALENDAR_SHEET_DATE_COLUMN"), 10))
    .getValue() as string;
  const firstDay = new Day(new Date(firstDayAsString));
  const from = sheet
    .getFilter()
    .getColumnFilterCriteria(parseInt(AppConstant.get("CALENDAR_SHEET_DAY_COLUMN"), 10))
    .getCriteriaValues()[0] as number;
  const to = Day.today().nextSunday().elapsedDaysFrom(firstDay) + 1;

  const posts = sheet
    .getRange(`A${from + 1}:E${to + 1}`)
    .getValues()
    .map((tuppled: TuppledPostInfo) => convertFromTuppled(tuppled));

  const response: IApiResponse = { posts };

  return ContentService
    .createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(JSON.stringify(response));
}
