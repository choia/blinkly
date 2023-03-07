/*
  Warnings:

  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "siteInfoId" INTEGER,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SiteInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "favicon" TEXT,
    "domain" TEXT NOT NULL,

    CONSTRAINT "SiteInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsTags" (
    "itemId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ItemsTags_pkey" PRIMARY KEY ("itemId","tagId")
);

-- CreateTable
CREATE TABLE "TagRelation" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "originTagId" INTEGER NOT NULL,

    CONSTRAINT "TagRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemLike" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteInfo_domain_key" ON "SiteInfo"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "ItemsTags_itemId_idx" ON "ItemsTags"("itemId");

-- CreateIndex
CREATE INDEX "ItemsTags_tagId_idx" ON "ItemsTags"("tagId");

-- CreateIndex
CREATE INDEX "TagRelation_tagId_idx" ON "TagRelation"("tagId");

-- CreateIndex
CREATE INDEX "TagRelation_originTagId_idx" ON "TagRelation"("originTagId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemLike_itemId_userId_key" ON "ItemLike"("itemId", "userId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_siteInfoId_fkey" FOREIGN KEY ("siteInfoId") REFERENCES "SiteInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsTags" ADD CONSTRAINT "ItemsTags_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsTags" ADD CONSTRAINT "ItemsTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
