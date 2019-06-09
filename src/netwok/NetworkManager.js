import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';


export default class NetworkManager {

    constructor(url) {
        this.apolloClient = new ApolloClient({
            uri: url,
        });
    }

    executeQuery(data, success, failure) {

        this.apolloClient.query({query: data.getData()})
            .then((result) => success(result))
            .catch((error) => failure(error))
    }

    exexuteMutation(data, success, failure) {
        this.apolloClient.mutate({
            mutation: data.getMutation(),
            variables: data.getVariable()
        })
            .then((result) => success(result))
            .catch((error) => failure(error))

    }

}