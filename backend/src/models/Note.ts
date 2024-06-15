
export class Note {

    private noteId: number;
    private reactionId: number;
    private text: string;




    constructor(noteId: number, reactionId: number, text: string) {

        this.noteId = noteId;
        this.reactionId = reactionId;
        this.text = text;
    }
}