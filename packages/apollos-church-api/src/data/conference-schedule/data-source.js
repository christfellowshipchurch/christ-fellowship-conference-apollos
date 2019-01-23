import { ContentItem } from '@apollosproject/data-connector-rock';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';

export default class ConferenceScheduleContentItem extends ContentItem.dataSource {
  getTime = (dateTime) => {
    const date = moment(dateTime);

    return date ? date.format('LT') : '00:00';
  };

  extendAndSanitizeHtmlContent = (htmlContent, args) => {
    let newHtmlContent = '';

    args.forEach(async (n, i) => {
      const concatStr = newHtmlContent.concat(i !== 0 ? '/n' : '', n);
      newHtmlContent = concatStr;
    });

    return sanitizeHtml(
      newHtmlContent.concat(htmlContent === '' ? '' : `\n${htmlContent}`)
    );
  };
}
