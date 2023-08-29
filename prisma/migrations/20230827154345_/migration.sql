/*
  Warnings:

  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - Added the required column `about` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authorId",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL;
