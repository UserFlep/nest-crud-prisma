-- CreateTable
CREATE TABLE "User" (
    "uid" UUID NOT NULL,
    "nickname" VARCHAR(30) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "creator" UUID,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTags" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTags_AB_unique" ON "_UserTags"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTags_B_index" ON "_UserTags"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_creator_fkey" FOREIGN KEY ("creator") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTags" ADD CONSTRAINT "_UserTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTags" ADD CONSTRAINT "_UserTags_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
