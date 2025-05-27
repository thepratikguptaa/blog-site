// Import config and Appwrite SDK
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Service class for all Appwrite database and storage operations
export class Service{
    client = new Client(); // Appwrite client instance
    databases; // Database instance
    bucket; // Storage instance
    
    constructor(){
        // Set endpoint and project for Appwrite
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client); // Initialize database
        this.bucket = new Storage(this.client); // Initialize storage
    }

    // Create a new post document
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    // Update an existing post document
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    // Delete a post document
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    // Get a single post by slug
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    // Get all posts (default: only active)
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // Upload a file to storage
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    // Delete a file from storage
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    // Get file preview URL
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    // Get file view URL
    getFileView(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

// Export a single instance
const service = new Service()
export default service