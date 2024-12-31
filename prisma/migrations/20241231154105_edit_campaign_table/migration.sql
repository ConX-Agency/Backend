/*
  Warnings:

  - You are about to drop the column `mx_pax` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `max_pax` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "mx_pax",
ADD COLUMN     "max_pax" INTEGER NOT NULL;
