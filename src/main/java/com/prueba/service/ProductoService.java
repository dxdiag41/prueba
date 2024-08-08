package com.prueba.service;

import com.prueba.entity.Producto;
import com.prueba.exception.ResourceNotFoundException;
import com.prueba.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }

    public Producto buscarPorSku(String sku) {
        return productoRepository.findBySku(sku).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findProductoByNombreContaining(nombre).orElseThrow(() -> new ResourceNotFoundException("Productos no encontrados"));
    }

    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Producto actualizarProducto(Long id, Producto producto) {
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        productoExistente.setSku(producto.getSku());
        productoExistente.setNombre(producto.getNombre());
        productoExistente.setPrecio(producto.getPrecio());

        return productoRepository.save(productoExistente);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}