import { getApps } from "firebase-admin/app"
import admin from "firebase-admin"

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}");

if(!getApps().length){
    admin.initializeApp({
        credential:admin.credential.cert(serviceAccount)
    })
}

export const adminDB = admin.firestore()