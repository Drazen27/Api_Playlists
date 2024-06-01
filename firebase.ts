import { initializeApp, cert, App, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount: ServiceAccount = {
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
};

const firebaseApp: App = initializeApp({
    credential: cert(serviceAccount),
});

const db: Firestore = getFirestore(firebaseApp);

export { db };