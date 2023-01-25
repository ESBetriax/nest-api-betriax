import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

@Schema()
export class Offer extends Document{
    // OFFER_TYPE_BUY = 'BUY'
    // OFFER_TYPE_SELL = 'SELL'
    @Prop({
        type: String, 
        required:true, 
        enum: ["Compra", "Venta"]
    })
    offerType: string
    // OFFER_TYPE_CHOICES = [(OFFER_TYPE_BUY, 'Compra'), (OFFER_TYPE_SELL, 'Venta')]
    // OFFER_TYPE_STATUS = [('T', 'Taken'), ('C', 'Closed'), ('AOK', 'A-ok'), ('BOK', 'B-ok'), ('P', 'Pending'),
    //                      ('A', 'Abandoned'), ('R', 'Reimbursed'), ('FA', 'For abandoned'), ('NT', 'Not Taken'),
    //                      ('D', 'Deactivated')]
    // amount = models.FloatField()
    @Prop({
        MAX_VALUE:9999.99,
        MIN_VALUE:400,
    })
    amount: number
    // exchange_rate = models.FloatField()
    @Prop()
    exchangeRate:number
    // type = models.CharField(max_length=4, choices=OFFER_TYPE_CHOICES)
    @Prop({
        type:Number
    })
    time: number
    // end_date = models.DateTimeField(null=True)
    // created_date = models.DateTimeField(auto_now_add=True)
    // company = models.ForeignKey(Company, related_name='offers', on_delete=models.CASCADE, null=True)
    // person = models.ForeignKey(Person, related_name='offers', on_delete=models.CASCADE, null=True)
    // taker = models.ForeignKey(Company, related_name='takers', on_delete=models.CASCADE, null=True)
    // taker_person = models.ForeignKey(Person, related_name='takers', on_delete=models.CASCADE, null=True)
    // taken_date = models.DateTimeField(null=True)
    // is_active = models.BooleanField(default=True)
    // status = models.CharField(max_length=4, default='NT', choices=OFFER_TYPE_STATUS)
}

export const OfferSchema = SchemaFactory.createForClass(Offer)