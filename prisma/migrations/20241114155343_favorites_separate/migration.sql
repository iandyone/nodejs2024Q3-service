/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_user-favorite-album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user-favorite-artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user-favorite-track` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_user-favorite-album" DROP CONSTRAINT "_user-favorite-album_A_fkey";

-- DropForeignKey
ALTER TABLE "_user-favorite-album" DROP CONSTRAINT "_user-favorite-album_B_fkey";

-- DropForeignKey
ALTER TABLE "_user-favorite-artist" DROP CONSTRAINT "_user-favorite-artist_A_fkey";

-- DropForeignKey
ALTER TABLE "_user-favorite-artist" DROP CONSTRAINT "_user-favorite-artist_B_fkey";

-- DropForeignKey
ALTER TABLE "_user-favorite-track" DROP CONSTRAINT "_user-favorite-track_A_fkey";

-- DropForeignKey
ALTER TABLE "_user-favorite-track" DROP CONSTRAINT "_user-favorite-track_B_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_favoritesId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "favoritesId";

-- DropTable
DROP TABLE "_user-favorite-album";

-- DropTable
DROP TABLE "_user-favorite-artist";

-- DropTable
DROP TABLE "_user-favorite-track";

-- DropTable
DROP TABLE "favorites";

-- CreateTable
CREATE TABLE "favorite_tracks" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "favorite_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_artists" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "favorite_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_albums" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "favorite_albums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_tracks" ADD CONSTRAINT "favorite_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artists" ADD CONSTRAINT "favorite_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_albums" ADD CONSTRAINT "favorite_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
