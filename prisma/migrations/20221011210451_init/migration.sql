-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "incident_desc" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weather_report" JSONB NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Incident_client_id_key" ON "Incident"("client_id");
