package com.mockapi.dto;

import com.mockapi.model.HttpMethod;
import lombok.Data;

import java.util.Map;

@Data
public class MockEndpointDto {
    private String path;
    private HttpMethod httpMethod;
    private String requestBodyPattern;
    private String responseBody;
    private int responseStatus;
    private Map<String, String> responseHeaders;
    private Integer delayInMillis;
    private boolean active;
}