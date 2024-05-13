import { initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const serviceAccount = require('./andino-db-cert.json');

const test =()=>{
    console.log(serviceAccount)
}

const firebaseApp: App = initializeApp({
    credential: cert(serviceAccount)
});

const db: Firestore = getFirestore(firebaseApp);

export { db };