-- CreateTable
CREATE TABLE "Clients_Location" (
    "client_location_id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Clients_Location_pkey" PRIMARY KEY ("client_location_id")
);

-- AddForeignKey
ALTER TABLE "Clients_Location" ADD CONSTRAINT "Clients_Location_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
