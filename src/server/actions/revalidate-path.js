"use server";

import { revalidatePath } from "next/cache";

export const RevalidatePath = async (path) => {
  revalidatePath(path);
};
