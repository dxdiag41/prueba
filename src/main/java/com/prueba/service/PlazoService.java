package com.prueba.service;

import com.prueba.entity.Plazo;
import com.prueba.exception.ResourceNotFoundException;
import com.prueba.repository.PlazoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlazoService {

    @Autowired
    private PlazoRepository plazoRepository;

    public Plazo obtenerPlazoPorId(Long id) {
        return plazoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plazo no encontrado"));
    }

    public Plazo guardarPlazo(Plazo plazo) {
        return plazoRepository.save(plazo);
    }

    public Plazo actualizarPlazo(Long id, Plazo plazo) {
        Plazo plazoExistente = plazoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plazo no encontrado"));

        plazoExistente.setSemanas(plazo.getSemanas());
        plazoExistente.setTasaNormal(plazo.getTasaNormal());
        plazoExistente.setTasaPuntual(plazo.getTasaPuntual());

        return plazoRepository.save(plazoExistente);
    }

    public void eliminarPlazo(Long id) {
        plazoRepository.deleteById(id);
    }

    public List<Plazo> obtenerTodosLosPlazos() {
        return plazoRepository.findAll();
    }
}