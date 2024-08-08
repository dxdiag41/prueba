package com.prueba.repository;

import com.prueba.entity.Producto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> findBySku(String sku);
    Optional<List<Producto>> findProductoByNombreContaining(String nombre);

}
