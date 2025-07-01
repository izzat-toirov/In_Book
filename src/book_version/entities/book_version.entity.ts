import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AudioBook } from "../../audio_book/entities/audio_book.entity";
import { Languase } from "../../languages/entities/languase.entity";


interface IBookVersion {
    book_id: number;
    language_id: number;
    title: string;
    file_url: string;
    description: string;
    text_url:string;
    cover_url:string;
}
@Table({tableName: "bookVersion"})
export class BookVersion extends Model<BookVersion, IBookVersion>{
    // @ForeignKey(()=> Books)
     @Column({
            type: DataType.INTEGER
        })
        declare book_id: number;
    @ForeignKey(()=> Languase)
    @Column({
            type: DataType.INTEGER
        })
            declare language_id: number;
    @Column({
            type: DataType.STRING
        })
        declare title: string;

    @Column({
        type: DataType.STRING
    })
        declare file_url: string;

    @Column({
        type: DataType.STRING
    })
        declare description: string;

    @Column({
            type: DataType.STRING
        })
        declare text_url: string;

    @Column({
        type: DataType.STRING
    })
        declare cover_url: string;

    @BelongsTo(() => Languase)
    declare languase: Languase;

    // @BelongsTo(() => Books)
    // declare books: Books;

}
