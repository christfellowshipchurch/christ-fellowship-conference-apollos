import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

export default class Group extends RockApolloDataSource {
  resource = 'Groups';

  expanded = true;

  getFromGuid = (guid) =>
    this.request()
      .filter(`Guid eq (guid'${guid}')`)
      .transform((list) => list[0])
      .get();

  /**
   * TODO : add proper support for checking Int v Guid
   *      : move Int v Guid checking to data-source
   */
  getChildrenFromParentId = (id) =>
    this.request()
      .filter(`ParentGroupId eq ${id} and IsPublic and IsActive`)
      .get();

  getFromId = (id) => {
    if (!id) return false;
    const regexNotDigit = /\D/g;
    const idNotNumber = id.toString().match(regexNotDigit);

    return idNotNumber
      ? this.getFromGuid(id)
      : this.request()
          .find(id)
          .get();
  };

  getGroups = () => this.request().get();
}
