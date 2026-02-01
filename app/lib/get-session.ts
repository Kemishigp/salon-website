import { auth } from "../lib/auth"; // Import only the type to keep it lightweight
import { headers } from "next/headers";


export async function getServerSession(){
    return await auth.api.getSession({headers: await headers()});
}