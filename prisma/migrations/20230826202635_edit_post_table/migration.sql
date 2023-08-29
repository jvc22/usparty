/*
  Warnings:

  - Added the required column `day` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_hour` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_minute` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_hour` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_minute` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "end_hour" TEXT NOT NULL,
ADD COLUMN     "end_minute" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "start_hour" TEXT NOT NULL,
ADD COLUMN     "start_minute" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
