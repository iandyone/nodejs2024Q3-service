-- AlterTable
ALTER TABLE "users" ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "users_version_seq";
