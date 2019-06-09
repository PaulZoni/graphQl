import gql from "graphql-tag";


export default class MutationPost {

    constructor(text: string, title: string) {
        this.text = title;
        this.title = title;
    }


    getMutation() {
        return gql(`
            mutation createPost($text: String!, $title: String!){
                createPost(text: $text, title: $title) {
                    id
                }
        }`);
    }

    getVariable() {
        return {text: this.text, title: this.title};
    }

}