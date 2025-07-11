import fs from 'fs/promises';
import path from 'path';

const dataDir = path.resolve('src/data');

const storage = {
  users: [],
  products: []
};

export async function loadData() {
  storage.users = JSON.parse(await fs.readFile(path.join(dataDir, 'users.json'), 'utf-8'));
  storage.products = JSON.parse(await fs.readFile(path.join(dataDir, 'products.json'), 'utf-8'));
}

export async function saveData(type) {
  if (!['users', 'products'].includes(type)) throw new Error('Invalid type');
  await fs.writeFile(
    path.join(dataDir, `${type}.json`),
    JSON.stringify(storage[type], null, 2)
  );
}

export default storage;