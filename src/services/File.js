import {Client, Storage, ID ,Query} from 'appwrite';
import conf from '../conf/conf';

class FileService{
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.storage = new Storage(this.client);
    }

    //Upload file
    async uploadFile(file) {
        try{
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }catch(error){
            console.error("Appwrite service :: uploadFile :: erro", error);
            return false;
        }
    }

    //Delete file
    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(error){
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    //get file preview
    getFilePreview(fileId) {
    
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
    }

}

const fileservice = new FileService();

export default fileservice;