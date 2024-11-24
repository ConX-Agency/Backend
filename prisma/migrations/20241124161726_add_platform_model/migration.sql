/*
  Warnings:

  - You are about to drop the column `platform_name` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `platform_type` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `platform_id` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "platform_name",
DROP COLUMN "platform_type",
ADD COLUMN     "platform_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Platform" (
    "platform_id" SERIAL NOT NULL,
    "platform_name" TEXT NOT NULL,
    "platform_type" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("platform_id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE RESTRICT ON UPDATE CASCADE;
