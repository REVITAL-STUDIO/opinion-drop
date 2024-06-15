
export class Note {

    private noteId!: number;
    private reactionId: number;
    private text: string;




    constructor(reactionId: number, text: string) {

        this.reactionId = reactionId;
        this.text = text;
    }
}