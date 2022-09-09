const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { languages, continents, countries } = require("./data");

const typeDefs = gql`
  type Country {
    id: ID!
    name: String!
    code: String!
    language: Language
    continent: Continent
    continent_code: String
  }
  type Language {
    id: ID!
    name: String!
    code: String!
    country: Country
    continent: Continent
    continent_code: String
  }
  type Continent {
    id: ID!
    name: String!
    code: String!
    countries: [Country]
  }
  type Query {
    countries: [Country!]
    country(code: String!): Country!
    languages: [Language!]
    language(code: String!): Language!
    continents: [Continent!]
    continent(code: String!): Continent!
  }
`;

const resolvers = {
  Query: {
    countries: () => countries,
    country: (parent, args) =>
      countries.find((country) => country.code === args.code),

    languages: () => languages,
    language: (parent, args) =>
      languages.find((language) => language.code === args.code),

    continents: () => continents,
    continent: (parent, args) =>
      continents.find((continent) => continent.code === args.code),
  },

  Country: {
    language: (parent) =>
      languages.find((language) => language.code === parent.code),
    continent: (parent) =>
      continents.find((continent) => continent.code === parent.continent_code),
  },

  Language: {
    country: (parent) =>
      countries.find((country) => country.code === parent.code),
    continent: (parent) =>
      continents.find((continent) => continent.code === parent.continent_code),
  },

  Continent: {
    countries: (parent) =>
      countries.filter((country) => country.continent_code === parent.code),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`Apollo server is up at ${url}`);
});
