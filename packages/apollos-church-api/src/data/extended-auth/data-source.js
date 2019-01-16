import { Auth } from '@apollosproject/data-connector-rock';
import { AuthenticationError } from 'apollo-server';

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

  registerPersonWithFullName = async ({
    firstName,
    lastName,
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
