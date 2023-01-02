import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

interface IPolicy {
    _id: string;
    fileId: string;
    acl: string;
    value: string;
}

@Schema({ collection: 'policies' })
export class Policy implements IPolicy {
    @Prop({ type: String, default: uuid(), ref: 'Dac' })
    _id: string;
    @Prop()
    fileId: string;
    @Prop()
    acl: string;
    @Prop()
    value: string;
}

export const PolicySchema = SchemaFactory.createForClass( Policy );