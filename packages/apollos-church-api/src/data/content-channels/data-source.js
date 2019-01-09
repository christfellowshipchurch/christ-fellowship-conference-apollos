import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

export default class ContentChannel extends RockApolloDataSource {
  resource = 'ContentChannels';

  all = () =>
    this.request()
      .expand('ChildContentChannels')
      .get();

  getRootChannels = () =>
    this.request()
      .filter(
        ROCK_MAPPINGS.DISCOVER_CONTENT_CHANNEL_IDS.map(
          (channelId) => `(Id eq ${channelId})`
        ).join(' or ')
      )
      .get();

  getFromId = (id) =>
    this.request()
      .filter(`Id eq ${id}`)
      .expand('ChildContentChannels')
      .top(1)
      .transform((list) => list[0])
      .get();

  getFromGuid = async (guid) => {
    const _id = await this.get(
      `/ContentChannels?$filter=Guid%20eq%20(guid'${guid}')&$select=Id&$top=1`
    );

    if (!_id) throw new Error('Invalid Content Channel Guid');

    console.log('Return ID: ', _id[0].id);

    return this.getFromId(_id[0].id);
  };
}
