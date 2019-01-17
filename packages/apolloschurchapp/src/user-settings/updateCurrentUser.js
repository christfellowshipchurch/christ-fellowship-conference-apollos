import gql from 'graphql-tag';

export default gql`
  mutation updateDetails(
    $firstName: String!
    $lastName: String!
    $email: String!
    $church: String!
    $department: String!
    $jobTitle: String!
  ) {
    updateProfileFields(
      input: [
        { field: FirstName, value: $firstName }
        { field: LastName, value: $lastName }
        { field: Email, value: $email }
      ]
      attributeValues: [
        { field: Church, value: $church }
        { field: MinistryDepartment, value: $department }
        { field: JobTitle, value: $jobTitle }
      ]
    ) {
      firstName
      lastName
      email
      id

      church
      department
      jobTitle
    }
  }
`;
