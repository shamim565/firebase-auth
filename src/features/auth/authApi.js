import { createApi } from "@reduxjs/toolkit/query/react";
import { data } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { setDoc, getDoc, doc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { auth, db } from "../../utils/firebaseConfig";

const firebaseBaseQuery = async ({ url, mehtod, body }) => {
  try {
    return { data: {} };
  } catch (error) {
    return { error: { status: "CUSTOM_ERROR", error: error.message } };
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["User"],
  endpoints: (buidler) => ({
    register: buidler.mutation({
      queryFn: async ({ email, password, name, role = "member" }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          const userDoc = {
            id: user.uid,
            email: user.email,
            name: name,
            role: role,
            createdAt: new Date().toISOString(),
          };

          await setDoc(doc(db, "users", user.uid), userDoc);

          const token = await user.getIdToken();

          return {
            data: {
              user: userDoc,
              token,
              role,
            },
          };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["User"],
    }),
    login: buidler.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const user = userCredential.user;

          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            throw new Error("No user found.");
          }

          const userData = { id: user.uid, ...userDocSnap.data() };

          const token = await user.getIdToken();

          return {
            data: {
              user: userData,
              token,
              role: userData.role || "member",
            },
          };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
    logout: buidler.mutation({
      queryFn: async () => {
        try{
          await signOut(auth);
          return {datat: {}}
        }
        catch(error){
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      }
    })
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
