import { ContentItem } from '@apollosproject/data-connector-rock';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import { get } from 'lodash';
import ConferenceGroupContentItem from '../conference-group';

export default class ConferenceScheduleContentItem extends ContentItem.dataSource {
  getTime = (dateTime) => {
    const date = moment(dateTime);

    return date ? date.format('h:mmA') : '00:00';
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

  getScheduleItemGroupsByBreakoutSession = async (breakoutSession) => {
    const BREAKOUT_TYPE_ID = 41;
    const allBreakouts = await this.context.dataSources.ConferenceGroupContentItem.getFromTypeId(
      BREAKOUT_TYPE_ID
    );

    if (allBreakouts) {
      const breakoutsBySession = allBreakouts.filter((n) => {
        const sessions = get(n, 'attributeValues.breakOut.value').split(',');

        return sessions.includes(breakoutSession);
      });

      return breakoutsBySession;
    }

    return [];
  };
}
