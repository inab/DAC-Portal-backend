import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

interface IInfo {
    _id: string;
    dacName: string;
    dacStudy: string;
    datasets: string;
    adminName: string;
    adminSurname: string;
    emailAddress: string;
    studyDescription: string;
    status: boolean;
}

@Schema()
export class Info implements IInfo {
    @Prop({ type: String, default: uuid()})
    _id: string;
    @Prop()
    dacName: string;
    @Prop()
    dacStudy: string;
    @Prop()
    datasets: string;
    @Prop()
    adminName: string;
    @Prop()
    adminSurname: string;
    @Prop()
    emailAddress: string;
    @Prop()
    studyDescription: string;
    @Prop()
    status: boolean;
}

export const InfoSchema = SchemaFactory.createForClass( Info );