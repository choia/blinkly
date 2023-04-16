import AppError from '../lib/AppError.js'
import db from '../lib/db.js'

class CommentService {
  private static instance: CommentService
  public static getInstance() {
    if (!CommentService) {
      CommentService.instance = new CommentService()
    }
    return CommentService.instance
  }

  async getComments(itemId: number) {
    return await db.comment.findMany({
      where: {
        itemId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    })
  }

  async getComment(commentId: number) {
    const comment = db.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!comment) {
      throw new AppError('NotFoundError')
    }
    return comment
  }

  async getSubComments(commentId: number) {
    return await db.comment.findMany({
      where: {
        parentCommentId: commentId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    })
  }

  async createCommment({
    text,
    itemId,
    userId,
    parentCommentId,
  }: CreateCommentParams) {
    const parentComment = parentCommentId
      ? await this.getComment(parentCommentId)
      : null

    const rootParentCommentId = parentComment?.parentCommentId

    const comment = await db.comment.create({
      data: {
        text,
        itemId,
        userId,
        parentCommentId: rootParentCommentId ?? parentCommentId,
        mentionUserId: parentComment?.userId,
      },
      include: {
        user: true,
      },
    })

    if (parentCommentId) {
      const subcommentsCount = await db.comment.count({
        where: {
          parentCommentId,
        },
      })
      await db.comment.update({
        where: {
          id: parentCommentId,
        },
        data: {
          subcommentsCount,
        },
      })
    }
    return comment
  }

  async likeComment({ commentId, userId }: CommentParams) {
    try {
      await db.commentLike.create({
        data: {
          commentId,
          userId,
        },
      })
    } catch (e) {}
    return this.countAndSyncCommentLikes(commentId)
  }

  async unlikeComment({ commentId, userId }: CommentParams) {
    try {
      await db.commentLike.delete({
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      })
    } catch (e) {}
    const count = await this.countAndSyncCommentLikes(commentId)
    return count
  }

  async countAndSyncCommentLikes(commentId: number) {
    const count = db.commentLike.count({
      where: {
        commentId,
      },
    })
    return count
  }

  async deleteComment({ commentId, userId }: CommentParams) {
    const comment = await this.getComment(commentId)
    if (comment?.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.comment.delete({
      where: {
        id: commentId,
      },
    })
  }

  async updateComment({ text, userId, commentId }: UpdateCommentParams) {
    const comment = await this.getComment(commentId)
    if (comment?.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    const updatedComment = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
      include: {
        user: true,
      },
    })
    return updatedComment
  }
}

interface CreateCommentParams {
  text: string
  itemId: number
  userId: number
  parentCommentId?: number
}

interface CommentParams {
  userId: number
  commentId: number
}

interface UpdateCommentParams extends CommentParams {
  text: string
}

export default CommentService
