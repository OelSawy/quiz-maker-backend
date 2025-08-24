/*
  Warnings:

  - Added the required column `year` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Quiz" ADD COLUMN     "year" INTEGER NOT NULL;
