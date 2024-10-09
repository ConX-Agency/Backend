/*
  Warnings:

  - The primary key for the `Clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clients_id` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_pkey",
DROP COLUMN "clients_id",
ADD COLUMN     "client_id" SERIAL NOT NULL,
ADD CONSTRAINT "Clients_pkey" PRIMARY KEY ("client_id");

-- DropTable
DROP TABLE "Passenger";

-- CreateTable
CREATE TABLE "Location" (
    "location_id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "Clients_Location" (
    "client_location_id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Clients_Location_pkey" PRIMARY KEY ("client_location_id")
);

-- AddForeignKey
ALTER TABLE "Clients_Location" ADD CONSTRAINT "Clients_Location_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients_Location" ADD CONSTRAINT "Clients_Location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
