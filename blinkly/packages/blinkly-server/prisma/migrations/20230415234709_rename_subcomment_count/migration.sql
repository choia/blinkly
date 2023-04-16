/*
  Warnings:

  - You are about to drop the column `subcommentCount` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "subcommentCount",
ADD COLUMN     "subcommentsCount" INTEGER NOT NULL DEFAULT 0;
