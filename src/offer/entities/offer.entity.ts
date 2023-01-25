import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Offer extends Document{}

export const OfferSchema = SchemaFactory.createForClass(Offer)