-- DropForeignKey
ALTER TABLE "favorite_albums" DROP CONSTRAINT "favorite_albums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_artists" DROP CONSTRAINT "favorite_artists_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_tracks" DROP CONSTRAINT "favorite_tracks_trackId_fkey";

-- AddForeignKey
ALTER TABLE "favorite_tracks" ADD CONSTRAINT "favorite_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artists" ADD CONSTRAINT "favorite_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_albums" ADD CONSTRAINT "favorite_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
