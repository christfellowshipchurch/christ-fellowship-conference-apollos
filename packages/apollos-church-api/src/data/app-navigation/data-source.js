import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

export default class AppNavigationContentItem extends ContentItem.dataSource {
  getMobileNavigationChannel = async () =>
    this.byContentChannelId(
      ROCK_MAPPINGS.NAVIGATION_CONTENT_CHANNEL_IDS.MobileTabs[0]
    ).get();
}
