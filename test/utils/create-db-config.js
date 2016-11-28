const fs = require('fs');

const DB_CONFIG_PATH = 'db.config.json';
const TEST_ENV_CONFIG = {
  test: {
    username: 'username',
    password: 'password',
    database: 'database',
    dialect: 'sqlite',
    storage: 'testdb.sqlite'
  }
};

// will create 'db.config.json' if it doesn't exist
fs.access(DB_CONFIG_PATH, fs.F_OK, function(err) {
  if (err) {
    fs.writeFile(DB_CONFIG_PATH, JSON.stringify(TEST_ENV_CONFIG), function(err) {
      if (err) {
        console.error(err);
      }
      console.log(`'${DB_CONFIG_PATH}' was created!\n`);
    });
  }
});
