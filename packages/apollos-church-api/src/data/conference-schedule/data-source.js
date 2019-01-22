import { ContentItem } from '@apollosproject/data-connector-rock';
import moment from 'moment';

export default class ConferenceScheduleContentItem extends ContentItem.dataSource {
  getTime = (dateTime) => {
    console.log('Date Time: ', dateTime);
    const date = moment(dateTime);

    console.log('Time: ', date.format('LT'));
    return date ? date.format('LT') : '00:00';
  };
}
