import gql from 'graphql-tag';
import {graphql} from "graphql";


export default class QueryPost {

    constructor(quantityPost: string,) {
        this.quantityPost = quantityPost;
    }

    getData() {
        return gql`
      query {
        allPosts(orderBy: updatedAt_DESC, first: ${this.quantityPost}) {
          id
          title      
          user {
            id
            name
          }
        }
      }
     `;
    }
}