@RestController
@RequestMapping("/api/mock")
@RequiredArgsConstructor
public class MockController {
    private final MockService mockService;
    
    @PostMapping("/**")
    public ResponseEntity<?> handlePostRequest(
            HttpServletRequest request,
            @RequestBody(required = false) String requestBody,
            Principal principal) {
        return mockService.handleRequest(request, requestBody, principal);
    }
    
    @GetMapping("/**")
    public ResponseEntity<?> handleGetRequest(
            HttpServletRequest request,
            Principal principal) {
        return mockService.handleRequest(request, null, principal);
    }
    
    // Similar methods for PUT, PATCH, DELETE
}