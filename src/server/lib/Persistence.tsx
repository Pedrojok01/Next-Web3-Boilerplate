import "server-only";

import { createClient } from "@vercel/kv";

const URL = process.env.USERS_REST_API_URL ?? "https://major-hermit-40200.kv.vercel-storage.com";
const TOKEN =
  process.env.USERS_REST_API_TOKEN ??
  "AZ0IASQgNzI2ZTljMjAtNjBhZC00MWYyLTk1MTYtZGVlYTk2ZDM0Zjk1YTgxNmI3OWYzYmZlNDMxZDgyMGY3YzIyZTBkODg3YmM=";

export type Persistence = {
  /**
   * clean namespace data
   * @param namespace
   */
  clean: (namespace: string) => Promise<boolean>;
  /**
   * save
   * @param namespace
   * @param key
   * @param val
   */
  save: (namespace: string, key: string, val: { [propName: string]: unknown }) => Promise<boolean>;
  /**
   * get by key
   * @param namespace
   * @param key
   */
  get: (namespace: string, key: string) => Promise<object>;
  /**
   * find list
   * @param namespace
   * @param page
   */
  list: (
    namespace: string,
    page?: { start: number; limit: number },
  ) => Promise<Record<string, unknown>>;
  /**
   * find list
   * @param namespace
   * @param page
   */
  listKeys: (namespace: string) => Promise<string[]>;
};

class KvPersistence implements Persistence {
  client;

  constructor() {
    this.client = createClient({ url: URL, token: TOKEN });
  }

  async listKeys(namespace: string): Promise<string[]> {
    return await this.client.hkeys(namespace);
  }

  async get(namespace: string, key: string): Promise<object> {
    const data = await this.client.hget(namespace, key);
    return data as object;
  }

  async list(
    namespace: string,
    page?: { start: number; limit: number },
  ): Promise<Record<string, unknown>> {
    console.log(page);
    const data = await this.client.hgetall(namespace);
    return data ?? {};
  }

  async save(namespace: string, key: string, val: { [p: string]: unknown }): Promise<boolean> {
    const data = await this.client.hsetnx(namespace, key, val);
    return data == 1;
  }

  async clean(namespace: string): Promise<boolean> {
    const data = await this.client.del(namespace as never);
    return data > 0;
  }
}

// class Firestore implements Persistence{
//
// }

const kvStore: Persistence = new KvPersistence();
// const fireStore: Persistence = new Firestore();

export { kvStore };
