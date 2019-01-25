import { Auth } from '@apollosproject/data-connector-rock';
import { AuthenticationError } from 'apollo-server';
import moment from 'moment';

export default class ExtendedAuth extends Auth.dataSource {
  createUserProfileWithFullName = async (props = {}) => {
    try {
      const { firstName, lastName, email } = props;

      return await this.post('/People', {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        IsSystem: false, // Required by Rock
        Gender: 0, // Required by Rock
      });
    } catch (err) {
      throw new Error('Unable to create profile!');
    }
  };

  createUserLogin = async (props = {}) => {
    try {
      const { email, password, personId } = props;

      return await this.post('/UserLogins', {
        PersonId: personId,
        EntityTypeId: 27, // A default setting we use in Rock-person-creation-flow
        UserName: email,
        PlainTextPassword: password,
        LastLoginDateTime: `${moment().toISOString()}`,
        IsConfirmed: true,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Unable to create user login!');
    }
  };

  registerPersonWithFullName = async ({
    firstName,
    lastName,
    church,
    email,
    password,
  }) => {
    const personExists = await this.personExists({ identity: email });
    if (personExists) throw new Error('User already exists!');

    const personId = await this.createUserProfileWithFullName({
      firstName,
      lastName,
      email,
    });

    console.log('<==== LOGGING PERSON ID ====> ', personId);

    await this.createUserLogin({
      email,
      password,
      personId,
    });

    const token = await this.authenticate({ identity: email, password });

    console.log('<==== LOGGING TOKEN ====> ', token);

    if (church) {
      await this.context.dataSources.Person.updateProfileAttributeValues([
        { field: 'Church', value: church },
      ]);
    }

    return token;
  };

  getCurrentPerson = async ({ cookie } = { cookie: null }) => {
    const { rockCookie } = this.context;
    const userCookie = cookie || rockCookie;
    if (userCookie) {
      const request = await this.request(
        'People/GetCurrentPerson?loadAttributes=expanded'
      ).get({
        options: { headers: { cookie: userCookie } },
      });
      return request;
    }
    throw new AuthenticationError('Must be logged in');
  };
}
