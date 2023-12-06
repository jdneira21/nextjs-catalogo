-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "imagenBase64" TEXT NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "slug" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "producto_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Imagen_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_slug_key" ON "Producto"("slug");
