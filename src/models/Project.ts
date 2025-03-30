import mongoose, {Schema, Document, PopulatedDoc, Types}  from "mongoose";
import  { Itask } from "./Task";



///typo de datos Ts
export interface IProject extends Document {
    projectName: string;
    clientName: string;    
    description: string;
    tasks : PopulatedDoc <Itask & Document >
}


///typo de dato Mongose
const ProjectShema : Schema  = new Schema({
    projectName: {type: String, required: true,
    trim: true  },
    clientName: {type: String, required: true,
        trim: true},
    description: {type: String, required: true,
        trim: true},
    tasks : [
        {
            ///aqui voy 
            type: Types.ObjectId,
            ref : "Task"
            
            
        }
    ]
     
}, {timestamps : true } 

);

const Project = mongoose.model<IProject>("Project", ProjectShema);
export default Project;

