var nano = require('nano')('http://localhost:5984');
nano.db.destroy('cities');
nano.db.destroy('cities/_design/design');
