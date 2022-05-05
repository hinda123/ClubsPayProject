-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "media" TEXT,
    "mediaType" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mainClub" (
    "id" TEXT NOT NULL,
    "clubType" TEXT NOT NULL,
    "imageIcon" TEXT,

    CONSTRAINT "mainClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clubInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageCover" TEXT,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mainClubId" TEXT NOT NULL,

    CONSTRAINT "clubInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clubInfo" ADD CONSTRAINT "clubInfo_mainClubId_fkey" FOREIGN KEY ("mainClubId") REFERENCES "mainClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
