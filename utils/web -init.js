import { Client, Account, Databases } from "appwrite";

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646812a2e22b9fbf08d8");


  export const anonymous = account.createAnonymousSession().then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
