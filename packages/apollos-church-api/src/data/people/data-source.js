
import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

export default class Person extends RockApolloDataSource {
    resource = 'People';

    getFromAlias = async (alias) => {
        const _ids = await this.get(`/PersonAlias?$filter=Guid%20eq%20(guid'${alias}')&$select=PersonId`);

        if (!_ids) throw new Error('Invalid Person Alias');

        const _id = _ids[0].personId;

        if (_id) {
            return await this.get(`/People/${_id}?loadAttributes=expanded`);
        }

        return null;
    }
}