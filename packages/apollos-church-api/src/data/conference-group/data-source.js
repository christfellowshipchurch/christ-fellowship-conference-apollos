import { get } from 'lodash';
import RockGroupDataSource from '../rock-groups/data-source';

export default class ConferenceGroupContentItem extends RockGroupDataSource {
  sortByBreakoutThenPriority = (a, b) => {
    const _a = {
      breakout: get(a, 'attributeValues.breakOut.value', '0').split(',')[0],
      priority: get(a, 'attributeValues.priority.value', '0'),
    };
    const _b = {
      breakout: get(b, 'attributeValues.breakOut.value', '0').split(',')[0],
      priority: get(b, 'attributeValues.priority.value', '0'),
    };

    if (_a.breakout === _b.breakout) {
      return parseInt(_a.priority, 10) - parseInt(_b.priority, 10);
    }
    return parseInt(_a.breakout, 10) - parseInt(_b.breakout, 10);
  };
}
