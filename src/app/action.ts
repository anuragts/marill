"use server";

import { db } from "@/lib/db/client";
import { pdf } from "@/lib/db/schema";


export async function addFiletoDB( name: string, url: string,key: string) {
    const result = await db.insert(pdf).values({
        key,
        name,
        url,
        userId:1,
    })
    return result
}