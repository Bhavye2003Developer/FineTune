import Dexie, { Table } from "dexie";

// VAFile -> video/ audio file
export interface VAFile {
  id?: number;
  name: string;
  size: number;
}

export class VAFileDatabase extends Dexie {
  vaFiles!: Table<VAFile>;

  constructor() {
    super("VAFileDB");

    this.version(2).stores({
      vaFiles: "++id, name, size",
    });
  }
}

export const indexedDB = new VAFileDatabase();
