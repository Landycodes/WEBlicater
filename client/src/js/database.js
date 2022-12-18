import { openDB } from "idb";

const initdb = async () =>
  openDB("web", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("web")) {
        console.log("web database already exists");
        return;
      }
      db.createObjectStore("web", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("web database created"); /////////////////////**2 */
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to database"); //////////**7 */*2*

  const webDB = await openDB("web", 1);
  const tx = webDB.transaction("web", "readwrite");
  const store = tx.objectStore("web");
  const request = store.put({ id: 1, content: content });

  const result = await request;
  console.log("data saved!", result); //////////**8 */ 1 *3*
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from database"); ////////////////////////////////**1 */

  const connectDB = await openDB("web", 1);
  const tx = connectDB.transaction("web", "readonly");
  const store = tx.objectStore("web");
  const request = store.get(1);

  const result = await request;
  console.log("get DB value", result); ////////////////////////**3 */undefined
  if (typeof result != "undefined") {
    return result.content.toString();
  } else {
    return result;
  }
};

initdb();
