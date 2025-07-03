
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Collection } from "../../collection/entities/collection.entity";
import { Books } from "../../books/entities/book.entity";

interface IBookCollection {
    collectionId: number;
    bookId:number;
}
@Table({tableName: "bookCollection"})
export class BookCollection extends Model<BookCollection, IBookCollection>{
    @ForeignKey(()=> Collection)
    @Column({
        type: DataType.INTEGER
    })
    declare collectionId: number;
    @ForeignKey(()=> Books)
    @Column({
        type: DataType.INTEGER
    })
    declare bookId: number;

    @BelongsTo(() => Collection)
    declare collection: Collection;

    @BelongsTo(() => Books)
    declare books: Books;
}

