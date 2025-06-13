package com.mockapi.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import java.security.Principal;

public interface MockService {
    ResponseEntity<?> handleRequest(HttpServletRequest request, String requestBody, Principal principal);
}