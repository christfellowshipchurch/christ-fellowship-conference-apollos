import { get } from 'lodash';
import RockGroupDataSource from '../rock-groups/data-source';

const replaceEmptyString = (str, value) => (!str || str === '' ? value : str);
const getAttributeValue = (obj, attr, fallback) =>
  replaceEmptyString(get(obj, `attributeValues.${attr}.value`, '6'), fallback);

export default class ConferenceGroupContentItem extends RockGroupDataSource {
  sortByBreakoutThenPriority = (a, b) => {
    console.log('Sorting Groups');

    const _a = {
      //   breakout: get(a, 'attributeValues.breakOut.value', '0').split(',')[0],
      //   priority: get(a, 'attributeValues.priority.value', '6'),

      breakout: getAttributeValue(a, 'breakOut', '0').split(',')[0],
      priority: getAttributeValue(a, 'priority', '6'),
    };
    const _b = {
      //   breakout: get(b, 'attributeValues.breakOut.value', '0').split(',')[0],
      //   priority: get(b, 'attributeValues.priority.value', '6'),

      breakout: getAttributeValue(b, 'breakOut', '0').split(',')[0],
      priority: getAttributeValue(b, 'priority', '6'),
    };

    console.log({ a, b });

    console.log({ _a, _b });

    if (_a.breakout === _b.breakout) {
      return parseInt(_a.priority, 10) - parseInt(_b.priority, 10);
    }
    return parseInt(_a.breakout, 10) - parseInt(_b.breakout, 10);
  };

  //   sortByBreakoutThenPriority = (groups) =>
  //     groups.sort((a, b) => {
  //       const _a = {
  //         //   breakout: get(a, 'attributeValues.breakOut.value', '0').split(',')[0],
  //         //   priority: get(a, 'attributeValues.priority.value', '6'),

  //         breakout: getAttributeValue(a, 'breakOut', '0').split(',')[0],
  //         priority: getAttributeValue(a, 'priority', '6'),
  //       };
  //       const _b = {
  //         //   breakout: get(b, 'attributeValues.breakOut.value', '0').split(',')[0],
  //         //   priority: get(b, 'attributeValues.priority.value', '6'),

  //         breakout: getAttributeValue(b, 'breakOut', '0').split(',')[0],
  //         priority: getAttributeValue(b, 'priority', '6'),
  //       };

  //       if (_a.breakout === _b.breakout) {
  //         return parseInt(_a.priority, 10) - parseInt(_b.priority, 10);
  //       }
  //       console.log('Sorting Groups');
  //       return parseInt(_a.breakout, 10) - parseInt(_b.breakout, 10);
  //     });
}
