import config from './Config/config.js';
import Logger from './Utils/Logger.js';
import app from './app.js';

app.listen(config.PORT, () => {
  Logger.info(`listening on http://localhost:${config.PORT}`);
});
