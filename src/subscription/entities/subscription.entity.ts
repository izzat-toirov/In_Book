

import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Collection } from "../../collection/entities/collection.entity";
import { Books } from "../../books/entities/book.entity";
import { User } from "../../users/models/user.model";

interface ISubscription {
    user_id: number;
    startDate:Date;
    endDate: Date;
}
@Table({tableName: "subscription"})
export class Subscription extends Model<Subscription, ISubscription>{
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    declare user_id: number;
    @ForeignKey(()=> Books)
    @Column({
        type: DataType.DATE
    })
    declare startDate: Date;

    @Column({
        type: DataType.DATE
    })
    declare endDate: Date;

    @BelongsTo(() => User)
    declare user: User;
}

