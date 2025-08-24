/*
  Warnings:

  - The `answers` column on the `QuizSubmission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."QuizSubmission" DROP COLUMN "answers",
ADD COLUMN     "answers" JSONB[];
