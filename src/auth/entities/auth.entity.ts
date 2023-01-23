import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { Document } from "mongoose";

@Schema()
export class Auth extends Document{

    @Prop({
        maxlength:128
    })
    name: string;

    @Prop({
        maxlength:128
    })
    last_name: string;    

    @Prop({
        maxlength:32
    })
    phone:string

    @Prop({
        unique:true,
        required:true,
        index:true,
        maxlength:32
    })
    email: string;

    @Prop({
        maxlength:32
    })
    identification: string

    @Prop({
        type: String
    })
    image: string
    
    @Prop({
        type: String
    })
    identification_file: string
    // token = models.CharField(max_length=8, null=True, default=None)
    // transaction_token = models.CharField(max_length=8, null=True, default=None)
    // is_active = models.BooleanField(default=True)
    @Prop({
        default: false
    })
    is_active: boolean

    @Prop({
        default: false
    })
    is_staff: boolean

    @Prop({
        default: true
    })
    is_person: boolean
}
export const AuthSchema = SchemaFactory.createForClass(Auth)