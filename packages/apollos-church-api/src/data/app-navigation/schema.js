import { gql } from 'apollo-server';

export default gql`
    type Group implements Node {
        id: ID!
        parentGroupId: Int
        name: String
        description: String
        
        image: ImageMedia

        childGroups: [Group]
    }
    extend type Query {
        group(id: String):  Group
        groups:             [Group]
    }
`;