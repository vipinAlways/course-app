/*
  Warnings:

  - You are about to drop the column `role` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PayoutMethod" AS ENUM ('STRIPE', 'RAZORPAY', 'PAYPAL');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "creatorId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instructorId" TEXT NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalEarnings" INTEGER NOT NULL DEFAULT 0,
    "pendingPayout" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
