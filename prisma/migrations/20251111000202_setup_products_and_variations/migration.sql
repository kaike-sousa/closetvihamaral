/*
  Warnings:

  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_sizeId_fkey";

-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "slug",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "color" TEXT;

-- DropTable
DROP TABLE "ProductVariant";

-- CreateTable
CREATE TABLE "ProductVariation" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT,
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER,
    "sizeId" INTEGER,

    CONSTRAINT "ProductVariation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "VariantColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "VariantSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
