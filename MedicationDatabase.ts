import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('medications.db');

const insertMedication = async (medName: string | number | boolean | Uint8Array | null, medType: string | number | boolean | Uint8Array | null, medStrength: string | number | boolean | Uint8Array | null, units: string | number | boolean | Uint8Array | null, frequency: string | number | boolean | Uint8Array | null, time: string | number | boolean | Uint8Array | null) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO medications (medName, medType, medStrength, units, frequency, time) VALUES (?, ?, ?, ?, ?, ?)',
      [medName, medType, medStrength, units, frequency, time]
    );
    console.log(`Inserted medication with ID: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting medication:', error);
  }
};

const getAllMeds = async () => {
  try {
    const rows = await db.getAllAsync('SELECT * FROM medications');
    console.log('All medications:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
};

const deleteMedication = async (medName: string | number | boolean | Uint8Array | null) => {
  try {
    const result = await db.runAsync('DELETE FROM medications WHERE medName = ?', [medName]);
    console.log(`Deleted ${result.changes} medication(s) with medName: ${medName}`);
    return result.changes;
  } catch (error) {
    console.error('Error deleting medication:', error);
  }
};

export { insertMedication, getAllMeds, deleteMedication };
