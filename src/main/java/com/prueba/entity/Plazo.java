package com.prueba.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "plazo")
public class Plazo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "semanas", nullable = false)
    private int semanas;

    @Column(name = "tasa_normal", nullable = false)
    private BigDecimal tasaNormal;

    @Column(name = "tasa_puntual", nullable = false)
    private BigDecimal tasaPuntual;

    // Getters y Setters
}