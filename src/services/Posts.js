import {Client, Databases, ID ,Query} from 'appwrite';
import conf from '../conf/conf';

class PostService{
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.database = new Databases(this.client);
    }

    //Create a post 
    async createPost({ title, slug, content, featuredImageId, status, userId}) {
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage: featuredImageId,
                    status,
                    userId
                }
            );
        }catch(error){
            console.error("Appwrite service :: createPost:: erro", error);
            return false;
        }
    }

    //get single post
    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        }catch(error){
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    //get all activ posts
    async getAllPost() {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status','active')
                ]
            )
        }catch(error){
            console.log("Appwrite service :: getAllPost:: error", error);
            return [];
        }
    }

    //update post
    async updatePost(slug, {title, content, featuredImageId, status }) {
        try{
            return this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage:featuredImageId,
                    status
                }
            )
            }catch(error){
                console.error("appwrite service:: updatePost :: error ", error);
                return false;
            }

    }

    //delete post
    async deletePost(slug) {
        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        }catch(error){
            console.error("appwrite service :: deletpost :: error", error);
            return false;
        }
    }
}

const postservice = new PostService();

export default postservice;