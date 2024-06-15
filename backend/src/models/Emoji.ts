
export class Emoji {

    private emojiId: number;
    private reactionId: number;
    private type: string;




    constructor(emojiId: number, reactionId: number, type: string) {

        this.emojiId = emojiId;
        this.reactionId = reactionId;
        this.type = type;
    }
}