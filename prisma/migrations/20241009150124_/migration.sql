-- CreateTable
CREATE TABLE "Clients" (
    "clients_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "person_in_charge_name" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "pic_email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "additional_contact_number" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "package" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("clients_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_company_name_key" ON "Clients"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_company_email_key" ON "Clients"("company_email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_pic_email_key" ON "Clients"("pic_email");
