import { Comment } from '@prisma/client'
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
    const comments = await db.comment.findMany({
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
    return this.groupSubcomments(comments)
  }

  async groupSubcomments(comments: Comment[]) {
    const rootComments = comments.filter((c) => c.parentCommentId === null)
    const subcommentsMap = new Map<number, Comment[]>()
    comments.forEach((c) => {
      if (!c.parentCommentId) return
      const array = subcommentsMap.get(c.parentCommentId) ?? []
      array.push(c)
      subcommentsMap.set(c.parentCommentId, array)
    })
    const merged = rootComments.map((c) => ({
      ...c,
      subcomments: subcommentsMap.get(c.id) ?? [],
    }))
    return merged
  }

  async getComment(commentId: number, withSubcomments: boolean = false) {
    const comment = db.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
        mentionedUser: true,
      },
    })

    if (!comment || comment.deletedAt) {
      throw new AppError('NotFoundError')
    }
    if (withSubcomments) {
      const subcomments = await this.getSubComments(commentId)
      return {
        ...comment,
        subcomments,
      }
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
        mentionedUser: true,
      },
    })
  }

  async createComment({
    text,
    itemId,
    userId,
    parentCommentId,
  }: CreateCommentParams) {
    const parentComment = parentCommentId
      ? await this.getComment(parentCommentId)
      : null

    const rootParentCommentId = parentComment?.parentCommentId
    const targetParentCommentId = rootParentCommentId ?? parentCommentId

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
        mentionedUser: true,
      },
    })

    if (parentCommentId) {
      const subcommentsCount = await db.comment.count({
        where: {
          parentCommentId: targetParentCommentId,
        },
      })
      await db.comment.update({
        where: {
          id: targetParentCommentId,
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
    const count = await db.commentLike.count({
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
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async updateComment({ text, userId, commentId }: UpdateCommentParams) {
    const comment = await this.getComment({ commentId })
    if (comment?.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.comment.update({
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
    return this.getComment({})
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
