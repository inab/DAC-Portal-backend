import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

interface IRequest {
    _id: string;
    userId: string;
    fileId: string;
    resource: string;
    comment: string;
    status: string;
}

@Schema({ collection: 'requests' })
export class Request implements IRequest {
    @Prop({ type: String, default: uuid(), ref: 'Dac' })
    _id: string;
    @Prop()
    userId: string;
    @Prop()
    fileId: string;
    @Prop()
    resource: string;
    @Prop()
    comment: string;
    @Prop()
    status: string;
}

export const RequestSchema = SchemaFactory.createForClass( Request );