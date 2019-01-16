import gql from 'graphql-tag';

export default gql`
  mutation updateDetails(
    $firstName: String!
    $lastName: String!
    $church: String!
    $department: String!
    $jobTitle: String!
    $email: String!
  ) {
    updateProfileFields(
      input: [
        { field: FirstName, value: $firstName }
        { field: LastName, value: $lastName }
        { field: Church, value: $church }
        { field: MinistryDepartment, value: $department }
        { field: JobTitle, value: $jobTitle }
        { field: Email, value: $email }
      ]
    ) {
      firstName
      lastName
      church
      department
      jobTitle
      email
      id
    }
  }
`;
