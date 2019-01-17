import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

const LIVE_CONTENT = () => {
  const date = new Date(
    new Date() - new Date().getTimezoneOffset() * 1000 * 60
  );
  return `((StartDateTime lt datetime'${date.toISOString()}') or (StartDateTime eq null)) and ((ExpireDateTime gt datetime'${date.toISOString()}') or (ExpireDateTime eq null))`;
};

export default class ExtendedContentItem extends ContentItem.dataSource {
  byUserFeed = () =>
    this.request()
      .filterOneOf(
        ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS.map(
          (id) => `ContentChannelId eq ${id}`
        )
      )
      .andFilter(LIVE_CONTENT())
      .orderBy('StartDateTime', 'desc');
}
