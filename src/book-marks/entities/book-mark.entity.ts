
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Collection } from "../../collection/entities/collection.entity";
import { Books } from "../../books/entities/book.entity";
import { User } from "../../users/models/user.model";

interface IBookMark {
    user_id: number;
    bookId:number;
    noti: string;
    position: string;
}
@Table({tableName: "bookMark"})
export class BookMark extends Model<BookMark, IBookMark>{
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    declare user_id: number;
    @ForeignKey(()=> Books)
    @Column({
        type: DataType.INTEGER
    })
    declare bookId: number;

    @Column({
        type: DataType.STRING
    })
    declare noti: string;

    @Column({
        type: DataType.STRING
    })
    declare position: string;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Books)
    declare books: Books;
}

