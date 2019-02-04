import { get } from 'lodash';
import RockGroupDataSource from '../rock-groups/data-source';

const replaceEmptyString = (str, value) => (!str || str === '' ? value : str);
const getAttributeValue = (obj, attr, fallback) =>
  replaceEmptyString(get(obj, `attributeValues.${attr}.value`, '6'), fallback);

export default class ConferenceGroupContentItem extends RockGroupDataSource {
  sortByBreakoutThenPriority = (a, b) => {
    const _a = {
      breakout: getAttributeValue(a, 'breakOut', '0').split(',')[0],
      priority: getAttributeValue(a, 'priority', '6'),
    };
    const _b = {
      breakout: getAttributeValue(b, 'breakOut', '0').split(',')[0],
      priority: getAttributeValue(b, 'priority', '6'),
    };

    if (_a.breakout === _b.breakout) {
      return parseInt(_a.priority, 10) - parseInt(_b.priority, 10);
    }
    return parseInt(_a.breakout, 10) - parseInt(_b.breakout, 10);
  };
}
