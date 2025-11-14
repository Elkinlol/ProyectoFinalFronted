import { ReviewReplyDTO } from "./review-reply-dto"

export interface ReviewDTO {
    rating : number
    comment: string
    nameUser: string
    replyReviewDTO: ReviewReplyDTO
}
