package com.prueba.repository;

import com.prueba.entity.Plazo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlazoRepository extends JpaRepository<Plazo, Long> {

}