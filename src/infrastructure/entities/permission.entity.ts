import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface IPermissions {
    type: string;
    asserted: string;
    value: string;
    source: string;
    by: string;
}

interface IUserPermissions {
  sub: string;
  assertions: Array<IPermissions>;
}

@Schema()
export class Assertion implements IPermissions {
    @Prop()
    type: string;
    @Prop()
    asserted: string;
    @Prop()
    value: string;
    @Prop()
    source: string;
    @Prop()
    by: string;
}

const AssertionSchema = SchemaFactory.createForClass( Assertion );

@Schema({ collection: 'userPermissions' })
export class UserPermissions implements IUserPermissions {
    @Prop()
    sub: string;
    @Prop([{ type: AssertionSchema }])
    assertions: Array<Assertion>
}

export const UserPermissionsSchema = SchemaFactory.createForClass( UserPermissions );