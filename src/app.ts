/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, Request,Response} from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1', router)

//for testing unhandledRejection
// const test =async(req:Request,res:Response)=>{
//   Promise.reject();
// }
// app.get('/',test)
app.get('/', (req: Request, res: Response) => {
  res.send('Live server is on');
});



//middleware
app.use(notFound)
app.use(globalErrorHandler)



export default app;
