import "server-only";

import { createClient, type VercelKV } from "@vercel/kv";

const URL = process.env.USERS_REST_API_URL ?? "https://major-hermit-40200.kv.vercel-storage.com";
const TOKEN =
  process.env.USERS_REST_API_TOKEN ??
  "AZ0IASQgNzI2ZTljMjAtNjBhZC00MWYyLTk1MTYtZGVlYTk2ZDM0Zjk1YTgxNmI3OWYzYmZlNDMxZDgyMGY3YzIyZTBkODg3YmM=";

export type Persistence = {
  /**
   * VercelKV
   * @param namespace
   */
  getClient: () => VercelKV;
  /**
   * clean namespace data
   * @param namespace
   */
  clean: (pattern: string) => Promise<boolean>;
  /**
   * save
   * @param namespace
   * @param key
   * @param val
   */
  save: (namespace: unknown, kv: { [propName: string]: unknown }) => Promise<boolean>;
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
  list: (namespace: string) => Promise<Record<string, unknown>>;
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

  getClient() {
    return this.client;
  }

  async listKeys(namespace: string): Promise<string[]> {
    return await this.client.hkeys(namespace);
  }

  async get(namespace: string, key: string): Promise<object> {
    const data = await this.client.hget(namespace, key);
    return data as object;
  }

  async list(namespace: string): Promise<Record<string, unknown>> {
    const data = await this.client.hgetall(namespace);
    return data ?? {};
  }

  async save(namespace: unknown, kv: { [p: string]: unknown }): Promise<boolean> {
    const data = await this.client.hset(namespace as string, kv);
    return data == 1;
  }

  async clean(pattern: string) {
    const r = await this.client.scan(0, {
      match: pattern,
      count: 100,
    });
    let c = 0;
    if (r[1].length > 0) {
      c = await this.client.del(...r[1]);
    }
    return c > 0;
  }
}

// class Firestore implements Persistence{
//
// }

const kvStore: Persistence = new KvPersistence();
// const fireStore: Persistence = new Firestore();

export { kvStore };
