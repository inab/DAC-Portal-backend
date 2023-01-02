import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Info, InfoSchema } from './info.entity';

@Schema({ collection: 'dacs' })
export class Dac extends Document {
    @Prop({ unique: true })
    dacId: string;
    @Prop({ type: InfoSchema })
    info: Info;
    @Prop()
    members: Array<string>;
    @Prop([{ type: String, ref: 'Policy' }])
    policies: Array<string>;
    @Prop([{ type: String, ref: 'Request' }])
    requests: Array<string>;
}

export const DacSchema = SchemaFactory.createForClass( Dac );