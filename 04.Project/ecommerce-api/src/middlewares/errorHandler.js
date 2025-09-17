import { error } from 'console';
import fs from 'fs'; 
import path from 'path';

const errorHandler=(err, req, res, next)=>{
    const logFilePath=path.join(__dirname, '../../logs/error.log');
    const logMessage=`${dateTime.toISOString()} |  ${req.method} ${req.url} | ${error.message} | ${error.stack}\n`;
      fs.appendFile(logFilePath, logMessage, (fsErr)=>{
        if (fsErr){
            console.error('Failed to write into log file'); 
        }
      }); 
      res.status(500).json({
        status:'error', 
        message: 'Internal Server Error'
      });
      next();
    }; 