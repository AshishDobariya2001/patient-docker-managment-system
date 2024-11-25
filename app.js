const path = require('path');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('./models');


app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(
    '✅ App is running at http://localhost:%d in %s mode',
    process.env.PORT,
    process.env.NODE_ENV
  );
  console.log('Press CTRL-C to stop\n');
});
app.use(
  '/',
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);



const indexRouter = require('./routes/index');
// require('./models/helpers/InitializeConnectionHelper')(server, app);

app.use('/', indexRouter);

if (process.env.NODE_ENV !== 'production') {
  const apiDoc = require('./api-docs');
  app.use('/api-docs', apiDoc);
}

app.use((req, res, next) => {
    if (req.method === 'POST') {
      console.log('Request URL:', req.originalUrl);
    }
    console.log('req body', req.body);
    console.log('req query', req.query);

  next();
});