-- CreateTable
CREATE TABLE "user" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "organisation" (
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "_UserOrganisation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserOrganisation_AB_unique" ON "_UserOrganisation"("A", "B");

-- CreateIndex
CREATE INDEX "_UserOrganisation_B_index" ON "_UserOrganisation"("B");

-- AddForeignKey
ALTER TABLE "_UserOrganisation" ADD CONSTRAINT "_UserOrganisation_A_fkey" FOREIGN KEY ("A") REFERENCES "organisation"("orgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOrganisation" ADD CONSTRAINT "_UserOrganisation_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
