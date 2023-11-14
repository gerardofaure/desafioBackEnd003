
// importacion de express y readFileSync
import express from "express";
import { readFileSync } from 'fs';
//configurando express y el puerto 8080
const app = express();
const PORT = 8080;
//esto para leer .json de productos y parsearlo
const productsData = readFileSync('./productos.json', 'utf-8');
const products = JSON.parse(productsData);
// aqui un middleware para la interpretacion de las solicitudes http como json
app.use(express.json());
// Endpoint para la lista de productos con el parametro limit para limitar el numero de productos devueltos
app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const productList = limit ? products.slice(0, limit) : products;
    res.json({ products: productList });
});
// Endpoint para devolver un producto por su id, usamos un if para devolver mensaje al no encontrar el producto
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
    res.json({ product });
});
//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
