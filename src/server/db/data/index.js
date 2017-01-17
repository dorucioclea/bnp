module.exports = function(db) {
  if (!db.config.populateDatabase) {
    return db;
  }
  console.log(`Populate database: '${db.config.populateDatabase}'`);

  switch (db.config.populateDatabase) {
    case 'demo':
      break;
    case 'system':
      break;
    default:
      throw new Error(
        `${db.config.populateDatabase} is unknown populateDatabase param in DB config file "${DB_CONFIG_FILE}".`
      );
  }

  return db;
}

