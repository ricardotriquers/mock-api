@Service
@RequiredArgsConstructor
public class MockServiceImpl implements MockService {
    private final MockEndpointRepository mockEndpointRepository;
    private final UserRepository userRepository;
    
    @Override
    public ResponseEntity<?> handleRequest(
            HttpServletRequest request,
            String requestBody,
            Principal principal) {
        
        String path = extractPathFromRequest(request);
        HttpMethod method = HttpMethod.valueOf(request.getMethod());
        
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Optional<MockEndpoint> endpointOpt = mockEndpointRepository
                .findByPathAndHttpMethodAndUserAndActive(path, method, user, true);
        
        if (endpointOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        MockEndpoint endpoint = endpointOpt.get();
        
        // Check request body pattern if specified
        if (endpoint.getRequestBodyPattern() != null && !endpoint.getRequestBodyPattern().isEmpty()) {
            if (!Pattern.compile(endpoint.getRequestBodyPattern()).matcher(requestBody).matches()) {
                return ResponseEntity.badRequest().body("Request body doesn't match the expected pattern");
            }
        }
        
        // Apply delay if specified
        if (endpoint.getDelayInMillis() != null && endpoint.getDelayInMillis() > 0) {
            try {
                Thread.sleep(endpoint.getDelayInMillis());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        
        // Prepare response
        HttpHeaders headers = new HttpHeaders();
        if (endpoint.getResponseHeaders() != null) {
            endpoint.getResponseHeaders().forEach(headers::add);
        }
        
        return new ResponseEntity<>(
            endpoint.getResponseBody(),
            headers,
            HttpStatus.valueOf(endpoint.getResponseStatus())
        );
    }
    
    private String extractPathFromRequest(HttpServletRequest request) {
        String contextPath = request.getContextPath();
        String requestUri = request.getRequestURI();
        return requestUri.substring(contextPath.length() + "/api/mock".length());
    }
}