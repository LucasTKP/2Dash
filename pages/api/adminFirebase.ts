import admin from 'firebase-admin'
import {getAuth} from 'firebase-admin/auth'

var serviceAccount = require("./credentials");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch(e) {
    console.log(e)
  }
}

export {getAuth}