import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/entities/author.entity";
import { BookCollection } from "../../book-collection/entities/book-collection.entity";
import { BookMark } from "../../book-marks/entities/book-mark.entity";

interface IBooks {
    publisher_year: Date;
    authorId: number;
}
@Table({tableName: "books"})
export class Books extends Model<Books, IBooks>{
    @Column({
        type: DataType.DATE
    })
    declare publisher_year: Date;


    @ForeignKey(()=> Author)
    @Column({
        type: DataType.INTEGER
    })
    declare authorId: number;

    @BelongsTo(() => Author)
    declare author: Author;

    @HasMany(() => BookCollection)
    declare bookCollection: BookCollection[];
    @HasMany(() => BookMark)
    declare bookMark: BookMark[];
}
