import Dexie, { Table } from "dexie";

// VAFile -> video/ audio file
export interface VAFile {
  id?: number;
  name: string;
  type: string;
  size: number;
  dt: Date;
  content: ArrayBuffer;
}

export class VAFileDatabase extends Dexie {
  vaFiles!: Table<VAFile>;

  constructor() {
    super("VAFileDB");

    this.version(3).stores({
      vaFiles: "++id, name, type, size, date, content",
    });
  }
}

export const indexedDB = new VAFileDatabase();
