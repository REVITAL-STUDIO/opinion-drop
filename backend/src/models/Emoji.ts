
export class Emoji {

    private emojiId!: number;
    private reactionId: number;
    private type: string;




    constructor(reactionId: number, type: string) {

        this.reactionId = reactionId;
        this.type = type;
    }
}