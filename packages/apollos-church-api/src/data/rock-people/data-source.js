import { AuthenticationError } from 'apollo-server';
import { Person } from '@apollosproject/data-connector-rock';
import { camelCase, mapKeys } from 'lodash';

export default class RockPerson extends Person.dataSource {
  getFromAlias = async (alias) => {
    const _ids = await this.get(
      `/PersonAlias?$filter=Guid%20eq%20(guid'${alias}')&$select=PersonId`
    );

    if (!_ids) throw new Error('Invalid Person Alias');

    const _id = _ids[0].personId;

    if (_id) {
      return await this.get(`/People/${_id}?loadAttributes=expanded`);
    }

    return null;
  };

  // fields is an array of objects matching the pattern
  // [{ field: String, value: String }]
  updateProfile = async (fields, attributeValues) => {
    const currentPerson = await this.context.dataSources.Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    const fieldsAsObject = fields.reduce(
      (accum, { field, value }) => ({
        ...accum,
        [field]: value,
      }),
      {}
    );

    await this.patch(`/People/${currentPerson.id}`, fieldsAsObject);

    const attributeValuesAsObject = attributeValues.reduce(
      (accum, { field, value }) => ({
        ...accum,
        [field]: { value },
      }),
      {}
    );

    console.log('Logging attributeValues', attributeValues);
    attributeValues.forEach(async (n, i) => {
      console.log('Logging n: ', n);

      const uri = `/People/AttributeValue/${currentPerson.id}/?attributeKey=${
        n.field
      }&attributeValue=${n.value}`;

      console.log('Logging URI: ', uri);
      await this.post(
        `/People/AttributeValue/${currentPerson.id}/?attributeKey=${
          n.field
        }&attributeValue=${n.value}`
      );
    });

    return {
      ...currentPerson,
      ...mapKeys(fieldsAsObject, (_, key) => camelCase(key)),
      attributeValues: {
        ...mapKeys(attributeValuesAsObject, (_, key) => camelCase(key)),
      },
    };
  };
}
