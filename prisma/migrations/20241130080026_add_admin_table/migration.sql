-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "preferred_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_address_key" ON "Admin"("email_address");
