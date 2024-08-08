package com.prueba.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CotizacionResponse {

    private BigDecimal abonoNormal;
    private BigDecimal abonoPuntual;

}

