import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import session from 'express-session';
// import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

import { config } from './config/env.config.js';

import productsRouter from './routes/products.router.js';
import favoritesRouter from './routes/favorites.routers.js';
import viewsRouter from './routes/views.router.js';
import cartRouter from './routes/cart.router.js';
import authRouter from './routes/auth.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// const fileStorage = FileStore(session);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      // path: './sessions', // donde se guarda los archivos
      mongoUrl: config.MONGO_URI,
      ttl: 300, // tiempo de vida
      // retries: 0, // cantidad de reintentos
    }),
    secret: config.SECRET, // clave para firmar la cookie
    resave: false, // no re-guarda si no hubo cambios
    saveUninitialized: false, // no crear una sesion vacia
  }),
);

app.use(express.static(path.join(__dirname, './public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
mongoose.connect(config.MONGO_URI);

app.use('/api/auth', authRouter);
// app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/', viewsRouter);

app.listen(config.PORT, () => console.log('server in port: ' + config.PORT));
