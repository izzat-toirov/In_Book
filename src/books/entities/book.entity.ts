import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/entities/author.entity";

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
}
