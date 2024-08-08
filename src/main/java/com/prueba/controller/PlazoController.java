package com.prueba.controller;

import com.prueba.entity.Plazo;
import com.prueba.service.PlazoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plazos")
public class PlazoController {

    @Autowired
    private PlazoService plazoService;

    @PostMapping
    public ResponseEntity<Plazo> agregarPlazo(@RequestBody Plazo plazo) {
        Plazo nuevoPlazo = plazoService.guardarPlazo(plazo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPlazo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plazo> editarPlazo(@PathVariable Long id, @RequestBody Plazo plazo) {
        Plazo plazoActualizado = plazoService.actualizarPlazo(id, plazo);
        return ResponseEntity.ok(plazoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPlazo(@PathVariable Long id) {
        plazoService.eliminarPlazo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Plazo>> obtenerTodosLosPlazos() {
        List<Plazo> plazos = plazoService.obtenerTodosLosPlazos();
        return ResponseEntity.ok(plazos);
    }
}
