/*
  Warnings:

  - The primary key for the `UserTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTag" DROP CONSTRAINT "UserTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserTag_pkey" PRIMARY KEY ("userId", "tagId");
