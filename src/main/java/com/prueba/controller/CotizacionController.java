package com.prueba.controller;

import com.prueba.Response.CotizacionResponse;
import com.prueba.entity.Plazo;
import com.prueba.entity.Producto;
import com.prueba.service.PlazoService;
import com.prueba.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/cotizacion")
public class CotizacionController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private PlazoService plazoService;

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> buscarProductos(@RequestParam(required = false) String sku, @RequestParam(required = false) String nombre) {
        List<Producto> productos;
        if (sku != null) {
            Producto producto = productoService.buscarPorSku(sku);
            productos = producto != null ? List.of(producto) : List.of();
        } else if (nombre != null) {
            productos = productoService.buscarPorNombre(nombre);
        } else {
            productos = productoService.obtenerTodosLosProductos();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/plazos")
    public ResponseEntity<List<Plazo>> obtenerPlazos() {
        List<Plazo> plazos = plazoService.obtenerTodosLosPlazos();
        return ResponseEntity.ok(plazos);
    }

    @GetMapping("/cotizar")
    public ResponseEntity<CotizacionResponse> cotizarCredito(@RequestParam Long productoId, @RequestParam Long plazoId) {
        Producto producto = productoService.obtenerProductoPorId(productoId);
        Plazo plazo = plazoService.obtenerPlazoPorId(plazoId);

        BigDecimal abonoNormal = ((producto.getPrecio().multiply(plazo.getTasaNormal())).add(producto.getPrecio()))
                .divide(BigDecimal.valueOf(plazo.getSemanas()), RoundingMode.HALF_UP);
        BigDecimal abonoPuntual = ((producto.getPrecio().multiply(plazo.getTasaPuntual())).add(producto.getPrecio()))
                .divide(BigDecimal.valueOf(plazo.getSemanas()), RoundingMode.HALF_UP);

        CotizacionResponse respuesta = new CotizacionResponse(abonoNormal, abonoPuntual);
        return ResponseEntity.ok(respuesta);
    }
}
