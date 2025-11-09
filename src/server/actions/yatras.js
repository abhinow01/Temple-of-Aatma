"use server"
import dbConnect from "@/config/db-connect"
import Yatra from "../models/yatra"
import { getActionFailureResponse, getActionSuccessResponse, validateYatraData } from "@/utils";
import mongoose from "mongoose";
export const addYatra = async(data) => {
    try{
    await dbConnect();
    const validationError = validateYatraData(data);
    if(validationError) return validationError;
    data.slug = data.slug.replaceAll(" ", "-").toLowerCase();
    const resp = await Yatra.create(data);
    return getActionSuccessResponse(resp);
    }catch(error){
        return getActionFailureResponse(error.message, "toast");
    }
}

export const getAllYatras = async (filter, skip , limit , projection)=>{
    try{
        await dbConnect();
        let searchFilter = {};
        if(filter){
            searchFilter = filter
        }
        let query = Yatra.find(searchFilter).sort({ _id: -1 });
            if(skip){
        query = query.skip(skip);
    }
    if(limit){
        query = query.limit(limit);
    }
    if(projection){
        query = query.select(projection);
    }
    const data = await query.lean();
    const count = await Yatra.countDocuments();
    return getActionSuccessResponse(data , count);
    }catch(error){
        return getActionFailureResponse( error , "toast");
    }
}

export const getAllDataBySearch = async (searchValue)=>{
    try {
    const data = await Yatra.find({
      title: { $regex: searchValue, $options: "i" },
    }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
}

export const updateYatra = async (id, data) => {
  try {
    await dbConnect();

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid ID format", "toast");
    }

    // Validate data object
    if (!data || typeof data !== "object") {
      console.log("Invalid data:", data);
      return getActionFailureResponse("Invalid data", "toast");
    }

    // Run validation only if published (not draft)
    if (data.published === true || String(data.published) === "true") {
      const validationError = validateYatraData(data);
      if (validationError) return validationError;
    }

    // Normalize slug
    if (data.slug) {
      data.slug = data.slug.replaceAll(" ", "-").toLowerCase();
    }

    // Update Yatra
    const resp = await Yatra.findByIdAndUpdate(
      id,
      {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        price: data.price,
        currency: data.currency,
        brochureUrl: data.brochureUrl,
        images: data.images,
        highlights: data.highlights,
        seatsTotal: data.seatsTotal,
        seatsAvailable: data.seatsAvailable,
        locationTitle: data.locationTitle,
        tags: data.tags,
        published: data.published,
        featured: data.featured,
        metadata: data.metadata,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean();

    if (!resp) {
      return getActionFailureResponse("Yatra not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error updating Yatra:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const deleteData = async (id) => {
  try {
    await dbConnect();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await Yatra.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const getSingleYatra = async (query) => {
  try {
    await dbConnect();
    console.log('db connected')
    const resp = await Yatra.findOne(query);
    console.log('resp' , resp)
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const findYatraById = async (id)=>{
    try{
        await dbConnect();
        const resp = await Yatra.findById({_id : id}).lean();
        if(!resp){
            return getActionFailureResponse("Document not found", "toast");
        }
        return getActionSuccessResponse(resp)
    }catch(error){
    return getActionFailureResponse(error.message, "toast");
    }
}
