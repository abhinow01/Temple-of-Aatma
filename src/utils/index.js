import * as jwtFuncs from "./jwt";
const validateBlogAddData = (data) =>{
    const requiredFields = [
    {key : 'title' , message : "Title is required"},
    { key: "body", message: "Body is required" },
    { key: "image", message: "Image is required" },
    { key: "slug", message: "Slug is required" },
    { key: "blog_count", message: "Blog count is required" },
    { key: "image_alt_text", message: "Image alt text is required" },
    { key: "meta_title", message: "Meta title is required" },
    { key: "meta_description", message: "Meta description is required" },
    {
      key: "meta_keywords",
      message: "Meta keywords are required",
      isArray: true,
    },
    ]
    for (const field of requiredFields ){
        if(!data[field.key] && (!Array.isArray(data[field.key]) || data[field.key].length === 0)){
            return getActionFailureResponse(field.message, field.key);
        }
    }
    return null;
}
const getActionSuccessResponse = (data, count) => {
  return {
    success: true,
    data: JSON.parse(JSON.stringify(data)),
    count: count ?? "not-requested",
  };
};

const getActionFailureResponse = (error, type) => {
  return {
    success: false,
    err: error?.message || error,
    type,
  };
};
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const websiteRegex =
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export const isValidWebsite = (website) => {
  return websiteRegex.test(website);
};

export {jwtFuncs ,  validateBlogAddData,getActionSuccessResponse, getActionFailureResponse };