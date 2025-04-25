import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database/db';
import cors from 'cors';    
import { corsConfig } from './config/cors';

import projectRoutes from './routes/projectRoutes';

dotenv.config();
connectDB ( )

const app = express();
app.use(express.json());  
//app.use (cors (corsConfig)); // Configuración de CORS , si no se soluciono el error de cors comentar la linea


const PORT: number = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use ('/api/projects', projectRoutes  );

export default app; 