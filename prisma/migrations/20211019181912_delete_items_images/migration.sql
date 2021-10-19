/*
  Warnings:

  - You are about to drop the `ItemsImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemsImages" DROP CONSTRAINT "ItemsImages_image_id_fkey";

-- DropTable
DROP TABLE "ItemsImages";
