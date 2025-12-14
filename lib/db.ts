import Dexie, { Table } from "dexie";

// VAFile -> video/ audio file
export interface VAFile {
  id: string;
  name: string;
  type: string;
  dt: Date;
  blob: File;
}

export class VAFileDatabase extends Dexie {
  vaFiles!: Table<VAFile>;

  constructor() {
    super("VAFileDB");

    this.version(3).stores({
      vaFiles: "id, name, type, date, blob",
    });
  }
}

export const indexedDB = new VAFileDatabase();
