import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// PostForm handles both create and update post forms
export default function PostForm({ post }) {
    // useForm hook for form state and validation
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "", // set default title
            slug: post?.$id || "", // set default slug
            content: post?.content || "", // set default content
            status: post?.status || "active", // set default status
        },
    });

    const navigate = useNavigate(); // for navigation after submit
    const userData = useSelector((state) => state.auth.userData); // get current user

    // Submit handler for form
    const submit = async (data) => {
        if (post) {
            // If editing, upload new image if provided
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage); // delete old image
            }

            // Update post in database
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`); // go to updated post
            }
        } else {
            // If creating, upload image first
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                // Create new post in database
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`); // go to new post
                }
            }
        }
    };

    // Function to transform title to slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    // Auto-update slug when title changes
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        // Form layout
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200/80">
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-4">
                    {/* Title input */}
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    {/* Slug input, auto-generates from title */}
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    {/* Rich text editor for content */}
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-4">
                    {/* Image upload input */}
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {/* Show current image if editing */}
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg border-2 border-gray-200 p-2 shadow-md"
                            />
                        </div>
                    )}
                    {/* Status select input */}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    {/* Submit button, changes text if editing */}
                    <Button type="submit" bgColor={post ? "bg-green-500 hover:bg-green-600" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}